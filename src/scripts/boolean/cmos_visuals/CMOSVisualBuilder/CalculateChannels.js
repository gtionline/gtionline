import {
  CMOSVisual,
  CMOSVisualExpression,
  CMOSVisualSeriesElement,
  CMOSVisualParallelElement,
  CMOSVisualTransistor,
} from '../CMOSVisual';

/**
 * Responsible for calculating the channels for each element.
 * @constructor
 * @param {CMOSVisual} [visualElement] The visual hull for which the channels will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class CalculateChannels {
  constructor(visualElement, info) {
    this.info = info;
    this.result = this._calculateChannels(visualElement);
  }

  /**
     * Determines how the given VisualElement will be handled.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
     * The VisualElement to be handled.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */
  _calculateChannels(visualElement) {
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
      throw Error('CMOSVisualBuilder.calculateChannels(CMOSVisual): visualElement is of unknown type.');
    }

    return visualElement;
  }

  /**
     * Calculates the channels for a CMOSVisual Object.
     * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
     */
  _handleCMOSVisual(visualElement) {
    for (const child of visualElement.children) {
      this._calculateChannels(child);
    }
  }

  /**
     * Calculates the channels for a CMOSVisualExpression Object.
     * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
     */
  _handleCMOSVisualExpression(visualElement) {
    // VisualExpressions always need to account for every existing channel.
    for (const key in this.info.channelTable) {
      if (Object.prototype.hasOwnProperty.call(this.info.channelTable, key)) {
        visualElement.addChannel(this.info.channelTable[key]);
      }
    }
    for (const child of visualElement.children) {
      this._calculateChannels(child);
    }
  }

  /**
     * Calculates the channels for a CMOSVisualSeriesElement Object.
     * @param {CMOSVisualSeriesElement} [visualElement] The CMOSVisualSeriesElement to be handled.
     */
  _handleCMOSVisualSeriesElement(visualElement) {
    // VisualSeriesElements will only account for channels used by it.
    for (const child of visualElement.children) {
      this._calculateChannels(child);
      for (const channel of child.channels) {
        visualElement.addChannel(channel);
      }
    }
  }

  /**
     * Calculates the channels for a CMOSVisualParallelElement Object.
     * @param {CMOSVisualParallelElement} [visualElement]
     * The CMOSVisualParallelElement to be handled.
     */
  _handleCMOSVisualParallelElement(visualElement) {
    // VisualParallelElements will only account for channels used by it.
    for (let i = 0; i < visualElement.children.length; i += 1) {
      const child = visualElement.children[i];
      this._calculateChannels(child);
      for (const channel of child.channels) {
        visualElement.addChannel(channel);
      }
      if (i > 0) {
        /*
        "Needed Channels" are channels which do not connect to the first
        row of the VisualParallelElement.
        If useOnlyNeededChannels is active, they determine the space needed
        to guide the channels into the inside
        of the VisualParallelElement, as channels which connect to the first
        row can be directly connected.
        */
        for (const channel of child.channels) {
          visualElement.addNeededChannel(channel);
        }
      }
    }
  }

  /**
     * Calculates the channels for a CMOSVisualTransistor Object.
     * @param {CMOSVisualTransistor} [visualElement] The CMOSVisualTransistor to be handled.
     */
  _handleCMOSVisualTransistor(visualElement) {
    // A CMOSVisualTransistor only knows the channel which connect to it.
    const id = this.info.getChannelId(visualElement.content.src);
    if (id != null) {
      visualElement.addChannel(id);
    }
  }

  /**
     * Used to retrieve the visual hull after calculating its channels.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
