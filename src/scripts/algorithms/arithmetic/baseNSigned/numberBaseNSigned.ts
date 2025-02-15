function numToChar(num: number): string {
  if (num >= 0 && num <= 9) {
    return String.fromCharCode(num + '0'.charCodeAt(0));
  }
  if (num >= 10 && num <= 35) {
    return String.fromCharCode(num + 'A'.charCodeAt(0));
  }

  return '';
}

function charToNum(chr: string): number {
  if ('0'.charCodeAt(0) <= chr.charCodeAt(0) && chr.charCodeAt(0) <= '9'.charCodeAt(0)) {
    return chr.charCodeAt(0) - '0'.charCodeAt(0);
  }
  if ('A'.charCodeAt(0) <= chr.charCodeAt(0) && chr.charCodeAt(0) <= 'Z'.charCodeAt(0)) {
    return chr.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }

  return -1;
}

// Representation of a number in base n (2 <= n <= 26) with support of floating points.
export class NumberBaseNSigned {
  public base: number;
  public offset: number;
  public isNegative: boolean;
  public arr: number[];
  public stringRepresentation: string | null;

  constructor(base: number, representation: number[], offset: number = 0, isNegative: boolean = false) {
    if (base < 2 || base > 36) {
      throw new Error(`NumberBaseNSigned.constructor(base, representation, ...): Base ${base} is not supported.`);
    }

    this.base = base;
    this.offset = offset;
    this.isNegative = isNegative;

    if (!this._checkArray(representation)) {
      throw new Error('NumberBaseNSigned.constructor(base, representation, ...): representation contains invalid number.');
    }

    this.arr = [...representation];

    this._normalizeOffset();
    this._normalizeArray();

    this.stringRepresentation = this._constructString(this.arr);
  }

  private _normalizeOffset(): void {
    while (this.offset < 0) {
      this.arr.push(0);
      this.offset += 1;
    }
  }

  private _removeLeadingZeros(): void {
    while (this.arr.length > this.offset + 1 && this.arr[0] === 0) {
      this.arr.splice(0, 1);
    }
  }

  private _normalizeArray(): void {
    // _removeLeadingZeros()
    while (this.offset > 0 && this.arr[this.arr.length - 1] === 0) {
      this.arr.splice(this.arr.length - 1, 1);
      this.offset -= 1;
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
      result += numToChar(arr[i]);
      if (arr.length - 1 - i === this.offset && this.offset > 0) {
        result += '.';
      }
    }
    if (this.isNegative) {
      result = `-${result}`;
    }

    return result;
  }
}

export function getNumFromString(base: number, str: string): NumberBaseNSigned {
  if (base < 2 || base > 36) {
    throw new Error(`getNumFromString(base, str): Base ${base} is not supported.`);
  }

  let pointCount = 0;
  let signCount = 0;

  const arr = [];
  let offset = 0;
  let isNegative = false;

  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === '-' || str[i] === '+') {
      isNegative = (str[i] === '-');
      signCount += 1;
      continue;
    }

    if (str[i] === '.') {
      offset = str.length - i - 1;
      pointCount += 1;
      continue;
    }

    const n = charToNum(str[i]);
    if (n < 0 || n >= base) {
      throw new Error('getNumFromString(base, str): Given string is not compatible with base.');
    }
    arr.push(charToNum(str[i]));
  }

  if (pointCount > 1) {
    throw new Error('getNumFromString(base, str): Given string contains more than 1 point.');
  }

  if (signCount > 1) {
    throw new Error('getNumFromString(base, str): Given string contains more than 1 sign.');
  }

  return new NumberBaseNSigned(base, arr, offset, isNegative);
}
