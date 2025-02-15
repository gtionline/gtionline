/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import { Algorithm } from './algorithms/algorithm';
import { NumberPolyadic } from './algorithms/arithmetic/polyadic/numberPolyadic';
import { FormatConversions } from './formatConversions';

interface ResultPanel {
  name: string;
  text: string;
  subpanels?: ResultPanel[];
}

export class DescriptionPolyadicSolution {
  private imp: any; // Translation service interface
  private watcher: Algorithm;
  private table: string;
  private result: ResultPanel[];
  public negativeMinuendSubtrahend: boolean;

  constructor(imp: any, watcher: Algorithm) {
    this.imp = imp;
    this.watcher = watcher;
    this.table = '';
      this.result = [];
    this.negativeMinuendSubtrahend = false;
  }

  // =========================================================================================
  // Addition
  private getAdditionTable(): void {
    // set up tabular for visual the addition
    let bitString1 = this.watcher.steps.Input.data.bitString1;
    const beforeComma = this.watcher.steps.Input.data.beforeComma;
    const afterComma = this.watcher.steps.Input.data.afterComma || [];
    const resultString = this.watcher.steps.Result.data.bitString;

    const splittedResultString = resultString.split('.');
    const splittedBitString1 = bitString1.split('.');
    bitString1 = `${'0'.repeat(splittedResultString[0].length - splittedBitString1[0].length)}${bitString1}`;
    
    for (let i = beforeComma.length; i < splittedResultString[0].length; i += 1) {
      beforeComma.unshift('0');
    }
    
    if (splittedResultString[1] != null) {
      if (splittedBitString1[1] != null) {
        bitString1 = `${bitString1}${'0'.repeat(splittedResultString[1].length - splittedBitString1[1].length)}`;
      }
      for (let i = afterComma.length; i < splittedResultString[1].length; i += 1) {
        afterComma.push('0');
      }
    }

    const row1: string[] = ['&'];
    const row2: string[] = ['+&'];
    const rowCarry: string[] = ['&'];
    const row3: string[] = ['&'];
    const tabdef = `{${'c'.repeat(resultString.length)}}`;

    for (let i = 0; i < bitString1.length; i += 1) {
      row1.push(` ${bitString1[i]}`);
      row1.push('&');
    }

    let carrySet = false;
    for (let i = 0; i < beforeComma.length; i += 1) {
      row2.push(` ${beforeComma[i]}`);
      if (i !== beforeComma.length - 1) {
        let carryBit = this.watcher.steps.constructResult.data[`overflowBeforeComma${i}`] ?? 
                      this.watcher.steps.constructResult.data[`overflowBeforeComma${i + 1}`];
        
        if (carryBit == null) {
          carryBit = ' ';
        } else {
          carrySet = true;
        }
        rowCarry.push(`\\scriptsize{${carryBit}} &`);
      } else {
        if (this.watcher.steps.constructResult.data[`overflowAfterComma${0}`] != null) {
          const carryBit = this.watcher.steps.constructResult.data[`overflowAfterComma${0}`];
          rowCarry.push(`\\scriptsize{${carryBit}} &`);
          carrySet = true;
        } else {
          rowCarry.push('&');
        }
      }
      row2.push('&');
    }

    if (afterComma.length > 0) {
      row2.push(' .&');
      rowCarry.push(' &');
    }

    for (let i = 0; i < afterComma.length - 1; i += 1) {
      row2.push(` ${afterComma[i]}`);
      if (i !== beforeComma.length - 1) {
        let carryBit = this.watcher.steps.constructResult.data[`overflowAfterComma${i + 1}`];
        if (carryBit == null) {
          carryBit = ' ';
        } else {
          carrySet = true;
        }
        rowCarry.push(`\\scriptsize{${carryBit}} &`);
      } else {
        rowCarry.push('&');
      }
      row2.push('&');
    }
    
    row2.push(` ${afterComma[afterComma.length - 1]}`);
    rowCarry.push(' ');

    for (let i = 0; i < resultString.length; i += 1) {
      row3.push(` ${resultString[i]}`);
      row3.push('&');
    }

    row1.pop();
    row1.push(' \\\\ ');
    row2.pop();
    row2.push(' \\\\ ');
    rowCarry.pop();
    rowCarry.push(' \\\\ ');
    row3.pop();

    const table = [
      `\\begin{array} ${tabdef}`,
      row1.join(''),
      row2.join(''),
    ];

    if (carrySet) {
      table.push(rowCarry.join(''));
    }

    table.push('\\hline');
    table.push(row3.join(''));
    table.push('\\end{array}');
    this.table = table.join('');
  }

