import { BooleanExpressionBase, BooleanExpression } from './expression';

export class BooleanLiteral extends BooleanExpressionBase {
  constructor(value) {
    super();
    this.kind = BooleanExpression.LITERAL;
    if (value === '0') {
      this.value = false;
    } else if (value === '1') {
      this.value = true;
    } else {
      this.value = !!value;
    }
  }

  toString() {
    return this.value ? '1' : '0';
  }

  eval() {
    return this.value;
  }
}

export function makeBooleanLiteral(value) {
  return new BooleanLiteral(value);
}
