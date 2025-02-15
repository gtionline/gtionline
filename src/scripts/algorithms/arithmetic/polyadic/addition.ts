import { NumberPolyadic } from './numberPolyadic';
import { Algorithm } from '../../algorithm';

export class AdditionPolyadic {
  private result: NumberPolyadic;
  private watcher: Algorithm;

  constructor(n1: NumberPolyadic, n2: NumberPolyadic) {
    if (n1.power !== n2.power) {
      throw new Error(`AdditionPolyadic(n1, n2): power of n1(${n1.power}) and power of n2(${n2.power}) not compatible.`);
    }

    this.watcher = new Algorithm();
    this.result = this._add(n1, n2);
    this.watcher = JSON.parse(JSON.stringify(this.result.watcher));
  }

  private _add(n1: NumberPolyadic, n2: NumberPolyadic): NumberPolyadic {
    let result: NumberPolyadic;

    if ((n1.sign === '+') && (n2.sign === '+')) { // (+) + (+)
      result = new NumberPolyadic(n1.power, n1.bitString);
      result._additionFloat(n2.bitString);
    } else if ((n1.sign === '+') && (n2.sign === '-')) { // (+) + (-) => (+) - (+)
      result = new NumberPolyadic(n1.power, n1.bitString);
      const bitString = n2.bitString.substring(1);
      result._subtractionFloat(bitString);
    } else if ((n1.sign === '-') && (n2.sign === '+')) { // (-) + (+) => (+) - (+)
      const bitString1 = n1.bitString.substring(1);
      const intermediate = new NumberPolyadic(n1.power, bitString1);
      intermediate._subtractionFloat(n2.bitString);
      let resultBitString = intermediate.bitString;
      if (!intermediate.isNegative) {
        resultBitString = `-${resultBitString}`;
      }
      result = new NumberPolyadic(n1.power, resultBitString);
    } else { // (-) + (-) => - ((+) + (+))
      const bitString1 = n1.bitString.substring(1);
      const bitString2 = n2.bitString.substring(1);
      const intermediate = new NumberPolyadic(n1.power, bitString1);
      intermediate._additionFloat(bitString2);
      let resultBitString = intermediate.bitString;
      resultBitString = `-${resultBitString}`;
      result = new NumberPolyadic(n1.power, resultBitString);
    }

    this._saveToWatcher(n1, n2, result);
    return result;
  }

  private _saveToWatcher(n1: NumberPolyadic, n2: NumberPolyadic, result: NumberPolyadic): void {
    this.watcher
      .step('Addition')
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
