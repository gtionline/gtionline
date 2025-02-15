/**
 * Baseclass for SERIES- and PARALLEL-Elements
 * @constructor
 * @param {CMOSExpression || CMOSElement} parent The parent of this element.
 * @param {NetworkType} networkType Determines whether the
 * element is parent of the PULLUP or PULLDOWN network.
 */
class CMOSElement {
  constructor(parent, networkType) {
    this.children = [];
    this.parent = parent;
    this.networkType = networkType;
  }

  addChild(cmosElement) {
    this.children.push(cmosElement);
  }
}

/**
 * Represents an element in the CMOS circuit whose children are in SERIES.
 * @constructor
 * @param {CMOSExpression || CMOSElement} parent The parent of this element.
 * @param {NetworkType} networkType Determines whether the element is
 * parent of the PULLUP or PULLDOWN network.
 */
export class CMOSSeriesElement extends CMOSElement {
  constructor(parent, networkType) {
    super(parent, networkType);
  }
}

/**
 * Represents an element in the CMOS circuit whose children are in PARALLEL.
 * @constructor
 * @param {CMOSExpression || CMOSElement} parent The parent of this element.
 * @param {NetworkType} networkType Determines whether the element
 * is parent of the PULLUP or PULLDOWN network.
 */
export class CMOSParallelElement extends CMOSElement {
  constructor(parent, networkType) {
    super(parent, networkType);
  }
}
