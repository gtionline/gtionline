import { BooleanFunctionLiteral } from './booleanFunctionLiteral';

export type BooleanFunctionOperator = '*' | '+' | '~';
export const BooleanFunctionOperator_AND = '*' as const;
export const BooleanFunctionOperator_OR = '+' as const;
export const BooleanFunctionOperator_NOT = '~' as const;

// First, create a common interface
export interface IBooleanTerm {
  equals(other: IBooleanTerm, ...args: any[]): boolean;
  computeString(
    literalNames: string[],
    op_orStr?: string,
    op_andStr?: string,
    negationHeader?: string,
    negationFooter?: string,
    bracketOpen?: string,
    bracketClosed?: string,
    reverseOrder?: boolean
  ): string;
  clone(): IBooleanTerm;
  amountLiterals(): number;
  computeOutput(inputs: boolean[]): boolean;
  getIDs(ids: number[]): void;
  toString(): string;
  findHighestID?(): number;
  getId?(): number;
}

/**
 * Class representing a boolean function (Schaltfunktion).
 * e.g. (terms[0]) -logicOperator- (terms[1]) -logicOperator- (terms[2]) -lo...
 */
export class BooleanFunction implements IBooleanTerm {
  private _terms: IBooleanTerm[];

  private _logicOperator: BooleanFunctionOperator;

  /**
   * @param logicOperator logic operator concatenating the individual terms
   * @param terms Array of terms
   */
  constructor(
    logicOperator: BooleanFunctionOperator,
    terms: IBooleanTerm[] = [],
  ) {
    this._terms = terms;
    this._logicOperator = logicOperator;
  }

  /**
   * Adds given term to the end of this functions internal list of terms.
   */
  addTerm(term: IBooleanTerm): void {
    this._terms.push(term);
  }

  /**
   * Overwrites the term at {index} with {term}
   */
  setTerm(index: number, term: IBooleanTerm): void {
    this._terms[index] = term;
  }

  setLogicOperator(op: BooleanFunctionOperator): void {
    this._logicOperator = op;
  }

  setTerms(terms: IBooleanTerm[]): void {
    this._terms = terms;
  }

  /**
   * Moves all elements of the array starting at index {index} one to the right and inserts {term} at index {index}
   */
  injectTermBeforeIndex(index: number, term: IBooleanTerm): void {
    this._terms.splice(index, 0, term);
  }

  getTerms(): IBooleanTerm[] {
    return this._terms;
  }

  spliceTerms(start: number, deleteCount: number): void {
    this._terms.splice(start, deleteCount);
  }

  /**
   * Returns the logical operator which concatenates the individual terms of this BooleanFunction.
   */
  getLogicOperator(): BooleanFunctionOperator {
    return this._logicOperator;
  }

