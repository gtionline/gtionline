export class CMOSVariable {
  constructor(name, booleanExpression) {
    this.name = name;
    this.connectedTo = [];
    this.booleanExpression = booleanExpression;
  }

  addConnection(transistor) {
    this.connectedTo.push(transistor);
  }
}
