/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import { Algorithm } from './algorithms/algorithm';

interface ImportData {
  $t: (key: string) => string;
}

export class DescriptionPolyadicConversion {
  private imp: ImportData;
  private watcher: Algorithm;
  public tableTenToPowerBeforeComma: string;
  public tableTenToPowerAfterComma: string;
  public tablePowerToTen: string;
  public tableShortcut: string;
  private result: Array<{
    name: string;
    text: string;
    subpanels?: Array<{
      name: string;
      text: string;
    }>;
  }>;

  constructor(imp: ImportData, watcher: Algorithm) {
    this.imp = imp;
    this.watcher = watcher;
    this.tableTenToPowerBeforeComma = '';
    this.tableTenToPowerAfterComma = '';
    this.tablePowerToTen = '';
    this.tableShortcut = '';
    this.result = [];
  }

  // =========================================================================================
  // Polyadic Conversion
  getTableTenToPowerBeforeComma() {
    const tabdef = '{ccccccc}';
    const table = [];
    const steps = this.watcher.steps.TenToPower_ConstructNumber.data.stepsBeforeComma;

    if (steps === 0) {
      this.tableTenToPowerBeforeComma = `\\text{${this.imp.$t('noValuesBeforeComma')}}`;
    } else {
      table.push(`\\begin{array} ${tabdef}`);
      table.push(`${this.imp.$t('numerator')}&:&${this.imp.$t('newBasis')}`);
      table.push(`&=&${this.imp.$t('quotient')}&+&${this.imp.$t('remainder')}\\\\ \\hline `); // header

      let number = this.watcher.steps.TenToPower_ConstructNumber.data.beforeCommaVal;
      const power = this.watcher.steps.TenToPower_Input.data.power;
      let div = this.watcher.steps.TenToPower_ConstructNumber.data.beforeComma0Div;
      let remain = this.watcher.steps.TenToPower_ConstructNumber.data.beforeComma0Remain;
      table.push(`${number}&:&${power}&=&${div}&+&${remain}\\\\`);
      number = div;
      for (let i = 1; i < steps; i += 1) {
        div = this.watcher.steps.TenToPower_ConstructNumber.data[`beforeComma${i}Div`];
        remain = this.watcher.steps.TenToPower_ConstructNumber.data[`beforeComma${i}Remain`];
        table.push(`${number}&:&${power}&=&${div}&+&${remain}\\\\`);
        number = div;
      }

      table.push('\\end{array}');
      this.tableTenToPowerBeforeComma = table.join('');
    }
  }

  getTableTenToPowerAfterComma() {
    const tabdef = '{ccccccc}';
    const table = [];
    const isPeriodic = this.watcher.steps.TenToPower_ConstructNumber.data.isPeriodic;
    const periodicStart = this.watcher.steps.TenToPower_ConstructNumber.data.periodicStart;
    const periodicEnd = this.watcher.steps.TenToPower_ConstructNumber.data.periodicEnd;

    if (this.watcher.steps.TenToPower_ConstructNumber.data.stepsAfterComma === 0) {
      this.tableTenToPowerAfterComma = `\\text{${this.imp.$t('noValuesAfterComma')}}`;
    } else {
      const steps = this.watcher.steps.TenToPower_ConstructNumber.data.stepsAfterComma - 1;

      table.push(`\\begin{array} ${tabdef}`);
      table.push(`${this.imp.$t('factor')}&*&${this.imp.$t('newBasis')}`);
      table.push(`&=&${this.imp.$t('quotient')}&+&${this.imp.$t('remainder')}\\\\ \\hline `); // header

      let number = this.watcher.steps.TenToPower_ConstructNumber.data.afterCommaValBefore;
      const power = this.watcher.steps.TenToPower_Input.data.power;
      for (let i = 0; i <= steps; i += 1) {
        const mul = this.watcher.steps.TenToPower_ConstructNumber.data[`afterComma${i}Mul`];
        const remain = this.watcher.steps.TenToPower_ConstructNumber.data[`afterComma${i}Remain`];
        if (isPeriodic && (i >= periodicStart)) {
          table.push(`${number}&*&${power}&=&${mul}&+&\\overline{${remain}}\\\\`);
        } else {
          table.push(`${number}&*&${power}&=&${mul}&+&${remain}\\\\`);
        }
        number = mul;
      }

      table.push('\\end{array}');
      this.tableTenToPowerAfterComma = table.join('');
    }
  }

