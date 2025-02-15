import {
  CMOSVisual,
  CMOSVisualExpression,
  CMOSVisualSeriesElement,
  CMOSVisualParallelElement,
  CMOSVisualTransistor,
  CMOSVisualVariable,
  CMOSVisualLiteral,
} from '../CMOSVisual';

/**
 * Responsible for collecting transistors, variables and literals in a given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The visual hull for which everything will be collected.
 * @param {CMOSVisualBuilder} [builder] The object currently building the CMOSVisual
 * for which the sizes will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */
export class Collect {
  constructor(hull, builder, info) {
    this.builder = builder;
    this.info = info;

    this.result = this._collectAll(hull);
  }

  /**
     * Calls the collecter-functions.
     * @param {CMOSVisual} [hull] The visual hull for which everything will be collected.
     */
  _collectAll(hullIn) {
    let hull = hullIn;
    hull = this._collectTransistors(hull, hull);
    hull = this._collectVariables(hull);
    hull = this._collectLiterals(hull);
    return hull;
  }

  /**
     * Collects transistors recursively for a given CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the transistors will be collected.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement] The current VisualElement.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */
  _collectTransistors(hull, visualElement) {
    if (visualElement instanceof CMOSVisualTransistor) {
      // Found a transistor.
      hull.addTransistor(visualElement);
    } else if (visualElement instanceof CMOSVisual
            || visualElement instanceof CMOSVisualExpression
            || visualElement instanceof CMOSVisualSeriesElement
            || visualElement instanceof CMOSVisualParallelElement) {
      for (const child of visualElement.children) {
        // Recurse.
        this._collectTransistors(hull, child);
      }
    } else {
      throw Error('Collect._collectTransistors(CMOSVisual, CMOSVisual): visualElement is of unknown type.');
    }
    return visualElement;
  }

  /**
     * Collects variables for a given CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the variables will be collected.
     * @return {CMOSVisual} The given CMOSVisual.
     */
  _collectVariables(hull) {
    if (hull instanceof CMOSVisual) {
      // Simply loop over the variables in the CMOS attached to the given hull.
      for (const variable of hull.content.variables) {
        hull.addVariable(new CMOSVisualVariable(this.builder.getId(), variable));
      }
    } else {
      throw Error('Collect._collectVariables(CMOSVisual, CMOSVisual): visualElement is of unknown type.');
    }

    return hull;
  }

  /**
     * Collects literals for a given CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the literals will be collected.
     * @return {CMOSVisual} The given CMOSVisual.
     */
  _collectLiterals(hull) {
    if (hull instanceof CMOSVisual) {
      // Simply loop over the literal in the CMOS attached to the given hull.
      for (const literal of hull.content.literals) {
        hull.addLiteral(new CMOSVisualLiteral(this.builder.getId(), literal));
      }
    } else {
      throw Error('Collect._collectVariables(CMOSVisual): visualElement is of unknown type.');
    }

    return hull;
  }

  /**
     * Used to retrieve the visual hull after collecting everything.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */
  getResult() {
    return this.result;
  }
}
