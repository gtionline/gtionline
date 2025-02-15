import { NumberBaseNComplement } from './numberBaseNComplement';
import { NumberBaseNSigned } from '../baseNSigned/numberBaseNSigned';
import { MultiplicationBaseNSigned } from '../baseNSigned/multiplication';
import { Algorithm } from '../../algorithm';

export class MultiplicationBaseNComplement {
  constructor(n1, n2) {
    if (n1.base !== n2.base) {
      throw new Error(`MultiplicationBaseNComplement.constructor(n1, n2):
        Base of n1(${n1.base}) and base of n2(${n2.base}) must be qual.`);
    }

    if (n1.digitNum !== n2.digitNum) {
      throw new Error(`MultiplicationBaseNComplement.constructor(n1, n2):
        DigitNum of n1(${n1.digitNum}) and digitNum of n2(${n2.digitNum}) must be qual.`);
    }

    this.watcher = null;
    this.result = this._multiply(n1, n2);
  }

  _multiply(n1, n2) {
    this.watcher = new Algorithm();

    const base = n1.base;
    const offset = Math.max(n1.offset, n2.offset);
    const digitsToTake = 2 * (n1.digitNum + offset);

    this.watcher.step('DetermineSize')
      .saveVariable('n1Offset', n1.offset)
      .saveVariable('n2Offset', n2.offset)
      .saveVariable('digitNum', n1.digitNum)
      .saveVariable('offset', offset)
      .saveVariable('digitsToTake', digitsToTake);

    const n1Translated = n1.translate(digitsToTake - offset);
    const n2Translated = n2.translate(digitsToTake - offset);

    const op1Arr = [...n1Translated.arr];
    const op2Arr = [...n2Translated.arr];

    op1Arr.push(...Array(Math.max(n2Translated.offset - n1Translated.offset, 0)).fill(0));
    op2Arr.push(...Array(Math.max(n1Translated.offset - n2Translated.offset, 0)).fill(0));

    const op1 = new NumberBaseNSigned(n1Translated.base, op1Arr, offset, false);
    const op2 = new NumberBaseNSigned(n2Translated.base, op2Arr, offset, false);

    const operation = new MultiplicationBaseNSigned(op1, op2);
    const result = operation.getResult();

    this.watcher.step('Multiply')
      .saveVariable('multiplication', operation.watcher);

    const resultArr = [...result.arr];

    resultArr.push(...Array(Math.max(2 * offset - result.offset, 0)).fill(0));

    if (resultArr.length < digitsToTake) {
      resultArr.unshift(...Array(digitsToTake - resultArr.length).fill(0));
    }

    if (resultArr.length > digitsToTake) {
      resultArr.splice(0, resultArr.length - digitsToTake);
    }

    const finalDigitnum = digitsToTake - 2 * offset;
    const finalOffset = 2 * offset;
    const finalResult = new NumberBaseNComplement(base, finalDigitnum, resultArr, finalOffset);

    this.watcher.step('Result')
      .saveVariable('digitsToTake', digitsToTake)
      .saveVariable('result', finalResult);

    return finalResult;
  }

  getResult() {
    return this.result;
  }
}
