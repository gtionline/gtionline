import { WireBendNode, WireConnectionNode, TRANSISTOR_CONNECTION_TYPES } from './WireNode';
import { CMOSTransistorType } from '../cmos/CMOSTransistor';

export class WireBuilder {
  constructor(root) {
    this.current = root;
  }

  advanceX(xCoor, enableBendPoints = false) {
    if (!this.current.containsPoint) {
      this.current.containsPoint = (enableBendPoints && this.current.parent != null && this.current.children.length > 1)
        || (enableBendPoints && this.current.children.length > 2);
    }

    if (this.current.x === xCoor) {
      return;
    }

    for (const child of this.current.children) {
      if (child instanceof WireConnectionNode || child.y !== this.current.y
        || (child.x > this.current.x && this.current.x > xCoor)
        || (child.x < this.current.x && this.current.x < xCoor)) {
        continue;
      }

      if (xCoor === child.x) {
        this.current = child;
        return;
      } if ((xCoor > child.x && child.x > this.current.x)
                 || (xCoor < child.x && child.x < this.current.x)) {
        this.current = child;
        this.advanceX(xCoor, enableBendPoints);
        return;
      }
      const newNode = new WireBendNode(xCoor, this.current.y, this.current, false);
      newNode.addChild(child);
      child.parent = newNode;
      this.current.addChild(newNode);
      this.current.removeChild(child);
      this.current = newNode;

      return;
    }

    if (this.current.parent != null && this.current.parent.y === this.current.y
      && !((this.current.parent.x > this.current.x && this.current.x > xCoor)
        || (this.current.parent.x < this.current.x && this.current.x < xCoor))) {
      if (xCoor === this.current.parent.x) {
        this.current = this.current.parent;
        return;
      } if ((xCoor > this.current.parent.x && this.current.parent.x > this.current.x)
                 || (xCoor < this.current.parent.x && this.current.parent.x < this.current.x)) {
        this.current = this.current.parent;
        this.advanceX(xCoor, enableBendPoints);
        return;
      }
      const newNode = new WireBendNode(xCoor, this.current.y, this.current.parent, false);
      this.current.parent.addChild(newNode);
      this.current.parent.removeChild(this.current);
      newNode.addChild(this.current);
      this.current.parent = newNode;

      this.current = newNode;
      return;
    }

    const newNode = new WireBendNode(xCoor, this.current.y, this.current, false);
    this.current.addChild(newNode);
    if (!this.current.containsPoint) {
      this.current.containsPoint = (enableBendPoints && this.current.parent != null && this.current.children.length > 1)
        || (enableBendPoints && this.current.children.length > 2);
    }
    this.current = newNode;
  }

  advanceY(yCoor, enableBendPoints = false) {
    if (!this.current.containsPoint) {
      this.current.containsPoint = (enableBendPoints && this.current.parent != null && this.current.children.length > 1)
        || (enableBendPoints && this.current.children.length > 2);
    }

    if (this.current.y === yCoor) {
      return;
    }
    for (const child of this.current.children) {
      if (child instanceof WireConnectionNode || child.x !== this.current.x
        || (child.y > this.current.y && this.current.y > yCoor)
        || (child.y < this.current.y && this.current.y < yCoor)) {
        continue;
      }

      if (yCoor === child.y) {
        this.current = child;
        return;
      } if ((yCoor > child.y && child.y > this.current.y)
                 || (yCoor < child.y && child.y < this.current.y)) {
        this.current = child;
        this.advanceY(yCoor, enableBendPoints);
        return;
      }
      const newNode = new WireBendNode(this.current.x, yCoor, this.current, false);
      newNode.addChild(child);
      child.parent = newNode;
      this.current.addChild(newNode);
      this.current.removeChild(child);
      this.current = newNode;
      return;
    }

    if (this.current.parent != null && this.current.parent.x === this.current.x
      && !((this.current.parent.y > this.current.y && this.current.y > yCoor)
        || (this.current.parent.y < this.current.y && this.current.y < yCoor))) {
      if (yCoor === this.current.parent.y) {
        this.current = this.current.parent;
        return;
      } if ((yCoor > this.current.parent.y && this.current.parent.y > this.current.y)
                 || (yCoor < this.current.parent.y && this.current.parent.y < this.current.y)) {
        this.current = this.current.parent;
        this.advanceY(yCoor, enableBendPoints);
        return;
      }
      const newNode = new WireBendNode(
        this.current.x,
        yCoor,
        this.current.parent,
        enableBendPoints,
      );
      this.current.parent.addChild(newNode);
      this.current.parent.removeChild(this.current);

      newNode.addChild(this.current);
      this.current.parent = newNode;

      this.current = newNode;
      return;
    }

    const newNode = new WireBendNode(this.current.x, yCoor, this.current, false);

    this.current.addChild(newNode);

    if (!this.current.containsPoint) {
      this.current.containsPoint = (enableBendPoints && this.current.parent != null && this.current.children.length > 1)
        || (enableBendPoints && this.current.children.length > 2);
    }

    this.current = newNode;
  }

  connectTransistor(visualTransistor, connectionPoint, info) {
    let xCoor; let
      yCoor;

    if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.GATE) {
      xCoor = visualTransistor.x + visualTransistor.width
        - info.transistorPadRight - info.transistorWidth;
      yCoor = visualTransistor.y + info.transistorPadTop + info.transistorHeight / 2;
    } else if (visualTransistor.content.type === CMOSTransistorType.PMOS) {
      if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.SOURCE) {
        xCoor = visualTransistor.upperConnectionPoint.x;
        yCoor = visualTransistor.upperConnectionPoint.y;
      } else if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.DRAIN) {
        xCoor = visualTransistor.lowerConnectionPoint.x;
        yCoor = visualTransistor.lowerConnectionPoint.y;
      }
    } else if (visualTransistor.content.type === CMOSTransistorType.NMOS) {
      if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.DRAIN) {
        xCoor = visualTransistor.upperConnectionPoint.x;
        yCoor = visualTransistor.upperConnectionPoint.y;
      } else if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.SOURCE) {
        xCoor = visualTransistor.lowerConnectionPoint.x;
        yCoor = visualTransistor.lowerConnectionPoint.y;
      }
    }

    const newNode = new WireConnectionNode(
      xCoor,
      yCoor,
      this.current,
      visualTransistor,
      connectionPoint,
    );

    this.current.addChild(newNode);
    this.current = newNode;
  }
}