  additionDescription(y1: NumberPolyadic, y2: NumberPolyadic): void {
    this.getAdditionTable();
    this.result.push({
      name: `${this.imp.$t('addition')}`,
      text: `\\(${this.table}\\)`,
    });
  }

  // =========================================================================================
  // Multiplication
  private getMultiplicationTable(): void {
    // the calculation is set up in a table
    const tabdef: string[] = [];
    const watcher = this.watcher;
    if (!watcher.steps.Result.data.result.isNaN) {
      const mulSteps = watcher.steps.MultiplicationSteps.data; // steps
      const n1Arr = watcher.steps.MultiplicationInput.data.leftArr; // first factor
      const n2Arr = watcher.steps.MultiplicationInput.data.rightArr; // second factor
      while (n1Arr[n1Arr.length - 1] === 0) {
        n1Arr.pop();
      }
      const n1len = n1Arr.length;
      while (n2Arr[n2Arr.length - 1] === 0) {
        n2Arr.pop();
      }
      const n2len = n2Arr.length;
      const countSteps = Math.min(mulSteps.countSteps, n2len); // count of steps until result
      const mulRes = watcher.steps.Result.data.resultArr; // result of multiplication
      const stepLength = mulSteps.Step0_toAdd.arr.length;
      const arrLen = Math.max(n1len + countSteps, n1len + n2len, n2len + countSteps) + 3; // columns

      // table definition
      tabdef.push('{');
      tabdef.push('c|');
      for (let i = 0; i < arrLen; i += 1) {
        tabdef.push('c');
      }
      tabdef.push('c');
      tabdef.push('}');

      // build top row
      const rows: string[] = [ // rows of the result table
        `&&${n1Arr.join('&')}`,
      ];
      rows[0] += '&\\times&';
      rows[0] += n2Arr.join('&');
      for (let i = n1Arr.length + n2Arr.length + 1; i < arrLen; i += 1) {
        rows[0] += '&';
      }
      const converter = new FormatConversions(0,0); // 0, 0 since we do not consider a floating point
      converter.binToDec(n1Arr.join(''));
      const leftVal = converter.result;
      converter.binToDec(n2Arr.join(''));
      const rightVal = converter.result;
      rows[0] += `\\ (${leftVal}_\{10\} * ${rightVal}_\{10\})\\\\`;
      rows[0] += '\\hline';

      // inner rows
      for (let i = 0; i < countSteps; i += 1) {
        rows.push(`${i}&+`);
        let stepsToAdd = mulSteps[`Step${i}_toAdd`].arr;
        const isZero = stepsToAdd.every((a: number) => a === 0);
        if (!isZero) {
          stepsToAdd = n1Arr;
        }
        if (stepLength - stepsToAdd.length > 0) {
          stepsToAdd = stepsToAdd.concat(Array(stepLength - stepsToAdd.length)
            .fill(0, 0)); // Pad right
        }
        for (let j = 0; j < i; j += 1) {
          rows[rows.length - 1] += '&';
        }
        rows[rows.length - 1] = rows[rows.length - 1];
        rows[rows.length - 1] += '&';

        rows[rows.length - 1] += stepsToAdd.join('&');
        for (let j = stepsToAdd.length + i; j < arrLen; j += 1) {
          rows[rows.length - 1] += '&';
        }

        const padding = mulRes.length - stepsToAdd.length - 1;
        if (padding > 0) {
          stepsToAdd = stepsToAdd.concat(Array(padding)
            .fill(0, 0)); // Pad right
        }
        converter.binToDec(stepsToAdd.join(''));
        const add = Number(converter.result) * Math.pow(2, -i);
        rows[rows.length - 1] += `\\ (${add}_\{10\})`;
        rows[rows.length - 1] += '\\\\ ';
      }

      // Last row
      rows.push('\\hline');
      rows.push('\\mathcal\{L\}&');
      let actCols = 1;
      for (let j = mulRes.length; j <= stepLength; j += 1) {
        rows.push('&');
        actCols += 1;
      }
      rows[rows.length - 1] += `${mulRes.join('&')}`;
      actCols += mulRes.length;
      for (let k = actCols; k <= arrLen; k += 1) {
        rows[rows.length - 1] += '&';
      }
      converter.binToDec(mulRes.join(''));
      const add = converter.result;
      rows[rows.length - 1] += `&\\ (${add}_\{10\})`;

      this.table = [
        `\\begin{array} ${tabdef.join('')}`,
        rows.join(''),
        '\\end{array}',
      ].join('');
    } else {
      this.table = `\\text{${this.imp.$t('solutionIsNan')}}`;
    }
  }

