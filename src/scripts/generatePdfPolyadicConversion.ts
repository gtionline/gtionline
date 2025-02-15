/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import * as description from './DescriptionPolyadicConversion';
import router from '../router/index';
import { Algorithm } from './algorithms/algorithm';

interface ImportData {
  modus: string;
  selectedFormat: string[];
  inputNum: string;
  $t: (key: string) => string;
  watcher: Algorithm;
}

export class PdfDescription {
  private imp: ImportData;
  private watcher: Algorithm;
  private modus: string;
  private description: description.DescriptionPolyadicConversion;
  private style: string;
  private header: string;
  private disclaimer: string;
  private values: string;
  private string: string;

  constructor(imp: ImportData, watcher: Algorithm) {
    this.imp = imp;
    this.watcher = watcher;
    this.modus = this.imp.modus;
    this.style = '';
    this.header = '';
    this.disclaimer = '';
    this.values = '';
    this.string = '';
    this.description = new description.DescriptionPolyadicConversion(this.imp, this.watcher);
    this.description.makeDescription(this.modus, this.imp.selectedFormat);
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

  getHeader() {
    let header = '';
    header += `<div id="header1">${this.imp.$t('gti')}</div>`;
    header += `<ctr>${this.imp.$t('example')} ${this.imp.$t('approach')}: ${this.imp.$t('conversion')} \\( ${this.imp.inputNum} \\) ${this.imp.$t(`${this.imp.selectedFormat[0]}`)} \\(\\rightarrow\\) ${this.imp.$t(`${this.imp.selectedFormat[1]}`)}</ctr>`;
    this.header = header;
  }

  getDisclaimer() {
    let disclaimer = '';
    disclaimer += `<div id="foot">${this.imp.$t('disclaimer')}</div>`;
    this.disclaimer = disclaimer;
  }

  getValues() {
    // values
    let values = '';
    values += `<div id="header2">${this.imp.$t('values')}</div>`;
    values += '<table id="tab1">';
    // headings
    values += '<tr>';
    values += '<th></th>';
    values += `<th>${this.imp.$t('values')}</th>`;
    values += '</tr>';
    // content
    values += '<tr>';
    values += `<td>${this.imp.$t('number')}</td>`;
    values += `<td>${this.imp.inputNum}</td>`;
    values += '</tr>';
    values += '<tr>';
    values += `<td>${this.imp.$t('firstFormat')}</td>`;
    values += `<td>${this.imp.$t(this.imp.selectedFormat[0])}</td>`;
    values += '</tr>';
    values += '<tr>';
    values += `<td>${this.imp.$t('secondFormat')}</td>`;
    values += `<td>${this.imp.$t(this.imp.selectedFormat[1])}</td>`;
    values += '</tr>';
    values += '</table>';
    this.values = values;
  }

  generatePdf(returnSite = 'PolyadicNumbers') {
    let solution;
    if (Array.isArray(this.imp.watcher)) {
      if (this.modus === 'PowerToTen') {
        solution = this.imp.watcher[0].steps.Result.data.resultNumber;
      } else {
        solution = this.imp.watcher[1].steps.Result.data.resultNumber;
      }
    } else {
      solution = this.imp.watcher.steps.Result.data.resultNumber;
    }
    this.getStyle();
    this.getHeader();
    this.getDisclaimer();
    this.getValues();
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
    latex += `<div id="header2">${this.imp.$t('conversion')}</div>`;
    latex += '<ul>';

    if (this.modus === 'ShortcutHexToBin') {
      this.description.getTableShortcutHexToBin();
      latex += `<div style="margin-bottom:1cm;">${this.imp.$t('shortcutHexToBin')}</div>`;
      latex += '<div id="ctr">\\(';
      latex += this.description.tableShortcut;
      latex += '\\)</div>';
    } else if (this.modus === 'ShortcutBinToHex') {
      this.description.getTableShortcutBinToHex();
      latex += `<div style="margin-bottom:1cm;">${this.imp.$t('shortcutBinToHex')}</div>`;
      latex += '<div id="ctr">\\(';
      latex += this.description.tableShortcut;
      latex += '\\)</div>';
    } else if (this.modus === 'PowerToTen') {
      this.description.getTablePowerToTen();
      latex += `<div style="margin-bottom:1cm;">${this.imp.$t('PowerToTen')}</div>`;
      latex += '<div id="ctr">\\(';
      latex += this.description.tablePowerToTen;
      latex += '\\)</div>';
    } else if (this.modus === 'TenToPower') {
      this.description.getTableTenToPowerBeforeComma();
      this.description.getTableTenToPowerAfterComma();
      latex += `<div style="margin-bottom:1cm;">${this.imp.$t('TenToPower')}</div>`;
      latex += `<li><div id="header3">${this.imp.$t('divisionAlgorithm')} :</div>`;
      latex += '<div id="ctr">\\(';
      latex += this.description.tableTenToPowerBeforeComma;
      latex += '\\)</div>';
      latex += '</li>';
      latex += `<li><div id="header3">${this.imp.$t('multiplicationAlgorithm')} :</div>`;
      latex += '<div id="ctr">\\(';
      latex += this.description.tableTenToPowerAfterComma;
      latex += '\\)</div>';
      latex += '</li>';
    } else if (this.modus === 'PowerToPower') {
      this.description.getTablePowerToTen();
      this.description.getTableTenToPowerBeforeComma();
      this.description.getTableTenToPowerAfterComma();
      latex += `<div style="margin-bottom:1cm;">${this.imp.$t('PowerToPower')}</div>`;
      latex += `<li><div id="header3">${this.imp.$t('summation')} :</div>`;
      latex += '<div id="ctr">\\(';
      latex += this.description.tablePowerToTen;
      latex += '\\)</div>';
      latex += '</li>';
      latex += `<li><div id="header3">${this.imp.$t('divisionAlgorithm')} :</div>`;
      latex += '<div id="ctr">\\(';
      latex += this.description.tableTenToPowerBeforeComma;
      latex += '\\)</div>';
      latex += '</li>';
      latex += `<li><div id="header3">${this.imp.$t('multiplicationAlgorithm')} :</div>`;
      latex += '<div id="ctr">\\(';
      latex += this.description.tableTenToPowerAfterComma;
      latex += '\\)</div>';
      latex += '</li>';
    } else {
      console.log('FAILURE: Not implemented Modus!');
    }
    latex += '</ul>';
    latex += '</div>';

    // Solution
    let solutionString = solution.bitString;
    if ((this.modus === 'PowerToPower') || (this.modus === 'TenToPower')) {
      const isPeriodic = this.imp.watcher.steps.ConstructNumber.data.isPeriodic;
      if (isPeriodic) {
        const periodicStart = this.imp.watcher.steps.ConstructNumber.data.periodicStart;
        const periodicEnd = this.imp.watcher.steps.ConstructNumber.data.periodicEnd;
        const splitted = solutionString.split('.');
        let newSolution = `${splitted[0]}.`;
        for (let i = 0; i < periodicStart; i += 1) {
          newSolution += splitted[1][i];
        }
        newSolution += '\\overline{';
        for (let i = periodicStart; i <= periodicEnd; i += 1) {
          newSolution += splitted[1][i];
        }
        newSolution += '}';
        solutionString = newSolution;
      }
    }
    latex += `<div id="header2">${this.imp.$t('solution')}</div>`;
    latex += `${this.imp.$t('correctSolution')}: \\(${solutionString}\\) &ensp;`;
    latex += `${this.imp.$t('value')}: \\(${solution.value}\\)`;

    // disclaimer
    latex += this.disclaimer;

    // call print view
    this.string = latex;
    const html = this.string;
    // const returnRoute = router.resolve({ name: returnSite });
    // router.replace({ name: 'DescriptionPDF', params: { math: html, returnRoute: returnRoute.href } });
  }
}
