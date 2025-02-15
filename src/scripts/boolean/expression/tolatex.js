import { BooleanExpression } from './expression';
import { BooleanOperation } from './operation';

/* eslint no-use-before-define: [1, 'nofunc'] */

function literalToLaTeX(literal) {
  return literal.value ? '1' : '0';
}

function variableToLaTeX(literal) {
  return literal.name;
}

function operationToLaTeX(operation) {
  if (operation.operator === BooleanOperation.NOT) {
    const operand = expressionToLaTeX(operation.operand);
    return `\\overline{${operand}}`;
  }
  let op = '';
  switch (operation.operator) {
    case BooleanOperation.AND: op = '\\cdot '; break;
    case BooleanOperation.OR: op = '+'; break;
    case BooleanOperation.NAND: op = '\\operatorname{nand}'; break;
    case BooleanOperation.NOR: op = '\\operatorname{nor}'; break;
    case BooleanOperation.XNOR: op = '\\oplus'; break;
    case BooleanOperation.IMPLIES: op = '\\implies'; break;
    default: throw new Error('invalid operator');
  }

  const operands = operation.operands.map((operand) => expressionToLaTeX(operand));
  return operands.join(op);
}

function expressionToLaTeX(expression) {
  let latex = '';
  switch (expression.kind) {
    case BooleanExpression.LITERAL: latex = literalToLaTeX(expression); break;
    case BooleanExpression.VARIABLE: latex = variableToLaTeX(expression); break;
    case BooleanExpression.OPERATOR: latex = operationToLaTeX(expression); break;
    default: throw new Error('invalid expression kind');
  }

  if (expression.hasParentheses) {
    latex = `\\left(${latex}\\right)`;
  }
  return latex;
}

export function toLaTeX(expression) {
  return expressionToLaTeX(expression);
}
