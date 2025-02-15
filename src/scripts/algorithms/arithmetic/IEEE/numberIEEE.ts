/* eslint-disable no-bitwise */

function numToChar(num: number): string {
  if (num >= 0.0 && num <= 9) {
    return String.fromCharCode(num + '0'.charCodeAt(0));
  }
  if (num >= 10 && num <= 35) {
    return String.fromCharCode(num + 'A'.charCodeAt(0) - 10);
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

// Representation of a number in N's complement (Up to digitNum digits)
export class NumberIEEE {
  expBitNum: number;
  manBitNum: number;
  bitNum: number;
  arr: number[];
  sign: number;
  bias: number;
  E: number;
  M: number;
  isNaN: boolean;
  isInfinity: boolean;
  isZero: boolean;
  isDenormalized: boolean;
  exponent: number;
  mantissa: number;
  exponentBits: number[];
  mantissaBits: number[];
  bitString: string;
  valueString: string;

  constructor(expBitNum: number, manBitNum: number, representation: number[]) {
    if (expBitNum <= 0 || manBitNum <= 0) {
      console.log('IEEENumber(number, number, arr): Invalid number of bits for exponent and mantissa.');
    }

    this.expBitNum = expBitNum;
    this.manBitNum = manBitNum;
    this.bitNum = expBitNum + manBitNum + 1;

    this._checkArray(representation);
    this.arr = [...representation];

    this.sign = this.arr[0];
    this.bias = (1 << (expBitNum - 1)) - 1;
    this.E = this._constructE();
    this.M = this._constructM();

    let isNaN = false;
    let isInf = true;
    let isZero = true;

    for (let i = expBitNum + 1; i < this.bitNum; i += 1) {
      if (this.arr[i] !== 0) {
        isZero = false;
        isNaN = true;
        isInf = false;
      }
    }
    for (let i = 1; i <= expBitNum; i += 1) {
      if (this.arr[i] !== 0) {
        isZero = false;
      }
      if (this.arr[i] !== 1) {
        isNaN = false;
        isInf = false;
      }
    }

    this.isNaN = isNaN;
    this.isInfinity = isInf;
    this.isZero = isZero;
    this.isDenormalized = this.E === 0 && this.M !== 0;

    this.exponent = this._constructExponent();
    this.mantissa = this._constructMantissa();

    this.exponentBits = this._constructExponentBits();
    this.mantissaBits = this._constructMantissaBits();

    this.bitString = this._constructBitString();
    this.valueString = this._constructValString();
  }

  private _checkArray(arr: number[]): boolean {
    if (arr.length !== this.bitNum) {
      return false;
    }

    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] < 0 || arr[i] >= 2) {
        return false;
      }
    }
    return true;
  }

  private _constructBitString(): string {
    let result = '';
    let count = 0;
    for (let i = 0; i < this.arr.length; i += 1) {
      result += numToChar(this.arr[i]);
      if (i === 0 || i === this.expBitNum) {
        count = 0;
        result += ' ';
      }
      if (count % 4 === 0) {
        result += ' ';
      }
      count += 1;
    }
    return result;
  }

  private _constructValString(): string {
    const sign = this.arr[0] === 0 ? '+' : '-';
    if (this.isNaN) {
      return 'NaN';
    }
    if (this.isInfinity) {
      return `${sign}inf`;
    }
    if (this.isZero) {
      return `${sign}0`;
    }
    return `${sign}${this.mantissa}e${this.exponent}`;
  }

  private _constructE(): number {
    let result = 0;
    for (let i = 1; i < 1 + this.expBitNum; i += 1) {
      result *= 2;
      result += this.arr[i];
    }
    return result;
  }

  private _constructM(): number {
    let result = 0.0;
    for (let i = this.bitNum - 1; i >= 1 + this.expBitNum; i -= 1) {
      result /= 2.0;
      result += this.arr[i];
    }
    result /= 2.0;
    return result;
  }

  private _constructExponent(): number {
    return Math.max(-this.bias + 1, this.E - this.bias);
  }

  private _constructMantissa(): number {
    if (this.isDenormalized || this.isZero) {
      return this.M;
    }
    return 1 + this.M;
  }

  private _constructExponentBits(): number[] {
    const result = [...this.arr];
    result.splice(0, 1);
    result.splice(this.expBitNum, this.manBitNum);
    return result;
  }

  private _constructMantissaBits(): number[] {
    const firstBit = this.isDenormalized || this.isZero ? 0 : 1;
    const result = [...this.arr];
    result.splice(0, 1 + this.expBitNum);
    result.unshift(firstBit);
    return result;
  }
}

export function getIEEEFromString(expBitNum: number, str: string): NumberIEEE | null {
  let string = str;
  if (str.length <= expBitNum + 2) {
    console.trace('getIEEEFromString(expBitNum, str): Given string is not compatible with the given number of expBitNum: ', expBitNum, 'and string: ', str);
    return null;
  }

  let inf = false;
  let zero = false;
  let nan = false;
  if (string.search('Inf') !== -1) {
    inf = true;
  } else if (string.search('Zero') !== -1) {
    zero = true;
  } else if (string.search('Nan') !== -1) {
    nan = true;
  }

  // Remove whitespace
  string = string.replace(/\s+/g, '');
  let hadText = false;
  if (inf || zero || nan) {
    const oldLength = string.length;
    // eslint-disable-next-line no-useless-escape
    string = string.replace(/[^0-9\.]+/g, '');
    if (oldLength > string.length) {
      hadText = true;
    }
  }

  for (let i = 0; i < string.length; i += 1) {
    const n = charToNum(string[i]);
    if (n < 0 || n >= 2) {
      console.log('getIEEEFromString(expBitNum, str): Given string is not compatible with base 2.');
      return null;
    }
  }

  // Conversion from string to array
  const arr: number[] = [];
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] === ' ') continue;
    arr.push(charToNum(string[i]));
  }

  const number = new NumberIEEE(expBitNum, arr.length - expBitNum - 1, arr);
  if (hadText && inf) {
    number.isInfinity = true;
  } else if (hadText && nan) {
    number.isNaN = true;
  } else if (hadText && zero) {
    number.isZero = true;
  }
  return number;
}
