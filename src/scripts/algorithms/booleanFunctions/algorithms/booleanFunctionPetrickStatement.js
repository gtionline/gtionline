/* eslint-disable */
import { BooleanFunction, BooleanFunctionOperator_AND, BooleanFunctionOperator_OR } from '../booleanFunction';
import { BooleanFunctionLiteral } from '../booleanFunctionLiteral';
import { BooleanFunctionUtil } from '../booleanFunctionUtil';
import { computePrimeTableFromKV } from './booleanFunctionPrimeTables';

export const BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_INITIAL = 'bf-ps-initial';
export const BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_DISTRIBUTION = 'bf-ps-distribution';
export const BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_IDEMPOTENCE = 'bf-ps-idempotence';
export const BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_ABSORPTION = 'bf-ps-absorption';
export const BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_SORTING = 'bf-ps-sorting';

/**
 * Computes the petrick statement (obj) e.g. containing the cheapest solution
 * and different snapshots of solving the statement mathematically one by one. \
 *
 * This function is meant as a quick access to the petrick statment computation. \
 * In order to compute it, this function will compute all
 * necessary things to be able to call computePetrickStatement(..) with those directly. \
 * Thus, if the cover table (see BooleanFunctionPrimeTables.js) was already computed, calling
 * computePetrickStatement(..) will be of better performance, as that directly accepts that
 * as an input. \
 * @param {KVDiagram} kvdiagram
 * @returns { {
 *      'min-terms': {},
 *      'max-terms': {}
 * } } The petrick statement (obj) split into a 'min-terms' and a 'max-terms'
 * variant. See computePetrickStatement(..) for more info on the return value.
 */
export function computePetrickStatementFromKV(kvdiagram) {
  // NOTE: primes should be sorted, to be in order with the graphical cover table
  const primeTable = computePrimeTableFromKV(kvdiagram, true);
  return computePetrickStatement(primeTable);
}

/**
 * Computes the petrick statement (obj) e.g. containing the cheapest solution
 * and different snapshots of solving the statement mathematically one by one.
 * @param { {
 *      'min-terms': {},
 *      'max-terms': {}
 * } } primeTableObj Object containing cover table data as returned by
 * computePrimeTable(..) or computePrimeTableFromKV(..)
 * @returns { {
 *      'min-terms': {},
 *      'max-terms': {}
 * } } The petrick statement (obj) split into a 'min-terms' and a 'max-terms'
 * variant. See README and _computePetrickStatement(..) for more info on the return value.
 */
export function computePetrickStatement(primeTableObj) {
  return {
    'min-terms': _computePetrickStatementBF(primeTableObj['min-terms']),
    'max-terms': _computePetrickStatementBF(primeTableObj['max-terms']),
  };
}

/**
 * NOTE: This algorithm heavily uses strings to compute the petrick statement.
 * As a future //t o d o, the same could be done by using the object representation
 * of BooleanFunctions. Maybe even implementing mathematical functions like
 * absorption(..) or distribution(..) as member methods in the BooleanFunction
 * class.
 * @param {{}} primeTableObjMinORMax single variant of the prime table obj as returned
 * by _computePrimeTable(..) or computePrimeTable(..)[<SINGLE VARIANT>] or
 * computePrimeTableFromKV(..)[<SINGLE VARIANT>].
 * @returns { {
 *      expressionDirect: [String],     expressionDirectStr: String,
 *      expressionAbsorbed: [String],   expressionAbsorbedStr: String,
 *      expressionExpanded: [String],   expressionExpandedStr: String,
 *      expression: [String],           expressionStr: String,
 *      cheapestSolution: String,
 *      cheapestSolutionIndex: number,
 *      PRIMETERM_SYMBOL_BASE_CHAR_CODE: number,
 *      primeTerms: [BooleanFunction]
 * } } Petrick statement obj variant
 */
