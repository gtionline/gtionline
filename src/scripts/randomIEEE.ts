export class RandomIEEE {
  private exponentBits: number;
  private numBits: number;
  private actBit: string;
  private bitString: string;
  private result: string;

  constructor(exponentBits: number, numBits: number) {
    this.exponentBits = exponentBits;
    this.numBits = numBits;
    this.actBit = '';
    this.bitString = '';
    this.result = '';
  }

  generateRandomBit(): void {
    this.actBit = Math.round(Math.random()).toString();
  }

  generateRandomBits(n: number): void {
    let bitString = '';
    for (let i = 0; i < n; i += 1) {
      this.generateRandomBit();
      bitString += this.actBit;
    }
    this.bitString = bitString;
  }

  generateRandomIEEE(): void {
    this.generateRandomBit();
    const actBit = this.actBit;
    this.generateRandomBits(this.exponentBits);
    const exponentBits = this.bitString;
    this.generateRandomBits(this.numBits - 1 - this.exponentBits);
    const mantissaBits = this.bitString;
    this.result = `${actBit} ${exponentBits} ${mantissaBits}`;
  }

  getResult(): string {
    return this.result;
  }
}
