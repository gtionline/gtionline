import {
  CMOSVisual,
  CMOSVisualExpression,
  CMOSVisualSeriesElement,
  CMOSVisualParallelElement,
  CMOSVisualTransistor,
} from '../CMOSVisual';

import {
  CMOSExpression,
} from '../../cmos/CMOSExpression';
import {
  CMOSVariable,
} from '../../cmos/CMOSVariable';
import {
  CMOSLiteral,
} from '../../cmos/CMOSLiteral';

/**
 * Responsible for calculating the sizes for elements of the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The visual hull for which the sizes will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class CalculateSize {
  constructor(hull, info) {
    this.info = info;

    this.result = this._calculateSize(hull, hull);
  }

  /**
     * Determines the maximum occuring leftPad in the transistors of the given VisualElement.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement] The given VisualElement.
     * @return {number} The maximum occuring leftPad.
     */
  _getMaximumLeftPad(visualElement) {
    // Determines the maximum leftPad recursively.
    let maxLeftPad = 0;
    if (visualElement instanceof CMOSVisualExpression) {
      maxLeftPad = Math.max(
        this._getMaximumLeftPad(visualElement.children[0]),
        this._getMaximumLeftPad(visualElement.children[1]),
      );
    } else if (visualElement instanceof CMOSVisualSeriesElement) {
      for (const child of visualElement.children) {
        maxLeftPad = Math.max(this._getMaximumLeftPad(child));
      }
    } else if (visualElement instanceof CMOSVisualParallelElement) {
      maxLeftPad = Math.max(this._getMaximumLeftPad(visualElement.children[0]));
    } else if (visualElement instanceof CMOSVisualTransistor) {
      // Basecase, takes either the leftPad specified in the Info-Object,
      // or the leftPad required to print the label.
      maxLeftPad = this.info.transistorPadLeft;
      if (this.info.tunnelExpressions && visualElement.content.src instanceof CMOSExpression) {
        maxLeftPad = Math.max(maxLeftPad, visualElement.content.src.name.length
          * this.info.charWidth);
      } else if (this.info.tunnelVariables && visualElement.content.src instanceof CMOSVariable) {
        maxLeftPad = Math.max(maxLeftPad, visualElement.content.src.name.length
          * this.info.charWidth);
      } else if (this.info.tunnelLiterals && visualElement.content.src instanceof CMOSLiteral) {
        maxLeftPad = Math.max(maxLeftPad, visualElement.content.src.name.length
          * this.info.charWidth);
      }
    } else {
      throw Error('CMOSVisualBuilder._getMaximumLeftPad(CMOSVisual, CMOSVisual): visualElement is of unknown type.');
    }
    return maxLeftPad;
  }

  /**
     * Determines how the given VisualElement will be handled.
     * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
     * The VisualElement to be handled.
     * @param {number} [maxLeftPad] The maximum leftPad occuring in hull.
     * @param {boolean} [adjustLeftPad] Should the leftPad be adjusted for this element.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */
  _calculateSize(hull, visualElement, maxLeftPad = 0, adjustLeftPad = false) {
    if (visualElement instanceof CMOSVisual) {
      this._handleCMOSVisual(hull, visualElement);
    } else if (visualElement instanceof CMOSVisualExpression) {
      this._handleCMOSVisualExpression(hull, visualElement);
    } else if (visualElement instanceof CMOSVisualSeriesElement) {
      this._handleCMOSVisualSeriesElement(hull, visualElement, maxLeftPad, adjustLeftPad);
    } else if (visualElement instanceof CMOSVisualParallelElement) {
      this._handleCMOSVisualParallelElement(hull, visualElement, maxLeftPad, adjustLeftPad);
    } else if (visualElement instanceof CMOSVisualTransistor) {
      this._handleCMOSVisualTransistor(hull, visualElement, maxLeftPad, adjustLeftPad);
    } else {
      throw Error('CMOSVisualBuilder._calculateSize(CMOSVisual, CMOSVisual): visualElement is of unknown type.');
    }
    return visualElement;
  }

  /**
     * Calculates the size for a CMOSVisual Object.
     * @param {CMOSVisual} [hull] The CMOSVisual to be handled.
     * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
     */
  _handleCMOSVisual(hull, visualElement) {
    let height = 0;
    let width = 0;

    // Combine the sizes of visualElements children.
    for (let i = 0; i < visualElement.children.length; i += 1) {
      const child = visualElement.children[i];
      this._calculateSize(visualElement, child);

      if (!this.info.singleRows || i === visualElement.children.length - 1) {
        width += child.width;
        height = Math.max(height, child.height);
      } else {
        width += child.width;
        height += child.height;
      }
    }

    visualElement.setSize(width, height);
  }

  /**
     * Calculates the size for a CMOSVisualExpression Object.
     * @param {CMOSVisual} [hull] The CMOSVisual this CMOSVisualExpression belongs to.
     * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
     */
  _handleCMOSVisualExpression(hull, visualElement) {
    let height = 0;
    let width = 0;

    const childPU = visualElement.children[0];
    const childPD = visualElement.children[1];

    let maxLeftPad = 0;
    if (this.info.adjustLeftPad) {
      maxLeftPad = this._getMaximumLeftPad(visualElement);
    }

    this._calculateSize(hull, childPU, maxLeftPad, this.info.adjustLeftPad);
    this._calculateSize(hull, childPD, maxLeftPad, this.info.adjustLeftPad);

    // Determine the width needed to fit both children.
    width = Math.max(childPU.width, childPD.width);

    // Determine the height needed to fit both children.
    if (this.info.equalizePullUpPullDown) {
      height = 2 * Math.max(childPU.height, childPD.height);
    } else {
      height = childPD.height + childPU.height;
    }

    // Determine the width and height needed to guide channels.
    if (this.info.useOnlyNeededChannels) {
      width += visualElement.channels.length * this.info.channelWidth;
    } else {
      width += this.info.channelNum * this.info.channelWidth;
    }

    if (this.info.tunnelExpressions && visualElement.content.id < hull.children.length - 1) {
      width += this.info.expressionTunnelWireLength
        + visualElement.content.name.length * this.info.charWidth;
      height += this.info.channelWidth;
    }

    width += this.info.channelNum * this.info.channelWidth + 2 * this.info.channelWidth;
    height += this.info.channelNum * this.info.channelWidth;

    visualElement.setSize(width, height);
  }

  /**
     * Calculates the size for a CMOSVisualSeriesElement Object.
     * @param {CMOSVisual} [hull] The CMOSVisual this CMOSVisualSeriesElement belongs to.
     * @param {CMOSVisualSeriesElement} [visualElement] The CMOSVisualSeriesElement to be handled.
     * @param {number} [maxLeftPad] The maximum leftPad occuring in hull.
     * @param {boolean} [adjustLeftPad] Should the leftPad be adjusted for this element.
     */
  _handleCMOSVisualSeriesElement(hull, visualElement, maxLeftPad, adjustLeftPad) {
    let height = 0;
    let width = 0;

    // Combine the sizes of visualElements children.
    for (const child of visualElement.children) {
      this._calculateSize(hull, child, maxLeftPad, adjustLeftPad);
      width = Math.max(width, child.width);
      height += child.height;
    }

    visualElement.setSize(width, height);
  }

  /**
     * Calculates the size for a CMOSVisualParallelElement Object.
     * @param {CMOSVisual} [hull] The CMOSVisual this CMOSVisualParallelElement belongs to.
     * @param {CMOSVisualParallelElement} [visualElement] The CMOSVisualParallelElement
     * to be handled.
     * @param {number} [maxLeftPad] The maximum leftPad occuring in hull.
     * @param {boolean} [adjustLeftPad] Should the leftPad be adjusted for this element.
     */
  _handleCMOSVisualParallelElement(hull, visualElement, maxLeftPad, adjustLeftPad) {
    let height = 0;
    let width = 0;

    for (let i = 0; i < visualElement.children.length; i += 1) {
      const child = visualElement.children[i];

      // Only for the leftMost element should the leftPad be adjusted.
      if (adjustLeftPad && i === 0) {
        this._calculateSize(hull, child, maxLeftPad, true);
      } else {
        this._calculateSize(hull, child, maxLeftPad, false);
      }

      // Account for the width needed to guide channels.
      if (i > 0) {
        if (this.info.useOnlyNeededChannels) {
          width += child.channels.length * this.info.channelWidth;
        } else {
          width += this.info.channelNum * this.info.channelWidth;
        }
      }

      width += child.width;
      height = Math.max(height, child.height);
    }

    // Account for the height needed to guide channels.
    if (this.info.useOnlyNeededChannels) {
      height += visualElement.neededChannels.length * this.info.channelWidth;
    } else {
      height += this.info.channelNum * this.info.channelWidth;
    }

    // Account for the parallelElementChannelOffset.
    height += this.info.parallelElementChannelOffset;

    visualElement.setSize(width, height);
  }

  /**
     * Calculates the size for a CMOSVisualTransistor Object.
     * @param {CMOSVisual} [hull] The CMOSVisual this CMOSVisualTransistor belongs to.
     * @param {CMOSVisualTransistor} [visualElement] The CMOSVisualTransistor to be handled.
     * @param {number} [maxLeftPad] The maximum leftPad occuring in hull.
     * @param {boolean} [adjustLeftPad] Should the leftPad be adjusted for this element.
     */
  _handleCMOSVisualTransistor(hull, visualElement, maxLeftPad, adjustLeftPad) {
    let height = 0;
    let width = 0;

    let padLeft;

    if (adjustLeftPad) {
      // Simply take the maxLeftPad.
      padLeft = maxLeftPad;
    } else {
      // Make sure that there is enough space for a label if need be.
      padLeft = this.info.transistorPadLeft;

      if (this.info.tunnelExpressions && visualElement.content.src instanceof CMOSExpression) {
        padLeft = Math.max(padLeft, visualElement.content.src.name.length * this.info.charWidth);
      } else if (this.info.tunnelVariables && visualElement.content.src instanceof CMOSVariable) {
        padLeft = Math.max(padLeft, visualElement.content.src.name.length * this.info.charWidth);
      } else if (this.info.tunnelLiterals && visualElement.content.src instanceof CMOSLiteral) {
        padLeft = Math.max(padLeft, visualElement.content.src.name.length * this.info.charWidth);
      }
    }

    width = padLeft + this.info.transistorWidth + this.info.transistorPadRight;
    height = this.info.transistorPadTop + this.info.transistorHeight + this.info.transistorPadBot;

    visualElement.setLeftPad(padLeft);
    visualElement.setSize(width, height);
  }

  /**
     * Used to retrieve the visual hull after calculating the sizes.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
