import { GenerateVisualHull } from './CMOSVisualBuilder/GenerateVisualHull';

import { CalculateChannels } from './CMOSVisualBuilder/CalculateChannels';
import { CalculateSize } from './CMOSVisualBuilder/CalculateSize';
import { CalculatePositions } from './CMOSVisualBuilder/CalculatePositions';

import { Collect } from './CMOSVisualBuilder/Collect';

import { CalculateConnectionPoints } from './CMOSVisualBuilder/CalculateConnectionPoints';
import { CalculateEntryPoints } from './CMOSVisualBuilder/CalculateEntryPoints';
import { CalculateExitPoints } from './CMOSVisualBuilder/CalculateExitPoints';

import { GenerateConnectionWires } from './CMOSVisualBuilder/GenerateConnectionWires';
import { GenerateExpressionWires } from './CMOSVisualBuilder/GenerateExpressionWires';
import { GenerateVariableWires } from './CMOSVisualBuilder/GenerateVariableWires';
import { GenerateLiteralWires } from './CMOSVisualBuilder/GenerateLiteralWires';

import { CMOSVisualInfo, DEFAULT_OPTIONS } from './CMOSVisualInfo';

/**
 * Builds CMOSVisuals.
 */
export class CMOSVisualBuilder {
  constructor() {
    this.idCounter = -1;
  }

  /**
   * Used to generate a unique ID for a CMOSVisualElement.
   */
  getId() {
    this.idCounter += 1;
    return this.idCounter;
  }

  /**
   * Resets the internal idCounter.
   */
  resetId() {
    this.idCounter = -1;
  }

  /**
   * Set default values in the given option-object.
   * @param {JSObject} [options] Options chosen by the user.
   * @param {JSObject} [defaults] Default values for each option.
   * @return {JSObject} An option-object containing the default values for non-specifed options.
   */
  setDefaults(options, defaults) {
    return { ...defaults, ...options };
  }

  /**
   * Generate the visual hull from the given cmos object.
   * @param {CMOS} [cmos] The CMOS-Object for which a visual hull shall be generated.
   * @param {JSObject} [options] Passed options.
   * @param {Boolean} [resetId] Determines if the internal idCounter
   * will be reset after the function call.
   * @return {CMOSVisual}
   */
  buildHull(cmos, options, resetId = true) {
    let hull;
    const info = new CMOSVisualInfo(cmos, this.setDefaults(options, DEFAULT_OPTIONS));

    hull = new GenerateVisualHull(cmos, this, info).getResult();

    hull = new CalculateChannels(hull, info).getResult();
    hull = new CalculateSize(hull, info).getResult();
    hull = new CalculatePositions(hull, info).getResult();

    hull = new Collect(hull, this, info).getResult();

    hull = new CalculateConnectionPoints(hull, info).getResult();
    hull = new CalculateEntryPoints(hull, info).getResult();
    hull = new CalculateExitPoints(hull, info).getResult();

    hull = new GenerateConnectionWires(hull, info).getResult();
    hull = new GenerateExpressionWires(hull, info).getResult();
    hull = new GenerateVariableWires(hull, info).getResult();
    hull = new GenerateLiteralWires(hull, info).getResult();

    if (resetId) {
      this.resetId();
    }

    return hull;
  }
}
