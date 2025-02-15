/* eslint-disable */
import {
  BooleanFunction, BooleanFunctionOperator_AND, BooleanFunctionOperator_NOT, BooleanFunctionOperator_OR,
} from '../booleanFunction';
import { BooleanFunctionLiteral } from '../booleanFunctionLiteral';

export const BOOLEAN_FUNCTION_NANDIFY_STEP_DOUBLE_NEGATION = 'nand_double_negation';
export const BOOLEAN_FUNCTION_NANDIFY_STEP_NOR_TO_AND = 'nand_nor_to_and';
export const BOOLEAN_FUNCTION_NANDIFY_STEP_REDUNDANT_AND = 'nand_redundant_and';

export const BOOLEAN_FUNCTION_NORIFY_STEP_NAND_TO_OR = 'nor_nand_to_or';
export const BOOLEAN_FUNCTION_NORIFY_STEP_DOUBLE_NEGATION = 'nor_double_negation';
export const BOOLEAN_FUNCTION_NORIFY_STEP_REDUNDANT_OR = 'nor_redundant_or';

/**
	 * Recursively computes and returns process of nandifying the given boolean function
	 * @param {BooleanFunction} booleanFunction Boolean Function to NANDify
   * @returns {{'result': BooleanFunction, 'steps': {'0': [Step], '1': [Step], '2': [Step]}}}
	 */
export function computeNANDification(booleanFunction) {
  const steps = {};
  _performNANDStep(booleanFunction, booleanFunction, steps, 0);

  // Get index of last meaningful entry
  let lastIndex = -1;
  while (steps[++lastIndex] && steps[lastIndex].length > 0);
  lastIndex -= 1;

  let result;
  if (lastIndex < 0) {
    result = booleanFunction;
  } else {
    result = steps[lastIndex][steps[lastIndex].length - 1].bf;
  }
  _removeNegationBeforeLiterals(result);

  return {
    result,
    steps,
  };
}

/**
	 * Recursively computes and returns process of norifying the given boolean function
	 * @param {BooleanFunction} booleanFunction Boolean Function to NORify
   * @returns {{'result': BooleanFunction, 'steps': {'0': [Step], '1': [Step], '2': [Step]}}}
	 */
export function computeNORification(booleanFunction) {
  const steps = {};
  _performNORStep(booleanFunction, booleanFunction, steps, 0);

  // Get index of last meaningful entry
  let lastIndex = -1;
  while (steps[++lastIndex] && steps[lastIndex].length > 0);
  lastIndex--;

  let result;
  if (lastIndex < 0) {
    result = booleanFunction;
  } else {
    result = steps[lastIndex][steps[lastIndex].length - 1].bf;
  }
  _removeNegationBeforeLiterals(result);

  return {
    result,
    steps,
  };
}

