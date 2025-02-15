import {
  CMOSVisual,
  CMOSVisualExpression,
  CMOSVisualSeriesElement,
  CMOSVisualParallelElement,
  CMOSVisualTransistor,
} from '../CMOSVisual';

import {
  HORIZONTALALIGNMENT,
  VERTICALALIGNMENT,
} from '../CMOSVisualInfo';

import {
  NetworkType,
} from '../../cmos/CMOSExpression';

/**
 * Responsible for calculating the positions for elements of the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The visual hull for which the positions will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class CalculatePositions {
  constructor(hull, info) {
    this.info = info;
    this.result = this._calculatePositions(hull, this.info.offsetX, this.info.offsetY);
  }

  /**
     * Determines how the given VisualElement will be handled.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
     * The VisualElement to be handled.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */
  _calculatePositions(visualElement, x, y) {
    if (visualElement instanceof CMOSVisual) {
      this._handleCMOSVisual(visualElement, x, y);
    } else if (visualElement instanceof CMOSVisualExpression) {
      this._handleCMOSVisualExpression(visualElement, x, y);
    } else if (visualElement instanceof CMOSVisualSeriesElement) {
      this._handleCMOSVisualSeriesElement(visualElement, x, y);
    } else if (visualElement instanceof CMOSVisualParallelElement) {
      this._handleCMOSVisualParallelElement(visualElement, x, y);
    } else if (visualElement instanceof CMOSVisualTransistor) {
      this._handleCMOSVisualTransistor(visualElement, x, y);
    } else {
      throw Error('CMOSVisualBuilder._calculatePositions(CMOSVisual, number, number): visualElement is of unknown type.');
    }

    return visualElement;
  }

  /**
     * Calculates positions for CMOSVisualExpressions from a given CMOSVisual Object.
     * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
     * @param {number} [x] The x-value of the position for the CMOSVisual.
     * @param {number} [y] The y-value of the position for the CMOSVisual.
     */
  _handleCMOSVisual(visualElement, xIn, y) {
    // Position is given by calling function.
    let x = xIn;
    visualElement.setPosition(x, y);

    // If singleRows is active, determine the height at which to start.
    let yPos = y;
    if (this.info.singleRows) {
      // Determine the combined height of all single rows.
      let preambleHeight = 0;
      for (let i = 0; i < visualElement.children.length - 1; i += 1) {
        preambleHeight += visualElement.children[i].height;
      }

      if (this.info.alignmentVertical === VERTICALALIGNMENT.TOP
        || preambleHeight >= visualElement.children[visualElement.children.length - 1].height) {
        // No adjustments need to be made.
        yPos = y;
      } else if (this.info.alignmentVertical === VERTICALALIGNMENT.CENTER) {
        // The height of the last element is greater than
        // the preambleHeight. Place singleRows in the middle.
        yPos = y + (visualElement.children[visualElement.children.length - 1].height
          - preambleHeight) / 2;
      } else if (this.info.alignmentVertical === VERTICALALIGNMENT.BOTTOM) {
        // The height of the last element is greater than the preambleHeight.
        // Place singleRows at the bottom.
        yPos = y + visualElement.children[visualElement.children.length - 1].height
          - preambleHeight;
      }
    }

    for (let i = 0; i < visualElement.children.length; i += 1) {
      const subElement = visualElement.children[i];
      if (!this.info.singleRows || i === visualElement.children.length - 1) {
        // Determine the appropriate y-component.
        if (this.info.alignmentVertical === VERTICALALIGNMENT.TOP) {
          // Place at the top.
          yPos = y;
        } else if (this.info.alignmentVertical === VERTICALALIGNMENT.CENTER) {
          // Place in the middle.
          yPos = y + (visualElement.height - subElement.height) / 2;
        } else if (this.info.alignmentVertical === VERTICALALIGNMENT.BOTTOM) {
          // Place at the bottom.
          yPos = y + visualElement.height - subElement.height;
        }
      }

      this._calculatePositions(subElement, x, yPos);

      // Adjust the current x- and y-value.
      x += subElement.width;
      if (this.info.singleRows) {
        yPos += subElement.height;
      }
    }
  }

  /**
     * Calculates positions for CMOSVisualElements from a given CMOSVisualExpression Object.
     * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
     * @param {number} [x] The x-value of the position for the CMOSVisualExpression.
     * @param {number} [y] The y-value of the position for the CMOSVisualExpression.
     */
  _handleCMOSVisualExpression(visualElement, x, y) {
    // Position is given by calling function.
    visualElement.setPosition(x, y);

    // Get PullUp- and PullDown-Network.
    const childPU = visualElement.children[0];
    const childPD = visualElement.children[1];

    // Calculate x-components.
    let channelSize = visualElement.channels.length * this.info.channelWidth;

    let xPosPU = 0;
    let xPosPD = 0;

    // Precalculate space needed for tunneling the expression.
    let tunnelLength = 0;
    if (this.info.tunnelExpressions && visualElement.content.id
        < visualElement.parent.children.length - 1) {
      tunnelLength = visualElement.content.name.length * this.info.charWidth
        + this.info.expressionTunnelWireLength;
    }

    if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.LEFT) {
      // Place children to the left.
      xPosPU = x + channelSize;
      xPosPD = x + channelSize;
    } else if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.CENTER) {
      // Place children in the middle.
      xPosPU = x + channelSize + (visualElement.width - channelSize - 2
        * this.info.channelWidth - tunnelLength - childPU.width) / 2;
      xPosPD = x + channelSize + (visualElement.width - channelSize - 2
        * this.info.channelWidth - tunnelLength - childPD.width) / 2;
    } else if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.RIGHT) {
      // Place children to the right.
      xPosPU = x + visualElement.width - channelSize - 2
        * this.info.channelWidth - tunnelLength - childPU.width;
      xPosPD = x + visualElement.width - channelSize - 2
        * this.info.channelWidth - tunnelLength - childPD.width;
    }

    // Calculate y-components.
    if (this.info.tunnelExpressions) {
      // Adjust channelSize to account for the tunnelWire.
      channelSize += this.info.channelWidth;
    }

    let yPosPU = 0;
    let yPosPD = 0;
    if (!this.info.equalizePullUpPullDown) {
      // The two children will fit perfectly in height.
      yPosPU = y;
      yPosPD = y + visualElement.height - childPD.height;
    } else if (this.info.alignmentVertical === VERTICALALIGNMENT.TOP) {
      // Place children at the top.
      yPosPU = y;
      yPosPD = y + childPU.height + channelSize;
    } else if (this.info.alignmentVertical === VERTICALALIGNMENT.CENTER) {
      // Place children in the middle.
      const shellHeight = (visualElement.height - channelSize) / 2;
      yPosPU = y + (shellHeight - childPU.height) / 2;
      yPosPD = y + visualElement.height - childPD.height - (shellHeight - childPD.height) / 2;
    } else if (this.info.alignmentVertical === VERTICALALIGNMENT.BOTTOM) {
      // Place children at the bottom.
      yPosPD = y + visualElement.height - childPD.height;
      yPosPU = y + visualElement.height - childPD.height - channelSize - childPU.height;
    }

    this._calculatePositions(childPU, xPosPU, yPosPU);
    this._calculatePositions(childPD, xPosPD, yPosPD);
  }

  /**
     * Calculates positions for CMOSVisualElements from a given CMOSVisualSeriesElement Object.
     * @param {CMOSVisualExpression} [visualElement] The CMOSVisualSeriesElement to be handled.
     * @param {number} [x] The x-value of the position for the CMOSVisualSeriesElement.
     * @param {number} [y] The y-value of the position for the CMOSVisualSeriesElement.
     */
  _handleCMOSVisualSeriesElement(visualElement, xIn, yIn) {
    // Position is given by calling function.
    const x = xIn;
    let y = yIn;
    visualElement.setPosition(x, y);

    for (const subElement of visualElement.children) {
      // Determine x-component
      let xPos = 0;
      if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.LEFT) {
        // Place child to the left.
        xPos = x;
      } else if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.CENTER) {
        // Place child in the middle.
        xPos = x + (visualElement.width - subElement.width) / 2;
      } else if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.RIGHT) {
        // Place child to the right.
        xPos = x + visualElement.width - subElement.width;
      }

      this._calculatePositions(subElement, xPos, y);

      // Update y-component
      y += subElement.height;
    }
  }

  /**
     * Calculates positions for CMOSVisualElements from a given CMOSVisualParallelElement Object.
     * @param {CMOSVisualExpression} [visualElement] The CMOSVisualParallelElement to be handled.
     * @param {number} [x] The x-value of the position for the CMOSVisualParallelElement.
     * @param {number} [y] The y-value of the position for the CMOSVisualParallelElement.
     */
  _handleCMOSVisualParallelElement(visualElement, xIn, y) {
    // Position is given by calling function.
    let x = xIn;
    visualElement.setPosition(x, y);

    // Determine the space needed to guide channels.
    let channelSize = visualElement.neededChannels.length * this.info.channelWidth;
    if (!this.info.useOnlyNeededChannels) {
      channelSize = this.info.channelNum * this.info.channelWidth;
    }

    for (let i = 0; i < visualElement.children.length; i += 1) {
      const subElement = visualElement.children[i];

      // Determine the space needed to guide the channels which connect to the subElement.
      let channelSizeSubElement = subElement.channels.length * this.info.channelWidth;
      if (!this.info.useOnlyNeededChannels) {
        channelSizeSubElement = this.info.channelNum * this.info.channelWidth;
      }
      if (i === 0) {
        channelSizeSubElement = 0;
      }

      // Determine the y-component.
      let yPos = 0;
      if (this.info.alignmentVertical === VERTICALALIGNMENT.TOP) {
        // Place child at the top.
        yPos = y;
      } else if (this.info.alignmentVertical === VERTICALALIGNMENT.CENTER) {
        // Place child in the middle.
        yPos = y + (visualElement.height - channelSize - this.info.parallelElementChannelOffset
          - subElement.height) / 2;
      } else if (this.info.alignmentVertical === VERTICALALIGNMENT.BOTTOM) {
        // Place child at the bottom.
        yPos = y + visualElement.height - channelSize - this.info.parallelElementChannelOffset
          - subElement.height;
      }

      // Account for the channelSize and parallelElementChannelOffset.
      if (this.info.channelSymmetry && visualElement.content.networkType === NetworkType.PULLDOWN) {
        yPos += channelSize + this.info.parallelElementChannelOffset;
      }

      this._calculatePositions(subElement, x + channelSizeSubElement, yPos);

      // Update the x-component.
      x += subElement.width + channelSizeSubElement;
    }
  }

  /**
     * Sets the position of a CMOSVisualTransistor.
     * @param {CMOSVisualExpression} [visualElement] The CMOSVisualTransistor to be handled.
     * @param {number} [x] The x-value of the position for the CMOSVisualTransistor.
     * @param {number} [y] The y-value of the position for the CMOSVisualTransistor.
     */
  _handleCMOSVisualTransistor(visualElement, x, y) {
    // Position is given by calling function.
    visualElement.setPosition(x, y);
  }

  /**
     * Used to retrieve the visual hull after calculating the positions.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
