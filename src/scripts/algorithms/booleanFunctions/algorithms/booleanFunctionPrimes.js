import { BooleanFunctionUtil } from '../booleanFunctionUtil';
import { computeDontCareMinTermsFromKV, computeMaxTermsFromKV, computeMinTermsFromKV } from './booleanFunctionBaseTerms';
import { computeQuineCluskeyClasses } from './booleanFunctionQuineCluskey';

/**
 *
 * @param {BooleanFunction} primeTerm BooleanFunction primeTerm
 * @param {[BooleanFunction]} dontCares Array of BooleanFunction base terms
 * pointing to dont cares. Must be MinTerms if primeTerm is PrimimpliKANT
 * and MaxTerms if primeTerm is a PrimimpliKAT.
 * @returns {boolean} Boolean stating if the given primeterm covers only dont
 * cares and not a single other '1'/'0', depending on the context.
 */
function _primeTermCoversOnlyDontCares(primeTerm, dontCares) {
  if (!dontCares || dontCares.length === 0) return false;

  const numVariables = dontCares[0].getTerms().length;

  const util = new BooleanFunctionUtil();
  const primeTermAreaSize = 2 ** (numVariables - primeTerm.getTerms().length);

  let dontCaresCovered = 0;
  for (let dc = 0; dc < dontCares.length; dc += 1) {
    if (util.primeTermCoversBaseTerm(primeTerm, dontCares[dc])) dontCaresCovered += 1;
  }

  return dontCaresCovered === primeTermAreaSize;
}

/**
 * Extracts prime terms (Primimplikate OR Primimplikanten) from given q_containerObj
 * that was returned by a QuineClusky class absorption algorithm.
 * @param { [ [[[BooleanFunction, boolean]]] ] } q_containerObj array of quine
 * cluskey classes as returned by _computeQuineCluskeyClasses(..).
 * @param { [BooleanFunction]} dontCares
 * @returns { [BooleanFunction] } primes as extracted from given quine cluskey classes.
 * Does not contain duplicates. All terms are deep cloned before returning them.
 */
function _computePrimes(q_containerObj, dontCares) {
  // get every term that was not absorbed in the quineCluskeyClass algorithm

  /** @type {[BooleanFunction]} */
  const primes = [];

  for (let c = 0; c < q_containerObj.length; c += 1) {
    for (let n = 0; n < q_containerObj[c].length; n += 1) {
      for (let t = 0; t < q_containerObj[c][n].length; t += 1) {
        const termCapsule = q_containerObj[c][n][t];
        if (termCapsule[1] === true) { // term was absorbed
          continue;
        }
        if (primes.includes(termCapsule[0])) { // skip duplicates
          continue;
        }

        // skip ones only covering dont cares
        if (_primeTermCoversOnlyDontCares(termCapsule[0], dontCares)) continue;

        primes.push(termCapsule[0]);
      }
    }
  }

  // clone terms
  const out = [];
  for (let t = 0; t < primes.length; t += 1) {
    out.push(primes[t].clone());
  }
  return out;
}

/**
 * Extracts prime terms (Primimplikate AND Primimplikanten) from
 * given q_containerObjMinMax that was returned by
 * computeQuineCluskeyClasses(..) or computeQuineCluskeyClassesFromKV(..).
 * @param { {
 *      'min-terms': [ [[[BooleanFunction, boolean]]] ],
 *      'max-terms': [ [[[BooleanFunction, boolean]]] ]
 * }} q_containerObjMinMax
 * @param {[BooleanFunction]} dontCareMinTerms Array of all dont cares as MinTerms
 * @param {[BooleanFunction]} dontCareMaxTerms Array of all dont cares as MaxTerms
 * @returns { {
 *      'min-terms': [BooleanFunction],
 *      'max-terms': [BooleanFunction]
 * } } Prime terms extracted from given q_containerObjMinMax.
 */
export function computePrimes(q_containerObjMinMax, dontCareMinTerms, dontCareMaxTerms) {
  return {
    'min-terms': _computePrimes(q_containerObjMinMax['min-terms'], dontCareMinTerms),
    'max-terms': _computePrimes(q_containerObjMinMax['max-terms'], dontCareMaxTerms),
  };
}

/**
 * This is the quick access version of the PrimeTerm / Primimplika(n)te(n)
 * computation algorithm. \
 * See {@link computePrimes computePrimes()} for documentation about
 * the returned object. \
 * NOTE: If the quine cluskey class algorithm (see BooleanFunctionQuineCluskey.js)
 * was already executed, calling {@link computePrimes computePrimes()} will be of
 * better performance, as this method is doing nothing but encapsulating another
 * full execution call to the quine cluskey class algorithm. \
 * See computeQuineCluskeyClasses(..) for further reference and explanation.
 * @param {KVDiagram} kvdiagram
 * @returns {
*      'min-terms': [BooleanFunction],
*      'max-terms': [BooleanFunction]
* } Computed prime terms from given KVDiagram.
*/
export function computePrimesFromKV(kvdiagram) {
  // base terms
  const minTerms = computeMinTermsFromKV(kvdiagram);
  const maxTerms = computeMaxTermsFromKV(kvdiagram);
  const dontCareMinTerms = computeDontCareMinTermsFromKV(kvdiagram);
  const dontCareMaxTerms = new BooleanFunctionUtil().convertMinTermsToMaxTerms(dontCareMinTerms);

  const q_containerObjMinMax = computeQuineCluskeyClasses(minTerms, maxTerms, dontCareMinTerms);

  return computePrimes(q_containerObjMinMax, dontCareMinTerms, dontCareMaxTerms);
}