function _computePetrickStatement(primeTableObjMinORMax) {
  return _computePetrickStatementBF(primeTableObjMinORMax);

  // const PRIMETERM_SYMBOL_BASE_CHAR_CODE = 'A'.charCodeAt(0);

  // const util = new BooleanFunctionUtil();

  // //build petrickterm
  // const petrickTable = primeTableObjMinORMax.coverTable;

  // // create basic Petrickterm without any simplifications
  // let constellationDirect = [];
  // for(let col = 0; col < petrickTable.length; col += 1){
  //     constellationDirect[col] = "";
  //     for(let row = 0; row < petrickTable[0].length; row += 1){
  //         if(petrickTable[col][row])
  //             constellationDirect[col] += String.fromCharCode(PRIMETERM_SYMBOL_BASE_CHAR_CODE + row); // => i.e. 'A' + row
  //     }
  // }
  // // console.log(constellationDirect);
  // // console.log("ABOVE GETS:     | Absorption + Idempotenz");

  // // console.log('absorption');
  // // absorption
  // const constellationAbsorbed = _absorption(constellationDirect);
  // // console.log(constellationAbsorbed);
  // // console.log("ABOVE GETS:     | Ausdistribuieren");

  // // console.log('distribution');
  // // distribution
  // // distributedTerms = [];
  // // const constellationDistributed = _distribute("", 0,constellationAbsorbed);
  // const constellationDistributed = _distribute(constellationAbsorbed);
  // // console.log(constellationDistributed);
  // // console.log("ABOVE GETS:     | Absorption + Idempotenz + Sortierung");

  // // console.log('absorption2');
  // // absorption (II)
  // const constellationFinal = _absorption(constellationDistributed);
  // // console.log(constellationFinal);

  // // console.log('absorption2fin');

  // // compute cost of each individual prime term
  // const primeTerms = primeTableObjMinORMax.primeTerms;
  // let costPrimeTerms = [];
  // for(let t = 0; t < primeTerms.length; t += 1) {
  //     costPrimeTerms[t] = primeTerms[t].getTerms();
  // }

  // // compute cost of each possible solution
  // let costSolution = [];
  // for(let s = 0; s < constellationFinal.length; s += 1) {
  //     costSolution[s] = 0;
  //     const solution = constellationFinal[s];

  //     // add cost of each individual prime term in it
  //     for(let t = 0; t < solution.length; t += 1) {
  //         // e.g. 'C' - 'A' = 2:
  //         const primeTermi = solution.charCodeAt(t) - PRIMETERM_SYMBOL_BASE_CHAR_CODE;
  //         costSolution[s] += costPrimeTerms[primeTermi];
  //     }

  //     // add amount of primeterms to the cost
  //     costSolution[s] += constellationFinal[s].length;
  // }

  // // get solution with lowest cost
  // let costSolutionMin = costSolution[0];
  // let costSolutionMinIndex = 0;
  // for(let i = 0; i < costSolution.length; i += 1) {
  //     if(costSolution[i] < costSolutionMin) {
  //         costSolutionMin = costSolution[i];
  //         costSolutionMinIndex = i;
  //     }
  // }

  // let returnObj = {
  //     expressionDirect: constellationDirect,
  //     expressionDirectStr: _constellationToString(constellationDirect, '*', '+', true),

  //     expressionAbsorbed: constellationAbsorbed,
  //     expressionAbsorbedStr: _constellationToString(constellationAbsorbed, '*', '+', true),

  //     expressionExpanded: constellationDistributed,
  //     expressionExpandedStr: _constellationToString(constellationDistributed, '+', '', false),

  //     expression: constellationFinal,
  //     expressionStr: _constellationToString(constellationFinal, '+', '', false),

  //     cheapestSolutionIndex: costSolutionMinIndex,
  //     cheapestSolution: constellationFinal[costSolutionMinIndex],
  //     PRIMETERM_SYMBOL_BASE_CHAR_CODE: PRIMETERM_SYMBOL_BASE_CHAR_CODE,
  //     primeTerms: util.cloneBooleanFunctionArray(primeTableObjMinORMax.primeTerms)
  // };

  // return returnObj;
}