  multiplicationDescription(y1: NumberPolyadic, y2: NumberPolyadic): void {
    this.getMultiplicationTable();
    this.result.push({
      name: `${this.imp.$t('multiplication')}`,
      text: `\\(${this.table}\\)`,
    });
  }

  // =========================================================================================
  // Subtraction
  private getSubtractionTable(): void {
    // set up tabular for visual the subtraction
    let bitString1 = this.watcher.steps.Input.data.bitString1;
    const beforeComma = this.watcher.steps.Input.data.beforeComma;
    const afterComma = this.watcher.steps.Input.data.afterComma || [];
    const resultString = this.watcher.steps.Result.data.bitString;

    const splittedResultString = resultString.split('.');
    const splittedBitString1 = bitString1.split('.');
    
    // Add safety check for padding calculation
    const paddingLength = Math.max(0, splittedResultString[0].length - splittedBitString1[0].length);
    bitString1 = `${'0'.repeat(paddingLength)}${bitString1}`;
    
    // Ensure beforeComma array has enough space
    while (beforeComma.length < splittedResultString[0].length) {
      beforeComma.unshift('0');
    }
    
    if (splittedResultString[1] != null) {
      if (splittedBitString1[1] != null) {
        const decimalPadding = Math.max(0, splittedResultString[1].length - splittedBitString1[1].length);
        bitString1 = `${bitString1}${'0'.repeat(decimalPadding)}`;
      }
      while (afterComma.length < splittedResultString[1].length) {
        afterComma.push('0');
      }
    }

    const row1: string[] = ['&'];
    const row2: string[] = ['-&'];
    const rowBorrow: string[] = ['&'];
    const row3: string[] = ['&'];
    const tabdef = `{${'c'.repeat(resultString.length + 1)}}`;  // +1 for the sign column

    for (let i = 0; i < bitString1.length; i += 1) {
      row1.push(` ${bitString1[i]}`);
      row1.push('&');
    }

    let borrowSet = false;
    for (let i = 0; i < beforeComma.length; i += 1) {
      row2.push(` ${beforeComma[i]}`);
      if (i !== beforeComma.length - 1) {
        let borrowBit = this.watcher.steps.constructResult.data[`borrowBeforeComma${i}`] ?? 
                      this.watcher.steps.constructResult.data[`borrowBeforeComma${i + 1}`];
        
        if (borrowBit == null) {
          borrowBit = ' ';
        } else {
          borrowSet = true;
        }
        rowBorrow.push(`\\scriptsize{${borrowBit}} &`);
      } else {
        if (this.watcher.steps.constructResult.data[`borrowAfterComma${0}`] != null) {
          const borrowBit = this.watcher.steps.constructResult.data[`borrowAfterComma${0}`];
          rowBorrow.push(`\\scriptsize{${borrowBit}} &`);
          borrowSet = true;
        } else {
          rowBorrow.push('&');
        }
      }
      row2.push('&');
    }

    if (afterComma.length > 0) {
      row2.push(' .&');
      rowBorrow.push(' &');
    }

    for (let i = 0; i < afterComma.length - 1; i += 1) {
      row2.push(` ${afterComma[i]}`);
      if (i !== beforeComma.length - 1) {
        let borrowBit = this.watcher.steps.constructResult.data[`borrowAfterComma${i + 1}`];
        if (borrowBit == null) {
          borrowBit = ' ';
        } else {
          borrowSet = true;
        }
        rowBorrow.push(`\\scriptsize{${borrowBit}} &`);
      } else {
        rowBorrow.push('&');
      }
      row2.push('&');
    }
    
    row2.push(` ${afterComma[afterComma.length - 1]}`);
    rowBorrow.push(' ');

    for (let i = 0; i < resultString.length; i += 1) {
      row3.push(` ${resultString[i]}`);
      row3.push('&');
    }

    row1.pop();
    row1.push(' \\\\ ');
    row2.pop();
    row2.push(' \\\\ ');
    rowBorrow.pop();
    rowBorrow.push(' \\\\ ');
    row3.pop();

    const table = [
      `\\begin{array} ${tabdef}`,
      row1.join(''),
      row2.join(''),
    ];

    if (borrowSet) {
      table.push(rowBorrow.join(''));
    }

    table.push('\\hline');
    table.push(row3.join(''));
    table.push('\\end{array}');
    this.table = table.join('');
  }

