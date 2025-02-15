import {
  NetworkType,
} from '../../cmos/CMOSExpression';

import {
  CMOSVisual,
  CMOSVisualExpression,
  CMOSVisualSeriesElement,
  CMOSVisualParallelElement,
  CMOSVisualTransistor,
} from '../CMOSVisual';

import {
  HORIZONTALALIGNMENT,
} from '../CMOSVisualInfo';

/**
 * Responsible for calculating the connectionPoints for each element.
 * @constructor
 * @param {CMOSVisual} [visualElement] The visual hull for which
 * the connectionPoints will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class CalculateConnectionPoints {
  constructor(hull, info) {
    this.info = info;
    this.result = this._calculateConnectionPoints(hull);
  }

  /**
     * Determines how the given VisualElement will be handled.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
     * The VisualElement to be handled.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */
  _calculateConnectionPoints(visualElement) {
    if (visualElement instanceof CMOSVisual) {
      this._handleCMOSVisual(visualElement);
    } else if (visualElement instanceof CMOSVisualExpression) {
      this._handleCMOSVisualExpression(visualElement);
    } else if (visualElement instanceof CMOSVisualSeriesElement) {
      this._handleCMOSVisualSeriesElement(visualElement);
    } else if (visualElement instanceof CMOSVisualParallelElement) {
      this._handleCMOSVisualParallelElement(visualElement);
    } else if (visualElement instanceof CMOSVisualTransistor) {
      this._handleCMOSVisualTransistor(visualElement);
    } else {
      throw Error('CalculateConnectionPoints._calculateConnectionPoints(CMOSVisual): visualElement is of unknown type.');
    }

    return visualElement;
  }

  /**
     * Calculates the connectionPoints for a CMOSVisual Object.
     * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
     */
  _handleCMOSVisual(visualElement) {
    for (const child of visualElement.children) {
      this._calculateConnectionPoints(child);
    }
  }

  /**
     * Calculates the connectionPoints for a CMOSVisualExpression Object.
     * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
     */
  _handleCMOSVisualExpression(visualElement) {
    for (const child of visualElement.children) {
      this._calculateConnectionPoints(child);
    }

    // CMOSVisualExpressions take the connectionPoints of their highest
    // and lowest child (by position).
    visualElement.upperConnectionPoint = visualElement.children[0].upperConnectionPoint;
    visualElement.lowerConnectionPoint = visualElement.children[1].lowerConnectionPoint;
  }

  /**
     * Calculates the connectionPoints for a CMOSVisualSeriesElement Object.
     * @param {CMOSVisualSeriesElement} [visualElement] The CMOSVisualSeriesElement to be handled.
     */
  _handleCMOSVisualSeriesElement(visualElement) {
    for (const child of visualElement.children) {
      this._calculateConnectionPoints(child);
    }

    // CMOSVisualSeriesElements take the connectionPoints of their
    // highest and lowest child (by position).
    visualElement.upperConnectionPoint = visualElement.children[0].upperConnectionPoint;
    visualElement.lowerConnectionPoint = visualElement.children[visualElement.children.length
      - 1].lowerConnectionPoint;
  }

  /**
     * Calculates the connectionPoints for a CMOSVisualParallelElement Object.
     * @param {CMOSVisualParallelElement} [visualElement]
     * The CMOSVisualParallelElement to be handled.
     */
  _handleCMOSVisualParallelElement(visualElement) {
    for (const child of visualElement.children) {
      this._calculateConnectionPoints(child);
    }

    let upperX = 0;
    let lowerX = 0;

    let upperY = 0;
    let lowerY = 0;

    // Determine x-values
    if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.LEFT) {
      // Take the connectionPoints of your leftmost child as reference.
      upperX = visualElement.children[0].upperConnectionPoint.x;
      lowerX = visualElement.children[0].lowerConnectionPoint.x;
    } else if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.CENTER) {
      // Take the average of connectionPoints from your leftmost and rightmost child as reference.
      upperX = (visualElement.children[0].upperConnectionPoint.x
        + visualElement.children[visualElement.children.length - 1].upperConnectionPoint.x) / 2;
      lowerX = (visualElement.children[0].lowerConnectionPoint.x
        + visualElement.children[visualElement.children.length - 1].lowerConnectionPoint.x) / 2;
    } else if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.RIGHT) {
      // Take the connectionPoints of your rightmost child as reference.
      upperX = visualElement.children[visualElement.children.length - 1].upperConnectionPoint.x;
      lowerX = visualElement.children[visualElement.children.length - 1].lowerConnectionPoint.x;
    }

    // Determine y-values
    // Find the maximum and minimum y-value.
    upperY = visualElement.y + visualElement.height;
    lowerY = visualElement.y;
    for (const child of visualElement.children) {
      if (child.upperConnectionPoint.y < upperY) {
        upperY = child.upperConnectionPoint.y;
      }
      if (child.lowerConnectionPoint.y > lowerY) {
        lowerY = child.lowerConnectionPoint.y;
      }
    }

    // Account for the space needed to guide channels.
    if (visualElement.content.networkType === NetworkType.PULLDOWN && this.info.channelSymmetry) {
      if (this.info.useOnlyNeededChannels) {
        upperY -= visualElement.neededChannels.length * this.info.channelWidth
          + this.info.parallelElementChannelOffset;
      } else {
        upperY -= this.info.channelNum * this.info.channelWidth
          + this.info.parallelElementChannelOffset;
      }
    } else if (this.info.useOnlyNeededChannels) {
      lowerY += visualElement.neededChannels.length * this.info.channelWidth
        + this.info.parallelElementChannelOffset;
    } else {
      lowerY += this.info.channelNum * this.info.channelWidth
        + this.info.parallelElementChannelOffset;
    }

    // Set connectionPoints
    visualElement.upperConnectionPoint = {
      x: upperX,
      y: upperY,
    };
    visualElement.lowerConnectionPoint = {
      x: lowerX,
      y: lowerY,
    };
  }

  /**
     * Calculates the connectionPoints for a CMOSVisualTransistor Object.
     * @param {CMOSVisualTransistor} [visualElement] The CMOSVisualTransistor to be handled.
     */
  _handleCMOSVisualTransistor(visualElement) {
    // CMOSVisualTransistors have defined connectionPoints.
    visualElement.upperConnectionPoint = {
      x: visualElement.x + visualElement.width - this.info.transistorPadRight,
      y: visualElement.y,
    };

    visualElement.lowerConnectionPoint = {
      x: visualElement.x + visualElement.width - this.info.transistorPadRight,
      y: visualElement.y + visualElement.height,
    };
  }

  /**
     * Used to retrieve the visual hull after calculating its connectionPoints.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