function _performNANDStep(completeBF, bf, steps, stepI) {
  if (!steps[stepI]) steps[stepI] = [];

  if (bf instanceof BooleanFunction && bf.getLogicOperator() ===   BooleanFunctionOperator_NOT) {
    if (bf.getTerms()[0] instanceof BooleanFunction && bf.getTerms()[0].getLogicOperator() ===   BooleanFunctionOperator_AND) {
      // console.log('case: ~(_*_)');
      // ~ (_*_) => OK
      for (const subterm of bf.getTerms()[0].getTerms()) {
        _performNANDStep(completeBF, subterm, steps, stepI + 1);
      }
      // steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_DOUBLE_NEGATION, completeBF.clone()));
    } else if (bf.getTerms()[0] instanceof BooleanFunction && bf.getTerms()[0].getLogicOperator() ===   BooleanFunctionOperator_OR) {
      // console.log('case: ~(_+_)');
      // ~ (_+_) => !* => ~~!* => ~(~!* ~!*)
      bf.setLogicOperator(BooleanFunctionOperator_AND);
      const newSubterms = [];
      for (const s of bf.getTerms()[0].getTerms()) {
        newSubterms.push(new BooleanFunction(BooleanFunctionOperator_NOT, [s])); // negate all terms of original + function
      }
      bf.setTerms(newSubterms);
      steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_NOR_TO_AND, completeBF.clone()));
      // console.log(completeBF.toString());
      // !* => ~~!*
      bf.setLogicOperator(BooleanFunctionOperator_NOT);
      bf.setTerms([new BooleanFunction(BooleanFunctionOperator_NOT, [
        new BooleanFunction(BooleanFunctionOperator_AND, bf.getTerms()),
      ])]);
      steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_DOUBLE_NEGATION, completeBF.clone()));
      // console.log(completeBF.toString());
      // ~~!* => ~(~!* ~!*)
      bf.setTerms([new BooleanFunction(BooleanFunctionOperator_AND, [
        bf.getTerms()[0], bf.getTerms()[0],
      ])]);
      steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_REDUNDANT_AND, completeBF.clone()));
      // console.log(completeBF.toString());
      for (const subterm of bf.getTerms()[0].getTerms()) {
        _performNANDStep(completeBF, subterm, steps, stepI + 1);
      }
    } else if (bf.getTerms()[0] instanceof BooleanFunction && bf.getTerms()[0].getLogicOperator() ===   BooleanFunctionOperator_NOT) {
      // console.log('case: ~~x');
      // ~~x => ~(~x ~x)
      bf.setTerms([new BooleanFunction(BooleanFunctionOperator_AND, [
        bf.getTerms()[0], bf.getTerms()[0],
      ])]);
      steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_REDUNDANT_AND, completeBF.clone()));
      for (const subterm of bf.getTerms()[0].getTerms()) {
        // console.log('case: ~~x: calling for subterm' + subterm.toString());
        _performNANDStep(completeBF, subterm, steps, stepI + 1);
      }
      // console.log('output of case: ~~x: ' + completeBF.toString());
    }
    // } else if (bf.getTerms()[0] instanceof BooleanFunctionLiteral) {
    //   // ~x0 => ~x0 (internally in Literal class)
    //   console.log("REDUCING!!!!");
    //   bf.getTerms()[0].setNegated(!bf.getTerms()[0].isNegated());
    // }
  } else if (bf instanceof BooleanFunction && bf.getLogicOperator() ===   BooleanFunctionOperator_AND) {
    // * => ~~* => ~(~* ~*)
    bf.setLogicOperator(BooleanFunctionOperator_NOT);
    bf.setTerms([new BooleanFunction(BooleanFunctionOperator_NOT, [
      new BooleanFunction(BooleanFunctionOperator_AND, bf.getTerms()),
    ])]);
    steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_DOUBLE_NEGATION, completeBF.clone()));
    // console.log(completeBF.toString());
    // ~~* => ~(~* ~*)
    bf.setTerms([new BooleanFunction(BooleanFunctionOperator_AND, [
      bf.getTerms()[0], bf.getTerms()[0],
    ])]);
    steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_REDUNDANT_AND, completeBF.clone()));
    for (const subterm of bf.getTerms()[0].getTerms()) {
      // console.log('case: ~~x: calling for subterm' + subterm.toString());
      _performNANDStep(completeBF, subterm, steps, stepI + 1);
    }
    // _performNANDStep(completeBF, bf, steps, stepI); // do not count up. Should target the ~~x case
  } else if (bf instanceof BooleanFunction && bf.getLogicOperator() ===   BooleanFunctionOperator_OR) {
    // + => ~~+ => ~*
    bf.setLogicOperator(BooleanFunctionOperator_NOT);
    bf.setTerms([new BooleanFunction(BooleanFunctionOperator_NOT, [
      new BooleanFunction(BooleanFunctionOperator_OR, bf.getTerms()),
    ])]);
    steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_DOUBLE_NEGATION, completeBF.clone()));
    // console.log(completeBF.toString());
    // ~~+ => ~*
    bf.getTerms()[0].setLogicOperator(BooleanFunctionOperator_AND);
    const newSubterms = [];
    for (const s of bf.getTerms()[0].getTerms()[0].getTerms()) {
      newSubterms.push(new BooleanFunction(BooleanFunctionOperator_NOT, [s])); // negate all terms of original + function
    }
    bf.getTerms()[0].setTerms(newSubterms);
    steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_NOR_TO_AND, completeBF.clone()));
    // console.log(completeBF.toString());
    for (const subterm of bf.getTerms()[0].getTerms()) {
      _performNANDStep(completeBF, subterm, steps, stepI + 1);
    }
  }
}

