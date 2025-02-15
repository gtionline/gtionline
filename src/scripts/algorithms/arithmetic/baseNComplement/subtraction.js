import { NumberBaseNComplement } from './numberBaseNComplement';
import { Algorithm } from '../../algorithm';

export class SubtractionBaseNComplement {
  constructor(n1, n2) {
    if (n1.base !== n2.base) {
      throw new Error(`SubtractionBaseNComplement.constructor(n1, n2):
        Base of n1(${n1.base}) and base of n2(${n2.base}) must be qual.`);
    }

    if (n1.digitNum !== n2.digitNum) {
      throw new Error(`SubtractionBaseNComplement.constructor(n1, n2):
        DigitNum of n1(${n1.digitNum}) and digitNum of n2(${n2.digitNum}) must be qual.`);
    }

    this.watcher = null;
    this.producedOverflow = false;
    this.result = this._subtract(n1, n2);
  }

  _subtract(n1, n2) {
    this.watcher = new Algorithm();
    const { base } = n1;
    const { digitNum } = n1;

    const n1Arr = [...n1.arr];
    const n2Arr = [...n2.getFlipedArray()]; // twos complement

    const offset = Math.max(n1.offset, n2.offset);

    if (n1.offset < offset) {
      n1Arr.push(...Array(offset - n1.offset).fill(0));
    }

    if (n2.offset < offset) {
      n2Arr.push(...Array(offset - n2.offset).fill(0));
    }

    const overflow = [1];
    const final = [];
    // subtraction by addition with twos complement
    for (let i = n1Arr.length - 1; i >= 0; i -= 1) {
      const m = n1Arr[i] + n2Arr[i] + overflow[0];

      final.unshift(m % base);
      overflow.unshift(Math.floor(m / base));
    }

    final.unshift(overflow[0]);

    const result = new NumberBaseNComplement(base, digitNum, final, offset);

    const overflowPossible = (n1.isNegative() && !n2.isNegative())
                             || (!n1.isNegative() && n2.isNegative());

    const signChanged = overflowPossible
                        && ((n1.isNegative() && !result.isNegative())
                        || (!n1.isNegative() && result.isNegative()));

    this.producedOverflow = overflow[0] > 0 && signChanged;

    this.watcher
      .step('Subtraction')
      .saveVariable('op1', n1)
      .saveVariable('op2', n2)
      .saveVariable('op1Arr', [...n1Arr])
      .saveVariable('op2Arr', [...n2Arr])
      .saveVariable('carryArr', [...overflow])
      .saveVariable('resultArr', [...final])
      .saveVariable('result', result)
      .saveVariable('overflow', this.producedOverflow);

    return result;
  }

  getResult() {
    return this.result;
  }
}