  getTablePowerToTen() {
    const power = this.watcher.steps.PowerToTen_Input.data.number.power;
    const stepsBeforeComma = this.watcher.steps.PowerToTen_ConstructNumber.data.stepsBeforeComma;
    const stepsAfterComma = this.watcher.steps.PowerToTen_ConstructNumber.data.stepsAfterComma;
    const resultVal = this.watcher.steps.PowerToTen_Result.data.resultValue;
    const tabdef = '{c|cc}';
    const table = [];

    table.push(`\\begin{array} ${tabdef}`);
    table.push(`${this.imp.$t('calcStep')}&&${this.imp.$t('summands')}\\\\ \\hline `); // header

    for (let i = stepsBeforeComma - 1; i >= 0; i -= 1) {
      const calc = [
        this.watcher.steps.PowerToTen_ConstructNumber.data[`beforeComma${i}In`],
        `* ${power}^${i}`,
      ].join('');
      const res = `${this.watcher.steps.PowerToTen_ConstructNumber.data[`beforeComma${i}Res`]}`;
      if ((i === 0) && (stepsAfterComma === 0)) {
        table.push(`${calc}&+&${res}\\\\`);
      } else {
        table.push(`${calc}&&${res}\\\\`);
      }
    }
    console.log(this.watcher);
    for (let i = 0; i < stepsAfterComma; i += 1) {
      const calc = [
        this.watcher.steps.PowerToTen_ConstructNumber.data[`afterComma${i}In`],
        `* \\frac{1}{${power}^${i + 1}}`,
      ].join('');
      const res = `${this.watcher.steps.PowerToTen_ConstructNumber.data[`afterComma${i}Res`]}`;
      if (i !== stepsAfterComma - 1) {
        table.push(`${calc}&&${res}\\\\`);
      } else {
        table.push(`${calc}&+&${res}\\\\`);
      }
    }
    table.push('\\hline');
    table.push(`&&${resultVal}`);

    table.push('\\end{array}');
    this.tablePowerToTen = table.join('');
  }

  getTableShortcutHexToBin() {
    const stepsBeforeComma = this.watcher.steps.ConstructNumber.data.stepsBeforeComma;
    const stepsAfterComma = this.watcher.steps.ConstructNumber.data.stepsAfterComma;
    const sign = this.watcher.steps.ConstructNumber.data.sign;
    let valueString = this.watcher.steps.Input.data.number.bitString;

    const tabdef = ['{'];
    if (sign === '-') {
      tabdef.push('c');
    }
    for (let i = 0; i < stepsBeforeComma; i += 1) {
      tabdef.push('c|');
    }
    if (stepsAfterComma > 0) {
      tabdef.push('c|');
      for (let i = 1; i < stepsAfterComma; i += 1) {
        tabdef.push('c|');
      }
    }
    tabdef[tabdef.length - 1] = tabdef[tabdef.length - 1].substring(0, tabdef[tabdef.length - 1].length - 1);
    tabdef.push('}');

    const table = [];
    table.push(`\\begin{array} ${tabdef.join('')}`);

    // first row, calculation
    const row1 = [];
    if (sign === '-') {
      row1.push('- \\Big(&');
      valueString = valueString.substring(1);
    }
    for (let i = 0; i < stepsBeforeComma; i += 1) {
      row1.push(`${valueString[i]}&`);
    }
    if (stepsAfterComma > 0) {
      row1.push('.&');
      for (let i = stepsBeforeComma + 1; i <= stepsAfterComma + stepsBeforeComma; i += 1) {
        row1.push(`${valueString[i]}&`);
      }
    }
    row1[row1.length - 1] = row1[row1.length - 1].substring(0, row1[row1.length - 1].length - 1);
    if (sign === '-') {
      row1.push('\\Big)');
    }
    row1.push('\\\\ \\hline ');
    table.push(row1.join(''));

    // second row, result
    const row2 = [];
    if (sign === '-') {
      row2.push('- \\Big(&');
    }
    for (let i = 0; i < stepsBeforeComma; i += 1) {
      row2.push([
        this.watcher.steps.ConstructNumber.data[`beforeComma${i}`],
        '&',
      ].join(''));
    }
    if (stepsAfterComma > 0) {
      row2.push('.&');
      for (let i = 0; i < stepsAfterComma; i += 1) {
        row2.push([
          this.watcher.steps.ConstructNumber.data[`afterComma${i}`],
          '&',
        ].join(''));
      }
    }
    row2[row2.length - 1] = row2[row2.length - 1].substring(0, row2[row2.length - 1].length - 1);
    if (sign === '-') {
      row2.push('\\Big)');
    }
    table.push(row2.join(''));

    table.push('\\end{array}');
    this.tableShortcut = table.join('');
  }

