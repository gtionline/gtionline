import { BooleanFunction, BooleanFunctionOperator_OR, BooleanFunctionOperator_AND } from '../booleanFunction';
import { computeMaxTermsFromKV, computeMinTermsFromKV } from './booleanFunctionBaseTerms';

export class BooleanFunctionNF {
  /**
     * Computes DNF from given KVDiagram. \
     * NOTE: For better performance use computeDNF(..)
     * if you already have the necessary Minterms at hand.
     * @param {KVDiagram} kvdiagram
     * @returns {BooleanFunction} BooleanFunction representing the DNF
     */
  computeDNFFromKV(kvdiagram) {
    const minTerms = computeMinTermsFromKV(kvdiagram);
    return this.computeDNF(minTerms);
  }

  /**
     * Computes DNF from given Minterms (as BooleanFunctions). \
     * NOTE: The given Minterms are deep cloned before encapsulating
     * them in a BooleanFunction.
     * @param {[BooleanFunction]} minTerms
     * @returns {BooleanFunction} a BooleanFunction representing the DNF
     */
  computeDNF(minTerms) {
    // deep clone minTerms array
    const minTermsCloned = [];
    for (let i = 0; i < minTerms.length; i += 1) {
      minTermsCloned[i] = minTerms[i].clone();
    }

    return new BooleanFunction(BooleanFunctionOperator_OR, minTermsCloned);
  }

  /**
     * Computes KNF from given KVDiagram. \
     * NOTE: For better performance use computeKNF(..)
     * if you already have the necessary Maxnterms at hand.
     * @param {KVDiagram} kvdiagram
     * @returns {BooleanFunction} BooleanFunction representing the KNF
     */
  computeKNFFromKV(kvdiagram) {
    const maxTerms = computeMaxTermsFromKV(kvdiagram);
    return this.computeKNF(maxTerms);
  }

  /**
     * Computes KNF from given Maxterms (as BooleanFunctions). \
     * NOTE: The given Maxterms are deep cloned before encapsulating
     * them in a BooleanFunction.
     * @param {[BooleanFunction]} maxTerms
     * @returns {BooleanFunction} BooleanFunction representing the KNF
     */
  computeKNF(maxTerms) {
    // deep clone maxTerms array
    const maxTermsCloned = [];
    for (let i = 0; i < maxTerms.length; i += 1) {
      maxTermsCloned[i] = maxTerms[i].clone();
    }

    return new BooleanFunction(BooleanFunctionOperator_AND, maxTermsCloned);
  }
}
