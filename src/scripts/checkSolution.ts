/* eslint no-useless-escape: 0  no-case-declarations: 0 */

interface IResult {
  sign: number;
  bitString: string;
}

type InputStatus = 'correctInput' | 'incorrectInput';

export class CheckSolution {
  private readonly exponentBits: number;
  private backVB: InputStatus;
  private backE: InputStatus;
  private backM: InputStatus;

  constructor(exponentBits: number) {
    this.exponentBits = exponentBits;
    this.backVB = 'incorrectInput';
    this.backE = 'incorrectInput';
    this.backM = 'incorrectInput';
  }

  public checkSolution(
    result: IResult,
    propVB: string,
    propE: string,
    propM: string
  ): void {
    const cleanPropVB = this.cleanInput(propVB);
    const cleanPropE = this.cleanInput(propE);
    const cleanPropM = this.cleanInput(propM);
    
    const resultString = this.cleanInput(result.bitString);
    const resultE = resultString.substring(1, 1 + this.exponentBits);
    const resultM = resultString.substring(1 + this.exponentBits);

    this.backVB = cleanPropVB === `${result.sign}` ? 'correctInput' : 'incorrectInput';
    this.backE = cleanPropE === resultE ? 'correctInput' : 'incorrectInput';
    this.backM = cleanPropM === resultM ? 'correctInput' : 'incorrectInput';
  }

  private cleanInput(input: string): string {
    return input.replace(/\s/g, '');
  }

  // Getters for the status values
  public getVBStatus(): InputStatus {
    return this.backVB;
  }

  public getEStatus(): InputStatus {
    return this.backE;
  }

  public getMStatus(): InputStatus {
    return this.backM;
  }
}
