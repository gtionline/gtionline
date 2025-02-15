import { Algorithm } from '../../algorithm';

export class NumberPolyadic {
  power: number;
  comma: number;
  arr: string[];
  value!: number;
  bitString!: string;
  valueString!: string;
  isNegative: boolean;
  sign!: string;
  watcher: Algorithm;
  isPeriodic: boolean;
  periodicStart?: number;
  periodicEnd?: number;

  constructor(power: number, representation: string | string[]) {
    this.power = power;
    this.isPeriodic = false;
    this.periodicStart = undefined;
    this.periodicEnd = undefined;
    this.isNegative = false;
    this.watcher = new Algorithm();

    let rep: string[];
    if (typeof representation === 'string') {
      // Handle periodic notation in the input string
      const match = representation.match(/^(.*?)\((.*?)\)(.*)$/);
      if (match) {
        const [, before, periodic, after] = match;
        rep = [...before, ...periodic, ...after];
        this.isPeriodic = true;
        this.periodicStart = before.length;
        this.periodicEnd = before.length + periodic.length - 1;
      } else {
        rep = representation.split('');
      }
    } else {
      rep = representation;
    }

    this.comma = rep.indexOf('.');
    if (this.comma === -1) {
      this.comma = rep.length;
    }

    if (!this._checkArray(rep)) {
      throw new TypeError('Polyadic Number: Invalid representation given.');
    }

    this.arr = rep;
    this._actualizeValues();
  }

  private _actualizeValues(): void {
    this._checkArray(this.arr);
    this.value = this._getValue();
    this.bitString = this.isPeriodic ? this.toString() : this.arr.join('');
    this.valueString = this._constructValString();
  }

  private _checkArray(arr: string[]): boolean {
    const validChars = ['.', '-', '+', '(', ')'];
    return arr.every(char => {
      if (validChars.includes(char)) return true;
      const num = parseInt(char, this.power);
      return !isNaN(num) && num < this.power;
    });
  }

  private _getValue(): number {
    let firstNum = 0;
    if (this.arr[0] === '-') {
      this.sign = '-';
      firstNum = 1;
    } else if (this.arr[0] === '+') {
      this.sign = '+';
      firstNum = 1;
    } else {
      this.sign = '+';
    }
    if (this.power === 10) {
      return parseFloat(this.arr.join(''));
    }
    let val = 0;
    let count = 0;
    for (let i = this.comma - 1; i >= firstNum; i -= 1) {
      val += parseInt(this.arr[i], this.power) * (this.power ** count);
      count += 1;
    }
    count = 1;
    for (let i = this.comma + 1; i < this.arr.length; i += 1) {
      val += parseInt(this.arr[i], this.power) * ((1 / this.power) ** count);
      count += 1;
    }
    if (this.sign === '-') {
      return -val;
    }
    return val;
  }

  private _constructValString(): string {
    return `${this.value}`;
  }

