export class MultiplicationBaseNSignedToObject {
  constructor(watcher) {
    this.watcher = watcher;
    this.result = this._generateObject();
  }

  _generateObject() {
    let curStep = this.watcher.start;
    const retObject = {};

    while (curStep != null) {
      if (curStep.name === 'GetSign') {
        retObject[curStep.name] = this._workGetSign(curStep);
      }

      if (curStep.name === 'Multiplication') {
        retObject[curStep.name] = this._workMultiplication(curStep);
      }

      if (curStep.name === 'Final') {
        retObject[curStep.name] = this._workFinal(curStep);
      }
      curStep = curStep.next;
    }

    return retObject;
  }

  _workGetSign(curStep) {
    const data = curStep.data;
    return {
      latex: `$${data.signN1 ? 1 : 0} \\oplus ${data.signN2 ? 1 : 0} = ${data.isNegative ? 1 : 0}$`,
    };
  }

  _workMultiplication(curStep) {
    return {
      latex: this._getLatexMultiplication(curStep),
      html: this._getHTMLMultiplication(curStep),
    };
  }

  _getLatexMultiplication(curStep) {
    let widthNeeded = 0;
    let maxOffset = 0;
    let step = curStep;

    while (step.name !== 'Final') {
      if (step.name === 'Multiplication') {
        maxOffset = Math.max(step.data.num1.offset, step.data.num2.offset);
      } else if (step.name === 'MultFinal') {
        maxOffset = Math.max(maxOffset, step.data.cur.offset);
      } else {
        maxOffset = Math.max(maxOffset, step.data.cur.offset);
        maxOffset = Math.max(maxOffset, step.data.toAdd.offset);
      }
      step = step.next;
    }

    step = curStep;

    while (step.name !== 'Final') {
      if (step.name === 'Multiplication') {
        const num1Val = step.data.num1.arr.length - step.data.num1.offset + maxOffset;
        const num2Val = step.data.num2.arr.length - step.data.num2.offset + maxOffset + 1;
        widthNeeded = Math.max(num1Val, num2Val);
      } else if (step.name === 'MultFinal') {
        const curVal = step.data.cur.arr.length - step.data.cur.offset + maxOffset + 1;
        widthNeeded = Math.max(widthNeeded, curVal);
      } else {
        const curVal = step.data.cur.arr.length - step.data.cur.offset + maxOffset + 1;
        const toAddVal = step.data.toAdd.arr.length - step.data.toAdd.offset + maxOffset + 1;
        widthNeeded = Math.max(widthNeeded, curVal);
        widthNeeded = Math.max(widthNeeded, toAddVal);
      }
      step = step.next;
    }

    let firstline;
    let secondline;
    step = curStep;

    firstline = [...step.data.num1.arr, ...Array(maxOffset - step.data.num1.offset).fill('0')];
    firstline.unshift(...Array(Math.max(0, widthNeeded - firstline.length)).fill(''));
    firstline = firstline.map((e) => e.toString()).join(' & ');

    secondline = [...step.data.num2.arr];
    secondline.push(...Array(maxOffset - step.data.num2.offset).fill('0'));
    secondline.unshift(...Array(Math.max(0, widthNeeded - 1 - secondline.length)).fill(''));
    secondline.unshift('\\times');
    secondline = secondline.map((e) => e.toString()).join(' & ');

    const latex = [
      '\\begin{align*}',
      `\t\\begin{array}{${Array(widthNeeded).fill('c').join('')}}`,
      `\t\t ${firstline} \\\\`,
      `\t\t ${secondline} \\\\ \\hline`,
    ];

    step = step.next;

    while (step.name !== 'MultFinal') {
      firstline = [...step.data.cur.arr];
      firstline.push(...Array(maxOffset - step.data.cur.offset).fill('0'));
      firstline.unshift(...Array(Math.max(0, widthNeeded - 1 - firstline.length)).fill('0'));
      firstline.unshift('');
      firstline = firstline.map((e) => e.toString()).join(' & ');

      secondline = [...step.data.toAdd.arr];
      secondline.push(...Array(maxOffset - step.data.toAdd.offset).fill('0'));
      secondline.unshift(...Array(Math.max(0, widthNeeded - 1 - secondline.length)).fill('0'));
      secondline.unshift('+');
      secondline = secondline.map((e) => e.toString()).join(' & ');

      latex.push(`\t\t ${firstline} \\\\`);
      latex.push(`\t\t ${secondline} \\\\ \\hline`);

      step = step.next;
    }

    firstline = [...step.data.cur.arr];
    firstline.push(...Array(maxOffset - step.data.cur.offset).fill('0'));
    firstline.unshift(...Array(Math.max(0, widthNeeded - 1 - firstline.length)).fill('0'));
    firstline.unshift('');
    firstline = firstline.map((e) => `${e}`).join(' & ');

    latex.push(`\t\t ${firstline} \\\\`);
    latex.push('\t\\end{array}\\\\');
    latex.push('\\end{align*}');

    return latex.join('\n');
  }

