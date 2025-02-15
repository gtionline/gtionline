import { NumberPolyadic } from './numberPolyadic';
import { Algorithm } from '../../algorithm';

export class SubtractionPolyadic {
  private result: NumberPolyadic;
  private watcher: Algorithm;

  constructor(n1: NumberPolyadic, n2: NumberPolyadic) {
    if (n1.power !== n2.power) {
      throw new Error(`SubtractionPolyadic(n1, n2): power of n1(${n1.power}) and power of n2(${n2.power}) not compatible.`);
    }

    this.watcher = new Algorithm();
    this.result = this._sub(n1, n2);
    this.watcher = JSON.parse(JSON.stringify(this.result.watcher));
  }

  private _sub(n1: NumberPolyadic, n2: NumberPolyadic): NumberPolyadic {
    let result: NumberPolyadic;

    if ((n1.sign === '+') && (n2.sign === '+')) { // (+) - (+)
      result = new NumberPolyadic(n1.power, n1.bitString);
      result._subtractionFloat(n2.bitString);
    } else if ((n1.sign === '+') && (n2.sign === '-')) { // (+) - (-) => (+) + (+)
      result = new NumberPolyadic(n1.power, n1.bitString);
      const bitString = n2.bitString.substring(1);
      result._additionFloat(bitString);
    } else if ((n1.sign === '-') && (n2.sign === '+')) { // (-) - (+) => - ((+) + (+))
      const bitString1 = n1.bitString.substring(1);
      const intermediate = new NumberPolyadic(n1.power, bitString1);
      intermediate._additionFloat(n2.bitString);
      let resultBitString = intermediate.bitString;
      resultBitString = `-${resultBitString}`;
      result = new NumberPolyadic(n1.power, resultBitString);
    } else { // (-) - (-) => (-) + (+) => (+) - (+)
      const bitString1 = n1.bitString.substring(1);
      const bitString2 = n2.bitString.substring(1);
      const n1Plus = new NumberPolyadic(n1.power, bitString2);
      const n2Plus = new NumberPolyadic(n2.power, bitString1);
      result = this._sub(n1Plus, n2Plus);
    }

    this._saveToWatcher(n1, n2, result);
    return result;
  }

  private _saveToWatcher(n1: NumberPolyadic, n2: NumberPolyadic, result: NumberPolyadic): void {
    this.watcher
      .step('Subtraction')
      .saveVariable('op1', n1)
      .saveVariable('op2', n2)
      .saveVariable('result', result);
  }

  getResult(): NumberPolyadic {
    return this.result;
  }

  getWatcher(): Algorithm {
    return this.watcher;
  }
}
