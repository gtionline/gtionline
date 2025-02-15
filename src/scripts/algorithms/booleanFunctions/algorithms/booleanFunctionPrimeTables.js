/* eslint-disable */
import { BooleanFunctionUtil } from '../booleanFunctionUtil';
import { computeDontCareMinTermsFromKV, computeMaxTermsFromKV, computeMinTermsFromKV } from './booleanFunctionBaseTerms';
import { computePrimes } from './booleanFunctionPrimes';
import { computeQuineCluskeyClasses } from './booleanFunctionQuineCluskey';

/**
 * Type of Step, where a prime term was identified as a core, bc it is
 * the only one covering a certain base term
 */
export const BOOLEAN_FUNCTION_PRIME_TABLES_STEP_FOUND_CORE = 'found-core';
/**
 * Type of Step, where a column is crossed out, bc it is already being covered
 * by some prime term.
 */
export const BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_COLUMN_BC_COVERED = 'cross-column-bc-covered';
/**
 * Type of Step, where a row is crossed out, bc all of its crosses
 * are already being covered. (if this type would not exist, such empty rows
 * would be reduced thru Row-Domination. But on paper, just crossing an empty row
 * out is more straightforward)
 */
export const BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_ROW_BC_COVERED = 'cross-row-bc-covered';
/**
 * Type of Step, where a row is dominated by some other row. A cost analysis of
 * both rows has been done if this Step was taken by the algorithm.
 */
export const BOOLEAN_FUNCTION_PRIME_TABLES_STEP_ROW_DOMINATION = 'row-domination';
/**
 * Type of Step, where a column is dominated by some other column. The dominatING column
 * is to be crossed out.
 */
export const BOOLEAN_FUNCTION_PRIME_TABLES_STEP_COLUMN_DOMINATION = 'column-domination';

/**
 * Type of Step that is appended to the step array, stating that the table has a cyclic Rest
 * that can not be minimized by only using this PrimeTable approach. This step is appended exactly
 * then, when {}.cyclic === true.
 */
export const BOOLEAN_FUNCTION_PRIME_TABLES_STEP_HAS_CYCLIC_REST = 'has-cyclic-rest';

/**
 * Convenience class to encapsulate a single 'step' during
 * the Ueberdeckungstabellen algorithm.
 * See constructor for further reference.
 */
class Step {
  /**
     * @param {BOOLEAN_FUNCTION_PRIME_TABLES_STEP_FOUND_CORE
     *      | BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_COLUMN_BC_COVERED
     *      | BOOLEAN_FUNCTION_PRIME_TABLES_STEP_ROW_DOMINATION
     *      | BOOLEAN_FUNCTION_PRIME_TABLES_STEP_COLUMN_DOMINATION
     *      | BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_ROW_BC_COVERED } actionType
     *      ID-like value defining the type of action performed in this step. See
     *      exported constants at the top of this file.
     * @param values Values regarding the current step. Meant to be used for
     *      easy access / embedding of step-details from front-end. For which values
     *      are set on what -type- of step, see the readme.md
     */
  constructor(actionType, {
    core, column, coveredBy, dominator, dominated, row,
  }) {
    this.actionType = actionType;

    this.core = core;
    this.column = column;
    this.row = row;
    this.coveredBy = coveredBy;
    this.dominator = dominator;
    this.dominated = dominated;
  }
}