  subtractionDescription(y1: NumberPolyadic, y2: NumberPolyadic): void {
    this.getSubtractionTable();
    this.result.push({
      name: `${this.imp.$t('subtraction')}`,
      text: `\\(${this.table}\\)`,
    });
  }

  // =========================================================================================
  // Division
  private getDivisionTable(): void {
    const tabdef: string[] = [];
    if (!this.watcher.steps.Result.data.result.isNaN) {
      const divWatcher = this.watcher.steps.Division.data.division;
      const divSteps = divWatcher.steps.DivisionSteps.data; // steps
      const countSteps = divSteps.countSteps; // count of steps until result
      const n1Arr = divWatcher.steps.DivisionInput.data.n1Arr; // divisor
      const n2Arr = divSteps.Step0_Sub2; // dividend
      const n2len = n2Arr.length;
      const divRes = divWatcher.steps.Result.data.resultArr; // result of division
      let arrLen = Math.max(
        divSteps[`Step${countSteps - 1}_SubRes`].length - 2,
        divSteps.Step0_Sub1.length + divSteps.Step0_Sub2.length,
      ); // columns
      arrLen = arrLen + n2len + 2;

      // table definition
      tabdef.push('{');
      tabdef.push('c|');
      for (let i = 0; i < arrLen; i += 1) {
        tabdef.push('c');
      }
      tabdef.push('|c');
      tabdef.push('}');

      // build top row
      const rows: string[] = [ // rows of the result table
        `&&${divSteps.Step0_Sub1.join('&')}`,
      ];
      rows[0] += '&:&';
      rows[0] += n2Arr.join('&');
      for (let i = n1Arr.length + n2Arr.length + 1; i < arrLen; i += 1) {
        rows[0] += '&';
      }
      rows[0] += '\\\\';

      // inner rows
      let wasNeg = 0; // repeat last subtrahend
      for (let i = 0; i < countSteps; i += 1) {
        rows.push('&&');
        rows.push(`${i}&&`);

        if (wasNeg !== 0) {
          // first value, minuend
          const stepsToAdd = divSteps[`Step${i - 1}_Sub1`];
          for (let j = 0; j < i - 1; j += 1) {
            stepsToAdd[j] = ' ';
          }
          rows[rows.length - 2] += stepsToAdd.join('&');
          rows[rows.length - 2] += '& 0';
          for (let j = divSteps[`Step${i - 1}_Sub1`].length + 1; j < arrLen; j += 1) {
            rows[rows.length - 2] += '&';
          }
          if (i > 0) {
            rows[rows.length - 2] += '\\Sigma < 0 \\rightarrow 0';
          }
          rows[rows.length - 3] = rows[rows.length - 3].replace('-', '<');
        } else {
          const stepsToAdd = divSteps[`Step${i}_Sub1`];
          for (let j = 0; j < i - wasNeg; j += 1) { // remove leading 0
            stepsToAdd[j] = ' ';
          }
          rows[rows.length - 2] += stepsToAdd.join('&');
          for (let j = divSteps[`Step${i}_Sub1`].length; j < arrLen; j += 1) {
            rows[rows.length - 2] += '&';
          }
          if (i > 0) {
            rows[rows.length - 2] += '\\Sigma > 0 \\rightarrow 1';
          }
        }

        // second value, subtrahend
        for (let j = 0; j < i; j += 1) {
          rows[rows.length - 1] += '&';
        }
        rows[rows.length - 1] = rows[rows.length - 1].slice(0, -1);
        rows[rows.length - 1] += '-&';

        rows[rows.length - 1] += n2Arr.join('&');
        for (let j = n2len + i; j < arrLen; j += 1) {
          rows[rows.length - 1] += '&';
        }
        if (wasNeg !== 0) {
          rows[rows.length - 1] += `\\hookrightarrow \{\\scriptstyle ${this.imp.$t('repeatMinuend')}\}`;
        }

        rows[rows.length - 2] += '\\\\ ';
        rows[rows.length - 1] += '\\\\ ';
        rows[rows.length - 1] += '\\hline';

        if (divSteps[`Step${i}_SubRes_isNegative`]) {
          wasNeg += 1;
        } else {
          wasNeg = 0;
        }
      }

      // Last row
      rows.push('\\mathcal\{L\}&&');
      rows[rows.length - 1] += `${divRes[0]},& ${divRes.slice(1, divRes.length)
        .join('&')}`;
      rows[rows.length - 1] += '&';
      for (let k = divRes.length; k < arrLen - 2; k += 1) {
        rows[rows.length - 1] += '&';
      }
      if (wasNeg !== 0) {
        rows[rows.length - 1] += '&\\Sigma < 0 \\rightarrow 0';
        rows[rows.length - 2] = rows[rows.length - 2].replace('-', '<');
      } else {
        rows[rows.length - 1] += '&\\Sigma > 0 \\rightarrow 1';
      }

      this.table = [
        `\\begin{array} ${tabdef.join('')}`,
        rows.join(''),
        '\\end{array}',
      ].join('');
    } else {
      this.table = `${this.imp.$t('solutionIsNan')}`;
    }
  }

