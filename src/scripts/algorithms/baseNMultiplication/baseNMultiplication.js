import { Algorithm } from '../algorithm';

// Implements a base N multiplication.
export class BaseNMultiplication {
  // 2 < N
  constructor(b, num1, num2) {
    if (b < 2 || b > 36) {
      console.log('BaseNMultiplication.constructor(number, string, string): Base is not supported.');
      process.exit(1);
    }
    this.base = b;

    this.watcher = new Algorithm();

    this.n1 = this._toArray(num1);
    this.n2 = this._toArray(num2);

    if (!this._checkArray(this.n1)) {
      console.log('BaseNMultiplication.constructor(string): num1 is not compatible with base.');
      process.exit(1);
    }

    if (!this._checkArray(this.n2)) {
      console.log('BaseNMultiplication.constructor(string): num2 is not compatible with base.');
      process.exit(1);
    }

    this.watcher.step('Inital')
      .saveVariable('num1', num1)
      .saveVariable('num2', num2);

    this._multiply();
  }

  _checkArray(num) {
    for (let i = 0; i < num.length; i += 1) {
      if (num[i] < 0 || this.base <= num[i]) {
        return false;
      }
    }
    return true;
  }

  _toArray(numIn) {
    const num = numIn.toUpperCase();
    const numArr = [];
    for (let i = 0; i < num.length; i += 1) {
      const c = num[i];
      if ('0'.charCodeAt() <= c.charCodeAt() && c.charCodeAt() <= '9'.charCodeAt()) {
        numArr.push(c.charCodeAt() - '0'.charCodeAt());
        continue;
      }
      if ('A'.charCodeAt() <= c.charCodeAt() && c.charCodeAt() <= 'Z'.charCodeAt()) {
        numArr.push(c.charCodeAt() - 'A'.charCodeAt() + 10);
        continue;
      }
      console.log('BaseNMultiplication._toArray(string): Cannot parse String.');
      process.exit(1);
    }

    return numArr;
  }

  _toString(num) {
    const numArr = [];
    for (let i = 0; i < num.length; i += 1) {
      const c = num[i];
      if (c >= 0 && c <= 9) {
        numArr.push(String.fromCharCode(c + '0'.charCodeAt()));
        continue;
      }
      if (c >= 10 && c <= 35) {
        numArr.push(String.fromCharCode(c - 10 + 'A'.charCodeAt()));
        continue;
      }
      console.log('BaseNMultiplication._toArray(string): Cannot parse Array.');
      process.exit(1);
    }

    return numArr.join('');
  }

  _multiply() {
    let total = [0];
    for (let i = this.n2.length - 1; i >= 0; i -= 1) {
      const toAdd = this._multiplySingleDigit(this.n1, this.n2[i]);

      this.watcher.step(`Step${this.n2.length - 1 - i}`)
        .saveVariable('toAdd', this._toString(toAdd))
        .saveVariable('total', this._toString(total));

      total = this._add(total, toAdd);
      this.n1.push(0);
    }

    this.watcher.step('Result')
      .saveVariable('total', this._toString(total));
  }

  _multiplySingleDigit(num, digit) {
    let i = num.length - 1;
    let overFlow = 0;
    const total = [];
    while (i >= 0 || overFlow > 0) {
      const m = (i >= 0) ? num[i] * digit + overFlow : overFlow;

      total.push(m % this.base);
      overFlow = Math.floor(m / this.base);
      i -= 1;
    }

    return total.reverse();
  }

  _add(num1, num2) {
    num1.reverse();
    num2.reverse();

    let i = 0;
    let overFlow = 0;
    const total = [];

    while (i < num1.length || i < num2.length || overFlow > 0) {
      const m1 = i < num1.length ? num1[i] : 0;
      const m2 = i < num2.length ? num2[i] : 0;

      const m = m1 + m2 + overFlow;
      total.push(m % this.base);
      overFlow = Math.floor(m / this.base);
      i += 1;
    }
    num1.reverse();
    num2.reverse();

    return total.reverse();
  }

  getResult() {
    return true;
  }
}