/**
 * @param {[BooleanFunction]} baseTerms
 * @param {[BooleanFunction]} primeTerms
 * @returns {
*      {
*        'coverTable': [[boolean]],
*        'steps': [Step],
*        'baseTerms': [BooleanFunction],
*        'primeTerms': [BooleanFunction],
*        'cyclic': boolean
*      }
*  }
*/
function _computePrimeTable(baseTerms, primeTerms) {
  const util = new BooleanFunctionUtil();

  const returnObj = {
    coverTable: null, // filled in below
    steps: [], // filled in below
    baseTerms: util.cloneBooleanFunctionArray(baseTerms),
    primeTerms: util.cloneBooleanFunctionArray(primeTerms),
  };

  // create cover table
  const petrickTable = [];
  for (let i = 0; i < baseTerms.length; i += 1) {
    petrickTable[i] = [];
    for (let j = 0; j < primeTerms.length; j += 1) {
      if (_primeTermCoversBaseTerm(primeTerms[j], baseTerms[i])) petrickTable[i][j] = true;
      else petrickTable[i][j] = false;
    }
  }
  returnObj.coverTable = petrickTable;

  // create helper table[col][row]:
  //  -1: no info
  //   0: striked out
  //   1: is core (kind of used but kind of not)
  const helperTable = [];
  for (let col = 0; col < petrickTable.length; col += 1) {
    helperTable[col] = [];
    for (let i = 0; i < petrickTable[0].length; i += 1) {
      helperTable[col][i] = -1;
    }
  }

  const crossedOutRows = [];
  const crossedOutColumns = [];

  // check for Kernimplikanten und deren abgedeckte columns
  _computePrimeTable_checkForCores(returnObj, helperTable, crossedOutRows, crossedOutColumns);

  let changes = true;
  while (changes === true) {
    changes = false;

    // Spaltendominanz
    changes = _computePrimeTable_checkForSpaltenDominanz(returnObj, helperTable, crossedOutRows, crossedOutColumns)
            || changes;

    // through column dominance some lines may have been silently cut of their last Xs. remove those officially
    changes = _computePrimeTable_checkForEmptyLines(returnObj, helperTable, crossedOutRows, crossedOutColumns)
            || changes;

    // Zeilendominanz (See VL Folien 17, Seite 33 for algorithm)
    // Example case where Zeilendominanz is necessary:
    // 1 0 1 0
    // 1 1 1 0
    changes = _computePrimeTable_checkForZeilenDominanz(returnObj, helperTable, crossedOutRows, crossedOutColumns, primeTerms)
            || changes;

    // check for Kernimplikanten again. e.g. important at
    // 0 1 1 0
    // 0 - 1 1
    // 0 0 1 -
    // - 1 - 0
    changes = _computePrimeTable_checkForCores(returnObj, helperTable, crossedOutRows, crossedOutColumns)
            || changes;
    // console.log("looping");
  }

  // 0 0 0 0
  // 1 1 0 1
  // 0 1 1 1
  // 0 0 1 0
  // shows that it is necessary to loop through Zeilendominanz and searching for cores multiple times!
  const hasCyclicRest = !_computePrimeTable_isCompletelySolved(helperTable, crossedOutRows, crossedOutColumns);
  returnObj.cyclic = hasCyclicRest;
  if (hasCyclicRest) {
    returnObj.steps.push(new Step(
      BOOLEAN_FUNCTION_PRIME_TABLES_STEP_HAS_CYCLIC_REST,
      {},
    ));
  }

  return returnObj;
}

/**
 * This will execute the prime table / Ueberdeckungstabellen algorithm
 * once for (minTerms with primeTerms) and once for (maxTerms with primeTerms).
 * @param {[BooleanFunction]} minTerms Array of Minterms
 * @param {[BooleanFunction]} maxTerms Array of Maxterms
 * @param { {
 *      'min-terms': [BooleanFunction],
 *      'max-terms': [BooleanFunction]
 * } } primeTerms Object containing Min and Max primeterms
 * as returned by computePrimes[-FromKV](..)
 * @returns { {
 *      'min-terms': {},
 *      'max-terms': {}
 * } }
 */
export function computePrimeTable(minTerms, maxTerms, primeTerms, sortBaseTermsByKVIndex = false) {
  const util = new BooleanFunctionUtil();

  const minTermsSorted = !sortBaseTermsByKVIndex ? minTerms : util.sortBaseTermsByKVIndex(minTerms);
  const maxTermsSorted = !sortBaseTermsByKVIndex ? maxTerms : util.sortBaseTermsByKVIndex(maxTerms);

  return {
    'min-terms': _computePrimeTable(minTermsSorted, primeTerms['min-terms']),
    'max-terms': _computePrimeTable(maxTermsSorted, primeTerms['max-terms']),
  };
}