function _computePetrickStatementBF(primeTableObjMinORMax) {
  // build petrickterm
  const petrickTable = primeTableObjMinORMax.coverTable;

  // create basic Petrickterm without any simplifications
  const bfPetrickTerm = new BooleanFunction(BooleanFunctionOperator_AND, []); // ' = 1'
  for (let col = 0; col < petrickTable.length; col += 1) {
    bfPetrickTerm.addTerm(new BooleanFunction(BooleanFunctionOperator_OR, []));
    for (let row = 0; row < petrickTable[0].length; row += 1) {
      if (petrickTable[col][row]) {
        bfPetrickTerm.getTerms()[col].addTerm(new BooleanFunction(
          BooleanFunctionOperator_AND,
          [new BooleanFunctionLiteral(row, false)],
        ));
        // console.log(col, row);
      }
      // constellationDirect[col] += String.fromCharCode(PRIMETERM_SYMBOL_BASE_CHAR_CODE + row); // => i.e. 'A' + row
    }
  }

  const util = new BooleanFunctionUtil();

  const returnObj = {
    steps: [
      new PetrickStatementStep(
        bfPetrickTerm,
        BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_INITIAL,
      ),
    ],
    // NOTE: having primeTerms here is a bit heselig, but its not hurting anyone
    primeTerms: util.cloneBooleanFunctionArray(primeTableObjMinORMax.primeTerms),
  };
  function __registerStep(stepObj) {
    returnObj.steps.push(stepObj);
  }
  function __getLastStep() {
    return returnObj.steps[returnObj.steps.length - 1];
  }

  // some preparations to make the algorithm sleeker:

  // sort terms by literal count (accending)
  bfPetrickTerm.getTerms().sort((a, b) => a.amountLiterals() - b.amountLiterals());
  if (!bfPetrickTerm.equals(__getLastStep().bf, true, true)) {
    // > if some change occured
    __registerStep(new PetrickStatementStep(
      bfPetrickTerm,
      BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_SORTING,
    ));
  }

  // multi-term absorption
  const track_amountBeforeAbsorption0 = bfPetrickTerm.getTerms().length;
  _absorbBF(bfPetrickTerm);
  const track_amountAfterAbsorption0 = bfPetrickTerm.getTerms().length;
  if (track_amountAfterAbsorption0 !== track_amountBeforeAbsorption0) {
    __registerStep(new PetrickStatementStep(
      bfPetrickTerm,
      BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_ABSORPTION,
    ));
  }

  // sort terms by literal count (descending)
  bfPetrickTerm.getTerms().sort((a, b) => b.amountLiterals() - a.amountLiterals());
  if (!bfPetrickTerm.equals(__getLastStep().bf, true, true)) {
    // > if some change occured
    __registerStep(new PetrickStatementStep(
      bfPetrickTerm,
      BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_SORTING,
    ));
  }

  // repeat until the main konjunctive term only consists of one single subterm:
  // 1: distribute the leftmost subterm with its neighbour
  // 2: 'Idempotenz + absorption' between the newly created objects
  // 3: This addition of konjunctions (subsubterms) will be treated as the new 'leftmost'
  // (4:) Shift all terms except the leftmost one to the left in the main BF

  // console.log("whole term before: ");
  // console.log(require('util').inspect(bfPetrickTerm, true, null, true /* enable colors */));

  while (bfPetrickTerm.getTerms().length > 1) {
    // console.log();
    // console.log("-loop cycle start-");

    // 1: Distribute leftmost subterm with its neighbour on the right
    bfPetrickTerm.getTerms()[0] = _distributeBF(bfPetrickTerm.getTerms()[0], bfPetrickTerm.getTerms()[1]);
    bfPetrickTerm.getTerms().splice(1, 1); // remove second term and shift righter ones to the left

    __registerStep(new PetrickStatementStep(
      bfPetrickTerm,
      BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_DISTRIBUTION,
    ));

    // console.log("whole term after first distribution: ");
    // console.log(require('util').inspect(bfPetrickTerm, true, null, true /* enable colors */));

    // 2. a) Simplify the newly created terms (all inside of the first disjunction / subterm)
    const subterms = bfPetrickTerm.getTerms()[0].getTerms();
    let changeBySelectUniqueTerms = false;
    for (let i = 0; i < subterms.length; i += 1) {
      const lengthBefore = subterms[i].getTerms().length;
      subterms[i] = new BooleanFunction(BooleanFunctionOperator_AND, _selectUniqueTermsBF(subterms[i].getTerms(), __registerStep));
      const lengthAfter = subterms[i].getTerms().length;

      if (lengthBefore !== lengthAfter) changeBySelectUniqueTerms = true;
    }
    if (changeBySelectUniqueTerms) {
      __registerStep(new PetrickStatementStep(
        bfPetrickTerm,
        BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_IDEMPOTENCE,
      ));
    }

    // console.log("whole term after first reduction: ");
    // console.log(require('util').inspect(bfPetrickTerm, true, null, true /* enable colors */));

    // 2. b) Some of those sub parts will now be able to be absorbed. Remove them
    const track_lengthBeforeAbsorption = bfPetrickTerm.getTerms()[0].getTerms().length;
    _absorbBF(bfPetrickTerm.getTerms()[0]);
    const track_lengthAfterAbsorption = bfPetrickTerm.getTerms()[0].getTerms().length;

    if (track_lengthBeforeAbsorption !== track_lengthAfterAbsorption) {
      __registerStep(new PetrickStatementStep(
        bfPetrickTerm,
        BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_ABSORPTION,
      ));
    }

    // console.log("Whole term after absorption of subterms of first BF: ");
    // console.log(require('util').inspect(bfPetrickTerm, true, null, true /* enable colors */));
  }

  // find cheapest solution

  // compute cost of each individual prime term
  const primeTerms = primeTableObjMinORMax.primeTerms;
  const costPrimeTerms = [];
  for (let t = 0; t < primeTerms.length; t += 1) {
    costPrimeTerms[t] = primeTerms[t].getTerms().length;
  }

  // compute cost of each possible solution
  const costSolution = [];
  const solutions = bfPetrickTerm.getTerms()[0].getTerms();
  const amountSolutions = solutions.length;
  for (let s = 0; s < amountSolutions; s += 1) {
    costSolution[s] = 0;
    const solution = solutions[s];

    // add cost of each individual prime term in it
    for (let t = 0; t < solution.getTerms().length; t += 1) {
      // e.g. 'C' - 'A' = 2:
      const primeTermi = solution.getTerms()[t].getId();
      costSolution[s] += costPrimeTerms[primeTermi];
    }

    // add amount of primeterms to the cost
    costSolution[s] += solution.getTerms().length;
  }

  // get solution with lowest cost
  let costSolutionMin = costSolution[0];
  let costSolutionMinIndex = 0;
  for (let i = 0; i < costSolution.length; i += 1) {
    if (costSolution[i] < costSolutionMin) {
      costSolutionMin = costSolution[i];
      costSolutionMinIndex = i;
    }
  }

  returnObj.cheapestSolution = costSolutionMinIndex;

  return returnObj;
}

