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
 * Responsible for generating the expressionWires for the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The CMOSVisual for which the expressionWires will be generated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class GenerateExpressionWires {
  constructor(hull, info) {
    this.info = info;
    this.result = this._generateExpressionWires(hull);
  }

  /**
     * Generates the expressionWires for a given CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the expressionWires will be generated.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  _generateExpressionWires(hull) {
    if (this.info.tunnelExpressions) {
      // Skip generating expressionWires.
      return hull;
    }

    // Loop over all expressions.
    for (let i = 0; i < hull.children.length - 1; i += 1) {
      const expression = hull.children[i];

      // Create the expressionWire.
      const startPoint = expression.getExitPoint();
      const wire = new Wire(new WireBendNode(startPoint.x, startPoint.y, null, true));

      hull.addExpressionWire(wire);

      // Connect the expressionWire to its transistors.
      for (const transistor of expression.content.connectedTo) {
        this._generateExpressionWire(
          hull,
          new WireBuilder(wire.root),
          expression,
          hull.getTransistorByContent(transistor),
        );
      }
    }
    return hull;
  }

  /**
     * Connects a given expressionWire to a given transistor.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the expressionWires will be generated.
     * @param {WireBuilder} [wireBuilder] The wireBuilder for the expressionWire.
     * @param {CMOSVisualExpression} [visualExpression] The CMOSVisualExpression
     * this expressionWire belongs to.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|CMOSVisualParallelElement
     * |CMOSVisualTransistor} [visualElement] The current VisualElement.
     * @param {CMOSVisualExpression|CMOSVisualSeriesElement|CMOSVisualParallelElement
     * |CMOSVisualTransistor} [caller] The visualElement of the calling function.
     */
  _generateExpressionWire(hull, wireBuilder, visualExpression, visualElement, caller = null) {
    // Get the channelId.
    const channelId = this.info.getChannelId(visualExpression.content);

    if (visualElement instanceof CMOSVisualExpression) {
      if (this.info.singleRows) {
        // Advance directly to the CMOSVisualExpression of the transistor to be connected.
        const point = visualElement.getEntryPoint(channelId);
        let leftMove;
        if (visualElement.content.id === 0) {
          leftMove = 0;
        } else if (wireBuilder.current.y > point.y) {
          leftMove = (this.info.channelNum + 1) * this.info.channelWidth;
        } else {
          leftMove = (2 * channelId + 2) * this.info.channelWidth;
        }

        wireBuilder.advanceX(point.x - leftMove, true);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
      } else {
        // Advance to the CMOSVisualExpression of the transistor to be connected.
        for (let i = visualExpression.content.id + 1; i < visualElement.content.id + 1; i += 1) {
          const point = hull.children[i].getEntryPoint(channelId);
          let leftMove;
          if (i === 0) {
            leftMove = 0;
          } else if (wireBuilder.current.y > point.y) {
            leftMove = (this.info.channelNum + 1) * this.info.channelWidth;
          } else {
            leftMove = (2 * channelId + 2) * this.info.channelWidth;
          }

          wireBuilder.advanceX(point.x - leftMove, true);
          wireBuilder.advanceY(point.y, true);
          wireBuilder.advanceX(point.x, true);
        }
      }
      return;
    }

    // Establish a connection to the parent of visualElement.
    this._generateExpressionWire(
      hull,
      wireBuilder,
      visualExpression,
      visualElement.parent,
      visualElement,
    );
    let point;

    // Advance the expressionWire.
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
  }

  /**
     * Used to retrieve the visual hull after generating the expressionWires.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