  /** !!Internal method!!
   * Add a single digit to the actual number.
   * @param digit - single digit number
   * @param exp - optional position in the array
   */
  _additionOneDigit(digit: string | number, exp = 0): void {
    // prepare working arrays
    const splitted = this.arr.join('').split('.');
    let numBeforeComma: string[] = [];
    let numAfterComma: string[] = [];
    if ((Array.isArray(splitted)) && (splitted.length === 2)) {
      numBeforeComma = splitted[0].split('');
      numAfterComma = splitted[1].split('');
    } else {
      numBeforeComma = splitted[0].split('');
    }

    let overflow = 0;
    let act = digit;
    let breakAfterComma = false;
    // before comma
    if (exp < 0) {
      for (let i = 0; i < Math.abs(exp) + 1 - numAfterComma.length; i += 1) { // left padding
        numAfterComma.push('0');
      }
      for (let i = Math.abs(exp) - 1; i >= 0; i -= 1) {
        let res = 0;
        if (this.power === 16) {
          res = parseInt(numAfterComma[i], 16) + parseInt(act.toString(), 16);
        } else {
          res = parseInt(numAfterComma[i], 10) + parseInt(act.toString(), 10);
        }
        if (res >= this.power) {
          overflow = res - this.power;
          numAfterComma[i] = overflow.toString(this.power).toUpperCase();
          act = 1;
          this.watcher = this.watcher.step('constructResult')
            .saveVariable(`overflowAfterComma${i}`, 1);
        } else {
          numAfterComma[i] = res.toString(this.power).toUpperCase();
          breakAfterComma = true;
          break;
        }
      }
    }

    // after comma
    if (!breakAfterComma || (exp >= 0)) {
      let start = numBeforeComma.length - 1;
      if (exp >= 0) {
        for (let i = 0; i < exp + 1 - numBeforeComma.length; i += 1) { // left padding
          numBeforeComma.unshift('0');
        }
        start = numBeforeComma.length - 1 - exp;
      }
      for (let i = start; i >= 0; i -= 1) {
        let res = 0;
        if (this.power === 16) {
          res = parseInt(numBeforeComma[i], 16) + parseInt(act.toString(), 16);
        } else {
          res = parseInt(numBeforeComma[i], 10) + parseInt(act.toString(), 10);
        }
        if (res >= this.power) {
          overflow = res - this.power;
          numBeforeComma[i] = overflow.toString(this.power).toUpperCase();
          act = 1;
          this.watcher = this.watcher.step('constructResult')
            .saveVariable(`overflowBeforeComma${i}`, 1);
          if (i === 0) { // overflow at highest position
            numBeforeComma.unshift('1');
          }
        } else {
          numBeforeComma[i] = res.toString(this.power).toUpperCase();
          break;
        }
      }
    }

    const resultArray: string[] = [];
    numBeforeComma.forEach((a) => resultArray.push(a));
    if ((Array.isArray(splitted)) && (splitted.length === 2)) {
      resultArray.push('.');
      numAfterComma.forEach((a) => resultArray.push(a));
    }
    this.arr = resultArray;
  }

  /**
   * Subtract a single digit from the actual number.
   * @param digit - single digit number
   * @param exp - optional position in the array
   */
  private _subtractOneDigit(digit: string | number, exp = 0): void {
    // prepare working arrays
    const splitted = this.arr.join('').split('.');
    let numBeforeComma: string[] = [];
    let numAfterComma: string[] = [];
    if ((Array.isArray(splitted)) && (splitted.length === 2)) { // have comma?
      numBeforeComma = splitted[0].split('');
      numAfterComma = splitted[1].split('');
    } else {
      numBeforeComma = splitted[0].split('');
    }

    let underflow = 0;
    let act = digit;
    // Check if result must be negative
    if ((exp >= 0) && (numBeforeComma.length < exp + 1)) {
      // case general higher exponent at subtrahend
      this.isNegative = true;
      for (let i = 0; i < exp + 1 - numBeforeComma.length; i += 1) { // left padding
        numBeforeComma.unshift('0');
      }
    } else if (
      // case subtrahend and minuend has the same exponent
      // but subtrahend has the higher digit at highest exponent
      (exp >= 0)
      && (numBeforeComma.length === exp + 1)
      && (parseInt(numBeforeComma[exp], this.power) - parseInt(act.toString(), this.power) < 0)
    ) {
      this.isNegative = true;
    } else if (
      // case no number before comma
      // exponents subtrahend after comma is greater than the exponent of the minuend
      (exp < 0)
      && (numBeforeComma.length === 0)
      && (numAfterComma.length + exp < 0)) {
      this.isNegative = true;
    }

    // calc result for a single digit
    let breakAfterComma = false;
    this.watcher = this.watcher.step('constructResult')
      .saveVariable('digit', digit)
      .saveVariable('exp', exp);
    // before comma
    if (exp < 0) {
      for (let i = 0; i < Math.abs(exp) - numAfterComma.length; i += 1) { // left padding
        numAfterComma.push('0');
      }
      for (let i = Math.abs(exp) - 1; i >= 0; i -= 1) {
        let res = 0;
        if (this.power === 16) {
          res = parseInt(numAfterComma[i], 16) - parseInt(act.toString(), 16);
        } else {
          res = parseInt(numAfterComma[i], 10) - parseInt(act.toString(), 10);
        }
        if (res < 0) {
          underflow = Math.abs(res);
          numAfterComma[i] = (this.power - underflow).toString(this.power).toUpperCase();
          act = 1;
          if ((numBeforeComma.length === 0) && ((i === 0) || ((i === 1) && (numAfterComma[0] === '0')))) {
            // case underflow makes result negative
            this.isNegative = true;
          }
          this.watcher = this.watcher.step('constructResult')
            .saveVariable(`underflowAfterComma${i}`, 1);
        } else {
          numAfterComma[i] = res.toString(this.power).toUpperCase();
          breakAfterComma = true;
          this.watcher = this.watcher.step('constructResult')
            .saveVariable(`underflowAfterComma${i}`, 0);
          break;
        }
      }
    }

    // after comma
    if (!breakAfterComma || (exp >= 0)) {
      let start = numBeforeComma.length - 1;
      if (exp >= 0) {
        for (let i = 0; i < exp + 1 - numBeforeComma.length; i += 1) { // left padding
          numBeforeComma.unshift('0');
        }
        start = numBeforeComma.length - 1 - exp;
      }
      for (let i = start; i >= 0; i -= 1) {
        let res = 0;
        if (this.power === 16) {
          res = parseInt(numBeforeComma[i], 16) - parseInt(act.toString(), 16);
        } else {
          res = parseInt(numBeforeComma[i], 10) - parseInt(act.toString(), 10);
        }
        if (res < 0) {
          underflow = Math.abs(res);
          numBeforeComma[i] = (this.power - underflow).toString(this.power).toUpperCase();
          act = 1;
          if ((i === 0) || ((i === 1) && (numBeforeComma[0] === '0'))) {
            // case underflow makes result negative
            this.isNegative = true;
          }
          this.watcher = this.watcher.step('constructResult')
            .saveVariable(`underflowBeforeComma${i}`, 1);
        } else {
          numBeforeComma[i] = res.toString(this.power).toUpperCase();
          this.watcher = this.watcher.step('constructResult')
            .saveVariable(`underflowBeforeComma${i}`, 0);
          break;
        }
      }
    }

    const resultArray: string[] = [];
    numBeforeComma.forEach((a) => resultArray.push(a));
    if ((Array.isArray(splitted)) && (splitted.length === 2)) {
      resultArray.push('.');
      numAfterComma.forEach((a) => resultArray.push(a));
    }
    this.arr = resultArray;
  }

