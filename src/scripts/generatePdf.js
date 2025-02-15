/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import { getIEEEFromString } from './algorithms/arithmetic/IEEE/numberIEEE';
import * as description from './DescriptionSolution';
import router from '../router/index';
import * as convertFormat from './formatConversions';

function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

export class PdfDescription {
  constructor(imp, exponentBits, numBits, watcher) {
    classCallCheck(this, PdfDescription);
    this.imp = imp;
    // eslint-disable-next-line new-cap
    this.description = new description.DescriptionSolution(
      this.imp,
      exponentBits,
      numBits,
      watcher,
    );
    this.negativeMinuendSubtrahend = false;
    this.exponentBits = exponentBits;
    this.numBits = numBits;
    this.watcher = watcher;
  }

  getStyle() {
    let style = '';
    style += '<style scoped>';
    // MathJax
    style += '.MathJax { font-size: 11px !important; } ';
    // page
    style += '#body { size: A4; padding-top: 2cm; margin-top: 2cm; margin-bottom: 0.5cm; }';
    style += '#page :first { size: A4; margin-top: 0; margin-bottom: 0.5cm; }';
    // header
    style += '#header1 { color: black; font-family: arial; font-size: 28px; font-weight: bold;'
      + 'break-after: always; margin-left: auto; margin-right: auto; margin-bottom: 0.5cm;'
      + 'margin-top: 0.5cm} ';
    style += '#header2 { color: black; font-family: arial; font-size: 16px; font-weight: bold;'
      + 'text-align: left; margin-left: 1cm; margin-right: 1cm; margin-top: 0.5cm} ';
    style += '#header3 { color: black; font-family: arial; font-size: 13px;  text-align: left;'
      + 'margin-left: 0; margin-right: 0; margin-top: 0.5cm; margin-bottom: 0.25cm;'
      + 'font-style: italic} ';
    // text
    style += '#txt { color: black; font-family: arial; font-size: 12px; text-align: left;'
      + 'margin-left: 1cm; margin-right: 1cm} ';
    style += '#ctr { color: black; font-family: arial; font-size: 12px; text-align: center; '
      + 'margin-left: auto; margin-right: auto} ';
    // list
    style += 'ul, ol{ display: block; list-style-type: decimal; list-style-type: disc; '
      + ' margin-top: 1em; margin-bottom: 1em; margin-left: 1cm; margin-right: 1cm;'
      + 'padding-left: 0.3cm;}';
    style += 'li { color: black; font-family: arial; font-size: 12px; text-align: left;} ';
    // table
    style += '#tab1 { width:60%; border-spacing: 5px; padding: 15px;'
      + 'border-collapse: collapse; margin-left:auto; margin-right:auto; text-align: center} ';
    style += 'th { font-weight: bold; text-size: 12px; font-family: arial;'
      + 'border-bottom: 1px solid gray} ';
    style += 'tr, td { text-size: 12px; font-family: arial} ';
    style += 'td:first-child, th:first-child { text-size: 12px; border-right: 1px solid gray} ';
    // pagebreak
    style += '#page-break { display: block; page-break-before: always; padding-bottom: 2cm} ';
    // footer
    style += '#foot { position: fixed; left: 0; bottom: 0; width: auto; color: lightgray;'
      + ' text-align: center; margin-bottom: 0.7cm; margin-left: 0.7cm; margin-right: 0.7cm; '
      + 'font-size: 10px; border-top: 1px solid lightgray} ';

    style += '</style>';
    this.style = style;
  }

