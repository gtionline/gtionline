import { IBooleanTerm } from './booleanFunction';

/**
 * Class representing a single Literal (e.g. \
 * a, \
 * x0, ...) \
 * that is identified by a global id. \
 * 1.: That global ID is/should be shared by every Literal
 * pointing at the 'same real world' Literal. (e.g. every
 * 'a' and 'not a' have the ID 0 and every x2 has the ID 3) \
 * 2.: The global IDs start counting at 0 with the Literal
 * being on-top/to-the-bottom of the KVDiagram i.e. the one
 * that comes into existance upon mirroring the KVDiagram
 * (of size 1x1) to the right (-> width=2, height=1).
 */
export class BooleanFunctionLiteral implements IBooleanTerm {
  private _id: number;

  private _negated: boolean;

  /**
   * Creates an Instance of some Literal.
   * @param {number} id ID that identifies this literal
   * @param {boolean} negated boolean specifiying if this
   * literal is negated (-> not a) or not (-> a).
   */
  constructor(id: number, negated: boolean) {
    this._id = id;
    this._negated = negated;
  }

  getId(): number {
    return this._id;
  }

  isNegated(): boolean {
    return this._negated;
  }

  setNegated(negated: boolean): void {
    this._negated = negated;
  }

  /**
   * Recursively computes and returns string representation of this BooleanFunction
   * @param literalNames Array of names put in place of literals
   * @param op_orStr String used in place of logic OR operator. Defaults to '+'
   * @param op_andStr String used in place of logic AND operator. Defaults to nothing
   * @param negationHeader String inserted before negated literal
   * @param negationFooter String inserted right after negated literal
   * @param bracketOpen String used for open brackets. Defaults to normal open brackets
   * @param bracketClosed String used for closed brackets. Defaults to normal closed brackets
   */
  computeString(
    literalNames: string[],
    op_orStr: string = '+',
    op_andStr: string = '',
    negationHeader?: string,
    negationFooter?: string,
    bracketOpen: string = '(',
    bracketClosed: string = ')',
    reverseOrder: boolean = true,
  ): string {
    if (!this.isNegated()) {
      return literalNames[this.getId()];
    }
    return `${negationHeader}${literalNames[this.getId()]}${negationFooter}`;
  }

  /**
   * @returns Returns a deep cloned copy of this Literal Instance.
   */
  clone(): BooleanFunctionLiteral {
    return new BooleanFunctionLiteral(this._id, this._negated);
  }

  /**
   * @param other The literal to compare with
   * @returns true if given literal is equivalent in meaning and
   * negation to this literal. false if not.
   */
  equals(other: IBooleanTerm): boolean {
    if (!(other instanceof BooleanFunctionLiteral)) {
      return false;
    }
    return this.getId() === other.getId() && this.isNegated() === other.isNegated();
  }

  amountLiterals(): number {
    return 1;
  }

  computeOutput(inputs: (boolean | number | string)[]): boolean {
    if (this._id >= inputs.length) {
      return false;
    }
    if (!this._negated) {
      return Number(inputs[this._id]) === 1;
    }
    return !Number(inputs[this._id]); // The Number() call allows for strings in inputs array
  }

  getIDs(ids: number[]): void {
    if (!ids.includes(this._id)) {
      ids.push(this._id);
    }
  }

  toString(): string {
    return `@${this._id}`;
  }
}
