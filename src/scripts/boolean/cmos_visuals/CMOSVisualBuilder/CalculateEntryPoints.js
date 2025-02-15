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

/**
 * Responsible for calculating the entryPoints for each element.
 * @constructor
 * @param {CMOSVisual} [visualElement] The visual hull for which the entryPoints will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class CalculateEntryPoints {
  constructor(hull, info) {
    this.info = info;
    this.result = this._calculateEntryPoints(hull);
  }

  /**
   * Determines how the given VisualElement will be handled.
   * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
   * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
   * The VisualElement to be handled.
   * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
   * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
   */
  _calculateEntryPoints(visualElement) {
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
      throw Error('CalculateEntryPoints._calculateEntryPoints(CMOSVisual): cmosElement is of unknown type.');
    }
    return visualElement;
  }

  /**
     * Calculates the entryPoints for a CMOSVisual Object.
     * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
     */
  _handleCMOSVisual(visualElement) {
    for (const child of visualElement.children) {
      this._calculateEntryPoints(child);
    }
  }

  /**
     * Calculates the entryPoints for a CMOSVisualExpression Object.
     * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
     */
  _handleCMOSVisualExpression(visualElement) {
    // The entryPoints of a CMOSVisualExpression are arranged in a diagonal shape.
    for (let i = 0; i < visualElement.channels.length; i += 1) {
      let yCoor;
      const xCoor = visualElement.x + i * this.info.channelWidth + this.info.channelWidth / 2;

      if (this.info.equalizePullUpPullDown) {
        yCoor = visualElement.y + Math.max(
          visualElement.children[0].height,
          visualElement.children[1].height,
        ) + this.info.channelWidth
          * i + this.info.channelWidth / 2;
      } else {
        yCoor = visualElement.y + visualElement.children[0].height
          + this.info.channelWidth * i + this.info.channelWidth / 2;
      }
      const entryPoint = {
        x: xCoor,
        y: yCoor,
      };

      visualElement.entryPointTable[visualElement.channels[i]] = entryPoint;
    }

    for (const child of visualElement.children) {
      this._calculateEntryPoints(child);
    }
  }

  /**
     * Calculates the entryPoints for a CMOSVisualSeriesElement Object.
     * @param {CMOSVisualSeriesElement} [visualElement] The CMOSVisualSeriesElement to be handled.
     */
  _handleCMOSVisualSeriesElement(visualElement) {
    for (let i = 0; i < visualElement.channels.length; i += 1) {
      let xCoor; let yCoor;
      // Determine the coordinates
      if (visualElement.parent instanceof CMOSVisualExpression) {
        // A direct connection can be established.
        // Copy the entryPoint of the parent to accomplish this.
        xCoor = visualElement.parent.getEntryPoint(visualElement.channels[i]).x;
        yCoor = visualElement.parent.getEntryPoint(visualElement.channels[i]).y;
      } else if (visualElement.content.networkType === NetworkType.PULLDOWN
        && this.info.channelSymmetry) {
        // The element must have a CMOSVisualParallelElement as parent.
        // Take the same entryPoint as its parent.
        xCoor = visualElement.x - visualElement.channels.length * this.info.channelWidth
          + i * this.info.channelWidth + this.info.channelWidth / 2;
        yCoor = visualElement.y - visualElement.channels.length * this.info.channelWidth
          + i * this.info.channelWidth + this.info.channelWidth / 2;
      } else {
        // The element must have a CMOSVisualParallelElement as parent.
        // Take the same entryPoint as its parent.
        xCoor = visualElement.x - visualElement.channels.length * this.info.channelWidth
          + i * this.info.channelWidth + this.info.channelWidth / 2;
        yCoor = visualElement.y + visualElement.height + i * this.info.channelWidth
          + this.info.channelWidth / 2;
      }

      const entryPoint = {
        x: xCoor,
        y: yCoor,
      };

      visualElement.entryPointTable[visualElement.channels[i]] = entryPoint;
    }

    for (const child of visualElement.children) {
      if (visualElement.parent instanceof CMOSVisualExpression) {
        // Let the child know that a direct connection can be established.
        child.parent = visualElement.parent;
      }
      this._calculateEntryPoints(child);
      if (visualElement.parent instanceof CMOSVisualExpression) {
        // Restore the parent value of the child.
        child.parent = visualElement;
      }
    }
  }

  /**
   * Calculates the entryPoints for a CMOSVisualParallelElement Object.
   * @param {CMOSVisualParallelElement} [visualElement]
   * The CMOSVisualParallelElement to be handled.
   */
  _handleCMOSVisualParallelElement(visualElement) {
    let xCoor;
    let yCoor;
    for (let i = 0; i < visualElement.children.length; i += 1) {
      const child = visualElement.children[i];
      if (i === 0 && visualElement.parent instanceof CMOSVisualExpression) {
        // Let the child know that a direct connection can be established.
        child.parent = visualElement.parent;
        this._calculateEntryPoints(child);

        // Restore the parent value of the child.
        child.parent = visualElement;
      } else {
        this._calculateEntryPoints(child);
      }
    }
    for (let i = 0; i < visualElement.neededChannels.length; i += 1) {
      // Determine the y-value for the needed channel
      if (visualElement.content.networkType === NetworkType.PULLDOWN && this.info.channelSymmetry) {
        yCoor = visualElement.y + i * this.info.channelWidth + this.info.channelWidth
          / 2 + this.info.parallelElementChannelOffset;
      } else {
        yCoor = visualElement.y + visualElement.height - visualElement.neededChannels.length
          * this.info.channelWidth - this.info.parallelElementChannelOffset + i
          * this.info.channelWidth + this.info.channelWidth / 2;
      }

      for (let j = 1; j < visualElement.children.length; j += 1) {
        const child = visualElement.children[j];

        if (!child.channels.includes(visualElement.neededChannels[i])) continue;
        // Determine the needed x-value for this child and channel.
        xCoor = child.getEntryPoint(visualElement.neededChannels[i]).x;
        visualElement.entryPointTable[[visualElement.neededChannels[i], child.id]] = {
          x: xCoor,
          y: yCoor,
        };
      }
    }

    const firstChild = visualElement.children[0];

    for (let i = 0; i < firstChild.channels.length; i += 1) {
      const channel = firstChild.channels[i];
      const xCoord = firstChild.getEntryPoint(channel).x;
      const yCoord = firstChild.getEntryPoint(channel).y;

      visualElement.entryPointTable[[channel, firstChild.id]] = {
        x: xCoord,
        y: yCoord,
      };
    }
  }

  /**
     * Calculates the entryPoints for a CMOSVisualTransistor Object.
     * @param {CMOSVisualTransistor} [visualElement] The CMOSVisualTransistor to be handled.
     */
  _handleCMOSVisualTransistor(visualElement) {
    // CMOSVisualTransistor have defined entryPoints.
    const xCoor = visualElement.x;
    const yCoor = visualElement.y + this.info.transistorPadTop + this.info.transistorHeight / 2;

    visualElement.entryPointTable[visualElement.channels[0]] = {
      x: xCoor,
      y: yCoor,
    };
  }

  /**
     * Used to retrieve the visual hull after calculating its entryPoints.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
