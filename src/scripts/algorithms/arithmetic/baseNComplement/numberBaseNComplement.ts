import { Algorithm } from '../../algorithm';

function _numToChar(num: number): string {
  if (num >= 0 && num <= 9) {
    return String.fromCharCode(num + '0'.charCodeAt(0));
  }
  if (num >= 10 && num <= 35) {
    return String.fromCharCode(num - 10 + 'A'.charCodeAt(0));
  }
  return '';
}

function _charToNum(chr: string): number {
  if ('0'.charCodeAt(0) <= chr.charCodeAt(0) && chr.charCodeAt(0) <= '9'.charCodeAt(0)) {
    return chr.charCodeAt(0) - '0'.charCodeAt(0);
  }
  if ('A'.charCodeAt(0) <= chr.charCodeAt(0) && chr.charCodeAt(0) <= 'Z'.charCodeAt(0)) {
    return chr.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }
  return -1;
}

export class NumberBaseNComplement {
  public base: number;
  public offset: number;
  public digitNum: number;
  public arr: number[];
  private stringRepresentation: string | null;
  private stringRepresentationNoLeadingZeros: string | null;
  public watcher: Algorithm;
  private negative: boolean;
  public signBit: number;

  constructor(
    base: number, 
    digitNum: number, 
    representation: number[], 
    offset: number = 0, 
    negate: boolean = false
  ) {
    if (base < 2 || base > 36) {
      throw new Error(`NumberBaseNComplement.constructor(base, digitNum, ...): Base ${base} is not supported.`);
    }
    if (digitNum <= 0) {
      throw new Error('NumberBaseNComplement.constructor(base, digitNum, ...): digitNum must be positive.');
    }

    this.base = base;
    this.offset = offset;
    this.digitNum = digitNum;

    this.stringRepresentation = null;
    this.stringRepresentationNoLeadingZeros = null;

    this.watcher = new Algorithm();

    if (!this._checkArray(representation)) {
      throw new Error('NumberBaseNComplement.constructor(base, digitNum, ...): representation contains invalid number.');
    }

    this.arr = [...representation];

    this._normalizeOffset();
    this._normalizeArray();

    this.watcher = this.watcher.step('Complement')
      .saveVariable('originalArray', [...this.arr]);
    this.watcher = this.watcher.step('Complement')
      .saveVariable('negate', negate);
    if (negate) {
      this.arr = this.getFlipedArray();
      this.watcher = this.watcher.step('Complement')
        .saveVariable('flippedArray', [...this.arr]);
      // Add one
      for (let i = this.arr.length - 1; i >= 0; i -= 1) {
        if (this.arr[i] !== this.base - 1) {
          this.arr[i] += 1;
          break;
        } else {
          this.arr[i] = 0;
        }
      }

      this.watcher = this.watcher.step('Complement')
        .saveVariable('oneAdded', [...this.arr]);
      this._normalizeOffset();
      this._normalizeArray();
      this.watcher = this.watcher.step('Complement')
        .saveVariable('normalizedArray', [...this.arr]);
    } else {
      this.watcher = this.watcher.step('Complement')
        .saveVariable('flippedArray', [...this.arr])
        .saveVariable('oneAdded', [...this.arr])
        .saveVariable('normalizedArray', [...this.arr]);
    }

    // delete right digits if the array is to long
    while (this.arr.length > digitNum) {
      this.arr.pop();
    }

    this.negative = negate;
    this.signBit = negate ? 1 : 0;

    this.stringRepresentation = this._constructString(this.arr);
  }

  private _normalizeOffset(): void {
    while (this.offset < 0) {
      this.arr.push(0);
      this.offset += 1;
    }
  }

  private _normalizeArray(): void {
    // Delete zeros from right.
    while (this.offset > 0 && this.arr[this.arr.length - 1] === 0) {
      this.arr.splice(this.arr.length - 1, 1);
      this.offset -= 1;
    }

    // Bring array to the right size.
    if (this.arr.length > (this.digitNum + this.offset)) {
      this.arr.splice(this.digitNum + this.offset, this.arr.length - (this.digitNum + this.offset));
    } else {
      this.arr.push(...Array((this.digitNum + this.offset) - this.arr.length).fill(0));
    }
  }

  private _checkArray(arr: number[]): boolean {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] < 0 || this.base <= arr[i]) {
        return false;
      }
    }
    return true;
  }

  private _constructString(arr: number[]): string {
    let result = '';
    for (let i = 0; i < arr.length; i += 1) {
      result += _numToChar(arr[i]);
      if (i === (this.digitNum - 1) && this.offset > 0) {
        result += '.';
      }
    }
    return result;
  }

  public getFlipedArray(): number[] {
    const result: number[] = [];
    for (let i = 0; i < this.arr.length; i += 1) {
      result.push(this.base - 1 - this.arr[i]);
    }
    return result;
  }

  public isNegative(): boolean {
    return this.arr[0] >= Math.ceil(this.base / 2);
  }

  public translate(newDigitNum: number): NumberBaseNComplement {
    if (newDigitNum <= 0) {
      throw new Error('NumberBaseNComplement.translate(newDigitNum): newDigitNum must be positive.');
    }

    if (newDigitNum <= this.digitNum) {
      const newRepresentation = [...this.arr].splice(0, this.digitNum - newDigitNum);
      return new NumberBaseNComplement(this.base, newDigitNum, newRepresentation, this.offset);
    }

    const sign = this.isNegative() ? this.base - 1 : 0;
    const arrCopy = [...this.arr];
    arrCopy.unshift(...Array(newDigitNum - this.digitNum).fill(sign));
    return new NumberBaseNComplement(this.base, newDigitNum, arrCopy, this.offset);
  }
}

export function getBaseNComplementFromString(
  base: number, 
  digitNum: number, 
  str: string
): NumberBaseNComplement {
  if (base < 2 || base > 36) {
    throw new Error(`getBaseNComplementFromString(base, str): Base ${base} is not supported.`);
  }

  const arr: number[] = [];
  let pointCount = 0;
  let offset = 0;

  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === '.') {
      pointCount += 1;
      offset = str.length - i - 1;
      continue;
    }

    const n = _charToNum(str[i]);
    if (n < 0 || n >= base) {
      throw new Error(`getBaseNComplementFromString(str): Given string is not compatible with base ${base}.`);
    }
    arr.push(_charToNum(str[i]));
  }

  if (pointCount > 1) {
    throw new Error('getBaseNComplementFromString(base, str): Given string contains more than 1 point.');
  }

  return new NumberBaseNComplement(base, digitNum, arr, offset);
}
