import { NumberBaseNSigned } from './numberBaseNSigned';
import { AdditionBaseNSigned } from './addition';
import { ComparisonBaseNSigned } from './comparison';
import { Algorithm } from '../../algorithm';

export class SubtractionBaseNSigned {
  private watcher: Algorithm;
  private result: NumberBaseNSigned;

  constructor(n1: NumberBaseNSigned, n2: NumberBaseNSigned) {
    if (n1.base !== n2.base) {
      throw new Error(`SubtractionBaseNSigned.constructor(n1, n2): Base of n1(${n1.base}) and base of n2(${n2.base}) must be equal.`);
    }

    this.watcher = new Algorithm();
    this.result = this._subtract(n1, n2);
  }

  private _subtract(n1: NumberBaseNSigned, n2: NumberBaseNSigned): NumberBaseNSigned {
    this.watcher = new Algorithm();
    if ((!n1.isNegative && n2.isNegative) || (n1.isNegative && !n2.isNegative)) {
      const n2Switched = new NumberBaseNSigned(n2.base, n2.arr, n2.offset, !n2.isNegative);
      const addition = new AdditionBaseNSigned(n1, n2Switched);

      this.watcher = this.watcher.step('OperatorSwitch')
        .saveVariable('addition', addition.getWatcher());

      return addition.getResult();
    }

    const base: number = n1.base;
    const n1Abs = new NumberBaseNSigned(n1.base, n1.arr, n1.offset, false);
    const n2Abs = new NumberBaseNSigned(n2.base, n2.arr, n2.offset, false);
    const comp: number = (new ComparisonBaseNSigned(n1Abs, n2Abs)).getResult();

    let isNegative: boolean | null = null;
    let op1: NumberBaseNSigned | null = null;
    let op2: NumberBaseNSigned | null = null;

    if (comp >= 0) {
      // |n1| >= |n2|
      op1 = n1;
      op2 = n2;

      isNegative = n1.isNegative && n2.isNegative;
    } else {
      op1 = n2;
      op2 = n1;

      isNegative = !(n1.isNegative && n2.isNegative);
    }

    this.watcher.step('GetSign')
      .saveVariable('compareValue', comp)
      .saveVariable('signN1', n1.isNegative)
      .saveVariable('signN2', n2.isNegative)
      .saveVariable('isNegative', isNegative);

    const op1Arr: number[] = [...op1.arr];
    const op2Arr: number[] = [...op2.arr];

    const offset: number = Math.max(op1.offset, op2.offset);

    if (op1.offset < offset) {
      op1Arr.push(...Array(offset - op1.offset).fill(0));
    }

    if (op2.offset < offset) {
      op2Arr.push(...Array(offset - op2.offset).fill(0));
    }

    const length: number = Math.max(op1Arr.length, op2Arr.length);

    if (op1Arr.length < length) {
      op1Arr.unshift(...Array(length - op1Arr.length).fill(0));
    }

    if (op2Arr.length < length) {
      op2Arr.unshift(...Array(length - op2Arr.length).fill(0));
    }

    const overflow: number[] = [];
    const final: number[] = [];

    overflow.unshift(0);

    for (let i = length - 1; i >= 0; i -= 1) {
      const m: number = op1Arr[i] - op2Arr[i] - overflow[0];

      final.unshift((m + base) % base);
      if (m < 0) {
        overflow.unshift(1);
      } else {
        overflow.unshift(0);
      }
    }

    const result = new NumberBaseNSigned(base, final, offset, isNegative);

    this.watcher.step('Subtraction')
      .saveVariable('op1', op1)
      .saveVariable('op2', op2)
      .saveVariable('op1Arr', [...op1Arr])
      .saveVariable('op2Arr', [...op2Arr])
      .saveVariable('carryArr', [...overflow])
      .saveVariable('resultArr', [...final])
      .saveVariable('result', result);

    this.watcher.step('Final')
      .saveVariable('result', result);

    return new NumberBaseNSigned(base, final, offset, isNegative);
  }

  getResult(): NumberBaseNSigned {
    return this.result;
  }

  getWatcher(): Algorithm {
    return this.watcher;
  }
}
