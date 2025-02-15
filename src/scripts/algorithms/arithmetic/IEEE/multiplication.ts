import { NumberIEEE } from './numberIEEE';
import { NumberBaseNSigned } from '../baseNSigned/numberBaseNSigned';
import { MultiplicationBaseNSigned } from '../baseNSigned/multiplication';
import { Algorithm } from '../../algorithm';
import { roundArray } from '../../calcHelper';

export class MultiplicationIEEE {
  private watcher: Algorithm;
  private result: NumberIEEE;

  /**
   * @param {NumberIEEE} n1 - First IEEE number
   * @param {NumberIEEE} n2 - Second IEEE number
   */
  constructor(n1: NumberIEEE, n2: NumberIEEE) {
    this._validateInputs(n1, n2);
    this.watcher = new Algorithm();
    this.result = this._multiply(n1, n2);
  }

  /**
   * Validates that input numbers are compatible for multiplication.
   * @private
   */
  private _validateInputs(n1: NumberIEEE, n2: NumberIEEE): void {
    if (n1.expBitNum !== n2.expBitNum) {
      throw new Error(`MultiplicationIEEE: expBitNum of n1(${n1.expBitNum}) and n2(${n2.expBitNum}) not compatible.`);
    }
    if (n1.manBitNum !== n2.manBitNum) {
      throw new Error(`MultiplicationIEEE: manBitNum of n1(${n1.manBitNum}) and n2(${n2.manBitNum}) not compatible.`);
    }
  }

  /**
   * Performs IEEE multiplication.
   * @private
   * @param {NumberIEEE} n1 - First IEEE number
   * @param {NumberIEEE} n2 - Second IEEE number
   * @returns {NumberIEEE} Result of the multiplication
   */
  private _multiply(n1: NumberIEEE, n2: NumberIEEE): NumberIEEE {
    const { expBitNum, manBitNum } = n1;
    const bitNum = 1 + expBitNum + manBitNum;
    const sign = Number((n1.sign && !n2.sign) || (!n1.sign && n2.sign));

    this.watcher = this.watcher.step('MulMantissa').saveVariable('sign', sign);

    const edgecaseResult = this._handleEdgecases(n1, n2, expBitNum, manBitNum, bitNum, sign);
    if (edgecaseResult) {
      return edgecaseResult;
    }

    const { unnormalizedMantissa, shift } = this._multiplyMantissas(n1, n2);
    console.log('Debug: Unnormalized mantissa:', unnormalizedMantissa);
    console.log('Debug: Shift:', shift);

    const { normalizedMantissa, finalE } = this._normalizeMantissa(unnormalizedMantissa, shift, n1, n2, manBitNum);

    const result = this._createResult(sign, finalE, normalizedMantissa, expBitNum, manBitNum);
    return result;
  }

  /**
   * Handles edge cases for multiplication.
   * @private
   */
  private _handleEdgecases(
    n1: NumberIEEE, 
    n2: NumberIEEE, 
    expBitNum: number, 
    manBitNum: number, 
    bitNum: number, 
    sign: number
  ): NumberIEEE | null {
    if (n1.isNaN || n2.isNaN || (n1.isInfinity && n2.isZero) || (n1.isZero && n2.isInfinity)) {
      return this._createNaNResult(expBitNum, manBitNum, bitNum);
    }

    if (n1.isInfinity || n2.isInfinity) {
      return this._createInfinityResult(sign, expBitNum, manBitNum);
    }

    if (n1.isZero || n2.isZero) {
      return this._createZeroResult(sign, expBitNum, manBitNum);
    }

    return null;
  }

  /**
   * Multiplies the mantissas of two IEEE numbers.
   * @private
   */
  private _multiplyMantissas(n1: NumberIEEE, n2: NumberIEEE): { 
    unnormalizedMantissa: number[], 
    shift: number 
  } {
    const op1 = new NumberBaseNSigned(2, n1.mantissaBits);
    const op2 = new NumberBaseNSigned(2, n2.mantissaBits);
    console.log('Debug: Op1:', n1.mantissaBits, op1);
    console.log('Debug: Op2:', n2.mantissaBits, op2);

    const multiplication = new MultiplicationBaseNSigned(op1, op2);
    this.watcher = this.watcher.step('Multiplication')
      .saveVariable('multiplication', multiplication.getWatcher());
    const multiplicationResult = multiplication.getResult();
    console.log('Debug: Multiplication result:', multiplicationResult);

    const unnormalizedMantissa = [...multiplicationResult.arr];
    this.watcher = this.watcher.step('MulMantissa')
      .saveVariable('unnormalizedMantissa', unnormalizedMantissa);

    console.log('Debug: n1:', n1);
    const shift = this._calculateShift(multiplicationResult, op1.arr.length); // n1.manBitNum

    return { unnormalizedMantissa, shift };
  }