  getHeader(y2) {
    let header = '';
    header += `<div id="header1">${this.imp.$t('gti')}</div>`;
    switch (this.imp.selectedFormat[2]) {
      case 'add':
        if (y2.sign === 0) {
          header += `<ctr>${this.imp.$t('example')} ${this.imp.$t('approach')}: ${this.imp.$t('addition')} \\( ${this.imp.inputNums['0']} + ${this.imp.inputNums['1']} \\)</ctr>`;
        } else {
          header += `<ctr>${this.imp.$t('example')} ${this.imp.$t('approach')}: ${this.imp.$t('addition')} \\( ${this.imp.inputNums['0']} + ${this.imp.inputNums['1']} \\Rightarrow \\)`;
          const negate = this.imp.inputNums['1'] * -1;
          header += ` ${this.imp.$t('subtraction')} \\( ${this.imp.inputNums['0']} - ${negate} \\)</ctr>`;
        }
        break;
      case 'mul':
        header += `<ctr>${this.imp.$t('example')} ${this.imp.$t('approach')}: ${this.imp.$t('multiplication')} \\( ${this.imp.inputNums['0']} * ${this.imp.inputNums['1']} \\)</ctr>`;
        break;
      case 'sub':
        if (y2.sign === 0) {
          header += `<ctr>${this.imp.$t('example')} ${this.imp.$t('approach')}: ${this.imp.$t('subtraction')} \\( ${this.imp.inputNums['0']} - ${this.imp.inputNums['1']} \\)</ctr>`;
        } else {
          header += `<ctr>${this.imp.$t('example')} ${this.imp.$t('approach')}: ${this.imp.$t('subtraction')} \\( ${this.imp.inputNums['0']} - ${this.imp.inputNums['1']} \\Rightarrow \\)`;
          const negate = this.imp.inputNums['1'] * -1;
          header += ` ${this.imp.$t('addition')} \\( ${this.imp.inputNums['0']} + ${negate} \\)</ctr>`;
        }
        break;
      case 'div':
        header += `<ctr>${this.imp.$t('example')} ${this.imp.$t('approach')}: ${this.imp.$t('division')} \\( ${this.imp.inputNums['0']} : ${this.imp.inputNums['1']} \\)</ctr>`;
        break;
      default:
    }
    this.header = header;
  }

  getDisclaimer() {
    let disclaimer = '';
    disclaimer += `<div id="foot">${this.imp.$t('disclaimer')}</div>`;
    this.disclaimer = disclaimer;
  }

  getValues(y1, y2) {
    let mantissaString1 = y1.mantissaBits.join('');
    mantissaString1 = `1,${mantissaString1.substring(1)}`;
    let mantissaString2 = y2.mantissaBits.join('');
    mantissaString2 = `1,${mantissaString2.substring(1)}`;
    const expString1 = y1.exponentBits.join('');
    const expString2 = y2.exponentBits.join('');
    // values
    let values = '';
    values += `<div id="header2">${this.imp.$t('values')}</div>`;
    values += '<table id="tab1">';
    // headings
    values += '<tr>';
    values += '<th></th>';
    switch (this.imp.selectedFormat[2]) {
      case 'add':
        values += `<th>${this.imp.$t('firstSummand')}</th>`;
        values += `<th>${this.imp.$t('secondSummand')}</th>`;
        break;

      case 'mul':
        values += `<th>${this.imp.$t('firstFactor')}</th>`;
        values += `<th>${this.imp.$t('secondFactor')}</th>`;
        break;

      case 'sub':
        values += `<th>${this.imp.$t('minuend')}</th>`;
        values += `<th>${this.imp.$t('subtrahend')}</th>`;
        break;

      case 'div':
        values += `<th>${this.imp.$t('numerator')}</th>`;
        values += `<th>${this.imp.$t('denominator')}</th>`;
        break;
      default:
    }
    values += '</tr>';
    // content
    values += '<tr>';
    values += `<td>${this.imp.$t('values')}</td>`;
    values += `<td>${y1.valueString}</td>`;
    values += `<td>${y2.valueString}</td>`;
    values += '</tr>';
    values += '<tr>';
    values += `<td>${this.imp.$t('sign')}</td>`;
    values += `<td>${(y1.sign === 0 ? '+' : '-')}</td>`;
    values += `<td>${(y2.sign === 0 ? '+' : '-')}</td>`;
    values += '</tr>';
    values += '<tr>';
    values += `<td>${this.imp.$t('mantissa')}</td>`;
    values += `<td>${mantissaString1}</td>`;
    values += `<td>${mantissaString2}</td>`;
    values += '</tr>';
    values += '<tr>';
    values += `<td>${this.imp.$t('exponent')}</td>`;
    values += `<td>${expString1}</td>`;
    values += `<td>${expString2}</td>`;
    values += '</tr>';
    values += '</table>';
    this.values = values;
  }

