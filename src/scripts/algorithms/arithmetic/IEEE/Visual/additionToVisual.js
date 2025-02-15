import { AdditionBaseNComplementToLatex } from '../../baseNComplement/toLatex/additionToLatex';

export class AdditionIEEEToObject {
  constructor(watcher) {
    this.watcher = watcher;
    this.result = this._generateObject();
  }

  _generateObject() {
    let curStep = this.watcher.start;
    const retObject = {};

    while (curStep != null) {
      if (curStep.name === 'Edgecases') {
        retObject.Edgecases = this._workEdgecases(curStep);
      }

      if (curStep.name === 'CalculateDeltaE') {
        retObject.CalculateDeltaE = this._workCalculateDeltaE(curStep);
      }

      if (curStep.name === 'AdjustMantissa') {
        retObject.AdjustMantissa = this._workAdjustMantissa(curStep);
      }

      if (curStep.name === 'ResultZero') {
        retObject.Result_Zero = this._workResult_Zero(curStep);
      }

      if (curStep.name === 'AddMantissa') {
        retObject.AddMantissa = this._workAddMantissa(curStep);
      }

      if (curStep.name === 'Normalize') {
        retObject.Normalize = this._workNormalize(curStep);
      }

      if (curStep.name === 'Result') {
        retObject.Result = this._workResult(curStep);
      }

      curStep = curStep.next;
    }

    return retObject;
  }

  _workEdgecases(curStep) {
    const possibleCase = curStep.next;

    if (possibleCase == null) {
      return null;
    }

    if (possibleCase.name === 'Edgecase_NaN') {
      return `Edgecase NaN: $R = ${possibleCase.data.result.bitString.replace(/ /g, '\\ ')}$`;
    }

    if (possibleCase.name === 'Edgecase_Inf') {
      return `Edgecase Infinity: $R = ${possibleCase.data.result.bitString.replace(/ /g, '\\ ')}$`;
    }

    return null;
  }

  _workCalculateDeltaE(curStep) {
    const data = curStep.data;
    return `$\\Delta E = ${data.expN2Bits.join('')} - ${data.expN1Bits.join('')} = ${data.deltaE}$`;
  }

  _workAdjustMantissa(curStep) {
    const data = curStep.data;
    return [
      '\\begin{align*}',
      `\t&m_{1}' = ${data.op1.stringRepresentation}`,
      `\t&m_{2}' = ${data.op2.stringRepresentation}`,
      '\\end{align*}',
    ].join('\n');
  }

  _workAddMantissa(curStep) {
    const data = curStep.data;
    return new AdditionBaseNComplementToLatex(data.addition).getResult();
  }

  _workResultZero(curStep) {
    const data = curStep.data;
    return `Mantissa is zero: $R = ${data.result.bitString.replace(/ /g, '\\ ')}$`;
  }

  _workNormalize(curStep) {
    const data = curStep.data;
    return [
      '\\begin{align*}',
      `\t&\\rightarrow m_{R} = 1.${data.normalizedMantissa.join('')}\\cdot 2^{${data.shift}}`,
      `\t&\\rightarrow E_{R} = ${data.n1ExpBits.join('')}${data.shift >= 0 ? '+' : '-'}${Math.abs(data.shift)} = ${data.finalExpBits.join('')}`,
      '\\end{align*}',
    ].join('\n');
  }

  _workResult(curStep) {
    const data = curStep.data;
    return `$R = ${data.result.bitString.replace(/ /g, '\\ ')}$`;
  }

  getResult() {
    return this.result;
  }
}

export class AdditionIEEEToLatex {
  constructor(watcher) {
    this.watcher = watcher;
    this.result = this._generateLatex();
  }

  _generateLatex() {
    const additionInfo = (new AdditionIEEEToObject(this.watcher)).getResult();
    if (additionInfo.Edgecases !== undefined && additionInfo.Edgecases != null) {
      return additionInfo.Edgecases;
    }

    const latex = ['\\begin{enumerate}'];
    if (additionInfo.CalculateDeltaE !== undefined && additionInfo.CalculateDeltaE != null) {
      latex.push('\t\\item  Calculate $\\Delta E$:');
      latex.push(`\t${additionInfo.CalculateDeltaE}`);
    }
    if (additionInfo.AdjustMantissa !== undefined && additionInfo.AdjustMantissa != null) {
      latex.push('\t\\item  Adjust Mantissa:');
      latex.push(`\t${additionInfo.AdjustMantissa}`);
    }
    if (additionInfo.AddMantissa !== undefined && additionInfo.AddMantissa != null) {
      latex.push('\t\\item  Add Adjusted Mantissa:');
      latex.push(`\t${additionInfo.AddMantissa}`);
    }
    if (additionInfo.ResultZero !== undefined && additionInfo.ResultZero != null) {
      latex.push('\t\\item  Mantissa is zero:');
      latex.push(`\t${additionInfo.ResultZero}`);
    }
    if (additionInfo.Normalize !== undefined && additionInfo.Normalize != null) {
      latex.push('\t\\item  Normalize:');
      latex.push(`\t${additionInfo.Normalize}`);
    }
    if (additionInfo.Result !== undefined && additionInfo.Result != null) {
      latex.push('\t\\item  Result:');
      latex.push(`\t${additionInfo.Result}`);
    }

    latex.push('\\end{enumerate}');
    return latex.join('\n');
  }

  getResult() {
    return this.result;
  }
}
