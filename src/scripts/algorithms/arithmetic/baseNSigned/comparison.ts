import { NumberBaseNSigned } from './numberBaseNSigned';

export class ComparisonBaseNSigned {
  private result: number;

  constructor(n1: NumberBaseNSigned, n2: NumberBaseNSigned) {
    if (n1.base !== n2.base) {
      throw new Error(`ComparisonBaseNSigned.constructor(n1, n2): Base of n1(${n1.base}) and base of n2(${n2.base}) must be equal.`);
    }

    this.result = this._compare(n1, n2);
  }

  private _compare(n1: NumberBaseNSigned, n2: NumberBaseNSigned): number {
    if (n1.arr.length === 1 && n2.arr.length === 1 && n1.arr[0] === 0 && n2.arr[0] === 0) {
      return 0;
    }

    if (n1.isNegative && !n2.isNegative) {
      return -1;
    }

    if (!n1.isNegative && n2.isNegative) {
      return 1;
    }

    const mult: number = (n1.isNegative && n2.isNegative) ? -1 : 1;

    if (n1.arr.length - n1.offset > n2.arr.length - n2.offset) {
      return mult;
    }
    if (n1.arr.length - n1.offset < n2.arr.length - n2.offset) {
      return mult * -1;
    }

    let i: number = 0;
    while (i < n1.arr.length || i < n2.arr.length) {
      const a: number = i < n1.arr.length ? n1.arr[i] : 0;
      const b: number = i < n2.arr.length ? n2.arr[i] : 0;
      if (a > b) {
        return mult;
      }
      if (b > a) {
        return mult * (-1);
      }

      i += 1;
    }

    return 0;
  }

  getResult(): number {
    return this.result;
  }
}
