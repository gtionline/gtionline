import {
  CMOSVisual,
  CMOSVisualExpression,
} from '../CMOSVisual';

import {
  HORIZONTALALIGNMENT,
} from '../CMOSVisualInfo';

/**
 * Responsible for calculating the exitPoints for CMOSVisualExpressions.
 * @constructor
 * @param {CMOSVisual} [visualElement] The visual hull for which the exitPoints will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class CalculateExitPoints {
  constructor(hull, info) {
    this.info = info;
    this.result = this._calculateExitPoints(hull);
  }

  /**
   * Determines how the given VisualElement will be handled.
   * @param {CMOSVisual|CMOSVisualExpression} [visualElement] The VisualElement to be handled.
   * @return {CMOSVisual|CMOSVisualExpression} The given VisualElement.
   */
  _calculateExitPoints(visualElement) {
    if (visualElement instanceof CMOSVisual) {
      this._handleCMOSVisual(visualElement);
    } else if (visualElement instanceof CMOSVisualExpression) {
      this._handleCMOSVisualExpression(visualElement);
    } else {
      throw Error('CalculateEntryPoints._calculateExitPoints(CMOSVisual): cmosElement is of unknown type.');
    }

    return visualElement;
  }

  /**
     * Calculates the exitPoints for a CMOSVisual Object.
     * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
     */
  _handleCMOSVisual(visualElement) {
    for (const child of visualElement.children) {
      this._calculateExitPoints(child);
    }

    // Calcultate exitPoints for variables if necessary.
    if (this.info.tunnelVariables) {
      return;
    }
    for (const variable of visualElement.variables) {
      const xCoor = -1;
      const yCoor = visualElement.children[0].getEntryPoint(
        this.info.getChannelId(variable.content),
      ).y;
      variable.exitPoint = {
        x: xCoor,
        y: yCoor,
      };
    }
  }

  /**
     * Calculates the exitPoints for a CMOSVisualExpression Object.
     * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
     */
  _handleCMOSVisualExpression(visualElement) {
    const point1 = visualElement.children[0].lowerConnectionPoint;
    const point2 = visualElement.children[1].upperConnectionPoint;

    let xCoor; let
      yCoor;

    // Determine the x-component
    if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.LEFT) {
      xCoor = Math.min(point1.x, point2.x);
    } else if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.CENTER) {
      xCoor = (point1.x + point2.x) / 2;
    } else if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.RIGHT) {
      xCoor = Math.max(point1.x, point2.x);
    }

    // Determine the y-component
    if (visualElement.content.id >= visualElement.content.parent.expressions.length - 1) {
      // The exitPoint of the last CMOSVisualExpression should always be in the middle.
      if (this.info.equalizePullUpPullDown) {
        yCoor = visualElement.y + visualElement.height / 2;
      } else {
        yCoor = visualElement.y + visualElement.children[0].height
          + (visualElement.height - visualElement.children[0].height
            - visualElement.children[1].height) / 2;
      }
    } else if (this.info.tunnelExpressions) {
      // For the exitPoint of the CMOSVisualExpression an extra channel is allocated.
      if (this.info.equalizePullUpPullDown) {
        yCoor = visualElement.y + Math.max(
          visualElement.children[0].height,
          visualElement.children[1].height,
        ) + this.info.channelNum
            * this.info.channelWidth + this.info.channelWidth / 2;
      } else {
        yCoor = visualElement.y + visualElement.children[0].height
          + this.info.channelNum * this.info.channelWidth + this.info.channelWidth / 2;
      }
    } else if (this.info.equalizePullUpPullDown) {
      // Treat the exitPoint to be calculated as an entryPoint.
      yCoor = visualElement.y + Math.max(
        visualElement.children[0].height,
        visualElement.children[1].height,
      ) + this.info.channelWidth
          * this.info.getChannelId(visualElement.content) + this.info.channelWidth / 2;
    } else {
      yCoor = visualElement.y + visualElement.children[0].height
        + this.info.channelWidth * this.info.getChannelId(visualElement.content)
        + this.info.channelWidth / 2;
    }

    visualElement.exitPoint = {
      x: xCoor,
      y: yCoor,
    };
  }

  /**
     * Used to retrieve the visual hull after calculating its exitPoints.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
