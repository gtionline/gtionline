export const NetworkType = {
  PULLUP: 'pullup',
  PULLDOWN: 'pulldown',
};

export class CMOSExpression {
  constructor(name, parent, booleanExpression, pullUp = null, pullDown = null) {
    this.name = name;
    this.id = null;

    this.parent = parent;
    this.connectedTo = [];

    this.booleanExpression = booleanExpression;

    this.pullUp = pullUp;
    this.pullDown = pullDown;
  }

  setId(id) {
    this.id = id;
  }

  addConnection(transistor) {
    this.connectedTo.push(transistor);
  }
}
