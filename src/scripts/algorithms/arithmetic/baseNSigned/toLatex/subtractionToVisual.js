import {
  AdditionBaseNSignedToObject,
  AdditionBaseNSignedToLatex,
} from './additionToVisual';

export class SubtractionBaseNSignedToObject {
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

      if (curStep.name === 'Subtraction') {
        retObject[curStep.name] = this._workSubtraction(curStep);
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
    const addition = new AdditionBaseNSignedToObject(data.addition);
    const additionObject = addition.getResult();

    return {
      other: additionObject,
    };
  }

  _workGetSign(curStep) {
    const data = curStep.data;

    let latexGetSign;
    if (data.compareValue >= 0) {
      // n1 >= n2
      latexGetSign = `$N_{1} \\geq N_{2} \\implies  S_{F} = S_{1} \\land S_{2} = ${data.signN1 ? 1 : 0} \\land ${data.signN2 ? 1 : 0} = ${data.isNegative ? 1 : 0}$`;
    } else if (data.compareValue < 0) {
      // n1 < n2
      latexGetSign = `$N_{1} < N_{2} \\implies  S_{F} = \\neg (S_{1} \\land S_{2}) = \\neg(${data.signN1 ? 1 : 0} \\land ${data.signN2 ? 1 : 0}) = ${data.isNegative ? 1 : 0}$`;
    }

    return {
      latex: latexGetSign,
    };
  }

  _workSubtraction(curStep) {
    const data = curStep.data;
    return {
      latex: this._getLatexSubtraction(data),
      html: this._getHTMLSubtraction(data),
    };
  }

  _getLatexSubtraction(data) {
    const width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;
    const arrayCs = Array(width).fill('c').join('');

    let firstline = [...data.op1Arr].map((e) => e.toString());
    firstline.unshift(...Array(width - firstline.length).fill(''));
    firstline = firstline.join(' & ');

    let secondline = [...data.op2Arr].map((e) => e.toString());
    secondline.unshift(...Array(width - secondline.length - 1).fill(''));
    secondline.unshift('-');
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

  _getHTMLSubtraction(data) {
    const width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;

    let firstline = [...data.op1Arr].map((e) => e.toString());
    firstline.unshift(...Array(width - firstline.length).fill(''));
    firstline = firstline.map((e) => `<td>${e}</td>`);
    firstline = firstline.join(' ');

    let secondline = [...data.op2Arr].map((e) => e.toString());
    secondline.unshift(...Array(width - secondline.length - 1).fill(''));
    secondline.unshift('-');
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

export class SubtractionBaseNSignedToLatex {
  constructor(subtractInfo) {
    this.result = this._generateLatex(subtractInfo);
  }

  _generateLatex(subtractInfo) {
    const latex = [];

    if (subtractInfo.OperatorSwitch !== undefined && subtractInfo.OperatorSwitch != null) {
      const addition = new AdditionBaseNSignedToLatex(subtractInfo.OperatorSwitch.other);
      const additionLatex = addition.getResult();

      latex.push('Convert subtraction to an Addition by fliping the sign of the second operand:');
      latex.push(additionLatex);
      return latex.join('\n');
    }

    latex.push('\\begin{enumerate}');

    if (subtractInfo.GetSign !== undefined && subtractInfo.GetSign != null) {
      latex.push(`\\item Get Final Sign: \\ ${subtractInfo.GetSign.latex}`);
    }

    if (subtractInfo.Subtraction !== undefined && subtractInfo.Subtraction != null) {
      latex.push('\\item Subtract the smaller absolute value from the bigger absolute value: \\\\');
      latex.push(subtractInfo.Subtraction.latex);
    }

    if (subtractInfo.Final !== undefined && subtractInfo.Final != null) {
      latex.push(`\\item[] Final Result: \\ ${subtractInfo.Final.latex}`);
    }

    latex.push('\\end{enumerate}');

    return latex.join('\n');
  }

  getResult() {
    return this.result;
  }
}
