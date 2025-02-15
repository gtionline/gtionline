import { BooleanFunction } from './booleanFunction';

/**
 * Checks if two arrays of BooleanFunctions are equal
 * @param functions0 First array of BooleanFunctions
 * @param functions1 Second array of BooleanFunctions
 * @param checkOrder If true, functions must be in the same order to be considered equal
 * @returns boolean indicating if the functions are equal
 */
export function checkFunctionsEqual(
  functions0: BooleanFunction[],
  functions1: BooleanFunction[],
  checkOrder: boolean = false,
): boolean {
  if (!functions0 || !functions1 || functions0.length !== functions1.length) {
    return false;
  }

  // loop through functions
  if (checkOrder) {
    for (let f = 0; f < functions0.length; f += 1) {
      if (!functions0[f].equals(functions1[f])) {
        return false;
      }
    }
  } else {
    for (let f = 0; f < functions0.length; f += 1) {
      const querry = functions0[f];
      // check if an equivalent term can be found in -other-
      if (functions1.filter((otherFunc) => otherFunc.equals(querry)).length === 0) {
        return false;
      }
    }
  }

  return true;
}
