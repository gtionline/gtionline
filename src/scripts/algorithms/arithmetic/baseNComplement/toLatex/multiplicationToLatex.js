import { MultiplicationBaseNSignedToLatex } from '../../baseNSigned/toLatex/multiplicationToVisual';

export class MultiplicationBaseNComplementToLatex {
  constructor(watcher) {
    this.algorithm = watcher;
    this.result = this._generateLatex();
  }

  _generateLatex() {
    let latexSize; let
      latexMultiplication;

    this.algorithm = this.algorithm.start;

    while (this.algorithm.name !== 'Result') {
      if (this.algorithm.name === 'DetermineSize') {
        latexSize = this._computeDetermineSize();
      } else if (this.algorithm.name === 'Multiply') {
        latexMultiplication = this._computeMultiplication();
      } else {
        console.log('MultiplicationBaseNComplementToLatex._generateLatex(): Unknown step.');
        process.exit(0);
      }
      this.algorithm = this.algorithm.next;
    }

    const latex = [
      '\\begin{enumerate}',
      `\\item Get needed size: \\ ${latexSize} `,
      '\\item Sign extend operands to $S$ and multiply as positive numbers: \\\\',
      `${latexMultiplication}`,
      '\\item[] Take the $S$ last digits.\\\\',
      `Final Result: \\ $${this.algorithm.data.result.stringRepresentation}$`,
      '\\end{enumerate}',
    ].join('\n');

    return latex;
  }

  _computeDetermineSize() {
    const data = this.algorithm.data;
    const latex = `$S = 2 \\cdot \\max(\\text{length}(n1), \\text{length}(n2)) = 2 \\cdot \\max(${data.n1Offset + data.digitNum}, ${data.n2Offset + data.digitNum})$ = ${data.digitsToTake}`;
    return latex;
  }

  _computeMultiplication() {
    const data = this.algorithm.data;

    const latex = (new MultiplicationBaseNSignedToLatex(data.multiplication, true)).getResult();
    return latex;
  }

  getResult() {
    return this.result;
  }
}