  /**
   * Add a float to the actual polyadic
   * @param input - Float to add
   */
  _additionFloat(input: string): void {
    this.watcher = this.watcher.step('Input')
      .saveVariable('operator', '+')
      .saveVariable('bitString1', this.bitString)
      .saveVariable('bitString2', input);
    const val = input.split('.');
    if ((Array.isArray(val)) && (val.length === 2)) {
      const afterComma = val[1].split('');
      this.watcher = this.watcher.step('Input')
        .saveVariable('afterComma', [...afterComma]);
      for (let i = afterComma.length - 1; i >= 0; i -= 1) {
        this.watcher = this.watcher.step('constructResult')
          .saveVariable(`digitAfterComma${i}`, afterComma[i])
          .saveVariable(`expAfterComma${i}`, -i - 1);
        this._additionOneDigit(afterComma[i], -i - 1);
      }
    }
    // reverse, so index and exponent go the same way
    const beforeComma = val[0].split('').reverse();
    this.watcher = this.watcher.step('Input')
      .saveVariable('beforeComma', [...beforeComma].reverse());
    for (let i = 0; i < beforeComma.length; i += 1) {
      this.watcher = this.watcher.step('constructResult')
        .saveVariable(`digitBeforeComma${i}`, beforeComma[i])
        .saveVariable(`expBeforComma${i}`, -i - 1);
      this._additionOneDigit(beforeComma[i], i);
    }
    this._actualizeValues();
    this.watcher = this.watcher.step('Result')
      .saveVariable('array', [...this.arr])
      .saveVariable('bitString', this.bitString)
      .saveVariable('value', this.value)
      .saveVariable('valueString', this.valueString)
      .saveVariable('sign', this.sign)
      .saveVariable('comma', this.comma);
  }

