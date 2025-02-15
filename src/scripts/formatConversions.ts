/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import { roundArray } from './algorithms/calcHelper';

interface FormatConversionsInterface {
  exponentBits: number;
  numBits: number;
  result: string;
  getBias(): number;
  binToIEEE(num: string): void;
  ieeeToBin(num: string): void;
  ieeeToDec(num: string, edgecase?: string): void;
  decToBin(num: string): void;
  binToDec(num: string): void;
}

export class FormatConversions implements FormatConversionsInterface {
  exponentBits: number;
  numBits: number;
  result: string;

  constructor(exponentBits: number, numBits: number) {
    this.exponentBits = exponentBits;
    this.numBits = numBits;
    this.result = '';
  }

  getBias(): number {
    return (2 ** (this.exponentBits - 1)) - 1;
  }

  binToIEEE(num: string): void {
    this.result = '';
    const bias = this.getBias();
    const fParts = num.replace(',', '.').split('.');
    let preCommaStr = fParts[0];
    const afterCommaStr = fParts[1];
    
    // extract sign
    let sign = 0;
    if (preCommaStr[0] === '-') {
      sign = 1;
      preCommaStr = preCommaStr.substring(1);
    }
    
    // get zero
    let isZero = true;
    for (const c of [preCommaStr, afterCommaStr].join('')) {
      if (c !== '0') {
        isZero = false;
        break;
      }
    }
    if (isZero) {
      const exponent = '0'.repeat(this.exponentBits);
      const mantissa = '0'.repeat(this.numBits - this.exponentBits - 1);
      this.result = `${sign} ${exponent} ${mantissa}`;
      return;
    }
    
    // trim leading zeroes
    const preDecimal = preCommaStr.replace(/^0+/, '');
    
    // transform to 1,xxx format
    let mantisse = preDecimal.substring(1);
    const expBasis = mantisse.length;
    const numBitsMantisse = this.numBits - this.exponentBits - 1;
    
    // fParts[1] are the digits after the comma
    if (afterCommaStr != null) {
      mantisse += afterCommaStr;
    }
    let shiftFactor = 0;
    if (preDecimal === '') {
      shiftFactor = mantisse.indexOf('1') + 1;
      mantisse = mantisse.slice(shiftFactor);
    }

    if (mantisse.length > numBitsMantisse) {
      let mantisseArr = mantisse.split('').map((num) => parseInt(num, 10));
      mantisseArr = roundArray(mantisseArr, numBitsMantisse);
      mantisse = mantisseArr.join('');
    }
    if (mantisse.length < numBitsMantisse) {
      mantisse += '0'.repeat(numBitsMantisse - mantisse.length);
    }
    let exponent = (expBasis + bias - shiftFactor).toString(2);
    
    // fill with leading zeroes
    if (exponent.length > this.exponentBits || exponent === '1'.repeat(this.exponentBits)) {
      // ! We get infinity
      exponent = '1'.repeat(this.exponentBits);
      mantisse = '0'.repeat(numBitsMantisse);
    }
    exponent = '0'.repeat(this.exponentBits - exponent.length) + exponent;

    this.result = `${sign} ${exponent} ${mantisse}`;
  }

  ieeeToBin(num: string): void {
    this.result = '';
    const ieeeWithoutSpace = num.replace(/\s/g, '');
    if (ieeeWithoutSpace.length !== this.numBits) {
      this.result = '0';
      return;
    }
    
    const sign = ieeeWithoutSpace[0] === '0' ? '' : '-';
    const exponent = parseInt(ieeeWithoutSpace.substring(1, 1 + this.exponentBits), 2);
    const mantisse = ieeeWithoutSpace.substring(1 + this.exponentBits, this.numBits);
    const bias = this.getBias();
    const adjustedExponent = exponent - bias;
    
    let preDecimal = '1';
    let decimal = mantisse;
    
    if (adjustedExponent < 0) {
      preDecimal = '0';
      decimal = `${'0'.repeat(Math.abs(adjustedExponent) - 1)}1${mantisse}`;
    } else {
      preDecimal = `1${mantisse.substring(0, Math.min(adjustedExponent, mantisse.length))}${'0'.repeat(Math.max(0, adjustedExponent - mantisse.length))}`;
      decimal = mantisse.substring(adjustedExponent);
    }
    
    this.result = decimal === '' ? `${sign}${preDecimal}` : `${sign}${preDecimal},${decimal}`;
  }

  ieeeToDec(num: string, edgecase: string = ''): void {
    console.log('ieeeToDec', num, edgecase);
    let isDenormalized = false;
    if ((edgecase !== '') && (edgecase !== 'none')) {
      switch (edgecase) {
        case 'zero':
          this.result = '0.0';
          return;
        case 'nan':
          this.result = 'NaN';
          return;
        case 'inf':
          this.result = Number(num[0]) === 0 ? 'Inf' : '-Inf';
          return;
        case 'denormalized':
          isDenormalized = true;
          break;
        default:
      }
    }

    this.result = '';
    const ieeeWithoutSpace = num.replace(/\s/g, '');
    
    // get zero
    if (/^[01]0+$/.test(ieeeWithoutSpace)) {
      this.result = '0.0';
      return;
    }
    
    // get nan
    let isNan = true;
    for (const c of ieeeWithoutSpace.substr(1)) {
      if (c !== '1') {
        isNan = false;
        break;
      }
    }
    if (isNan) {
      this.result = 'NaN';
      return;
    }
    console.log(ieeeWithoutSpace.length, ieeeWithoutSpace, this.numBits);
    if (ieeeWithoutSpace.length !== this.numBits) {
      this.result = '0';
      return;
    }
    
    console.log(ieeeWithoutSpace, this.exponentBits, this.numBits);
    const sign = ieeeWithoutSpace[0] === '0' ? 1 : -1;
    const exponentbits = ieeeWithoutSpace.substring(1, 1 + this.exponentBits);
    const mantisse = ieeeWithoutSpace.substring(1 + this.exponentBits, this.numBits);
    const bias = this.getBias();
    
    let exponent = 0;
    let calcExp = 0;
    for (let i = exponentbits.length - 1; i >= 0; i -= 1) {
      exponent += Number(exponentbits[i]) * (2 ** calcExp);
      calcExp += 1;
    }
    exponent -= bias;
    
    let decimal = isDenormalized ? 0.0 : 1.0;
    for (let i = 0; i < mantisse.length; i += 1) {
      decimal += Number(mantisse[i]) * (2 ** (-i - 1));
    }
    
    console.log(mantisse);
    console.log(sign, decimal, exponent, sign * decimal * (2 ** exponent));
    this.result = String(sign * decimal * (2 ** exponent));
  }

  decToBin(num: string): void {
    this.result = '';
    const fRep = parseFloat(num.replace(',', '.'));
    this.result = fRep.toString(2);
  }

  binToDec(num: string): void {
    this.result = '';
    const fRep = num.replace(',', '.');
    const fParts = fRep.split('.');
    let devVal = parseInt(fParts[0], 2);
    
    if (fParts[1] != null && fParts[1].lastIndexOf('1') !== -1) {
      const stripZeros = fParts[1].substring(0, fParts[1].lastIndexOf('1') + 1);
      const decimalPart = parseInt(stripZeros, 2) / (2 ** stripZeros.length);
      devVal = devVal < 0 ? devVal - decimalPart : devVal + decimalPart;
    }
    
    this.result = String(devVal);
  }
}