/**
 * Converts a given constellation into a mathematically correct human readable
 * string representation as returned in the petrick statement obj. \
 * i.e. ["ABC", "ABD", "BD"] -> "(A+B+C)*(A+B+D)*(B+D)"
 * @param {[String]} constellation
 * @param {String} symbolTopLevel Symbol that will be interjected between members
 * of the array.
 * @param {String} symbolSubLevel Symbol that will be interjected between individual
 * chars in the Strings.
 * @param {Boolean} printBrackets Defaults to true
 * @returns {String}
 */
function _constellationToString(constellation, symbolTopLevel, symbolSubLevel, printBrackets = true) {
  let str = '';
  for (let t = 0; t < constellation.length; t += 1) {
    if (printBrackets) {
      str += '(';
    }

    for (let c = 0; c < constellation[t].length; c += 1) {
      str += constellation[t][c];
      if (c < constellation[t].length - 1) {
        str += symbolSubLevel;
      }
    }

    if (printBrackets) {
      str += ')';
    }
    if (t < constellation.length - 1) {
      str += symbolTopLevel;
    }
  }
  return str;
}

/**
 * Performes multi term absorption on given constellation of terms. \
 * Example: \
 * [ 'C', 'C', 'B', 'BC', 'CE', 'AE' ] -> [ 'C', 'B', 'AE' ]
 * @param {[String]} terms
 * @returns {[String]} Constellation of absorbed terms
 */
