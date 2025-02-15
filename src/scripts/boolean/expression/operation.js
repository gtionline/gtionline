import { BooleanExpression, BooleanExpressionBase } from './expression';

export const BooleanOperation = {
  NOT: 'not',
  AND: 'and',
  OR: 'or',
  XOR: 'xor',
  XNOR: 'xnor',
  NAND: 'nand',
  NOR: 'nor',
  IMPLIES: 'implies',
};

const Execute = {
  not(x) { return !x; },
  and(x, y) { return x && y; },
  or(x, y) { return x || y; },
  xor(x, y) { return (x && !y) || (!x && y); },
  xnor(x, y) { return !((x && !y) || (!x && y)); },
  nand(x, y) { return !(x && y); },
  nor(x, y) { return !(x || y); },
  implies(x, y) { return x || y; },
};

export class NAryExpression extends BooleanExpressionBase {
  constructor(op, operands, hasParentheses) {
    if (operands.length < 2) {
      throw Error('at least two operands are required for an n-ary expression');
    }

    super();
    this.kind = BooleanExpression.OPERATOR;
    this.operator = op;
    this.operands = operands;
    this.hasParentheses = hasParentheses;
  }

  toString() {
    const string = this.operands
      .map((operand) => operand.toString())
      .join(` ${this.operator} `);
    if (this.hasParentheses) {
      return `(${string})`;
    }
    return string;
  }

  toStringWithoutParentheses() {
    return this.operands
      .map((operand) => operand.toString())
      .join(` ${this.operator} `);
  }

  toLatex() {
    const string = this.operands
      .map((operand) => operand.toLatex())
      .join(this.operator);
    if (this.hasParentheses) {
      return `(${string})`;
    }
    return string;
  }

  hasChildren() {
    return true;
  }

  children() {
    return this.operands;
  }

  eval(variables) {
    let ret = this.operands[0].eval(variables);
    for (let i = 1; i < this.operands.length; i += 1) {
      ret = Execute[this.operator](ret, this.operands[i].eval(variables));
    }
    return ret;
  }
}

export class UnaryExpression extends BooleanExpressionBase {
  constructor(op, operands, hasParentheses) {
    if (operands.length !== 1) {
      throw Error('exactly one operand is required for a unary expression');
    }

    super();
    this.kind = BooleanExpression.OPERATOR;
    this.operator = op;
    [this.operand] = operands;
    this.hasParentheses = hasParentheses;
  }

  toString() {
    const string = `${this.operator} ${this.operand}`;
    if (this.hasParentheses) {
      return `(${string})`;
    }
    return string;
  }

  hasChildren() {
    return true;
  }

  toLatex() {
    return this.operands;
  }

  children() {
    return [this.operand];
  }

  eval(variables) {
    return Execute[this.operator](this.operands[0].eval(variables));
  }
}

export function makeBooleanOperation(operator, operands, hasParentheses) {
  if (operator === BooleanOperation.NOT) {
    return new UnaryExpression(
      operator,
      [operands],
      hasParentheses,
    );
  }
  return new NAryExpression(
    operator,
    operands,
    hasParentheses,
  );
}
