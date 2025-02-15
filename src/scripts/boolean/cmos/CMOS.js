import { CMOSSeriesElement, CMOSParallelElement } from './CMOSElements';
import { CMOSExpression, NetworkType } from './CMOSExpression';
import { CMOSTransistor, CMOSTransistorType } from './CMOSTransistor';

import { CMOSVariable } from './CMOSVariable';
import { CMOSLiteral } from './CMOSLiteral';

import { BooleanOperation, NAryExpression, UnaryExpression } from '../expression/operation';
import { BooleanVariable } from '../expression/variable';
import { BooleanLiteral } from '../expression/literal';

export class CMOS {
  constructor(func) {
    this.variables = [];
    this.literals = [];

    this.expressions = [];

    this.func = func;
    /*
    this.generateExpression(func.expression)
    this.giveIds()
    */
  }

  getExpressionByName(expressionName) {
    const filtered = this.expressions.filter((e) => e.name === expressionName);
    return filtered.length > 0 ? filtered[0] : null;
  }

  getVariableByName(variableName) {
    const filtered = this.variables.filter((e) => e.name === variableName);
    return filtered.length > 0 ? filtered[0] : null;
  }

  getLiteralByValue(value) {
    const filtered = this.literals.filter((e) => (e.value && value) || (!e.value && !value));
    return filtered.length > 0 ? filtered[0] : null;
  }

  generateExpression(boolExpr, options) {
    const exprName = boolExpr.toString();

    if (boolExpr instanceof BooleanVariable) {
      const variable = this.getVariableByName(boolExpr.name);
      if (variable == null) {
        this.variables.push(new CMOSVariable(boolExpr.name, boolExpr));
      }
      return variable;
    }

    if (this.getExpressionByName(exprName) != null) {
      return this.getExpressionByName(exprName);
    }

    const ret = new CMOSExpression(boolExpr.toString(), this, boolExpr, null, null);

    ret.pullUp = this.generateNetwork(ret, NetworkType.PULLUP, boolExpr, options);
    ret.pullDown = this.generateNetwork(ret, NetworkType.PULLDOWN, boolExpr, options);

    this.expressions.push(ret);
    return ret;
  }

  generateNetwork(parent, type, boolExpr, options) {
    const transistorType = (type === NetworkType.PULLUP)
      ? CMOSTransistorType.PMOS : CMOSTransistorType.NMOS;

    if (boolExpr instanceof BooleanLiteral) {
      let literal = this.getLiteralByValue(!boolExpr.value);
      if (literal == null) {
        literal = new CMOSLiteral(!boolExpr.value);
        this.literals.push(literal);
      }

      const transistor = new CMOSTransistor(transistorType, literal, parent);
      literal.addConnection(transistor);

      return transistor;
    }

    if (boolExpr instanceof BooleanVariable) {
      const exp = this.generateExpression(new UnaryExpression(
        BooleanOperation.NOT,
        [boolExpr],
        false,
      ), options);
      const trans = new CMOSTransistor(transistorType, exp, parent);
      exp.addConnection(trans);
      return trans;
    }

    if (boolExpr instanceof NAryExpression) {
      if (boolExpr.operator === BooleanOperation.AND) {
        const ret = type === NetworkType.PULLUP ? new CMOSSeriesElement(parent, type)
          : new CMOSParallelElement(parent, type);
        for (const operand of boolExpr.operands) {
          ret.addChild(this.generateNetwork(ret, type, operand, options));
        }
        return ret;
      }
      if (boolExpr.operator === BooleanOperation.OR) {
        const ret = type === NetworkType.PULLUP ? new CMOSParallelElement(parent, type)
          : new CMOSSeriesElement(parent, type);
        for (const operand of boolExpr.operands) {
          ret.addChild(this.generateNetwork(ret, type, operand, options));
        }
        return ret;
      }

      throw Error('Unknown NAry-Operation found.');
    }

    if (boolExpr instanceof UnaryExpression) {
      if (boolExpr.operator === BooleanOperation.NOT) {
        const operand = boolExpr.operand;
        if (operand instanceof BooleanVariable) {
          let variable = this.getVariableByName(operand.name);
          if (variable == null) {
            variable = new CMOSVariable(operand.name, operand);
            this.variables.push(variable);
          }
          const trans = new CMOSTransistor(transistorType, variable, parent);
          variable.addConnection(trans);
          return trans;
        }
        const exp = this.generateExpression(operand, options);
        const trans = new CMOSTransistor(transistorType, exp, parent);
        exp.addConnection(trans);
        return trans;
      }

      throw Error('Unknown Unary-Operation found.');
    }
    throw Error('Unknown Expression-Type found.');
  }
}
