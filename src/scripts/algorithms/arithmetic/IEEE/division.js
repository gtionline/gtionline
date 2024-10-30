import { NumberIEEE } from './numberIEEE';
import { NumberBaseNSigned } from '../baseNSigned/numberBaseNSigned';
import { DivisionBaseNSigned } from '../baseNSigned/division';
import { Algorithm } from '../../algorithm';
import { roundArray } from '../../calcHelper';

export class DivisionIEEE {
  /**
   * @param {NumberIEEE} n1 - Dividend IEEE number
   * @param {NumberIEEE} n2 - Divisor IEEE number
   */
  constructor(n1, n2) {
    this._validateInputs(n1, n2);
    this.producedOverflow = false;
    this.watcher = null;
    this.result = this._divide(n1, n2);
  }

  /**
   * Validates that input numbers are compatible for division.
   * @private
   */
  _validateInputs(n1, n2) {
    if (n1.expBitNum !== n2.expBitNum) {
      throw new Error(`DivisionIEEE: expBitNum of n1(${n1.expBitNum}) and n2(${n2.expBitNum}) not compatible.`);
    }
    if (n1.manBitNum !== n2.manBitNum) {
      throw new Error(`DivisionIEEE: manBitNum of n1(${n1.manBitNum}) and n2(${n2.manBitNum}) not compatible.`);
    }
  }

  /**
   * Performs IEEE division.
   * @private
   */
  _divide(n1, n2) {
    this.watcher = new Algorithm();
  
    const { expBitNum, manBitNum } = n1;
    const bitNum = 1 + expBitNum + manBitNum;
    const sign = ((n1.sign && !n2.sign) || (!n1.sign && n2.sign)) + 0;

    this.watcher = this.watcher.step('DivMantissa').saveVariable('sign', sign);

    const edgecaseResult = this._handleEdgecases(n1, n2, expBitNum, manBitNum, bitNum, sign);
    if (edgecaseResult) {
      this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'handled');
      return edgecaseResult;
    }

