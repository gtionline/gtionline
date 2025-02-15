import {
  CMOS,
} from '../../cmos/CMOS';
import {
  CMOSExpression,
} from '../../cmos/CMOSExpression';
import {
  CMOSSeriesElement,
  CMOSParallelElement,
} from '../../cmos/CMOSElements';
import {
  CMOSTransistor,
} from '../../cmos/CMOSTransistor';

import {
  CMOSVisual,
  CMOSVisualExpression,
  CMOSVisualSeriesElement,
  CMOSVisualParallelElement,
  CMOSVisualTransistor,
} from '../CMOSVisual';

/**
 * Responsible for generation a CMOSVisual from a given CMOS.
 * @constructor
 * @param {CMOS} [cmosElement] The CMOS from which a CMOSVisual will be generated.
 * @param {CMOSVisualBuilder} [builder] The Object which is responsible for
 * constructing a CMOSVisual.
 * @param {CMOSVisualInfo} [info] The info object that will be attached to the CMOSVisual.
 */
export class GenerateVisualHull {
  constructor(cmosElement, builder, info) {
    this.info = info;
    this.builder = builder;
    this.result = this._generateVisualHull(cmosElement);
  }

  /**
     * Determines how the given CMOSElement will be handled.
     * @param {CMOS|CMOSExpression|CMOSSeriesElement|CMOSParallelElement|CMOSTransistor}
     * [visualElement] The CMOSElement to be handled.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The resulting VisualElement.
     */
  _generateVisualHull(cmosElement) {
    if (cmosElement instanceof CMOS) {
      return this._handleCMOS(cmosElement);
    } if (cmosElement instanceof CMOSExpression) {
      return this._handleCMOSExpression(cmosElement);
    } if (cmosElement instanceof CMOSSeriesElement) {
      return this._handleCMOSSeriesElement(cmosElement);
    } if (cmosElement instanceof CMOSParallelElement) {
      return this._handleCMOSParallelElement(cmosElement);
    } if (cmosElement instanceof CMOSTransistor) {
      return this._handleCMOSTransistor(cmosElement);
    }
    throw Error('CMOSVisualBuilder.generateVisualHull(CMOS): cmosElement is of unknown type.');
  }

  /**
     * Generates the CMOSVisual for CMOS Object.
     * @param {CMOS} [visualElement] The CMOS to be handled.
     * @return {CMOSVisual} The constructed CMOSVisual.
     */
  _handleCMOS(cmosElement) {
    const newElem = new CMOSVisual(this.builder.getId(), cmosElement, this.info);
    for (const subElement of cmosElement.expressions) {
      const child = this._generateVisualHull(subElement);
      child.setParent(newElem);
      newElem.addChild(child);
    }
    return newElem;
  }

  /**
     * Generates the CMOSVisualExpression for CMOSExpression Object.
     * @param {CMOS} [visualElement] The CMOSExpression to be handled.
     * @return {CMOSVisual} The constructed CMOSVisualExpression.
     */
  _handleCMOSExpression(cmosElement) {
    const newElem = new CMOSVisualExpression(this.builder.getId(), cmosElement);

    const childPU = this._generateVisualHull(cmosElement.pullUp);
    const childPD = this._generateVisualHull(cmosElement.pullDown);

    childPU.setParent(newElem);
    childPD.setParent(newElem);

    newElem.addChild(childPU);
    newElem.addChild(childPD);

    return newElem;
  }

  /**
     * Generates the CMOSVisualSeriesElement for CMOSSeriesElement Object.
     * @param {CMOS} [visualElement] The CMOSSeriesElement to be handled.
     * @return {CMOSVisual} The constructed CMOSVisualSeriesElement.
     */
  _handleCMOSSeriesElement(cmosElement) {
    const newElem = new CMOSVisualSeriesElement(this.builder.getId(), cmosElement);
    for (const subElement of cmosElement.children) {
      const child = this._generateVisualHull(subElement);
      child.setParent(newElem);
      newElem.addChild(child);
    }

    return newElem;
  }

  /**
     * Generates the CMOSVisualParallelElement for CMOSParallelElement Object.
     * @param {CMOS} [visualElement] The CMOSParallelElement to be handled.
     * @return {CMOSVisual} The constructed CMOSVisualParallelElement.
     */
  _handleCMOSParallelElement(cmosElement) {
    const newElem = new CMOSVisualParallelElement(this.builder.getId(), cmosElement);
    for (const subElement of cmosElement.children) {
      const child = this._generateVisualHull(subElement);
      child.setParent(newElem);
      newElem.addChild(child);
    }

    return newElem;
  }

  /**
     * Generates the CMOSVisualTransistor for CMOSTransistor Object.
     * @param {CMOS} [visualElement] The CMOSTransistor to be handled.
     * @return {CMOSVisual} The constructed CMOSVisualTransistor.
     */
  _handleCMOSTransistor(cmosElement) {
    return new CMOSVisualTransistor(this.builder.getId(), cmosElement);
  }

  /**
     * Used to retrieve the CMOSVisual after generating it.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
