/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import { getIEEEFromString } from './algorithms/arithmetic/IEEE/numberIEEE';
import { AdditionIEEE } from './algorithms/arithmetic/IEEE/addition';
import { SubtractionIEEE } from './algorithms/arithmetic/IEEE/subtraction';
import { MultiplicationIEEE } from './algorithms/arithmetic/IEEE/multiplication';
import { DivisionIEEE } from './algorithms/arithmetic/IEEE/division';

function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

export class IEEESolution {
  constructor(exponentBits, numBits) {
    classCallCheck(this, IEEESolution);
    this.exponentBits = exponentBits;
    this.numBits = numBits;
    this.actBit = '';
    this.bitString = '';
    this.result = '';
    this.resultObject = '';
    this.watcher = '';
    this.negativeSummand = false;
    this.negativeSubtrahend = false;
    this.denominatorZero = true;
    this.negativeMinuendSubtrahend = false;
  }

  computeSolution(num1, num2, operator) {
    if (num1 !== '' && num2 !== '') {
      const y1 = getIEEEFromString(this.exponentBits, num1);
      const y2 = getIEEEFromString(this.exponentBits, num2);
      console.log(y1);
      let result = null;
      this.negativeSummand = false;
      this.negativeSubtrahend = false;
      this.denominatorZero = false;
      this.negativeMinuendSubtrahend = false;
      switch (operator) {
        case 'add':
          if (y1.sign === 0 && y2.sign === 0) {
            result = new AdditionIEEE(y1, y2);
            this.resultObject = result.watcher.steps.Result.data.result;
          } else if (y2.sign === 1) {
            y2.sign = 0;
            y2.arr[0] = 0;
            this.negativeSummand = true;
            if (y1.sign === 1) {
              this.negativeMinuendSubtrahend = true;
            }
            result = new SubtractionIEEE(y1, y2);
            // eslint-disable-next-line max-len
            this.resultObject = result.watcher.steps.Addition.data.addition.steps.Result.data.result;
          } else {
            this.negativeSummand = true;
            y1.sign = 0;
            y1.arr[0] = 0;
            result = new SubtractionIEEE(y2, y1);
            // eslint-disable-next-line max-len
            this.resultObject = result.watcher.steps.Addition.data.addition.steps.Result.data.result;
          }
          break;
        case 'mul':
          result = new MultiplicationIEEE(y1, y2);
          this.resultObject = result.watcher.steps.Result.data.result;
          break;
        case 'sub':
          if (y2.sign === 0) {
            if (y1.sign === 1) {
              this.negativeMinuendSubtrahend = true;
              y1.sign = 0;
              y1.arr[0] = 0;
              y2.sign = 0;
              y2.arr[0] = 0;
              result = new AdditionIEEE(y1, y2);
              this.resultObject = result.watcher.steps.Result.data.result;
              this.resultObject.sign = 1;
              this.resultObject.arr[0] = 0;
            } else {
              result = new SubtractionIEEE(y1, y2);
              // eslint-disable-next-line max-len
              this.resultObject = result.watcher.steps.Addition.data.addition.steps.Result.data.result;
            }
          } else if (y1.sign === 1 && y2.sign === 1) {
            this.negativeSubtrahend = true;
            result = new SubtractionIEEE(y1, y2);
            // eslint-disable-next-line max-len
            this.resultObject = result.watcher.steps.Addition.data.addition.steps.Result.data.result;
          } else {
            this.negativeSubtrahend = true;
            y2.sign = 0;
            y2.arr[0] = 0;
            result = new AdditionIEEE(y1, y2);
            this.resultObject = result.watcher.steps.Result.data.result;
          }
          break;
        case 'div':
          if (y2.isZero) {
            this.denominatorZero = true;
            return;
          }
          result = new DivisionIEEE(y1, y2);
          this.resultObject = result.watcher.steps.Result.data.result;
          break;
        default:
      }
      this.watcher = result.watcher;
      let solution = '';
      solution = result.getResult().bitString;
      if (result.getResult().isNaN) solution += ' is Nan';
      if (result.getResult().isZero) solution += ' is Zero';
      if (result.getResult().isInfinity) solution += ' is Inf';
      this.result = solution;
    }
  }
}