    const { unnormalizedMantissa, shift } = this._divideMantissas(n1, n2);
    console.log('unnormalizedMantissa', unnormalizedMantissa, shift);
    const { normalizedMantissa, finalE } = this._normalizeMantissa(unnormalizedMantissa, shift, n1, n2, manBitNum);
    console.log('normalizedMantissa', normalizedMantissa, finalE);
    return this._createResult(sign, finalE, normalizedMantissa, expBitNum, manBitNum, bitNum);
  }

  /**
   * Handles edge cases for division.
   * @private
   */
  _handleEdgecases(n1, n2, expBitNum, manBitNum, bitNum, sign) {
    if (n1.isNaN || n2.isNaN || (n1.isInfinity && n2.isInfinity) || (n1.isZero && n2.isZero)) {
      return this._createNaNResult(expBitNum, manBitNum, bitNum);
    }

    if ((n1.isInfinity && !n2.isInfinity) || (!n1.isZero && n2.isZero)) {
      return this._createInfinityResult(sign, expBitNum, manBitNum);
    }

    if ((!n1.isInfinity && n2.isInfinity) || n1.isZero) {
      return this._createZeroResult(sign, expBitNum, manBitNum);
    }

    return null;
  }

  /**
   * Divides the mantissas of two IEEE numbers.
   * @private
   */
  _divideMantissas(n1, n2) {
    const op1 = new NumberBaseNSigned(2, n1.mantissaBits, n1.offset, false);
    const op2 = new NumberBaseNSigned(2, n2.mantissaBits, n2.offset, false);
    console.log('Debug: Op1:', op1);
    console.log('Debug: Op2:', op2);

    const division = new DivisionBaseNSigned(
      op1,
      op2,
      Math.max(n1.manBitNum, n2.manBitNum) + 2
    );

    this.watcher = this.watcher.step('Division')
      .saveVariable('division', division.watcher);

    const divisionResult = division.getResult();
    const unnormalizedMantissa = [...divisionResult.arr];
    console.log('Debug: Division result:', divisionResult);

    // Calculate shift
    const firstOne1 = op1.arr.findIndex(bit => bit === 1);
    const firstOne2 = op2.arr.findIndex(bit => bit === 1);
    console.log('firstOne1', firstOne1, 'firstOne2', firstOne2, n1.arr, n2.arr);
    let shift = (firstOne2 - firstOne1) - 1; // + 1 to get the overflow bit
    if (division.firstPositiveStep) { // that means that a/b, after the alignment b < a, that means the comma is one position later
      console.log('Debug: First positive step, shift is increased by 1');
      shift += 1;
    }

    this.watcher = this.watcher.step('DivMantissa')
      .saveVariable('unnormalizedMantissa', unnormalizedMantissa)
      .saveVariable('shift', shift);

    return { unnormalizedMantissa, shift };
  }

  /**
   * Normalizes the mantissa after division.
   * @private
   */
  _normalizeMantissa(unnormalizedMantissa, shift, n1, n2, manBitNum) {
    let normalizedMantissa = [];
    const toRound = unnormalizedMantissa.length <= manBitNum+2 ? false : unnormalizedMantissa[manBitNum + 2] === 1;

    for (let i = 0; i <= manBitNum+1; i++) {
      const access = i + Math.max(-shift, 0);
      const num = access < unnormalizedMantissa.length ? unnormalizedMantissa[access] : 0;
      normalizedMantissa.push(num);
    }
    console.log('Final E:', n1.E, n2.E, n1.bias, shift);
    let finalE = n1.E - n2.E + n1.bias + shift;
    // Handle denormalized numbers
    if (finalE <= 0) {
      console.log('Debug: Denormalized result', normalizedMantissa, finalE, manBitNum);
      normalizedMantissa = this._handleDenormalizedResult(normalizedMantissa, finalE, manBitNum);
      finalE = 0;
    }
    // Normalized mantissa without implicit 1/0
    normalizedMantissa.splice(0, 1);

    console.log('Debug: unnormalizedMantissa (before rounding):', unnormalizedMantissa, shift, manBitNum);
    console.log('Debug: normalizedMantissa (before rounding):', normalizedMantissa);
    if (toRound) {
      normalizedMantissa = roundArray(normalizedMantissa, manBitNum+1, toRound, n1.base);
    }
    // remove the last bit, necessary for IEEE rounding
    normalizedMantissa.pop();

    this.watcher = this.watcher.step('CalculateExp')
      .saveVariable('E1', n1.E)
      .saveVariable('E2', n2.E)
      .saveVariable('Bias', n1.bias)
      .saveVariable('Shift', shift)
      .saveVariable('EUnshifted', n1.E - n2.E + n1.bias)
      .saveVariable('FinalE', finalE);
    
    this.watcher = this.watcher.step('Mantissa')
    .saveVariable('unnormalizedMantissa', [...unnormalizedMantissa])
    .saveVariable('normalizedMantissa', [...normalizedMantissa]);

    return { normalizedMantissa, finalE };
  }

   /**
   * Handles denormalized results.
   * @private
   */
   _handleDenormalizedResult(mantissa, finalE, manBitNum) {
    const shiftRight = Math.abs(finalE);
    const result = new Array(manBitNum).fill(0);
    
    for (let i = 0; i <= manBitNum - shiftRight; i++) {
      result[i + shiftRight] = mantissa[i];
    }
    console.log('Debug: Denormalized result:', mantissa, finalE, manBitNum, shiftRight, result);
    return result;
  }

  /**
   * Creates the final result of the division.
   * @private
   */
  _createResult(sign, finalE, normalizedMantissa, expBitNum, manBitNum, bitNum) {
    if (normalizedMantissa.every(bit => bit === 0) && finalE === 0) {
      return this._createZeroResult(sign, expBitNum, manBitNum);
    }

    if (finalE >= (2 ** expBitNum) - 1) {
      return this._createInfinityResult(sign, expBitNum, manBitNum);
    }

    const exponentBits = this._getExponentBits(expBitNum, finalE);
    const resultArr = [sign, ...exponentBits, ...normalizedMantissa];
    const result = new NumberIEEE(expBitNum, manBitNum, resultArr);

    this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'none');
    this.watcher = this.watcher.step('Result').saveVariable('result', result);
    return result;
  }

  /**
   * Creates a NaN result.
   * @private
   */
  _createNaNResult(expBitNum, manBitNum, bitNum) {
    const result = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(1));
    this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'nan');
    this.watcher = this.watcher.step('Result').saveVariable('result', result);
    return result;
  }

  /**
   * Creates an Infinity result.
   * @private
   */
  _createInfinityResult(sign, expBitNum, manBitNum) {
    const infArray = [sign, ...Array(expBitNum).fill(1), ...Array(manBitNum).fill(0)];
    const result = new NumberIEEE(expBitNum, manBitNum, infArray);
    this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'inf');
    this.watcher = this.watcher.step('Result').saveVariable('result', result);
    return result;
  }

  /**
   * Creates a Zero result.
   * @private
   */
  _createZeroResult(sign, expBitNum, manBitNum) {
    const zeroArray = [sign, ...Array(expBitNum).fill(0), ...Array(manBitNum).fill(0)];
    const result = new NumberIEEE(expBitNum, manBitNum, zeroArray);
    this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'zero');
    this.watcher = this.watcher.step('Result').saveVariable('result', result);
    return result;
  }

  /**
   * Converts an exponent to its binary representation.
   * @private
   */
  _getExponentBits(expBitNum, exponent) {
    return exponent.toString(2).padStart(expBitNum, '0').split('').map(Number);
  }

  /**
   * Returns the result of the division.
   * @returns {NumberIEEE} The result of the IEEE division
   */
  getResult() {
    return this.result;
  }
}