function _absorption(terms) {
  const wasTermAbsorbed = [];
  for (let i = 0; i < terms.length; i += 1) {
    wasTermAbsorbed[i] = false;
    // sort term
    terms[i] = terms[i].split('').sort(_cmpInString).join('');
    // eliminate duplicate chars
    terms[i] = _collectUniqueCharacters(terms[i]);
  }

  for (let t = 0; t < terms.length; t += 1) {
    for (let o = 0; o < terms.length; o += 1) {
      if (t === o || wasTermAbsorbed[o] === true) continue;
      if (terms[o].length > terms[t].length) {
        // check if all characters of <t> are in <o>
        let containsAll = true;
        for (let c = 0; c < terms[t].length; c += 1) {
          // Error in Safari: undefined is not a function
          // if(!terms[o].includes(terms[t].charAt(c))){
          if (terms[o].indexOf(terms[t].charAt(c)) === -1) {
            containsAll = false;
            break;
          }
        }
        if (containsAll) wasTermAbsorbed[o] = true;
      }
    }
  }
  // get all not absorbed strings
  const termsNotAbsorbed = [];
  // check for idempotence
  const seen = {};
  for (let t = 0; t < terms.length; t += 1) {
    if (!wasTermAbsorbed[t]) {
      if (seen[terms[t]] !== 1) {
        seen[terms[t]] = 1;
        termsNotAbsorbed.push(terms[t]);
      }
    }
  }
  return termsNotAbsorbed;
}
/**
 * used by absorption(..) to sort constellation alphabetically.
 * Intended to be used in char comparison
 */
function _cmpInString(x, y) {
  return x > y ? 1 : (x < y ? -1 : 0);
}

/**
 * used by absorption(..)
 * @param {String}
 * @returns {String}
 */
function _collectUniqueCharacters(str) {
  let unique = '';
  for (let i = 0; i < str.length; i += 1) {
    if (unique.lastIndexOf(str[i]) === -1) {
      unique += str[i];
    }
  }
  return unique;
}

/**
 * Recursively distributes a given constellation of terms with eachother.
 * Used internally by the Petrickstatement algorithm. \
 * NOTE: The latter three argument are used for internal recursion. \
 * Example:\
 * [ 'A', 'C', 'BD' ] -> [ 'ACB', 'ACD' ]
 * Calling this method with _distribute(<terms>:[String]); is completely acceptable and
 * intended.
 * @param {[String]} terms
 * @returns {[String]} Distributed terms
 */
function _distribute(terms, _termResult = '', _i = 0, _distributedTerms = []) {
  // Base case
  if (_i === terms.length) {
    _distributedTerms.push(_termResult);
    return;
  }
  for (let i = 0; i < terms[_i].length; i += 1) {
    _distribute(terms, _termResult + terms[_i].charAt(i), _i + 1, _distributedTerms);
  }
  return _distributedTerms;
}