  _getHTMLMultiplication(curStep) {
    let widthNeeded = 0;
    let maxOffset = 0;
    let step = curStep;

    while (step.name !== 'Final') {
      if (step.name === 'Multiplication') {
        maxOffset = Math.max(step.data.num1.offset, step.data.num2.offset);
      } else if (step.name === 'MultFinal') {
        maxOffset = Math.max(maxOffset, step.data.cur.offset);
      } else {
        maxOffset = Math.max(maxOffset, step.data.cur.offset);
        maxOffset = Math.max(maxOffset, step.data.toAdd.offset);
      }
      step = step.next;
    }

    step = curStep;

    while (step.name !== 'Final') {
      if (step.name === 'Multiplication') {
        const num1Val = step.data.num1.arr.length - step.data.num1.offset + maxOffset;
        const num2Val = step.data.num2.arr.length - step.data.num2.offset + maxOffset + 1;
        widthNeeded = Math.max(num1Val, num2Val);
      } else if (step.name === 'MultFinal') {
        const curVal = step.data.cur.arr.length - step.data.cur.offset + maxOffset + 1;
        widthNeeded = Math.max(widthNeeded, curVal);
      } else {
        const curVal = step.data.cur.arr.length - step.data.cur.offset + maxOffset + 1;
        const toAddVal = step.data.toAdd.arr.length - step.data.toAdd.offset + maxOffset + 1;
        widthNeeded = Math.max(widthNeeded, curVal);
        widthNeeded = Math.max(widthNeeded, toAddVal);
      }
      step = step.next;
    }

    let firstline;
    let secondline;
    step = curStep;

    firstline = [...step.data.num1.arr, ...Array(maxOffset - step.data.num1.offset).fill('0')];
    firstline.unshift(...Array(Math.max(0, widthNeeded - firstline.length)).fill(''));
    firstline = firstline.map((e) => `<td>${e.toString()}</td>`).join(' ');

    secondline = [...step.data.num2.arr];
    secondline.push(...Array(maxOffset - step.data.num2.offset).fill('0'));
    secondline.unshift(...Array(Math.max(0, widthNeeded - 1 - secondline.length)).fill(''));
    secondline.unshift('x');
    secondline = secondline.map((e) => `<td>${e.toString()}</td>`).join(' ');

    const latex = [
      '<table>',
      `\t<tr> ${firstline}</tr>`,
      `\t<tr> ${secondline}</tr>`,
    ];

    step = step.next;

    while (step.name !== 'MultFinal') {
      firstline = [...step.data.cur.arr];
      firstline.push(...Array(maxOffset - step.data.cur.offset).fill('0'));
      firstline.unshift(...Array(Math.max(0, widthNeeded - 1 - firstline.length)).fill('0'));
      firstline.unshift('');
      firstline = firstline.map((e) => `<td>${e.toString()}</td>`).join(' ');

      secondline = [...step.data.toAdd.arr];
      secondline.push(...Array(maxOffset - step.data.toAdd.offset).fill('0'));
      secondline.unshift(...Array(Math.max(0, widthNeeded - 1 - secondline.length)).fill('0'));
      secondline.unshift('+');
      secondline = secondline.map((e) => `<td>${e.toString()}</td>`).join(' ');

      latex.push(`\t<tr> ${firstline}</tr>`);
      latex.push(`\t<tr> ${secondline}</tr>`);

      step = step.next;
    }

    firstline = [...step.data.cur.arr];
    firstline.push(...Array(maxOffset - step.data.cur.offset).fill('0'));
    firstline.unshift(...Array(Math.max(0, widthNeeded - 1 - firstline.length)).fill('0'));
    firstline.unshift('');
    firstline = firstline.map((e) => `<td>${e.toString()}</td>`).join(' ');

    latex.push(`\t<tr> ${firstline}</tr>`);
    latex.push('</table>');

    return latex.join('\n');
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

export class MultiplicationBaseNSignedToLatex {
  constructor(multInfo) {
    this.result = this._generateLatex(multInfo);
  }

  _generateLatex(multInfo) {
    const latex = [];

    latex.push('\\begin{enumerate}');

    if (multInfo.GetSign !== undefined && multInfo.GetSign != null) {
      latex.push(`\\item Get Final Sign: \\ ${multInfo.GetSign.latex}`);
    }

    if (multInfo.Multiplication !== undefined && multInfo.Multiplication != null) {
      latex.push('\\item Multiply absolute values: \\\\');
      latex.push(multInfo.Multiplication.latex);
    }

    if (multInfo.Final !== undefined && multInfo.Final != null) {
      latex.push(`\\item[] Final Result: \\ ${multInfo.Final.latex}`);
    }

    latex.push('\\end{enumerate}');

    return latex.join('\n');
  }

  getResult() {
    return this.result;
  }
}
