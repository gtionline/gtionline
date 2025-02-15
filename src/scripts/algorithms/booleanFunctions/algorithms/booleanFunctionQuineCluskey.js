import { BooleanFunctionOperator_AND, BooleanFunctionOperator_OR } from '../booleanFunction';
import { BooleanFunctionUtil } from '../booleanFunctionUtil';
import { computeDontCareMinTermsFromKV, computeMaxTermsFromKV, computeMinTermsFromKV } from './booleanFunctionBaseTerms';

/**
 * Replaces portion of string with a given replacement at given position.
 * @param {string} str
 * @param {number} index
 * @param {string} replacement
 */
function _replaceAt(str, index, replacement) {
  return str.substr(0, index) + replacement + str.substr(index + replacement.length);
}

/**
 * This performs the QuineMCCluskey class absorption algorithm to find
 * Primimplika(n)te(n). \
 * The returned (somewhat 2D) array has the following structure: \
 * array[class_amount_literals][class_amount_negations][nth term] =
 *      [possibly shortened term (BooleanFunction), boolean stating if this term was absorbed (boolean)]. \
 * \
 * e.g. the seventh term in Q_3_2 being at: \
 * array[3][2][6][0], \
 * and the boolean specifiying if it was absorbed at: \
 * array[3][2][6][1]
 *
 * NOTE: this implementation depends on the minOrMaxTermsBFs terms to actually
 * be min / max terms, meaning they have the global amount of literals, and NO
 * missing ones(i.e. dont cares).
 * @param {[BooleanFunction]} minOrMaxTermsBF
 * @param {[BooleanFunction]} dontCareMinTermsBF Array of DontCares (in MinTerm-BooleanFunction repres.)
 */
function _computeQuineCluskeyClasses(minOrMaxTermsBF, dontCareMinTermsBF) {
  if (!minOrMaxTermsBF || minOrMaxTermsBF.length === 0) {
    console.error('error in _computeQuineCluskeyClasses(..): given MinOrMaxTerms was undefined '
            + 'or of length 0. Might be bc knf = 1 or dnf = 0.');
    return null;
  }

  const isMinterm = minOrMaxTermsBF[0].getLogicOperator() === BooleanFunctionOperator_AND;
  const numVariables = minOrMaxTermsBF[0].getTerms().length;

  // parse object representation of parameters to string format
  const util = new BooleanFunctionUtil();
  const baseTerms = util.convertBaseTermsToStringFormat(minOrMaxTermsBF, numVariables);
  const dontCares = util.convertBaseTermsToStringFormat(dontCareMinTermsBF, numVariables);

  // NOTE: dont care min terms are negated (i.e. transformed into maxterms), if
  //       we are also dealing with maxterms as base terms
  if (!isMinterm) {
    for (let d = 0; d < dontCares.length; d += 1) {
      const dontCareStr = dontCares[d];
      let dontCareNegatedStr = '';
      for (let c = 0; c < dontCareStr.length; c += 1) {
        if (dontCareStr[c] === '-') {
          dontCareNegatedStr += '-';
        } else if (dontCareStr[c] === '1') {
          dontCareNegatedStr += '0';
        } else {
          dontCareNegatedStr += '1';
        }
      }

      dontCares[d] = dontCareNegatedStr;
    }
  }

  /** contains all Q_classes, for example Q_4_4 with all the terms as pairs of [term, bool:term minimized?] */
  const Q_container = [];
  /** counts which Qs to compare */
  let q_class = numVariables;

  // generate first layer of classes that contain the unchanged base terms
  Q_container[q_class] = [];
  for (let i = 0; i <= numVariables; i += 1) Q_container[q_class][i] = [];

  for (let i = 0; i < baseTerms.length; i += 1) {
    // get number of 1s
    const num = baseTerms[i].replace(/[^1]/g, '').length;
    Q_container[q_class][num].push([baseTerms[i], false]);
  }
  for (let i = 0; i < dontCares.length; i += 1) {
    // get number of 1s
    const num = dontCares[i].replace(/[^1]/g, '').length;
    Q_container[q_class][num].push([dontCares[i], false]);
  }

  // start reduction phase
  while (q_class > 0) {
    // create next smaller q-class
    Q_container[q_class - 1] = [];
    for (let l = 0; l < q_class; l += 1) {
      Q_container[q_class - 1][l] = [];
    }

    // compare classes
    for (let class_comp = q_class; class_comp > 0; class_comp -= 1) {
      // skip if no terms in classes that should be compared
      const sizeQU = Q_container[q_class][class_comp].length;
      const sizeQU2 = Q_container[q_class][class_comp - 1].length;
      if (sizeQU < 1 || sizeQU2 < 1) continue;

      // compare all terms of u and u-1
      const seen = {}; // to remove duplicates
      for (let c = 0; c < sizeQU; c += 1) {
        for (let d = 0; d < sizeQU2; d += 1) {
          // only one position should differ
          const term1 = Q_container[q_class][class_comp][c][0];
          const term2 = Q_container[q_class][class_comp - 1][d][0];
          let diffs = -1;
          for (let e = 0; e < numVariables; e += 1) {
            const charA = term1.charAt(e);
            const charB = term2.charAt(e);
            if (charA !== charB) {
              if (charA === '-' || charB === '-') {
                // if one has a -, the term cannot be reduced
                diffs = -2;
                break;
              }
              if (diffs === -1) {
                diffs = e;
              } else {
                // more than one diff: break
                diffs = -2;
                break;
              }
            }
          }
          // there is exactly one diff, put it in next class
          if (diffs >= 0) {
            // new term has a - at the position where the reduction took place
            const termNew = _replaceAt(term1, diffs, '-');
            // set boolean to true, was reduced!
            Q_container[q_class][class_comp][c][1] = true;
            Q_container[q_class][class_comp - 1][d][1] = true;
            // there was a reduction, so we can start the algorithm on the next stage
            // change = true;

            if (seen[termNew] !== 1) {
              seen[termNew] = 1;
              Q_container[q_class - 1][class_comp - 1].push([termNew, false]);
            }
          }
        }
      }
    }
    q_class -= 1;
  }

  // convert from string to object representation
  const Q_containerObj = [];
  for (let i = 0; i < Q_container.length; i += 1) {
    Q_containerObj[i] = [];
    for (let j = 0; j < Q_container[i].length; j += 1) {
      Q_containerObj[i][j] = [];

      for (let t = 0; t < Q_container[i][j].length; t += 1) {
        Q_containerObj[i][j][t] = [
          util.convertStringFormatBaseTermToBooleanFunction(
            Q_container[i][j][t][0],
            isMinterm ? BooleanFunctionOperator_AND : BooleanFunctionOperator_OR,
          ),
          Q_container[i][j][t][1],
        ];
      }
    }
    Q_containerObj[i].reverse();
  }

  return Q_containerObj;
}