  additionString(solution, y1, y2, attention = false) {
    const expString1 = y1.exponentBits.join('');
    const expString2 = y2.exponentBits.join('');
    const watcher = this.imp.watcher;
    let actStep = 0;
    let latex = '<style scoped>#scoped-content { width:100%; justify-content: center; }</style>';
    latex += '<div id="scoped-content">';
    // style
    latex += this.style;
    // header
    latex += this.header;
    // content
    // values
    latex += this.values;
    // calc
    if (y1.isZero || y2.isZero) {
      latex += `<div id="header2">${this.imp.$t('step')} 1 </div> <br>`;
      latex += '<ul>';
      latex += `<div id="txt">${this.imp.$t('addWithZero')}</div>`;
      latex += '</ul>';
      latex += `<div id="header2">${this.imp.$t('step')} 2 </div>`;
    } else {
      if (attention) {
        actStep += 1;
        latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div> <br>`;
        latex += `<div id="txt">${this.imp.$t('negativeMinuendSubtrahend')} </div>`;
      }
      actStep += 1;
      latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div> <br>`;
      latex += `<div id="txt">${this.imp.$t('adjustExponents')} `;
      if (watcher.steps.CalculateDeltaE.data.deltaE === 0) {
        latex += `\\( (${expString1} = ${expString2} \\Rightarrow i.O.) \\)`;
        latex += '</div>';
      } else {
        const left = watcher.steps.CalculateDeltaE.data.switched ? '<' : '>';
        latex += `\\( (${expString1} \\neq ${expString2}) \\)`;
        latex += '</div>';
        latex += '<ul>';
        latex += `<li><div id="header3">${this.imp.$t('diffExponent')} :</div>`;
        latex += [
          `${this.imp.$t('smallerExponent')} `,
          `\\( ( [ ${watcher.steps.CalculateDeltaE.data.expN1Bits.join('')} ] :=  ${watcher.steps.CalculateDeltaE.data.expN1} ${left}
                [ ${watcher.steps.CalculateDeltaE.data.expN2Bits.join('')} ] :=  ${watcher.steps.CalculateDeltaE.data.expN2}) \\) <br>`,
          `${this.imp.$t('resDiffExponent')}: `,
          '\\(',
          this.imp.watcher.steps.CalculateDeltaE.data.deltaE,
          '\\)</li>',
        ].join('');
        latex += `<li><div id="header3">${this.imp.$t('adjustSmallerMantissa')} :</div>`;
        latex += [
          `${this.imp.$t('shiftMantissa')}: \\( `,
          watcher.steps.CalculateDeltaE.data.preShift.join(''),
          `\\overset{\\text{Shift: ${watcher.steps.CalculateDeltaE.data.deltaE} }}{\\rightarrow}`,
          watcher.steps.AddMantissa.data.mantissa2.join(''),
          '\\)',
          '</li></ul>',
        ].join('');
      }

      actStep += 1;
      latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div>`;
      latex += '<ul>';
      latex += `<li><div id="header3">${this.imp.$t('addition')} ${this.imp.$t('mantissa')} :</div></li>`;
      latex += '<div id="ctr">\\(';
      this.description.getAdditionTable();
      latex += this.description.table;
      latex += '\\)</div>';
      latex += `<li><div id="header3">${this.imp.$t('considerRepresentation')} :</div>`;
      latex += [
        `${this.imp.$t('consider1comma')}<br>`,
        `${this.imp.$t('mantissa1float')} \\( `,
        `${watcher.steps.AddMantissa.data.normalizedMantissa.join('')}`,
        '\\)',
        '</li></ul>',
      ].join('');
      latex += '</div>';

      actStep += 1;
      latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div>`;
    }
    latex += '<ul>';
    latex += `<li><div id="header3">${this.imp.$t('solution')} :</div>`;
    const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
    converter.ieeeToDec([
      watcher.steps.Result.data.result.sign, ' ',
      watcher.steps.Result.data.result.exponentBits.join(''),
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1),
    ].join(''));
    const decSol = converter.result;
    latex += [
      `${this.imp.$t('correctSolution')}: \\(`,
      watcher.steps.Result.data.result.sign, '\\,',
      watcher.steps.Result.data.result.exponentBits.join(''), '\\,',
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1), '\\,',
      `\\Rightarrow ${decSol} \\)`,
      '</li>',
    ].join('');
    latex += `<li><div id="header3">${this.imp.$t('composition')} :</div></li>`;
    latex += '</ul>';
    latex += '<table id="tab1">';
    // headings
    latex += '<tr>';
    latex += '<th></th>';
    latex += `<th>${this.imp.$t('values')}</th>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('sign')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.sign}</td>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('exponent')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.exponentBits.join('')}</td>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('mantissa')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.mantissaBits.join('')}</td>`;
    latex += '</tr>';
    latex += '</table>';
    // disclaimer
    latex += this.disclaimer;

    this.string = latex;
  }