  divisionDescription(y1: NumberPolyadic, y2: NumberPolyadic): void {
    this.getDivisionTable();
    this.result.push({
      name: `${this.imp.$t('division')}`,
      text: `\\(${this.table}\\)`,
    });
  }

  makeDescription(num1: string, num2: string, format: number, operator: string): void {
    const y1 = new NumberPolyadic(format, num1);
    const y2 = new NumberPolyadic(format, num2);
    switch (operator) {
      case 'add':
        if (y1.sign === '+' && y2.sign === '+') {
          this.additionDescription(y1, y2);
        } else if (y2.sign === '-') {
          y2.sign = '+';
          y2.arr.shift();
          this.subtractionDescription(y1, y2);
        } else {
          this.subtractionDescription(y1, y2);
        }
        break;

      case 'mul':
        this.multiplicationDescription(y1, y2);
        break;

      case 'sub':
        if ((y1.sign === '-') && (y2.sign === '+')) {
          this.negativeMinuendSubtrahend = true;
          y1.sign = '+';
          y1.arr.shift();
          this.additionDescription(y1, y2);
        } else if (y1.sign === '+' && y2.sign === '+') {
          this.subtractionDescription(y1, y2);
        } else {
          y2.sign = '+';
          y2.arr.shift();
          this.additionDescription(y1, y2);
        }
        break;

      case 'div':
        this.divisionDescription(y1, y2);
        break;
      default:
    }
    // result
    const resultString = this.watcher.steps.Result.data.bitString;
    const resultValue = this.watcher.steps.Result.data.value;
    this.result.push({
      name: this.imp.$t('solution'),
      text: [
        `${this.imp.$t('solution')}: `,
        `\\(${resultString}\\) `,
        `\\(\\hspace{2cm} \\)${this.imp.$t('value')} (${this.imp.$t('decimal')}): \\(${resultValue}\\)`,
      ].join(''),
    });
  }

  getResult(): ResultPanel[] {
    return this.result;
  }
}
