import {
  BooleanFunction, BooleanFunctionOperator_OR, BooleanFunctionOperator_AND, BooleanFunctionOperator_NOT,
} from './booleanFunction';
import { BooleanFunctionLiteral } from './booleanFunctionLiteral';
import { KVDiagram } from './KVDiagram';
import { parseBooleanFunction } from '../../boolean/expression/parserwrapper';
import { BooleanVariable } from '../../boolean/expression/variable';
import { NAryExpression, UnaryExpression } from '../../boolean/expression/operation';

export class BooleanFunctionUtil {
  /** Converts array of BooleanFunction baseTerms to an array
     * of their respective string representations. See
     * convertBaseTermToStringFormat(..) for further reference.
     * @param {[BooleanFunction]} baseTerms
     */
  convertBaseTermsToStringFormat(baseTerms, globalAmountLiterals) {
    const termsStr = [];
    for (let t = 0; t < baseTerms.length; t += 1) {
      termsStr.push(this.convertBaseTermToStringFormat(baseTerms[t], globalAmountLiterals));
    }
    return termsStr;
  }

  /**
     * Converts a BaseTerm (i.e. function consisting only of BooleanFunctionLiterals directly)
     * to its string representation (e.g. '0-101').
     * See Readme.md for further info on the string format. \
     * The returned string fullfills the format specification of having the Literal-IDs in descending
     * order.
     * @param {BooleanFunction} baseTerm BooleanFunction baseTerm to convert.
     * @param {number} globalAmountLiterals Number defining how many global literals exists
     * as to fill the String with DontCares to match that total amount. Or to cut it if move literals
     * than -globalAmountLiterals- are present in the BooleanFunction.
     * @returns {string} string representation of given baseTerm.
     */
  convertBaseTermToStringFormat(baseTerm, globalAmountLiterals) {
    let strRepresentation = '';
    const literals = baseTerm.getTerms();

    if (globalAmountLiterals === undefined) {
      console.trace('error in BooleanFunctionUtil.js > convertBaseTermToStringFormat(..) \n'
                    + 'No globalAmountLiterals (2nd parameter) was given\n');
    }

    for (let id = 0; id < globalAmountLiterals; id += 1) {
      const literalsWithThatID = literals.filter((literal) => literal.getId() === id);
      if (literalsWithThatID.length > 1) {
        console.trace('error in BooleanFunctionUtil.js > convertBaseTermToStringFormat(..) \n'
                    + 'Given baseTerm had multiple Literals with the same ID. Conversion to String format '
                    + 'not possible. Returning null');
        return null;
      }

      if (literalsWithThatID.length === 1) {
        strRepresentation = (literalsWithThatID[0].isNegated() ? '0' : '1') + strRepresentation;
      } else {
        strRepresentation = `-${strRepresentation}`;
      }
    }

    return strRepresentation;
  }

  /**
     * Converts string representation (e.g. '01-1') to its BooleanFunction equivalent.
     * See Readme.md for further info on the string format. \
     * Literal-IDs are assumed to be in descending order, starting with termStr.length()-1,
     * ending with 0. \
     * DontCares, represented by '-' will be ignored and no literal will be inserted
     * into the output term for it.
     * @param {string} termStr
     * @param {BooleanFunctionOperator_OR | BooleanFunctionOperator_AND} booleanFunctionOperator
     *  see BooleanFunction.js for BooleanFunction Operator constants
     * @returns {BooleanFunction}
     */
  convertStringFormatBaseTermToBooleanFunction(termStr, booleanFunctionOperator) {
    const term = new BooleanFunction(booleanFunctionOperator, []);

    for (let c = 0; c < termStr.length; c += 1) {
      const index = termStr.length - 1 - c;
      if (termStr[index] !== '-') {
        term.addTerm(new BooleanFunctionLiteral(
          c,
          termStr.charAt(index) === '0',
        ));
      }
    }

    return term;
  }

