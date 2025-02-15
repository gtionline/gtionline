/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import { reactive } from 'vue';
import * as convertFormat from './formatConversions';
import { getIEEEFromString } from './algorithms/arithmetic/IEEE/numberIEEE';

function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

export class DescriptionSolution {
  constructor(imp, exponentBits, numBits, watcher) {
    classCallCheck(this, DescriptionSolution);
    this.imp = imp;
    this.table = '';
    this.result = reactive([]); // [];
    this.exponentBits = exponentBits;
    this.numBits = numBits;
    this.watcher = watcher;
  }

  // =========================================================================================
  // Addition
  getAdditionTable() {
    // set up tabular for visual the addition
    const mantissa1 = this.watcher.steps.AddMantissa.data.addition.steps.Addition.data.op1Arr;
    const mantissa2 = this.watcher.steps.AddMantissa.data.addition.steps.Addition.data.op2Arr;
    const carryBits = this.watcher.steps.AddMantissa.data.addition.steps.Addition.data.carryArr;
    const result = this.watcher.steps.AddMantissa.data.addition.steps.Addition.data.resultArr;
    const cols = this.watcher.steps.AddMantissa.data.binNum;
    const row1 = [];
    const row2 = [];
    const row3 = [];
    const rowCarry = [];
    const tabdef = [];
    row1.push('&');
    row2.push('+&');
    rowCarry.push('&');
    row3.push('&');
    tabdef.push('{');
    console.log(mantissa1);
    console.log(mantissa2);
    for (let i = mantissa1.length; i <= cols; i += 1) {
      mantissa1.unshift(0);
    }
    for (let i = mantissa2.length; i <= cols; i += 1) {
      mantissa2.unshift(0);
    }
    for (let i = carryBits.length; i <= cols; i += 1) {
      carryBits.unshift(0);
    }
    for (let i = 0; i <= cols + 1; i += 1) {
      tabdef.push('c');
      if (i === 2) {
        row1.push(',');
        row2.push(',');
        rowCarry.push('');
        row3.push(',');
      } else {
        const index = i > 2 ? i - 1 : i;
        row1.push(` ${mantissa1[index]}`);
        row2.push(` ${mantissa2[index]}`);
        rowCarry.push(`\\scriptsize{${carryBits[index]}}`);
        row3.push(` ${result[index]}`);
      }
      row1.push('&');
      rowCarry.push('&');
      row2.push('&');
      row3.push('&');
    }
    tabdef.push('}');
    row1.pop();
    row1.push('\\\\ ');
    row2.pop();
    rowCarry.pop();
    rowCarry.push('\\\\ ');
    row2.push('\\\\ ');
    row3.pop();
    this.table = [
      `\\begin{array} ${tabdef.join('')}`,
      `${row1.join('')}`,
      `${row2.join('')}`,
      `${rowCarry.join('')}`,
      '\\hline',
      `${row3.join('')}`,
      '\\end{array}',
    ].join('');
  }

  createExponentShiftDescription(
    exponentBits1,
    exponentDecimal1,
    left,
    exponentBits2,
    exponentDecimal2,
    deltaExponent,
    preShift,
    mantissa2,
  ) {
    const maxExponentDecimal = Math.max(exponentDecimal1, exponentDecimal2);
    const minExponentDecimal = Math.min(exponentDecimal1, exponentDecimal2);
    return [
      `${this.imp.$t('smallerExponent')} `,
      `\\( ( [ ${exponentBits1} ] :=  ${exponentDecimal1} ${left}
            [ ${exponentBits2} ] :=  ${exponentDecimal2}) \\) `,
      '</br>',
      `${this.imp.$t('resDiffExponent')}: `,
      `\\( ${maxExponentDecimal} - ${minExponentDecimal} = ${deltaExponent} \\)`,
      '</br>',
      ` ${this.imp.$t('shiftMantissa')}: \\( `,
      preShift,
      `\\overset{\\text{Shift: ${deltaExponent} }}{\\rightarrow}`,
      mantissa2,
      '\\)',
    ].join('');
  }