/**
 * This performes the QuineMCCluskey class absorption algorithm to find
 * Primimplika(n)te(n). It is once executed on the given minTerms and dontCares,
 * and a second time on the given maxTerms and dontCares. \
 * The results are encapsulated into one object respectively: \
 * { \
 *  'min-terms': RESULTS OF ALGO. WITH MINTERMS, \
 *  'max-terms': RESULTS OF ALGO. WITH MAXTERMS \
 * } \
 * \
 * The structure of the individual result-objects is explained in the doc of
 * _computeQuineCluskeyClasses(..).
 *
 * @param {[BooleanFunction]} minTerms
 * @param {[BooleanFunction]} maxTerms
 * @param {[BooleanFunction]} dontCareMinTerms
 * @returns {{'min-terms': {}, 'max-terms': {} }}
 */
export function computeQuineCluskeyClasses(minTerms, maxTerms, dontCareMinTerms) {
  return {
    'min-terms': _computeQuineCluskeyClasses(minTerms, dontCareMinTerms),
    'max-terms': _computeQuineCluskeyClasses(maxTerms, dontCareMinTerms),
  };
}

/**
 * This is the quick access version of the QuineMCCluskey class absorption
 * algorithm. \
 * NOTE: If Min, Max and DontCare -Terms have already been computed,
 * calling computeQuineCluskeyClasses(..) will be of better performance,
 * as it accepts those directly as inputs. \
 * See computeQuineCluskeyClasses(..) for further reference and explanation.
 */
export function computeQuineCluskeyClassesFromKV(kvdiagram) {
  const minTerms = computeMinTermsFromKV(kvdiagram);
  const maxTerms = computeMaxTermsFromKV(kvdiagram);
  const dontCareMinTerms = computeDontCareMinTermsFromKV(kvdiagram);

  return computeQuineCluskeyClasses(minTerms, maxTerms, dontCareMinTerms);
}
