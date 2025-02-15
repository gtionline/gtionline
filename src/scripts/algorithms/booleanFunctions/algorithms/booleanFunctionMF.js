import { BooleanFunctionOperator_AND, BooleanFunctionOperator_OR } from '../booleanFunction';
import { BooleanFunctionUtil } from '../booleanFunctionUtil';
import { computePetrickStatementFromKV } from './booleanFunctionPetrickStatement';

/**
 * Directly computes DMF from given petrick statement obj as returned by
 * computePetrickStatementFromKV(..) or computePetrickStatement(..). \
 * See computeDMFFromKV(..) for a quick access version of this method.
 *
 * @param { {
*      'min-terms': {},
*      'max-terms': {}
* } } petrickStatementObj Petrick statement obj as returned by
* computePetrickStatementFromKV(..) or computePetrickStatement(..),
* containing both the 'min-terms' and 'max-terms' variants.
* @returns {BooleanFunction} BooleanFunction representation of the DMF
*/
export function computeDMF(petrickStatementObj) {
  const util = new BooleanFunctionUtil();
  // return util.convertFinalPetrickSolutionToBooleanFunction(
  //     petrickStatementObj['min-terms'],
  //     BooleanFunctionOperator_OR
  // );
  // const lastStep = petrickStatementObj['min-terms'].steps[
  //     petrickStatementObj['min-terms'].steps.length - 1
  // ];
  // return util.convertPetrickStatementBFToFullBF(
  //     lastStep.bf,
  //     petrickStatementObj['min-terms'].primeTerms
  // );
  return util.extractCheapestSolutionFromPetrickStatementObj(
    petrickStatementObj['min-terms'],
    BooleanFunctionOperator_OR,
  );
}

/**
* Directly computes KMF from given petrick statement obj as returned by
* computePetrickStatementFromKV(..) or computePetrickStatement(..). \
* See computeDMFFromKV(..) for a quick access version of this method.
*
* @param { {
*      'min-terms': {},
*      'max-terms': {}
* } } petrickStatementObj Petrick statement obj as returned by
* computePetrickStatementFromKV(..) or computePetrickStatement(..),
* containing both the 'min-terms' and 'max-terms' variants.
* @returns {BooleanFunction} BooleanFunction representation of the DMF
*/
export function computeKMF(petrickStatementObj) {
  const util = new BooleanFunctionUtil();
  // return util.convertFinalPetrickSolutionToBooleanFunction(
  //     petrickStatementObj['max-terms'],
  //     BooleanFunctionOperator_AND
  // );
  return util.extractCheapestSolutionFromPetrickStatementObj(
    petrickStatementObj['max-terms'],
    BooleanFunctionOperator_AND,
  );
}

/**
 * Computes both DMF and KMF from given KVDiagram. \
 * This function is meant as a quick access to the MF computation. \
 * In order to compute the MFs, this computeMFFromKV(..) method will compute all
 * necessary things to be able to call computeDMF(..) and computeKMF(..) with those directly. \
 * Thus, if the petrick statement(obj) was already computed, calling computeDMF(..)
 * and computeKMF(..) will be of better performance, as that directly accepts that as an input. \
 * @param {KVDiagram} kvdiagram
 * @returns { {
 *      dmf: BooleanFunction,
 *      kmf: BooleanFunction
 *  } } Javascript object containing both dmf and kmf
 */
export function computeMFFromKV(kvdiagram) {
  const petrickStatement = computePetrickStatementFromKV(kvdiagram);
  return {
    dmf: computeDMF(petrickStatement),
    kmf: computeKMF(petrickStatement),
  };
}

/**
 * Computes DMF from given KVDiagram. \
 * This function is meant as a quick access to the DMF computation. \
 * In order to compute the DMF, this computeDMFFromKV(..) method will compute all
 * necessary things to be able to call computeDMF(..) with those directly. \
 * Thus, if thepetrick statement(obj) was already computed, calling computeDMF(..) will
 * be of better performance, as that directly accepts that as an input. \
 * @param {KVDiagram} kvdiagram
 * @returns {BooleanFunction} BooleanFunction representation of the DMF
 */
export function computeDMFFromKV(kvdiagram) {
  const petrickStatement = computePetrickStatementFromKV(kvdiagram);
  return computeDMF(petrickStatement);
}

/**
 * Computes KMF from given KVDiagram. \
 * This function is meant as a quick access to the KMF computation. \
 * In order to compute the KMF, this computeKMFFromKV(..) method will compute all
 * necessary things to be able to call computeKMF(..) with those directly. \
 * Thus, if thepetrick statement(obj) was already computed, calling computeKMF(..) will
 * be of better performance, as that directly accepts that as an input. \
 * @param {KVDiagram} kvdiagram
 * @returns {BooleanFunction} BooleanFunction representation of the KMF
 */
export function computeKMFFromKV(kvdiagram) {
  const petrickStatement = computePetrickStatementFromKV(kvdiagram);
  return computeKMF(petrickStatement);
}
