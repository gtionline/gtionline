import { NumberBaseNSigned } from './numberBaseNSigned';
import { AdditionBaseNSigned } from './addition';
import { Algorithm } from '../../algorithm';

export class MultiplicationBaseNSingleDigit {
  private result: NumberBaseNSigned;

  constructor(n: NumberBaseNSigned, d: number) {
    if (d < 0 || d >= n.base) {
      throw new Error(`MultiplicationBaseNSingleDigit: d(${d}) is not valid for base ${n.base}`);
    }
    this.result = this._multiply(n, d);
  }

  private _multiply(n: NumberBaseNSigned, d: number): NumberBaseNSigned {
    // Quick return for multiplication by 0 or 1
    if (d === 0) return new NumberBaseNSigned(n.base, [0], 0, false);
    if (d === 1) return new NumberBaseNSigned(n.base, [...n.arr], n.offset, n.isNegative);

    let carry = 0;
    const final: number[] = [];

    // Multiply each digit and handle carry
    for (let i = n.arr.length - 1; i >= 0; i -= 1) {
      const product = d * n.arr[i] + carry;
      final.unshift(product % n.base);
      carry = Math.floor(product / n.base);
    }
    if (carry > 0) final.unshift(carry);

    return new NumberBaseNSigned(n.base, final, n.offset, n.isNegative);
  }

  getResult(): NumberBaseNSigned {
    return this.result;
  }
}

export class MultiplicationBaseNSigned {
  private result: NumberBaseNSigned;
  private watcher: Algorithm;

  constructor(n1: NumberBaseNSigned, n2: NumberBaseNSigned) {
    if (n1.base !== n2.base) {
      throw new Error(`MultiplicationBaseNSigned.constructor(n1, n2): Base of n1(${n1.base}) and base of n2(${n2.base}) must be equal.`);
    }
    this.watcher = new Algorithm();
    this.result = this._multiply(n1, n2);
  }

  private _multiply(n1: NumberBaseNSigned, n2: NumberBaseNSigned): NumberBaseNSigned {
    this.watcher = new Algorithm();
    this.watcher.step('MultiplicationInput')
      .saveVariable('n1Arr', [...n1.arr])
      .saveVariable('n2Arr', [...n2.arr]);

    const base = n1.base;
    const isNegative = (n1.isNegative && !n2.isNegative) || (n2.isNegative && !n1.isNegative);
    this.watcher.step('GetSign')
      .saveVariable('signN1', n1.isNegative)
      .saveVariable('signN2', n2.isNegative)
      .saveVariable('isNegative', isNegative);

    let cur = new NumberBaseNSigned(base, [0], 0, false);

    this.watcher.step('Multiplication')
      .saveVariable('num1', n1)
      .saveVariable('num2', n2);

    // remove right zeros, fastening the multiplication
    const arr1 = n1.arr;
    const arr2 = n2.arr;
    while ((arr1[arr1.length - 1] === 0 && arr2[arr2.length - 1] === 0)
      && (Math.min(n1.arr.length, n2.arr.length) > 0)) {
      arr1.pop();
      arr2.pop();
    }

    this.watcher.step('MultiplicationInput')
      .saveVariable('n1Arr', [...n1.arr])
      .saveVariable('n2Arr', [...n2.arr])
      .saveVariable('leftArr', [...arr1])
      .saveVariable('rightArr', [...arr2]);

    // multiplication with 0
    if (Math.min(n1.arr.length, n2.arr.length) === 0) {
      const result = new NumberBaseNSigned(base, [0]);
      this.watcher.step('Result')
        .saveVariable('result', result)
        .saveVariable('resultArr', [...result.arr]);
      return result;
    }

    // main multiplication
    this.watcher.step('MultiplicationSteps')
      .saveVariable('countSteps', n2.arr.length);

    for (let i = 0; i < n2.arr.length; i += 1) {
      const num = new NumberBaseNSigned(base, n1.arr, i, false);
      const toAdd = (new MultiplicationBaseNSingleDigit(num, arr2[i])).getResult();

      this.watcher.step('MultiplicationSteps')
        .saveVariable(`Step${i}_cur`, cur)
        .saveVariable(`Step${i}_toAdd`, toAdd);

      for (let j = 0; j < i; j += 1) {
        toAdd.arr.unshift(0);
      }
      cur = (new AdditionBaseNSigned(cur, toAdd)).getResult();
    }

    this.watcher.step('MultFinal')
      .saveVariable('cur', cur);

    const result = new NumberBaseNSigned(base, cur.arr, cur.offset, isNegative);

    this.watcher.step('Result')
      .saveVariable('result', result)
      .saveVariable('resultArr', [...result.arr]);

    return result;
  }

  getResult(): NumberBaseNSigned {
    return this.result;
  }

  getWatcher(): Algorithm {
    return this.watcher;
  }
}
