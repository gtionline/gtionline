import { parse as generatedParse } from './parser';
import { makeBooleanFunction } from './function';
import { makeBooleanLiteral } from './literal';
import { makeBooleanVariable } from './variable';
import { BooleanOperation, makeBooleanOperation } from './operation';

function parse(string) {
  return generatedParse(string, {
    BooleanOperation,
    makeBooleanOperation,
    makeBooleanFunction,
    makeBooleanLiteral,
    makeBooleanVariable,
  });
}

export function parseBooleanFunction(string) {
  return parse(string);
}

export function parseBooleanExpression(string) {
  return parse(string);
}
