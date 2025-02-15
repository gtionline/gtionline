import { NumberIEEE } from './numberIEEE';
import { NumberBaseNComplement } from '../baseNComplement/numberBaseNComplement';
import { AdditionBaseNComplement } from '../baseNComplement/addition';
import { Algorithm } from '../../algorithm';
import { roundArray } from '../../calcHelper';

interface AdditionData {
  sign: boolean;
  normalizedMantissa: number[];
  shift: number;
  isZero?: boolean;
}

/**
 * Represents addition operation for IEEE floating-point numbers.
 */
export class AdditionIEEE {
  private result: NumberIEEE;
  private watcher: Algorithm;
  private producedOverflow: boolean;

  /**
   * Creates a new IEEE addition operation
   * @param {NumberIEEE} n1 - First IEEE number
   * @param {NumberIEEE} n2 - Second IEEE number
   */
  constructor(n1: NumberIEEE, n2: NumberIEEE) {
    this._validateInputs(n1, n2);
    this.producedOverflow = false;
    this.watcher = new Algorithm();
    this.result = this._add(n1, n2);
  }

  /**
   * Validates that input numbers are compatible for addition.
   * @private
   */
  private _validateInputs(n1: NumberIEEE, n2: NumberIEEE): void {
    if (n1.expBitNum !== n2.expBitNum) {
      throw new Error(
        `AdditionIEEE: expBitNum of n1(${n1.expBitNum}) and n2(${n2.expBitNum}) not compatible.`
      );
    }
    if (n1.manBitNum !== n2.manBitNum) {
      throw new Error(
        `AdditionIEEE: manBitNum of n1(${n1.manBitNum}) and n2(${n2.manBitNum}) not compatible.`
      );
    }
  }

  /**
   * Performs IEEE addition.
   * @private
   * @param {NumberIEEE} n1 - First IEEE number
   * @param {NumberIEEE} n2 - Second IEEE number
   * @returns {NumberIEEE} Result of the addition
   */
  private _add(n1: NumberIEEE, n2: NumberIEEE): NumberIEEE {
    this.watcher = this.watcher.step('Edgecases');

    const edgecaseResult = this._handleEdgecases(n1, n2);
    if (edgecaseResult) return edgecaseResult;

    const { expBitNum, manBitNum } = n1;
    const bitNum = 1 + expBitNum + manBitNum;

    // Get unnormalized exponent
    let exponent1: number;
    let exponent2: number;
    let mantissa1: number[];
    let mantissa2: number[];
    let sign1: number;
    let sign2: number;
    let switched: boolean | undefined;

    if (n1.exponent >= n2.exponent) {
      exponent1 = n1.exponent;
      exponent2 = n2.exponent;
      mantissa1 = [...n1.mantissaBits];
      mantissa2 = [...n2.mantissaBits];
      sign1 = n1.sign;
      sign2 = n2.sign;
    } else {
      switched = true;
      exponent1 = n2.exponent;
      exponent2 = n1.exponent;
      mantissa1 = [...n2.mantissaBits];
      mantissa2 = [...n1.mantissaBits];
      sign1 = n2.sign;
      sign2 = n1.sign;
    }

    // difference between both exponents
    const deltaE = this._getDeltaExponent(exponent1, exponent2);
    this.watcher = this.watcher.step('CalculateDeltaE')
      .saveVariable('switched', switched)
      .saveVariable('expN1', n1.exponent)
      .saveVariable('expN2', n2.exponent)
      .saveVariable('expN1Bits', [...n1.exponentBits])
      .saveVariable('expN2Bits', [...n2.exponentBits])
      .saveVariable('deltaE', deltaE)
      .saveVariable('preShift', [...mantissa2]);

    // Shift smaller mantissa (mantissa2) to bigger mantissa (add 0s at start, remove last bits)
    if (deltaE > 0) {
      for (let i = 0; i < Math.abs(deltaE); i += 1) {
        mantissa2.unshift(0);
        mantissa2.pop();
      }
    }

    const additionData = this._addMantissa(
      mantissa1,
      mantissa2,
      sign1,
      sign2,
      mantissa2.length,
      deltaE,
      n1.isDenormalized || n2.isDenormalized,
    );
    console.log('additionData', mantissa1, mantissa2, additionData.normalizedMantissa);

    const sign = additionData.sign ? 1 : 0;
    const normalizedMantissa = additionData.normalizedMantissa;
    const shift = additionData.shift;

    // Check if newly calculated mantissa is equal to 0
    if (
      additionData.isZero
      || (shift === normalizedMantissa.length - 1 && normalizedMantissa[0] === 0)
    ) {
      const result = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(0));
      this.watcher = this.watcher.step('ResultEdgecase')
        .saveVariable('edgecase', 'zero');
      this.watcher = this.watcher.step('Result')
        .saveVariable('result', result);
      return result;
    }