  /**
   * Subtract a float from the actual polyadic
   * @param input - Float to subtract
   */
  _subtractionFloat(input: string): void {
    this.watcher = this.watcher.step('Input')
        .saveVariable('operator', '-')
        .saveVariable('bitString1', this.bitString)
        .saveVariable('bitString2', input);

    const inputSplitted = input.toString().split('.');
    
    // If minuend has no decimal point but subtrahend does, add decimal point and zeros
    if (!this.arr.includes('.') && inputSplitted.length === 2) {
        this.arr.push('.');
        this.arr.push('0');  // Add at least one zero after decimal
    }

    if (inputSplitted.length === 2) {
        const afterComma = inputSplitted[1].split('');
        this.watcher = this.watcher.step('Input')
            .saveVariable('afterComma', [...afterComma]);
        
        // Ensure minuend has enough decimal places
        const currentDecimalPlaces = this.arr.indexOf('.') >= 0 ? 
            this.arr.length - this.arr.indexOf('.') - 1 : 0;
        
        while (currentDecimalPlaces < afterComma.length) {
            this.arr.push('0');
        }

        for (let i = afterComma.length - 1; i >= 0; i -= 1) {
            this._subtractOneDigit(afterComma[i], -i - 1);
        }
    }

    const beforeComma = inputSplitted[0].split('').reverse();
    this.watcher = this.watcher.step('Input')
        .saveVariable('beforeComma', [...beforeComma].reverse());
    
    const lenPadding = Math.max(beforeComma.length - this.comma, 0);
    this.arr = Array(lenPadding).fill('0').concat(this.arr);

    for (let i = 0; i < beforeComma.length; i += 1) {
        this._subtractOneDigit(beforeComma[i], i);
    }

    // Clean up leading zeros
    while (this.arr.length > 1 && this.arr[0] === '0' && 
           (this.arr.length === 1 || this.arr[1] !== '.')) {
        this.arr.shift();
    }

    // Handle negative results
    if (this.isNegative) {
        this.arr[this.arr.length - 1] = (
            parseInt(this.arr[this.arr.length - 1], this.power) - 1
        ).toString(this.power).toUpperCase();
        
        for (let i = 0; i < this.arr.length; i += 1) {
            const a = this.arr[i];
            if ((a !== '-') && (a !== '.') && (a !== ',')) {
                this.arr[i] = (this.power - parseInt(a, this.power) - 1)
                    .toString(this.power).toUpperCase();
            }
        }
        this.arr.unshift('-');
        this.isNegative = false;
    }

    this._actualizeValues();
    this.watcher = this.watcher.step('Result')
        .saveVariable('array', [...this.arr])
        .saveVariable('bitString', this.bitString)
        .saveVariable('value', this.value)
        .saveVariable('valueString', this.valueString)
        .saveVariable('sign', this.sign)
        .saveVariable('comma', this.comma);
  }

  setPeriodicInfo(start?: number, end?: number): void {
    if (start !== undefined && end !== undefined) {
      this.isPeriodic = true;
      this.periodicStart = start;
      this.periodicEnd = end;
    } else {
      this.isPeriodic = false;
      this.periodicStart = undefined;
      this.periodicEnd = undefined;
    }
  }

  toString(): string {
    if (!this.isPeriodic) {
      // Join the array and remove trailing zeros after decimal point
      let str = this.arr.join('');
      if (str.includes('.')) {
        str = str.replace(/\.?0+$/, '');  // Remove trailing zeros and optional decimal point
      }
      return str;
    }

    const parts = this.arr.join('').split('.');
    let wholePart = parts[0] || '0';
    wholePart = wholePart.replace(/^0+$/, '');
    let decimalPart = parts[1] || '';

    if (this.periodicStart === undefined || this.periodicEnd === undefined) {
      // Remove trailing zeros for non-periodic decimal part
      decimalPart = decimalPart.replace(/^0+$/, '');
      return decimalPart ? `${wholePart}.${decimalPart}` : wholePart;
    }

    // Handle periodic numbers
    const periodicStartInDecimal = this.periodicStart - (wholePart.length + 1);
    const periodicEndInDecimal = this.periodicEnd - (wholePart.length + 1);

    if (periodicStartInDecimal >= 0) {
      const beforePeriodic = decimalPart.slice(0, periodicStartInDecimal);
      const periodicPart = decimalPart.slice(periodicStartInDecimal, periodicEndInDecimal + 1);
      const afterPeriodic = decimalPart.slice(periodicEndInDecimal + 1);
      
      // Remove trailing zeros from non-periodic parts
      const cleanAfterPeriodic = afterPeriodic.replace(/0+$/, '');
      
      decimalPart = `${beforePeriodic}(${periodicPart})${cleanAfterPeriodic}`;
    }

    return decimalPart ? `${wholePart}.${decimalPart}` : wholePart;
  }
}
