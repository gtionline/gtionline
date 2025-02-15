import { BooleanVariable } from './variable';

function findVariables(expression) {
  if (expression instanceof BooleanVariable) {
    return [expression.name];
  }
  const children = expression.children();
  let variables = [];
  for (let i = 0; i < children.length; i += 1) {
    variables = variables.concat(findVariables(children[i]));
  }

  return variables;
}

/**
 * Represents a named Boolean function together with its variables.
 * @constructor
 * @param {string} [name] The name of the function
 * @param {BooleanExpression} expression The Boolean expression of this function
 */
class BooleanFunction {
  constructor(name, expression, variables) {
    this.name = name;
    this.expression = expression;

    if (variables) {
      this.variables = new Set(variables.concat(findVariables(expression)));
    } else {
      this.variables = new Set(findVariables(expression));
    }
  }

  toString() {
    return `${this.name}(${[...this.variables].join(',')}) = ${this.expression.toString()}`;
  }

  toLatex() {
    return `$${this.name}(${[...this.variables].join(',')}) = ${this.expression.toLatex()}$`;
  }

  eval(variables) {
    return this.expression.eval(variables);
  }
}

export function makeBooleanFunction(name, exp) {
  return new BooleanFunction(
    name,
    exp,
    null,
  );
}
