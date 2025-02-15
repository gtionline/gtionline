import { BooleanExpression, BooleanExpressionBase } from './expression';

export class BooleanVariable extends BooleanExpressionBase {
  constructor(name) {
    super();
    this.kind = BooleanExpression.VARIABLE;
    this.name = name;
  }

  toString() {
    return this.name;
  }

  eval(variable) {
    return variable[this.name];
  }
}

export function makeBooleanVariable(name) {
  return new BooleanVariable(name);
}
