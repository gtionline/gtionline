import { AdditionBaseNComplement } from '../baseNComplement/addition';
import { NumberBaseNComplement } from '../baseNComplement/numberBaseNComplement';
import { NumberBaseNSigned } from './numberBaseNSigned';
import { Algorithm } from '../../algorithm';

export class DivisionBaseNSigned {
  private watcher: Algorithm;
  private producedOverflow: boolean;
  public firstPositiveStep: boolean;
  private result: NumberBaseNSigned;
  private manBitNum: number | null;

  constructor(n1: NumberBaseNSigned, n2: NumberBaseNSigned, manBitNum?: number) {
    if (n1.base !== n2.base) {
      throw new Error(`DivisionBaseNSigned(Number, Number): Base of n1(${n1.base}) and base of n2(${n2.base}) are not compatible.`);
    }

    this.manBitNum = manBitNum ?? null;
    this.watcher = new Algorithm();
    this.producedOverflow = false;
    this.firstPositiveStep = false;
    this.result = this._divide(n1, n2);
  }

  private _divide(n1: NumberBaseNSigned, n2: NumberBaseNSigned): NumberBaseNSigned {
    this.watcher = new Algorithm();
    const offset: number = Math.max(n1.offset, n2.offset);
    const digitsToTake: number = n1.arr.length + offset + 1;

    this.watcher.step('DivisionInput')
      .saveVariable('n1Arr', [...n1.arr])
      .saveVariable('n2Arr', [...n2.arr]);

    this.watcher.step('DetermineSize')
      .saveVariable('n1Offset', n1.offset)
      .saveVariable('n2Offset', n2.offset)
      .saveVariable('offset', offset)
      .saveVariable('digitsToTake', digitsToTake);

    // Find first 1 in both numbers
    const firstOne1: number = n1.arr.findIndex((bit) => bit === 1);
    const firstOne2: number = n2.arr.findIndex((bit) => bit === 1);

    // Prepare arrays for division
    const n1copy: number[] = [...n1.arr];
    let op2arr: number[] = [...n2.arr];

    // Align divisor with dividend based on first 1s
    if (firstOne1 !== -1 && firstOne2 !== -1) {
      const alignShift: number = firstOne2 - firstOne1;
      if (alignShift > 0) {
        op2arr = [...op2arr, ...Array(alignShift).fill(0)];
        op2arr.splice(0, alignShift);
      }
    }

    let op1arr: number[] = [...n1copy];
    const arr: number[] = []; // unnormalised result
    const remain = true;
    let i = 0;
    let posOp1arr = op2arr.length;
    let countSteps = 0;

    // Changed loop condition to match required precision
    let maxIterations: number = this.manBitNum !== null ? this.manBitNum + 1 : Math.max(0, firstOne2 - firstOne1);
    while (i < maxIterations && remain) {
      if (op1arr.length > op2arr.length) {
        op2arr = op2arr.concat(Array(op1arr.length - op2arr.length).fill(0));
      }
      const op1 = new NumberBaseNComplement(n1.base, op1arr.length, op1arr, offset, false);
      const op2 = new NumberBaseNComplement(n2.base, op2arr.length, op2arr, offset, true);
      console.log('Divisionstep-------------------------');
      console.log('op1', op1.arr);
      console.log('op2', op2.arr);
      const operation = new AdditionBaseNComplement(op1, op2);
      const subtractionResult = operation.getResult();
      console.log('Result:', subtractionResult.arr);

      if (countSteps === 0 && !operation.negativeResult) {
        this.firstPositiveStep = true;
        if (this.manBitNum !== null) {
          maxIterations += 1;
        }
      }

      this.watcher.step('DivisionSteps')
        .saveVariable(`Step${countSteps}_Sub1`, [...op1arr])
        .saveVariable(`Step${countSteps}_Sub2`, [...op2arr])
        .saveVariable(`Step${countSteps}_SubRes`, [...subtractionResult.arr])
        .saveVariable(`Step${countSteps}_SubRes_isNegative`, operation.negativeResult);

      if (operation.negativeResult === false) {
        this.watcher.step('DivisionSteps')
          .saveVariable(`Step${countSteps}_SubRes_isZero`, false);
        arr.push(1);
        op1arr = [...subtractionResult.arr];
      } else {
        arr.push(0);
      }

      if (posOp1arr >= n1copy.length) {
        op1arr.push(0);
      } else {
        op1arr.push(n1copy[posOp1arr - 1]);
        posOp1arr += 1;
      }

      if (op1arr.length > op2arr.length) {
        op2arr.unshift(0);
      }

      this.watcher.step('DivisionSteps')
        .saveVariable(`Step${countSteps}_ActRes`, [...arr]);
      i += 1;
      countSteps += 1;
    }

    this.watcher.step('DivisionSteps')
      .saveVariable('countSteps', countSteps);

    const finalResult = new NumberBaseNSigned(
      n1.base,
      [...arr],
      offset,
      n1.isNegative !== n2.isNegative,
    );

    this.watcher.step('Result')
      .saveVariable('digitsToTake', digitsToTake)
      .saveVariable('result', finalResult)
      .saveVariable('resultArr', [...arr]);

    return finalResult;
  }

  getResult(): NumberBaseNSigned {
    return this.result;
  }

  getWatcher(): Algorithm {
    return this.watcher;
  }
}