/**
 * This is the quick access version of the PrimeTable / Ueberdeckungstabelle
 * algorithm. \
 * NOTE: If Min, Max and Prime -Terms have already been computed,
 * calling computePrimeTable(..) will be of better performance,
 * as it accepts those directly as inputs. \
 * See computePrimeTable(..) for further reference and explanation.
 * @param {KVDiagram} kvdiagram
 * @returns See return value of computePrimeTable(..)
 */
export function computePrimeTableFromKV(kvdiagram, sortBaseTermsByKVIndex = false) {
  const minTerms = computeMinTermsFromKV(kvdiagram);
  const maxTerms = computeMaxTermsFromKV(kvdiagram);
  const dontCareMinTerms = computeDontCareMinTermsFromKV(kvdiagram);

  const primeTerms = computePrimes(
    computeQuineCluskeyClasses(minTerms, maxTerms, dontCareMinTerms),
  );

  return computePrimeTable(minTerms, maxTerms, primeTerms, sortBaseTermsByKVIndex);
}

/**
 * Sets every cell in a column of the helper table to zero,
 * unless it is marked as a core.
 */
function _crossColumn(petrickTable, column, helperTable) {
  for (let i = 0; i < petrickTable[0].length; i += 1) {
    if (helperTable[column][i] !== 1) {
      helperTable[column][i] = 0;
    }
  }
}

/**
 * Sets every cell in a row of the helper table to zero.
 */
function _crossRow(petrickTable, row, helperTable) {
  for (let col = 0; col < petrickTable.length; col += 1) {
    helperTable[col][row] = 0;
  }
}

function _computePrimeTable_checkForCores(returnObj, helperTable, crossedOutRows, crossedOutColumns) {
  let changes = false;
  const petrickTable = returnObj.coverTable;

  // check for kernimplika(n)te(n)
  for (let col = 0; col < petrickTable.length; col += 1) {
    if (crossedOutColumns.includes(col)) continue;

    // > get row that is covering this column

    let rowCoveringTheColumn = -1;
    let isCore = true;
    for (let row = 0; row < petrickTable[0].length; row += 1) {
      if (petrickTable[col][row] === true && helperTable[col][row] === -1) {
        if (rowCoveringTheColumn === -1) {
          rowCoveringTheColumn = row;
        } else {
          isCore = false;
          break;
        }
      }
    }

    if (!isCore) {
      continue;
    }

    // > We have found a core term
    changes = true;
    returnObj.steps.push(
      new Step(
        BOOLEAN_FUNCTION_PRIME_TABLES_STEP_FOUND_CORE,
        { core: rowCoveringTheColumn, column: col },
      ),
    );

    // cross current column
    _crossColumn(petrickTable, col, helperTable);
    crossedOutColumns.push(col);

    // cross current row
    _crossRow(petrickTable, rowCoveringTheColumn, helperTable);
    crossedOutRows.push(rowCoveringTheColumn);

    // cross columns (base terms) that this core also covers
    for (let i = 0; i < petrickTable.length; i += 1) {
      if (col === i) continue;

      if (crossedOutColumns.includes(i)) continue;

      if (petrickTable[i][rowCoveringTheColumn] === true) {
        _crossColumn(petrickTable, i, helperTable);
        crossedOutColumns.push(i);

        returnObj.steps.push(
          new Step(
            BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_COLUMN_BC_COVERED,
            { column: i, coveredBy: rowCoveringTheColumn },
          ),
        );
      }

      if (helperTable[i][rowCoveringTheColumn] !== 1) {
        helperTable[i][rowCoveringTheColumn] = 0;
      }
    }
    helperTable[col][rowCoveringTheColumn] = 1;
  }

  return changes;
}