  /**
     * @param {[BooleanFunction | BooleanFunctionLiteral]} array
     * @returns deep cloned version of given array
     */
  cloneBooleanFunctionArray(array) {
    const arrayNew = [];
    for (let i = 0; i < array.length; i += 1) {
      arrayNew[i] = array[i].clone();
    }
    return arrayNew;
  }

  /**
     * Converts the final (most cost effective) solution of a petrick
     * statement to its BooleanFunction equivalent. Uses prime terms
     * that have been carried around in the petrickStatementObjMinORMax
     * itself to do so.
     * @param { {
     *      primeTerms: [BooleanFunction],
     *      cheapestSolution: String,
     *      PRIMETERM_SYMBOL_BASE_CHAR_CODE: number,
     *      etc___: "..."
     *  } } petrickStatementObjMinORMax petrick statement obj of EITHER 'min-terms'
     * OR 'max-terms' as returned by _computePetrickStatement(..) or
     * computePetrickStatement(..)[<ONE VARIANT>].
     * @param {BooleanFunctionOperator_OR | BooleanFunctionOperator_AND} booleanFunctionOpTopLevel A
     * BooleanFunction Operator as defined in file BooleanFunction.js. The resulting BooleanFunction
     * will get this OP as its main arithmetic operator.
     * @returns {BooleanFunction}
     */
  convertFinalPetrickSolutionToBooleanFunction(petrickStatementObjMinORMax, booleanFunctionOpTopLevel) {
    /** @type {[BooleanFunction]} */
    const primeTerms = petrickStatementObjMinORMax.primeTerms;

    // retrieve cheapest solution from obj
    /** @type {String} */
    const solutionStr = petrickStatementObjMinORMax.cheapestSolution;

    // build minimal-form BooleanFunction
    const bf = new BooleanFunction(booleanFunctionOpTopLevel, []);
    const PRIMETERM_SYMBOL_BASE_CHAR_CODE = petrickStatementObjMinORMax.PRIMETERM_SYMBOL_BASE_CHAR_CODE;
    for (let p = 0; p < solutionStr.length; p += 1) {
      const primeTermi = solutionStr.charCodeAt(p) - PRIMETERM_SYMBOL_BASE_CHAR_CODE;
      bf.addTerm(primeTerms[primeTermi].clone());
    }
    return bf;
  }

  /**
     *
     * @param petrickStatementObj as returned by the petrick statement algorithm
     * @param {BooleanFunctionOperator_AND | BooleanFunctionOperator_OR} booleanFunctionOpTopLevel OP
     * resulting boolean function containing prime terms
     */
  extractCheapestSolutionFromPetrickStatementObj(petrickStatementObj, booleanFunctionOpTopLevel) {
    const primeTerms = petrickStatementObj.primeTerms;

    const lastStep = petrickStatementObj.steps[
      petrickStatementObj.steps.length - 1
    ];

    const cheapestSolution = lastStep.bf.getTerms()[0].getTerms()[
      petrickStatementObj.cheapestSolution
    ];
    // console.log(lastStep, lastStep.bf);

    const out = new BooleanFunction(booleanFunctionOpTopLevel, []);

    for (let l = 0; l < cheapestSolution.getTerms().length; l += 1) {
      const primeTermi = cheapestSolution.getTerms()[l].getId();
      out.addTerm(primeTerms[primeTermi].clone());
    }
    return out;
  }

  /**
  * Returns a sorted version of the given array of Baseterms by their
  * respective KVDiagram-Index.
  * Does not change the original array in any way.
  * BooleanFunctions themselves are not clones
  * @param {[BooleanFunction]} baseTerms
  */
  sortBaseTermsByKVIndex(baseTerms) {
    const kvindices = [];
    for (let b = 0; b < baseTerms.length; b += 1) {
      const baseTerm = baseTerms[b];
      const kvindex = parseInt(baseTerm.getTerms().map((bfliteral) => (bfliteral.isNegated() ? '0' : '1')).reverse().join(''), 2);
      kvindices[b] = kvindex;
    }

    // get array with baseTerms and their respective kvindices
    const kvindicesTupleSorted = kvindices.map((kvindex, i) => [baseTerms[i], kvindex]).sort((a, b) => Math.sign(a[1] - b[1]));

    return kvindicesTupleSorted.map((tuple) => tuple[0]);
  }