function _performNORStep(completeBF, bf, steps, stepI) {
  if (!steps[stepI]) steps[stepI] = [];
  if (bf instanceof BooleanFunction && bf.getLogicOperator() ===   BooleanFunctionOperator_NOT) {
    if (bf.getTerms()[0] instanceof BooleanFunction && bf.getTerms()[0].getLogicOperator() ===   BooleanFunctionOperator_OR) {
      // console.log('case: ~(_*_)');
      // ~ (_+_) => OK
      for (const subterm of bf.getTerms()[0].getTerms()) {
        _performNORStep(completeBF, subterm, steps, stepI + 1);
      }
      // steps[stepI].push(new Step(BOOLEAN_FUNCTION_NANDIFY_STEP_DOUBLE_NEGATION, completeBF.clone()));
    } else if (bf.getTerms()[0] instanceof BooleanFunction && bf.getTerms()[0].getLogicOperator() ===   BooleanFunctionOperator_AND) {
      // console.log('case: ~(_*_)');
      // ~ (_*_) => !+ => ~~!+ => ~(~!+ ~!+)
      bf.setLogicOperator(BooleanFunctionOperator_OR);
      const newSubterms = [];
      for (const s of bf.getTerms()[0].getTerms()) {
        newSubterms.push(new BooleanFunction(BooleanFunctionOperator_NOT, [s])); // negate all terms of original + function
      }
      bf.setTerms(newSubterms);
      steps[stepI].push(new Step(BOOLEAN_FUNCTION_NORIFY_STEP_NAND_TO_OR, completeBF.clone()));
      // console.log(completeBF.toString());
      // !+ => ~~!+
      bf.setLogicOperator(BooleanFunctionOperator_NOT);
      bf.setTerms([new BooleanFunction(BooleanFunctionOperator_NOT, [
        new BooleanFunction(BooleanFunctionOperator_OR, bf.getTerms()),
      ])]);
      steps[stepI].push(new Step(BOOLEAN_FUNCTION_NORIFY_STEP_DOUBLE_NEGATION, completeBF.clone()));
      // console.log(completeBF.toString());
      // ~~!+ => ~(~!+ ~!+)
      bf.setTerms([new BooleanFunction(BooleanFunctionOperator_OR, [
        bf.getTerms()[0], bf.getTerms()[0],
      ])]);
      steps[stepI].push(new Step(BOOLEAN_FUNCTION_NORIFY_STEP_REDUNDANT_OR, completeBF.clone()));
      // console.log(completeBF.toString());
      for (const subterm of bf.getTerms()[0].getTerms()) {
        _performNORStep(completeBF, subterm, steps, stepI + 1);
      }
    } else if (bf.getTerms()[0] instanceof BooleanFunction && bf.getTerms()[0].getLogicOperator() ===   BooleanFunctionOperator_NOT) {
      // console.log('case: ~~x');
      // ~~x => ~(~x ~x)
      bf.setTerms([new BooleanFunction(BooleanFunctionOperator_OR, [
        bf.getTerms()[0], bf.getTerms()[0],
      ])]);
      steps[stepI].push(new Step(BOOLEAN_FUNCTION_NORIFY_STEP_REDUNDANT_OR, completeBF.clone()));
      for (const subterm of bf.getTerms()[0].getTerms()) {
        // console.log('case: ~~x: calling for subterm' + subterm.toString());
        _performNORStep(completeBF, subterm, steps, stepI + 1);
      }
      // console.log('output of case: ~~x: ' + completeBF.toString());
    }
  } else if (bf instanceof BooleanFunction && bf.getLogicOperator() ===   BooleanFunctionOperator_OR) {
    // + => ~~+ => ~(~+ ~+)
    bf.setLogicOperator(BooleanFunctionOperator_NOT);
    bf.setTerms([new BooleanFunction(BooleanFunctionOperator_NOT, [
      new BooleanFunction(BooleanFunctionOperator_OR, bf.getTerms()),
    ])]);
    steps[stepI].push(new Step(BOOLEAN_FUNCTION_NORIFY_STEP_DOUBLE_NEGATION, completeBF.clone()));
    // console.log(completeBF.toString());
    // ~~+ => ~(~+ ~+)
    bf.setTerms([new BooleanFunction(BooleanFunctionOperator_OR, [
      bf.getTerms()[0], bf.getTerms()[0],
    ])]);
    steps[stepI].push(new Step(BOOLEAN_FUNCTION_NORIFY_STEP_REDUNDANT_OR, completeBF.clone()));
    for (const subterm of bf.getTerms()[0].getTerms()) {
      // console.log('case: ~~x: calling for subterm' + subterm.toString());
      _performNORStep(completeBF, subterm, steps, stepI + 1);
    }
  } else if (bf instanceof BooleanFunction && bf.getLogicOperator() ===   BooleanFunctionOperator_AND) {
    // * => ~~* => ~+
    bf.setLogicOperator(BooleanFunctionOperator_NOT);
    bf.setTerms([new BooleanFunction(BooleanFunctionOperator_NOT, [
      new BooleanFunction(BooleanFunctionOperator_AND, bf.getTerms()),
    ])]);
    steps[stepI].push(new Step(BOOLEAN_FUNCTION_NORIFY_STEP_DOUBLE_NEGATION, completeBF.clone()));
    // console.log(completeBF.toString());
    // ~~* => ~+
    bf.getTerms()[0].setLogicOperator(BooleanFunctionOperator_OR);
    const newSubterms = [];
    for (const s of bf.getTerms()[0].getTerms()[0].getTerms()) {
      newSubterms.push(new BooleanFunction(BooleanFunctionOperator_NOT, [s])); // negate all terms of original + function
    }
    bf.getTerms()[0].setTerms(newSubterms);
    steps[stepI].push(new Step(BOOLEAN_FUNCTION_NORIFY_STEP_NAND_TO_OR, completeBF.clone()));
    // console.log(completeBF.toString());
    for (const subterm of bf.getTerms()[0].getTerms()) {
      _performNORStep(completeBF, subterm, steps, stepI + 1);
    }
  }
}

function _removeNegationBeforeLiterals(bf) {
  if (bf instanceof BooleanFunctionLiteral) {
    return;
  }
  for (let t = 0; t < bf.getTerms().length; t++) {
    const subterm = bf.getTerms()[t];
    if (subterm instanceof BooleanFunction
        && subterm.getLogicOperator() ===  BooleanFunctionOperator_NOT
        && subterm.getTerms()[0] instanceof BooleanFunctionLiteral) {
      // pull literal up the tree (replace NOT function and toggle internal negation of literal)
      bf.setTerm(t, new BooleanFunctionLiteral(subterm.getTerms()[0].getId(), !subterm.getTerms()[0].isNegated()));
      continue;
    }
    // Just a BooleanFunction => recursive call
    _removeNegationBeforeLiterals(subterm);
  }
}

class Step {
  constructor(actionType, bfSnapshot) {
    this.actionType = actionType;
    this.bf = bfSnapshot;
  }
}
