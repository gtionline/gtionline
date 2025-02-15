export class SubtractionBaseNComplementToLatex {
  constructor(watcher) {
    this.watcher = watcher;
    this.result = this._generateLatex();
  }

  _generateLatex() {
    if (this.watcher.start.name !== 'Subtraction') {
      console.log("SubtractionToLatex._generateLatex(): Watcher does not have a step titled 'Subtraction.'");
      process.exit(1);
    }

    const data = this.watcher.start.data;

    const width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;
    const arrayCs = Array(width).fill('c').join('');

    let firstline = [...data.op1Arr].map((e) => e.toString());
    firstline.unshift(...Array(width - firstline.length).fill(''));
    firstline = firstline.join(' & ');

    const carryArr = [...data.carryArr];
    const op2Arr = [...data.op2Arr];

    if (carryArr.length > width - 1) {
      carryArr.splice(0, 1);
    }
    if (carryArr.length > op2Arr.length) {
      op2Arr.unshift(...Array(carryArr.length - op2Arr.length).fill(''));
    }
    let secondline = [];
    for (let i = 0; i < op2Arr.length; i += 1) {
      if (carryArr[i] !== 0) {
        secondline.push([op2Arr[i], carryArr[i]]);
      } else {
        secondline.push([op2Arr[i], '']);
      }
    }

    secondline = secondline.map((e) => `\\underset{${e[1].toString()}}{${e[0].toString()}}`);
    secondline.unshift('+');

    secondline = secondline.join(' & ');

    let thirdline = [...data.resultArr].map((e) => e.toString());
    thirdline.unshift('=');
    thirdline = thirdline.join(' & ');

    const latex = [
      '\\begin{align*}',
      `\t&\\begin{array}{${arrayCs}}`,
      `\t\t ${firstline} \\\\`,
      `\t\t ${secondline} \\\\ \\hline`,
      `\t\t ${thirdline} \\\\`,
      '\t\\end{array}\\\\',
      '\t&\\implies\\begin{aligned}',
      `\t\t&\\text{Ergebnis:}\\ ${data.result.stringRepresentation} \\\\`,
      `\t\t&\\text{Es ist ${data.overflow ? '' : 'k'}ein Overflow aufgetreten.}`,
      '\t\\end{aligned}\\\\',
      '\\end{align*}',
    ].join('\n');

    return latex;
  }

  getResult() {
    return this.result;
  }
}