  getTableShortcutBinToHex() {
    const stepsBeforeComma = this.watcher.steps.ConstructNumber.data.stepsBeforeComma;
    const stepsAfterComma = this.watcher.steps.ConstructNumber.data.stepsAfterComma;
    const sign = this.watcher.steps.ConstructNumber.data.sign;

    const tabdef = ['{'];
    if (sign === '-') {
      tabdef.push('c');
    }
    for (let i = 0; i < stepsBeforeComma; i += 1) {
      tabdef.push('c|');
    }
    if (stepsAfterComma > 0) {
      tabdef.push('c|');
      for (let i = 0; i < stepsAfterComma; i += 1) {
        tabdef.push('c|');
      }
    }
    tabdef[tabdef.length - 1] = tabdef[tabdef.length - 1].substring(0, tabdef[tabdef.length - 1].length - 1);
    tabdef.push('}');

    const table = [];
    table.push(`\\begin{array} ${tabdef.join('')}`);

    // first row, calculation
    const row1 = [];
    if (sign === '-') {
      row1.push('- \\Big(&');
    }
    for (let i = 0; i < stepsBeforeComma; i += 1) {
      row1.push([
        this.watcher.steps.ConstructNumber.data[`beforeComma${i}Bin`],
        '&',
      ].join(''));
    }
    if (stepsAfterComma > 0) {
      row1.push('.&');
      for (let i = 0; i < stepsAfterComma; i += 1) {
        row1.push([
          this.watcher.steps.ConstructNumber.data[`afterComma${i}Bin`],
          '&',
        ].join(''));
      }
    }
    row1[row1.length - 1] = row1[row1.length - 1].substring(0, row1[row1.length - 1].length - 1);
    if (sign === '-') {
      row1.push('\\Big)');
    }
    row1.push('\\\\ \\hline ');
    table.push(row1.join(''));

    // second row, result
    const row2 = [];
    if (sign === '-') {
      row2.push('- \\Big(&');
    }
    for (let i = 0; i < stepsBeforeComma; i += 1) {
      row2.push([
        this.watcher.steps.ConstructNumber.data[`beforeComma${i}Hex`],
        '&',
      ].join(''));
    }
    if (stepsAfterComma > 0) {
      row2.push('.&');
      for (let i = 0; i < stepsAfterComma; i += 1) {
        row2.push([
          this.watcher.steps.ConstructNumber.data[`afterComma${i}Hex`],
          '&',
        ].join(''));
      }
    }
    row2[row2.length - 1] = row2[row2.length - 1].substring(0, row2[row2.length - 1].length - 1);
    if (sign === '-') {
      row2.push('\\Big)');
    }
    table.push(row2.join(''));

    table.push('\\end{array}');
    this.tableShortcut = table.join('');
  }