  /**
     * @param {BooleanFunction} primeTerm
     * @param {[BooleanFunction]} baseTerm
     * @returns {boolean} Boolean stating if the given prime term coveres the
     * given base term
     */
  primeTermCoversBaseTerm(primeTerm, baseTerm) {
    for (let l = 0; l < primeTerm.getTerms().length; l += 1) {
      const primeTermLiteral = primeTerm.getTerms()[l];
      if (baseTerm.getTerms().find((baseTermLiteral) => baseTermLiteral.equals(primeTermLiteral)) === undefined) return false;
    }
    return true;
  }

  /**
     * Untestet!
     * Converts deep cloned array of maxTerms variants of given minTerms
     * @param {[BooleanFunction]} minTerms
     */
  convertMinTermsToMaxTerms(minTerms) {
    const maxTerms = [];

    for (let t = 0; t < minTerms.length; t += 1) {
      const minTerm = minTerms[t];
      const minTermLiterals = minTerm.getTerms();

      const maxTerm = new BooleanFunction(BooleanFunctionOperator_OR, []);
      maxTerms[t] = maxTerm;

      for (let l = 0; l < minTermLiterals.length; l += 1) {
        maxTerm.addTerm(new BooleanFunctionLiteral(minTermLiterals[l].getId(), !minTermLiterals[l].isNegated()));
      }
    }

    return maxTerms;
  }

  /**
     * @param {BooleanFunction} bfLeft
     * @param {BooleanFunction} bfRight
     * @returns true if bfLeft fully contains all of rights literals
     * [bfRight ist Untermenge von bfLeft]
     */
  booleanFunctionContainsAnother(bfLeft, bfRight) {
    for (let r = 0; r < bfRight.getTerms().length; r += 1) {
      const subTermRight = bfRight.getTerms()[r];
      if (bfLeft.getTerms().find((l) => l.equals(subTermRight)) === undefined) {
        return false;
      }
    }
    return true;
  }

  computeBinaryStringRepresentationOfBaseTerm(baseTermBF, amountVariablesTotal) {
    let str = '';
    for (let v = amountVariablesTotal - 1; v >= 0; v -= 1) {
      const literal = baseTermBF.getTerms().find((l) => l.getId() === v);

      if (literal === undefined) {
        str += '-';
      } else if (literal.isNegated()) {
        str += '0';
      } else {
        str += '1';
      }
    }
    return str;
  }

  /**
   * @param {[number]} valuesFlat: Array of output values of the bf, in an order that would be used
   * in a truth table 000=1,001=0,010=0,011=1,100=0,...   =>   [1,0,0,1,0,...]. Index 1 in the array
   * corresponds to index 1 in the KVDiagram. WARNING: => in truth table: 000, 001, 010, 011, 100, ... means
   * that the literal order becomes cba, not abc!!!!
   * @param {number} amountVariables
   * @returns {KVDiagram}
   */
  generateKVDiagramFromTruthTable(valuesFlat, amountVariables) {
    const kvdiagram = new KVDiagram(null, amountVariables);
    const kvdiagramWidth = kvdiagram.getValues()[0].length;
    const kvdiagramHeight = kvdiagram.getValues().length;

    // init empty 2d values array
    const valuesNew = [];
    for (let y = 0; y < kvdiagramHeight; y += 1) {
      valuesNew[y] = [];
      for (let x = 0; x < kvdiagramWidth; x += 1) {
        valuesNew[y][x] = 0;
      }
    }

    for (let y = 0; y < kvdiagramHeight; y += 1) {
      for (let x = 0; x < kvdiagramWidth; x += 1) {
        const indexStr = kvdiagram.computeKVIndex(y, x).toString(2).padStart(amountVariables, '0');

        let truthIndex = 0;
        for (let l = 0; l < amountVariables; l += 1) {
          if (indexStr[amountVariables - l - 1] === '0') continue;
          // this literal is positive ('1') so go the half / quarter / ... in the valuesFlat array where it is positive!
          truthIndex += (2 ** l);
        }
        valuesNew[y][x] = valuesFlat[truthIndex];
      }
    }
    return new KVDiagram(valuesNew, amountVariables);
  }

