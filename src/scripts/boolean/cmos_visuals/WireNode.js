export const TRANSISTOR_CONNECTION_TYPES = {
  DRAIN: 'D',
  SOURCE: 'S',
  GATE: 'G',
};

export class Wire {
  constructor(root) {
    this.root = root;
  }
}

class WireNodeBase {
  constructor(x, y, parent) {
    this.x = x;
    this.y = y;

    this.parent = parent;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    for (let i = 0; i < this.children.length; i += 1) {
      if (this.children[i] === child) {
        this.children.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  findChildByPos(x, y) {
    for (const child of this.children) {
      if (child.x === x && child.y === y) {
        return child;
      }
    }
    return null;
  }
}

export class WireBendNode extends WireNodeBase {
  constructor(x, y, parent, containsPoint) {
    super(x, y, parent);
    this.containsPoint = containsPoint;
  }
}

export class WireConnectionNode extends WireNodeBase {
  constructor(x, y, parent, transistor, connectionType) {
    super(x, y, parent);
    this.children = [];
    this.transistor = transistor;

    this.connectionType = connectionType;
  }
}
