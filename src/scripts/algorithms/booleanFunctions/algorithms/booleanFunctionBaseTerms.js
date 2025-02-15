import { BooleanFunction, BooleanFunctionOperator_AND, BooleanFunctionOperator_OR } from '../booleanFunction';
import { BooleanFunctionLiteral } from '../booleanFunctionLiteral';

/**
 * Computes Minterms from given KVDiagram. For every cell in the
 * KVDiagram that contains a '1', a Minterm is generated. Dont cares
 * are therefore not included.
 * @param {KVDiagram} kvdiagram
 * @returns {[BooleanFunction]} Array of BooleanFunctions, each
 * one representing a single minterm.
 */
export function computeMinTermsFromKV(kvdiagram) {
  console.log('computeMinTermsFromKV', kvdiagram);
  const minTerms = [];

  const kv = kvdiagram.getValues();

  for (let y = 0; y < kv.length; y += 1) {
    for (let x = 0; x < kv[0].length; x += 1) {
      if (Number(kv[y][x]) !== 1) {
        continue;
      }

      // Converting the kvindex(base 10) to a binary number
      // shows us which literals are 'positive' (-> 1) on the cell
      // and which are negated (-> 0)
      const index = kvdiagram.computeKVIndex(y, x);
      let binary = index.toString(2);

      // fill in missing literals
      while (binary.length < kvdiagram.getAmountLiterals()) {
        binary = `0${binary}`;
      }

      // convert string representation to object structure
      const minTerm = new BooleanFunction(BooleanFunctionOperator_AND, []);
      for (let c = 0; c < binary.length; c += 1) {
        minTerm.addTerm(new BooleanFunctionLiteral(
          c,
          binary.charAt(binary.length - 1 - c) === '0',
        ));
      }

      minTerms.push(minTerm);
    }
  }

  console.log('minTerms', minTerms);
  return minTerms;
}

/**
 * Computes Maxterms from given KVDiagram. For every cell in the
 * KVDiagram that contains a '0', a Maxterm is generated. Dont cares
 * are therefore not included.
 * @param {KVDiagram} kvdiagram
 * @returns {[BooleanFunction]} Array of BooleanFunctions, each
 * one representing a single maxterm.
 */
export function computeMaxTermsFromKV(kvdiagram) {
  const maxTerms = [];

  const kv = kvdiagram.getValues();

  for (let y = 0; y < kv.length; y += 1) {
    for (let x = 0; x < kv[0].length; x += 1) {
      if (Number(kv[y][x]) !== 0) {
        continue;
      }

      // Converting the kvindex(base 10) to a binary number
      // shows us which literals are 'positive' (-> 1) on the cell
      // and which are negated (-> 0)
      const index = kvdiagram.computeKVIndex(y, x);
      let binary = index.toString(2);

      // fill in missing literals
      while (binary.length < kvdiagram.getAmountLiterals()) {
        binary = `0${binary}`;
      }

      // convert string representation to object structure
      const maxTerm = new BooleanFunction(BooleanFunctionOperator_OR, []);
      for (let c = 0; c < binary.length; c += 1) {
        maxTerm.addTerm(new BooleanFunctionLiteral(
          c,
          binary.charAt(binary.length - 1 - c) !== '0',
        ));
      }

      maxTerms.push(maxTerm);
    }
  }

  return maxTerms;
}

/**
 * Computes Minterms for all 'dont cares' in a given KVDiagram. For
 * every cell in the KVDiagram that contains '-', a Minterm is generated.
 * @param {KVDiagram} kvdiagram
 * @returns {[BooleanFunction]} Array of BooleanFunctions, each
 * one representing a single minterm of a 'dont care'.
 */
export function computeDontCareMinTermsFromKV(kvdiagram) {
  const minTerms = [];

  const kv = kvdiagram.getValues();

  for (let y = 0; y < kv.length; y += 1) {
    for (let x = 0; x < kv[0].length; x += 1) {
      if (kv[y][x] !== '-') {
        continue;
      }

      // Converting the kvindex(base 10) to a binary number
      // shows us which literals are 'positive' (-> 1) on the cell
      // and which are negated (-> 0)
      const index = kvdiagram.computeKVIndex(y, x);
      let binary = index.toString(2);

      // fill in missing literals
      while (binary.length < kvdiagram.getAmountLiterals()) {
        binary = `0${binary}`;
      }

      // convert string representation to object structure
      const minTerm = new BooleanFunction(BooleanFunctionOperator_AND, []);
      for (let c = 0; c < binary.length; c += 1) {
        minTerm.addTerm(new BooleanFunctionLiteral(
          c,
          binary.charAt(binary.length - 1 - c) === '0',
        ));
      }

      minTerms.push(minTerm);
    }
  }

  return minTerms;
}