  /**
   * This function converts the string representation into a proper BF representation as used
   * by this Minimization section of the website. (calls the cmos string parser)
   * The CMOS section uses a parser to convert a string representation of any function into a recursive object
   * representation of a boolean function. Unfortunately, other classes were used and they are not directly compatible
   * with the BooleanFunction-Minimization part of the website.
   * @param {string} str String-representation
   * @param {boolean} expandAndFlatten Specifies if the resulting BooleanFunction should also be
   * fully expanded and flattened, so that negations only occur on literals, not on brackets
   * @returns
   */
  parseStringToBF(str, expandAndFlatten = false) {
    const expression = parseBooleanFunction(str);
    const variables = Array.from(expression.variables);
    // console.log("Expression:");
    // console.log(expression);
    // console.log(require('util').inspect(expression, {showHidden: false, depth: null, colors: true}));
    let bf = this._parseCMOSBFToMinimizerRepresentation(expression.expression, variables);
    if (expandAndFlatten) {
      bf = this.flattenBF(this.expandBF(bf));
    }
    return {
      bf,
      variables,
    };
  }

  _parseCMOSBFToMinimizerRepresentation(cmosBF, variables) {
    // Negation
    if (cmosBF instanceof UnaryExpression && cmosBF.operator === 'not') {
      // Negated literal
      if (cmosBF.operand instanceof BooleanVariable) {
        return new BooleanFunctionLiteral(variables.findIndex((name) => name === cmosBF.operand.name), true);
      }

      // Negation (negated recursion case)
      return new BooleanFunction(BooleanFunctionOperator_NOT, [
        this._parseCMOSBFToMinimizerRepresentation(cmosBF.operand, variables),
      ]);

    // Literal (top level)
    } if (cmosBF instanceof BooleanVariable) {
      return new BooleanFunctionLiteral(variables.findIndex((name) => name === cmosBF.name), false);

    // NAry Expression (normal recursion case)
    } if (cmosBF instanceof NAryExpression) {
      const terms = [];
      for (const term of cmosBF.operands) {
        terms.push(this._parseCMOSBFToMinimizerRepresentation(term, variables));
      }
      return new BooleanFunction(
        cmosBF.operator === 'or' ? BooleanFunctionOperator_OR : BooleanFunctionOperator_AND,
        terms,
      );

    // Unknown type
    }
    throw new Error(`ERROR in BooleanFunctionUtil>parse: term is of undefined type. term: ${cmosBF}`);
  }

