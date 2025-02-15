import { CMOSSeriesElement, CMOSParallelElement } from './CMOSElements';
import { CMOSExpression, NetworkType } from './CMOSExpression';
import { CMOSTransistor, CMOSTransistorType } from './CMOSTransistor';
import { CMOS } from './CMOS';

import { CMOSVariable } from './CMOSVariable';
import { CMOSLiteral } from './CMOSLiteral';

import { BooleanOperation, NAryExpression, UnaryExpression } from '../expression/operation';
import { BooleanVariable } from '../expression/variable';
import { BooleanLiteral } from '../expression/literal';

export class CMOSBuilder {
  buildCMOS(func) {
    let cmos = new CMOS(func);
    this._generateExpression(cmos, func.expression);
    cmos = this._giveIds(cmos);
    cmos = this._flattenCMOS(cmos);
    return cmos;
  }

  _giveIds(cmos) {
    for (let i = 0; i < cmos.expressions.length; i += 1) {
      cmos.expressions[i].setId(i);
    }
    return cmos;
  }

  _generateExpression(cmos, boolExpr, options) {
    const exprName = boolExpr.toString();

    if (boolExpr instanceof BooleanVariable) {
      const variable = cmos.getVariableByName(boolExpr.name);
      if (variable == null) {
        cmos.variables.push(new CMOSVariable(boolExpr.name, boolExpr));
      }
      return variable;
    }

    if (cmos.getExpressionByName(exprName) != null) {
      return cmos.getExpressionByName(exprName);
    }

    const expression = new CMOSExpression(exprName, cmos, boolExpr, null, null);

    expression.pullUp = this._generateNetwork(cmos, expression, NetworkType.PULLUP, boolExpr, options);
    expression.pullDown = this._generateNetwork(cmos, expression, NetworkType.PULLDOWN, boolExpr, options);

    cmos.expressions.push(expression);
    return expression;
  }

  _generateNetwork(cmos, parent, type, boolExpr, options) {
    if (boolExpr instanceof BooleanLiteral) {
      return this._handleBooleanLiteral(cmos, parent, type, boolExpr);
    } if (boolExpr instanceof BooleanVariable) {
      return this._handleBooleanVariable(cmos, parent, type, boolExpr, options);
    } if (boolExpr instanceof NAryExpression) {
      return this._handleNAryExpression(cmos, parent, type, boolExpr, options);
    } if (boolExpr instanceof UnaryExpression) {
      return this._handleUnaryExpression(cmos, parent, type, boolExpr, options);
    }
    throw Error('CMOSBuilder._generateNetwork(CMOS, CMOSElement, NetworkType, BooleanExpression, options): Unknown Expression-Type found.');
  }

  _handleBooleanLiteral(cmos, parent, type, boolExpr) {
    const transistorType = (type === NetworkType.PULLUP)
      ? CMOSTransistorType.PMOS : CMOSTransistorType.NMOS;
    let literal = cmos.getLiteralByValue(!boolExpr.value);

    if (literal == null) {
      literal = new CMOSLiteral(!boolExpr.value);
      cmos.literals.push(literal);
    }

    const transistor = new CMOSTransistor(transistorType, literal, parent);
    literal.addConnection(transistor);

    return transistor;
  }

  _handleBooleanVariable(cmos, parent, type, boolExpr, options) {
    const transistorType = (type === NetworkType.PULLUP) ? CMOSTransistorType.PMOS
      : CMOSTransistorType.NMOS;
    const expression = this._generateExpression(cmos, new UnaryExpression(
      BooleanOperation.NOT,
      [boolExpr],
      false,
    ), options);
    const transistor = new CMOSTransistor(transistorType, expression, parent);
    expression.addConnection(transistor);
    return transistor;
  }

  _handleNAryExpression(cmos, parent, type, boolExpr, options) {
    let element;

    if (boolExpr.operator === BooleanOperation.AND) {
      element = type === NetworkType.PULLUP ? new CMOSSeriesElement(parent, type)
        : new CMOSParallelElement(parent, type);
    } else if (boolExpr.operator === BooleanOperation.OR) {
      element = type === NetworkType.PULLUP ? new CMOSParallelElement(parent, type)
        : new CMOSSeriesElement(parent, type);
    } else {
      throw Error('CMOSBuilder._handleNAryExpression(CMOS, CMOSElement, NetworkType, BooleanExpression, options): Unknown NAry-Operation found.');
    }

    for (const operand of boolExpr.operands) {
      element.addChild(this._generateNetwork(cmos, element, type, operand, options));
    }
    return element;
  }

  _handleUnaryExpression(cmos, parent, type, boolExpr, options) {
    const transistorType = (type === NetworkType.PULLUP)
      ? CMOSTransistorType.PMOS : CMOSTransistorType.NMOS;
    if (boolExpr.operator === BooleanOperation.NOT) {
      const operand = boolExpr.operand;
      if (operand instanceof BooleanVariable) {
        let variable = cmos.getVariableByName(operand.name);
        if (variable == null) {
          variable = new CMOSVariable(operand.name, operand);
          cmos.variables.push(variable);
        }
        const transistor = new CMOSTransistor(transistorType, variable, parent);
        variable.addConnection(transistor);
        return transistor;
      }
      const expression = this._generateExpression(cmos, operand, options);
      const transistor = new CMOSTransistor(transistorType, expression, parent);
      expression.addConnection(transistor);
      return transistor;
    }
    throw Error('CMOSBuilder._handleUnaryExpression(CMOS, CMOSElement, NetworkType, BooleanExpression, options): Unknown Unary-Operation found.');
  }

  _flattenCMOS(elementIn) {
    const element = elementIn;
    if (element instanceof CMOS) {
      for (const expression of element.expressions) {
        this._flattenCMOS(expression);
      }
    } else if (element instanceof CMOSExpression) {
      this._flattenCMOS(element.pullUp);
      this._flattenCMOS(element.pullDown);
    } else if (element instanceof CMOSSeriesElement) {
      const suspects = element.children;
      const newChildren = [];
      let i = 0;
      while (i < suspects.length) {
        const suspect = suspects[i];
        if (suspect instanceof CMOSSeriesElement) {
          for (const child of suspect.children) {
            suspects.push(child);
          }
        } else {
          suspect.parent = element;
          newChildren.push(suspect);
        }
        i += 1;
      }
      element.children = newChildren;
    } else if (element instanceof CMOSParallelElement) {
      const suspects = element.children;
      const newChildren = [];
      let i = 0;
      while (i < suspects.length) {
        const suspect = suspects[i];
        if (suspect instanceof CMOSParallelElement) {
          for (const child of suspect.children) {
            suspects.push(child);
          }
        } else {
          suspect.parent = element;
          newChildren.push(suspect);
        }
        i += 1;
      }
      element.children = newChildren;
    }

    return element;
  }
}
