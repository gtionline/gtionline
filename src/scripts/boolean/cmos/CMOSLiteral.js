export class CMOSLiteral {
  constructor(value) {
    this.name = value ? '1' : '0';
    this.value = value && true;
    this.connectedTo = [];
  }

  addConnection(transistor) {
    this.connectedTo.push(transistor);
  }
}
