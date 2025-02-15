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
 * Responsible for generating the variableWires for the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The CMOSVisual for which the variableWires will be generated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class GenerateVariableWires {
  constructor(hull, info) {
    this.info = info;
    this.result = this._generateVariableWires(hull);
  }

  /**
     * Generates the variableWires for a given CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the variableWires will be generated.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  _generateVariableWires(hull) {
    if (this.info.tunnelVariables) {
      // Skip generating variableWires.
      return hull;
    }

    // Loop over all variables.
    for (let i = 0; i < hull.variables.length; i += 1) {
      const variable = hull.variables[i];

      // Create the variableWire.
      const startPoint = variable.getExitPoint();
      const wire = new Wire(new WireBendNode(startPoint.x, startPoint.y, null, false));

      hull.addVariableWire(wire);

      // Connect the variableWire to its transistors.
      for (const transistor of variable.content.connectedTo) {
        this._generateVariableWire(
          hull,
          new WireBuilder(wire.root),
          variable,
          hull.getTransistorByContent(transistor),
        );
      }
    }

    return hull;
  }

  /**
     * Connects a given variableWire to a given transistor.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the variableWire will be generated.
     * @param {WireBuilder} [wireBuilder] The wireBuilder for the variableWire.
     * @param {CMOSVisualExpression} [variable] The CMOSVisualVariable this variableWire belongs to.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement] The current VisualElement.
     * @param {CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [caller]
     * The visualElement of the calling function.
     */
  _generateVariableWire(hull, wireBuilder, variable, visualElement, caller = null) {
    // Get the channelId.
    const channelId = this.info.getChannelId(variable.content);

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
        for (let i = 0; i < visualElement.content.id + 1; i += 1) {
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
    this._generateVariableWire(hull, wireBuilder, variable, visualElement.parent, visualElement);
    let point;

    // Advance the variableWire.
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
