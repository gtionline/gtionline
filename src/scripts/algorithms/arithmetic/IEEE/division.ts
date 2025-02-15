import { NumberIEEE } from './numberIEEE';
import { NumberBaseNSigned } from '../baseNSigned/numberBaseNSigned';
import { DivisionBaseNSigned } from '../baseNSigned/division';
import { Algorithm } from '../../algorithm';
import { roundArray } from '../../calcHelper';

export class DivisionIEEE {
  private producedOverflow: boolean;
  private watcher: Algorithm;
  private result: NumberIEEE;

  constructor(n1: NumberIEEE, n2: NumberIEEE) {
    this._validateInputs(n1, n2);
    this.producedOverflow = false;
    this.watcher = new Algorithm();
    this.result = this._divide(n1, n2);
  }

  private _validateInputs(n1: NumberIEEE, n2: NumberIEEE): void {
    if (n1.expBitNum !== n2.expBitNum) {
      throw new Error(`DivisionIEEE: expBitNum of n1(${n1.expBitNum}) and n2(${n2.expBitNum}) not compatible.`);
    }
    if (n1.manBitNum !== n2.manBitNum) {
      throw new Error(`DivisionIEEE: manBitNum of n1(${n1.manBitNum}) and n2(${n2.manBitNum}) not compatible.`);
    }
  }

  private _divide(n1: NumberIEEE, n2: NumberIEEE): NumberIEEE {
    this.watcher = new Algorithm();

    const { expBitNum, manBitNum } = n1;
    const bitNum: number = 1 + expBitNum + manBitNum;
    const sign: number = ((n1.sign && !n2.sign) || (!n1.sign && n2.sign)) ? 1 : 0;

    this.watcher = this.watcher.step('DivMantissa').saveVariable('sign', sign);

    const edgecaseResult = this._handleEdgecases(n1, n2, expBitNum, manBitNum, bitNum, sign);
    if (edgecaseResult) {
      return edgecaseResult;
    }

    console.log('n1', n1);
    console.log('n2', n2);
    const { unnormalizedMantissa, shift } = this._divideMantissas(n1, n2);
    const { normalizedMantissa, finalE } = this._normalizeMantissa(unnormalizedMantissa, shift, n1, n2, manBitNum);
    return this._createResult(sign, finalE, normalizedMantissa, expBitNum, manBitNum);
  }

  private _handleEdgecases(
    n1: NumberIEEE,
    n2: NumberIEEE,
    expBitNum: number,
    manBitNum: number,
    bitNum: number,
    sign: number
  ): NumberIEEE | null {
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

  private _divideMantissas(n1: NumberIEEE, n2: NumberIEEE): {
    unnormalizedMantissa: number[];
    shift: number;
  } {
    const op1 = new NumberBaseNSigned(2, n1.mantissaBits, 0, false);
    const op2 = new NumberBaseNSigned(2, n2.mantissaBits, 0, false);

    const division = new DivisionBaseNSigned(
      op1,
      op2,
      Math.max(n1.manBitNum, n2.manBitNum) + 2,
    );
    console.log('Division', division.getResult());

    this.watcher = this.watcher.step('Division')
      .saveVariable('division', division.getWatcher());

    const divisionResult = division.getResult();
    const unnormalizedMantissa = [...divisionResult.arr];

    const firstOne1 = op1.arr.findIndex((bit) => bit === 1);
    const firstOne2 = op2.arr.findIndex((bit) => bit === 1);
    let shift = (firstOne2 - firstOne1) - 1;
    
    if (division.firstPositiveStep) {
      shift += 1;
    }

    this.watcher = this.watcher.step('DivMantissa')
      .saveVariable('unnormalizedMantissa', unnormalizedMantissa)
      .saveVariable('shift', shift);

    return { unnormalizedMantissa, shift };
  }

  private _normalizeMantissa(
    unnormalizedMantissa: number[],
    shift: number,
    n1: NumberIEEE,
    n2: NumberIEEE,
    manBitNum: number
  ): {
    normalizedMantissa: number[];
    finalE: number;
  } {
    let normalizedMantissa: number[] = [];
    const toRound = unnormalizedMantissa.length <= manBitNum + 2 ? false : unnormalizedMantissa[manBitNum + 2] === 1;

    for (let i = 0; i <= manBitNum + 1; i += 1) {
      const access = i + Math.max(-shift, 0);
      const num = access < unnormalizedMantissa.length ? unnormalizedMantissa[access] : 0;
      normalizedMantissa.push(num);
    }

    let finalE = n1.E - n2.E + n1.bias + shift;
    if (finalE <= 0) {
      normalizedMantissa = this._handleDenormalizedResult(normalizedMantissa, finalE, manBitNum);
      finalE = 0;
    }
    normalizedMantissa.splice(0, 1);

    if (toRound) {
      const base = 2;
      normalizedMantissa = roundArray(normalizedMantissa, manBitNum + 1, toRound, base) as number[];
    }
    normalizedMantissa.pop();

    this.watcher = this.watcher.step('Exponent')
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

  private _handleDenormalizedResult(mantissa: number[], finalE: number, manBitNum: number): number[] {
    const shiftRight = Math.abs(finalE);
    const result = new Array(manBitNum).fill(0);

    for (let i = 0; i <= manBitNum - shiftRight; i += 1) {
      result[i + shiftRight] = mantissa[i];
    }
    return result;
  }

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

  private _createNaNResult(expBitNum: number, manBitNum: number, bitNum: number): NumberIEEE {
    const result = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(1));
    this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'nan');
    this.watcher = this.watcher.step('Result').saveVariable('result', result);
    return result;
  }

  private _createInfinityResult(sign: number, expBitNum: number, manBitNum: number): NumberIEEE {
    const infArray = [sign, ...Array(expBitNum).fill(1), ...Array(manBitNum).fill(0)];
    const result = new NumberIEEE(expBitNum, manBitNum, infArray);
    this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'inf');
    this.watcher = this.watcher.step('Result').saveVariable('result', result);
    return result;
  }

  private _createZeroResult(sign: number, expBitNum: number, manBitNum: number): NumberIEEE {
    const zeroArray = [sign, ...Array(expBitNum).fill(0), ...Array(manBitNum).fill(0)];
    const result = new NumberIEEE(expBitNum, manBitNum, zeroArray);
    this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'zero');
    this.watcher = this.watcher.step('Result').saveVariable('result', result);
    return result;
  }

  private _getExponentBits(expBitNum: number, exponent: number): number[] {
    return exponent.toString(2).padStart(expBitNum, '0').split('').map(Number);
  }

  public getResult(): NumberIEEE {
    return this.result;
  }

  public getWatcher(): Algorithm {
    return this.watcher;
  }
}