  /**
   * Returns a fully expanded (GER: ausmultiplizierte) version of the given BooleanFunction.
   * e.g. performs the operation: (a+ ~(~a+b)) => (a+(a*~b))
   * Note that the result might not be flattened, e.g. (a*(a*~b)) and not the flattened (a*a*~b)
   * @param {BooleanFunction | BooleanFunctionLiteral} bf
   * @param {boolean} negate (internal flag for negated recursion)
   * @returns Fully expanded (ausmultiplizierte) BooleanFunction
   */
  expandBF(bf, negate = false) {
    if (bf instanceof BooleanFunction) {
      // Unary negation
      if (bf.getLogicOperator() === BooleanFunctionOperator_NOT) {
        return this.expandBF(bf.getTerms()[0], !negate);
      }
      // Boolean Function
      if (!negate) {
        return new BooleanFunction(bf.getLogicOperator(), bf.getTerms().map((e) => this.expandBF(e, negate)));
      }
      // Negate BF and all subterms
      return new BooleanFunction(
        bf.getLogicOperator() === BooleanFunctionOperator_AND ? BooleanFunctionOperator_OR : BooleanFunctionOperator_AND,
        bf.getTerms().map((e) => this.expandBF(e, negate)),
      );
    }
    if (bf instanceof BooleanFunctionLiteral) {
      if (negate) {
        return new BooleanFunctionLiteral(bf.getId(), !bf.isNegated());
      }
      return new BooleanFunctionLiteral(bf.getId(), bf.isNegated());
    }
    // Add a default return statement
    return bf;
  }

  /**
   * NOTE: EXPECTS BF TO BE FULLY EXPANDED via expandBF() beforehand! (negations must only be on literals)
   * @throws Might throw an Error if the given BooleanFunction is not fully expanded (via expandBF()) and negations of groups
   * (of whole subfunctions) are found. (the expandBF() function should also turn ~(a) into ~a, which is OK)
   * @param {BooleanFunction | BooleanFunctionLiteral} bfOld
   * @returns Fully flattened BooleanFunction
   */
  flattenBF(bfOld) {
    if (bfOld instanceof BooleanFunctionLiteral) {
      return bfOld;
    }
    // > boolean function
    if (bfOld.getLogicOperator() === BooleanFunctionOperator_NOT) {
      throw new Error('flattenBF(only works on fully expanded bfs (expand a bf via util.expandBF(bf))');
    }

    const bf = bfOld.clone();
    for (let t = 0; t < bf.getTerms().length; t += 1) {
      const term = bf.getTerms()[t];

      if (term instanceof BooleanFunctionLiteral) {
        // Skip to next iteration
      } else if (bf.getLogicOperator() !== term.getLogicOperator()) {
        // Cannot be flattened, as logic operators are different
        bf.setTerm(t, this.flattenBF(term));
      } else {
        // flatten > Pull subterm upwards the tree into the current node
        bf.setTerm(t, term.getTerms()[0]);
        // inject all remaining subnodes into the current node
        for (let s = 1; s < term.getTerms().length; s += 1) {
          const subterm = term.getTerms()[s];
          bf.injectTermBeforeIndex(t + s, subterm);
        }
        t -= 1; // do the current index again, as node was replaced
      }
    }
    return bf;
  }

  generateKVDiagramFromBooleanFunction(bf) {
    // generate truth table and generate kvdiagram from that

    const ids = bf.getIDs();
    const amountLiterals = ids.length;

    const truthTable = [];
    const width = 2 ** Math.floor((amountLiterals + 1) / 2);
    const height = 2 ** Math.floor(amountLiterals / 2);
    const utilKVDiagram = new KVDiagram([], amountLiterals);

    // console.log(`ids: ${ids}, amountLiterals: ${amountLiterals}, width: ${width}, height: ${height}`);

    for (let x = 0; x < width; x += 1) {
      for (let y = 0; y < height; y += 1) {
        const indexKV = utilKVDiagram.computeKVIndex(y, x);
        // convert numerical index into 1s and 0s.
        // console.log(`${indexKV}, ${indexKV.toString(2).padStart(amountLiterals, '0').split().reverse().reverse()}`);
        const inputs = indexKV.toString(2).padStart(amountLiterals, '0').split('').reverse();
        truthTable[indexKV] = Number(bf.computeOutput(inputs));
        // console.log(`${inputs} becomes ${truthTable[indexKV]}`);
      }
    }
    console.log('truthTable', truthTable);
    return this.generateKVDiagramFromTruthTable(truthTable, amountLiterals);
  }
}