function _distributeBF(termLeft, termRight) {
  // termLeft and termRight are both disjunctions of conjunctions

  // console.log("term left: ");
  // console.log(require('util').inspect(termLeft, true, null, true /* enable colors */));
  // console.log("term right: ");
  // console.log(require('util').inspect(termRight, true, null, true /* enable colors */));

  // cross match
  const bfMatchCollection = new BooleanFunction(BooleanFunctionOperator_OR, []);
  for (let i = 0; i < termLeft.getTerms().length; i += 1) {
    for (let j = 0; j < termRight.getTerms().length; j += 1) {
      // match conjunctions i and j (combine their literals)
      const leftConjunction = termLeft.getTerms()[i].clone();
      const rightConjunction = termRight.getTerms()[j];

      // console.log('left: ', leftConjunction, '; right: ', rightConjunction);

      // add all literals of rightConjunction to leftConjunction
      // if they are not yet contained (not (yet) implemented, as seeing the
      // process step by step from a students perspective might be better)
      for (let rightLiteralI = 0; rightLiteralI < rightConjunction.getTerms().length; rightLiteralI += 1) {
        const rightLiteral = rightConjunction.getTerms()[rightLiteralI];
        //
        // if (leftConjunction.getTerms().find(literalLeft => literalLeft.getId() === rightLiteral.getId()) === undefined)
        leftConjunction.addTerm(rightLiteral);
      }

      bfMatchCollection.addTerm(leftConjunction);
    }
  }

  // console.log("After: ");
  // console.log(require('util').inspect(bfMatchCollection, true, null, true /* enable colors */));

  return bfMatchCollection;
}

function _selectUniqueTermsBF(terms) {
  const uniqueTerms = [];
  for (let t = terms.length - 1; t >= 0; t -= 1) {
    const term = terms[t];

    let termUnique = true;
    for (let c = 0; c < t; c += 1) {
      if (term.equals(terms[c])) {
        termUnique = false;
        break;
      }
    }
    if (!termUnique) continue;

    uniqueTerms.push(term);
  }

  return uniqueTerms;
}

function _absorbBF(bfTerm) {
  // NOTE: there must not be identical literals in any SINGLE BooleanFunction!
  // for every sub term, check if it fully contains another subterm (literal-wise)

  const util = new BooleanFunctionUtil();

  const amountSubTermsBefore = bfTerm.getTerms().length;
  const absorbedRegister = [];
  function __absorb(i) {
    absorbedRegister[i] = true;
  }

  const terms = bfTerm.getTerms();
  for (let t = 0; t < terms.length; t += 1) {
    const term = terms[t];

    // compare against
    for (let compi = 0; compi < terms.length; compi += 1) {
      if (compi === t) continue;
      if (absorbedRegister[compi] === true) continue; // prevents two identical terms from absorbing each other and fading out of existance completely

      const comp = terms[compi];

      if (term.getTerms().length < comp.getTerms().length) continue; // term can not contain comp

      if (util.booleanFunctionContainsAnother(term, comp)) {
        // console.log("absorbed term ", t, " bc of term ", compi);
        __absorb(t); // since literals of comp are a subset of term's
        break;
      }
    }
  }

  // bfTerm.clearTerms();
  for (let t = amountSubTermsBefore - 1; t >= 0; t -= 1) {
    if (absorbedRegister[t] === true) {
      bfTerm.spliceTerms(t, 1); // remove that term from the BF
    }
  }
  // console.log("absorbed reg: ", absorbedRegister);
  // console.log("After absorption of subterms: ");
  // console.log(require('util').inspect(bfTerm, true, null, true /* enable colors */))
}

/**
 * Object depicting a single step in the petrick statemen algorithm.
 */
class PetrickStatementStep {
  /**
     * this.bf is the result of this step/action
     */
  constructor(booleanFunctionObj, actionType) {
    this.bf = booleanFunctionObj.clone();
    this.actionType = actionType;
  }
}
