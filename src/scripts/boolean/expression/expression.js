export const BooleanExpression = {
  OPERATOR: 'op',
  VARIABLE: 'var',
  LITERAL: 'lit',
};

export class BooleanExpressionBase {
  hasChildren() {
    return false;
  }

  children() {
    return [];
  }
}