function _computePrimeTable_checkForSpaltenDominanz(returnObj, helperTable, crossedOutRows, crossedOutColumns) {
  let changes = false;
  const petrickTable = returnObj.coverTable;

  // > search for a column that covers the same but less than some other column
  for (let colDominatori = 0; colDominatori < petrickTable.length; colDominatori += 1) {
    if (crossedOutColumns.includes(colDominatori)) continue;

    // search for the col it can dominate
    for (let colMi = 0; colMi < petrickTable.length; colMi += 1) {
      if (colDominatori === colMi || crossedOutColumns.includes(colMi)) continue;

      // check condition of domination
      let dominationPossible = true;
      for (let row = 0; row < petrickTable[0].length; row += 1) {
        if (crossedOutRows.includes(row)) continue;

        // dominated col does not have a mark in this row
        if (petrickTable[colMi][row] === false) continue;

        // > a mark in dominated col. And in dominating? => OK
        if (petrickTable[colDominatori][row]) continue;

        dominationPossible = false;
        break;
      }
      if (!dominationPossible) continue;

      // > DOMINATION!
      // -> cross out dominatING column
      changes = true;
      crossedOutColumns.push(colDominatori);
      _crossColumn(petrickTable, colDominatori, helperTable);
      returnObj.steps.push(
        new Step(
          BOOLEAN_FUNCTION_PRIME_TABLES_STEP_COLUMN_DOMINATION,
          { dominator: colDominatori, dominated: colMi },
        ),
      );
    }
  }
  return changes;
}

function _computePrimeTable_checkForZeilenDominanz(returnObj, helperTable, crossedOutRows, crossedOutColumns, primeTerms) {
  let changes = false;
  const petrickTable = returnObj.coverTable;

  // > search for a row, that covers more than some other row
  for (let rowDominatori = 0; rowDominatori < petrickTable[0].length; rowDominatori += 1) {
    if (crossedOutRows.includes(rowDominatori)) continue;

    // search for the row it can dominate
    for (let rowMi = 0; rowMi < petrickTable[0].length; rowMi += 1) {
      if (rowDominatori === rowMi || crossedOutRows.includes(rowMi)) continue;

      // check condition of domination
      let dominationPossible = true;
      for (let col = 0; col < petrickTable.length; col += 1) {
        if (crossedOutColumns.includes(col)) continue;

        // dominated row does not have a mark in this col
        if (petrickTable[col][rowMi] === false) continue;

        // > mark in dominated row. And in dominating? => OK
        if (petrickTable[col][rowDominatori]) continue;

        dominationPossible = false;
        break;
      }
      if (!dominationPossible) continue;

      // > Possibly Dominated lines have been found!

      // check cost (amount of literals. See VL Folien 17, Seite 33)
      const costDominator = primeTerms[rowDominatori].getTerms().length;
      const costDominated = primeTerms[rowMi].getTerms().length;

      let domination = false;
      if (costDominator <= costDominated) {
        // > Dominating row is cheaper or equally cheap as dominated row
        domination = true;
      } else {
        // > Dominated row is cheaper
        /* VL Folien 17, Seite 30:
                    [Wenn z2 <= z1 , jedoch] c2 < c1 und es existieren keine Zeilen zk
                    (Primterme pk), welche die restlichen Einsstellen der Zeile z1
                    überdecken können und weniger als die Differenz c1 - c2 kosten
                    (d.h.: c1 <= c2 + ck).
                    -> Dann kann die Zeile z2 auch gestrichen werden.
                */

        // > search for other row that fits the condition above
        for (let rowOtheri = 0; rowOtheri < petrickTable[0].length; rowOtheri += 1) {
          // search for OTHER row
          if (rowOtheri === rowDominatori || rowOtheri === rowMi || crossedOutRows.includes(rowOtheri)) continue;

          // check if it is cheaper than the difference
          const costOther = primeTerms[rowOtheri].getTerms().length;
          if (!(costDominator <= costDominated + costOther)) continue;

          // check if this row coveres the 'restlichen Einstellen' of dominator row
          let otherRowCoveresRestlicheEinsstellen = true;
          for (let col = 0; col < petrickTable.length; col += 1) {
            // it only needs to cover other EINSstellen
            if (petrickTable[col][rowDominatori] === false) continue;

            // it only needs to cover OTHER einsstellen
            if (petrickTable[col][rowMi] === true) continue;

            // > the 'other' row would need to cover this column
            if (petrickTable[col][rowOtheri] === false) {
              // > but it does not
              otherRowCoveresRestlicheEinsstellen = false;
              break;
            }
          }

          if (otherRowCoveresRestlicheEinsstellen) {
            // > we have found another row that fits this very specific condition.
            // Domination will therefore not take place with in constellation
            domination = false;
            break;
          }
          // > this line was not one that fit the specific condition. Go on
          // to check if some other line fits it.
        }
      }

      if (domination === false) {
        // Row 'rowDominatori' does not legally cover 'rowMi' due to
        // costDom > rowMi AND the very specific condition stated above.
        continue;
      }

      // > DOMINATION!
      changes = true;
      crossedOutRows.push(rowMi);
      _crossRow(petrickTable, rowMi, helperTable);
      returnObj.steps.push(
        new Step(
          BOOLEAN_FUNCTION_PRIME_TABLES_STEP_ROW_DOMINATION,
          { dominator: rowDominatori, dominated: rowMi },
        ),
      );
    }
  }
  return changes;
}

