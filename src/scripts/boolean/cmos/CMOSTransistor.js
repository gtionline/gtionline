export const CMOSTransistorType = {
  PMOS: 'pmos',
  NMOS: 'nmos',
};

/**
 * Represents a transistor in a CMOS circuit
 * @constructor
 * @param {CMOSExpression || CMOSVariable || CMOSLiteral} src The element
 * to which this transistor is connected to.
 * @param {CMOSExpression || CMOSElement} parent The parent for this transistor.
 * @param {CMOSTransistorType} type The transistor type.
 */

export class CMOSTransistor {
  constructor(type, src, parent) {
    this.src = src;
    this.type = type;
    this.parent = parent;
  }
}