    // Calculate bits of the final Exponent
    let finalE = exponent1 + n1.bias + shift;
    // If we have a denormalized number, move the mantissa right again
    if (finalE <= 0) {
      // Shift the leading 1 into the mantissa
      normalizedMantissa.unshift(1);
      normalizedMantissa.pop();
      // shift the 1 to express the finalE
      for (let i = 0; i < Math.abs(finalE); i += 1) {
        normalizedMantissa.unshift(0);
        normalizedMantissa.pop();
      }
      finalE = 0;
    }
    const exponentBits = this._getExponentBits(expBitNum, finalE);

    this.watcher = this.watcher.step('Normalize')
      .saveVariable('normalizedMantissa', [...normalizedMantissa])
      .saveVariable('shift', shift)
      .saveVariable('n1ExpBits', [...n1.exponentBits])
      .saveVariable('finalExpBits', [...exponentBits]);

    // Check if newly calculated ieee is equal to inf
    if (finalE >= (2 ** expBitNum) - 1) {
      const infArray = [sign];
      infArray.push(...Array(expBitNum).fill(1));
      infArray.push(...Array(manBitNum).fill(0));
      const result = new NumberIEEE(expBitNum, manBitNum, infArray);
      this.watcher = this.watcher.step('ResultEdgecase')
        .saveVariable('edgecase', 'inf');
      this.watcher = this.watcher.step('Result')
        .saveVariable('result', result);
      return result;
    }

