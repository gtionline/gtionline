import {
  SubtractionBaseNSignedToObject,
  SubtractionBaseNSignedToLatex,
} from './subtractionToVisual';

export class AdditionBaseNSignedToObject {
  constructor(watcher) {
    this.watcher = watcher;
    this.result = this._generateObject();
  }

  _generateObject() {
    let curStep = this.watcher.start;
    const retObject = {};

    while (curStep != null) {
      if (curStep.name === 'OperatorSwitch') {
        retObject[curStep.name] = this._workOperatorSwitch(curStep);
      }

      if (curStep.name === 'GetSign') {
        retObject[curStep.name] = this._workGetSign(curStep);
      }

      if (curStep.name === 'Addition') {
        retObject[curStep.name] = this._workAddition(curStep);
      }

      if (curStep.name === 'Final') {
        retObject[curStep.name] = this._workFinal(curStep);
      }
      curStep = curStep.next;
    }

    return retObject;
  }

  _workOperatorSwitch(curStep) {
    const data = curStep.data;
    const subtraction = new SubtractionBaseNSignedToObject(data.subtraction);
    const subtractionObject = subtraction.getResult();

    return {
      other: subtractionObject,
    };
  }

  _workGetSign(curStep) {
    const data = curStep.data;
    return {
      latex: `$${data.signN1 ? 1 : 0} \\land ${data.signN2 ? 1 : 0} = ${data.isNegative ? 1 : 0}$`,
    };
  }

  _workAddition(curStep) {
    const data = curStep.data;
    return {
      latex: this._getLatexAddition(data),
      html: this._getHTMLAddition(data),
    };
  }

  _getLatexAddition(data) {
    const width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;
    const arrayCs = Array(width).fill('c').join('');

    let firstline = [...data.op1Arr].map((e) => e.toString());
    firstline.unshift(...Array(width - firstline.length).fill(''));
    firstline = firstline.join(' & ');

    let secondline = [...data.op2Arr].map((e) => e.toString());
    secondline.unshift(...Array(width - secondline.length - 1).fill(''));
    secondline.unshift('+');
    secondline = secondline.join(' & ');

    let thirdline = [...data.carryArr].map((e) => (e === 0 ? '' : e.toString()));
    thirdline.unshift(...Array(width - thirdline.length).fill(''));
    thirdline = thirdline.join(' & ');

    let fourthline = [...data.resultArr].map((e) => e.toString());
    fourthline.unshift('=');
    fourthline = fourthline.join(' & ');

    const latex = [
      '\\begin{align*}',
      `\t\\begin{array}{${arrayCs}}`,
      `\t\t ${firstline} \\\\`,
      `\t\t ${secondline} \\\\ `,
      `\t\t ${thirdline} \\\\ \\hline`,
      `\t\t ${fourthline} \\\\`,
      '\t\\end{array}\\\\',
      '\\end{align*}',
    ].join('\n');

    return latex;
  }

  _getHTMLAddition(data) {
    const width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;

    let firstline = [...data.op1Arr].map((e) => e.toString());
    firstline.unshift(...Array(width - firstline.length).fill(''));
    firstline = firstline.map((e) => `<td>${e}</td>`);
    firstline = firstline.join(' ');

    let secondline = [...data.op2Arr].map((e) => e.toString());
    secondline.unshift(...Array(width - secondline.length - 1).fill(''));
    secondline.unshift('+');
    secondline = secondline.map((e) => `<td>${e}</td>`);
    secondline = secondline.join(' ');

    let thirdline = [...data.carryArr].map((e) => (e === 0 ? '' : e.toString()));
    thirdline.unshift(...Array(width - thirdline.length).fill(''));
    thirdline = thirdline.map((e) => `<td>${e}</td>`);
    thirdline = thirdline.join(' ');

    let fourthline = [...data.resultArr].map((e) => e.toString());
    fourthline.unshift('=');
    fourthline = fourthline.map((e) => `<td>${e}</td>`);
    fourthline = fourthline.join(' ');

    const html = [
      '<table>',
      `\t<tr> ${firstline} </tr>`,
      `\t<tr> ${secondline} </tr>`,
      `\t<tr> ${thirdline} </tr>`,
      `\t<tr> ${fourthline} </tr>`,
      '</table>',
    ].join('\n');

    return html;
  }

  _workFinal(curStep) {
    const data = curStep.data;
    return {
      latex: `$${data.result.stringRepresentation}$`,
    };
  }

  getResult() {
    return this.result;
  }
}

export class AdditionBaseNSignedToLatex {
  constructor(additionInfo) {
    this.result = this._generateLatex(additionInfo);
  }

  _generateLatex(additionInfo) {
    const latex = [];

    if (additionInfo.OperatorSwitch !== undefined && additionInfo.OperatorSwitch != null) {
      const subtraction = new SubtractionBaseNSignedToLatex(additionInfo.OperatorSwitch.other);
      const subtractLatex = subtraction.getResult();

      latex.push('\t Convert Addition to Subtraction:');
      latex.push(subtractLatex);
      return latex.join('\n');
    }

    latex.push('\\begin{enumerate}');

    if (additionInfo.GetSign !== undefined && additionInfo.GetSign != null) {
      latex.push(`\\item Get Final Sign: \\ ${additionInfo.GetSign.latex}`);
    }

    if (additionInfo.Addition !== undefined && additionInfo.Addition != null) {
      latex.push('\\item Add absolute values: \\\\');
      latex.push(additionInfo.Addition.latex);
    }

    if (additionInfo.Final !== undefined && additionInfo.Final != null) {
      latex.push(`\\item[] Final Result: \\ ${additionInfo.Final.latex}`);
    }

    latex.push('\\end{enumerate}');

    return latex.join('\n');
  }

  getResult() {
    return this.result;
  }
}
