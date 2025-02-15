import {
  CMOSVisualExpression,
  CMOSVisualSeriesElement,
  CMOSVisualParallelElement,
  CMOSVisualTransistor,
} from '../CMOSVisual';

import {
  WireBuilder,
} from '../WireBuilder';
import {
  Wire,
  WireBendNode,
  TRANSISTOR_CONNECTION_TYPES,
} from '../WireNode';

/**
 * Responsible for generating the literalWires for the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The CMOSVisual for which the literalWires will be generated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class GenerateLiteralWires {
  constructor(hull, info) {
    this.info = info;
    this.result = this._generateLiteralWires(hull);
  }

  /**
     * Generates the literalWires for a given CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the literalWires will be generated.
     */
  _generateLiteralWires(hull) {
    if (this.info.tunnelLiterals) {
      // Skip generating literalWires.
      return hull;
    }

    // Loop over all literals.
    for (let i = 0; i < hull.literals.length; i += 1) {
      const literal = hull.literals[i];

      for (const transistor of literal.content.connectedTo) {
        // Connect the literalWire to its transistors.
        this._generateLiteralWire(hull, literal, hull.getTransistorByContent(transistor));
      }
    }

    return hull;
  }

  /**
     * Connects a given literalWire to a given transistor.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the literalWire will be generated.
     * @param {CMOSVisualLiteral} [literal] The literal for which the literalWire will be generated.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|CMOSVisualParallelElement|
     * CMOSVisualTransistor} [visualElement] The current VisualElement.
     * @param {CMOSVisualExpression|CMOSVisualSeriesElement|CMOSVisualParallelElement|
     * CMOSVisualTransistor} [caller] The visualElement of the calling function.
     * @return {WireBuilder} The wireBuilder for the literalWire.
     */
  _generateLiteralWire(hull, literal, visualElement, caller = null) {
    // Retrive the channelId.
    const channelId = this.info.getChannelId(literal.content);

    if (visualElement instanceof CMOSVisualExpression) {
      // Create literalWire
      const yPos = literal.content.value ? 0 : hull.height;
      const point = visualElement.getEntryPoint(channelId);
      const wire = new Wire(new WireBendNode(point.x, yPos, null, true));

      hull.addLiteralWire(wire);

      // Connect literalWire to visualElement.
      const wireBuilder = new WireBuilder(wire.root);
      wireBuilder.advanceY(point.y, true);
      return wireBuilder;
    }

    // Get the wireBuilder.
    const wireBuilder = this._generateLiteralWire(
      hull,
      literal,
      visualElement.parent,
      visualElement,
    );

    let point;

    // Connect literalWire to visualElement.
    if (visualElement instanceof CMOSVisualSeriesElement) {
      point = visualElement.getEntryPoint(channelId);

      wireBuilder.advanceY(point.y, true);
      wireBuilder.advanceX(point.x, true);
    } else if (visualElement instanceof CMOSVisualParallelElement) {
      point = visualElement.getEntryPoint(channelId, caller);

      wireBuilder.advanceY(point.y, true);
      wireBuilder.advanceX(point.x, true);
    } else if (visualElement instanceof CMOSVisualTransistor) {
      point = visualElement.getEntryPoint(channelId);

      wireBuilder.advanceY(point.y, true);
      wireBuilder.advanceX(point.x, true);
      wireBuilder.connectTransistor(visualElement, TRANSISTOR_CONNECTION_TYPES.GATE, this.info);
    }

    return wireBuilder;
  }

  /**
     * Used to retrieve the visual hull after generating the literalWires.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