  /**
   * Checks if given BooleanFunction is equivalent to this BooleanFunction.
   * Also checks all subsequent terms recursively.
   */
  equals(
    other: IBooleanTerm,
    checkOrder = false,
    checkOrderOfSubSubTerms = false,
  ): boolean {
    if (!(other instanceof BooleanFunction)) {
      return false;
    }

    if (
      this.getLogicOperator() !== other.getLogicOperator()
      || this.getTerms().length !== other.getTerms().length
    ) {
      return false;
    }

    // check if subterms are equivalent
    if (checkOrder) {
      for (let t = 0; t < this.getTerms().length; t += 1) {
        if (!this.getTerms()[t].equals(other.getTerms()[t], checkOrderOfSubSubTerms, checkOrderOfSubSubTerms)) {
          return false;
        }
      }
    } else {
      for (let t = 0; t < this.getTerms().length; t += 1) {
        const query = this.getTerms()[t];
        // check if an equivalent term can be found in -other-
        if (other.getTerms().filter(
          (otherTerm) => otherTerm.equals(query, checkOrderOfSubSubTerms, checkOrderOfSubSubTerms),
        ).length === 0) {
          return false;
        }
      }
      for (let t = 0; t < other.getTerms().length; t += 1) {
        const query = other.getTerms()[t];
        // check if an equivalent term can be found in -this-
        if (this.getTerms().filter(
          (thisTerm) => thisTerm.equals(query, checkOrderOfSubSubTerms, checkOrderOfSubSubTerms),
        ).length === 0) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Recursively computes and returns string representation of this BooleanFunction
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
    let str = '';

    if (this._logicOperator === BooleanFunctionOperator_NOT) {
      return `\\overline{${this._terms[0].computeString(
        literalNames,
        op_orStr,
        op_andStr,
        negationHeader,
        negationFooter,
        bracketOpen,
        bracketClosed,
        reverseOrder,
      )}}`;
    }

    const amountTerms = this.getTerms().length;
    const useBrackets = amountTerms > 1 && this.getLogicOperator() !== BooleanFunctionOperator_OR;

    for (let t = reverseOrder ? amountTerms - 1 : 0; reverseOrder ? t >= 0 : t < amountTerms; t += reverseOrder ? -1 : 1) {
      const subTerm = this.getTerms()[t];
      const subTermIsLiteral = subTerm instanceof BooleanFunctionLiteral;

      if (useBrackets && !subTermIsLiteral) {
        str += bracketOpen;
      }

      str += subTerm.computeString(
        literalNames,
        op_orStr,
        op_andStr,
        negationHeader,
        negationFooter,
        bracketOpen,
        bracketClosed,
        reverseOrder,
      );

      if (useBrackets && !subTermIsLiteral) {
        str += bracketClosed;
      }

      if (!reverseOrder) {
        if (t < amountTerms - 1) {
          str += this.getLogicOperator() === BooleanFunctionOperator_OR ? op_orStr : op_andStr;
        }
      } else if (t > 0) {
        str += this.getLogicOperator() === BooleanFunctionOperator_OR ? op_orStr : op_andStr;
      }
    }
    return str;
  }

  /**
   * Returns latex representation of this BooleanFunction
   */
  toLatex(
    literalNames: string[] = ['x0', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7'],
    reverseOrder: boolean = true,
  ): string {
    return this.computeString(
      literalNames,
      '+',
      '',
      '\\bar{',
      '}',
      '\\left(',
      '\\right)',
      reverseOrder,
    );
  }

  /**
   * Returns deep cloned version of this BooleanFunction.
   * Recursively calls .clone() on all subsequent terms and literals.
   */
  clone(): BooleanFunction {
    const termsCloned = this._terms.map((term) => term.clone());
    return new BooleanFunction(this._logicOperator, termsCloned);
  }

  /**
   * Recursively computes amount of BooleanFunctionLiterals in this and all subsequent terms.
   */
  amountLiterals(): number {
    return this._terms.reduce((sum, term) => sum + term.amountLiterals(), 0);
  }

  computeOutput(inputs: boolean[]): boolean {
    if (this._logicOperator === BooleanFunctionOperator_NOT) {
      return !this._terms[0].computeOutput(inputs);
    }
    if (this._logicOperator === BooleanFunctionOperator_AND) {
      return this._terms.every((term) => term.computeOutput(inputs));
    }
    if (this._logicOperator === BooleanFunctionOperator_OR) {
      return this._terms.some((term) => term.computeOutput(inputs));
    }
    throw new Error(`Unknown BooleanFunctionOperator: ${this._logicOperator}`);
  }

  getIDs(ids: number[] = []): number[] {
    this._terms.forEach((term) => term.getIDs(ids));
    return ids;
  }

  findHighestID(): number {
    return Math.max(...this._terms.map((term) => (term instanceof BooleanFunctionLiteral ? term.getId() : (term as BooleanFunction).findHighestID())));
  }

  toString(): string {
    if (this._logicOperator === BooleanFunctionOperator_NOT) {
      if (this._terms[0] instanceof BooleanFunctionLiteral) {
        return `~${this._terms[0].toString()}`;
      }
      return `~(${this._terms[0].toString()})`;
    }

    return this._terms.map((term, index) => {
      const isLiteral = term instanceof BooleanFunctionLiteral;
      const termStr = isLiteral ? term.toString() : `(${term.toString()})`;
      const operator = index < this._terms.length - 1
        ? (this._logicOperator === BooleanFunctionOperator_AND ? '*' : '+')
        : '';
      return termStr + operator;
    }).join('');
  }
}