  subtractionString(solution, y1, y2) {
    const expString1 = y1.exponentBits.join('');
    const expString2 = y2.exponentBits.join('');
    const watcher = this.imp.watcher.steps.Addition.data.addition;
    let actStep = 0;
    let latex = '<style scoped>#scoped-content { width:100%; justify-content: center; }</style>';
    latex += '<div id="scoped-content">';
    // style
    latex += this.style;
    // header
    latex += this.header;
    // content
    // values
    latex += this.values;
    // calc
    if (y1.isZero || y2.isZero) {
      actStep += 1;
      latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div> <br>`;
      latex += '<ul>';
      latex += `<div id="txt">${this.imp.$t('subWithZero')}</div>`;
      latex += '</ul>';
      actStep += 1;
      latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div>`;
    } else {
      actStep += 1;
      latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div> <br>`;
      latex += `<div id="txt">${this.imp.$t('adjustExponents')} `;
      if (watcher.steps.CalculateDeltaE.data.deltaE === 0) {
        latex += `\\( (${expString1} = ${expString2} \\Rightarrow i.O.) \\)`;
        latex += '</div>';
      } else {
        const left = watcher.steps.CalculateDeltaE.data.switched ? '<' : '>';
        latex += `\\( (${expString1} \\neq ${expString2}) \\)`;
        latex += '</div>';
        latex += '<ul>';
        latex += `<li><div id="header3">${this.imp.$t('diffExponent')} :</div>`;
        latex += [
          `${this.imp.$t('smallerExponent')} `,
          `\\( ( [ ${watcher.steps.CalculateDeltaE.data.expN1Bits.join('')} ] :=  ${watcher.steps.CalculateDeltaE.data.expN1} ${left}
                [ ${watcher.steps.CalculateDeltaE.data.expN2Bits.join('')} ] :=  ${watcher.steps.CalculateDeltaE.data.expN2}) \\) <br>`,
          `${this.imp.$t('resDiffExponent')}: `,
          '\\(',
          watcher.steps.CalculateDeltaE.data.deltaE,
          '\\)</li>',
        ].join('');
        latex += `<li><div id="header3">${this.imp.$t('adjustSmallerMantissa')} :</div>`;
        latex += [
          `${this.imp.$t('shiftMantissa')}: \\( `,
          watcher.steps.CalculateDeltaE.data.preShift.join(''),
          `\\overset{\\text{Shift: ${watcher.steps.CalculateDeltaE.data.deltaE} }}{\\rightarrow}`,
          watcher.steps.AddMantissa.data.mantissa2.join(''),
          '\\)',
          '</li></ul>',
        ].join('');
      }

      if (!watcher.steps.AddMantissa.data.equalMantissa) { // case: not equal mantissa
        if (watcher.steps.AddMantissa.data.complement1.steps.Complement.data.negate) {
          actStep += 1;
          latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div>`;
          latex += '<ul>';
          latex += `<div id="txt">${this.imp.$t('subtTwosComplement')} `;
          latex += [`<div id="header3">${this.imp.$t('considerRepresentation')} \\(`,
            watcher.steps.AddMantissa.data.mantissa1.join(''),
            '\\)</div>',
          ].join('');
          latex += `<li><div id="header3">${this.imp.$t('switchBits')} :</div></li>`;
          latex += [
            '\\(',
            watcher.steps.AddMantissa.data.mantissa1.join(''),
            '\\rightarrow',
            watcher.steps.AddMantissa.data.complement1.steps.Complement.data.flippedArray.join(''),
            '\\) </li>',
          ].join('');
          latex += `<li><div id="header3">${this.imp.$t('add1')} :</div></li>`;
          latex += [
            '\\(',
            watcher.steps.AddMantissa.data.complement1.steps.Complement.data.flippedArray.join(''),
            '\\rightarrow',
            watcher.steps.AddMantissa.data.complement1.steps.Complement.data.oneAdded.join(''),
            '\\) </li>',
          ].join('');
          latex += `<li><div id="header3">${this.imp.$t('normalize')} :</div></li>`;
          latex += [
            '\\(',
            watcher.steps.AddMantissa.data.complement1.steps.Complement.data.oneAdded.join(''),
            '\\rightarrow',
            watcher.steps.AddMantissa.data.complement1.steps.Complement.data.normalizedArray.join(''),
            '\\) </li>',
          ].join('');
        }
        if (watcher.steps.AddMantissa.data.complement2.steps.Complement.data.negate) {
          actStep += 1;
          latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div>`;
          latex += '<ul>';
          latex += `<div id="txt">${this.imp.$t('subtTwosComplement')} `;
          latex += [`<div id="header3">${this.imp.$t('considerRepresentation')} \\(`,
            watcher.steps.AddMantissa.data.mantissa2.join(''),
            '\\)</div>',
          ].join('');
          latex += `<li><div id="header3">${this.imp.$t('switchBits')} :</div></li>`;
          latex += [
            '\\(',
            watcher.steps.AddMantissa.data.mantissa2.join(''),
            '\\rightarrow',
            watcher.steps.AddMantissa.data.complement2.steps.Complement.data.flippedArray.join(''),
            '\\) </li>',
          ].join('');
          latex += `<li><div id="header3">${this.imp.$t('add1')} :</div></li>`;
          latex += [
            '\\(',
            watcher.steps.AddMantissa.data.complement2.steps.Complement.data.flippedArray.join(''),
            '\\rightarrow',
            watcher.steps.AddMantissa.data.complement2.steps.Complement.data.oneAdded.join(''),
            '\\) </li>',
          ].join('');
          latex += `<li><div id="header3">${this.imp.$t('normalize')} :</div></li>`;
          latex += [
            '\\(',
            watcher.steps.AddMantissa.data.complement2.steps.Complement.data.oneAdded.join(''),
            '\\rightarrow',
            watcher.steps.AddMantissa.data.complement2.steps.Complement.data.normalizedArray.join(''),
            '\\) </li>',
          ].join('');
        }
        latex += '</ul>';

        latex += '</ul>';
        latex += '</div>';

        actStep += 1;
        latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div>`;
        latex += '<ul>';
        latex += `<li><div id="header3">${this.imp.$t('subtraction')} ${this.imp.$t('mantissa')} :</div></li>`;
        latex += '<div id="ctr">\\(';
        this.description.getSubtractionTable();
        latex += this.description.table;
        latex += '\\)</div>';
        latex += `<li><div id="header3">${this.imp.$t('considerRepresentation')} :</div>`;
        latex += [
          `${this.imp.$t('consider1comma')}<br>`,
          `${this.imp.$t('mantissa1float')} \\( `,
          `${watcher.steps.AddMantissa.data.normalizedMantissa.join('')}`,
          '\\)',
          '</li></ul>',
        ].join('');
        latex += '</div>';
      } else { // case: equal mantissa
        actStep += 1;
        latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div>`;
        latex += '<ul>';
        latex += `<li><div id="header3">${this.imp.$t('subtraction')} ${this.imp.$t('mantissa')} :</div></li>`;
        latex += `<li><div id="header3">${this.imp.$t('newMantissa')} :</div>`;
        latex += [
          `${this.imp.$t('zeroMantissa')} \\( `,
          `${watcher.steps.AddMantissa.data.normalizedMantissa.join('')}`,
          '\\)',
          '</li>',
        ].join('');
        latex += `<li><div id="header3">${this.imp.$t('considerRepresentation')} :</div>`;
        latex += [
          `${this.imp.$t('consider1comma')}<br>`,
          `${this.imp.$t('mantissa1float')} \\( `,
          `${watcher.steps.AddMantissa.data.normalizedMantissa.join('')}`,
          '\\)',
          '</li></ul>',
        ].join('');
      }
    }
    actStep += 1;
    if (actStep === 4) {
      latex += '<div id="page-break"></div>';
    }
    latex += `<div id="header2">${this.imp.$t('step')} ${actStep} </div>`;
    latex += '<ul>';
    latex += `<li><div id="header3">${this.imp.$t('solution')} :</div>`;
    const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
    converter.ieeeToDec([
      watcher.steps.Result.data.result.sign, ' ',
      watcher.steps.Result.data.result.exponentBits.join(''),
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1),
    ].join(''));
    const decSol = converter.result;
    latex += [
      `${this.imp.$t('correctSolution')}: \\(`,
      watcher.steps.Result.data.result.sign, '\\,',
      watcher.steps.Result.data.result.exponentBits.join(''), '\\,',
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1), '\\,',
      `\\Rightarrow ${decSol} \\)`,
      '</li>',
    ].join('');
    latex += `<li><div id="header3">${this.imp.$t('composition')} :</div></li>`;
    latex += '</ul>';
    latex += '<table id="tab1">';
    // headings
    latex += '<tr>';
    latex += '<th></th>';
    latex += `<th>${this.imp.$t('values')}</th>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('sign')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.sign}</td>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('exponent')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.exponentBits.join('')}</td>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('mantissa')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.mantissaBits.join('')}</td>`;
    latex += '</tr>';
    latex += '</table>';
    // disclaimer
    latex += this.disclaimer;

    this.string = latex;
  }

  /* eslint-disable */
  multiplicationString(solution, y1, y2) {
    const watcher = this.imp.watcher;
    let latex = '<style scoped>#scoped-content { width:100%; justify-content: center; }</style>';
    latex += '<div id="scoped-content">';
    // style
    latex += this.style;
    // header
    latex += this.header;
    // content
    // values
    latex += this.values;
    // calc
    if (y1.isZero || y2.isZero) {
      latex += `<div id="header2">${this.imp.$t('step')} 1 </div> <br>`;
      latex += '<ul>';
      latex += `<div id="txt">${this.imp.$t('mulWithZero')}</div>`;
      latex += '</ul>';
      latex += `<div id="header2">${this.imp.$t('step')} 2 </div>`;
    } else {
      latex += `<div id="header2">${this.imp.$t('step')} 1 </div> <br>`;
      latex += '<ul>';
      latex += `<div id="txt">${this.imp.$t('adjustExponents')} `;
      const converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
      converter.binToDec(y1.exponentBits.join(''));
      const leftVal = converter.result;
      converter.binToDec(y2.exponentBits.join(''));
      const rightVal = converter.result;
      latex += [
        `${this.imp.$t('addExponents')}. (${this.imp.$t('newExponent')}: `,
        leftVal + rightVal,
        ')',
      ].join('');
      latex += '</ul>';
      latex += `<div id="header2">${this.imp.$t('step')} 2 </div>`;
      latex += '<ul>';
      latex += `<li><div id="header3">${this.imp.$t('multiplication')} ${this.imp.$t('mantissa')} :</div></li>`;
      latex += '<div id="ctr">\\(';
      this.description.getMultiplicationTable();
      latex += this.description.table;
      latex += '\\)</div>';
      latex += `<li><div id="header3">${this.imp.$t('considerRepresentation')} :</div>`;
      latex += [
        `${this.imp.$t('consider1comma')}<br>`,
        `${this.imp.$t('mantissa1float')}: \\( `,
        `${solution.mantissaBits.join('')
          .substring(1)}`,
        '\\)',
        '</li></ul>',
      ].join('');
      latex += '</div>';
      const steps = watcher.steps.Multiplication.data.multiplication.steps.MultiplicationSteps.data.countSteps;
      if (steps > 17) {
        latex += '<div id="page-break"></div>';
      }
      latex += `<div id="header2">${this.imp.$t('step')} 3 </div>`;
    }
    latex += '<ul>';
    latex += `<li><div id="header3">${this.imp.$t('solution')} :</div>`;
    const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
    converter.ieeeToDec([
      watcher.steps.Result.data.result.sign, ' ',
      watcher.steps.Result.data.result.exponentBits.join(''),
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1),
    ].join(''));
    const decSol = converter.result;
      latex += [
      `${this.imp.$t('correctSolution')}: \\(`,
      watcher.steps.Result.data.result.sign, '\\,',
      watcher.steps.Result.data.result.exponentBits.join(''), '\\,',
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1), '\\,',
      `\\Rightarrow ${decSol} \\)`,
      '</li>',
    ].join('');
    latex += `<li><div id="header3">${this.imp.$t('composition')} :</div></li>`;
    latex += '</ul>';
    latex += '<table id="tab1">';
    // headings
    latex += '<tr>';
    latex += '<th></th>';
    latex += `<th>${this.imp.$t('values')}</th>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('sign')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.sign}</td>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('exponent')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.exponentBits.join('')}</td>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('mantissa')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.mantissaBits.join('')}</td>`;
    latex += '</tr>';
    latex += '</table>';
    // disclaimer
    latex += this.disclaimer;

    this.string = latex;
  }
  /* eslint-enable */

  divisionString(solution, y1, y2) {
    const watcher = this.imp.watcher;
    let latex = '<style scoped>#scoped-content { width:100%; justify-content: center; }</style>';
    latex += '<div id="scoped-content">';
    // style
    latex += this.style;
    // header
    latex += this.header;
    // content
    // values
    latex += this.values;
    // calc
    if (y1.isZero) {
      latex += `<div id="header2">${this.imp.$t('step')} 1 </div> <br>`;
      latex += '<ul>';
      latex += `<div id="txt">${this.imp.$t('divWithZero')}</div>`;
      latex += '</ul>';
      latex += `<div id="header2">${this.imp.$t('step')} 2 </div>`;
    } else {
      latex += `<div id="header2">${this.imp.$t('step')} 1 </div> <br>`;
      latex += '<ul>';
      latex += `<div id="txt">${this.imp.$t('adjustExponents')} `;
      const converter = new convertFormat.FormatConversions(
        this.exponentBits,
        this.numBits,
      );
      converter.binToDec(y1.exponentBits.join(''));
      const leftVal = converter.result;
      converter.binToDec(y2.exponentBits.join(''));
      const rightVal = converter.result;
      latex += [
        `${this.imp.$t('subtExponents')}. (${this.imp.$t('newExponent')}: `,
        leftVal - rightVal,
        ')',
      ].join('');
      latex += '</ul>';
      const steps = watcher.steps.Division.data.division.steps.DivisionSteps.data.countSteps;
      if (steps > 14) {
        latex += '<div id="page-break"></div>';
      }
      latex += `<div id="header2">${this.imp.$t('step')} 2 </div>`;
      latex += '<ul>';
      latex += `<li><div id="header3">${this.imp.$t('division')} ${this.imp.$t('mantissa')} :</div></li>`;
      latex += '<div id="ctr">\\(';
      this.description.getDivisionTable();
      latex += this.description.table;
      latex += '\\)</div>';
      latex += `<li><div id="header3">${this.imp.$t('considerRepresentation')} :</div>`;
      latex += [
        `${this.imp.$t('consider1comma')}<br>`,
        `${this.imp.$t('mantissa1float')}: \\( `,
        `${solution.mantissaBits.join('')
          .substring(1)}`,
        '\\)',
        '</li></ul>',
      ].join('');
      latex += '</div>';
      if ((steps <= 14) && (steps > 6)) {
        latex += '<div id="page-break"></div>';
      }
      latex += `<div id="header2">${this.imp.$t('step')} 3 </div>`;
    }
    latex += '<ul>';
    latex += `<li><div id="header3">${this.imp.$t('solution')} :</div>`;
    const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
    converter.ieeeToDec([
      watcher.steps.Result.data.result.sign, ' ',
      watcher.steps.Result.data.result.exponentBits.join(''),
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1),
    ].join(''));
    const decSol = converter.result;
    latex += [
      `${this.imp.$t('correctSolution')}: \\(`,
      watcher.steps.Result.data.result.sign, '\\,',
      watcher.steps.Result.data.result.exponentBits.join(''), '\\,',
      watcher.steps.Result.data.result.mantissaBits.join('').substring(1), '\\,',
      `\\Rightarrow ${decSol} \\)`,
      '</li>',
    ].join('');
    latex += `<li><div id="header3">${this.imp.$t('composition')} :</div></li>`;
    latex += '</ul>';
    latex += '<table id="tab1">';
    // headings
    latex += '<tr>';
    latex += '<th></th>';
    latex += `<th>${this.imp.$t('values')}</th>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('sign')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.sign}</td>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('exponent')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.exponentBits.join('')}</td>`;
    latex += '</tr>';
    latex += '<tr>';
    latex += `<td>${this.imp.$t('mantissa')}</td>`;
    latex += `<td>${watcher.steps.Result.data.result.mantissaBits.join('')}</td>`;
    latex += '</tr>';
    latex += '</table>';
    // disclaimer
    latex += this.disclaimer;

    this.string = latex;
  }

  generatePdf(inputNum1, inputNum2, solutionString, actOperator, actFormat1 = 'decimal', actFormat2 = 'decimal', returnSite = 'FloatingPointTabs') {
    let num1 = inputNum1;
    let num2 = inputNum2;
    if (actFormat1 === 'decimal') {
      const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
      converter.decToBin(num1);
      converter.binToIEEE(converter.result);
      num1 = converter.result;
    } else if (actFormat1 === 'binary') {
      const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
      converter.binToIEEE(num1);
      num1 = converter.result;
    }
    if (actFormat2 === 'decimal') {
      const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
      converter.decToBin(num2);
      converter.binToIEEE(converter.result);
      num2 = converter.result;
    } else if (actFormat2 === 'binary') {
      const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
      converter.binToIEEE(num2);
      num1 = converter.result;
    }
    const solution = getIEEEFromString(this.exponentBits, solutionString);
    const y1 = getIEEEFromString(this.exponentBits, num1);
    const y2 = getIEEEFromString(this.exponentBits, num2);
    this.getStyle();
    this.getHeader(y2);
    this.getDisclaimer();
    this.getValues(y1, y2);
    this.description.makeDescriptionArithmetic(num1, num2, solutionString, actOperator);
    switch (actOperator) {
      case 'add':
        if (y1.sign === 0 && y2.sign === 0) {
          this.additionString(solution, y1, y2);
        } else if (y2.sign === 1) {
          y2.sign = 0;
          y2.arr[0] = 0;
          this.subtractionString(solution, y1, y2);
        } else {
          this.subtractionString(solution, y1, y2);
        }
        break;

      case 'mul':
        this.multiplicationString(solution, y1, y2);
        break;

      case 'sub':
        if (y2.sign === 0) {
          if (y1.sign === 1) {
            this.negativeMinuendSubtrahend = true;
            y1.sign = 0;
            y1.arr[0] = 0;
            y2.sign = 0;
            y2.arr[0] = 0;
            this.additionString(solution, y1, y2, true);
          } else {
            this.subtractionString(solution, y1, y2);
          }
        } else if (y1.sign === 1 && y2.sign === 1) {
          this.subtractionString(solution, y1, y2);
        } else {
          y2.sign = 0;
          y2.arr[0] = 0;
          this.additionString(solution, y1, y2);
        }
        break;

      case 'div':
        this.divisionString(solution, y1, y2);
        break;
      default:
    }
    const html = this.string;
    const returnRoute = router.resolve({ name: returnSite });
    router.replace({ name: 'DescriptionPDF', params: { math: html, returnRoute: returnRoute.href } });
  }
}