  // eslint-disable-next-line no-unused-vars
  makeDescription(modus: string, format: string[]): void {
    let solution;
  
    if (modus === 'PowerToTen') {
        solution = this.watcher.steps.PowerToTen_Result.data.resultNumber;
    } else if (modus === 'TenToPower' || modus === 'PowerToPower') {
        solution = this.watcher.steps.TenToPower_Result.data.resultNumber;
    } else {
      solution = this.watcher.steps.Result.data.resultNumber;
    }

    if (modus === 'ShortcutHexToBin') {
      this.getTableShortcutHexToBin();
      this.result.push({
        name: `${this.imp.$t('conversion')}`,
        text: `${this.imp.$t('shortcutHexToBin')}`,
        subpanels: [
          {
            name: `${this.imp.$t('doConversion')}`,
            text: `\\(${this.tableShortcut}\\)`,
          },
        ],
      });
    } else if (modus === 'ShortcutBinToHex') {
      this.getTableShortcutBinToHex();
      this.result.push({
        name: `${this.imp.$t('conversion')}`,
        text: `${this.imp.$t('shortcutBinToHex')}`,
        subpanels: [
          {
            name: `${this.imp.$t('doConversion')}`,
            text: `\\(${this.tableShortcut}\\)`,
          },
        ],
      });
    } else if (modus === 'PowerToTen') {
      this.getTablePowerToTen();
      this.result.push({
        name: `${this.imp.$t('conversion')}`,
        text: `${this.imp.$t('PowerToTen')}`,
        subpanels: [
          {
            name: `${this.imp.$t('summation')}`,
            text: `\\(${this.tablePowerToTen}\\)`,
          },
        ],
      });
    } else if (modus === 'TenToPower') {
      this.getTableTenToPowerBeforeComma();
      this.getTableTenToPowerAfterComma();
      console.log(this.tableTenToPowerBeforeComma);
      this.result.push({
        name: `${this.imp.$t('conversion')}`,
        text: `${this.imp.$t('TenToPower')}`,
        subpanels: [
          {
            name: `1) ${this.imp.$t('divisionAlgorithm')}`,
            text: `\\(${this.tableTenToPowerBeforeComma}\\)</br></br> ${this.imp.$t('polyadicDivisionDescription')}`,
          },
          {
            name: `2) ${this.imp.$t('multiplicationAlgorithm')}`,
            text: `\\(${this.tableTenToPowerAfterComma}\\)</br></br> ${this.imp.$t('polyadicMultiplicationDescription')}`,
          },
        ],
      });
    } else if (modus === 'PowerToPower') {
      this.getTablePowerToTen();
      this.getTableTenToPowerBeforeComma();
      this.getTableTenToPowerAfterComma();
      console.log(this.tableTenToPowerBeforeComma);
      this.result.push({
        name: `${this.imp.$t('conversion')}`,
        text: `${this.imp.$t('PowerToPower')}`,
        subpanels: [
          {
            name: `1) ${this.imp.$t('summation')}`,
            text: `\\(${this.tablePowerToTen}\\)`,
          },
          {
            name: `2) ${this.imp.$t('divisionAlgorithm')}`,
            text: `\\(${this.tableTenToPowerBeforeComma}\\)</br></br> ${this.imp.$t('polyadicDivisionDescription')}`,
          },
          {
            name: `3) ${this.imp.$t('multiplicationAlgorithm')}`,
            text: `\\(${this.tableTenToPowerAfterComma}\\)</br></br> ${this.imp.$t('polyadicMultiplicationDescription')}`,
          },
        ],
      });
    } else {
      console.log('FAILURE: Not implemented Modus!');
    }
    let solutionString = solution.bitString;
    if ((modus === 'PowerToPower') || (modus === 'TenToPower')) {
      const isPeriodic = this.watcher.steps.TenToPower_ConstructNumber.data.isPeriodic;
      if (isPeriodic) {
        const periodicStart = this.watcher.steps.TenToPower_ConstructNumber.data.periodicStart;
        const periodicEnd = this.watcher.steps.TenToPower_ConstructNumber.data.periodicEnd;
        const splitted = solutionString.split('.');
        let newSolution = `${splitted[0]}.`;
        for (let i = 0; i < periodicStart; i += 1) {
          newSolution += splitted[1][i];
        }
        newSolution += '\\overline{';
        for (let i = periodicStart; i < periodicEnd; i += 1) {
          newSolution += splitted[1][i];
        }
        newSolution += '}';
        solutionString = newSolution;
      }
    }
    console.log('Solution string', solutionString);
    this.result.push({
      name: this.imp.$t('solution'),
      text: [
        `${this.imp.$t('solution')}: `,
        `\\(${solutionString}\\) `,
        `\\(\\hspace{2cm} \\)${this.imp.$t('value')} (${(this.imp.$t('decimal'))}): \\(${solution.value}\\)`,
      ].join(''),
    });
  }
}