  /**
   * Calculates the shift for the mantissa.
   * @private
   */
  private _calculateShift(multiplicationResult: NumberBaseNSigned, op1Length: number): number {
    let shift = multiplicationResult.arr.length - multiplicationResult.offset - op1Length;
    console.log('Debug: shift:', shift);
    console.log('Debug: op1Length:', op1Length);

    for (let i = 0; i < multiplicationResult.arr.length; i += 1) {
      if (multiplicationResult.arr[i] === 1) break;
      shift -= 1;
    }
    console.log('Debug: shift:', shift);
    this.watcher = this.watcher.step('MulMantissa').saveVariable('shift', shift);
    return shift;
  }

  /**
   * Normalizes the mantissa after multiplication.
   * @private
   */
  private _normalizeMantissa(
    unnormalizedMantissa: number[], 
    shift: number, 
    n1: NumberIEEE, 
    n2: NumberIEEE, 
    manBitNum: number
  ): {
    normalizedMantissa: number[],
    finalE: number
  } {
    let normalizedMantissa = [];
    const toRound = unnormalizedMantissa.length <= manBitNum + 1 ? false : unnormalizedMantissa[manBitNum + 1] === 1;

    for (let i = 0; i <= manBitNum; i += 1) {
      const access = i + Math.max(-shift, 0);
      const num = access < unnormalizedMantissa.length ? unnormalizedMantissa[access] : 0;
      normalizedMantissa.push(num);
    }
    console.log('Final E:', n1.E, n2.E, n1.bias, shift);
    let finalE = n1.E + n2.E - n1.bias + shift;
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
      normalizedMantissa = roundArray(normalizedMantissa, manBitNum, toRound) as number[];
    }

    this.watcher = this.watcher.step('CalculateExp')
      .saveVariable('E1', n1.E)
      .saveVariable('E2', n2.E)
      .saveVariable('bias', n1.bias)
      .saveVariable('notShifted', n1.E + n2.E - n1.bias);

    this.watcher = this.watcher.step('MulMantissa')
      .saveVariable('normalizedMantissa', normalizedMantissa);

    return { normalizedMantissa, finalE };
  }

  /**
   * Handles denormalized results.
   * @private
   */
  private _handleDenormalizedResult(
    mantissa: number[], 
    finalE: number, 
    manBitNum: number
  ): number[] {
    const shiftRight = Math.abs(finalE);
    const result = new Array(manBitNum).fill(0);

    for (let i = 0; i <= manBitNum - shiftRight; i += 1) {
      result[i + shiftRight] = mantissa[i];
    }
    console.log('Debug: Denormalized result:', mantissa, finalE, manBitNum, shiftRight, result);
    return result;
  }

  /**
   * Creates the final result of the multiplication.
   * @private
   */
  private _createResult(
    sign: number, 
    finalE: number, 
    normalizedMantissa: number[], 
    expBitNum: number, 
    manBitNum: number
  ): NumberIEEE {
    if (normalizedMantissa.every((bit) => bit === 0) && finalE === 0) {
      return this._createZeroResult(sign, expBitNum, manBitNum);
    }
    console.log('finalE: inf?', finalE, (2 ** expBitNum) - 1);
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
  private _createNaNResult(
    expBitNum: number, 
    manBitNum: number, 
    bitNum: number
  ): NumberIEEE {
    const result = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(1));
    this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'nan');
    this.watcher = this.watcher.step('Result').saveVariable('result', result);
    return result;
  }

  /**
   * Creates an Infinity result.
   * @private
   */
  private _createInfinityResult(
    sign: number, 
    expBitNum: number, 
    manBitNum: number
  ): NumberIEEE {
    const infArray = [sign, ...Array(expBitNum).fill(1), ...Array(manBitNum).fill(0)];
    const result = new NumberIEEE(expBitNum, manBitNum, infArray);
    console.log('infArray', infArray);
    this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'inf');
    this.watcher = this.watcher.step('Result').saveVariable('result', result);
    return result;
  }

  /**
   * Creates a Zero result.
   * @private
   */
  private _createZeroResult(
    sign: number, 
    expBitNum: number, 
    manBitNum: number
  ): NumberIEEE {
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
  private _getExponentBits(expBitNum: number, exponent: number): number[] {
    return exponent.toString(2).padStart(expBitNum, '0').split('').map(Number);
  }

  /**
   * Returns the result of the multiplication.
   * @returns {NumberIEEE} The result of the IEEE multiplication
   */
  public getResult(): NumberIEEE {
    return this.result;
  }

  /**
   * Returns the watcher of the multiplication.
   * @returns {Algorithm} The watcher of the multiplication
   */
  public getWatcher(): Algorithm {
    return this.watcher;
  }
}