    // normal case result
    this.watcher = this.watcher.step('ResultEdgecase')
      .saveVariable('edgecase', 'none');
    const resultArray = [sign];
    resultArray.push(...exponentBits);
    resultArray.push(...normalizedMantissa);
    const result = new NumberIEEE(expBitNum, manBitNum, resultArray);
    this.watcher = this.watcher.step('Result')
      .saveVariable('result', result);
    return result;
  }

  /**
   * Handles edge cases for addition.
   * @private
   * @param {NumberIEEE} n1 - First IEEE number
   * @param {NumberIEEE} n2 - Second IEEE number
   * @returns {NumberIEEE|null} Result of edge case handling, or null if no edge case applies
   */
  private _handleEdgecases(n1: NumberIEEE, n2: NumberIEEE): NumberIEEE | null {
    this.watcher = this.watcher.step('Edgecases');

    const { expBitNum, manBitNum } = n1;
    const bitNum = 1 + expBitNum + manBitNum;

    // Case 1: Adding zero
    if (n1.isZero) {
      const result = new NumberIEEE(expBitNum, manBitNum, [...n2.arr]);
      this.watcher = this.watcher.step('ResultEdgecase')
        .saveVariable('edgecase', 'n2zero');
      this.watcher = this.watcher.step('Result')
        .saveVariable('result', result);
      return result;
    }
    if (n2.isZero) {
      const result = new NumberIEEE(expBitNum, manBitNum, [...n1.arr]);
      this.watcher = this.watcher.step('ResultEdgecase')
        .saveVariable('edgecase', 'none');
      this.watcher = this.watcher.step('Result')
        .saveVariable('result', result);
      return result;
    }

    // Case 2: NaN or Infinity + (-Infinity)
    if (n1.isNaN || n2.isNaN || (n1.isInfinity && n2.isInfinity && n1.sign !== n2.sign)) {
      const result = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(1));
      this.watcher = this.watcher.step('ResultEdgecase')
        .saveVariable('edgecase', 'nan');
      this.watcher = this.watcher.step('Result')
        .saveVariable('result', result);
      return result;
    }

    // Case 3: Infinity
    if (n1.isInfinity || n2.isInfinity) {
      const sign = n1.isInfinity ? n1.sign : n2.sign;
      const infArray = [sign];
      infArray.push(...Array(expBitNum).fill(1));
      infArray.push(...Array(manBitNum).fill(0));
      const result = new NumberIEEE(expBitNum, manBitNum, infArray);
      this.watcher = this.watcher.step('ResultEdgecase')
        .saveVariable('edgecase', 'inf');
      this.watcher = this.watcher.step('Result')
        .saveVariable('result', result);
      return result;
    }
    return null;
  }

  /**
   * Adds mantissas and handles normalization.
   * @private
   */
  private _addMantissa(
    mantissa1: number[],
    mantissa2: number[],
    sign1: number,
    sign2: number,
    binNum: number,
    deltaE: number,
    originallyDenormalized: boolean
  ): AdditionData {
    this.watcher = this.watcher.step('AddMantissa')
      .saveVariable('mantissa1', mantissa1)
      .saveVariable('mantissa2', mantissa2)
      .saveVariable('sign1', sign1)
      .saveVariable('sign2', sign2)
      .saveVariable('binNum', binNum);

    // Check if mantissas are equal
    const isEqual = !originallyDenormalized && this._areMantissasEqual(mantissa1, mantissa2);
    this.watcher = this.watcher.step('AddMantissa').saveVariable('equalMantissa', isEqual);

    // Handle special cases for equal mantissas
    if (isEqual) {
      return this._handleEqualMantissas(mantissa1, sign1, sign2);
    }

    // Prepare operands for addition
    const { op1, op2 } = this._prepareOperands(mantissa1, mantissa2, sign1, sign2, binNum, deltaE);

    // Perform addition
    const addition = new AdditionBaseNComplement(op1, op2);
    this.watcher = this.watcher.step('AddMantissa')
      .saveVariable('addition', JSON.parse(JSON.stringify(addition.getWatcher())));

    // Process addition result
    return this._processAdditionResult(addition, sign1, mantissa1, binNum, deltaE);
  }

  /**
   * Checks if two mantissas are equal.
   * @private
   */
  private _areMantissasEqual(mantissa1: number[], mantissa2: number[]): boolean {
    return mantissa1.length === mantissa2.length && 
           mantissa1.every((value, index) => value === mantissa2[index]);
  }

  /**
   * Handles cases where mantissas are equal.
   * @private
   */
  private _handleEqualMantissas(
    mantissa: number[],
    sign1: number,
    sign2: number
  ): AdditionData {
    if (sign1 === sign2) {
      // x + x = 2x
      console.log('mantissa', mantissa);
      const normalizedMantissa = [...mantissa.slice(1)];
      console.log('normalizedMantissa', normalizedMantissa);
      this.watcher = this.watcher.step('AddMantissa')
        .saveVariable('addition', 'none')
        .saveVariable('shift', 1)
        .saveVariable('sign', sign1)
        .saveVariable('unnormalizedMantissa', mantissa)
        .saveVariable('normalizedMantissa', normalizedMantissa);
      return { sign: sign1 == 1, normalizedMantissa, shift: 1 };
    }
    // x + (-x) = 0
    const normalizedMantissa = new Array(mantissa.length).fill(0);
    this.watcher = this.watcher.step('AddMantissa')
      .saveVariable('addition', 'none')
      .saveVariable('shift', 0)
      .saveVariable('sign', sign1)
      .saveVariable('unnormalizedMantissa', normalizedMantissa)
      .saveVariable('normalizedMantissa', normalizedMantissa);
    return {
      sign: sign1 == 1,
      normalizedMantissa,
      shift: 0,
      isZero: true,
    };
  }

  /**
   * Prepares operands for addition.
   * @private
   */
  private _prepareOperands(
    mantissa1: number[],
    mantissa2: number[],
    sign1: number,
    sign2: number,
    binNum: number,
    deltaE: number
  ): { op1: NumberBaseNComplement; op2: NumberBaseNComplement } {
    let op1: NumberBaseNComplement;
    let op2: NumberBaseNComplement;

    if (deltaE > 0) {
      op1 = new NumberBaseNComplement(2, binNum, mantissa1, binNum, false);
      const hasSign = sign1 !== sign2 && !mantissa2.every((item) => item === 0);
      op2 = new NumberBaseNComplement(2, binNum, mantissa2, binNum, hasSign);
    } else {
      op1 = new NumberBaseNComplement(2, binNum, mantissa1, binNum, sign1 === 1);
      op2 = new NumberBaseNComplement(2, binNum, mantissa2, binNum, sign2 === 1);
    }

    this.watcher = this.watcher.step('AddMantissa')
      .saveVariable('complement1', JSON.parse(JSON.stringify(op1.watcher)))
      .saveVariable('complement2', JSON.parse(JSON.stringify(op2.watcher)));

    return { op1, op2 };
  }

  /**
   * Processes the result of addition.
   * @private
   */
  private _processAdditionResult(
    addition: AdditionBaseNComplement,
    sign1: number,
    mantissa1: number[],
    binNum: number,
    deltaE: number
  ): AdditionData {
    let additionResult = addition.getResult();
    let sign = sign1 === 1;

    if (deltaE === 0) {
      additionResult = new NumberBaseNComplement(
        2,
        additionResult.arr.length,
        [...additionResult.arr],
        binNum,
        addition.negativeResult
      );
      sign = addition.negativeResult;
    }

    const unnormalizedMantissa = [...additionResult.arr];
    this.watcher = this.watcher.step('AddMantissa')
      .saveVariable('unnormalizedMantissa', unnormalizedMantissa);
    console.log('unnormalizedMantissa', unnormalizedMantissa);
    const { normalizedMantissa, shift, isZero } = this._normalizeMantissa(
      unnormalizedMantissa,
      mantissa1.length,
      addition.carryOutSet
    );

    this.watcher = this.watcher.step('AddMantissa')
      .saveVariable('shift', shift)
      .saveVariable('sign', sign)
      .saveVariable('normalizedMantissa', normalizedMantissa);

    return {
      sign,
      normalizedMantissa,
      shift,
      isZero,
    };
  }

  /**
   * Normalizes the mantissa after addition.
   * @private
   */
  private _normalizeMantissa(
    unnormalizedMantissa: number[],
    originalLength: number,
    carryOutSet: boolean
  ): { normalizedMantissa: number[]; shift: number; isZero: boolean } {
    let shift = unnormalizedMantissa.length - originalLength;

    if (carryOutSet) {
      shift = 1;
    } else {
      while (shift > -unnormalizedMantissa.length && unnormalizedMantissa[0] === 0) {
        unnormalizedMantissa.shift();
        unnormalizedMantissa.push(0);
        shift -= 1;
      }
    }

    if (shift === -unnormalizedMantissa.length) {
      return {
        normalizedMantissa: unnormalizedMantissa,
        shift,
        isZero: true
      };
    }

    unnormalizedMantissa.shift();
    unnormalizedMantissa.push(0);

    const normalizedMantissa = roundArray(unnormalizedMantissa, originalLength - 1) as number[];
    return {
      normalizedMantissa,
      shift,
      isZero: false
    };
  }

  /**
   * Calculates the difference between two exponents.
   * @private
   */
  private _getDeltaExponent(exponent1: number, exponent2: number): number {
    return exponent1 - exponent2;
  }

  /**
   * Converts an exponent to its binary representation.
   * @private
   */
  private _getExponentBits(expBitNum: number, exponent: number): number[] {
    const bits = exponent.toString(2).padStart(expBitNum, '0').split('').map(Number);
    return bits.slice(-expBitNum); // Ensure we only return the last expBitNum bits
  }

  /**
   * Returns the result of the addition.
   */
  public getResult(): NumberIEEE {
    return this.result;
  }

  /**
   * Returns the watcher object containing the calculation steps.
   */
  public getWatcher(): Algorithm {
    return this.watcher;
  }

  /**
   * Checks if the operation produced an overflow.
   */
  public hasOverflow(): boolean {
    return this.producedOverflow;
  }
}
