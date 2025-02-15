import { computeDontCareMinTermsFromKV, computeMaxTermsFromKV, computeMinTermsFromKV } from './algorithms/booleanFunctionBaseTerms';
import { computeDMF, computeKMF } from './algorithms/booleanFunctionMF';
import { BooleanFunctionNF } from './algorithms/booleanFunctionNF';
import { computeQuineCluskeyClasses } from './algorithms/booleanFunctionQuineCluskey';
import { computePrimes } from './algorithms/booleanFunctionPrimes';
import { computePrimeTable } from './algorithms/booleanFunctionPrimeTables';
import { computePetrickStatement } from './algorithms/booleanFunctionPetrickStatement';
import { BooleanFunctionUtil } from './booleanFunctionUtil';

/**
 * Function encapsulating access to all optimization algorithms at once.
 * See README for documentation on individual algorithms.
 * @param {KVDiagram} kvdiagram
 * @returns { {
 *      dnf: BooleanFunction,
 *      knf: BooleanFunction,
 *      quineClasses: {
 *          'min-terms': {},
 *          'max-terms': {}
 *      },
 *      primes: {
 *          'min-terms': [BooleanFunction],
 *          'max-terms': [BooleanFunction]
 *      },
 *      primeTable: {
 *          'min-terms': {},
 *          'max-terms': {}
 *      },
 *      petrickStatement: {
 *          'min-terms': {},
 *          'max-terms': {}
 *      },
 *      dmf: BooleanFunction,
 *      kmf: BooleanFunction
 *  } }
 */
export function optimizeBooleanFunction(kvdiagram) {
  const util = new BooleanFunctionUtil();

  // base terms
  const minTerms = computeMinTermsFromKV(kvdiagram);
  const maxTerms = computeMaxTermsFromKV(kvdiagram);
  const dontCareMinTerms = computeDontCareMinTermsFromKV(kvdiagram);
  const dontCareMaxTerms = util.convertMinTermsToMaxTerms(dontCareMinTerms);

  // normal forms
  const computerNF = new BooleanFunctionNF();
  const dnf = computerNF.computeDNF(minTerms);
  const knf = computerNF.computeKNF(maxTerms);

  // quine cluskey classes
  console.log('minTerms', minTerms, 'maxTerms', maxTerms, 'dontCareMinTerms', dontCareMinTerms);
  const quineClasses = computeQuineCluskeyClasses(minTerms, maxTerms, dontCareMinTerms);

  // primes
  const primes = computePrimes(quineClasses, dontCareMinTerms, dontCareMaxTerms);

  // Ueberdeckungstabelle
  const primeTableObj = computePrimeTable(minTerms, maxTerms, primes, true);

  // Petrick Ausdruck
  const petrickStatement = computePetrickStatement(primeTableObj);

  // Minimal forms
  const dmf = computeDMF(petrickStatement);
  const kmf = computeKMF(petrickStatement);

  return {
    dnf, // BooleanFunction
    knf, // BooleanFunction
    quineClasses,
    primes,
    primeTable: primeTableObj,
    petrickStatement,
    dmf, // BooleanFunction
    kmf, // BooleanFunction
  };
}