  additionDescription(solution, _y1, _y2) {
    let y1;
    let y2;
    if (_y1.exponent >= _y2.exponent && _y1.sign === 0) {
      y1 = JSON.parse(JSON.stringify(_y1));
      y2 = JSON.parse(JSON.stringify(_y2));
    } else {
      y1 = JSON.parse(JSON.stringify(_y2));
      y2 = JSON.parse(JSON.stringify(_y1));
    }
    console.log(y1);
    console.log(y2);
    let mantissaString1 = y1.mantissaBits.join('');
    mantissaString1 = `${mantissaString1[0]},${mantissaString1.substring(1)}`;
    let mantissaString2 = y2.mantissaBits.join('');
    mantissaString2 = `${mantissaString2[0]},${mantissaString2.substring(1)}`;
    const expString1 = y1.exponentBits.join('');
    const expString2 = y2.exponentBits.join('');
    const watcher = this.watcher;
    this.result.push({
      name: this.imp.$t('values'),
      text: `${this.imp.$t('firstSummand')}: ${this.imp.$t('sign')}: ${(y1.sign === 0 ? '+' : '-')} ${this.imp.$t('exponent')}: ${expString1} ${this.imp.$t('mantissa')}: ${mantissaString1}<br>`
          + `${this.imp.$t('secondSummand')}: ${this.imp.$t('sign')}: ${(y2.sign === 0 ? '+' : '-')} ${this.imp.$t('exponent')}: ${expString2} ${this.imp.$t('mantissa')}: ${mantissaString2}`,
    });
    if (y1.isZero || y2.isZero) {
      this.result.push(reactive({
        name: `${this.imp.$t('step')} 1`,
        text: [
          `${this.imp.$t('addWithZero')}`,
        ].join(''),
      }));
      const converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
      converter.ieeeToDec([
        watcher.steps.Result.data.result.sign, ' ',
        watcher.steps.Result.data.result.exponentBits.join(''),
        watcher.steps.Result.data.result.mantissaBits.join('').substring(1),
      ].join(''), watcher.steps.ResultEdgecase.data.edgecase);
      const decSol = converter.result;
      this.createIEEESolutionBox(decSol, watcher.steps.Result.data.result);
    } else if (watcher.steps.ResultEdgecase.data.edgecase !== 'none') { // case: edgecase
      switch (watcher.steps.ResultEdgecase.data.edgecase) {
        case 'nan':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} 2`,
            text: [
              `${this.imp.$t('solutionIsNan')}`,
            ].join(''),
          }));
          break;
        case 'inf':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} 2`,
            text: [
              `${this.imp.$t('solutionIsInf')}`,
            ].join(''),
          }));
          break;
        case 'zero':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} 2`,
            text: [
              `${this.imp.$t('solutionIsZero')}`,
            ].join(''),
          }));
          break;
        default:
      }
      const converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
      converter.ieeeToDec([
        watcher.steps.Result.data.result.sign, ' ',
        watcher.steps.Result.data.result.exponentBits.join(''),
        watcher.steps.Result.data.result.mantissaBits.join('').substring(1),
      ].join(''), watcher.steps.ResultEdgecase.data.edgecase);
      const decSol = converter.result;
      this.createIEEESolutionBox(decSol, watcher.steps.Result.data.result);
    } else {
      const deltaExponent = this.watcher.steps.CalculateDeltaE.data.deltaE;
      if (deltaExponent === 0) {
        this.result.push(reactive({
          name: `${this.imp.$t('step')} 1`,
          text: `${this.imp.$t('adjustExponents')} \\( (${expString1} = ${expString2} \\Rightarrow i.O.) \\)`,
        }));
      } else {
        const left = watcher.steps.CalculateDeltaE.data.switched ? '<' : '>';
        const exponentBits1 = watcher.steps.CalculateDeltaE.data.expN1Bits.join('');
        const exponentBits2 = watcher.steps.CalculateDeltaE.data.expN2Bits.join('');
        const exponentDecimal1 = watcher.steps.CalculateDeltaE.data.expN1;
        const exponentDecimal2 = watcher.steps.CalculateDeltaE.data.expN2;
        const preShift = watcher.steps.CalculateDeltaE.data.preShift.join('');
        const mantissa2 = watcher.steps.AddMantissa.data.mantissa2.join('');

        this.result.push(reactive({
          name: `${this.imp.$t('step')} 1`,
          text: `${this.imp.$t('adjustExponents')} \\( (${expString1} \\neq ${expString2}) \\)`,
          subpanels: [
            {
              name: `${this.imp.$t('diffExponent')}`,
              text: this.createExponentShiftDescription(exponentBits1, exponentDecimal1, left, exponentBits2, exponentDecimal2, deltaExponent, deltaExponent, preShift, mantissa2),
            },
          ],
        }));
      }
      if (!watcher.steps.AddMantissa.data.equalMantissa) {
        this.getAdditionTable();
        if (watcher.steps.Result.data.result.isDenormalized) {
          this.result.push(reactive({
            name: `${this.imp.$t('step')} 2`,
            text: [
              `${this.imp.$t('addMantissa')}`,
            ].join(''),
            subpanels: [
              {
                name: `${this.imp.$t('newMantissa')}`,
                text: [
                  `${this.imp.$t('consider1comma')} `,
                  `${this.imp.$t('newMantissaIs')}`,
                  '\<br\> \<br\>',
                  '\\(',
                  this.table,
                  '\\)',
                  '\<br\> \<br\>',
                  watcher.steps.AddMantissa.data.shift !== 0 ? `${this.imp.$t('mantissaNormalizeDenorm', { shift: watcher.steps.Normalize.data.shift, exponent: watcher.steps.Normalize.data.finalExpBits.join('') })} \<br\>` : '',
                  `${this.imp.$t('mantissa1float')} ${watcher.steps.Normalize.data.normalizedMantissa.join('')}`,
                ].join(''),
              },
            ],
          }));
        } else {
          this.result.push(reactive({
            name: `${this.imp.$t('step')} 2`,
            text: [
              `${this.imp.$t('addMantissa')}`,
            ].join(''),
            subpanels: [
              {
                name: `${this.imp.$t('newMantissa')}`,
                text: [
                  `${this.imp.$t('consider1comma')} `,
                  `${this.imp.$t('newMantissaIs')}`,
                  '\<br\> \<br\>',
                  '\\(',
                  this.table,
                  '\\)',
                  '\<br\> \<br\>',
                  watcher.steps.AddMantissa.data.shift !== 0 ? `${this.imp.$t('mantissaNormalize', { shift: watcher.steps.Normalize.data.shift, exponent: watcher.steps.Normalize.data.finalExpBits.join('') })} \<br\>` : '',
                  `${this.imp.$t('mantissa1float')} ${watcher.steps.Normalize.data.normalizedMantissa.join('')}`,
                ].join(''),
              },
            ],
          }));
        }
      } else {
        this.result.push(reactive({
          name: `${this.imp.$t('step')} 2`,
          text: `${this.imp.$t('addMantissa')}`,
          subpanels: [
            {
              name: `${this.imp.$t('newMantissa')}`,
              text: `${this.imp.$t('equalMantissa')}`,
            },
          ],
        }));
      }
      console.log(this.watcher);
      const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
      converter.ieeeToDec([
        this.watcher.steps.Result.data.result.sign, ' ',
        this.watcher.steps.Result.data.result.exponentBits.join(''),
        this.watcher.steps.Result.data.result.mantissaBits.join('').substring(1),
      ].join(''), this.watcher.steps.ResultEdgecase.data.edgecase);
      const decSol = converter.result;
      this.createIEEESolutionBox(decSol, watcher.steps.Result.data.result);
    }
  }

  // =========================================================================================
  // Multiplication
  /* eslint-disable */
  getMultiplicationTable() {
    // the calculation is set up in a table
    // information, steps
    const tabdef = [];
    const watcher = this.watcher;
    if (!watcher.steps.Result.data.result.isNaN) {
      const mulWatcher = watcher.steps.Multiplication.data.multiplication;
      const mulSteps = mulWatcher.steps.MultiplicationSteps.data; // steps
      const n1Arr = mulWatcher.steps.MultiplicationInput.data.leftArr; // first factor
      const n2Arr = mulWatcher.steps.MultiplicationInput.data.rightArr; // second factor
      while (n1Arr[n1Arr.length - 1] === 0) {
        n1Arr.pop();
      }
      const n1len = n1Arr.length;
      while (n2Arr[n2Arr.length - 1] === 0) {
        n2Arr.pop();
      }
      const n2len = n2Arr.length;
      const countSteps = Math.min(mulSteps.countSteps, n2len); // count of steps until result
      const mulRes = mulWatcher.steps.Result.data.resultArr; // result of multiplication
      const stepLength = mulSteps.Step0_toAdd.arr.length;
      let arrLen = Math.max(n1len + countSteps, n1len + n2len, n2len + countSteps) + 3; // columns
      // table definition
      tabdef.push('{');
      tabdef.push('c|');
      for (let i = 0; i < arrLen; i += 1) {
        tabdef.push('c');
      }
      tabdef.push('c');
      tabdef.push('}');
      // build top row
      const rows = [ // rows of the result table
        `&&${n1Arr.join('&')}`,
      ];
      rows[0] += '&\\times&';
      rows[0] += n2Arr.join('&');
      for (let i = n1Arr.length + n2Arr.length + 1; i < arrLen; i += 1) {
        rows[0] += '&';
      }
      let converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
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
        const isZero = stepsToAdd.every(a => a === 0);
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
        converter = new convertFormat.FormatConversions(
          this.exponentBits,
          this.numBits,
        );
        converter.binToDec(stepsToAdd.join(''));
        const add = converter.result * 2 ** -i;
        rows[rows.length - 1] += `\\ (${add}_\{10\})`;

        rows[rows.length - 1] += '\\\\ ';
      } // end for

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
      converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
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
  /* eslint-enable */

  multiplicationDescription(solution, y1, y2) {
    let mantissaString1 = y1.mantissaBits.join('');
    mantissaString1 = `1,${mantissaString1.substring(1)}`;
    let mantissaString2 = y2.mantissaBits.join('');
    mantissaString2 = `1,${mantissaString2.substring(1)}`;
    const expString1 = y1.exponentBits.join('');
    const expString2 = y2.exponentBits.join('');
    const watcher = this.watcher;
    this.result.push(reactive({
      name: `${this.imp.$t('values')}`,
      text: `${this.imp.$t('firstFactor')}: ${this.imp.$t('sign')}: ${(y1.sign === 0 ? '+' : '-')} ${this.imp.$t('exponent')}: ${expString1} ${this.imp.$t('mantissa')}: ${mantissaString1}<br>`
          + `${this.imp.$t('secondFactor')}: ${this.imp.$t('sign')}: ${(y2.sign === 0 ? '+' : '-')} ${this.imp.$t('exponent')}: ${expString2} ${this.imp.$t('mantissa')}: ${mantissaString2}`,
    }));
    if (y1.isZero || y2.isZero) {
      this.result.push(reactive({
        name: `${this.imp.$t('step')} 1`,
        text: [
          `${this.imp.$t('mulWithZero')}`,
        ].join(''),
      }));
    } else if (watcher.steps.ResultEdgecase.data.edgecase !== 'none') { // case: edgecase
      switch (watcher.steps.ResultEdgecase.data.edgecase) {
        case 'nan':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} 1`,
            text: [
              `${this.imp.$t('solutionIsNan')}`,
            ].join(''),
          }));
          return;
        case 'inf':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} 1`,
            text: [
              `${this.imp.$t('solutionIsInf')}`,
            ].join(''),
          }));
          return;
        case 'zero':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} 1`,
            text: [
              `${this.imp.$t('solutionIsZero')}`,
            ].join(''),
          }));
          break;
        default:
      }
      return;
    } else {
      const converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
      converter.binToDec(expString1);
      // const leftVal = converter.result;
      converter.binToDec(expString2);
      // const rightVal = converter.result;
      console.log(watcher);
      let curE = watcher.steps.CalculateExp.data.notShifted;
      const exponentIntermediateResult = [];
      const expBitNum = watcher.steps.Result.data.result.expBitNum;
      for (let i = 0; i < expBitNum; i += 1) {
        exponentIntermediateResult.unshift(curE % 2);
        curE = Math.floor(curE / 2);
      }
      this.result.push(reactive({
        name: `${this.imp.$t('step')} 1`,
        text: [
          this.imp.$t('addExponents'),
          this.imp.$t('newExponentMultiplication', {
            E1: watcher.steps.CalculateExp.data.E1,
            E2: watcher.steps.CalculateExp.data.E2,
            Bias: watcher.steps.CalculateExp.data.bias,
            Result: watcher.steps.CalculateExp.data.notShifted,
            ExpBits: exponentIntermediateResult.join(''),
          }),
        ].join(' '),
      }));
      this.getMultiplicationTable();
      const mantissaDescription = [
        `${this.imp.$t('newMantissaIs')}`,
        '\<br\> \<br\>',
        `\\( ${this.table} \\)`,
        '\<br\> \<br\>',
      ];
      console.log(watcher);
      mantissaDescription.push(`${this.imp.$t('consider1comma')} `);
      if (watcher.steps.MulMantissa.data.shift !== 0) {
        const descriptionText = this.imp.$t('mantissaNormalize', {
          shift: watcher.steps.MulMantissa.data.shift,
          exponent: watcher.steps.Result.data.result.exponentBits.join(''),
        });
        mantissaDescription.push(`${descriptionText} \<br\>`);
      }
      mantissaDescription.push(`${this.imp.$t('mantissa1float')} ${watcher.steps.MulMantissa.data.normalizedMantissa.join('')}`);

      const mantissaDescriptionStr = mantissaDescription.join('');

      this.result.push(reactive({
        name: `${this.imp.$t('step')} 2`,
        text: [
          `${this.imp.$t('mulMantissa')}`,
        ].join(''),
        subpanels: [
          {
            name: `${this.imp.$t('doMultiplication')}`,
            text: mantissaDescriptionStr,
          },
        ],
      }));
    }

    const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
    converter.ieeeToDec([
      watcher.steps.Result.data.result.sign, ' ',
      watcher.steps.Result.data.result.exponentBits.join(''),
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1),
    ].join(''), watcher.steps.ResultEdgecase.data.edgecase);
    const decSol = converter.result;
    this.createIEEESolutionBox(decSol, watcher.steps.Result.data.result);
    console.log(watcher);
  }

  // =========================================================================================
  // Subtraction
  getSubtractionTable() {
    // set up tabular for visual the addition
    const addWatcher = this.watcher.steps.Addition.data.addition;
    // const originalMantissa1 = addWatcher.steps.AddMantissa.data.mantissa1;
    // const originalMantissa2 = addWatcher.steps.AddMantissa.data.mantissa2;
    const mantissa1 = addWatcher.steps.AddMantissa.data.addition.steps.Addition.data.op1Arr;
    const mantissa2 = addWatcher.steps.AddMantissa.data.addition.steps.Addition.data.op2Arr;
    const carryBits = addWatcher.steps.AddMantissa.data.addition.steps.Addition.data.carryArr;
    const result = addWatcher.steps.AddMantissa.data.addition.steps.Addition.data.resultArr;
    const cols = addWatcher.steps.AddMantissa.data.binNum;
    const row1 = [];
    const row2 = [];
    const row3 = [];
    const row4 = [];
    const rowCarry = [];
    const row5 = [];
    const tabdef = [];
    console.log(addWatcher.steps.AddMantissa.data.addition.steps.Addition.data);
    console.log(addWatcher.steps);
    if (addWatcher.steps.AddMantissa.data.sign1 === 1
      && addWatcher.steps.AddMantissa.data.sign2 === 0) {
      row1.push('-&');
      row2.push('+&');
    } else if (addWatcher.steps.AddMantissa.data.sign1 === 0
      && addWatcher.steps.AddMantissa.data.sign2 === 1) {
      row1.push('&');
      row2.push('-&');
    } else {
      row1.push('-&');
      row2.push('-&');
    }
    row3.push('&');
    row4.push('+&');
    rowCarry.push('\\scriptsize{+}&');
    row5.push('=&');
    tabdef.push('{');
    // console.log('Triggering');
    // result.unshift(addWatcher.steps.AddMantissa.data.addition.steps.Addition.data.result.signBit);
    // for (let i = originalMantissa1.length; i <= cols; i += 1) {
    //   originalMantissa1.unshift(0);
    // }
    // for (let i = originalMantissa2.length; i <= cols; i += 1) {
    //   originalMantissa2.unshift(0);
    // }
    for (let i = mantissa1.length; i <= cols; i += 1) {
      if (addWatcher.steps.AddMantissa.data.addition.steps.Addition.data.op1.signBit === 0) {
        mantissa1.unshift(0);
      } else {
        // Mantissa is in the complement: fill up with 1s
        mantissa1.unshift(1);
      }
    }
    for (let i = mantissa2.length; i <= cols; i += 1) {
      if (addWatcher.steps.AddMantissa.data.addition.steps.Addition.data.op2.signBit === 0) {
        mantissa2.unshift(0);
      } else {
        // Mantissa is in the complement: fill up with 1s
        mantissa2.unshift(1);
      }
    }
    for (let i = carryBits.length; i <= cols; i += 1) {
      carryBits.unshift(0);
    }
    for (let i = result.length; i <= cols; i += 1) {
      result.unshift(addWatcher.steps.AddMantissa.data.addition.steps.Addition.data.result.signBit);
    }
    for (let i = 0; i < cols + 1; i += 1) {
      tabdef.push('c');
      /* row1.push(` ${originalMantissa1[i]}`);
      row1.push('&');
      row2.push(` ${originalMantissa2[i]}`);
      row2.push('&'); */
      if (i === 2) {
        row3.push(',');
        row4.push(',');
        rowCarry.push('');
        row5.push(',');
      } else {
        const index = i > 2 ? i - 1 : i;
        row3.push(` ${mantissa1[index]}`);
        row4.push(` ${mantissa2[index]}`);
        rowCarry.push(` \\scriptsize{${carryBits[index]}}`);
        row5.push(` ${result[index]}`);
      }
      row3.push('&');
      row4.push('&');
      rowCarry.push('&');
      row5.push('&');
    }
    tabdef.push('}');
    row1.pop();
    row1.push('\\\\ ');
    row2.pop();
    row2.push('\\\\ ');
    row3.pop();
    row3.push('\\\\ ');
    row4.pop();
    row4.push('\\\\ ');
    rowCarry.pop();
    rowCarry.push('\\\\ ');
    row5.pop();

    this.table = [
      `\\begin{array} ${tabdef.join('')}`,
      // `${row1.join('')}`,
      // `${row2.join('')}`,
      // '\\hline_{Complement:} \\\\[-8mm]',
      `${row3.join('')}`,
      `${row4.join('')}`,
      `${rowCarry.join('')}`,
      '\\hline',
      `${row5.join('')}`,
      '\\end{array}',
    ].join('');
  }

  createIEEESolutionBox(decSol, result) {
    this.result.push(reactive({
      name: this.imp.$t('solution'),
      text: [
        `${this.imp.$t('solution')}: ${result.sign} ${result.exponentBits.join('')} ${result.mantissaBits.join('').substring(1)}`,
        '\\( \\implies \\)',
        ` ${this.imp.$t('decimal')}: ${decSol}`,
      ].join('') + this.createIEEENumberBreakdown(result),
    }));
  }

  createIEEENumberBreakdown(result) {
    return '<ul>'
      + `<li>${this.imp.$t('sign')}: ${result.sign}</li>`
      + `<li>${this.imp.$t('exponent')}: ${result.exponentBits.join('')}</li>`
      + `<li>${this.imp.$t('mantissa')}: ${result.mantissaBits.join('').substring(1)}</li>`
      + '</ul>';
  }

  subtractionDescription(solution, _y1, _y2) {
    let y1;
    let y2;
    if (_y1.exponent >= _y2.exponent) {
      y1 = JSON.parse(JSON.stringify(_y1));
      y2 = JSON.parse(JSON.stringify(_y2));
    } else {
      y1 = JSON.parse(JSON.stringify(_y2));
      y2 = JSON.parse(JSON.stringify(_y1));
    }
    let mantissaString1 = y1.mantissaBits.join('');
    mantissaString1 = `1,${mantissaString1.substring(1)}`;
    let mantissaString2 = y2.mantissaBits.join('');
    mantissaString2 = `1,${mantissaString2.substring(1)}`;
    const expString1 = y1.exponentBits.join('');
    const expString2 = y2.exponentBits.join('');
    const watcher = this.watcher;
    console.log(y1);
    console.log(y2);
    console.log(watcher);
    let actStep = 1;
    this.result.push(reactive({
      name: `${this.imp.$t('values')}`,
      text: `${this.imp.$t('minuend')}: ${this.imp.$t('sign')}: ${(y1.sign === 0 ? '+' : '-')} ${this.imp.$t('exponent')}: ${expString1} ${this.imp.$t('mantissa')}: ${mantissaString1}<br>`
          + `${this.imp.$t('subtrahend')}: ${this.imp.$t('sign')}: ${(y2.sign === 0 ? '+' : '-')} ${this.imp.$t('exponent')}: ${expString2} ${this.imp.$t('mantissa')}: ${mantissaString2}`,
    }));
    const addWatcher = watcher.steps.Addition.data.addition;
    console.log(y1);
    console.log(y2);
    if (y1.isZero || y2.isZero) { // case: subtraction with zero
      this.result.push(reactive({
        name: `${this.imp.$t('step')} ${actStep}`,
        text: [
          `${this.imp.$t('subWithZero')}`,
        ].join(''),
      }));
      const converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
      converter.ieeeToDec([
        addWatcher.steps.Result.data.result.sign, ' ',
        addWatcher.steps.Result.data.result.exponentBits.join(''),
        addWatcher.steps.Result.data.result.mantissaBits.join('').substring(1),
      ].join(''), addWatcher.steps.ResultEdgecase.data.edgecase);
      const decSol = converter.result;
      this.createIEEESolutionBox(decSol, addWatcher.steps.Result.data.result);
    } else if (addWatcher.steps.ResultEdgecase.data.edgecase !== 'none') { // case: edgecase
      switch (addWatcher.steps.ResultEdgecase.data.edgecase) {
        case 'nan':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} ${actStep}`,
            text: [
              `${this.imp.$t('solutionIsNan')}`,
            ].join(''),
          }));
          return;
        case 'inf':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} ${actStep}`,
            text: [
              `${this.imp.$t('solutionIsInf')}`,
            ].join(''),
          }));
          return;
        case 'zero':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} ${actStep}`,
            text: [
              `${this.imp.$t('solutionIsZero')}`,
            ].join(''),
          }));
          return;
        default:
      }
      const converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
      converter.ieeeToDec([
        addWatcher.steps.Result.data.result.sign, ' ',
        addWatcher.steps.Result.data.result.exponentBits.join(''),
        addWatcher.steps.Result.data.result.mantissaBits.join('').substring(1),
      ].join(''), addWatcher.steps.ResultEdgecase.data.edgecase);
      const decSol = converter.result;
      console.log(watcher);
      this.createIEEESolutionBox(decSol, watcher.steps.Result.data.result);
    } else {
      if (addWatcher.steps.CalculateDeltaE.data.deltaE === 0) {
        this.result.push(reactive({
          name: `${this.imp.$t('step')} ${actStep}`,
          text: `${this.imp.$t('adjustExponents')} \\( (${expString1} = ${expString2} \\Rightarrow i.O.) \\)`,
        }));
      } else {
        const left = addWatcher.steps.CalculateDeltaE.data.switched ? '<' : '>';
        const exponentBits1 = addWatcher.steps.CalculateDeltaE.data.expN1Bits.join('');
        const exponentBits2 = addWatcher.steps.CalculateDeltaE.data.expN2Bits.join('');
        const exponentDecimal1 = addWatcher.steps.CalculateDeltaE.data.expN1;
        const exponentDecimal2 = addWatcher.steps.CalculateDeltaE.data.expN2;
        const deltaExponent = addWatcher.steps.CalculateDeltaE.data.deltaE;
        const preShift = addWatcher.steps.CalculateDeltaE.data.preShift.join('');
        const mantissa2 = addWatcher.steps.AddMantissa.data.mantissa2.join('');

        this.result.push(reactive({
          name: `${this.imp.$t('step')} ${actStep}`,
          text: `${this.imp.$t('adjustExponents')} \\( (${expString1} \\neq ${expString2}) \\)`,
          subpanels: [
            {
              name: `${this.imp.$t('diffExponent')}`,
              text: this.createExponentShiftDescription(exponentBits1, exponentDecimal1, left, exponentBits2, exponentDecimal2, deltaExponent, preShift, mantissa2),
            },
          ],
        }));
      }
      if (!addWatcher.steps.AddMantissa.data.equalMantissa) { // case: not equal mantissa
        if (addWatcher.steps.AddMantissa.data.complement1.steps.Complement.data.negate) {
          actStep += 1;
          const mantissa1Str = addWatcher.steps.AddMantissa.data.mantissa1.join('');
          const flippedBits = addWatcher.steps.AddMantissa.data.complement1.steps.Complement.data.flippedArray.join('');
          const oneAdded = addWatcher.steps.AddMantissa.data.complement1.steps.Complement.data.oneAdded.join('');
          const normalizedArray = addWatcher.steps.AddMantissa.data.complement1.steps.Complement.data.normalizedArray.join('');
          const flippedBitsShort = flippedBits.substring(0, mantissa1Str.length);
          const oneAddedShort = oneAdded.substring(0, mantissa1Str.length);
          this.result.push(reactive({
            name: `${this.imp.$t('step')} ${actStep}`,
            text: `${this.imp.$t('subtTwosComplement')}`,
            subpanels:
            [
              {
                name: `${this.imp.$t('mantissaTwosComplement')}: \\(${mantissa1Str}\\)`,
                text: `${this.imp.$t('switchBits')}: \\(${mantissa1Str} \\rightarrow ${flippedBitsShort}\\)\<br\>`
                  + `${this.imp.$t('add1')}: \\(${flippedBitsShort} \\rightarrow ${oneAddedShort}\\)\<br\>`
                  + `${this.imp.$t('normalize')}: \\(${oneAddedShort} \\rightarrow ${normalizedArray}\\)`,
              },
            ],
          }));
        }
        const signBitNeeded = addWatcher.steps.AddMantissa.data.complement2.steps.Complement.data.negate;
        if (signBitNeeded) {
          actStep += 1;
          const mantissa2Str = addWatcher.steps.AddMantissa.data.mantissa2.join('');
          const flippedBits = addWatcher.steps.AddMantissa.data.complement2.steps.Complement.data.flippedArray.join('');
          const oneAdded = addWatcher.steps.AddMantissa.data.complement2.steps.Complement.data.oneAdded.join('');
          const normalizedArray = addWatcher.steps.AddMantissa.data.complement2.steps.Complement.data.normalizedArray.join('');
          const flippedBitsShort = flippedBits.substring(0, mantissa2Str.length);
          const oneAddedShort = oneAdded.substring(0, mantissa2Str.length);
          this.result.push(reactive({
            name: `${this.imp.$t('step')} ${actStep}`,
            text: `${this.imp.$t('subtTwosComplement')}`,
            subpanels:
              [
                {
                  name: `${this.imp.$t('mantissaTwosComplement')}: \\(${mantissa2Str}\\)`,
                  text: `${this.imp.$t('switchBits')}: \\(${mantissa2Str} \\rightarrow ${flippedBitsShort}\\)\<br\>`
                    + `${this.imp.$t('add1')}: \\(${flippedBitsShort} \\rightarrow ${oneAddedShort}\\)\<br\>`
                    + `${this.imp.$t('normalize')}: \\(${oneAddedShort} \\rightarrow ${normalizedArray}\\)`,
                },
              ],
          }));
        }
        this.getSubtractionTable();
        actStep += 1;
        let mantissaDescription = [
          signBitNeeded ? `${this.imp.$t('newMantissaSignBit')}` : `${this.imp.$t('newMantissaIs')}`,
          '\<br\> \<br\>',
          `\\( ${this.table} \\)`,
          '\<br\> \<br\>',
        ];
        if (addWatcher.steps.AddMantissa.data.sign) {
          mantissaDescription.push(`${this.imp.$t('mantissaComplement')} `);
        }
        mantissaDescription.push(`${this.imp.$t('consider1comma')} `);
        if (addWatcher.steps.AddMantissa.data.shift !== 0) {
          const descriptionText = this.imp.$t('mantissaNormalize', {
            shift: addWatcher.steps.Normalize.data.shift,
            exponent: addWatcher.steps.Normalize.data.finalExpBits.join(''),
          });
          mantissaDescription.push(`${descriptionText} \<br\>`);
        }
        mantissaDescription.push(`${this.imp.$t('mantissa1float')} ${addWatcher.steps.AddMantissa.data.normalizedMantissa.join('')}`);
        mantissaDescription = mantissaDescription.join('');

        this.result.push(reactive({
          name: `${this.imp.$t('step')} ${actStep}`,
          text: `${this.imp.$t('addMantissa')}`,
          subpanels: [
            {
              name: `${this.imp.$t('newMantissa')}`,
              text: mantissaDescription,
            },
          ],
        }));
      } else { // case: equal mantissa
        actStep += 1;
        const mantissaDescription = [
          `${this.imp.$t('subtraction')} ${this.imp.$t('mantissa')}`,
          `${this.imp.$t('consider1comma')} ${this.imp.$t('mantissa1float')} ${addWatcher.steps.AddMantissa.data.normalizedMantissa.join('')}`,
        ].join('');

        this.result.push(reactive({
          name: `${this.imp.$t('step')} ${actStep}`,
          text: mantissaDescription,
        }));
      }
      const converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
      converter.ieeeToDec([
        addWatcher.steps.Result.data.result.sign, ' ',
        addWatcher.steps.Result.data.result.exponentBits.join(''),
        addWatcher.steps.Result.data.result.mantissaBits.join('')
          .substring(1),
      ].join(''), addWatcher.steps.ResultEdgecase.data.edgecase);
      const decSol = converter.result;
      this.createIEEESolutionBox(decSol, addWatcher.steps.Result.data.result);
    }
  }

  // =========================================================================================
  // Division
  getDivisionTable() {
    // the calculation is set up in a table
    // information, steps
    const tabdef = [];
    if (!this.watcher.steps.Result.data.result.isNaN) {
      const divWatcher = this.watcher.steps.Division.data.division;
      const divSteps = divWatcher.steps.DivisionSteps.data; // steps
      const countSteps = divSteps.countSteps; // count of steps until result
      const n1Arr = divWatcher.steps.DivisionInput.data.n1Arr; // divisor
      const n2Arr = divSteps.Step0_Sub2; // dividend
      const n2len = n2Arr.length;
      const divRes = divWatcher.steps.Result.data.resultArr; // result of division
      const shiftPos = this.watcher.steps.Exponent.data.Shift;
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
      const rows = [ // rows of the result table
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
      } // end for

      // Last row
      rows.push('\\mathcal\{L\}&&');
      const commaPos = Math.max(0, shiftPos);
      console.log('commaPos', shiftPos);
      const beforeComma = divRes.slice(0, commaPos + 1);
      const afterComma = divRes.slice(commaPos + 1);
      rows[rows.length - 1] += `${beforeComma.join('&')},& ${afterComma.join('&')}`;
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

  divisionDescription(solution, y1, y2) {
    let mantissaString1 = y1.mantissaBits.join('');
    mantissaString1 = `1,${mantissaString1.substring(1)}`;
    let mantissaString2 = y2.mantissaBits.join('');
    mantissaString2 = `1,${mantissaString2.substring(1)}`;
    const expString1 = y1.exponentBits.join('');
    const expString2 = y2.exponentBits.join('');
    const watcher = this.watcher;
    this.result.push(reactive({
      name: `${this.imp.$t('values')}`,
      text: `${this.imp.$t('numerator')}: ${this.imp.$t('sign')}: ${(y1.sign === 0 ? '+' : '-')} ${this.imp.$t('exponent')}: ${expString1} ${this.imp.$t('mantissa')}: ${mantissaString1}<br>`
          + `${this.imp.$t('denominator')}: ${this.imp.$t('sign')}: ${(y2.sign === 0 ? '+' : '-')} ${this.imp.$t('exponent')}: ${expString2} ${this.imp.$t('mantissa')}: ${mantissaString2}`,
    }));

    if (watcher.steps.Exponent != null) { // This can happen when result is NaN
      this.result.push(reactive({
        name: `${this.imp.$t('step')} ${this.result.length}`,
        text: [
          `${this.imp.$t('subtExponents')} ${this.imp.$t('newExponentDivision', {
            E1: watcher.steps.Exponent.data.E1,
            E2: watcher.steps.Exponent.data.E2,
            Bias: watcher.steps.Exponent.data.Bias,
            Result: watcher.steps.Exponent.data.EUnshifted,
          })}`,
        ].join(''),
      }));
    }

    if (watcher.steps.ResultEdgecase.data.edgecase !== 'none') { // case: edgecase
      switch (watcher.steps.ResultEdgecase.data.edgecase) {
        case 'nan':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} ${this.result.length}`,
            text: [
              `${this.imp.$t('solutionIsNan')}`,
            ].join(''),
          }));
          break;
        case 'inf':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} ${this.result.length}`,
            text: [
              `${this.imp.$t('solutionIsInf')}`,
            ].join(''),
          }));
          break;
        case 'zero':
          this.result.push(reactive({
            name: `${this.imp.$t('step')} ${this.result.length}`,
            text: [
              `${this.imp.$t('solutionIsZero')}`,
            ].join(''),
          }));
          break;
        default:
      }
    } else {
      if (!watcher.steps.Division.data.equalMantissa) { // case not equal mantissa
        this.getDivisionTable();
        const mantissaDescriptionParts = [
          `${this.imp.$t('newMantissaIs')}`,
          '\<br\> \<br\>',
          `\\( ${this.table} \\)`,
          '\<br\> \<br\>',
        ];
        if (watcher.steps.ResultEdgecase.data.edgecase === 'denormalized') {
          mantissaDescriptionParts.push(`${this.imp.$t('mantissaDenormalize')} \<br\>`);
        } else {
          if (watcher.steps.Exponent.data.Shift !== 0) {
            const descriptionText = this.imp.$t('mantissaNormalize', {
              shift: watcher.steps.Exponent.data.Shift,
              exponent: watcher.steps.Result.data.result.exponentBits.join(''),
            });
            mantissaDescriptionParts.push(`${descriptionText} \<br\>`);
          }
          mantissaDescriptionParts.push(`${this.imp.$t('mantissa1float')} ${solution.mantissaBits.join('').substring(1)}`);
        }
        const mantissaDescription = mantissaDescriptionParts.join('');

        this.result.push(reactive({
          name: `${this.imp.$t('step')} 2`,
          text: `${this.imp.$t('divMantissa')}`,
          subpanels: [
            {
              name: `${this.imp.$t('doDivision')}`,
              text: mantissaDescription,
            },
          ],
        }));
      } else { // case equal mantissa
        this.result.push(reactive({
          name: `${this.imp.$t('step')} 2`,
          text: `${this.imp.$t('divMantissa')}`,
          subpanels: [
            {
              name: `${this.imp.$t('doDivision')}`,
              text: `${this.imp.$t('equalMantissaDiv', { Mantissa: solution.mantissaBits.join('').substring(1) })}`,
            },
          ],
        }));
      }
    }
    const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
    converter.ieeeToDec([
      watcher.steps.Result.data.result.sign, ' ',
      watcher.steps.Result.data.result.exponentBits.join(''),
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1),
    ].join(''), watcher.steps.ResultEdgecase.data.edgecase);
    const decSol = converter.result;
    this.createIEEESolutionBox(decSol, watcher.steps.Result.data.result);
  }

  makeDescriptionArithmetic(num1, num2, solutionString, operator) {
    if (num1 !== '' && num2 !== '' && num1 !== this.imp.$t('falseFormat') && num2 !== this.imp.$t('falseFormat')) {
      const solution = getIEEEFromString(this.exponentBits, solutionString);
      const y1 = getIEEEFromString(this.exponentBits, num1);
      const y2 = getIEEEFromString(this.exponentBits, num2);
      switch (operator) {
        case 'add':
          if (y1.sign === 0 && y2.sign === 0) {
            this.additionDescription(solution, y1, y2);
          } else if (y2.sign === 1) {
            y2.sign = 0;
            y2.arr[0] = 0;
            this.subtractionDescription(solution, y1, y2);
          } else {
            this.subtractionDescription(solution, y1, y2);
          }
          break;

        case 'mul':
          this.multiplicationDescription(solution, y1, y2);
          break;

        case 'sub':
          if (y2.sign === 0) {
            if (y1.sign === 1) {
              this.negativeMinuendSubtrahend = true;
              y1.sign = 0;
              y1.arr[0] = 0;
              y2.sign = 0;
              y2.arr[0] = 0;
              this.additionDescription(solution, y1, y2);
            } else {
              this.subtractionDescription(solution, y1, y2);
            }
          } else if (y1.sign === 1 && y2.sign === 1) {
            this.subtractionDescription(solution, y1, y2);
          } else {
            y2.sign = 0;
            y2.arr[0] = 0;
            this.additionDescription(solution, y1, y2);
          }
          break;

        case 'div':
          this.divisionDescription(solution, y1, y2);
          break;
        default:
      }
    } else {
      this.result = reactive([]);
    }
  }

  // eslint-disable-next-line no-unused-vars
  makeDescriptionConversion(solution) {
    const converter = new convertFormat.FormatConversions(
      solution.exponentBits.length,
      solution.bitNum,
    );
    let edgecase = '';
    if (solution.isZero) {
      edgecase = 'zero';
    }
    if (solution.isNaN) {
      edgecase = 'nan';
    }
    if (solution.isInfinity) {
      edgecase = 'inf';
    }
    if (solution.isDenormalized) {
      edgecase = 'denormalized';
    }
    converter.ieeeToDec([
      solution.sign, ' ',
      solution.exponentBits.join(''),
      solution.mantissaBits.join('').substring(1),
    ].join(''), edgecase);

    const decSol = converter.result;
    this.createIEEESolutionBox(decSol, solution);
  }
}