function _computePrimeTable_checkForEmptyLines(returnObj, helperTable, crossedOutRows, crossedOutColumns) {
  let changes = false;
  const petrickTable = returnObj.coverTable;

  for (let row = 0; row < petrickTable[0].length; row += 1) {
    if (crossedOutRows.includes(row)) continue;

    // console.log("checking row " + row + ".......");
    let isLineEmpty = true;
    for (let col = 0; col < petrickTable.length; col += 1) {
      if (!petrickTable[col][row]) continue;

      if (helperTable[col][row] === 0) { // if cell is striked out
        continue;
      }

      // console.log("found a uncovered cross in column " + col + " with value: " + helperTable[col][row]);
      isLineEmpty = false;
      break;
    }
    if (!isLineEmpty) continue;

    // console.log("row " + row + " is empty!");
    _crossRow(petrickTable, row, helperTable);
    crossedOutRows.push(row);
    returnObj.steps.push(
      new Step(
        BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_ROW_BC_COVERED,
        { row },
      ),
    );
    changes = true;
  }
  return changes;
}

function _computePrimeTable_isCompletelySolved(helperTable, crossedOutRows, crossedOutColumns) {
  for (let row = 0; row < helperTable[0].length; row += 1) {
    if (!crossedOutRows.includes(row)) {
      return false;
    }
  }

  for (let col = 0; col < helperTable.length; col += 1) {
    if (!crossedOutColumns.includes(col)) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if the given prime term covers a given min term
 * in the kvdiagram.
 * @param {BooleanFunction} primeTerm
 * @param {BooleanFunction} minTerm
 */
function _primeTermCoversBaseTerm(primeTerm, minTerm) {
  // check if for every literal in the prime term, an equivalent
  // literal in the base term exists

  const primeLiterals = primeTerm.getTerms();
  const baseLiterals = minTerm.getTerms();
  for (let pl = 0; pl < primeLiterals.length; pl += 1) {
    // check for occurence of current prime-literal
    // somewhere in the base term

    let primeLiteralIsInBaseTerm = false;
    for (let bl = 0; bl < baseLiterals.length; bl += 1) {
      if (primeLiterals[pl].equals(baseLiterals[bl])) {
        primeLiteralIsInBaseTerm = true;
        break;
      }
    }

    if (!primeLiteralIsInBaseTerm) return false;
  }

  return true;
}
