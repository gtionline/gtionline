class CMOSVisualBase {
  constructor(id, content) {
    this.id = id;

    this.content = content;

    this.width = null;
    this.height = null;

    this.parent = null;

    this.x = null;
    this.y = null;

    // Absolute Position
    this.x = null;
    this.y = null;

    this.upperConnectionPoint = null;
    this.lowerConnectionPoint = null;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setParent(parent) {
    this.parent = parent;
  }
}

export class CMOSVisual extends CMOSVisualBase {
  constructor(id, content, info) {
    super(id, content);
    this.info = info;

    // Contains elements that lie inside of this element
    this.children = [];
    this.transistors = [];

    this.variables = [];
    this.literals = [];

    // IDs of Channels (List, so it is possible to sort after ID)
    this.connectionWires = [];
    this.literalWires = [];
    this.expressionWires = [];

    this.variableWires = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  addTransistor(transistor) {
    this.transistors.push(transistor);
  }

  addVariable(variable) {
    this.variables.push(variable);
  }

  addLiteral(variable) {
    this.literals.push(variable);
  }

  containsVariable(variable) {
    return this.variables.map((e) => e.content).includes(variable);
  }

  addConnectionWire(wire) {
    this.connectionWires.push(wire);
  }

  addLiteralWire(wire) {
    this.literalWires.push(wire);
  }

  addExpressionWire(wire) {
    this.expressionWires.push(wire);
  }

  addVariableWire(wire) {
    this.variableWires.push(wire);
  }

  getTransistorByContent(content) {
    for (let i = 0; i < this.transistors.length; i += 1) {
      const transistor = this.transistors[i];
      if (transistor.content === content) {
        return transistor;
      }
    }

    return null;
  }
}

export class CMOSVisualExpression extends CMOSVisualBase {
  constructor(id, content) {
    super(id, content);

    // Contains elements that lie inside of this element
    this.children = [];

    // IDs of Channels (List, so it is possible to sort after ID)
    this.channels = [];
    this.entryPointTable = {};

    this.exitPoint = null;
  }

  addChild(child) {
    this.children.push(child);
  }

  getChild(child) {
    for (let i = 0; i < this.children.length; i += 1) {
      const subElement = this.children[i];
      if (subElement === child) {
        return subElement;
      }
    }

    return null;
  }

  addChannel(channelId) {
    if (!this.channels.includes(channelId)) {
      this.channels.push(channelId);
      this.channels.sort();
    }
  }

  setExitPoint(point) {
    this.exitPoint = point;
  }

  getExitPoint() {
    return this.exitPoint;
  }

  getEntryPoint(channelId) {
    return this.entryPointTable[channelId];
  }
}

export class CMOSVisualElement extends CMOSVisualBase {
  constructor(id, content) {
    super(id, content);
    // Contains elements that lie inside of this element
    this.children = [];

    // IDs of Channels (List, so it is possible to sort after ID)
    this.channels = [];
    this.neededChannels = [];
    this.entryPointTable = {};
  }

  addChild(child) {
    this.children.push(child);
  }

  addChannel(channelId) {
    if (!this.channels.includes(channelId)) {
      this.channels.push(channelId);
      this.channels.sort();
    }
  }

  addNeededChannel(channelId) {
    if (!this.neededChannels.includes(channelId)) {
      this.neededChannels.push(channelId);
      this.neededChannels.sort();
    }
  }

  getEntryPoint(channelId, childIn = null) {
    let child = childIn;
    if (child == null) {
      child = this.children[0];
    }
    return this.entryPointTable[[channelId, child.id]];
  }
}

export class CMOSVisualSeriesElement extends CMOSVisualBase {
  constructor(id, content) {
    super(id, content);
    // Contains elements that lie inside of this element
    this.children = [];

    // IDs of Channels (List, so it is possible to sort after ID)
    this.channels = [];
    this.entryPointTable = {};
  }

  addChild(child) {
    this.children.push(child);
  }

  addChannel(channelId) {
    if (!this.channels.includes(channelId)) {
      this.channels.push(channelId);
      this.channels.sort();
    }
  }

  getEntryPoint(channelId) {
    return this.entryPointTable[channelId];
  }
}
export class CMOSVisualParallelElement extends CMOSVisualBase {
  constructor(id, content) {
    super(id, content);
    // Contains elements that lie inside of this element
    this.children = [];

    // IDs of Channels (List, so it is possible to sort after ID)
    this.channels = [];
    this.neededChannels = [];
    this.entryPointTable = {};
  }

  addChild(child) {
    this.children.push(child);
  }

  addChannel(channelId) {
    if (!this.channels.includes(channelId)) {
      this.channels.push(channelId);
      this.channels.sort();
    }
  }

  addNeededChannel(channelId) {
    if (!this.neededChannels.includes(channelId)) {
      this.neededChannels.push(channelId);
      this.neededChannels.sort();
    }
  }

  getEntryPoint(channelId, childIn = null) {
    let child = childIn;
    if (child == null) {
      child = this.children[0];
    }
    return this.entryPointTable[[channelId, child.id]];
  }
}

export class CMOSVisualTransistor extends CMOSVisualBase {
  constructor(id, content) {
    super(id, content);

    // IDs of Channel
    this.channels = [];
    this.entryPointTable = {};

    this.leftPad = null;
  }

  addChannel(channelId) {
    if (!this.channels.includes(channelId)) {
      this.channels.push(channelId);
    }
  }

  getEntryPoint(channelId) {
    return this.entryPointTable[channelId];
  }

  setLeftPad(leftPad) {
    this.leftPad = leftPad;
  }

  updateLeftPad(newLeftPad) {
    this.width -= this.leftPad;
    this.leftPad = newLeftPad;
    this.width += this.leftPad;
  }
}

export class CMOSVisualVariable {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    this.exitPoint = null;
  }

  setExitPoint(point) {
    this.exitPoint = point;
  }

  getExitPoint() {
    return this.exitPoint;
  }
}

export class CMOSVisualLiteral {
  constructor(id, content) {
    this.id = id;
    this.content = content;
  }
}
