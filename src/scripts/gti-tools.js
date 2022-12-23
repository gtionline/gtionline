function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var BooleanExpression = {
  OPERATOR: 'op',
  VARIABLE: 'var',
  LITERAL: 'lit'
};
var BooleanExpressionBase = /*#__PURE__*/function () {
  function BooleanExpressionBase() {
    _classCallCheck(this, BooleanExpressionBase);
  }

  _createClass(BooleanExpressionBase, [{
    key: "hasChildren",
    value: function hasChildren() {
      return false;
    }
  }, {
    key: "children",
    value: function children() {
      return [];
    }
  }]);

  return BooleanExpressionBase;
}();

var BooleanLiteral = /*#__PURE__*/function (_BooleanExpressionBas) {
  _inherits(BooleanLiteral, _BooleanExpressionBas);

  var _super = _createSuper(BooleanLiteral);

  function BooleanLiteral(value) {
    var _this;

    _classCallCheck(this, BooleanLiteral);

    _this = _super.call(this);
    _this.kind = BooleanExpression.LITERAL;

    if (value === '0') {
      _this.value = false;
    } else if (value === '1') {
      _this.value = true;
    } else {
      _this.value = !!value;
    }

    return _this;
  }

  _createClass(BooleanLiteral, [{
    key: "toString",
    value: function toString() {
      return this.value ? '1' : '0';
    }
  }, {
    key: "eval",
    value: function _eval() {
      return this.value;
    }
  }]);

  return BooleanLiteral;
}(BooleanExpressionBase);
function makeBooleanLiteral(value) {
  return new BooleanLiteral(value);
}

var BooleanVariable = /*#__PURE__*/function (_BooleanExpressionBas) {
  _inherits(BooleanVariable, _BooleanExpressionBas);

  var _super = _createSuper(BooleanVariable);

  function BooleanVariable(name) {
    var _this;

    _classCallCheck(this, BooleanVariable);

    _this = _super.call(this);
    _this.kind = BooleanExpression.VARIABLE;
    _this.name = name;
    return _this;
  }

  _createClass(BooleanVariable, [{
    key: "toString",
    value: function toString() {
      return this.name;
    }
  }, {
    key: "eval",
    value: function _eval(variable) {
      return variable[this.name];
    }
  }]);

  return BooleanVariable;
}(BooleanExpressionBase);
function makeBooleanVariable(name) {
  return new BooleanVariable(name);
}

var BooleanOperation = {
  NOT: 'not',
  AND: 'and',
  OR: 'or',
  XOR: 'xor',
  XNOR: 'xnor',
  NAND: 'nand',
  NOR: 'nor',
  IMPLIES: 'implies'
};
var Execute = {
  not: function not(x) {
    return !x;
  },
  and: function and(x, y) {
    return x && y;
  },
  or: function or(x, y) {
    return x || y;
  },
  xor: function xor(x, y) {
    return x && !y || !x && y;
  },
  xnor: function xnor(x, y) {
    return !(x && !y || !x && y);
  },
  nand: function nand(x, y) {
    return !(x && y);
  },
  nor: function nor(x, y) {
    return !(x || y);
  },
  implies: function implies(x, y) {
    return x || y;
  }
};
var NAryExpression = /*#__PURE__*/function (_BooleanExpressionBas) {
  _inherits(NAryExpression, _BooleanExpressionBas);

  var _super = _createSuper(NAryExpression);

  function NAryExpression(op, operands, hasParentheses) {
    var _this;

    _classCallCheck(this, NAryExpression);

    if (operands.length < 2) {
      throw Error('at least two operands are required for an n-ary expression');
    }

    _this = _super.call(this);
    _this.kind = BooleanExpression.OPERATOR;
    _this.operator = op;
    _this.operands = operands;
    _this.hasParentheses = hasParentheses;
    return _this;
  }

  _createClass(NAryExpression, [{
    key: "toString",
    value: function toString() {
      var string = this.operands.map(function (operand) {
        return operand.toString();
      }).join(" ".concat(this.operator, " "));

      if (this.hasParentheses) {
        return "(".concat(string, ")");
      } else {
        return string;
      }
    }
  }, {
    key: "toStringWithoutParentheses",
    value: function toStringWithoutParentheses() {
      return this.operands.map(function (operand) {
        return operand.toString();
      }).join(" ".concat(this.operator, " "));
    }
  }, {
    key: "toLatex",
    value: function toLatex() {
      var string = this.operands.map(function (operand) {
        return operand.toLatex();
      }).join(this.operator);

      if (this.hasParentheses) {
        return "(".concat(string, ")");
      } else {
        return string;
      }
    }
  }, {
    key: "hasChildren",
    value: function hasChildren() {
      return true;
    }
  }, {
    key: "children",
    value: function children() {
      return this.operands;
    }
  }, {
    key: "eval",
    value: function _eval(variables) {
      var ret = this.operands[0].eval(variables);

      for (var i = 1; i < this.operands.length; i++) {
        ret = Execute[this.operator](ret, this.operands[i].eval(variables));
      }

      return ret;
    }
  }]);

  return NAryExpression;
}(BooleanExpressionBase);
var UnaryExpression = /*#__PURE__*/function (_BooleanExpressionBas2) {
  _inherits(UnaryExpression, _BooleanExpressionBas2);

  var _super2 = _createSuper(UnaryExpression);

  function UnaryExpression(op, operands, hasParentheses) {
    var _this2;

    _classCallCheck(this, UnaryExpression);

    if (operands.length !== 1) {
      throw Error('exactly one operand is required for a unary expression');
    }

    _this2 = _super2.call(this);
    _this2.kind = BooleanExpression.OPERATOR;
    _this2.operator = op;

    var _operands = _slicedToArray(operands, 1);

    _this2.operand = _operands[0];
    _this2.hasParentheses = hasParentheses;
    return _this2;
  }

  _createClass(UnaryExpression, [{
    key: "toString",
    value: function toString() {
      var string = "".concat(this.operator, " ").concat(this.operand);

      if (this.hasParentheses) {
        return "(".concat(string, ")");
      } else {
        return string;
      }
    }
  }, {
    key: "hasChildren",
    value: function hasChildren() {
      return true;
    }
  }, {
    key: "toLatex",
    value: function toLatex() {
      return this.operands;
    }
  }, {
    key: "children",
    value: function children() {
      return [this.operand];
    }
  }, {
    key: "eval",
    value: function _eval(variables) {
      return Execute[this.operator](this.operands[0].eval(variables));
    }
  }]);

  return UnaryExpression;
}(BooleanExpressionBase);
function makeBooleanOperation(operator, operands, hasParentheses) {
  if (operator === BooleanOperation.NOT) {
    return new UnaryExpression(operator, [operands], hasParentheses);
  } else {
    return new NAryExpression(operator, operands, hasParentheses);
  }
}

function findVariables(expression) {
  if (expression instanceof BooleanVariable) {
    return [expression.name];
  } else {
    var children = expression.children();
    var variables = [];

    for (var i = 0; i < children.length; i++) {
      variables = variables.concat(findVariables(children[i]));
    }

    return variables;
  }
}
/**
 * Represents a named Boolean function together with its variables.
 * @constructor
 * @param {string} [name] The name of the function
 * @param {BooleanExpression} expression The Boolean expression of this function
 */


var BooleanFunction = /*#__PURE__*/function () {
  function BooleanFunction(name, expression, variables) {
    _classCallCheck(this, BooleanFunction);

    this.name = name;
    this.expression = expression;

    if (variables) {
      this.variables = new Set(variables.concat(findVariables(expression)));
    } else {
      this.variables = new Set(findVariables(expression));
    }
  }

  _createClass(BooleanFunction, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, "(").concat(_toConsumableArray(this.variables).join(','), ") = ").concat(this.expression.toString());
    }
  }, {
    key: "toLatex",
    value: function toLatex() {
      return "$".concat(this.name, "(").concat(_toConsumableArray(this.variables).join(','), ") = ").concat(this.expression.toLatex(), "$");
    }
  }, {
    key: "eval",
    value: function _eval(variables) {
      return this.expression.eval(variables);
    }
  }]);

  return BooleanFunction;
}();

function makeBooleanFunction(name, exp) {
  return new BooleanFunction(name, exp, null);
}

// Generated by PEG.js v0.11.0-master.f69239d, https://pegjs.org/
function peg$subclass(child, parent) {
  function C() {
    this.constructor = child;
  }

  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  this.message = message;
  this.expected = expected;
  this.found = found;
  this.location = location;
  this.name = "SyntaxError"; // istanbul ignore next

  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(this, peg$SyntaxError);
  }
}

peg$subclass(peg$SyntaxError, Error);

peg$SyntaxError.buildMessage = function (expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function literal(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },
    "class": function _class(expectation) {
      var escapedParts = expectation.parts.map(function (part) {
        return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
      });
      return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
    },
    any: function any() {
      return "any character";
    },
    end: function end() {
      return "end of input";
    },
    other: function other(expectation) {
      return expectation.description;
    },
    not: function not(expectation) {
      return "not " + describeExpectation(expectation.expected);
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
      return "\\x" + hex(ch);
    });
  }

  function classEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
      return "\\x" + hex(ch);
    });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;
    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }

      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};
  var peg$FAILED = {};
  var peg$startRuleFunctions = {
    Function: peg$parseFunction
  };
  var peg$startRuleFunction = peg$parseFunction;
  var peg$c0 = "=";
  var peg$c1 = "^";
  var peg$c2 = "xor";
  var peg$c3 = "<=>";
  var peg$c4 = "xnor";
  var peg$c5 = "nor";
  var peg$c6 = "+";
  var peg$c7 = "|";
  var peg$c8 = "or";
  var peg$c9 = "nand";
  var peg$c10 = "*";
  var peg$c11 = "&";
  var peg$c12 = "and";
  var peg$c13 = "!";
  var peg$c14 = "~";
  var peg$c15 = "not";
  var peg$c16 = "0";
  var peg$c17 = "1";
  var peg$c18 = "(";
  var peg$c19 = ")";
  var peg$r0 = /^[a-zA-Z]/;
  var peg$r1 = /^[0-9]/;
  var peg$r2 = /^[ \t\r\n]/;
  var peg$e0 = peg$literalExpectation("=", false);
  var peg$e1 = peg$literalExpectation("^", false);
  var peg$e2 = peg$literalExpectation("xor", false);
  var peg$e3 = peg$literalExpectation("<=>", false);
  var peg$e4 = peg$literalExpectation("xnor", false);
  var peg$e5 = peg$literalExpectation("nor", false);
  var peg$e6 = peg$literalExpectation("+", false);
  var peg$e7 = peg$literalExpectation("|", false);
  var peg$e8 = peg$literalExpectation("or", false);
  var peg$e9 = peg$literalExpectation("nand", false);
  var peg$e10 = peg$literalExpectation("*", false);
  var peg$e11 = peg$literalExpectation("&", false);
  var peg$e12 = peg$literalExpectation("and", false);
  var peg$e13 = peg$literalExpectation("!", false);
  var peg$e14 = peg$literalExpectation("~", false);
  var peg$e15 = peg$literalExpectation("not", false);
  var peg$e16 = peg$literalExpectation("0", false);
  var peg$e17 = peg$literalExpectation("1", false);
  var peg$e18 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
  var peg$e19 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e20 = peg$literalExpectation("(", false);
  var peg$e21 = peg$literalExpectation(")", false);
  var peg$e22 = peg$classExpectation([" ", "\t", "\r", "\n"], false, false);

  var peg$f0 = function peg$f0(name, expression) {
    return makeFunction(name ? name[0].toString() : null, expression);
  };

  var peg$f1 = function peg$f1(head, tail) {
    if (tail.length > 0) {
      return makeOperation(BooleanOperation.XOR, [head].concat(tail.map(function (x) {
        return x[1];
      })), false);
    } else {
      return head;
    }
  };

  var peg$f2 = function peg$f2(head, tail) {
    if (tail.length > 0) {
      return makeOperation(BooleanOperation.XNOR, [head].concat(tail.map(function (x) {
        return x[1];
      })), false);
    } else {
      return head;
    }
  };

  var peg$f3 = function peg$f3(head, tail) {
    if (tail.length > 0) {
      return makeOperation(BooleanOperation.NOR, [head].concat(tail.map(function (x) {
        return x[1];
      })), false);
    } else {
      return head;
    }
  };

  var peg$f4 = function peg$f4(head, tail) {
    if (tail.length > 0) {
      return makeOperation(BooleanOperation.OR, [head].concat(tail.map(function (x) {
        return x[1];
      })), false);
    } else {
      return head;
    }
  };

  var peg$f5 = function peg$f5(head, tail) {
    if (tail.length > 0) {
      return makeOperation(BooleanOperation.NAND, [head].concat(tail.map(function (x) {
        return x[1];
      })), false);
    } else {
      return head;
    }
  };

  var peg$f6 = function peg$f6(head, tail) {
    if (tail.length > 0) {
      return makeOperation(BooleanOperation.AND, [head].concat(tail.map(function (x) {
        return x[1];
      })), false);
    } else {
      return head;
    }
  };

  var peg$f7 = function peg$f7(term) {
    return makeOperation(BooleanOperation.NOT, term, false);
  };

  var peg$f8 = function peg$f8(term) {
    term.hasParentheses = true;
    return term;
  };

  var peg$f9 = function peg$f9(value) {
    return makeLiteral(value);
  };

  var peg$f10 = function peg$f10(characters) {
    return makeVariable(characters[0].join('') + characters[1].join(''));
  };

  var peg$currPos = 0;
  var peg$posDetailsCache = [{
    line: 1,
    column: 1
  }];
  var peg$expected = [];
  var peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function peg$literalExpectation(text, ignoreCase) {
    return {
      type: "literal",
      text: text,
      ignoreCase: ignoreCase
    };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return {
      type: "class",
      parts: parts,
      inverted: inverted,
      ignoreCase: ignoreCase
    };
  }

  function peg$endExpectation() {
    return {
      type: "end"
    };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      p = pos - 1;

      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;
      return details;
    }
  }

  var peg$VALIDFILENAME = typeof options.filename === "string" && options.filename.length > 0;

  function peg$computeLocation(startPos, endPos) {
    var loc = {};
    if (peg$VALIDFILENAME) loc.filename = options.filename;
    var startPosDetails = peg$computePosDetails(startPos);
    loc.start = {
      offset: startPos,
      line: startPosDetails.line,
      column: startPosDetails.column
    };
    var endPosDetails = peg$computePosDetails(endPos);
    loc.end = {
      offset: endPos,
      line: endPosDetails.line,
      column: endPosDetails.column
    };
    return loc;
  }

  function peg$begin() {
    peg$expected.push({
      pos: peg$currPos,
      variants: []
    });
  }

  function peg$expect(expected) {
    var top = peg$expected[peg$expected.length - 1];

    if (peg$currPos < top.pos) {
      return;
    }

    if (peg$currPos > top.pos) {
      top.pos = peg$currPos;
      top.variants = [];
    }

    top.variants.push(expected);
  }

  function peg$end(invert) {
    var expected = peg$expected.pop();
    var top = peg$expected[peg$expected.length - 1];
    var variants = expected.variants;

    if (top.pos !== expected.pos) {
      return;
    }

    if (invert) {
      variants = variants.map(function (e) {
        return e.type === "not" ? e.expected : {
          type: "not",
          expected: e
        };
      });
    }

    Array.prototype.push.apply(top.variants, variants);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(peg$SyntaxError.buildMessage(expected, found), expected, found, location);
  }

  function peg$buildError() {
    var expected = peg$expected[0];
    var failPos = expected.pos;
    return peg$buildStructuredError(expected.variants, failPos < input.length ? input.charAt(failPos) : null, failPos < input.length ? peg$computeLocation(failPos, failPos + 1) : peg$computeLocation(failPos, failPos));
  }

  function peg$parseFunction() {
    var s0, s1, s2, s3;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseVariable();

    if (s2 !== peg$FAILED) {
      rule$expects(peg$e0);

      if (input.charCodeAt(peg$currPos) === 61) {
        s3 = peg$c0;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        s2 = [s2, s3];
        s1 = s2;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 === peg$FAILED) {
      s1 = null;
    }

    s2 = peg$parseXorTerm();

    if (s2 !== peg$FAILED) {
      s0 = peg$f0(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseXorTerm() {
    var s0, s1, s2, s3, s4, s5;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = peg$parseXnorTerm();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      rule$expects(peg$e1);

      if (input.charCodeAt(peg$currPos) === 94) {
        s4 = peg$c1;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
      }

      if (s4 === peg$FAILED) {
        rule$expects(peg$e2);

        if (input.substr(peg$currPos, 3) === peg$c2) {
          s4 = peg$c2;
          peg$currPos += 3;
        } else {
          s4 = peg$FAILED;
        }
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseXnorTerm();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        rule$expects(peg$e1);

        if (input.charCodeAt(peg$currPos) === 94) {
          s4 = peg$c1;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
        }

        if (s4 === peg$FAILED) {
          rule$expects(peg$e2);

          if (input.substr(peg$currPos, 3) === peg$c2) {
            s4 = peg$c2;
            peg$currPos += 3;
          } else {
            s4 = peg$FAILED;
          }
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseXnorTerm();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      s0 = peg$f1(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseXnorTerm() {
    var s0, s1, s2, s3, s4, s5;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = peg$parseNorTerm();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      rule$expects(peg$e3);

      if (input.substr(peg$currPos, 3) === peg$c3) {
        s4 = peg$c3;
        peg$currPos += 3;
      } else {
        s4 = peg$FAILED;
      }

      if (s4 === peg$FAILED) {
        rule$expects(peg$e4);

        if (input.substr(peg$currPos, 4) === peg$c4) {
          s4 = peg$c4;
          peg$currPos += 4;
        } else {
          s4 = peg$FAILED;
        }
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseNorTerm();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        rule$expects(peg$e3);

        if (input.substr(peg$currPos, 3) === peg$c3) {
          s4 = peg$c3;
          peg$currPos += 3;
        } else {
          s4 = peg$FAILED;
        }

        if (s4 === peg$FAILED) {
          rule$expects(peg$e4);

          if (input.substr(peg$currPos, 4) === peg$c4) {
            s4 = peg$c4;
            peg$currPos += 4;
          } else {
            s4 = peg$FAILED;
          }
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseNorTerm();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      s0 = peg$f2(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNorTerm() {
    var s0, s1, s2, s3, s4, s5;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = peg$parseOrTerm();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      rule$expects(peg$e5);

      if (input.substr(peg$currPos, 3) === peg$c5) {
        s4 = peg$c5;
        peg$currPos += 3;
      } else {
        s4 = peg$FAILED;
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseOrTerm();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        rule$expects(peg$e5);

        if (input.substr(peg$currPos, 3) === peg$c5) {
          s4 = peg$c5;
          peg$currPos += 3;
        } else {
          s4 = peg$FAILED;
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseOrTerm();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      s0 = peg$f3(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseOrTerm() {
    var s0, s1, s2, s3, s4, s5;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = peg$parseNandTerm();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      rule$expects(peg$e6);

      if (input.charCodeAt(peg$currPos) === 43) {
        s4 = peg$c6;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
      }

      if (s4 === peg$FAILED) {
        rule$expects(peg$e7);

        if (input.charCodeAt(peg$currPos) === 124) {
          s4 = peg$c7;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
        }

        if (s4 === peg$FAILED) {
          rule$expects(peg$e8);

          if (input.substr(peg$currPos, 2) === peg$c8) {
            s4 = peg$c8;
            peg$currPos += 2;
          } else {
            s4 = peg$FAILED;
          }
        }
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseNandTerm();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        rule$expects(peg$e6);

        if (input.charCodeAt(peg$currPos) === 43) {
          s4 = peg$c6;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
        }

        if (s4 === peg$FAILED) {
          rule$expects(peg$e7);

          if (input.charCodeAt(peg$currPos) === 124) {
            s4 = peg$c7;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
          }

          if (s4 === peg$FAILED) {
            rule$expects(peg$e8);

            if (input.substr(peg$currPos, 2) === peg$c8) {
              s4 = peg$c8;
              peg$currPos += 2;
            } else {
              s4 = peg$FAILED;
            }
          }
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseNandTerm();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      s0 = peg$f4(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNandTerm() {
    var s0, s1, s2, s3, s4, s5;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = peg$parseAndTerm();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      rule$expects(peg$e9);

      if (input.substr(peg$currPos, 4) === peg$c9) {
        s4 = peg$c9;
        peg$currPos += 4;
      } else {
        s4 = peg$FAILED;
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseAndTerm();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        rule$expects(peg$e9);

        if (input.substr(peg$currPos, 4) === peg$c9) {
          s4 = peg$c9;
          peg$currPos += 4;
        } else {
          s4 = peg$FAILED;
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseAndTerm();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      s0 = peg$f5(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseAndTerm() {
    var s0, s1, s2, s3, s4, s5;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = peg$parseNotTerm();

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      rule$expects(peg$e10);

      if (input.charCodeAt(peg$currPos) === 42) {
        s4 = peg$c10;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
      }

      if (s4 === peg$FAILED) {
        rule$expects(peg$e11);

        if (input.charCodeAt(peg$currPos) === 38) {
          s4 = peg$c11;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
        }

        if (s4 === peg$FAILED) {
          rule$expects(peg$e12);

          if (input.substr(peg$currPos, 3) === peg$c12) {
            s4 = peg$c12;
            peg$currPos += 3;
          } else {
            s4 = peg$FAILED;
          }
        }
      }

      if (s4 !== peg$FAILED) {
        s5 = peg$parseNotTerm();

        if (s5 !== peg$FAILED) {
          s4 = [s4, s5];
          s3 = s4;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        rule$expects(peg$e10);

        if (input.charCodeAt(peg$currPos) === 42) {
          s4 = peg$c10;
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
        }

        if (s4 === peg$FAILED) {
          rule$expects(peg$e11);

          if (input.charCodeAt(peg$currPos) === 38) {
            s4 = peg$c11;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
          }

          if (s4 === peg$FAILED) {
            rule$expects(peg$e12);

            if (input.substr(peg$currPos, 3) === peg$c12) {
              s4 = peg$c12;
              peg$currPos += 3;
            } else {
              s4 = peg$FAILED;
            }
          }
        }

        if (s4 !== peg$FAILED) {
          s5 = peg$parseNotTerm();

          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      s0 = peg$f6(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNotTerm() {
    var s0, s1, s2, s3;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseWhitespace();

    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseWhitespace();
    }

    rule$expects(peg$e13);

    if (input.charCodeAt(peg$currPos) === 33) {
      s2 = peg$c13;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
    }

    if (s2 === peg$FAILED) {
      rule$expects(peg$e14);

      if (input.charCodeAt(peg$currPos) === 126) {
        s2 = peg$c14;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
      }

      if (s2 === peg$FAILED) {
        rule$expects(peg$e15);

        if (input.substr(peg$currPos, 3) === peg$c15) {
          s2 = peg$c15;
          peg$currPos += 3;
        } else {
          s2 = peg$FAILED;
        }
      }
    }

    if (s2 !== peg$FAILED) {
      s3 = peg$parsePrimaryTerm();

      if (s3 !== peg$FAILED) {
        s0 = peg$f7(s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      s0 = peg$parsePrimaryTerm();
    }

    return s0;
  }

  function peg$parsePrimaryTerm() {
    var s0, s1, s2, s3;

    s0 = peg$parseVariable();

    if (s0 === peg$FAILED) {
      s0 = peg$parseLiteral();

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseLeftParenthesis();

        if (s1 !== peg$FAILED) {
          s2 = peg$parseXorTerm();

          if (s2 !== peg$FAILED) {
            s3 = peg$parseRightParenthesis();

            if (s3 !== peg$FAILED) {
              s0 = peg$f8(s2);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }
    }

    return s0;
  }

  function peg$parseLiteral() {
    var s0, s1, s2, s3, s4;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseWhitespace();

    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseWhitespace();
    }

    rule$expects(peg$e16);

    if (input.charCodeAt(peg$currPos) === 48) {
      s2 = peg$c16;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
    }

    if (s2 === peg$FAILED) {
      rule$expects(peg$e17);

      if (input.charCodeAt(peg$currPos) === 49) {
        s2 = peg$c17;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
      }
    }

    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parseWhitespace();

      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parseWhitespace();
      }
      s0 = peg$f9(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseVariable() {
    var s0, s1, s2, s3, s4, s5, s6;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$begin();
    s2 = peg$parseOperators();
    peg$end(true);

    if (s2 === peg$FAILED) {
      s1 = undefined;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseWhitespace();

      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseWhitespace();
      }

      s3 = peg$currPos;
      s4 = [];
      rule$expects(peg$e18);

      if (peg$r0.test(input.charAt(peg$currPos))) {
        s5 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
      }

      if (s5 !== peg$FAILED) {
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          rule$expects(peg$e18);

          if (peg$r0.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
          }
        }
      } else {
        s4 = peg$FAILED;
      }

      if (s4 !== peg$FAILED) {
        s5 = [];
        rule$expects(peg$e19);

        if (peg$r1.test(input.charAt(peg$currPos))) {
          s6 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
        }

        while (s6 !== peg$FAILED) {
          s5.push(s6);
          rule$expects(peg$e19);

          if (peg$r1.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
          }
        }

        s4 = [s4, s5];
        s3 = s4;
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }

      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$parseWhitespace();

        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$parseWhitespace();
        }
        s0 = peg$f10(s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseLeftParenthesis() {
    var s0, s1, s2, s3, s4;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseWhitespace();

    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseWhitespace();
    }

    rule$expects(peg$e20);

    if (input.charCodeAt(peg$currPos) === 40) {
      s2 = peg$c18;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
    }

    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parseWhitespace();

      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parseWhitespace();
      }

      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseRightParenthesis() {
    var s0, s1, s2, s3, s4;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseWhitespace();

    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseWhitespace();
    }

    rule$expects(peg$e21);

    if (input.charCodeAt(peg$currPos) === 41) {
      s2 = peg$c19;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
    }

    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parseWhitespace();

      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parseWhitespace();
      }

      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseWhitespace() {
    var s0, s1;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    s0 = [];
    rule$expects(peg$e22);

    if (peg$r2.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
    }

    if (s1 !== peg$FAILED) {
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        rule$expects(peg$e22);

        if (peg$r2.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
        }
      }
    } else {
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseOperators() {
    var s0;

    var rule$expects = function rule$expects(expected) {
      peg$expect(expected);
    };

    rule$expects(peg$e12);

    if (input.substr(peg$currPos, 3) === peg$c12) {
      s0 = peg$c12;
      peg$currPos += 3;
    } else {
      s0 = peg$FAILED;
    }

    if (s0 === peg$FAILED) {
      rule$expects(peg$e8);

      if (input.substr(peg$currPos, 2) === peg$c8) {
        s0 = peg$c8;
        peg$currPos += 2;
      } else {
        s0 = peg$FAILED;
      }

      if (s0 === peg$FAILED) {
        rule$expects(peg$e2);

        if (input.substr(peg$currPos, 3) === peg$c2) {
          s0 = peg$c2;
          peg$currPos += 3;
        } else {
          s0 = peg$FAILED;
        }

        if (s0 === peg$FAILED) {
          rule$expects(peg$e15);

          if (input.substr(peg$currPos, 3) === peg$c15) {
            s0 = peg$c15;
            peg$currPos += 3;
          } else {
            s0 = peg$FAILED;
          }

          if (s0 === peg$FAILED) {
            rule$expects(peg$e4);

            if (input.substr(peg$currPos, 4) === peg$c4) {
              s0 = peg$c4;
              peg$currPos += 4;
            } else {
              s0 = peg$FAILED;
            }

            if (s0 === peg$FAILED) {
              rule$expects(peg$e9);

              if (input.substr(peg$currPos, 4) === peg$c9) {
                s0 = peg$c9;
                peg$currPos += 4;
              } else {
                s0 = peg$FAILED;
              }

              if (s0 === peg$FAILED) {
                rule$expects(peg$e5);

                if (input.substr(peg$currPos, 3) === peg$c5) {
                  s0 = peg$c5;
                  peg$currPos += 3;
                } else {
                  s0 = peg$FAILED;
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  var BooleanOperation = options.BooleanOperation;
  var makeFunction = options.makeBooleanFunction;
  var makeOperation = options.makeBooleanOperation;
  var makeVariable = options.makeBooleanVariable;
  var makeLiteral = options.makeBooleanLiteral;
  peg$begin();
  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$expect(peg$endExpectation());
    }

    throw peg$buildError();
  }
}

function parse(string) {
  return peg$parse(string, {
    BooleanOperation: BooleanOperation,
    makeBooleanOperation: makeBooleanOperation,
    makeBooleanFunction: makeBooleanFunction,
    makeBooleanLiteral: makeBooleanLiteral,
    makeBooleanVariable: makeBooleanVariable
  });
}

function parseBooleanFunction(string) {
  return parse(string);
}

/* eslint no-use-before-define: [1, 'nofunc'] */

function literalToLaTeX(literal) {
  return literal.value ? '1' : '0';
}

function variableToLaTeX(literal) {
  return literal.name;
}

function operationToLaTeX(operation) {
  if (operation.operator === BooleanOperation.NOT) {
    var operand = expressionToLaTeX(operation.operand);
    return "\\overline{".concat(operand, "}");
  } else {
    var op = '';

    switch (operation.operator) {
      case BooleanOperation.AND:
        op = '\\cdot ';
        break;

      case BooleanOperation.OR:
        op = '+';
        break;

      case BooleanOperation.NAND:
        op = '\\operatorname{nand}';
        break;

      case BooleanOperation.NOR:
        op = '\\operatorname{nor}';
        break;

      case BooleanOperation.XNOR:
        op = '\\oplus';
        break;

      case BooleanOperation.IMPLIES:
        op = '\\implies';
        break;

      default:
        throw new Error('invalid operator');
    }

    var operands = operation.operands.map(function (operand) {
      return expressionToLaTeX(operand);
    });
    return operands.join(op);
  }
}

function expressionToLaTeX(expression) {
  var latex = '';

  switch (expression.kind) {
    case BooleanExpression.LITERAL:
      latex = literalToLaTeX(expression);
      break;

    case BooleanExpression.VARIABLE:
      latex = variableToLaTeX(expression);
      break;

    case BooleanExpression.OPERATOR:
      latex = operationToLaTeX(expression);
      break;

    default:
      throw new Error('invalid expression kind');
  }

  if (expression.hasParentheses) {
    latex = "\\left(".concat(latex, "\\right)");
  }

  return latex;
}

function toLaTeX(expression) {
  return expressionToLaTeX(expression);
}

/**
 * Represents a connection point of a part BooleanExpression in the CMOS circuit.
 * @constructor
 * @param {string} name The name of the connector: variable name or string
 * representation of the  corresponding boolean expression
 */
var CMOSConnector = function CMOSConnector(name) {
  _classCallCheck(this, CMOSConnector);

  this.name = name;
  this.pos = null;
};

var CMOSTransistorType = {
  PMOS: 'PMOS',
  NMOS: 'NMOS'
};
/**
 * Represents a transistor in a CMOS circuit
 * @constructor
 * @param {CCMOSTransistorType} type The transistor type
 * @param {CMOSConnector} gateConnector The connector for the transistor gate
 */

var CMOSTransistor = function CMOSTransistor(type, gateConnector) {
  _classCallCheck(this, CMOSTransistor);

  this.type = type;
  this.gateConnector = gateConnector;
  this.pos = null;
};

var CMOSElementUnionType = {
  SERIES: 'SERIES',
  PARALLEL: 'PARALLEL'
};
/**
 * Represents an element in the CMOS circuit whose children can be either in SERIES or in PARALLEL
 * @constructor
 * @param {CMOSElementUnionType} unionType The union type of this element's children
 */

var CMOSElement = function CMOSElement(unionType) {
  _classCallCheck(this, CMOSElement);

  this.unionType = unionType;
  /**
   * The child elements
   * @type {Array.<CMOSElement, CMOSTransistor>}
   */

  this.children = [];
};

var CMOSWire = /*#__PURE__*/function () {
  function CMOSWire(posFrom, posTo) {
    _classCallCheck(this, CMOSWire);

    this.posFrom = posFrom;
    this.posTo = posTo; // Correct wrong order

    if (this.isVertical() && this.posFrom.x > this.posTo.x || this.isHorizontal() && this.posFrom.y > this.posTo.y) {
      this.posFrom = posTo;
      this.posTo = posFrom;
    }
  }

  _createClass(CMOSWire, [{
    key: "isHorizontal",
    value: function isHorizontal() {
      return this.posFrom.x === this.posTo.x;
    }
  }, {
    key: "isVertical",
    value: function isVertical() {
      return this.posFrom.y === this.posTo.y;
    }
  }]);

  return CMOSWire;
}();

var CMOSWireDirection = {
  NORTH: 1,
  EAST: 2,
  SOUTH: 3,
  WEST: 4
};
/**
 * Represents the position of a wire in a CMOS grid
 * @constructor
 * @param {number} x The x coordinate in the Grid of this position
 * @param {number} y The y coordinate in the Grid of this position
 * @param {CMOSWireDirection} [direction] The direction the wire has at this position
 */

var CMOSWirePosition = /*#__PURE__*/function () {
  function CMOSWirePosition(x, y, direction) {
    _classCallCheck(this, CMOSWirePosition);

    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  _createClass(CMOSWirePosition, [{
    key: "equals",
    value: function equals(other) {
      return other instanceof CMOSWirePosition && this.x === other.x && this.y === other.y && (!this.direction || !other.direction || this.direction === other.direction);
    }
  }]);

  return CMOSWirePosition;
}();

/**
 * Represents a text label inside a CMOS grid
 * @constructor
 * @param {string} text The text of the label
 * @param {boolean} [rightAligned=false] Specifies whether this label is right aligned or not
 */
var CMOSLabel = function CMOSLabel(text, rightAligned) {
  _classCallCheck(this, CMOSLabel);

  this.text = text;
  this.rightAligned = rightAligned || false;
};

var CMOSGridElement = /*#__PURE__*/function () {
  function CMOSGridElement() {
    _classCallCheck(this, CMOSGridElement);

    /**
     * Content of this element
     * @type {Array<CMOSWire|CMOSTransistor|CMOSConnector>}
     */
    this.content = [];
  }
  /**
   * Checks if a specific content is in this this element
   * @param {CMOSConnector|CMOSTransistor|CMOSWire} content The content item that should be checked
   * @return {boolean}
   */


  _createClass(CMOSGridElement, [{
    key: "contains",
    value: function contains(content) {
      return this.content.indexOf(content) >= 0;
    }
    /**
     * Checks whether this is a transistor element
     * @return {boolean}
     */

  }, {
    key: "isTransistor",
    value: function isTransistor() {
      return this.content.length >= 1 && this.content[0] instanceof CMOSTransistor;
    }
    /**
     * Returns the number of wires in this element
     * @return {number}
     */

  }, {
    key: "wireCount",
    value: function wireCount() {
      var c = 0;

      for (var i = 0; i < this.content.length; ++i) {
        if (this.content[i] instanceof CMOSWire) {
          ++c;
        }
      }

      return c;
    }
    /**
     * Returns the nth wire of this element
     * @param {number} n The index of the wire to retrieve
     * @return {CMOSWire}
     */

  }, {
    key: "wireAt",
    value: function wireAt(n) {
      var c = 0;

      for (var i = 0; i < this.content.length; ++i) {
        if (this.content[i] instanceof CMOSWire) {
          if (c === n) {
            return this.content[i];
          }

          ++c;
        }
      }

      return null;
    }
    /**
     * Checks whether this is a wire element
     * @return {boolean}
     */

  }, {
    key: "isWire",
    value: function isWire() {
      return this.wireCount() === this.content.length;
    }
    /**
     * Checks whether this is a wire and/or connector element
     * @return {boolean}
     */

  }, {
    key: "isWireOrConnector",
    value: function isWireOrConnector() {
      for (var i = 0; i < this.content.length; ++i) {
        if (!(this.content[i] instanceof CMOSWire || this.content[i] instanceof CMOSConnector)) {
          return false;
        }
      }

      return true;
    }
  }]);

  return CMOSGridElement;
}();

/**
 * Represents a CMOS Grid
 * @constructor
 * @param {CMOSGridElementSize} [size] The size of the grid
 */

var CMOSGrid = /*#__PURE__*/function () {
  function CMOSGrid(size) {
    _classCallCheck(this, CMOSGrid);

    /**
     * The grid matrix
     * @type {CMOSGridElement[][]}
     */
    this.matrix = [];
    /**
     * The width of the matrix
     * @type {number}
     * @readonly
     */

    this.width = 0;
    /**
     * The height of the matrix
     * @type {number}
     * @readonly
     */

    this.height = 0;
    /**
     * The wires in this grid
     * @type {CMOSWire[]}
     * @readonly
     */

    this.wires = [];
    /**
     * The transistors in this grid
     * @type {CMOSTransistor[]}
     * @readonly
     */

    this.transistors = [];
    /**
     * The labels in this grid
     * @type {CMOSLabel[]}
     * @readonly
     */

    this.labels = []; // Ensure size if needed

    if (size) {
      this.ensureSize(size);
    }
  }

  _createClass(CMOSGrid, [{
    key: "ensureSize",
    value: function ensureSize(size) {
      var i;

      while (this.height < size.height) {
        // Add row
        var row = new Array(this.width);

        for (i = 0; i < row.length; ++i) {
          row[i] = new CMOSGridElement();
        }

        row.necessary = false;
        this.matrix.push(row);
        ++this.height;
      }

      while (this.width < size.width) {
        // Add column
        for (i = 0; i < this.matrix.length; ++i) {
          this.matrix[i].push(new CMOSGridElement());
        }

        this.matrix[0][this.width++].necessary = false;
      }
    }
    /**
     * Remove a column from the grid.
     * NOTE: this function doesn't check if it's save to remove the column,
     * but updates all affected wire coordinates
     * @param {number} col The index of the column to remove
     */

  }, {
    key: "removeColumn",
    value: function removeColumn(col) {
      var i;

      for (i = 0; i < this.matrix.length; ++i) {
        this.matrix[i].splice(col, 1);
      } // Update coordinates in wires


      for (i = 0; i < this.wires.length; ++i) {
        if (this.wires[i].posFrom.y > col) {
          --this.wires[i].posFrom.y;
        }

        if (this.wires[i].posTo.y > col) {
          --this.wires[i].posTo.y;
        }
      }
    }
    /**
     * Remove a row from the grid.
     * NOTE: this function doesn't check if it's save to remove the row,
     * but updates all affected wire coordinates
     * @param {number} row The index of the row to remove
     */

  }, {
    key: "removeRow",
    value: function removeRow(row) {
      this.matrix.splice(row, 1); // Update coordinates in wires

      for (var i = 0; i < this.wires.length; ++i) {
        if (this.wires[i].posFrom.x > row) {
          --this.wires[i].posFrom.x;
        }

        if (this.wires[i].posTo.x > row) {
          --this.wires[i].posTo.x;
        }
      }
    }
    /**
     * Remove redundant columns and rows from the grid to reduce its size as much as possible
     * @param {number} [minRedundantX=1] The minimum number of following redundant rows
     * that must be there to delete one row
     * @param {number} [minRedundantY=1] The minimum number of following redundant columns
     * that must be there to delete one column
     */

  }, {
    key: "removeRedundantElements",
    value: function removeRedundantElements(minRedundantX, minRedundantY) {
      this.removeRedundantColumns(minRedundantY);
      this.removeRedundantRows(minRedundantX);
    }
    /**
     * Remove redundant columns from the grid to reduce its size as much as possible
     * @param {number} [minRedundantY=1] The minimum number of following redundant columns
     * that must be there to delete one column
     */

  }, {
    key: "removeRedundantColumns",
    value: function removeRedundantColumns(minRedundantYIn) {
      var firstRedundantIndex = -1;
      var minRedundantY = minRedundantYIn || 1; // Remove redundant columns

      for (var i = this.matrix[0].length - 1; i >= -1; --i) {
        if (i >= 0 && !this.matrix[0][i].necessary) {
          if (firstRedundantIndex < 0) {
            firstRedundantIndex = i;
          }
        } else if (firstRedundantIndex >= 0) {
          var numberOfItemsToDelete = firstRedundantIndex - i - minRedundantY + 1;

          if (numberOfItemsToDelete > 0) {
            firstRedundantIndex -= Math.floor((firstRedundantIndex - i - numberOfItemsToDelete) / 2);

            for (var j = 0; j < numberOfItemsToDelete; ++j) {
              this.removeColumn(firstRedundantIndex - j);
            }
          }

          firstRedundantIndex = -1;
        }
      }
    }
    /**
     * Remove redundant rows from the grid to reduce its size as much as possible
     * @param {number} [minRedundantX=1] The minimum number of following redundant
     * rows that must be there to delete one row
     */

  }, {
    key: "removeRedundantRows",
    value: function removeRedundantRows(minRedundantXIn) {
      var firstRedundantIndex = -1;
      var minRedundantX = minRedundantXIn || 1; // Remove redundant columns

      for (var i = this.matrix.length - 1; i >= -1; --i) {
        if (i >= 0 && !this.matrix[i].necessary) {
          if (firstRedundantIndex < 0) {
            firstRedundantIndex = i;
          }
        } else if (firstRedundantIndex >= 0) {
          var numberOfItemsToDelete = firstRedundantIndex - i - minRedundantX + 1;

          if (numberOfItemsToDelete > 0) {
            firstRedundantIndex -= Math.floor((firstRedundantIndex - i - numberOfItemsToDelete) / 2);

            for (var j = 0; j < numberOfItemsToDelete; ++j) {
              this.removeRow(firstRedundantIndex - j);
            }
          }

          firstRedundantIndex = -1;
        }
      }
    }
    /**
     * Adds the specified transistor at pos (x,y)
     * @param {number} x The x coordinate where should place the transistor
     * @param {number} y The y coordinate where should place the transistor
     * @param {CMOSTransistor} transistor The transistor that should be added to the grid
     */

  }, {
    key: "addTransistor",
    value: function addTransistor(x, y, transistor) {
      transistor.pos = new CMOSWirePosition(x, y, CMOSWireDirection.WEST);
      this.transistors.push(transistor);
      this.matrix[x][y].content.push(transistor);
      this.matrix[x].necessary = true;
      this.matrix[0][y].necessary = true;
    }
    /**
     * Adds the specified label at pos (x,y)
     * @param {number} x The x coordinate where should place the label
     * @param {number} y The y coordinate where should place the label
     * @param {string} text The text of the label
     * @param {boolean} rightAligned Specifies whether this label should be right or left aligned
     */

  }, {
    key: "addLabel",
    value: function addLabel(x, y, text, rightAligned) {
      var label = new CMOSLabel(text);
      label.pos = new CMOSWirePosition(x, y, rightAligned ? CMOSWireDirection.EAST : CMOSWireDirection.WEST);
      this.labels.push(label);
      this.matrix[x][y].content.push(label);
      this.matrix[x].necessary = true;
      this.matrix[0][y].necessary = true;
    }
    /**
     * Adds the specified wire to the grid
     * @param {CMOSWire} wire The wire that should be added to the grid
     * @param {CMOSConnector} [connector] The connector this wire is connected to
     */

  }, {
    key: "addWire",
    value: function addWire(wire, connector) {
      if (wire.posFrom.equals(wire.posTo)) {
        return;
      }

      var x;
      var y;

      if (wire.isHorizontal()) {
        x = wire.posFrom.x;

        for (y = wire.posFrom.y; y <= wire.posTo.y; ++y) {
          this.addWireAtGridPosition(wire, x, y, connector);
        }
      } else if (wire.isVertical()) {
        y = wire.posFrom.y;

        for (x = wire.posFrom.x; x <= wire.posTo.x; ++x) {
          this.addWireAtGridPosition(wire, x, y, connector);
        }
      } else {
        throw Error('Cannot place wire in grid that is neither vertical nor horizontal');
      }

      this.wires.push(wire);
    }
    /**
     * Adds the specified wire to the grid position (x,y)
     * @param {CMOSWire} wire The wire that should be added to the grid
     * @param {number} x The x coordinate of the position
     * @param {number} y The y coordinate of the position
     * @param {CMOSConnector} [connector] The connector this wire is connected to
     * @private
     */

  }, {
    key: "addWireAtGridPosition",
    value: function addWireAtGridPosition(wire, x, y, connector) {
      if (x >= 0 && y >= 0 && x < this.height && y < this.width && (this.matrix[x][y].content.length === 0 || !(this.matrix[x][y].content[0] instanceof CMOSTransistor))) {
        this.matrix[x][y].content.push(wire);

        if (this.matrix[x][y].content.length > 1) {
          // Already something else was at this point => this point becomes necessary
          this.matrix[x].necessary = true;
          this.matrix[0][y].necessary = true;
        }

        if (connector && !this.matrix[x][y].contains(connector)) {
          this.matrix[x][y].content.push(connector);
        }
      }
    }
    /**
     * Generates the best path from a to b and adds the wires to the grid
     * @param {CMOSWirePosition} a The position the path starts from
     * @param {CMOSWirePosition|CMOSConnector} b The position the path ends at
     */

  }, {
    key: "addWirePath",
    value: function addWirePath(a, b) {
      var bestPath = this.getBestPath(a, b);

      if (bestPath) {
        for (var i = 0; i < bestPath.length; ++i) {
          this.addWire(bestPath[i], i + 1 === bestPath.length && b instanceof CMOSConnector ? b : null);
        }

        return true;
      }

      return false;
    }
    /**
     * Try to find the best path from a to b
     * @param {CMOSWirePosition} a The position the path starts from
     * @param {CMOSWirePosition} b The position the path ends at
     * @return {CMOSWire[]} An array of wires that represent the best path
     * or null if couldn't find any
     */

  }, {
    key: "getBestPath",
    value: function getBestPath(a, b) {
      var i; // Clone matrix

      var matrix = new Array(this.height);

      for (i = 0; i < this.height; ++i) {
        var row = new Array(this.width);

        for (var j = 0; j < this.width; ++j) {
          row[j] = new CMOSGridElement();
        }

        matrix[i] = row;
      }

      matrix.path = []; // Array of positions of current path

      matrix.finalPath = null; // Current best path
      // Calculate best path

      this.getBestPathMarkElement(matrix, a, a, b, 0);

      if (matrix.finalPath) {
        // If found the best path generate wires for path
        var bestPath = [];
        var startPos = null;

        for (i = 0; i < matrix.finalPath.length; ++i) {
          var item = matrix.finalPath[i];

          if (!startPos) {
            startPos = item;
          } else if (startPos.direction !== item.direction) {
            var endPos = matrix.finalPath[i - 1];
            bestPath.push(new CMOSWire(new CMOSWirePosition(startPos.x, startPos.y), new CMOSWirePosition(endPos.x, endPos.y)));
            startPos = endPos;
            startPos.direction = item.direction;
          }

          if (i + 1 === matrix.finalPath.length) {
            bestPath.push(new CMOSWire(new CMOSWirePosition(startPos.x, startPos.y), new CMOSWirePosition(item.x, item.y)));
          }
        }

        return bestPath;
      }

      return null;
    }
    /**
     * Single step of getBestPath that marks the position a if possible
     * @param {CMOSGridElement[][]} matrix The matrix being used to find the best path
     * @param {CMOSWirePosition} c The current position in the path
     * @param {CMOSWirePosition} a The position the path starts from
     * @param {CMOSWirePosition|CMOSConnector} b The position the path ends at
     * @param {number} mark The mark to set at this position
     * @private
     */

  }, {
    key: "getBestPathMarkElement",
    value: function getBestPathMarkElement(matrix, c, a, b, mark) {
      var x = c.x;
      var y = c.y;
      var wouldBeOk = (typeof matrix[x][y].mark === 'undefined' || matrix[x][y].mark > mark) && (!matrix.finalPath || matrix.finalPath.mark > mark); // Checks whether it might be ok to continue the path on this position

      if (wouldBeOk) {
        matrix.path.push(c);
        var wireCount = this.matrix[x][y].wireCount();
        var posIsVertical = false;
        var posIsHorizontal = false;

        for (var i = 0; i < wireCount; ++i) {
          if (this.matrix[x][y].wireAt(i).isVertical()) {
            posIsVertical = true;
          } else {
            posIsHorizontal = true;
          }
        }

        var isVertical = c.direction === CMOSWireDirection.NORTH || c.direction === CMOSWireDirection.SOUTH;
        var isHorizontal = !isVertical;
        var isStart = c.equals(a);
        var isEnd = b instanceof CMOSWirePosition && c.equals(b) || this.matrix[x][y].contains(b) && (wireCount === 0 || posIsVertical !== isVertical || posIsHorizontal !== isHorizontal);

        if (isEnd) {
          // Now mark this position
          matrix[x][y].mark = mark; // End of path

          matrix.finalPath = JSON.parse(JSON.stringify(matrix.path));
          matrix.finalPath.mark = mark;
        } else if (isStart || this.matrix[x][y].isWireOrConnector() && wireCount < 2 && (wireCount === 0 || this.matrix[x][y].wireAt(0).isVertical() !== isVertical)) {
          // If it's the start position we will always mark it.
          // Else we only mark this position if there are currently 0 or 1 wires.
          // If there is already a wire it must be perpendicular to the path we are currently tracing.
          // Now mark this position
          matrix[x][y].mark = mark; // Continue in each direction except the one we came from, but only if
          // this is the first wire at this position or it is perpendicular

          if (y + 1 < this.width && (c.direction === CMOSWireDirection.EAST || !isStart && c.direction !== CMOSWireDirection.WEST)) {
            this.getBestPathMarkElement(matrix, new CMOSWirePosition(x, y + 1, CMOSWireDirection.EAST), a, b, mark + (c.direction !== CMOSWireDirection.EAST ? 2 : 1) + wireCount);
          }

          if (y - 1 >= 0 && (c.direction === CMOSWireDirection.WEST || !isStart && c.direction !== CMOSWireDirection.EAST)) {
            this.getBestPathMarkElement(matrix, new CMOSWirePosition(x, y - 1, CMOSWireDirection.WEST), a, b, mark + (c.direction !== CMOSWireDirection.WEST ? 2 : 1) + wireCount);
          }

          if (x + 1 < this.height && (c.direction === CMOSWireDirection.SOUTH || !isStart && c.direction !== CMOSWireDirection.NORTH)) {
            this.getBestPathMarkElement(matrix, new CMOSWirePosition(x + 1, y, CMOSWireDirection.SOUTH), a, b, mark + (c.direction !== CMOSWireDirection.SOUTH ? 2 : 1) + wireCount);
          }

          if (x - 1 >= 0 && (c.direction === CMOSWireDirection.NORTH || !isStart && c.direction !== CMOSWireDirection.SOUTH)) {
            this.getBestPathMarkElement(matrix, new CMOSWirePosition(x - 1, y, CMOSWireDirection.NORTH), a, b, mark + (c.direction !== CMOSWireDirection.NORTH ? 2 : 1) + wireCount);
          }
        }

        matrix.path.pop();
      }
    }
  }]);

  return CMOSGrid;
}();

/**
 * Represents the size of a CMOS grid element
 * @constructor
 * @param {number} [width=0] The width of the element
 * @param {number} [height=0] The height of the element
 */
var CMOSGridElementSize = function CMOSGridElementSize(width, height) {
  _classCallCheck(this, CMOSGridElementSize);

  this.width = width || 0;
  this.height = height || 0;
};

/**
 * Represents a CMOS circuit.
 * @constructor
 * @param {BooleanFunction} boolFunc The function for which should create CMOS
 */

var CMOS = /*#__PURE__*/function () {
  function CMOS(boolFunc) {
    _classCallCheck(this, CMOS);

    this.orgBoolFunc = boolFunc; // TODO: Implement this.reducedBoolFunc = boolFunc.reduce();

    this.reducedBoolFunc = boolFunc;
    /**
     * Saved connection points which represent a part BooleanExpression in the CMOS circuit
     * @type {Array<CMOSConnector>}
     */

    this.connectors = [];
    /**
     * Columns which go from VCC to GND
     * @type {Array<CMOSElement>}
     */

    this.columns = [];
    /**
     * Grid
     * @type {CMOSGrid}
     */
    // this.grid = null;
    // Add connectors for all variables

    var _iterator = _createForOfIteratorHelper(this.reducedBoolFunc.variables),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var variable = _step.value;
        this.connectors.push(new CMOSConnector(variable));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (this.reducedBoolFunc.expression instanceof BooleanExpressionBase) {
      this.placeTransistorsOfExpression(this.reducedBoolFunc.expression);
    } // Flat CMOS structure


    this.flattenCMOSStructure(null); // generate CMOS grid

    this.generateGrid();
  }
  /**
   * Flat the CMOS structure: there shouldn't be series elements as
   * children of series elements. Same goes for parallel elements.
   * @param {CMOSElement} element The element to flat
   */


  _createClass(CMOS, [{
    key: "flattenCMOSStructure",
    value: function flattenCMOSStructure(element) {
      if (!element) {
        for (var i = 0; i < this.columns.length; ++i) {
          this.flattenCMOSStructure(this.columns[i]);
        }

        return;
      }

      for (var j = 0; j < element.children.length; ++j) {
        var child = element.children[j];

        if (!(child instanceof CMOSElement)) {
          continue;
        }

        this.flattenCMOSStructure(child);

        if (element.unionType !== child.unionType) {
          continue;
        } // Flat this element


        element.children.splice(j, 1);
        j--;

        for (var k = 0; k < child.children.length; k++) {
          j++;
          element.children.splice(j, 0, child.children[k]);
        }
      }
    }
    /**
     * Search for a connector
     * @param {string} name The name of the connector: variable
     * name or string representation of the corresponding boolean expression
     * @return {CMOSConnector|null} The searched connector or null if doesn't exist
     */

  }, {
    key: "getConnector",
    value: function getConnector(name) {
      var filtered = this.connectors.filter(function (c) {
        return c.name === name;
      });
      return filtered.length > 0 ? filtered[0] : null;
    }
    /**
     * Connects the PMOS and NMOS parts through a new connector and
     * adds them all to a new column in the CMOS circuit
     * @param {CMOSElement} PMOSElement The PMOS part
     * @param {string} connectorName The string representation of the boolean
     * expression implemented by PMOSElement and NMOSElement
     * @param {CMOSElement} NMOSElement The NMOS part
     * @return {CMOSConnector} The created connector of this CMOS part
     */

  }, {
    key: "addCMOSFromPMOSAndNMOS",
    value: function addCMOSFromPMOSAndNMOS(PMOSElement, connectorName, NMOSElement) {
      var column = new CMOSElement(CMOSElementUnionType.SERIES);

      if (PMOSElement.unionType === CMOSElementUnionType.SERIES) {
        Array.prototype.push.apply(column.children, PMOSElement.children);
      } else {
        column.children.push(PMOSElement);
      }

      var connector = new CMOSConnector(connectorName);
      this.connectors.push(connector); // Remove this line if we don't want to reuse negations

      column.children.push(connector);

      if (NMOSElement.unionType === CMOSElementUnionType.SERIES) {
        Array.prototype.push.apply(column.children, NMOSElement.children);
      } else {
        column.children.push(NMOSElement);
      }

      this.columns.push(column);
      return connector;
    }
    /**
     * Places a negator to the CMOS circuit.
     * @param {CMOSConnector} connector The connector of the
     * BooleanExpression/Variable that should be negated
     * @return {CMOSConnector} The connector to the placed negator
     */

  }, {
    key: "placeNegator",
    value: function placeNegator(connector) {
      var connectorName = connector.name.length > 2 ? "!(".concat(connector.name, ")") : "!".concat(connector.name);
      var negConnector = this.getConnector(connectorName);

      if (negConnector) {
        return negConnector;
      }

      return this.addCMOSFromPMOSAndNMOS(new CMOSTransistor(CMOSTransistorType.PMOS, connector), connectorName, new CMOSTransistor(CMOSTransistorType.NMOS, connector));
    }
    /**
     * Recursively generates the PMOS and NMOS parts for a BooleanExpression with Operators AND / OR
     * @param {BooleanExpression} expr The boolean expression
     * @return {{PMOS: CMOSElement, NMOS: CMOSElement}} An object with the PMOS and NMOS elements
     */

  }, {
    key: "getPMOSNMOS",
    value: function getPMOSNMOS(expr) {
      if (!(expr instanceof BooleanExpressionBase) || expr.operator !== BooleanOperation.AND && expr.operator !== BooleanOperation.OR) {
        throw Error('Programming Error: should never come here');
      }

      var PmosElement = new CMOSElement(expr.operator === BooleanOperation.AND ? CMOSElementUnionType.SERIES : CMOSElementUnionType.PARALLEL);
      var NmosElement = new CMOSElement(expr.operator === BooleanOperation.AND ? CMOSElementUnionType.PARALLEL : CMOSElementUnionType.SERIES);

      for (var i = 0; i < expr.operands.length; ++i) {
        var operand = expr.operands[i];
        var transistorConnector = null;

        if (operand instanceof NAryExpression || operand instanceof UnaryExpression) {
          if (operand.operator === BooleanOperation.NOT) {
            if (operand.operands[0] instanceof BooleanVariable) {
              // Negated variable
              transistorConnector = this.getConnector(operand.operands[0].name);
            } else {
              transistorConnector = this.placeTransistorsOfExpression(operand.operands[0]);
            }
          } else if (operand.operator === BooleanOperation.OR || operand.operator === BooleanOperation.AND) {
            var cmos = this.getPMOSNMOS(operand);
            PmosElement.children.push(cmos.PMOS);
            NmosElement.children.push(cmos.NMOS);
          } else {
            throw Error("Unsupported operator '".concat(operand.operator.name, "'"));
          }
        } else if (operand instanceof BooleanVariable) {
          // Not negated variable (we must add a negator first)
          transistorConnector = this.placeNegator(this.getConnector(operand.name));
        } else {
          throw Error('Unsupported operand found');
        }

        if (transistorConnector) {
          PmosElement.children.push(new CMOSTransistor(CMOSTransistorType.PMOS, transistorConnector));
          NmosElement.children.push(new CMOSTransistor(CMOSTransistorType.NMOS, transistorConnector));
        }
      }

      return {
        PMOS: PmosElement,
        NMOS: NmosElement
      };
    }
    /**
     * Places all transistors of the specified BooleanExpression to the CMOS circuit
     * @param {BooleanExpression} expr The boolean expression
     * @return {CMOSConnector} The connector of the placed expression
     */

  }, {
    key: "placeTransistorsOfExpression",
    value: function placeTransistorsOfExpression(expr) {
      // var connectorName = expr.toStringWithoutParentheses();
      var connectorName = expr.toString();
      var connector = this.getConnector(connectorName);

      if (!connector) {
        if (expr.operator === BooleanOperation.OR || expr.operator === BooleanOperation.AND) {
          var cmos = this.getPMOSNMOS(expr);
          connector = this.addCMOSFromPMOSAndNMOS(cmos.PMOS, connectorName, cmos.NMOS);
        } else if (expr.operator === BooleanOperation.NOT) {
          if (expr.operands[0] instanceof BooleanVariable) {
            // Negated variable
            connector = this.getConnector(expr.operands[0].name);

            if (expr === this.root) {
              connector = this.placeNegator(connector);
            }
          } else {
            connector = this.placeNegator(this.placeTransistorsOfExpression(expr.operands[0]));
          }
        } else {
          throw Error("Unsupported operator '".concat(expr.operator.name, "' found"));
        }
      }

      return connector;
    }
    /**
     * Computes the optimal size of the grid so that all transistors and wires fit in
     * @return {CMOSGridElementSize}
     */

  }, {
    key: "getOptimalGridSize",
    value: function getOptimalGridSize() {
      var size = new CMOSGridElementSize();

      for (var i = 0; i < this.columns.length; ++i) {
        var optSize = this.getOptimalGridSizeForElement(this.columns[i], this.columns[i]);
        size.width += optSize.width;
        size.height = Math.max(size.height, optSize.height);
      }

      size.height += 2; // VCC and GND lines

      return size;
    }
    /**
     * Computes the optimal size for the specified element
     * @param {CMOSElement|CMOSTransistor|CMOSConnector} elem
     * The element of which should compute the optimal size
     * @param {CMOSElement} [parent] The parent element if
     * exists and is of different union type as elem
     * @return {CMOSGridElementSize}
     */

  }, {
    key: "getOptimalGridSizeForElement",
    value: function getOptimalGridSizeForElement(elem, column) {
      var i;
      var childSize;
      var size = new CMOSGridElementSize();

      if (elem instanceof CMOSElement) {
        // Either a series or a parallel element
        if (elem.unionType === CMOSElementUnionType.SERIES) {
          // SERIES element
          for (i = 0; i < elem.children.length; ++i) {
            childSize = this.getOptimalGridSizeForElement(elem.children[i], column);
            size.width = Math.max(size.width, childSize.width);
            size.height += childSize.height;
          }
        } else {
          // PARALLEL element
          for (i = 0; i < elem.children.length; ++i) {
            childSize = this.getOptimalGridSizeForElement(elem.children[i], column);
            size.width += childSize.width;
            size.height = Math.max(size.height, childSize.height);
          } // Check if this is the first / last connected item to VCC / GND


          elem.isFirst = elem === column.children[0];
          elem.isLast = elem === column.children[column.children.length - 1]; // Always add padding on top and bottom for horizontal wire connections if needed

          size.height += 2 - elem.isFirst - elem.isLast;
        }

        elem.size = size; // Save minimal size in elem
      } else if (elem instanceof CMOSTransistor) {
        // Transistors have size 1x1 but we want padding 1 on each size => 3x3
        // as optimal size even if real size is 1x1
        size.width = 3;
        size.height = 3;
        elem.size = new CMOSGridElementSize(1, 1);
      } else {
        // Connectors size is 1x1
        size.width = 1;
        size.height = 1;
        elem.size = size;
      }

      return size;
    }
    /**
     * Generate grid of this CMOS circuit
     */

  }, {
    key: "generateGrid",
    value: function generateGrid() {
      var i; // Create grid of optimal size

      this.grid = new CMOSGrid(this.getOptimalGridSize()); // Add VCC and GND wires to the grid

      this.grid.addWire(new CMOSWire(new CMOSWirePosition(0, -1), new CMOSWirePosition(0, this.grid.width - 1)));
      this.grid.addWire(new CMOSWire(new CMOSWirePosition(this.grid.height - 1, -1), new CMOSWirePosition(this.grid.height - 1, this.grid.width - 1))); // Add all columns to the grid

      var y = 0;

      for (i = 0; i < this.columns.length; ++i) {
        this.generateGridForElement(1, y, this.columns[i].size.width, this.grid.height - 2, this.columns[i]);
        y += this.columns[i].size.width;
      } // Add last result label


      var endConnector = this.connectors[this.connectors.length - 1];
      var pos = new CMOSWirePosition(Math.floor(this.grid.height / 2), this.grid.width - 2);
      this.grid.ensureSize(new CMOSGridElementSize(this.grid.width + 3, this.grid.height));
      this.grid.addWirePath(new CMOSWirePosition(pos.x, pos.y, CMOSWireDirection.WEST), endConnector);
      this.grid.addLabel(pos.x, pos.y + 1, this.reducedBoolFunc.name ? this.reducedBoolFunc.name : endConnector.name, false); // Add wires from transistor gates to connectors

      for (i = 0; i < this.grid.transistors.length; ++i) {
        var transistor = this.grid.transistors[i];

        if (!this.reducedBoolFunc.variables.has(transistor.gateConnector.name)) {
          if (!this.grid.addWirePath(transistor.pos, transistor.gateConnector)) {
            console.warn('Could not find best path between transistor gate and connector');
          }
        } else {
          // Add a label for the variable name
          this.grid.addLabel(transistor.pos.x, transistor.pos.y - 1, transistor.gateConnector.name, true);
        }
      }
    }
    /**
     * Places an element into the grid at specified position and with specified size
     * @param {number} x The x coordinate where should place the element
     * @param {number} y The y coordinate where should place the element
     * @param {number} width The expected width of the element
     * @param {number} height The expected height of the element
     * @param {CMOSElement|CMOSTransistor|CMOSConnector} elem
     * The element that should be placed into the grid
     */

  }, {
    key: "generateGridForElement",
    value: function generateGridForElement(x, y, width, height, elem) {
      if (elem instanceof CMOSElement) {
        // Another CMOS element either parallel or series
        if (elem.unionType === CMOSElementUnionType.PARALLEL) {
          this.generateGridForElementParallel(x, y, width, height, elem);
        } else {
          this.generateGridForElementSeries(x, y, width, height, elem);
        }
      } else if (elem instanceof CMOSTransistor) {
        // Transistor => points where transistors are located are necessary and can't be deleted
        this.grid.addTransistor(x, y, elem);
      } else if (elem instanceof CMOSConnector) {
        // Connector of a sub boolean expression
        elem.pos = new CMOSWirePosition(x, y);
        this.grid.matrix[x][y].content.push(elem);
      } else {
        throw Error('Invalid grid element type found');
      }
    }
    /**
     * Places a PARALLEL element into the grid at specified position and specified size
     * @param {number} x The x coordinate where should place the element
     * @param {number} y The y coordinate where should place the element
     * @param {number} width The expected width of the element
     * @param {number} height The expected height of the element
     * @param {CMOSElement} elem The (PARALLEL!) cmos element that should be placed into the grid
     */

  }, {
    key: "generateGridForElementParallel",
    value: function generateGridForElementParallel(x, y, width, height, elem) {
      var y2 = y;

      for (var i = 0; i < elem.children.length; ++i) {
        var child = elem.children[i]; // calculate necessary padding to fit height

        var paddingTop = Math.floor((height - child.size.height) / 2);

        if (child instanceof CMOSElement) {
          // Sub-element: should be SERIES!!
          this.generateGridForElement(x + !elem.isFirst, y2, child.size.width, height - 2 + elem.isFirst + elem.isLast, child);
          y2 += child.size.width;
        } else {
          // Transistor or connector
          this.generateGridForElement(x + paddingTop, y2 + 1, child.size.width, child.size.height, child); // Vertical wire before element

          this.grid.addWire(new CMOSWire(new CMOSWirePosition(x - elem.isFirst, y2 + 1), new CMOSWirePosition(x + paddingTop, y2 + 1))); // Vertical wire after element

          this.grid.addWire(new CMOSWire(new CMOSWirePosition(x + paddingTop, y2 + 1), new CMOSWirePosition(x + height - !elem.isLast, y2 + 1)));
          y2 += 3;
        }
      } // Add horizontal wire at begin if this parallel element isn't on top


      if (!elem.isFirst) {
        this.grid.addWire(new CMOSWire(new CMOSWirePosition(x, y + 1), new CMOSWirePosition(x, y + width - 2)));
      } // Add horizontal wire at end if this parallel element isn't at bottom


      if (!elem.isLast) {
        this.grid.addWire(new CMOSWire(new CMOSWirePosition(x + height - 1, y + 1), new CMOSWirePosition(x + height - 1, y + width - 2)));
      }
    }
    /**
       * Places a SERIES element into the grid at specified position and specified size
       * @param {number} x The x coordinate where should place the element
       * @param {number} y The y coordinate where should place the element
       * @param {number} width The expected width of the element
       * @param {number} height The expected height of the element
       * @param {CMOSElement} elem The (SERIES!) cmos element that should be placed into the grid
       */

  }, {
    key: "generateGridForElementSeries",
    value: function generateGridForElementSeries(x, y, width, height, elem) {
      var x2 = x; // calculate necesary padding between elements to fit height

      var padding = Math.round((height - elem.size.height) / (elem.children.length + 1)); // calculate middle y coordinate at which vertical connection wires are drawn

      var yMiddle = Math.floor(y + (width - 1) / 2); // Always track last x and y coordinates of last element
      // NOTE: Series connection wires always go into the elements

      var lastx = x - 1;
      var lasty = yMiddle; // Bottom connection wire is not drawn if the last element connected to GND
      // is a PARALLEL element because the wires from the element already go into GND then

      var drawBottomWire = true;

      for (var i = 0; i < elem.children.length; ++i) {
        x2 += padding;
        var child = elem.children[i];
        var paddingLeft = Math.floor((width - child.size.width) / 2);

        if (child instanceof CMOSElement) {
          // should be a PARALLEL element here
          var antipad = child.isFirst ? padding : 0;
          x2 += child.isLast ? x + height - x2 - child.size.height : 0;
          this.generateGridForElement(x2 - antipad, y + paddingLeft, child.size.width, child.size.height + antipad, child); // Same as for drawing the bottom wire goes for the top wire

          if (!child.isFirst) {
            this.grid.addWire(new CMOSWire(new CMOSWirePosition(lastx, lasty), new CMOSWirePosition(x2, lasty))); // Verical wire before element
          }

          x2 += child.size.height;
          lastx = x2 - 1;
          lasty = yMiddle; // see declaration of drawBottomWire

          if (child.isLast) {
            drawBottomWire = false;
          }
        } else {
          // Transistor or connector?
          var isTransistor = child instanceof CMOSTransistor;
          x2 += isTransistor; // Transistor padding

          this.generateGridForElement(x2, y + paddingLeft, child.size.width, child.size.height, child);

          if (!child.isFirst) {
            this.grid.addWire(new CMOSWire(new CMOSWirePosition(lastx, y + paddingLeft), new CMOSWirePosition(x2, y + paddingLeft))); // Vertical wire before element
          }

          lastx = x2;
          lasty = y + paddingLeft;
          x2 += child.size.height;
          x2 += isTransistor; // Transistor padding
        }
      } // Add final wire to connect to the bottom


      if (drawBottomWire) {
        this.grid.addWire(new CMOSWire(new CMOSWirePosition(lastx, lasty), new CMOSWirePosition(x + height, lasty)));
      }
    }
  }]);

  return CMOS;
}();

/**
 * Baseclass for SERIES- and PARALLEL-Elements
 * @constructor
 * @param {CMOSExpression || CMOSElement} parent The parent of this element.
 * @param {NetworkType} networkType Determines whether the
 * element is parent of the PULLUP or PULLDOWN network.
 */
var CMOSElement$1 = /*#__PURE__*/function () {
  function CMOSElement(parent, networkType) {
    _classCallCheck(this, CMOSElement);

    this.children = [];
    this.parent = parent;
    this.networkType = networkType;
  }

  _createClass(CMOSElement, [{
    key: "addChild",
    value: function addChild(cmosElement) {
      this.children.push(cmosElement);
    }
  }]);

  return CMOSElement;
}();
/**
 * Represents an element in the CMOS circuit whose children are in SERIES.
 * @constructor
 * @param {CMOSExpression || CMOSElement} parent The parent of this element.
 * @param {NetworkType} networkType Determines whether the element is
 * parent of the PULLUP or PULLDOWN network.
 */


var CMOSSeriesElement = /*#__PURE__*/function (_CMOSElement) {
  _inherits(CMOSSeriesElement, _CMOSElement);

  var _super = _createSuper(CMOSSeriesElement);

  function CMOSSeriesElement(parent, networkType) {
    _classCallCheck(this, CMOSSeriesElement);

    return _super.call(this, parent, networkType);
  }

  return CMOSSeriesElement;
}(CMOSElement$1);
/**
 * Represents an element in the CMOS circuit whose children are in PARALLEL.
 * @constructor
 * @param {CMOSExpression || CMOSElement} parent The parent of this element.
 * @param {NetworkType} networkType Determines whether the element
 * is parent of the PULLUP or PULLDOWN network.
 */

var CMOSParallelElement = /*#__PURE__*/function (_CMOSElement2) {
  _inherits(CMOSParallelElement, _CMOSElement2);

  var _super2 = _createSuper(CMOSParallelElement);

  function CMOSParallelElement(parent, networkType) {
    _classCallCheck(this, CMOSParallelElement);

    return _super2.call(this, parent, networkType);
  }

  return CMOSParallelElement;
}(CMOSElement$1);

var NetworkType = {
  PULLUP: 'pullup',
  PULLDOWN: 'pulldown'
};
var CMOSExpression = /*#__PURE__*/function () {
  function CMOSExpression(name, parent, booleanExpression) {
    var pullUp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var pullDown = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, CMOSExpression);

    this.name = name;
    this.id = null;
    this.parent = parent;
    this.connectedTo = [];
    this.booleanExpression = booleanExpression;
    this.pullUp = pullUp;
    this.pullDown = pullDown;
  }

  _createClass(CMOSExpression, [{
    key: "setId",
    value: function setId(id) {
      this.id = id;
    }
  }, {
    key: "addConnection",
    value: function addConnection(transistor) {
      this.connectedTo.push(transistor);
    }
  }]);

  return CMOSExpression;
}();

var CMOSTransistorType$1 = {
  PMOS: 'pmos',
  NMOS: 'nmos'
};
/**
 * Represents a transistor in a CMOS circuit
 * @constructor
 * @param {CMOSExpression || CMOSVariable || CMOSLiteral} src The element
 * to which this transistor is connected to.
 * @param {CMOSExpression || CMOSElement} parent The parent for this transistor.
 * @param {CMOSTransistorType} type The transistor type.
 */

var CMOSTransistor$1 = function CMOSTransistor(type, src, parent) {
  _classCallCheck(this, CMOSTransistor);

  this.src = src;
  this.type = type;
  this.parent = parent;
};

var CMOSVariable = /*#__PURE__*/function () {
  function CMOSVariable(name, booleanExpression) {
    _classCallCheck(this, CMOSVariable);

    this.name = name;
    this.connectedTo = [];
    this.booleanExpression = booleanExpression;
  }

  _createClass(CMOSVariable, [{
    key: "addConnection",
    value: function addConnection(transistor) {
      this.connectedTo.push(transistor);
    }
  }]);

  return CMOSVariable;
}();

var CMOSLiteral = /*#__PURE__*/function () {
  function CMOSLiteral(value) {
    _classCallCheck(this, CMOSLiteral);

    this.name = value ? '1' : '0';
    this.value = value && true;
    this.connectedTo = [];
  }

  _createClass(CMOSLiteral, [{
    key: "addConnection",
    value: function addConnection(transistor) {
      this.connectedTo.push(transistor);
    }
  }]);

  return CMOSLiteral;
}();

var CMOS$1 = /*#__PURE__*/function () {
  function CMOS(func) {
    _classCallCheck(this, CMOS);

    this.variables = [];
    this.literals = [];
    this.expressions = [];
    this.func = func;
    /*
    this.generateExpression(func.expression)
    this.giveIds()
    */
  }

  _createClass(CMOS, [{
    key: "getExpressionByName",
    value: function getExpressionByName(expressionName) {
      var filtered = this.expressions.filter(function (e) {
        return e.name === expressionName;
      });
      return filtered.length > 0 ? filtered[0] : null;
    }
  }, {
    key: "getVariableByName",
    value: function getVariableByName(variableName) {
      var filtered = this.variables.filter(function (e) {
        return e.name === variableName;
      });
      return filtered.length > 0 ? filtered[0] : null;
    }
  }, {
    key: "getLiteralByValue",
    value: function getLiteralByValue(value) {
      var filtered = this.literals.filter(function (e) {
        return e.value && value || !e.value && !value;
      });
      return filtered.length > 0 ? filtered[0] : null;
    }
  }, {
    key: "generateExpression",
    value: function generateExpression(boolExpr, options) {
      var exprName = boolExpr.toString();

      if (boolExpr instanceof BooleanVariable) {
        var variable = this.getVariableByName(boolExpr.name);

        if (variable == null) {
          this.variables.push(new CMOSVariable(boolExpr.name, boolExpr));
        }

        return variable;
      }

      if (this.getExpressionByName(exprName) != null) {
        return this.getExpressionByName(exprName);
      }

      var ret = new CMOSExpression(boolExpr.toString(), this, boolExpr, null, null);
      ret.pullUp = this.generateNetwork(ret, NetworkType.PULLUP, boolExpr, options);
      ret.pullDown = this.generateNetwork(ret, NetworkType.PULLDOWN, boolExpr, options);
      this.expressions.push(ret);
      return ret;
    }
  }, {
    key: "generateNetwork",
    value: function generateNetwork(parent, type, boolExpr, options) {
      var transistorType = type === NetworkType.PULLUP ? CMOSTransistorType$1.PMOS : CMOSTransistorType$1.NMOS;

      if (boolExpr instanceof BooleanLiteral) {
        var literal = this.getLiteralByValue(!boolExpr.value);

        if (literal == null) {
          literal = new CMOSLiteral(!boolExpr.value);
          this.literals.push(literal);
        }

        var transistor = new CMOSTransistor$1(transistorType, literal, parent);
        literal.addConnection(transistor);
        return transistor;
      }

      if (boolExpr instanceof BooleanVariable) {
        var exp = this.generateExpression(new UnaryExpression(BooleanOperation.NOT, [boolExpr], false), options);
        var trans = new CMOSTransistor$1(transistorType, exp, parent);
        exp.addConnection(trans);
        return trans;
      }

      if (boolExpr instanceof NAryExpression) {
        if (boolExpr.operator === BooleanOperation.AND) {
          var ret = type === NetworkType.PULLUP ? new CMOSSeriesElement(parent, type) : new CMOSParallelElement(parent, type);

          var _iterator = _createForOfIteratorHelper(boolExpr.operands),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var operand = _step.value;
              ret.addChild(this.generateNetwork(ret, type, operand, options));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          return ret;
        }

        if (boolExpr.operator === BooleanOperation.OR) {
          var _ret = type === NetworkType.PULLUP ? new CMOSParallelElement(parent, type) : new CMOSSeriesElement(parent, type);

          var _iterator2 = _createForOfIteratorHelper(boolExpr.operands),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _operand = _step2.value;

              _ret.addChild(this.generateNetwork(_ret, type, _operand, options));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          return _ret;
        }

        throw Error('Unknown NAry-Operation found.');
      }

      if (boolExpr instanceof UnaryExpression) {
        if (boolExpr.operator === BooleanOperation.NOT) {
          var _operand2 = boolExpr.operand;

          if (_operand2 instanceof BooleanVariable) {
            var variable = this.getVariableByName(_operand2.name);

            if (variable == null) {
              variable = new CMOSVariable(_operand2.name, _operand2);
              this.variables.push(variable);
            }

            var _trans = new CMOSTransistor$1(transistorType, variable, parent);

            variable.addConnection(_trans);
            return _trans;
          } else {
            var _exp = this.generateExpression(_operand2, options);

            var _trans2 = new CMOSTransistor$1(transistorType, _exp, parent);

            _exp.addConnection(_trans2);

            return _trans2;
          }
        }

        throw Error('Unknown Unary-Operation found.');
      }

      throw Error('Unknown Expression-Type found.');
    }
  }]);

  return CMOS;
}();

var CMOSBuilder = /*#__PURE__*/function () {
  function CMOSBuilder() {
    _classCallCheck(this, CMOSBuilder);
  }

  _createClass(CMOSBuilder, [{
    key: "buildCMOS",
    value: function buildCMOS(func) {
      var cmos = new CMOS$1(func);

      this._generateExpression(cmos, func.expression);

      cmos = this._giveIds(cmos);
      cmos = this._flattenCMOS(cmos);
      return cmos;
    }
  }, {
    key: "_giveIds",
    value: function _giveIds(cmos) {
      for (var i = 0; i < cmos.expressions.length; i++) {
        cmos.expressions[i].setId(i);
      }

      return cmos;
    }
  }, {
    key: "_generateExpression",
    value: function _generateExpression(cmos, boolExpr, options) {
      var exprName = boolExpr.toString();

      if (boolExpr instanceof BooleanVariable) {
        var variable = cmos.getVariableByName(boolExpr.name);

        if (variable == null) {
          cmos.variables.push(new CMOSVariable(boolExpr.name, boolExpr));
        }

        return variable;
      }

      if (cmos.getExpressionByName(exprName) != null) {
        return cmos.getExpressionByName(exprName);
      }

      var expression = new CMOSExpression(exprName, cmos, boolExpr, null, null);
      expression.pullUp = this._generateNetwork(cmos, expression, NetworkType.PULLUP, boolExpr, options);
      expression.pullDown = this._generateNetwork(cmos, expression, NetworkType.PULLDOWN, boolExpr, options);
      cmos.expressions.push(expression);
      return expression;
    }
  }, {
    key: "_generateNetwork",
    value: function _generateNetwork(cmos, parent, type, boolExpr, options) {
      if (boolExpr instanceof BooleanLiteral) {
        return this._handleBooleanLiteral(cmos, parent, type, boolExpr);
      } else if (boolExpr instanceof BooleanVariable) {
        return this._handleBooleanVariable(cmos, parent, type, boolExpr, options);
      } else if (boolExpr instanceof NAryExpression) {
        return this._handleNAryExpression(cmos, parent, type, boolExpr, options);
      } else if (boolExpr instanceof UnaryExpression) {
        return this._handleUnaryExpression(cmos, parent, type, boolExpr, options);
      }

      throw Error('CMOSBuilder._generateNetwork(CMOS, CMOSElement, NetworkType, BooleanExpression, options): Unknown Expression-Type found.');
    }
  }, {
    key: "_handleBooleanLiteral",
    value: function _handleBooleanLiteral(cmos, parent, type, boolExpr) {
      var transistorType = type === NetworkType.PULLUP ? CMOSTransistorType$1.PMOS : CMOSTransistorType$1.NMOS;
      var literal = cmos.getLiteralByValue(!boolExpr.value);

      if (literal == null) {
        literal = new CMOSLiteral(!boolExpr.value);
        cmos.literals.push(literal);
      }

      var transistor = new CMOSTransistor$1(transistorType, literal, parent);
      literal.addConnection(transistor);
      return transistor;
    }
  }, {
    key: "_handleBooleanVariable",
    value: function _handleBooleanVariable(cmos, parent, type, boolExpr, options) {
      var transistorType = type === NetworkType.PULLUP ? CMOSTransistorType$1.PMOS : CMOSTransistorType$1.NMOS;

      var expression = this._generateExpression(cmos, new UnaryExpression(BooleanOperation.NOT, [boolExpr], false), options);

      var transistor = new CMOSTransistor$1(transistorType, expression, parent);
      expression.addConnection(transistor);
      return transistor;
    }
  }, {
    key: "_handleNAryExpression",
    value: function _handleNAryExpression(cmos, parent, type, boolExpr, options) {
      var element;

      if (boolExpr.operator === BooleanOperation.AND) {
        element = type === NetworkType.PULLUP ? new CMOSSeriesElement(parent, type) : new CMOSParallelElement(parent, type);
      } else if (boolExpr.operator === BooleanOperation.OR) {
        element = type === NetworkType.PULLUP ? new CMOSParallelElement(parent, type) : new CMOSSeriesElement(parent, type);
      } else {
        throw Error('CMOSBuilder._handleNAryExpression(CMOS, CMOSElement, NetworkType, BooleanExpression, options): Unknown NAry-Operation found.');
      }

      var _iterator = _createForOfIteratorHelper(boolExpr.operands),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var operand = _step.value;
          element.addChild(this._generateNetwork(cmos, element, type, operand, options));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return element;
    }
  }, {
    key: "_handleUnaryExpression",
    value: function _handleUnaryExpression(cmos, parent, type, boolExpr, options) {
      var transistorType = type === NetworkType.PULLUP ? CMOSTransistorType$1.PMOS : CMOSTransistorType$1.NMOS;

      if (boolExpr.operator === BooleanOperation.NOT) {
        var operand = boolExpr.operand;

        if (operand instanceof BooleanVariable) {
          var variable = cmos.getVariableByName(operand.name);

          if (variable == null) {
            variable = new CMOSVariable(operand.name, operand);
            cmos.variables.push(variable);
          }

          var transistor = new CMOSTransistor$1(transistorType, variable, parent);
          variable.addConnection(transistor);
          return transistor;
        } else {
          var expression = this._generateExpression(cmos, operand, options);

          var _transistor = new CMOSTransistor$1(transistorType, expression, parent);

          expression.addConnection(_transistor);
          return _transistor;
        }
      } else {
        throw Error('CMOSBuilder._handleUnaryExpression(CMOS, CMOSElement, NetworkType, BooleanExpression, options): Unknown Unary-Operation found.');
      }
    }
  }, {
    key: "_flattenCMOS",
    value: function _flattenCMOS(element) {
      if (element instanceof CMOS$1) {
        var _iterator2 = _createForOfIteratorHelper(element.expressions),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var expression = _step2.value;

            this._flattenCMOS(expression);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else if (element instanceof CMOSExpression) {
        this._flattenCMOS(element.pullUp);

        this._flattenCMOS(element.pullDown);
      } else if (element instanceof CMOSSeriesElement) {
        var suspects = element.children;
        var newChildren = [];
        var i = 0;

        while (i < suspects.length) {
          var suspect = suspects[i];

          if (suspect instanceof CMOSSeriesElement) {
            var _iterator3 = _createForOfIteratorHelper(suspect.children),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var child = _step3.value;
                suspects.push(child);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          } else {
            suspect.parent = element;
            newChildren.push(suspect);
          }

          i++;
        }

        element.children = newChildren;
      } else if (element instanceof CMOSParallelElement) {
        var _suspects = element.children;
        var _newChildren = [];
        var _i = 0;

        while (_i < _suspects.length) {
          var _suspect = _suspects[_i];

          if (_suspect instanceof CMOSParallelElement) {
            var _iterator4 = _createForOfIteratorHelper(_suspect.children),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _child = _step4.value;

                _suspects.push(_child);
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          } else {
            _suspect.parent = element;

            _newChildren.push(_suspect);
          }

          _i++;
        }

        element.children = _newChildren;
      }

      return element;
    }
  }]);

  return CMOSBuilder;
}();

var CMOSVisualBase = /*#__PURE__*/function () {
  function CMOSVisualBase(id, content) {
    _classCallCheck(this, CMOSVisualBase);

    this.id = id;
    this.content = content;
    this.width = null;
    this.height = null;
    this.parent = null;
    this.x = null;
    this.y = null; // Absolute Position

    this.x = null;
    this.y = null;
    this.upperConnectionPoint = null;
    this.lowerConnectionPoint = null;
  }

  _createClass(CMOSVisualBase, [{
    key: "setSize",
    value: function setSize(width, height) {
      this.width = width;
      this.height = height;
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "setParent",
    value: function setParent(parent) {
      this.parent = parent;
    }
  }]);

  return CMOSVisualBase;
}();

var CMOSVisual = /*#__PURE__*/function (_CMOSVisualBase) {
  _inherits(CMOSVisual, _CMOSVisualBase);

  var _super = _createSuper(CMOSVisual);

  function CMOSVisual(id, content, info) {
    var _this;

    _classCallCheck(this, CMOSVisual);

    _this = _super.call(this, id, content);
    _this.info = info; // Contains elements that lie inside of this element

    _this.children = [];
    _this.transistors = [];
    _this.variables = [];
    _this.literals = []; // IDs of Channels (List, so it is possible to sort after ID)

    _this.connectionWires = [];
    _this.literalWires = [];
    _this.expressionWires = [];
    _this.variableWires = [];
    return _this;
  }

  _createClass(CMOSVisual, [{
    key: "addChild",
    value: function addChild(child) {
      this.children.push(child);
    }
  }, {
    key: "addTransistor",
    value: function addTransistor(transistor) {
      this.transistors.push(transistor);
    }
  }, {
    key: "addVariable",
    value: function addVariable(variable) {
      this.variables.push(variable);
    }
  }, {
    key: "addLiteral",
    value: function addLiteral(variable) {
      this.literals.push(variable);
    }
  }, {
    key: "containsVariable",
    value: function containsVariable(variable) {
      return this.variables.map(function (e) {
        return e.content;
      }).includes(variable);
    }
  }, {
    key: "addConnectionWire",
    value: function addConnectionWire(wire) {
      this.connectionWires.push(wire);
    }
  }, {
    key: "addLiteralWire",
    value: function addLiteralWire(wire) {
      this.literalWires.push(wire);
    }
  }, {
    key: "addExpressionWire",
    value: function addExpressionWire(wire) {
      this.expressionWires.push(wire);
    }
  }, {
    key: "addVariableWire",
    value: function addVariableWire(wire) {
      this.variableWires.push(wire);
    }
  }, {
    key: "getTransistorByContent",
    value: function getTransistorByContent(content) {
      for (var i = 0; i < this.transistors.length; i++) {
        var transistor = this.transistors[i];

        if (transistor.content === content) {
          return transistor;
        }
      }

      return null;
    }
  }]);

  return CMOSVisual;
}(CMOSVisualBase);
var CMOSVisualExpression = /*#__PURE__*/function (_CMOSVisualBase2) {
  _inherits(CMOSVisualExpression, _CMOSVisualBase2);

  var _super2 = _createSuper(CMOSVisualExpression);

  function CMOSVisualExpression(id, content) {
    var _this2;

    _classCallCheck(this, CMOSVisualExpression);

    _this2 = _super2.call(this, id, content); // Contains elements that lie inside of this element

    _this2.children = []; // IDs of Channels (List, so it is possible to sort after ID)

    _this2.channels = [];
    _this2.entryPointTable = {};
    _this2.exitPoint = null;
    return _this2;
  }

  _createClass(CMOSVisualExpression, [{
    key: "addChild",
    value: function addChild(child) {
      this.children.push(child);
    }
  }, {
    key: "getChild",
    value: function getChild(child) {
      for (var i = 0; i < this.children.length; i++) {
        var subElement = this.children[i];

        if (subElement === child) {
          return subElement;
        }
      }

      return null;
    }
  }, {
    key: "addChannel",
    value: function addChannel(channelId) {
      if (!this.channels.includes(channelId)) {
        this.channels.push(channelId);
        this.channels.sort();
      }
    }
  }, {
    key: "setExitPoint",
    value: function setExitPoint(point) {
      this.exitPoint = point;
    }
  }, {
    key: "getExitPoint",
    value: function getExitPoint() {
      return this.exitPoint;
    }
  }, {
    key: "getEntryPoint",
    value: function getEntryPoint(channelId) {
      return this.entryPointTable[channelId];
    }
  }]);

  return CMOSVisualExpression;
}(CMOSVisualBase);
var CMOSVisualSeriesElement = /*#__PURE__*/function (_CMOSVisualBase4) {
  _inherits(CMOSVisualSeriesElement, _CMOSVisualBase4);

  var _super4 = _createSuper(CMOSVisualSeriesElement);

  function CMOSVisualSeriesElement(id, content) {
    var _this4;

    _classCallCheck(this, CMOSVisualSeriesElement);

    _this4 = _super4.call(this, id, content); // Contains elements that lie inside of this element

    _this4.children = []; // IDs of Channels (List, so it is possible to sort after ID)

    _this4.channels = [];
    _this4.entryPointTable = {};
    return _this4;
  }

  _createClass(CMOSVisualSeriesElement, [{
    key: "addChild",
    value: function addChild(child) {
      this.children.push(child);
    }
  }, {
    key: "addChannel",
    value: function addChannel(channelId) {
      if (!this.channels.includes(channelId)) {
        this.channels.push(channelId);
        this.channels.sort();
      }
    }
  }, {
    key: "getEntryPoint",
    value: function getEntryPoint(channelId) {
      return this.entryPointTable[channelId];
    }
  }]);

  return CMOSVisualSeriesElement;
}(CMOSVisualBase);
var CMOSVisualParallelElement = /*#__PURE__*/function (_CMOSVisualBase5) {
  _inherits(CMOSVisualParallelElement, _CMOSVisualBase5);

  var _super5 = _createSuper(CMOSVisualParallelElement);

  function CMOSVisualParallelElement(id, content) {
    var _this5;

    _classCallCheck(this, CMOSVisualParallelElement);

    _this5 = _super5.call(this, id, content); // Contains elements that lie inside of this element

    _this5.children = []; // IDs of Channels (List, so it is possible to sort after ID)

    _this5.channels = [];
    _this5.neededChannels = [];
    _this5.entryPointTable = {};
    return _this5;
  }

  _createClass(CMOSVisualParallelElement, [{
    key: "addChild",
    value: function addChild(child) {
      this.children.push(child);
    }
  }, {
    key: "addChannel",
    value: function addChannel(channelId) {
      if (!this.channels.includes(channelId)) {
        this.channels.push(channelId);
        this.channels.sort();
      }
    }
  }, {
    key: "addNeededChannel",
    value: function addNeededChannel(channelId) {
      if (!this.neededChannels.includes(channelId)) {
        this.neededChannels.push(channelId);
        this.neededChannels.sort();
      }
    }
  }, {
    key: "getEntryPoint",
    value: function getEntryPoint(channelId) {
      var childIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var child = childIn;

      if (child == null) {
        child = this.children[0];
      }

      return this.entryPointTable[[channelId, child.id]];
    }
  }]);

  return CMOSVisualParallelElement;
}(CMOSVisualBase);
var CMOSVisualTransistor = /*#__PURE__*/function (_CMOSVisualBase6) {
  _inherits(CMOSVisualTransistor, _CMOSVisualBase6);

  var _super6 = _createSuper(CMOSVisualTransistor);

  function CMOSVisualTransistor(id, content) {
    var _this6;

    _classCallCheck(this, CMOSVisualTransistor);

    _this6 = _super6.call(this, id, content); // IDs of Channel

    _this6.channels = [];
    _this6.entryPointTable = {};
    _this6.leftPad = null;
    return _this6;
  }

  _createClass(CMOSVisualTransistor, [{
    key: "addChannel",
    value: function addChannel(channelId) {
      if (!this.channels.includes(channelId)) {
        this.channels.push(channelId);
      }
    }
  }, {
    key: "getEntryPoint",
    value: function getEntryPoint(channelId) {
      return this.entryPointTable[channelId];
    }
  }, {
    key: "setLeftPad",
    value: function setLeftPad(leftPad) {
      this.leftPad = leftPad;
    }
  }, {
    key: "updateLeftPad",
    value: function updateLeftPad(newLeftPad) {
      this.width -= this.leftPad;
      this.leftPad = newLeftPad;
      this.width += this.leftPad;
    }
  }]);

  return CMOSVisualTransistor;
}(CMOSVisualBase);
var CMOSVisualVariable = /*#__PURE__*/function () {
  function CMOSVisualVariable(id, content) {
    _classCallCheck(this, CMOSVisualVariable);

    this.id = id;
    this.content = content;
    this.exitPoint = null;
  }

  _createClass(CMOSVisualVariable, [{
    key: "setExitPoint",
    value: function setExitPoint(point) {
      this.exitPoint = point;
    }
  }, {
    key: "getExitPoint",
    value: function getExitPoint() {
      return this.exitPoint;
    }
  }]);

  return CMOSVisualVariable;
}();
var CMOSVisualLiteral = function CMOSVisualLiteral(id, content) {
  _classCallCheck(this, CMOSVisualLiteral);

  this.id = id;
  this.content = content;
};

/**
 * Responsible for generation a CMOSVisual from a given CMOS.
 * @constructor
 * @param {CMOS} [cmosElement] The CMOS from which a CMOSVisual will be generated.
 * @param {CMOSVisualBuilder} [builder] The Object which is responsible for
 * constructing a CMOSVisual.
 * @param {CMOSVisualInfo} [info] The info object that will be attached to the CMOSVisual.
 */

var GenerateVisualHull = /*#__PURE__*/function () {
  function GenerateVisualHull(cmosElement, builder, info) {
    _classCallCheck(this, GenerateVisualHull);

    this.info = info;
    this.builder = builder;
    this.result = this._generateVisualHull(cmosElement);
  }
  /**
     * Determines how the given CMOSElement will be handled.
     * @param {CMOS|CMOSExpression|CMOSSeriesElement|CMOSParallelElement|CMOSTransistor}
     * [visualElement] The CMOSElement to be handled.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The resulting VisualElement.
     */


  _createClass(GenerateVisualHull, [{
    key: "_generateVisualHull",
    value: function _generateVisualHull(cmosElement) {
      if (cmosElement instanceof CMOS$1) {
        return this._handleCMOS(cmosElement);
      } else if (cmosElement instanceof CMOSExpression) {
        return this._handleCMOSExpression(cmosElement);
      } else if (cmosElement instanceof CMOSSeriesElement) {
        return this._handleCMOSSeriesElement(cmosElement);
      } else if (cmosElement instanceof CMOSParallelElement) {
        return this._handleCMOSParallelElement(cmosElement);
      } else if (cmosElement instanceof CMOSTransistor$1) {
        return this._handleCMOSTransistor(cmosElement);
      } else {
        throw Error('CMOSVisualBuilder.generateVisualHull(CMOS): cmosElement is of unknown type.');
      }
    }
    /**
       * Generates the CMOSVisual for CMOS Object.
       * @param {CMOS} [visualElement] The CMOS to be handled.
       * @return {CMOSVisual} The constructed CMOSVisual.
       */

  }, {
    key: "_handleCMOS",
    value: function _handleCMOS(cmosElement) {
      var newElem = new CMOSVisual(this.builder.getId(), cmosElement, this.info);

      var _iterator = _createForOfIteratorHelper(cmosElement.expressions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var subElement = _step.value;

          var child = this._generateVisualHull(subElement);

          child.setParent(newElem);
          newElem.addChild(child);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return newElem;
    }
    /**
       * Generates the CMOSVisualExpression for CMOSExpression Object.
       * @param {CMOS} [visualElement] The CMOSExpression to be handled.
       * @return {CMOSVisual} The constructed CMOSVisualExpression.
       */

  }, {
    key: "_handleCMOSExpression",
    value: function _handleCMOSExpression(cmosElement) {
      var newElem = new CMOSVisualExpression(this.builder.getId(), cmosElement);

      var childPU = this._generateVisualHull(cmosElement.pullUp);

      var childPD = this._generateVisualHull(cmosElement.pullDown);

      childPU.setParent(newElem);
      childPD.setParent(newElem);
      newElem.addChild(childPU);
      newElem.addChild(childPD);
      return newElem;
    }
    /**
       * Generates the CMOSVisualSeriesElement for CMOSSeriesElement Object.
       * @param {CMOS} [visualElement] The CMOSSeriesElement to be handled.
       * @return {CMOSVisual} The constructed CMOSVisualSeriesElement.
       */

  }, {
    key: "_handleCMOSSeriesElement",
    value: function _handleCMOSSeriesElement(cmosElement) {
      var newElem = new CMOSVisualSeriesElement(this.builder.getId(), cmosElement);

      var _iterator2 = _createForOfIteratorHelper(cmosElement.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var subElement = _step2.value;

          var child = this._generateVisualHull(subElement);

          child.setParent(newElem);
          newElem.addChild(child);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return newElem;
    }
    /**
       * Generates the CMOSVisualParallelElement for CMOSParallelElement Object.
       * @param {CMOS} [visualElement] The CMOSParallelElement to be handled.
       * @return {CMOSVisual} The constructed CMOSVisualParallelElement.
       */

  }, {
    key: "_handleCMOSParallelElement",
    value: function _handleCMOSParallelElement(cmosElement) {
      var newElem = new CMOSVisualParallelElement(this.builder.getId(), cmosElement);

      var _iterator3 = _createForOfIteratorHelper(cmosElement.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var subElement = _step3.value;

          var child = this._generateVisualHull(subElement);

          child.setParent(newElem);
          newElem.addChild(child);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return newElem;
    }
    /**
       * Generates the CMOSVisualTransistor for CMOSTransistor Object.
       * @param {CMOS} [visualElement] The CMOSTransistor to be handled.
       * @return {CMOSVisual} The constructed CMOSVisualTransistor.
       */

  }, {
    key: "_handleCMOSTransistor",
    value: function _handleCMOSTransistor(cmosElement) {
      return new CMOSVisualTransistor(this.builder.getId(), cmosElement);
    }
    /**
       * Used to retrieve the CMOSVisual after generating it.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return GenerateVisualHull;
}();

/**
 * Responsible for calculating the channels for each element.
 * @constructor
 * @param {CMOSVisual} [visualElement] The visual hull for which the channels will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var CalculateChannels = /*#__PURE__*/function () {
  function CalculateChannels(visualElement, info) {
    _classCallCheck(this, CalculateChannels);

    this.info = info;
    this.result = this._calculateChannels(visualElement);
  }
  /**
     * Determines how the given VisualElement will be handled.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
     * The VisualElement to be handled.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */


  _createClass(CalculateChannels, [{
    key: "_calculateChannels",
    value: function _calculateChannels(visualElement) {
      if (visualElement instanceof CMOSVisual) {
        this._handleCMOSVisual(visualElement);
      } else if (visualElement instanceof CMOSVisualExpression) {
        this._handleCMOSVisualExpression(visualElement);
      } else if (visualElement instanceof CMOSVisualSeriesElement) {
        this._handleCMOSVisualSeriesElement(visualElement);
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        this._handleCMOSVisualParallelElement(visualElement);
      } else if (visualElement instanceof CMOSVisualTransistor) {
        this._handleCMOSVisualTransistor(visualElement);
      } else {
        throw Error('CMOSVisualBuilder.calculateChannels(CMOSVisual): visualElement is of unknown type.');
      }

      return visualElement;
    }
    /**
       * Calculates the channels for a CMOSVisual Object.
       * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
       */

  }, {
    key: "_handleCMOSVisual",
    value: function _handleCMOSVisual(visualElement) {
      var _iterator = _createForOfIteratorHelper(visualElement.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          this._calculateChannels(child);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
       * Calculates the channels for a CMOSVisualExpression Object.
       * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
       */

  }, {
    key: "_handleCMOSVisualExpression",
    value: function _handleCMOSVisualExpression(visualElement) {
      // VisualExpressions always need to account for every existing channel.
      for (var key in this.info.channelTable) {
        if (Object.prototype.hasOwnProperty.call(this.info.channelTable, key)) {
          visualElement.addChannel(this.info.channelTable[key]);
        }
      }

      var _iterator2 = _createForOfIteratorHelper(visualElement.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;

          this._calculateChannels(child);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
       * Calculates the channels for a CMOSVisualSeriesElement Object.
       * @param {CMOSVisualSeriesElement} [visualElement] The CMOSVisualSeriesElement to be handled.
       */

  }, {
    key: "_handleCMOSVisualSeriesElement",
    value: function _handleCMOSVisualSeriesElement(visualElement) {
      // VisualSeriesElements will only account for channels used by it.
      var _iterator3 = _createForOfIteratorHelper(visualElement.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;

          this._calculateChannels(child);

          var _iterator4 = _createForOfIteratorHelper(child.channels),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var channel = _step4.value;
              visualElement.addChannel(channel);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    /**
       * Calculates the channels for a CMOSVisualParallelElement Object.
       * @param {CMOSVisualParallelElement} [visualElement]
       * The CMOSVisualParallelElement to be handled.
       */

  }, {
    key: "_handleCMOSVisualParallelElement",
    value: function _handleCMOSVisualParallelElement(visualElement) {
      // VisualParallelElements will only account for channels used by it.
      for (var i = 0; i < visualElement.children.length; i++) {
        var child = visualElement.children[i];

        this._calculateChannels(child);

        var _iterator5 = _createForOfIteratorHelper(child.channels),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _channel = _step5.value;
            visualElement.addChannel(_channel);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        if (i > 0) {
          /*
          "Needed Channels" are channels which do not connect to the first
          row of the VisualParallelElement.
          If useOnlyNeededChannels is active, they determine the space needed
          to guide the channels into the inside
          of the VisualParallelElement, as channels which connect to the first
          row can be directly connected.
          */
          var _iterator6 = _createForOfIteratorHelper(child.channels),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var channel = _step6.value;
              visualElement.addNeededChannel(channel);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      }
    }
    /**
       * Calculates the channels for a CMOSVisualTransistor Object.
       * @param {CMOSVisualTransistor} [visualElement] The CMOSVisualTransistor to be handled.
       */

  }, {
    key: "_handleCMOSVisualTransistor",
    value: function _handleCMOSVisualTransistor(visualElement) {
      // A CMOSVisualTransistor only knows the channel which connect to it.
      var id = this.info.getChannelId(visualElement.content.src);

      if (id != null) {
        visualElement.addChannel(id);
      }
    }
    /**
       * Used to retrieve the visual hull after calculating its channels.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return CalculateChannels;
}();

/**
 * Responsible for calculating the sizes for elements of the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The visual hull for which the sizes will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var CalculateSize = /*#__PURE__*/function () {
  function CalculateSize(hull, info) {
    _classCallCheck(this, CalculateSize);

    this.info = info;
    this.result = this._calculateSize(hull, hull);
  }
  /**
     * Determines the maximum occuring leftPad in the transistors of the given VisualElement.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement] The given VisualElement.
     * @return {number} The maximum occuring leftPad.
     */


  _createClass(CalculateSize, [{
    key: "_getMaximumLeftPad",
    value: function _getMaximumLeftPad(visualElement) {
      // Determines the maximum leftPad recursively.
      var maxLeftPad = 0;

      if (visualElement instanceof CMOSVisualExpression) {
        maxLeftPad = Math.max(this._getMaximumLeftPad(visualElement.children[0]), this._getMaximumLeftPad(visualElement.children[1]));
      } else if (visualElement instanceof CMOSVisualSeriesElement) {
        var _iterator = _createForOfIteratorHelper(visualElement.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;
            maxLeftPad = Math.max(this._getMaximumLeftPad(child));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        maxLeftPad = Math.max(this._getMaximumLeftPad(visualElement.children[0]));
      } else if (visualElement instanceof CMOSVisualTransistor) {
        // Basecase, takes either the leftPad specified in the Info-Object,
        // or the leftPad required to print the label.
        maxLeftPad = this.info.transistorPadLeft;

        if (this.info.tunnelExpressions && visualElement.content.src instanceof CMOSExpression) {
          maxLeftPad = Math.max(maxLeftPad, visualElement.content.src.name.length * this.info.charWidth);
        } else if (this.info.tunnelVariables && visualElement.content.src instanceof CMOSVariable) {
          maxLeftPad = Math.max(maxLeftPad, visualElement.content.src.name.length * this.info.charWidth);
        } else if (this.info.tunnelLiterals && visualElement.content.src instanceof CMOSLiteral) {
          maxLeftPad = Math.max(maxLeftPad, visualElement.content.src.name.length * this.info.charWidth);
        }
      } else {
        throw Error('CMOSVisualBuilder._getMaximumLeftPad(CMOSVisual, CMOSVisual): visualElement is of unknown type.');
      }

      return maxLeftPad;
    }
    /**
       * Determines how the given VisualElement will be handled.
       * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
       * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
       * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
       * The VisualElement to be handled.
       * @param {number} [maxLeftPad] The maximum leftPad occuring in hull.
       * @param {boolean} [adjustLeftPad] Should the leftPad be adjusted for this element.
       * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
       * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
       */

  }, {
    key: "_calculateSize",
    value: function _calculateSize(hull, visualElement) {
      var maxLeftPad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var adjustLeftPad = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (visualElement instanceof CMOSVisual) {
        this._handleCMOSVisual(hull, visualElement);
      } else if (visualElement instanceof CMOSVisualExpression) {
        this._handleCMOSVisualExpression(hull, visualElement);
      } else if (visualElement instanceof CMOSVisualSeriesElement) {
        this._handleCMOSVisualSeriesElement(hull, visualElement, maxLeftPad, adjustLeftPad);
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        this._handleCMOSVisualParallelElement(hull, visualElement, maxLeftPad, adjustLeftPad);
      } else if (visualElement instanceof CMOSVisualTransistor) {
        this._handleCMOSVisualTransistor(hull, visualElement, maxLeftPad, adjustLeftPad);
      } else {
        throw Error('CMOSVisualBuilder._calculateSize(CMOSVisual, CMOSVisual): visualElement is of unknown type.');
      }

      return visualElement;
    }
    /**
       * Calculates the size for a CMOSVisual Object.
       * @param {CMOSVisual} [hull] The CMOSVisual to be handled.
       * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
       */

  }, {
    key: "_handleCMOSVisual",
    value: function _handleCMOSVisual(hull, visualElement) {
      var height = 0;
      var width = 0; // Combine the sizes of visualElements children.

      for (var i = 0; i < visualElement.children.length; i++) {
        var child = visualElement.children[i];

        this._calculateSize(visualElement, child);

        if (!this.info.singleRows || i === visualElement.children.length - 1) {
          width += child.width;
          height = Math.max(height, child.height);
        } else {
          width += child.width;
          height += child.height;
        }
      }

      visualElement.setSize(width, height);
    }
    /**
       * Calculates the size for a CMOSVisualExpression Object.
       * @param {CMOSVisual} [hull] The CMOSVisual this CMOSVisualExpression belongs to.
       * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
       */

  }, {
    key: "_handleCMOSVisualExpression",
    value: function _handleCMOSVisualExpression(hull, visualElement) {
      var height = 0;
      var width = 0;
      var childPU = visualElement.children[0];
      var childPD = visualElement.children[1];
      var maxLeftPad = 0;

      if (this.info.adjustLeftPad) {
        maxLeftPad = this._getMaximumLeftPad(visualElement);
      }

      this._calculateSize(hull, childPU, maxLeftPad, this.info.adjustLeftPad);

      this._calculateSize(hull, childPD, maxLeftPad, this.info.adjustLeftPad); // Determine the width needed to fit both children.


      width = Math.max(childPU.width, childPD.width); // Determine the height needed to fit both children.

      if (this.info.equalizePullUpPullDown) {
        height = 2 * Math.max(childPU.height, childPD.height);
      } else {
        height = childPD.height + childPU.height;
      } // Determine the width and height needed to guide channels.


      if (this.info.useOnlyNeededChannels) {
        width += visualElement.channels.length * this.info.channelWidth;
      } else {
        width += this.info.channelNum * this.info.channelWidth;
      }

      if (this.info.tunnelExpressions && visualElement.content.id < hull.children.length - 1) {
        width += this.info.expressionTunnelWireLength + visualElement.content.name.length * this.info.charWidth;
        height += this.info.channelWidth;
      }

      width += this.info.channelNum * this.info.channelWidth + 2 * this.info.channelWidth;
      height += this.info.channelNum * this.info.channelWidth;
      visualElement.setSize(width, height);
    }
    /**
       * Calculates the size for a CMOSVisualSeriesElement Object.
       * @param {CMOSVisual} [hull] The CMOSVisual this CMOSVisualSeriesElement belongs to.
       * @param {CMOSVisualSeriesElement} [visualElement] The CMOSVisualSeriesElement to be handled.
       * @param {number} [maxLeftPad] The maximum leftPad occuring in hull.
       * @param {boolean} [adjustLeftPad] Should the leftPad be adjusted for this element.
       */

  }, {
    key: "_handleCMOSVisualSeriesElement",
    value: function _handleCMOSVisualSeriesElement(hull, visualElement, maxLeftPad, adjustLeftPad) {
      var height = 0;
      var width = 0; // Combine the sizes of visualElements children.

      var _iterator2 = _createForOfIteratorHelper(visualElement.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;

          this._calculateSize(hull, child, maxLeftPad, adjustLeftPad);

          width = Math.max(width, child.width);
          height += child.height;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      visualElement.setSize(width, height);
    }
    /**
       * Calculates the size for a CMOSVisualParallelElement Object.
       * @param {CMOSVisual} [hull] The CMOSVisual this CMOSVisualParallelElement belongs to.
       * @param {CMOSVisualParallelElement} [visualElement] The CMOSVisualParallelElement
       * to be handled.
       * @param {number} [maxLeftPad] The maximum leftPad occuring in hull.
       * @param {boolean} [adjustLeftPad] Should the leftPad be adjusted for this element.
       */

  }, {
    key: "_handleCMOSVisualParallelElement",
    value: function _handleCMOSVisualParallelElement(hull, visualElement, maxLeftPad, adjustLeftPad) {
      var height = 0;
      var width = 0;

      for (var i = 0; i < visualElement.children.length; i++) {
        var child = visualElement.children[i]; // Only for the leftMost element should the leftPad be adjusted.

        if (adjustLeftPad && i === 0) {
          this._calculateSize(hull, child, maxLeftPad, true);
        } else {
          this._calculateSize(hull, child, maxLeftPad, false);
        } // Account for the width needed to guide channels.


        if (i > 0) {
          if (this.info.useOnlyNeededChannels) {
            width += child.channels.length * this.info.channelWidth;
          } else {
            width += this.info.channelNum * this.info.channelWidth;
          }
        }

        width += child.width;
        height = Math.max(height, child.height);
      } // Account for the height needed to guide channels.


      if (this.info.useOnlyNeededChannels) {
        height += visualElement.neededChannels.length * this.info.channelWidth;
      } else {
        height += this.info.channelNum * this.info.channelWidth;
      } // Account for the parallelElementChannelOffset.


      height += this.info.parallelElementChannelOffset;
      visualElement.setSize(width, height);
    }
    /**
       * Calculates the size for a CMOSVisualTransistor Object.
       * @param {CMOSVisual} [hull] The CMOSVisual this CMOSVisualTransistor belongs to.
       * @param {CMOSVisualTransistor} [visualElement] The CMOSVisualTransistor to be handled.
       * @param {number} [maxLeftPad] The maximum leftPad occuring in hull.
       * @param {boolean} [adjustLeftPad] Should the leftPad be adjusted for this element.
       */

  }, {
    key: "_handleCMOSVisualTransistor",
    value: function _handleCMOSVisualTransistor(hull, visualElement, maxLeftPad, adjustLeftPad) {
      var height = 0;
      var width = 0;
      var padLeft;

      if (adjustLeftPad) {
        // Simply take the maxLeftPad.
        padLeft = maxLeftPad;
      } else {
        // Make sure that there is enough space for a label if need be.
        padLeft = this.info.transistorPadLeft;

        if (this.info.tunnelExpressions && visualElement.content.src instanceof CMOSExpression) {
          padLeft = Math.max(padLeft, visualElement.content.src.name.length * this.info.charWidth);
        } else if (this.info.tunnelVariables && visualElement.content.src instanceof CMOSVariable) {
          padLeft = Math.max(padLeft, visualElement.content.src.name.length * this.info.charWidth);
        } else if (this.info.tunnelLiterals && visualElement.content.src instanceof CMOSLiteral) {
          padLeft = Math.max(padLeft, visualElement.content.src.name.length * this.info.charWidth);
        }
      }

      width = padLeft + this.info.transistorWidth + this.info.transistorPadRight;
      height = this.info.transistorPadTop + this.info.transistorHeight + this.info.transistorPadBot;
      visualElement.setLeftPad(padLeft);
      visualElement.setSize(width, height);
    }
    /**
       * Used to retrieve the visual hull after calculating the sizes.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return CalculateSize;
}();

var HORIZONTALALIGNMENT = {
  LEFT: 'horizontal_left',
  CENTER: 'horizontal_center',
  RIGHT: 'horizontal_right'
};
var VERTICALALIGNMENT = {
  TOP: 'vertical_top',
  CENTER: 'vertical_center',
  BOTTOM: 'vertical_bottom'
};
var DEFAULT_OPTIONS = {
  alignmentHorizontal: HORIZONTALALIGNMENT.LEFT,
  alignmentVertical: VERTICALALIGNMENT.CENTER,
  connectionPointAlignment: HORIZONTALALIGNMENT.LEFT,
  offsetX: 0,
  offsetY: 0,
  transistorWidth: 0.75,
  transistorHeight: 1,
  transistorPadLeft: 1.5,
  transistorPadRight: 0.5,
  transistorPadTop: 0.25,
  transistorPadBot: 0.25,
  parallelElementChannelOffset: 0.25,
  expressionTunnelWireLength: 0.5,
  charWidth: 0.2,
  channelWidth: 0,
  useOnlyNeededChannels: true,
  tunnelLiterals: true,
  tunnelVariables: true,
  tunnelExpressions: true,
  enableConnectionLineJoints: false,
  equalizePullUpPullDown: false,
  channelSymmetry: false,
  adjustLeftPad: true,
  singleRows: true
};
var CMOSVisualInfo = /*#__PURE__*/function () {
  // Glorified info object
  function CMOSVisualInfo(cmos, options) {
    _classCallCheck(this, CMOSVisualInfo);

    // Layout
    this.alignmentHorizontal = options.alignmentHorizontal;
    this.alignmentVertical = options.alignmentVertical;
    this.connectionPointAlignment = options.connectionPointAlignment;
    this.offsetX = options.offsetX;
    this.offsetY = options.offsetY; // TransistorsLayout

    this.transistorWidth = options.transistorWidth;
    this.transistorHeight = options.transistorHeight;
    this.transistorPadLeft = options.transistorPadLeft;
    this.transistorPadRight = options.transistorPadRight;
    this.transistorPadTop = options.transistorPadTop;
    this.transistorPadBot = options.transistorPadBot;
    this.parallelElementChannelOffset = options.parallelElementChannelOffset;
    this.expressionTunnelWireLength = options.expressionTunnelWireLength;
    this.charWidth = options.charWidth; // Channels:

    this.channelWidth = options.channelWidth;
    this.useOnlyNeededChannels = options.useOnlyNeededChannels;
    this.tunnelLiterals = options.tunnelLiterals;
    this.tunnelVariables = options.tunnelVariables;
    this.tunnelExpressions = options.tunnelExpressions;
    this.enableConnectionLineJoints = options.enableConnectionLineJoints; // Extra options

    this.equalizePullUpPullDown = options.equalizePullUpPullDown;
    this.channelSymmetry = options.channelSymmetry;
    this.adjustLeftPad = options.adjustLeftPad;
    this.singleRows = options.singleRows; // ChannelTable

    this.channelNum = 0;
    this.channelTable = {};
    var id = 0;

    if (!this.tunnelLiterals) {
      var _iterator = _createForOfIteratorHelper(cmos.literals),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var literal = _step.value;
          this.channelTable[literal.name] = id;
          id++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    if (!this.tunnelVariables) {
      var _iterator2 = _createForOfIteratorHelper(cmos.variables),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var variable = _step2.value;
          this.channelTable[variable.name] = id;
          id++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    if (!this.tunnelExpressions) {
      for (var i = 0; i < cmos.expressions.length - 1; i++) {
        this.channelTable[cmos.expressions[i].name] = id;
        id++;
      }
    }

    this.channelNum = id;
  }

  _createClass(CMOSVisualInfo, [{
    key: "getChannelId",
    value: function getChannelId(object) {
      if (Object.prototype.hasOwnProperty.call(this.channelTable, object.name)) {
        return this.channelTable[object.name];
      }

      return null;
    }
  }]);

  return CMOSVisualInfo;
}();

/**
 * Responsible for calculating the positions for elements of the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The visual hull for which the positions will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var CalculatePositions = /*#__PURE__*/function () {
  function CalculatePositions(hull, info) {
    _classCallCheck(this, CalculatePositions);

    this.info = info;
    this.result = this._calculatePositions(hull, this.info.offsetX, this.info.offsetY);
  }
  /**
     * Determines how the given VisualElement will be handled.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
     * The VisualElement to be handled.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */


  _createClass(CalculatePositions, [{
    key: "_calculatePositions",
    value: function _calculatePositions(visualElement, x, y) {
      if (visualElement instanceof CMOSVisual) {
        this._handleCMOSVisual(visualElement, x, y);
      } else if (visualElement instanceof CMOSVisualExpression) {
        this._handleCMOSVisualExpression(visualElement, x, y);
      } else if (visualElement instanceof CMOSVisualSeriesElement) {
        this._handleCMOSVisualSeriesElement(visualElement, x, y);
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        this._handleCMOSVisualParallelElement(visualElement, x, y);
      } else if (visualElement instanceof CMOSVisualTransistor) {
        this._handleCMOSVisualTransistor(visualElement, x, y);
      } else {
        throw Error('CMOSVisualBuilder._calculatePositions(CMOSVisual, number, number): visualElement is of unknown type.');
      }

      return visualElement;
    }
    /**
       * Calculates positions for CMOSVisualExpressions from a given CMOSVisual Object.
       * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
       * @param {number} [x] The x-value of the position for the CMOSVisual.
       * @param {number} [y] The y-value of the position for the CMOSVisual.
       */

  }, {
    key: "_handleCMOSVisual",
    value: function _handleCMOSVisual(visualElement, xIn, y) {
      // Position is given by calling function.
      var x = xIn;
      visualElement.setPosition(x, y); // If singleRows is active, determine the height at which to start.

      var yPos = y;

      if (this.info.singleRows) {
        // Determine the combined height of all single rows.
        var preambleHeight = 0;

        for (var i = 0; i < visualElement.children.length - 1; i++) {
          preambleHeight += visualElement.children[i].height;
        }

        if (this.info.alignmentVertical === VERTICALALIGNMENT.TOP || preambleHeight >= visualElement.children[visualElement.children.length - 1].height) {
          // No adjustments need to be made.
          yPos = y;
        } else if (this.info.alignmentVertical === VERTICALALIGNMENT.CENTER) {
          // The height of the last element is greater than
          // the preambleHeight. Place singleRows in the middle.
          yPos = y + (visualElement.children[visualElement.children.length - 1].height - preambleHeight) / 2;
        } else if (this.info.alignmentVertical === VERTICALALIGNMENT.BOTTOM) {
          // The height of the last element is greater than the preambleHeight.
          // Place singleRows at the bottom.
          yPos = y + visualElement.children[visualElement.children.length - 1].height - preambleHeight;
        }
      }

      for (var _i = 0; _i < visualElement.children.length; _i++) {
        var subElement = visualElement.children[_i];

        if (!this.info.singleRows || _i === visualElement.children.length - 1) {
          // Determine the appropriate y-component.
          if (this.info.alignmentVertical === VERTICALALIGNMENT.TOP) {
            // Place at the top.
            yPos = y;
          } else if (this.info.alignmentVertical === VERTICALALIGNMENT.CENTER) {
            // Place in the middle.
            yPos = y + (visualElement.height - subElement.height) / 2;
          } else if (this.info.alignmentVertical === VERTICALALIGNMENT.BOTTOM) {
            // Place at the bottom.
            yPos = y + visualElement.height - subElement.height;
          }
        }

        this._calculatePositions(subElement, x, yPos); // Adjust the current x- and y-value.


        x += subElement.width;

        if (this.info.singleRows) {
          yPos += subElement.height;
        }
      }
    }
    /**
       * Calculates positions for CMOSVisualElements from a given CMOSVisualExpression Object.
       * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
       * @param {number} [x] The x-value of the position for the CMOSVisualExpression.
       * @param {number} [y] The y-value of the position for the CMOSVisualExpression.
       */

  }, {
    key: "_handleCMOSVisualExpression",
    value: function _handleCMOSVisualExpression(visualElement, x, y) {
      // Position is given by calling function.
      visualElement.setPosition(x, y); // Get PullUp- and PullDown-Network.

      var childPU = visualElement.children[0];
      var childPD = visualElement.children[1]; // Calculate x-components.

      var channelSize = visualElement.channels.length * this.info.channelWidth;
      var xPosPU = 0;
      var xPosPD = 0; // Precalculate space needed for tunneling the expression.

      var tunnelLength = 0;

      if (this.info.tunnelExpressions && visualElement.content.id < visualElement.parent.children.length - 1) {
        tunnelLength = visualElement.content.name.length * this.info.charWidth + this.info.expressionTunnelWireLength;
      }

      if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.LEFT) {
        // Place children to the left.
        xPosPU = x + channelSize;
        xPosPD = x + channelSize;
      } else if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.CENTER) {
        // Place children in the middle.
        xPosPU = x + channelSize + (visualElement.width - channelSize - 2 * this.info.channelWidth - tunnelLength - childPU.width) / 2;
        xPosPD = x + channelSize + (visualElement.width - channelSize - 2 * this.info.channelWidth - tunnelLength - childPD.width) / 2;
      } else if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.RIGHT) {
        // Place children to the right.
        xPosPU = x + visualElement.width - channelSize - 2 * this.info.channelWidth - tunnelLength - childPU.width;
        xPosPD = x + visualElement.width - channelSize - 2 * this.info.channelWidth - tunnelLength - childPD.width;
      } // Calculate y-components.


      if (this.info.tunnelExpressions) {
        // Adjust channelSize to account for the tunnelWire.
        channelSize += this.info.channelWidth;
      }

      var yPosPU = 0;
      var yPosPD = 0;

      if (!this.info.equalizePullUpPullDown) {
        // The two children will fit perfectly in height.
        yPosPU = y;
        yPosPD = y + visualElement.height - childPD.height;
      } else if (this.info.alignmentVertical === VERTICALALIGNMENT.TOP) {
        // Place children at the top.
        yPosPU = y;
        yPosPD = y + childPU.height + channelSize;
      } else if (this.info.alignmentVertical === VERTICALALIGNMENT.CENTER) {
        // Place children in the middle.
        var shellHeight = (visualElement.height - channelSize) / 2;
        yPosPU = y + (shellHeight - childPU.height) / 2;
        yPosPD = y + visualElement.height - childPD.height - (shellHeight - childPD.height) / 2;
      } else if (this.info.alignmentVertical === VERTICALALIGNMENT.BOTTOM) {
        // Place children at the bottom.
        yPosPD = y + visualElement.height - childPD.height;
        yPosPU = y + visualElement.height - childPD.height - channelSize - childPU.height;
      }

      this._calculatePositions(childPU, xPosPU, yPosPU);

      this._calculatePositions(childPD, xPosPD, yPosPD);
    }
    /**
       * Calculates positions for CMOSVisualElements from a given CMOSVisualSeriesElement Object.
       * @param {CMOSVisualExpression} [visualElement] The CMOSVisualSeriesElement to be handled.
       * @param {number} [x] The x-value of the position for the CMOSVisualSeriesElement.
       * @param {number} [y] The y-value of the position for the CMOSVisualSeriesElement.
       */

  }, {
    key: "_handleCMOSVisualSeriesElement",
    value: function _handleCMOSVisualSeriesElement(visualElement, xIn, yIn) {
      // Position is given by calling function.
      var x = xIn;
      var y = yIn;
      visualElement.setPosition(x, y);

      var _iterator = _createForOfIteratorHelper(visualElement.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var subElement = _step.value;
          // Determine x-component
          var xPos = 0;

          if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.LEFT) {
            // Place child to the left.
            xPos = x;
          } else if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.CENTER) {
            // Place child in the middle.
            xPos = x + (visualElement.width - subElement.width) / 2;
          } else if (this.info.alignmentHorizontal === HORIZONTALALIGNMENT.RIGHT) {
            // Place child to the right.
            xPos = x + visualElement.width - subElement.width;
          }

          this._calculatePositions(subElement, xPos, y); // Update y-component


          y += subElement.height;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
       * Calculates positions for CMOSVisualElements from a given CMOSVisualParallelElement Object.
       * @param {CMOSVisualExpression} [visualElement] The CMOSVisualParallelElement to be handled.
       * @param {number} [x] The x-value of the position for the CMOSVisualParallelElement.
       * @param {number} [y] The y-value of the position for the CMOSVisualParallelElement.
       */

  }, {
    key: "_handleCMOSVisualParallelElement",
    value: function _handleCMOSVisualParallelElement(visualElement, xIn, y) {
      // Position is given by calling function.
      var x = xIn;
      visualElement.setPosition(x, y); // Determine the space needed to guide channels.

      var channelSize = visualElement.neededChannels.length * this.info.channelWidth;

      if (!this.info.useOnlyNeededChannels) {
        channelSize = this.info.channelNum * this.info.channelWidth;
      }

      for (var i = 0; i < visualElement.children.length; i++) {
        var subElement = visualElement.children[i]; // Determine the space needed to guide the channels which connect to the subElement.

        var channelSizeSubElement = subElement.channels.length * this.info.channelWidth;

        if (!this.info.useOnlyNeededChannels) {
          channelSizeSubElement = this.info.channelNum * this.info.channelWidth;
        }

        if (i === 0) {
          channelSizeSubElement = 0;
        } // Determine the y-component.


        var yPos = 0;

        if (this.info.alignmentVertical === VERTICALALIGNMENT.TOP) {
          // Place child at the top.
          yPos = y;
        } else if (this.info.alignmentVertical === VERTICALALIGNMENT.CENTER) {
          // Place child in the middle.
          yPos = y + (visualElement.height - channelSize - this.info.parallelElementChannelOffset - subElement.height) / 2;
        } else if (this.info.alignmentVertical === VERTICALALIGNMENT.BOTTOM) {
          // Place child at the bottom.
          yPos = y + visualElement.height - channelSize - this.info.parallelElementChannelOffset - subElement.height;
        } // Account for the channelSize and parallelElementChannelOffset.


        if (this.info.channelSymmetry && visualElement.content.networkType === NetworkType.PULLDOWN) {
          yPos += channelSize + this.info.parallelElementChannelOffset;
        }

        this._calculatePositions(subElement, x + channelSizeSubElement, yPos); // Update the x-component.


        x += subElement.width + channelSizeSubElement;
      }
    }
    /**
       * Sets the position of a CMOSVisualTransistor.
       * @param {CMOSVisualExpression} [visualElement] The CMOSVisualTransistor to be handled.
       * @param {number} [x] The x-value of the position for the CMOSVisualTransistor.
       * @param {number} [y] The y-value of the position for the CMOSVisualTransistor.
       */

  }, {
    key: "_handleCMOSVisualTransistor",
    value: function _handleCMOSVisualTransistor(visualElement, x, y) {
      // Position is given by calling function.
      visualElement.setPosition(x, y);
    }
    /**
       * Used to retrieve the visual hull after calculating the positions.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return CalculatePositions;
}();

/**
 * Responsible for collecting transistors, variables and literals in a given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The visual hull for which everything will be collected.
 * @param {CMOSVisualBuilder} [builder] The object currently building the CMOSVisual
 * for which the sizes will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var Collect = /*#__PURE__*/function () {
  function Collect(hull, builder, info) {
    _classCallCheck(this, Collect);

    this.builder = builder;
    this.info = info;
    this.result = this._collectAll(hull);
  }
  /**
     * Calls the collecter-functions.
     * @param {CMOSVisual} [hull] The visual hull for which everything will be collected.
     */


  _createClass(Collect, [{
    key: "_collectAll",
    value: function _collectAll(hullIn) {
      var hull = hullIn;
      hull = this._collectTransistors(hull, hull);
      hull = this._collectVariables(hull);
      hull = this._collectLiterals(hull);
      return hull;
    }
    /**
       * Collects transistors recursively for a given CMOSVisual.
       * @param {CMOSVisual} [hull] The CMOSVisual for which the transistors will be collected.
       * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
       * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement] The current VisualElement.
       * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
       * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
       */

  }, {
    key: "_collectTransistors",
    value: function _collectTransistors(hull, visualElement) {
      if (visualElement instanceof CMOSVisualTransistor) {
        // Found a transistor.
        hull.addTransistor(visualElement);
      } else if (visualElement instanceof CMOSVisual || visualElement instanceof CMOSVisualExpression || visualElement instanceof CMOSVisualSeriesElement || visualElement instanceof CMOSVisualParallelElement) {
        var _iterator = _createForOfIteratorHelper(visualElement.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;

            // Recurse.
            this._collectTransistors(hull, child);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        throw Error('Collect._collectTransistors(CMOSVisual, CMOSVisual): visualElement is of unknown type.');
      }

      return visualElement;
    }
    /**
       * Collects variables for a given CMOSVisual.
       * @param {CMOSVisual} [hull] The CMOSVisual for which the variables will be collected.
       * @return {CMOSVisual} The given CMOSVisual.
       */

  }, {
    key: "_collectVariables",
    value: function _collectVariables(hull) {
      if (hull instanceof CMOSVisual) {
        // Simply loop over the variables in the CMOS attached to the given hull.
        var _iterator2 = _createForOfIteratorHelper(hull.content.variables),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var variable = _step2.value;
            hull.addVariable(new CMOSVisualVariable(this.builder.getId(), variable));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else {
        throw Error('Collect._collectVariables(CMOSVisual, CMOSVisual): visualElement is of unknown type.');
      }

      return hull;
    }
    /**
       * Collects literals for a given CMOSVisual.
       * @param {CMOSVisual} [hull] The CMOSVisual for which the literals will be collected.
       * @return {CMOSVisual} The given CMOSVisual.
       */

  }, {
    key: "_collectLiterals",
    value: function _collectLiterals(hull) {
      if (hull instanceof CMOSVisual) {
        // Simply loop over the literal in the CMOS attached to the given hull.
        var _iterator3 = _createForOfIteratorHelper(hull.content.literals),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var literal = _step3.value;
            hull.addLiteral(new CMOSVisualLiteral(this.builder.getId(), literal));
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } else {
        throw Error('Collect._collectVariables(CMOSVisual): visualElement is of unknown type.');
      }

      return hull;
    }
    /**
       * Used to retrieve the visual hull after collecting everything.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return Collect;
}();

/**
 * Responsible for calculating the connectionPoints for each element.
 * @constructor
 * @param {CMOSVisual} [visualElement] The visual hull for which
 * the connectionPoints will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var CalculateConnectionPoints = /*#__PURE__*/function () {
  function CalculateConnectionPoints(hull, info) {
    _classCallCheck(this, CalculateConnectionPoints);

    this.info = info;
    this.result = this._calculateConnectionPoints(hull);
  }
  /**
     * Determines how the given VisualElement will be handled.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
     * The VisualElement to be handled.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */


  _createClass(CalculateConnectionPoints, [{
    key: "_calculateConnectionPoints",
    value: function _calculateConnectionPoints(visualElement) {
      if (visualElement instanceof CMOSVisual) {
        this._handleCMOSVisual(visualElement);
      } else if (visualElement instanceof CMOSVisualExpression) {
        this._handleCMOSVisualExpression(visualElement);
      } else if (visualElement instanceof CMOSVisualSeriesElement) {
        this._handleCMOSVisualSeriesElement(visualElement);
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        this._handleCMOSVisualParallelElement(visualElement);
      } else if (visualElement instanceof CMOSVisualTransistor) {
        this._handleCMOSVisualTransistor(visualElement);
      } else {
        throw Error('CalculateConnectionPoints._calculateConnectionPoints(CMOSVisual): visualElement is of unknown type.');
      }

      return visualElement;
    }
    /**
       * Calculates the connectionPoints for a CMOSVisual Object.
       * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
       */

  }, {
    key: "_handleCMOSVisual",
    value: function _handleCMOSVisual(visualElement) {
      var _iterator = _createForOfIteratorHelper(visualElement.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          this._calculateConnectionPoints(child);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
       * Calculates the connectionPoints for a CMOSVisualExpression Object.
       * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
       */

  }, {
    key: "_handleCMOSVisualExpression",
    value: function _handleCMOSVisualExpression(visualElement) {
      var _iterator2 = _createForOfIteratorHelper(visualElement.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;

          this._calculateConnectionPoints(child);
        } // CMOSVisualExpressions take the connectionPoints of their highest
        // and lowest child (by position).

      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      visualElement.upperConnectionPoint = visualElement.children[0].upperConnectionPoint;
      visualElement.lowerConnectionPoint = visualElement.children[1].lowerConnectionPoint;
    }
    /**
       * Calculates the connectionPoints for a CMOSVisualSeriesElement Object.
       * @param {CMOSVisualSeriesElement} [visualElement] The CMOSVisualSeriesElement to be handled.
       */

  }, {
    key: "_handleCMOSVisualSeriesElement",
    value: function _handleCMOSVisualSeriesElement(visualElement) {
      var _iterator3 = _createForOfIteratorHelper(visualElement.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;

          this._calculateConnectionPoints(child);
        } // CMOSVisualSeriesElements take the connectionPoints of their
        // highest and lowest child (by position).

      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      visualElement.upperConnectionPoint = visualElement.children[0].upperConnectionPoint;
      visualElement.lowerConnectionPoint = visualElement.children[visualElement.children.length - 1].lowerConnectionPoint;
    }
    /**
       * Calculates the connectionPoints for a CMOSVisualParallelElement Object.
       * @param {CMOSVisualParallelElement} [visualElement]
       * The CMOSVisualParallelElement to be handled.
       */

  }, {
    key: "_handleCMOSVisualParallelElement",
    value: function _handleCMOSVisualParallelElement(visualElement) {
      var _iterator4 = _createForOfIteratorHelper(visualElement.children),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var child = _step4.value;

          this._calculateConnectionPoints(child);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var upperX = 0;
      var lowerX = 0;
      var upperY = 0;
      var lowerY = 0; // Determine x-values

      if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.LEFT) {
        // Take the connectionPoints of your leftmost child as reference.
        upperX = visualElement.children[0].upperConnectionPoint.x;
        lowerX = visualElement.children[0].lowerConnectionPoint.x;
      } else if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.CENTER) {
        // Take the average of connectionPoints from your leftmost and rightmost child as reference.
        upperX = (visualElement.children[0].upperConnectionPoint.x + visualElement.children[visualElement.children.length - 1].upperConnectionPoint.x) / 2;
        lowerX = (visualElement.children[0].lowerConnectionPoint.x + visualElement.children[visualElement.children.length - 1].lowerConnectionPoint.x) / 2;
      } else if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.RIGHT) {
        // Take the connectionPoints of your rightmost child as reference.
        upperX = visualElement.children[visualElement.children.length - 1].upperConnectionPoint.x;
        lowerX = visualElement.children[visualElement.children.length - 1].lowerConnectionPoint.x;
      } // Determine y-values
      // Find the maximum and minimum y-value.


      upperY = visualElement.y + visualElement.height;
      lowerY = visualElement.y;

      var _iterator5 = _createForOfIteratorHelper(visualElement.children),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _child = _step5.value;

          if (_child.upperConnectionPoint.y < upperY) {
            upperY = _child.upperConnectionPoint.y;
          }

          if (_child.lowerConnectionPoint.y > lowerY) {
            lowerY = _child.lowerConnectionPoint.y;
          }
        } // Account for the space needed to guide channels.

      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (visualElement.content.networkType === NetworkType.PULLDOWN && this.info.channelSymmetry) {
        if (this.info.useOnlyNeededChannels) {
          upperY -= visualElement.neededChannels.length * this.info.channelWidth + this.info.parallelElementChannelOffset;
        } else {
          upperY -= this.info.channelNum * this.info.channelWidth + this.info.parallelElementChannelOffset;
        }
      } else if (this.info.useOnlyNeededChannels) {
        lowerY += visualElement.neededChannels.length * this.info.channelWidth + this.info.parallelElementChannelOffset;
      } else {
        lowerY += this.info.channelNum * this.info.channelWidth + this.info.parallelElementChannelOffset;
      } // Set connectionPoints


      visualElement.upperConnectionPoint = {
        x: upperX,
        y: upperY
      };
      visualElement.lowerConnectionPoint = {
        x: lowerX,
        y: lowerY
      };
    }
    /**
       * Calculates the connectionPoints for a CMOSVisualTransistor Object.
       * @param {CMOSVisualTransistor} [visualElement] The CMOSVisualTransistor to be handled.
       */

  }, {
    key: "_handleCMOSVisualTransistor",
    value: function _handleCMOSVisualTransistor(visualElement) {
      // CMOSVisualTransistors have defined connectionPoints.
      visualElement.upperConnectionPoint = {
        x: visualElement.x + visualElement.width - this.info.transistorPadRight,
        y: visualElement.y
      };
      visualElement.lowerConnectionPoint = {
        x: visualElement.x + visualElement.width - this.info.transistorPadRight,
        y: visualElement.y + visualElement.height
      };
    }
    /**
       * Used to retrieve the visual hull after calculating its connectionPoints.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return CalculateConnectionPoints;
}();

/**
 * Responsible for calculating the entryPoints for each element.
 * @constructor
 * @param {CMOSVisual} [visualElement] The visual hull for which the entryPoints will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var CalculateEntryPoints = /*#__PURE__*/function () {
  function CalculateEntryPoints(hull, info) {
    _classCallCheck(this, CalculateEntryPoints);

    this.info = info;
    this.result = this._calculateEntryPoints(hull);
  }
  /**
   * Determines how the given VisualElement will be handled.
   * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
   * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
   * The VisualElement to be handled.
   * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
   * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
   */


  _createClass(CalculateEntryPoints, [{
    key: "_calculateEntryPoints",
    value: function _calculateEntryPoints(visualElement) {
      if (visualElement instanceof CMOSVisual) {
        this._handleCMOSVisual(visualElement);
      } else if (visualElement instanceof CMOSVisualExpression) {
        this._handleCMOSVisualExpression(visualElement);
      } else if (visualElement instanceof CMOSVisualSeriesElement) {
        this._handleCMOSVisualSeriesElement(visualElement);
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        this._handleCMOSVisualParallelElement(visualElement);
      } else if (visualElement instanceof CMOSVisualTransistor) {
        this._handleCMOSVisualTransistor(visualElement);
      } else {
        throw Error('CalculateEntryPoints._calculateEntryPoints(CMOSVisual): cmosElement is of unknown type.');
      }

      return visualElement;
    }
    /**
       * Calculates the entryPoints for a CMOSVisual Object.
       * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
       */

  }, {
    key: "_handleCMOSVisual",
    value: function _handleCMOSVisual(visualElement) {
      var _iterator = _createForOfIteratorHelper(visualElement.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          this._calculateEntryPoints(child);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
       * Calculates the entryPoints for a CMOSVisualExpression Object.
       * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
       */

  }, {
    key: "_handleCMOSVisualExpression",
    value: function _handleCMOSVisualExpression(visualElement) {
      // The entryPoints of a CMOSVisualExpression are arranged in a diagonal shape.
      for (var i = 0; i < visualElement.channels.length; i++) {
        var yCoor = void 0;
        var xCoor = visualElement.x + i * this.info.channelWidth + this.info.channelWidth / 2;

        if (this.info.equalizePullUpPullDown) {
          yCoor = visualElement.y + Math.max(visualElement.children[0].height, visualElement.children[1].height) + this.info.channelWidth * i + this.info.channelWidth / 2;
        } else {
          yCoor = visualElement.y + visualElement.children[0].height + this.info.channelWidth * i + this.info.channelWidth / 2;
        }

        var entryPoint = {
          x: xCoor,
          y: yCoor
        };
        visualElement.entryPointTable[visualElement.channels[i]] = entryPoint;
      }

      var _iterator2 = _createForOfIteratorHelper(visualElement.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;

          this._calculateEntryPoints(child);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
       * Calculates the entryPoints for a CMOSVisualSeriesElement Object.
       * @param {CMOSVisualSeriesElement} [visualElement] The CMOSVisualSeriesElement to be handled.
       */

  }, {
    key: "_handleCMOSVisualSeriesElement",
    value: function _handleCMOSVisualSeriesElement(visualElement) {
      for (var i = 0; i < visualElement.channels.length; i++) {
        var xCoor = void 0;
        var yCoor = void 0; // Determine the coordinates

        if (visualElement.parent instanceof CMOSVisualExpression) {
          // A direct connection can be established.
          // Copy the entryPoint of the parent to accomplish this.
          xCoor = visualElement.parent.getEntryPoint(visualElement.channels[i]).x;
          yCoor = visualElement.parent.getEntryPoint(visualElement.channels[i]).y;
        } else if (visualElement.content.networkType === NetworkType.PULLDOWN && this.info.channelSymmetry) {
          // The element must have a CMOSVisualParallelElement as parent.
          // Take the same entryPoint as its parent.
          xCoor = visualElement.x - visualElement.channels.length * this.info.channelWidth + i * this.info.channelWidth + this.info.channelWidth / 2;
          yCoor = visualElement.y - visualElement.channels.length * this.info.channelWidth + i * this.info.channelWidth + this.info.channelWidth / 2;
        } else {
          // The element must have a CMOSVisualParallelElement as parent.
          // Take the same entryPoint as its parent.
          xCoor = visualElement.x - visualElement.channels.length * this.info.channelWidth + i * this.info.channelWidth + this.info.channelWidth / 2;
          yCoor = visualElement.y + visualElement.height + i * this.info.channelWidth + this.info.channelWidth / 2;
        }

        var entryPoint = {
          x: xCoor,
          y: yCoor
        };
        visualElement.entryPointTable[visualElement.channels[i]] = entryPoint;
      }

      var _iterator3 = _createForOfIteratorHelper(visualElement.children),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var child = _step3.value;

          if (visualElement.parent instanceof CMOSVisualExpression) {
            // Let the child know that a direct connection can be established.
            child.parent = visualElement.parent;
          }

          this._calculateEntryPoints(child);

          if (visualElement.parent instanceof CMOSVisualExpression) {
            // Restore the parent value of the child.
            child.parent = visualElement;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    /**
     * Calculates the entryPoints for a CMOSVisualParallelElement Object.
     * @param {CMOSVisualParallelElement} [visualElement]
     * The CMOSVisualParallelElement to be handled.
     */

  }, {
    key: "_handleCMOSVisualParallelElement",
    value: function _handleCMOSVisualParallelElement(visualElement) {
      var xCoor;
      var yCoor;

      for (var i = 0; i < visualElement.children.length; i++) {
        var child = visualElement.children[i];

        if (i === 0 && visualElement.parent instanceof CMOSVisualExpression) {
          // Let the child know that a direct connection can be established.
          child.parent = visualElement.parent;

          this._calculateEntryPoints(child); // Restore the parent value of the child.


          child.parent = visualElement;
        } else {
          this._calculateEntryPoints(child);
        }
      }

      for (var _i = 0; _i < visualElement.neededChannels.length; _i++) {
        // Determine the y-value for the needed channel
        if (visualElement.content.networkType === NetworkType.PULLDOWN && this.info.channelSymmetry) {
          yCoor = visualElement.y + _i * this.info.channelWidth + this.info.channelWidth / 2 + this.info.parallelElementChannelOffset;
        } else {
          yCoor = visualElement.y + visualElement.height - visualElement.neededChannels.length * this.info.channelWidth - this.info.parallelElementChannelOffset + _i * this.info.channelWidth + this.info.channelWidth / 2;
        }

        for (var j = 1; j < visualElement.children.length; j++) {
          var _child = visualElement.children[j];
          if (!_child.channels.includes(visualElement.neededChannels[_i])) continue; // Determine the needed x-value for this child and channel.

          xCoor = _child.getEntryPoint(visualElement.neededChannels[_i]).x;
          visualElement.entryPointTable[[visualElement.neededChannels[_i], _child.id]] = {
            x: xCoor,
            y: yCoor
          };
        }
      }

      var firstChild = visualElement.children[0];

      for (var _i2 = 0; _i2 < firstChild.channels.length; _i2++) {
        var channel = firstChild.channels[_i2];
        var xCoord = firstChild.getEntryPoint(channel).x;
        var yCoord = firstChild.getEntryPoint(channel).y;
        visualElement.entryPointTable[[channel, firstChild.id]] = {
          x: xCoord,
          y: yCoord
        };
      }
    }
    /**
       * Calculates the entryPoints for a CMOSVisualTransistor Object.
       * @param {CMOSVisualTransistor} [visualElement] The CMOSVisualTransistor to be handled.
       */

  }, {
    key: "_handleCMOSVisualTransistor",
    value: function _handleCMOSVisualTransistor(visualElement) {
      // CMOSVisualTransistor have defined entryPoints.
      var xCoor = visualElement.x;
      var yCoor = visualElement.y + this.info.transistorPadTop + this.info.transistorHeight / 2;
      visualElement.entryPointTable[visualElement.channels[0]] = {
        x: xCoor,
        y: yCoor
      };
    }
    /**
       * Used to retrieve the visual hull after calculating its entryPoints.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return CalculateEntryPoints;
}();

/**
 * Responsible for calculating the exitPoints for CMOSVisualExpressions.
 * @constructor
 * @param {CMOSVisual} [visualElement] The visual hull for which the exitPoints will be calculated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var CalculateExitPoints = /*#__PURE__*/function () {
  function CalculateExitPoints(hull, info) {
    _classCallCheck(this, CalculateExitPoints);

    this.info = info;
    this.result = this._calculateExitPoints(hull);
  }
  /**
   * Determines how the given VisualElement will be handled.
   * @param {CMOSVisual|CMOSVisualExpression} [visualElement] The VisualElement to be handled.
   * @return {CMOSVisual|CMOSVisualExpression} The given VisualElement.
   */


  _createClass(CalculateExitPoints, [{
    key: "_calculateExitPoints",
    value: function _calculateExitPoints(visualElement) {
      if (visualElement instanceof CMOSVisual) {
        this._handleCMOSVisual(visualElement);
      } else if (visualElement instanceof CMOSVisualExpression) {
        this._handleCMOSVisualExpression(visualElement);
      } else {
        throw Error('CalculateEntryPoints._calculateExitPoints(CMOSVisual): cmosElement is of unknown type.');
      }

      return visualElement;
    }
    /**
       * Calculates the exitPoints for a CMOSVisual Object.
       * @param {CMOSVisual} [visualElement] The CMOSVisual to be handled.
       */

  }, {
    key: "_handleCMOSVisual",
    value: function _handleCMOSVisual(visualElement) {
      var _iterator = _createForOfIteratorHelper(visualElement.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          this._calculateExitPoints(child);
        } // Calcultate exitPoints for variables if necessary.

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (this.info.tunnelVariables) {
        return;
      }

      var _iterator2 = _createForOfIteratorHelper(visualElement.variables),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var variable = _step2.value;
          var xCoor = -1;
          var yCoor = visualElement.children[0].getEntryPoint(this.info.getChannelId(variable.content)).y;
          variable.exitPoint = {
            x: xCoor,
            y: yCoor
          };
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
       * Calculates the exitPoints for a CMOSVisualExpression Object.
       * @param {CMOSVisualExpression} [visualElement] The CMOSVisualExpression to be handled.
       */

  }, {
    key: "_handleCMOSVisualExpression",
    value: function _handleCMOSVisualExpression(visualElement) {
      var point1 = visualElement.children[0].lowerConnectionPoint;
      var point2 = visualElement.children[1].upperConnectionPoint;
      var xCoor;
      var yCoor; // Determine the x-component

      if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.LEFT) {
        xCoor = Math.min(point1.x, point2.x);
      } else if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.CENTER) {
        xCoor = (point1.x + point2.x) / 2;
      } else if (this.info.connectionPointAlignment === HORIZONTALALIGNMENT.RIGHT) {
        xCoor = Math.max(point1.x, point2.x);
      } // Determine the y-component


      if (visualElement.content.id >= visualElement.content.parent.expressions.length - 1) {
        // The exitPoint of the last CMOSVisualExpression should always be in the middle.
        if (this.info.equalizePullUpPullDown) {
          yCoor = visualElement.y + visualElement.height / 2;
        } else {
          yCoor = visualElement.y + visualElement.children[0].height + (visualElement.height - visualElement.children[0].height - visualElement.children[1].height) / 2;
        }
      } else if (this.info.tunnelExpressions) {
        // For the exitPoint of the CMOSVisualExpression an extra channel is allocated.
        if (this.info.equalizePullUpPullDown) {
          yCoor = visualElement.y + Math.max(visualElement.children[0].height, visualElement.children[1].height) + this.info.channelNum * this.info.channelWidth + this.info.channelWidth / 2;
        } else {
          yCoor = visualElement.y + visualElement.children[0].height + this.info.channelNum * this.info.channelWidth + this.info.channelWidth / 2;
        }
      } else if (this.info.equalizePullUpPullDown) {
        // Treat the exitPoint to be calculated as an entryPoint.
        yCoor = visualElement.y + Math.max(visualElement.children[0].height, visualElement.children[1].height) + this.info.channelWidth * this.info.getChannelId(visualElement.content) + this.info.channelWidth / 2;
      } else {
        yCoor = visualElement.y + visualElement.children[0].height + this.info.channelWidth * this.info.getChannelId(visualElement.content) + this.info.channelWidth / 2;
      }

      visualElement.exitPoint = {
        x: xCoor,
        y: yCoor
      };
    }
    /**
       * Used to retrieve the visual hull after calculating its exitPoints.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return CalculateExitPoints;
}();

var TRANSISTOR_CONNECTION_TYPES = {
  DRAIN: 'D',
  SOURCE: 'S',
  GATE: 'G'
};
var Wire = function Wire(root) {
  _classCallCheck(this, Wire);

  this.root = root;
};

var WireNodeBase = /*#__PURE__*/function () {
  function WireNodeBase(x, y, parent) {
    _classCallCheck(this, WireNodeBase);

    this.x = x;
    this.y = y;
    this.parent = parent;
    this.children = [];
  }

  _createClass(WireNodeBase, [{
    key: "addChild",
    value: function addChild(child) {
      this.children.push(child);
      return child;
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] === child) {
          this.children.splice(i, 1);
          return true;
        }
      }

      return false;
    }
  }, {
    key: "findChildByPos",
    value: function findChildByPos(x, y) {
      var _iterator = _createForOfIteratorHelper(this.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          if (child.x === x && child.y === y) {
            return child;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return null;
    }
  }]);

  return WireNodeBase;
}();

var WireBendNode = /*#__PURE__*/function (_WireNodeBase) {
  _inherits(WireBendNode, _WireNodeBase);

  var _super = _createSuper(WireBendNode);

  function WireBendNode(x, y, parent, containsPoint) {
    var _this;

    _classCallCheck(this, WireBendNode);

    _this = _super.call(this, x, y, parent);
    _this.containsPoint = containsPoint;
    return _this;
  }

  return WireBendNode;
}(WireNodeBase);
var WireConnectionNode = /*#__PURE__*/function (_WireNodeBase2) {
  _inherits(WireConnectionNode, _WireNodeBase2);

  var _super2 = _createSuper(WireConnectionNode);

  function WireConnectionNode(x, y, parent, transistor, connectionType) {
    var _this2;

    _classCallCheck(this, WireConnectionNode);

    _this2 = _super2.call(this, x, y, parent);
    _this2.children = [];
    _this2.transistor = transistor;
    _this2.connectionType = connectionType;
    return _this2;
  }

  return WireConnectionNode;
}(WireNodeBase);

var WireBuilder = /*#__PURE__*/function () {
  function WireBuilder(root) {
    _classCallCheck(this, WireBuilder);

    this.current = root;
  }

  _createClass(WireBuilder, [{
    key: "advanceX",
    value: function advanceX(xCoor) {
      var enableBendPoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!this.current.containsPoint) {
        this.current.containsPoint = enableBendPoints && this.current.parent != null && this.current.children.length > 1 || enableBendPoints && this.current.children.length > 2;
      }

      if (this.current.x === xCoor) {
        return;
      }

      var _iterator = _createForOfIteratorHelper(this.current.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;

          if (child instanceof WireConnectionNode || child.y !== this.current.y || child.x > this.current.x && this.current.x > xCoor || child.x < this.current.x && this.current.x < xCoor) {
            continue;
          }

          if (xCoor === child.x) {
            this.current = child;
            return;
          } else if (xCoor > child.x && child.x > this.current.x || xCoor < child.x && child.x < this.current.x) {
            this.current = child;
            this.advanceX(xCoor, enableBendPoints);
            return;
          } else {
            var _newNode2 = new WireBendNode(xCoor, this.current.y, this.current, false);

            _newNode2.addChild(child);

            child.parent = _newNode2;
            this.current.addChild(_newNode2);
            this.current.removeChild(child);
            this.current = _newNode2;
            return;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (this.current.parent != null && this.current.parent.y === this.current.y && !(this.current.parent.x > this.current.x && this.current.x > xCoor || this.current.parent.x < this.current.x && this.current.x < xCoor)) {
        if (xCoor === this.current.parent.x) {
          this.current = this.current.parent;
          return;
        } else if (xCoor > this.current.parent.x && this.current.parent.x > this.current.x || xCoor < this.current.parent.x && this.current.parent.x < this.current.x) {
          this.current = this.current.parent;
          this.advanceX(xCoor, enableBendPoints);
          return;
        } else {
          var _newNode = new WireBendNode(xCoor, this.current.y, this.current.parent, false);

          this.current.parent.addChild(_newNode);
          this.current.parent.removeChild(this.current);

          _newNode.addChild(this.current);

          this.current.parent = _newNode;
          this.current = _newNode;
          return;
        }
      }

      var newNode = new WireBendNode(xCoor, this.current.y, this.current, false);
      this.current.addChild(newNode);

      if (!this.current.containsPoint) {
        this.current.containsPoint = enableBendPoints && this.current.parent != null && this.current.children.length > 1 || enableBendPoints && this.current.children.length > 2;
      }

      this.current = newNode;
    }
  }, {
    key: "advanceY",
    value: function advanceY(yCoor) {
      var enableBendPoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!this.current.containsPoint) {
        this.current.containsPoint = enableBendPoints && this.current.parent != null && this.current.children.length > 1 || enableBendPoints && this.current.children.length > 2;
      }

      if (this.current.y === yCoor) {
        return;
      }

      var _iterator2 = _createForOfIteratorHelper(this.current.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;

          if (child instanceof WireConnectionNode || child.x !== this.current.x || child.y > this.current.y && this.current.y > yCoor || child.y < this.current.y && this.current.y < yCoor) {
            continue;
          }

          if (yCoor === child.y) {
            this.current = child;
            return;
          } else if (yCoor > child.y && child.y > this.current.y || yCoor < child.y && child.y < this.current.y) {
            this.current = child;
            this.advanceY(yCoor, enableBendPoints);
            return;
          } else {
            var _newNode4 = new WireBendNode(this.current.x, yCoor, this.current, false);

            _newNode4.addChild(child);

            child.parent = _newNode4;
            this.current.addChild(_newNode4);
            this.current.removeChild(child);
            this.current = _newNode4;
            return;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (this.current.parent != null && this.current.parent.x === this.current.x && !(this.current.parent.y > this.current.y && this.current.y > yCoor || this.current.parent.y < this.current.y && this.current.y < yCoor)) {
        if (yCoor === this.current.parent.y) {
          this.current = this.current.parent;
          return;
        } else if (yCoor > this.current.parent.y && this.current.parent.y > this.current.y || yCoor < this.current.parent.y && this.current.parent.y < this.current.y) {
          this.current = this.current.parent;
          this.advanceY(yCoor, enableBendPoints);
          return;
        } else {
          var _newNode3 = new WireBendNode(this.current.x, yCoor, this.current.parent, enableBendPoints);

          this.current.parent.addChild(_newNode3);
          this.current.parent.removeChild(this.current);

          _newNode3.addChild(this.current);

          this.current.parent = _newNode3;
          this.current = _newNode3;
          return;
        }
      }

      var newNode = new WireBendNode(this.current.x, yCoor, this.current, false);
      this.current.addChild(newNode);

      if (!this.current.containsPoint) {
        this.current.containsPoint = enableBendPoints && this.current.parent != null && this.current.children.length > 1 || enableBendPoints && this.current.children.length > 2;
      }

      this.current = newNode;
    }
  }, {
    key: "connectTransistor",
    value: function connectTransistor(visualTransistor, connectionPoint, info) {
      var xCoor;
      var yCoor;

      if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.GATE) {
        xCoor = visualTransistor.x + visualTransistor.width - info.transistorPadRight - info.transistorWidth;
        yCoor = visualTransistor.y + info.transistorPadTop + info.transistorHeight / 2;
      } else if (visualTransistor.content.type === CMOSTransistorType$1.PMOS) {
        if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.SOURCE) {
          xCoor = visualTransistor.upperConnectionPoint.x;
          yCoor = visualTransistor.upperConnectionPoint.y;
        } else if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.DRAIN) {
          xCoor = visualTransistor.lowerConnectionPoint.x;
          yCoor = visualTransistor.lowerConnectionPoint.y;
        }
      } else if (visualTransistor.content.type === CMOSTransistorType$1.NMOS) {
        if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.DRAIN) {
          xCoor = visualTransistor.upperConnectionPoint.x;
          yCoor = visualTransistor.upperConnectionPoint.y;
        } else if (connectionPoint === TRANSISTOR_CONNECTION_TYPES.SOURCE) {
          xCoor = visualTransistor.lowerConnectionPoint.x;
          yCoor = visualTransistor.lowerConnectionPoint.y;
        }
      }

      var newNode = new WireConnectionNode(xCoor, yCoor, this.current, visualTransistor, connectionPoint);
      this.current.addChild(newNode);
      this.current = newNode;
    }
  }]);

  return WireBuilder;
}();

/**
 * Responsible for generating the connectionWires for the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The visual hull for which the connectionWires will be generated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var GenerateConnectionWires = /*#__PURE__*/function () {
  function GenerateConnectionWires(hull, info) {
    _classCallCheck(this, GenerateConnectionWires);

    this.info = info;
    this.result = this._generateConnectionWires(hull, hull, null, null);
  }
  /**
     * Determines how the given VisualElement will be handled.
     * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
     * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement]
     * The VisualElement to be handled.
     * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
     * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
     * @return {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
     * CMOSVisualParallelElement|CMOSVisualTransistor} The given VisualElement.
     */


  _createClass(GenerateConnectionWires, [{
    key: "_generateConnectionWires",
    value: function _generateConnectionWires(hull, visualElement, upperNode, lowerNode) {
      if (visualElement instanceof CMOSVisual) {
        this._handleCMOSVisual(hull, visualElement);
      } else if (visualElement instanceof CMOSVisualExpression) {
        this._handleCMOSVisualExpression(hull, visualElement, upperNode, lowerNode);
      } else if (visualElement instanceof CMOSVisualSeriesElement) {
        this._handleCMOSVisualSeriesElement(hull, visualElement, upperNode, lowerNode);
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        this._handleCMOSVisualParallelElement(hull, visualElement, upperNode, lowerNode);
      } else if (visualElement instanceof CMOSVisualTransistor) {
        this._handleCMOSVisualTransistor(hull, visualElement, upperNode, lowerNode);
      } else {
        throw Error('GenerateConnectionWires._generateConnectionWires(CMOSVisual, CMOSVisual, WireNode, WireNode): visualElement is of unknown type.');
      }

      return visualElement;
    }
    /**
       * Generates the connectionWires for a CMOSVisual.
       * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
       * @param {CMOSVisual} [visualElement] The given CMOSVisual.
       */

  }, {
    key: "_handleCMOSVisual",
    value: function _handleCMOSVisual(hull, visualElement) {
      // Establish supplyWires.
      var vcc = new Wire(new WireBendNode(0, 0, null, false));
      var gnd = new Wire(new WireBendNode(0, visualElement.height, null, false)); // Create builders for the supplyWires.

      var builderVCC = new WireBuilder(vcc.root);
      var builderGND = new WireBuilder(gnd.root);

      var _iterator = _createForOfIteratorHelper(visualElement.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var visualExpression = _step.value;
          // Advance the supplyWires.
          builderVCC.advanceX(visualExpression.upperConnectionPoint.x, this.info.enableConnectionLineJoints);
          builderGND.advanceX(visualExpression.lowerConnectionPoint.x, this.info.enableConnectionLineJoints);

          this._generateConnectionWires(hull, visualExpression, builderVCC.current, builderGND.current);
        } // Finish the supplyWires.

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      builderVCC.advanceX(visualElement.width, this.info.enableConnectionLineJoints);
      builderGND.advanceX(visualElement.width, this.info.enableConnectionLineJoints);
      hull.addConnectionWire(vcc);
      hull.addConnectionWire(gnd);
    }
    /**
       * Generates the connectionWires for a CMOSVisualExpression.
       * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
       * @param {CMOSVisualExpression} [visualElement] The given CMOSVisualExpression.
       * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
       * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
       */

  }, {
    key: "_handleCMOSVisualExpression",
    value: function _handleCMOSVisualExpression(hull, visualElement, upperNode, lowerNode) {
      // Create the connectionWire at the middle the CMOSVisualExpression.
      var exitPoint = visualElement.getExitPoint();
      var middle = new Wire(new WireBendNode(exitPoint.x, exitPoint.y, null, false)); // Create builders for existing wires.

      var builderTop = new WireBuilder(upperNode);
      var builderMiddle = new WireBuilder(middle.root);
      var builderBottom = new WireBuilder(lowerNode); // Handle the PullUp-Network

      builderMiddle.advanceX(visualElement.children[0].lowerConnectionPoint.x, this.info.enableConnectionLineJoints);
      builderMiddle.advanceY(visualElement.children[0].lowerConnectionPoint.y, this.info.enableConnectionLineJoints);
      builderTop.advanceX(visualElement.children[0].upperConnectionPoint.x, this.info.enableConnectionLineJoints);
      builderTop.advanceY(visualElement.children[0].upperConnectionPoint.y, this.info.enableConnectionLineJoints);

      this._generateConnectionWires(hull, visualElement.children[0], builderTop.current, builderMiddle.current); // Reset and handle the PullDown-Network


      builderMiddle.current = middle.root;
      builderMiddle.advanceX(visualElement.children[1].upperConnectionPoint.x, this.info.enableConnectionLineJoints);
      builderMiddle.advanceY(visualElement.children[1].upperConnectionPoint.y, this.info.enableConnectionLineJoints);
      builderBottom.advanceX(visualElement.children[1].lowerConnectionPoint.x, this.info.enableConnectionLineJoints);
      builderBottom.advanceY(visualElement.children[1].lowerConnectionPoint.y, this.info.enableConnectionLineJoints);

      this._generateConnectionWires(hull, visualElement.children[1], builderMiddle.current, builderBottom.current); // If expressions are tunneled, take care of the expressionWire.


      builderMiddle.current = middle.root;

      if (this.info.tunnelExpressions && visualElement.content.id < hull.children.length - 1) {
        builderMiddle.advanceX(visualElement.x + visualElement.width - visualElement.content.name.length * this.info.charWidth, this.info.enableConnectionLineJoints);
      } else if (visualElement.content.id === hull.children.length - 1) {
        builderMiddle.advanceX(hull.width, this.info.enableConnectionLineJoints);
      }

      hull.addConnectionWire(middle);
    }
    /**
       * Generates the connectionWires for a CMOSVisualSeriesElement.
       * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
       * @param {CMOSVisualSeriesElement} [visualElement] The given CMOSVisualSeriesElement.
       * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
       * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
       */

  }, {
    key: "_handleCMOSVisualSeriesElement",
    value: function _handleCMOSVisualSeriesElement(hull, visualElement, upperNode, lowerNode) {
      // Create builders for existing wires.
      var builderTop = new WireBuilder(upperNode);
      var builderBottom = new WireBuilder(lowerNode); // Go from top to bottom.

      for (var i = 0; i < visualElement.children.length; i++) {
        var child = visualElement.children[i];

        if (child instanceof CMOSVisualTransistor) {
          // Connect the transistor and create a new wire if necessary.
          var connectionUp = child.content.type === CMOSTransistorType$1.PMOS ? TRANSISTOR_CONNECTION_TYPES.SOURCE : TRANSISTOR_CONNECTION_TYPES.DRAIN;
          var connectionDown = child.content.type === CMOSTransistorType$1.PMOS ? TRANSISTOR_CONNECTION_TYPES.DRAIN : TRANSISTOR_CONNECTION_TYPES.SOURCE;
          builderTop.advanceX(child.upperConnectionPoint.x, this.info.enableConnectionLineJoints);
          builderTop.connectTransistor(child, connectionUp, this.info);

          if (i < visualElement.children.length - 1) {
            var newConnectionNode = new WireConnectionNode(child.lowerConnectionPoint.x, child.lowerConnectionPoint.y, null, child, connectionDown);
            var newNode = new WireBendNode(child.lowerConnectionPoint.x, child.lowerConnectionPoint.y, null, false);
            newNode.addChild(newConnectionNode);
            var newWire = new Wire(newNode);
            hull.addConnectionWire(newWire);
            builderTop.current = newNode;
          } else {
            builderBottom.connectTransistor(child, connectionDown, this.info);
          }
        } else {
          // Connect the element and create a new wire if necessary.
          builderTop.advanceX(child.upperConnectionPoint.x, this.info.enableConnectionLineJoints);
          builderTop.advanceY(child.upperConnectionPoint.y, this.info.enableConnectionLineJoints);

          if (i < visualElement.children.length - 1) {
            var _newNode = new WireBendNode(child.lowerConnectionPoint.x, child.lowerConnectionPoint.y, null, false);

            this._generateConnectionWires(hull, child, builderTop.current, _newNode);

            builderTop.current = _newNode;

            var _newWire = new Wire(_newNode);

            hull.addConnectionWire(_newWire);
          } else {
            builderBottom.advanceY(child.lowerConnectionPoint.y);

            this._generateConnectionWires(hull, child, builderTop.current, builderBottom.current);
          }
        }
      }
    }
    /**
       * Generates the connectionWires for a CMOSVisualParallelElement.
       * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
       * @param {CMOSVisualParallelElement} [visualElement] The given CMOSVisualParallelElement.
       * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
       * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
       */

  }, {
    key: "_handleCMOSVisualParallelElement",
    value: function _handleCMOSVisualParallelElement(hull, visualElement, upperNode, lowerNode) {
      // Create builders for existing wires.
      var builderTop = new WireBuilder(upperNode);
      var builderBottom = new WireBuilder(lowerNode); // Go from left to right.

      var _iterator2 = _createForOfIteratorHelper(visualElement.children),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var child = _step2.value;
          builderTop.advanceX(child.upperConnectionPoint.x, this.info.enableConnectionLineJoints);
          builderBottom.advanceX(child.lowerConnectionPoint.x, this.info.enableConnectionLineJoints);

          this._generateConnectionWires(hull, child, builderTop.current, builderBottom.current);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
       * Generates the connectionWires for a CMOSVisualTransistor.
       * @param {CMOSVisual} [hull] The CMOSVisual visualElement belongs to.
       * @param {CMOSVisualTransistor} [visualElement] The given CMOSVisualTransistor.
       * @param {WireBendNode} [upperNode] The upper wireNode connecting to this element.
       * @param {WireBendNode} [lowerNode] The lower wireNode connecting to this element.
       */

  }, {
    key: "_handleCMOSVisualTransistor",
    value: function _handleCMOSVisualTransistor(hull, visualElement, upperNode, lowerNode) {
      // Create builders for existing wires.
      var builderTop = new WireBuilder(upperNode);
      var builderBottom = new WireBuilder(lowerNode);
      var connectionUp = visualElement.content.type === CMOSTransistorType$1.PMOS ? TRANSISTOR_CONNECTION_TYPES.SOURCE : TRANSISTOR_CONNECTION_TYPES.DRAIN;
      var connectionDown = visualElement.content.type === CMOSTransistorType$1.PMOS ? TRANSISTOR_CONNECTION_TYPES.DRAIN : TRANSISTOR_CONNECTION_TYPES.SOURCE; // Connect the transistor.

      builderTop.connectTransistor(visualElement, connectionUp, this.info);
      builderBottom.connectTransistor(visualElement, connectionDown, this.info);
    }
    /**
     * Used to retrieve the visual hull after generating the connectionWires.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return GenerateConnectionWires;
}();

/**
 * Responsible for generating the expressionWires for the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The CMOSVisual for which the expressionWires will be generated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var GenerateExpressionWires = /*#__PURE__*/function () {
  function GenerateExpressionWires(hull, info) {
    _classCallCheck(this, GenerateExpressionWires);

    this.info = info;
    this.result = this._generateExpressionWires(hull);
  }
  /**
     * Generates the expressionWires for a given CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the expressionWires will be generated.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */


  _createClass(GenerateExpressionWires, [{
    key: "_generateExpressionWires",
    value: function _generateExpressionWires(hull) {
      if (this.info.tunnelExpressions) {
        // Skip generating expressionWires.
        return hull;
      } // Loop over all expressions.


      for (var i = 0; i < hull.children.length - 1; i++) {
        var expression = hull.children[i]; // Create the expressionWire.

        var startPoint = expression.getExitPoint();
        var wire = new Wire(new WireBendNode(startPoint.x, startPoint.y, null, true));
        hull.addExpressionWire(wire); // Connect the expressionWire to its transistors.

        var _iterator = _createForOfIteratorHelper(expression.content.connectedTo),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var transistor = _step.value;

            this._generateExpressionWire(hull, new WireBuilder(wire.root), expression, hull.getTransistorByContent(transistor));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return hull;
    }
    /**
       * Connects a given expressionWire to a given transistor.
       * @param {CMOSVisual} [hull] The CMOSVisual for which the expressionWires will be generated.
       * @param {WireBuilder} [wireBuilder] The wireBuilder for the expressionWire.
       * @param {CMOSVisualExpression} [visualExpression] The CMOSVisualExpression
       * this expressionWire belongs to.
       * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|CMOSVisualParallelElement
       * |CMOSVisualTransistor} [visualElement] The current VisualElement.
       * @param {CMOSVisualExpression|CMOSVisualSeriesElement|CMOSVisualParallelElement
       * |CMOSVisualTransistor} [caller] The visualElement of the calling function.
       */

  }, {
    key: "_generateExpressionWire",
    value: function _generateExpressionWire(hull, wireBuilder, visualExpression, visualElement) {
      var caller = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      // Get the channelId.
      var channelId = this.info.getChannelId(visualExpression.content);

      if (visualElement instanceof CMOSVisualExpression) {
        if (this.info.singleRows) {
          // Advance directly to the CMOSVisualExpression of the transistor to be connected.
          var _point = visualElement.getEntryPoint(channelId);

          var leftMove;

          if (visualElement.content.id === 0) {
            leftMove = 0;
          } else if (wireBuilder.current.y > _point.y) {
            leftMove = (this.info.channelNum + 1) * this.info.channelWidth;
          } else {
            leftMove = (2 * channelId + 2) * this.info.channelWidth;
          }

          wireBuilder.advanceX(_point.x - leftMove, true);
          wireBuilder.advanceY(_point.y, true);
          wireBuilder.advanceX(_point.x, true);
        } else {
          // Advance to the CMOSVisualExpression of the transistor to be connected.
          for (var i = visualExpression.content.id + 1; i < visualElement.content.id + 1; i++) {
            var _point2 = hull.children[i].getEntryPoint(channelId);

            var _leftMove = void 0;

            if (i === 0) {
              _leftMove = 0;
            } else if (wireBuilder.current.y > _point2.y) {
              _leftMove = (this.info.channelNum + 1) * this.info.channelWidth;
            } else {
              _leftMove = (2 * channelId + 2) * this.info.channelWidth;
            }

            wireBuilder.advanceX(_point2.x - _leftMove, true);
            wireBuilder.advanceY(_point2.y, true);
            wireBuilder.advanceX(_point2.x, true);
          }
        }

        return;
      } // Establish a connection to the parent of visualElement.


      this._generateExpressionWire(hull, wireBuilder, visualExpression, visualElement.parent, visualElement);

      var point; // Advance the expressionWire.

      if (visualElement instanceof CMOSVisualSeriesElement) {
        point = visualElement.getEntryPoint(channelId);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        point = visualElement.getEntryPoint(channelId, caller);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
      } else if (visualElement instanceof CMOSVisualTransistor) {
        point = visualElement.getEntryPoint(channelId);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
        wireBuilder.connectTransistor(visualElement, TRANSISTOR_CONNECTION_TYPES.GATE, this.info);
      }
    }
    /**
       * Used to retrieve the visual hull after generating the expressionWires.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return GenerateExpressionWires;
}();

/**
 * Responsible for generating the variableWires for the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The CMOSVisual for which the variableWires will be generated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var GenerateVariableWires = /*#__PURE__*/function () {
  function GenerateVariableWires(hull, info) {
    _classCallCheck(this, GenerateVariableWires);

    this.info = info;
    this.result = this._generateVariableWires(hull);
  }
  /**
     * Generates the variableWires for a given CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the variableWires will be generated.
     * @return {CMOSVisual} The resulting CMOSVisual.
     */


  _createClass(GenerateVariableWires, [{
    key: "_generateVariableWires",
    value: function _generateVariableWires(hull) {
      if (this.info.tunnelVariables) {
        // Skip generating variableWires.
        return hull;
      } // Loop over all variables.


      for (var i = 0; i < hull.variables.length; i++) {
        var variable = hull.variables[i]; // Create the variableWire.

        var startPoint = variable.getExitPoint();
        var wire = new Wire(new WireBendNode(startPoint.x, startPoint.y, null, false));
        hull.addVariableWire(wire); // Connect the variableWire to its transistors.

        var _iterator = _createForOfIteratorHelper(variable.content.connectedTo),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var transistor = _step.value;

            this._generateVariableWire(hull, new WireBuilder(wire.root), variable, hull.getTransistorByContent(transistor));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return hull;
    }
    /**
       * Connects a given variableWire to a given transistor.
       * @param {CMOSVisual} [hull] The CMOSVisual for which the variableWire will be generated.
       * @param {WireBuilder} [wireBuilder] The wireBuilder for the variableWire.
       * @param {CMOSVisualExpression} [variable] The CMOSVisualVariable this variableWire belongs to.
       * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|
       * CMOSVisualParallelElement|CMOSVisualTransistor} [visualElement] The current VisualElement.
       * @param {CMOSVisualExpression|CMOSVisualSeriesElement|
       * CMOSVisualParallelElement|CMOSVisualTransistor} [caller]
       * The visualElement of the calling function.
       */

  }, {
    key: "_generateVariableWire",
    value: function _generateVariableWire(hull, wireBuilder, variable, visualElement) {
      var caller = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      // Get the channelId.
      var channelId = this.info.getChannelId(variable.content);

      if (visualElement instanceof CMOSVisualExpression) {
        if (this.info.singleRows) {
          // Advance directly to the CMOSVisualExpression of the transistor to be connected.
          var _point = visualElement.getEntryPoint(channelId);

          var leftMove;

          if (visualElement.content.id === 0) {
            leftMove = 0;
          } else if (wireBuilder.current.y > _point.y) {
            leftMove = (this.info.channelNum + 1) * this.info.channelWidth;
          } else {
            leftMove = (2 * channelId + 2) * this.info.channelWidth;
          }

          wireBuilder.advanceX(_point.x - leftMove, true);
          wireBuilder.advanceY(_point.y, true);
          wireBuilder.advanceX(_point.x, true);
        } else {
          // Advance to the CMOSVisualExpression of the transistor to be connected.
          for (var i = 0; i < visualElement.content.id + 1; i++) {
            var _point2 = hull.children[i].getEntryPoint(channelId);

            var _leftMove = void 0;

            if (i === 0) {
              _leftMove = 0;
            } else if (wireBuilder.current.y > _point2.y) {
              _leftMove = (this.info.channelNum + 1) * this.info.channelWidth;
            } else {
              _leftMove = (2 * channelId + 2) * this.info.channelWidth;
            }

            wireBuilder.advanceX(_point2.x - _leftMove, true);
            wireBuilder.advanceY(_point2.y, true);
            wireBuilder.advanceX(_point2.x, true);
          }
        }

        return;
      } // Establish a connection to the parent of visualElement.


      this._generateVariableWire(hull, wireBuilder, variable, visualElement.parent, visualElement);

      var point; // Advance the variableWire.

      if (visualElement instanceof CMOSVisualSeriesElement) {
        point = visualElement.getEntryPoint(channelId);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        point = visualElement.getEntryPoint(channelId, caller);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
      } else if (visualElement instanceof CMOSVisualTransistor) {
        point = visualElement.getEntryPoint(channelId);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
        wireBuilder.connectTransistor(visualElement, TRANSISTOR_CONNECTION_TYPES.GATE, this.info);
      }
    }
    /**
       * Used to retrieve the visual hull after generating the expressionWires.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return GenerateVariableWires;
}();

/**
 * Responsible for generating the literalWires for the given CMOSVisual.
 * @constructor
 * @param {CMOSVisual} [hull] The CMOSVisual for which the literalWires will be generated.
 * @param {CMOSVisualInfo} [info] The info object attached the given visual hull.
 */

var GenerateLiteralWires = /*#__PURE__*/function () {
  function GenerateLiteralWires(hull, info) {
    _classCallCheck(this, GenerateLiteralWires);

    this.info = info;
    this.result = this._generateLiteralWires(hull);
  }
  /**
     * Generates the literalWires for a given CMOSVisual.
     * @param {CMOSVisual} [hull] The CMOSVisual for which the literalWires will be generated.
     */


  _createClass(GenerateLiteralWires, [{
    key: "_generateLiteralWires",
    value: function _generateLiteralWires(hull) {
      if (this.info.tunnelLiterals) {
        // Skip generating literalWires.
        return hull;
      } // Loop over all literals.


      for (var i = 0; i < hull.literals.length; i++) {
        var literal = hull.literals[i];

        var _iterator = _createForOfIteratorHelper(literal.content.connectedTo),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var transistor = _step.value;

            // Connect the literalWire to its transistors.
            this._generateLiteralWire(hull, literal, hull.getTransistorByContent(transistor));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return hull;
    }
    /**
       * Connects a given literalWire to a given transistor.
       * @param {CMOSVisual} [hull] The CMOSVisual for which the literalWire will be generated.
       * @param {CMOSVisualLiteral} [literal] The literal for which the literalWire will be generated.
       * @param {CMOSVisual|CMOSVisualExpression|CMOSVisualSeriesElement|CMOSVisualParallelElement|
       * CMOSVisualTransistor} [visualElement] The current VisualElement.
       * @param {CMOSVisualExpression|CMOSVisualSeriesElement|CMOSVisualParallelElement|
       * CMOSVisualTransistor} [caller] The visualElement of the calling function.
       * @return {WireBuilder} The wireBuilder for the literalWire.
       */

  }, {
    key: "_generateLiteralWire",
    value: function _generateLiteralWire(hull, literal, visualElement) {
      var caller = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      // Retrive the channelId.
      var channelId = this.info.getChannelId(literal.content);

      if (visualElement instanceof CMOSVisualExpression) {
        // Create literalWire
        var yPos = literal.content.value ? 0 : hull.height;

        var _point = visualElement.getEntryPoint(channelId);

        var wire = new Wire(new WireBendNode(_point.x, yPos, null, true));
        hull.addLiteralWire(wire); // Connect literalWire to visualElement.

        var _wireBuilder = new WireBuilder(wire.root);

        _wireBuilder.advanceY(_point.y, true);

        return _wireBuilder;
      } // Get the wireBuilder.


      var wireBuilder = this._generateLiteralWire(hull, literal, visualElement.parent, visualElement);

      var point; // Connect literalWire to visualElement.

      if (visualElement instanceof CMOSVisualSeriesElement) {
        point = visualElement.getEntryPoint(channelId);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
      } else if (visualElement instanceof CMOSVisualParallelElement) {
        point = visualElement.getEntryPoint(channelId, caller);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
      } else if (visualElement instanceof CMOSVisualTransistor) {
        point = visualElement.getEntryPoint(channelId);
        wireBuilder.advanceY(point.y, true);
        wireBuilder.advanceX(point.x, true);
        wireBuilder.connectTransistor(visualElement, TRANSISTOR_CONNECTION_TYPES.GATE, this.info);
      }

      return wireBuilder;
    }
    /**
       * Used to retrieve the visual hull after generating the literalWires.
       * @return {CMOSVisual} The resulting CMOSVisual.
       */

  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return GenerateLiteralWires;
}();

/**
 * Builds CMOSVisuals.
 */

var CMOSVisualBuilder = /*#__PURE__*/function () {
  function CMOSVisualBuilder() {
    _classCallCheck(this, CMOSVisualBuilder);

    this.idCounter = -1;
  }
  /**
   * Used to generate a unique ID for a CMOSVisualElement.
   */


  _createClass(CMOSVisualBuilder, [{
    key: "getId",
    value: function getId() {
      this.idCounter++;
      return this.idCounter;
    }
    /**
     * Resets the internal idCounter.
     */

  }, {
    key: "resetId",
    value: function resetId() {
      this.idCounter = -1;
    }
    /**
     * Set default values in the given option-object.
     * @param {JSObject} [options] Options chosen by the user.
     * @param {JSObject} [defaults] Default values for each option.
     * @return {JSObject} An option-object containing the default values for non-specifed options.
     */

  }, {
    key: "setDefaults",
    value: function setDefaults(options, defaults) {
      return Object.assign({}, defaults, options);
    }
    /**
     * Generate the visual hull from the given cmos object.
     * @param {CMOS} [cmos] The CMOS-Object for which a visual hull shall be generated.
     * @param {JSObject} [options] Passed options.
     * @param {Boolean} [resetId] Determines if the internal idCounter
     * will be reset after the function call.
     * @return {CMOSVisual}
     */

  }, {
    key: "buildHull",
    value: function buildHull(cmos, options) {
      var resetId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var hull;
      var info = new CMOSVisualInfo(cmos, this.setDefaults(options, DEFAULT_OPTIONS));
      hull = new GenerateVisualHull(cmos, this, info).getResult();
      hull = new CalculateChannels(hull, info).getResult();
      hull = new CalculateSize(hull, info).getResult();
      hull = new CalculatePositions(hull, info).getResult();
      hull = new Collect(hull, this, info).getResult();
      hull = new CalculateConnectionPoints(hull, info).getResult();
      hull = new CalculateEntryPoints(hull, info).getResult();
      hull = new CalculateExitPoints(hull, info).getResult();
      hull = new GenerateConnectionWires(hull, info).getResult();
      hull = new GenerateExpressionWires(hull, info).getResult();
      hull = new GenerateVariableWires(hull, info).getResult();
      hull = new GenerateLiteralWires(hull, info).getResult();

      if (resetId) {
        this.resetId();
      }

      return hull;
    }
  }]);

  return CMOSVisualBuilder;
}();

var LatexGenerator = /*#__PURE__*/function () {
  function LatexGenerator() {
    _classCallCheck(this, LatexGenerator);
  }

  _createClass(LatexGenerator, [{
    key: "placeSupplyWires",
    value: function placeSupplyWires(hull) {
      var vccLabel = "(".concat(hull.x, ", ").concat(-hull.y, ") node[anchor=east] {VCC}");
      var gndLabel = "(".concat(hull.x, ", ").concat(-hull.y - hull.height, ") node[anchor=east] {GND}");
      var vccLine = "(".concat(hull.x, ", ").concat(-hull.y, ") to (").concat(hull.x + hull.width + 1, ", ").concat(-hull.y, ")");
      var gndLine = "(".concat(hull.x, ", ").concat(-hull.y - hull.height, ") to (").concat(hull.x + hull.width + 1, ", ").concat(-hull.y - hull.height, ")");
      return ['', '% SUPPLYWIRES:', '', vccLabel, gndLabel, ';', '\\draw [very thick]', vccLine, gndLine].join('\n');
    }
  }, {
    key: "getTransistorLatex",
    value: function getTransistorLatex(hull, transistor) {
      var coordinate = {
        x: transistor.x + transistor.width - hull.info.transistorPadRight,
        y: transistor.y + hull.info.transistorPadTop + hull.info.transistorHeight / 2
      };
      var name = "".concat(transistor.content.type, "-").concat(transistor.id);
      var emptyCircle = '';

      if (transistor.content.type === CMOSTransistorType$1.PMOS) {
        emptyCircle = ', emptycircle';
      }

      return "node[".concat(transistor.content.type).concat(emptyCircle, "] (").concat(name, ") at (").concat(coordinate.x, ", ").concat(-coordinate.y, "){}");
    }
  }, {
    key: "placeTransistors",
    value: function placeTransistors(hull) {
      var latexStrings = ['', '% TRANSISTORS:', ''];

      var _iterator = _createForOfIteratorHelper(hull.transistors),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var transistor = _step.value;
          latexStrings.push(this.getTransistorLatex(hull, transistor));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return latexStrings.join('\n');
    }
  }, {
    key: "getWireLatex",
    value: function getWireLatex(hull, wireNode) {
      var firstElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var latexStrings = [];

      if (wireNode instanceof WireBendNode) {
        if (firstElement) {
          var _iterator2 = _createForOfIteratorHelper(wireNode.children),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var child = _step2.value;
              latexStrings.push("(".concat(wireNode.x, ", ").concat(-wireNode.y, ")"));
              latexStrings.push(this.getWireLatex(hull, child));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else {
          latexStrings.push(" to (".concat(wireNode.x, ", ").concat(-wireNode.y, ")"));

          if (wireNode.children.length === 1) {
            latexStrings.push(this.getWireLatex(hull, wireNode.children[0]));
          } else {
            latexStrings.push('\n');

            var _iterator3 = _createForOfIteratorHelper(wireNode.children),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _child = _step3.value;
                latexStrings.push("(".concat(wireNode.x, ", ").concat(-wireNode.y, ")"));
                latexStrings.push(this.getWireLatex(hull, _child));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        }

        if (wireNode.containsPoint) {
          latexStrings.push("(".concat(wireNode.x, ", ").concat(-wireNode.y, ") node[circ] {}\n"));
        }
      } else if (wireNode instanceof WireConnectionNode) {
        var name = "".concat(wireNode.transistor.content.type, "-").concat(wireNode.transistor.id);
        var point = "".concat(name, ".").concat(wireNode.connectionType);

        if (firstElement) {
          latexStrings.push("(".concat(point, ")"));
        } else {
          latexStrings.push(" to (".concat(point, ")\n"));
        }

        var _iterator4 = _createForOfIteratorHelper(wireNode.children),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _child2 = _step4.value;
            latexStrings.push(this.getWireLatex(hull, _child2));
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }

      return latexStrings.join('');
    }
  }, {
    key: "placeConnectionWires",
    value: function placeConnectionWires(hull) {
      var latexStrings = ['', '% CONNECTIONWIRES:', ''];

      var _iterator5 = _createForOfIteratorHelper(hull.connectionWires),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var wire = _step5.value;
          latexStrings.push(this.getWireLatex(hull, wire.root, true));
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      if (latexStrings.length > 3) {
        return latexStrings.join('\n');
      }

      return '';
    }
  }, {
    key: "getExpressionTransistorLabelLatex",
    value: function getExpressionTransistorLabelLatex(hull, expression, transistor, labelToLatexMethod) {
      var transistorName = "".concat(transistor.content.type, "-").concat(transistor.id);
      return "(".concat(transistorName, ".G) node[anchor=east] {$").concat(labelToLatexMethod(expression.content.booleanExpression), "$}");
    }
  }, {
    key: "getExpressionWireLabel",
    value: function getExpressionWireLabel(expression, x, y, labelToLatexMethod) {
      return "(".concat(x, ", ").concat(-y, ") node[anchor=west] {$").concat(labelToLatexMethod(expression.content.booleanExpression), "$}");
    }
  }, {
    key: "placeExpressionLabels",
    value: function placeExpressionLabels(hull, labelToLatexMethod) {
      var latexStrings = [];

      if (hull.info.tunnelExpressions) {
        for (var i = 0; i < hull.children.length - 1; i++) {
          var _expression = hull.children[i];

          var _exitPoint = _expression.getExitPoint();

          var xPos = _expression.x + _expression.width - _expression.content.name.length * hull.info.charWidth;
          var yPos = _exitPoint.y;
          var toAdd = this.getExpressionWireLabel(_expression, xPos, yPos, labelToLatexMethod);
          latexStrings.push(toAdd);
        }

        for (var _i = 0; _i < hull.children.length - 1; _i++) {
          var _expression2 = hull.children[_i];

          var _iterator6 = _createForOfIteratorHelper(_expression2.content.connectedTo),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var transistor = _step6.value;
              var transistorEntity = hull.getTransistorByContent(transistor);

              var _toAdd = this.getExpressionTransistorLabelLatex(hull, _expression2, transistorEntity, labelToLatexMethod);

              latexStrings.push(_toAdd);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      }

      var expression = hull.children[hull.children.length - 1];
      var exitPoint = expression.getExitPoint();
      latexStrings.push(this.getExpressionWireLabel(expression, hull.x + hull.width, exitPoint.y, labelToLatexMethod));
      return latexStrings.join('\n');
    }
  }, {
    key: "placeExpressionWires",
    value: function placeExpressionWires(hull) {
      var latexStrings = ['', '% EXPRESSIONWIRES:', ''];

      var _iterator7 = _createForOfIteratorHelper(hull.expressionWires),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var wire = _step7.value;
          latexStrings.push(this.getWireLatex(hull, wire.root, true));
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      if (latexStrings.length > 3) {
        return latexStrings.join('\n');
      }

      return '';
    }
  }, {
    key: "getExpressionLatex",
    value: function getExpressionLatex(hull, labelToLatexMethod) {
      return [this.placeExpressionWires(hull, labelToLatexMethod), this.placeExpressionLabels(hull, labelToLatexMethod)].join('\n');
    }
  }, {
    key: "getVariableTransistorLabelLatex",
    value: function getVariableTransistorLabelLatex(hull, variable, transistor, labelToLatexMethod) {
      var transistorName = "".concat(transistor.content.type, "-").concat(transistor.id);
      return "(".concat(transistorName, ".G) node[anchor=east] {$").concat(labelToLatexMethod(variable.content.booleanExpression), "$}");
    }
  }, {
    key: "placeVariableLabels",
    value: function placeVariableLabels(hull, labelToLatexMethod) {
      var latexStrings = [];

      var _iterator8 = _createForOfIteratorHelper(hull.variables),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var variable = _step8.value;

          var _iterator9 = _createForOfIteratorHelper(variable.content.connectedTo),
              _step9;

          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
              var transistor = _step9.value;
              latexStrings.push(this.getVariableTransistorLabelLatex(hull, variable, hull.getTransistorByContent(transistor), labelToLatexMethod));
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      return latexStrings.join('\n');
    }
  }, {
    key: "getVariableWireLabel",
    value: function getVariableWireLabel(variable, x, y, labelToLatexMethod) {
      return "(".concat(x, ", ").concat(-y, ") node[anchor=east] {$").concat(labelToLatexMethod(variable.content.booleanExpression), "$}");
    }
  }, {
    key: "placeVariableWires",
    value: function placeVariableWires(hull, labelToLatexMethod) {
      var latexStrings = ['', '% VARIABLEWIRES:', ''];

      for (var i = 0; i < hull.variableWires.length; i++) {
        var wire = hull.variableWires[i];
        var variable = hull.variables[i];
        latexStrings.push(this.getVariableWireLabel(variable, wire.root.x, wire.root.y, labelToLatexMethod));
        latexStrings.push(this.getWireLatex(hull, wire.root, true));
      }

      if (latexStrings.length > 3) {
        return latexStrings.join('\n');
      }

      return '';
    }
  }, {
    key: "getVariableLatex",
    value: function getVariableLatex(hull, labelToLatexMethod) {
      if (hull.info.tunnelVariables) {
        return this.placeVariableLabels(hull, labelToLatexMethod);
      } else {
        return this.placeVariableWires(hull, labelToLatexMethod);
      }
    }
  }, {
    key: "getLiteralTransistorLabelLatex",
    value: function getLiteralTransistorLabelLatex(hull, literal, transistor) {
      var transistorName = "".concat(transistor.content.type, "-").concat(transistor.id);
      var label = literal.content.value ? '1' : '0';
      return "(".concat(transistorName, ".G) node[anchor=east] {$").concat(label, "$}");
    }
  }, {
    key: "placeLiteralLabels",
    value: function placeLiteralLabels(hull) {
      var latexStrings = [];

      var _iterator10 = _createForOfIteratorHelper(hull.literals),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var literal = _step10.value;

          var _iterator11 = _createForOfIteratorHelper(literal.content.connectedTo),
              _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
              var transistor = _step11.value;
              latexStrings.push(this.getLiteralTransistorLabelLatex(hull, literal, hull.getTransistorByContent(transistor)));
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      return latexStrings.join('\n');
    }
  }, {
    key: "placeLiteralWires",
    value: function placeLiteralWires(hull) {
      var latexStrings = ['', '% LITERALWIRES:', ''];

      for (var i = 0; i < hull.literalWires.length; i++) {
        var wire = hull.literalWires[i];
        latexStrings.push(this.getWireLatex(hull, wire.root, true));
      }

      if (latexStrings.length > 3) {
        return latexStrings.join('\n');
      }

      return '';
    }
  }, {
    key: "getLiteralLatex",
    value: function getLiteralLatex(hull) {
      if (hull.info.tunnelLiterals) {
        return this.placeLiteralLabels(hull);
      } else {
        return this.placeLiteralWires(hull);
      }
    }
  }, {
    key: "placeSettings",
    value: function placeSettings(hull) {
      return ["\\ctikzset{tripoles/nmos/height=".concat(hull.info.transistorHeight, ", tripoles/pmos/height=").concat(hull.info.transistorHeight, "}"), "\\ctikzset{tripoles/nmos/width=".concat(hull.info.transistorWidth, ", tripoles/pmos/width=").concat(hull.info.transistorWidth, "}")].join('\n');
    }
  }, {
    key: "buildLatex",
    value: function buildLatex(hull, labelToLatexMethod) {
      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
      var latexString = ['\n', "\\begin{circuitikz}[scale=".concat(scale, ", every node/.style={scale=").concat(scale, "}]"), this.placeSettings(hull), '\\draw', this.placeTransistors(hull), this.placeConnectionWires(hull), this.getExpressionLatex(hull, labelToLatexMethod), this.getVariableLatex(hull, labelToLatexMethod), this.getLiteralLatex(hull), this.placeSupplyWires(hull), ';\\end{circuitikz}'].join('\n');
      return latexString;
    }
  }]);

  return LatexGenerator;
}();

var SVGGenerator = /*#__PURE__*/function () {
  function SVGGenerator() {
    _classCallCheck(this, SVGGenerator);
  }

  _createClass(SVGGenerator, [{
    key: "getTransistorSVG",
    value: function getTransistorSVG(hull, transistor, scale) {
      var transistorBaseBegin = {
        x: transistor.x + transistor.width - hull.info.transistorPadRight,
        y: transistor.y
      };
      var transistorBase = ["<path fill=\"none\" stroke=\"black\" d=\"M ".concat(transistorBaseBegin.x * scale, " ").concat(transistorBaseBegin.y * scale), "V ".concat((transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.3) * scale), "H ".concat((transistorBaseBegin.x - hull.info.transistorWidth * 0.5) * scale), "V ".concat((transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.2) * scale), "V ".concat((transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.8) * scale), "V ".concat((transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.7) * scale), "H ".concat(transistorBaseBegin.x * scale), "V ".concat((transistorBaseBegin.y + transistor.height) * scale), '"/>'].join(' ');
      var extra = transistor.leftPad - hull.info.transistorPadLeft;
      var transistorToper = ["<path fill=\"none\" stroke=\"black\" d=\"M ".concat((transistor.x + extra + hull.info.transistorPadLeft) * scale, " ").concat((transistorBaseBegin.y + transistor.height / 2) * scale), "H ".concat((transistorBaseBegin.x - hull.info.transistorWidth * 0.6) * scale), "V ".concat((transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.3) * scale), "V ".concat((transistorBaseBegin.y + hull.info.transistorPadTop + hull.info.transistorHeight * 0.7) * scale), '"/>'].join(' ');
      var finalString;

      if (transistor.content.type === CMOSTransistorType$1.PMOS) {
        var emptyCircle = ['<circle fill="white" stroke="black"', "cx=\"".concat((transistorBaseBegin.x - hull.info.transistorWidth * 0.7) * scale, "\""), "cy=\"".concat((transistorBaseBegin.y + transistor.height / 2) * scale, "\""), "r=\"".concat(hull.info.transistorWidth * 0.1 * scale, "\""), '/>'].join(' ');
        finalString = [transistorBase, transistorToper, emptyCircle].join('\n');
      } else {
        finalString = [transistorBase, transistorToper].join('\n');
      }

      return finalString;
    }
  }, {
    key: "placeTransistors",
    value: function placeTransistors(hull, scale) {
      var svgStrings = [' ', '<!--TRANSISTORS-->', ''];

      var _iterator = _createForOfIteratorHelper(hull.transistors),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var transistor = _step.value;
          svgStrings.push(this.getTransistorSVG(hull, transistor, scale));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (svgStrings.length > 3) {
        return svgStrings.join('\n');
      }

      return '';
    }
  }, {
    key: "getWireSVG",
    value: function getWireSVG(hull, wireNode, scale) {
      var firstElement = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var svgStrings = [];

      if (wireNode instanceof WireBendNode) {
        if (firstElement) {
          var _iterator2 = _createForOfIteratorHelper(wireNode.children),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var child = _step2.value;
              svgStrings.push("<path fill=\"none\" stroke=\"black\" d=\"M ".concat(wireNode.x * scale, " ").concat(wireNode.y * scale));
              svgStrings.push(this.getWireSVG(hull, child, scale));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else {
          svgStrings.push("L ".concat(wireNode.x * scale, " ").concat(wireNode.y * scale));

          if (wireNode.children.length === 1) {
            svgStrings.push(this.getWireSVG(hull, wireNode.children[0], scale));
          } else {
            svgStrings.push("L ".concat(wireNode.x * scale, " ").concat(wireNode.y * scale, " \"/>"));

            var _iterator3 = _createForOfIteratorHelper(wireNode.children),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _child = _step3.value;
                svgStrings.push("<path fill=\"none\" stroke=\"black\" d=\"M ".concat(wireNode.x * scale, " ").concat(wireNode.y * scale));
                svgStrings.push(this.getWireSVG(hull, _child, scale));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        }

        if (wireNode.containsPoint) {
          svgStrings.push("<circle cx=\"".concat(wireNode.x * scale, "\" cy=\"").concat(wireNode.y * scale, "\" r=\"2\"/>"));
        }
      } else if (wireNode instanceof WireConnectionNode) {
        svgStrings.push("L ".concat(wireNode.x * scale, " ").concat(wireNode.y * scale, " \"/>"));
      }

      return svgStrings.join(' ');
    }
  }, {
    key: "placeConnectionWires",
    value: function placeConnectionWires(hull, scale) {
      var svgStrings = [' ', '<!--CONNECTIONWIRES-->', ''];

      var _iterator4 = _createForOfIteratorHelper(hull.connectionWires),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var wire = _step4.value;
          svgStrings.push(this.getWireSVG(hull, wire.root, scale, true));
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      if (svgStrings.length > 3) {
        return svgStrings.join('\n');
      }

      return '';
    }
  }, {
    key: "getExpressionTransistorLabel",
    value: function getExpressionTransistorLabel(hull, expression, transistor, labelToLatexMethod, scale) {
      var coordinate = {
        x: transistor.x + transistor.width - hull.info.transistorPadRight - hull.info.transistorWidth,
        y: transistor.y + hull.info.transistorPadTop + hull.info.transistorHeight / 2
      };
      return "<text x=\"".concat((coordinate.x - 0.1) * scale, "\" y=\"").concat(coordinate.y * scale, "\" font-size=\"").concat(hull.info.channelWidth * scale, "\" text-anchor=\"end\" dominant-baseline=\"middle\">$").concat(labelToLatexMethod(expression.content.booleanExpression), "$</text>");
    }
  }, {
    key: "getExpressionWireLabel",
    value: function getExpressionWireLabel(hull, expression, x, y, labelToLatexMethod, scale) {
      return "<text x=\"".concat((x + 0.1) * scale, "\" y=\"").concat(y * scale, "\" font-size=\"").concat(hull.info.channelWidth * scale, "\" text-anchor=\"begin\" dominant-baseline=\"middle\">$").concat(labelToLatexMethod(expression.content.booleanExpression), "$</text>");
    }
  }, {
    key: "placeExpressionLabels",
    value: function placeExpressionLabels(hull, labelToLatexMethod, scale) {
      var svgStrings = [];

      if (hull.info.tunnelExpressions) {
        for (var i = 0; i < hull.children.length - 1; i++) {
          var _expression = hull.children[i];

          var _exitPoint = _expression.getExitPoint();

          svgStrings.push(this.getExpressionWireLabel(hull, _expression, _expression.x + _expression.width - _expression.content.name.length * hull.info.charWidth, _exitPoint.y, labelToLatexMethod, scale));
        }

        for (var _i = 0; _i < hull.children.length - 1; _i++) {
          var _expression2 = hull.children[_i];

          var _iterator5 = _createForOfIteratorHelper(_expression2.content.connectedTo),
              _step5;

          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var transistor = _step5.value;
              svgStrings.push(this.getExpressionTransistorLabel(hull, _expression2, hull.getTransistorByContent(transistor), labelToLatexMethod, scale));
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      }

      var expression = hull.children[hull.children.length - 1];
      var exitPoint = expression.getExitPoint();
      svgStrings.push(this.getExpressionWireLabel(hull, expression, hull.x + hull.width, exitPoint.y, labelToLatexMethod, scale));
      return svgStrings.join('\n');
    }
  }, {
    key: "placeExpressionWires",
    value: function placeExpressionWires(hull, scale) {
      var svgStrings = [' ', '<!--EXPRESSIONWIRES-->', ''];

      var _iterator6 = _createForOfIteratorHelper(hull.expressionWires),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var wire = _step6.value;
          svgStrings.push(this.getWireSVG(hull, wire.root, scale, true));
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      if (svgStrings.length > 3) {
        return svgStrings.join('\n');
      }

      return '';
    }
  }, {
    key: "getExpressionSVG",
    value: function getExpressionSVG(hull, labelToLatexMethod, scale) {
      return [this.placeExpressionWires(hull, scale), this.placeExpressionLabels(hull, labelToLatexMethod, scale)].join('\n');
    }
  }, {
    key: "getVariableTransistorLabel",
    value: function getVariableTransistorLabel(hull, variable, transistor, labelToLatexMethod, scale) {
      var coordinate = {
        x: transistor.x + transistor.width - hull.info.transistorPadRight - hull.info.transistorWidth,
        y: transistor.y + hull.info.transistorPadTop + hull.info.transistorHeight / 2
      };
      return "<text x=\"".concat((coordinate.x - 0.1) * scale, "\" y=\"").concat(coordinate.y * scale, "\" font-size=\"").concat(hull.info.channelWidth * scale, "\" text-anchor=\"end\" dominant-baseline=\"middle\">$").concat(labelToLatexMethod(variable.content.booleanExpression), "$</text>");
    }
  }, {
    key: "placeVariableLabels",
    value: function placeVariableLabels(hull, labelToLatexMethod, scale) {
      var svgStrings = [];

      var _iterator7 = _createForOfIteratorHelper(hull.variables),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var variable = _step7.value;

          var _iterator8 = _createForOfIteratorHelper(variable.content.connectedTo),
              _step8;

          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var transistor = _step8.value;
              svgStrings.push(this.getVariableTransistorLabel(hull, variable, hull.getTransistorByContent(transistor), labelToLatexMethod, scale));
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return svgStrings.join('\n');
    }
  }, {
    key: "getVariableWireLabel",
    value: function getVariableWireLabel(hull, variable, x, y, labelToLatexMethod, scale) {
      return "<text x=\"".concat((x - 0.1) * scale, "\" y=\"").concat(y * scale, "\" font-size=\"").concat(hull.info.channelWidth * scale, "\" text-anchor=\"end\" dominant-baseline=\"middle\">$").concat(labelToLatexMethod(variable.content.booleanExpression), "$</text>");
    }
  }, {
    key: "placeVariableWires",
    value: function placeVariableWires(hull, labelToLatexMethod, scale) {
      var svgStrings = [' ', '<!--VARIABLEWIRES-->', ''];

      for (var i = 0; i < hull.variableWires.length; i++) {
        var variable = hull.variables[i];
        var wire = hull.variableWires[i];
        svgStrings.push(this.getVariableWireLabel(hull, variable, wire.root.x, wire.root.y, labelToLatexMethod, scale));
        svgStrings.push(this.getWireSVG(hull, wire.root, scale, true));
      }

      if (svgStrings.length > 3) {
        return svgStrings.join('\n');
      }

      return '';
    }
  }, {
    key: "getVariableSVG",
    value: function getVariableSVG(hull, labelToLatexMethod, scale) {
      if (hull.info.tunnelVariables) {
        return this.placeVariableLabels(hull, labelToLatexMethod, scale);
      } else {
        return this.placeVariableWires(hull, labelToLatexMethod, scale);
      }
    }
  }, {
    key: "getLiteralTransistorLabel",
    value: function getLiteralTransistorLabel(hull, literal, transistor, scale) {
      var coordinate = {
        x: transistor.x + transistor.width - hull.info.transistorPadRight - hull.info.transistorWidth,
        y: transistor.y + hull.info.transistorPadTop + hull.info.transistorHeight / 2
      };
      var label = literal.content.value ? '1' : '0';
      return "<text x=\"".concat((coordinate.x - 0.1) * scale, "\" y=\"").concat(coordinate.y * scale, "\" font-size=\"").concat(hull.info.channelWidth * scale, "\" text-anchor=\"end\" dominant-baseline=\"middle\">$").concat(label, "$</text>");
    }
  }, {
    key: "placeLiteralLabels",
    value: function placeLiteralLabels(hull, scale) {
      var svgStrings = [];

      var _iterator9 = _createForOfIteratorHelper(hull.literals),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var literal = _step9.value;

          var _iterator10 = _createForOfIteratorHelper(literal.content.connectedTo),
              _step10;

          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var transistor = _step10.value;
              svgStrings.push(this.getLiteralTransistorLabel(hull, literal, hull.getTransistorByContent(transistor), scale));
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return svgStrings.join('\n');
    }
  }, {
    key: "placeLiteralWires",
    value: function placeLiteralWires(hull, scale) {
      var svgStrings = [' ', '<!--LITERALWIRES-->', ''];

      for (var i = 0; i < hull.literalWires.length; i++) {
        var wire = hull.literalWires[i];
        svgStrings.push(this.getWireSVG(hull, wire.root, scale, true));
      }

      if (svgStrings.length > 3) {
        return svgStrings.join('\n');
      }

      return '';
    }
  }, {
    key: "getLiteralSVG",
    value: function getLiteralSVG(hull, scale) {
      if (hull.info.tunnelLiterals) {
        return this.placeLiteralLabels(hull, scale);
      } else {
        return this.placeLiteralWires(hull, scale);
      }
    }
  }, {
    key: "placeSupplyWires",
    value: function placeSupplyWires(hull, scale) {
      var vccLabel = "<text x=\"".concat((hull.x - 0.1) * scale, "\" y=\"").concat(hull.y * scale, "\" font-size=\"16\" text-anchor=\"end\" dominant-baseline=\"middle\">VCC</text>");
      var gndLabel = "<text x=\"".concat((hull.x - 0.1) * scale, "\" y=\"").concat((hull.y + hull.height) * scale, "\" font-size=\"16\" text-anchor=\"end\" dominant-baseline=\"middle\">GND</text>");
      var vccLine = "<path fill=\"none\" stroke-width=\"2px\" stroke=\"black\" d=\"M ".concat(hull.x * scale, " ").concat(hull.y * scale, " H ").concat((hull.y + hull.width + 1) * scale, "\" />");
      var gndLine = "<path fill=\"none\" stroke-width=\"2px\" stroke=\"black\" d=\"M ".concat(hull.x * scale, " ").concat((hull.y + hull.height) * scale, " H ").concat((hull.y + hull.width + 1) * scale, "\" />");
      return [' ', '<!--SUPPLYWIRES-->', '', vccLabel, gndLabel, vccLine, gndLine].join('\n');
    }
  }, {
    key: "buildSVG",
    value: function buildSVG(hull, labelToLatexMethod) {
      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
      var svgString = ['\n', "<svg viewBox=\"".concat(-3 * scale, " ").concat(-3 * scale, " ").concat(hull.width * scale * 2, " ").concat(hull.height * scale * 2, "\" width=\"").concat(hull.width * scale, "\" height=\"").concat(hull.height * scale, "\">"), this.placeTransistors(hull, scale), this.placeConnectionWires(hull, scale), this.getExpressionSVG(hull, labelToLatexMethod, scale), this.getVariableSVG(hull, labelToLatexMethod, scale), this.getLiteralSVG(hull, scale), this.placeSupplyWires(hull, scale), '</svg>'].join('\n');
      return svgString;
    }
  }]);

  return SVGGenerator;
}();

/**
 * A unicode text representation of a CMOS circuit
 * @constructor
 * @param {CMOS} cmos The CMOS circuit
 */

var TextCMOS = /*#__PURE__*/function () {
  function TextCMOS(cmos) {
    _classCallCheck(this, TextCMOS);

    /**
     * The CMOS circuit
     * @type {CMOS}
     */
    this.cmos = cmos;
    /**
     * The resized internal grid
     * @type {CMOSGrid}
     * @readonly
     */

    this.grid = new CMOSGrid(new CMOSGridElementSize(cmos.grid.width * 9, cmos.grid.height * 5)); // Draw transistors to internal resized grid

    this.drawTransistors(); // Draw labes to internal resized grid

    this.drawLabels(); // Add scaled wires from the original grid to our internal grid

    this.transferWiresToGrid(); // Draw wires to our internal grid

    this.drawWires(); // Remove redundant rows and columns

    this.grid.removeRedundantElements(1, 5);
  }
  /**
   * Draw transistors to internal resized grid
   * @private
   */


  _createClass(TextCMOS, [{
    key: "drawTransistors",
    value: function drawTransistors() {
      var i;

      for (var x = 0; x < this.cmos.grid.matrix.length; ++x) {
        for (var y = 0; y < this.cmos.grid.matrix[x].length; ++y) {
          var rx = x * 5;
          var ry = y * 7;
          var item = this.cmos.grid.matrix[x][y];

          if (item.content.length > 0) {
            if (item.content[0] instanceof CMOSTransistor) {
              // Draw unicode transistor at pos (rx, ry)
              this.grid.matrix[rx][ry + 6].c = '│';
              this.grid.matrix[rx + 1][ry + 6].c = '┘';
              this.grid.matrix[rx + 1][ry + 5].c = '─';
              this.grid.matrix[rx + 1][ry + 4].c = '├';
              this.grid.matrix[rx + 1][ry + 3].c = '╷';
              this.grid.matrix[rx + 2][ry + 4].c = '│';

              if (item.content[0].type === CMOSTransistorType.PMOS) {
                this.grid.matrix[rx + 2][ry + 3].c = '│';
                this.grid.matrix[rx + 2][ry + 2].c = '○';
              } else {
                this.grid.matrix[rx + 2][ry + 3].c = '┤';
                this.grid.matrix[rx + 2][ry + 2].c = '─';
              }

              this.grid.matrix[rx + 2][ry + 1].c = '─';
              this.grid.matrix[rx + 2][ry].c = '─';
              this.grid.matrix[rx + 3][ry + 6].c = '┐';
              this.grid.matrix[rx + 3][ry + 5].c = '─';
              this.grid.matrix[rx + 3][ry + 4].c = '├';
              this.grid.matrix[rx + 3][ry + 3].c = '╵';
              this.grid.matrix[rx + 4][ry + 6].c = '│'; // Set columns as necessary

              for (i = ry; i < ry + 7; ++i) {
                this.grid.matrix[0][i].necessary = true;
              } // Set rows as necessary


              for (i = rx; i < rx + 5; ++i) {
                this.grid.matrix[i].necessary = true; // And set transistor as content of fields in this row

                for (var j = ry; j < ry + 7; ++j) {
                  this.grid.matrix[i][j].content.push(item.content[0]);

                  if (typeof this.grid.matrix[i][j].c === 'undefined') {
                    this.grid.matrix[i][j].c = ' ';
                  }
                }
              }
            }
          }
        }
      }
    }
  }, {
    key: "drawLabels",
    value: function drawLabels() {
      for (var i = 0; i < this.cmos.grid.labels.length; ++i) {
        var label = this.cmos.grid.labels[i];
        var text = label.text.length > 5 ? 'f' : label.text; // Add padding

        while (text.length < 5) {
          if (label.pos.direction === CMOSWireDirection.EAST) {
            text = " ".concat(text);
          } else {
            text += ' ';
          }
        }

        text = " ".concat(text, " "); // Add characters to grid and make row and columns necessary

        var x = label.pos.x * 5 + 2;

        for (var y = label.pos.y * 7, j = 0; j < 7; ++y, ++j) {
          this.grid.matrix[x][y].c = text[j];
          this.grid.matrix[0][y].necessary = true;
        }

        this.grid.matrix[x - 1].necessary = true;
        this.grid.matrix[x].necessary = true;
        this.grid.matrix[x + 1].necessary = true;
      }
    }
    /**
     * Add scaled wires from the original grid to our internal grid
     * @private
     */

  }, {
    key: "transferWiresToGrid",
    value: function transferWiresToGrid() {
      for (var i = 0; i < this.cmos.grid.wires.length; ++i) {
        var wire = this.cmos.grid.wires[i];
        this.grid.addWire(new CMOSWire(new CMOSWirePosition(wire.posFrom.x * 5 + 2, wire.posFrom.y * 7 + 6), new CMOSWirePosition(wire.posTo.x * 5 + 2, wire.posTo.y * 7 + 6)));
      }
    }
    /**
     * Draws the unicode character for the specified wires at the position (x,y)
     * @private
     */

  }, {
    key: "drawUnicodeWireItem",
    value: function drawUnicodeWireItem(x, y, wires) {
      var isFull = false;
      var directions = 0;
      var N = 1;
      var E = 2;
      var S = 4;
      var W = 8;

      for (var i = 0; i < wires.length; ++i) {
        var wire = wires[i];
        var starts = wire.posFrom.x === x && wire.posFrom.y === y;
        var ends = wire.posTo.x === x && wire.posTo.y === y;

        if (starts || ends) {
          // Wire starts or ends at this point
          if (starts && wire.posFrom.x < wire.posTo.x || ends && wire.posTo.x < wire.posFrom.x) {
            directions |= S;
          } else if (starts && wire.posFrom.y < wire.posTo.y || ends && wire.posTo.y < wire.posFrom.y) {
            directions |= E;
          } else if (starts && wire.posFrom.x > wire.posTo.x || ends && wire.posTo.x > wire.posFrom.x) {
            directions |= N;
          } else {
            directions |= W;
          }
        } else if (!isFull) {
          // First wire that just pases through this point
          directions |= wire.isVertical() ? N | S : E | W;
          isFull = true;
        } else if (wire.isHorizontal()) {
          // Second wire that pases through this point => cross of independent wires
          this.drawWireCrossHorizontal(x, y);
        } else {
          this.drawWireCrossVertical(x, y);
        }
      }

      if (typeof this.grid.matrix[x][y].c === 'undefined') {
        this.grid.matrix[x][y].c = this.getUnicodeCharForWireDirections(directions);
      }
    }
    /**
     * Draw horizontal wire cross at position (x,y)
     * @param {number} x The x coordinate where should draw the wire cross
     * @param {number} y The y coordinate where should draw the wire cross
     * @private
     */

  }, {
    key: "drawWireCrossHorizontal",
    value: function drawWireCrossHorizontal(x, y) {
      this.grid.matrix[x][y - 1].c = '╯';
      this.grid.matrix[x][y + 1].c = '╰';
      this.grid.matrix[x - 1][y - 1].c = '╭';
      this.grid.matrix[x - 1][y + 1].c = '╮';
      this.grid.matrix[x - 1][y].c = '┼'; // Make positions necessary

      this.grid.matrix[0][y - 1].necessary = true;
      this.grid.matrix[0][y + 1].necessary = true;
      this.grid.matrix[x - 1].necessary = true;
    }
    /**
     * Draw vertical wire cross at position (x,y)
     * @param {number} x The x coordinate where should draw the wire cross
     * @param {number} y The y coordinate where should draw the wire cross
     * @private
     */

  }, {
    key: "drawWireCrossVertical",
    value: function drawWireCrossVertical(x, y) {
      this.grid.matrix[x - 1][y].c = '╯';
      this.grid.matrix[x - 1][y - 1].c = '╭';
      this.grid.matrix[x][y - 1].c = '┼';
      this.grid.matrix[x + 1][y - 1].c = '╰';
      this.grid.matrix[x + 1][y].c = '╮'; // Make positions necessary

      this.grid.matrix[x - 1].necessary = true;
      this.grid.matrix[x + 1].necessary = true;
      this.grid.matrix[0][y - 1].necessary = true;
    }
    /**
     * Returns the unicode character for position where all marked directions are wires
     * @param {number} directions The direction bit mask: the 4 least significant bits
     * represent WSEN (little endian representation)
     * @return {string}
     * @private
     */

  }, {
    key: "getUnicodeCharForWireDirections",
    value: function getUnicodeCharForWireDirections(directions) {
      var N = 1;
      var E = 2;
      var S = 4;
      var W = 8;
      var c = ' ';

      switch (directions) {
        case N:
          c = '╵';
          break;

        case E:
          c = '╶';
          break;

        case S:
          c = '╷';
          break;

        case W:
          c = '╴';
          break;

        case N | S:
          c = '│';
          break;

        case E | W:
          c = '─';
          break;

        case N | E:
          c = '╰';
          break;

        case N | W:
          c = '╯';
          break;

        case S | E:
          c = '╭';
          break;

        case S | W:
          c = '╮';
          break;

        case N | E | S:
          c = '├';
          break;

        case N | W | S:
          c = '┤';
          break;

        case W | E | S:
          c = '┬';
          break;

        case W | E | N:
          c = '┴';
          break;

        case N | E | S | W:
          c = '┼';
          break;
      }

      return c;
    }
    /**
     * Draw the wires to the internal grid
     * @private
     */

  }, {
    key: "drawWires",
    value: function drawWires() {
      for (var x = 0; x < this.grid.height; ++x) {
        for (var y = 0; y < this.grid.width; ++y) {
          if (this.grid.matrix[x][y].content.length > 0 && !(this.grid.matrix[x][y].content[0] instanceof CMOSTransistor)) {
            this.drawUnicodeWireItem(x, y, this.grid.matrix[x][y].content);
          }
        }
      }
    }
    /**
     * Returns the unicode string representation of the CMOS circuit
     * @return {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.CMOSGridToString(this.grid);
    }
    /**
     * Returns a string representation of the specified CMOS grid
     * @param {CMOSGrid} grid The CMOS grid
     * @return {string}
     */

  }, {
    key: "CMOSGridToString",
    value: function CMOSGridToString(grid) {
      var parts = [];

      for (var i = 0; i < grid.matrix.length; ++i) {
        var line = '';

        for (var j = 0; j < grid.matrix[i].length; ++j) {
          if (grid.matrix[i][j].c) {
            line += grid.matrix[i][j].c;
          } else if (grid.matrix[i][j].content.length > 0) {
            if (grid.matrix[i][j].content[0] instanceof CMOSTransistor) {
              line += 'T';
            } else {
              line += 'W';
            }
          } else {
            line += ' ';
          }
        }

        parts.push(line);
      }

      parts[0] = "".concat(parts[0].trim(), " VCC");
      parts[parts.length - 1] = "".concat(parts[parts.length - 1].trim(), " GND");
      return parts.join('\n');
    }
  }]);

  return TextCMOS;
}();

/**
 * roundArray rounds an array to a given length
 * @param inArr: Array to round, can also be a string
 * @param count: necassary length
 * @param roundup: true if the array has to be up rounded
 * @param base: base of given array
 * @returns {[]|*}: rounded arraay in the given base
 */
function roundArray(inArr, count) {
  var roundup = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
  var arr = inArr;

  if (arr.length < count) {
    return arr;
  }

  var isString = false;

  if (typeof arr === 'string') {
    arr = arr.split('').map(function (num) {
      return parseInt(num, 10);
    });
    isString = true;
  }

  var toRound = roundup;

  if (!toRound) {
    toRound = arr[count] >= base / 2;
  }

  while (arr.length > count) {
    arr.pop();
  }

  if (toRound) {
    var carryBits = [];
    var _final = [];
    carryBits.unshift(1);

    for (var i = arr.length - 1; i >= 0; i--) {
      var m = arr[i] + carryBits[0];

      _final.unshift(m % base);

      carryBits.unshift(Math.floor(m / base));
    }

    if (carryBits[0] !== carryBits[1]) {
      _final.unshift(1);

      _final.pop();
    }

    if (isString) {
      return _final.join('');
    }

    return _final;
  } else {
    if (isString) {
      return arr.join('');
    }

    return arr;
  }
}

function numToChar(num) {
  if (num >= 0 && num <= 9) {
    return String.fromCharCode(num + '0'.charCodeAt());
  }

  if (num >= 10 && num <= 35) {
    return String.fromCharCode(num + 'A'.charCodeAt());
  }

  return '';
}

function charToNum(chr) {
  if ('0'.charCodeAt() <= chr.charCodeAt() && chr.charCodeAt() <= '9'.charCodeAt()) {
    return chr.charCodeAt() - '0'.charCodeAt();
  }

  if ('A'.charCodeAt() <= chr.charCodeAt() && chr.charCodeAt() <= 'Z') {
    return chr.charCodeAt() - 'A'.charCodeAt() + 10;
  }

  return -1;
} // Representation of a number in base n (2 <= n <= 26) with support of floating points.


var NumberBaseNSigned = /*#__PURE__*/function () {
  function NumberBaseNSigned(base, representation) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var isNegative = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, NumberBaseNSigned);

    if (base < 2 || base > 36) {
      throw new Error("NumberBaseNSigned.constructor(base, representation, ...): Base ".concat(base, " is not supported."));
    }

    this.base = base;
    this.offset = offset;
    this.isNegative = isNegative;
    this.arr = null;
    this.stringRepresentation = null;

    if (!this._checkArray(representation)) {
      throw new Error('NumberBaseNSigned.constructor(base, representation, ...): representation contains invalid number.');
    }

    this.arr = _toConsumableArray(representation);

    this._normalizeOffset();

    this._normalizeArray();

    this.stringRepresentation = this._constructString(this.arr);
  }

  _createClass(NumberBaseNSigned, [{
    key: "_normalizeOffset",
    value: function _normalizeOffset() {
      while (this.offset < 0) {
        this.arr.push(0);
        this.offset++;
      }
    }
  }, {
    key: "_normalizeArray",
    value: function _normalizeArray() {
      while (this.arr.length > this.offset + 1 && this.arr[0] === 0) {
        this.arr.splice(0, 1);
      }

      while (this.offset > 0 && this.arr[this.arr.length - 1] === 0) {
        this.arr.splice(this.arr.length - 1, 1);
        this.offset--;
      }
    }
  }, {
    key: "_checkArray",
    value: function _checkArray(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] < 0 || this.base <= arr[i]) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_constructString",
    value: function _constructString(arr) {
      var result = '';

      for (var i = 0; i < arr.length; i++) {
        result += numToChar(arr[i]);

        if (arr.length - 1 - i === this.offset && this.offset > 0) {
          result += '.';
        }
      }

      if (this.isNegative) {
        result = "-".concat(result);
      }

      return result;
    }
  }]);

  return NumberBaseNSigned;
}();
function getNumFromString(base, str) {
  if (base < 2 || base > 36) {
    throw new Error("getNumFromString(base, str): Base ".concat(base, " is not supported."));
  }

  var pointCount = 0;
  var signCount = 0;
  var arr = [];
  var offset = 0;
  var isNegative = false;

  for (var i = 0; i < str.length; i++) {
    if (str[i] === '-' || str[i] === '+') {
      isNegative = str[i] === '-';
      signCount++;
      continue;
    }

    if (str[i] === '.') {
      offset = str.length - i - 1;
      pointCount++;
      continue;
    }

    var n = charToNum(str[i]);

    if (n < 0 || n >= base) {
      throw new Error('getNumFromString(base, str): Given string is not compatible with base.');
    }

    arr.push(charToNum(str[i]));
  }

  if (pointCount > 1) {
    throw new Error('getNumFromString(base, str): Given string contains more than 1 point.');
  }

  if (signCount > 1) {
    throw new Error('getNumFromString(base, str): Given string contains more than 1 sign.');
  }

  return new NumberBaseNSigned(base, arr, offset, isNegative);
}

var ComparisonBaseNSigned = /*#__PURE__*/function () {
  function ComparisonBaseNSigned(n1, n2) {
    _classCallCheck(this, ComparisonBaseNSigned);

    if (n1.base !== n2.base) {
      throw new Error("ComparisonBaseNSigned.constructor(n1, n2): Base of n1(".concat(n1.base, ")\n        and base of n2(").concat(n2.base, ") must be qual."));
    }

    this.result = this._compare(n1, n2);
  }

  _createClass(ComparisonBaseNSigned, [{
    key: "_compare",
    value: function _compare(n1, n2) {
      if (n1.arr.length === 1 && n2.arr.length === 1 && n1.arr[0] === 0 && n1.arr[0] === 0) {
        return 0;
      }

      if (n1.isNegative && !n2.isNegative) {
        return -1;
      }

      if (!n1.isNegative && n2.isNegative) {
        return 1;
      }

      var mult = n1.isNegative && n2.isNegative ? -1 : 1;

      if (n1.arr.length - n1.offset > n2.arr.length - n2.offset) {
        return mult;
      }

      if (n1.arr.length - n1.offset < n2.arr.length - n2.offset) {
        return mult * -1;
      }

      var i = 0;

      while (i < n1.arr.length || i < n2.arr.length) {
        var a = i < n1.arr.length ? n1.arr[i] : 0;
        var b = i < n2.arr.length ? n2.arr[i] : 0;

        if (a > b) {
          return mult;
        }

        if (b > a) {
          return mult * -1;
        }

        i++;
      }

      return 0;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return ComparisonBaseNSigned;
}();

var Step = /*#__PURE__*/function () {
  function Step(name) {
    _classCallCheck(this, Step);

    this.name = name;
    this.data = {};
  }

  _createClass(Step, [{
    key: "addDataPoint",
    value: function addDataPoint(name, value) {
      this.data[name] = value;
    }
  }]);

  return Step;
}();
/**
 * The Algorithm class saves the steps while the calculation,
 * so it is used for testing the intermediate steps and also
 * to display them at the gui.
 */


var Algorithm = /*#__PURE__*/function () {
  function Algorithm() {
    _classCallCheck(this, Algorithm);

    this.steps = {};
  }

  _createClass(Algorithm, [{
    key: "step",
    value: function step(name) {
      var act = this.steps[name];

      if (!act) {
        this.steps[name] = new Step(name);
      }

      this.curr = this.steps[name];
      return this;
    }
  }, {
    key: "saveVariable",
    value: function saveVariable(name, value) {
      this.curr.addDataPoint(name, value);
      return this;
    }
  }]);

  return Algorithm;
}();

var SubtractionBaseNSigned = /*#__PURE__*/function () {
  function SubtractionBaseNSigned(n1, n2) {
    _classCallCheck(this, SubtractionBaseNSigned);

    if (n1.base !== n2.base) {
      throw new Error("SubtractionBaseNSigned.constructor(n1, n2): Base of n1(".concat(n1.base, ") and base of n2(").concat(n2.base, ") must be qual."));
    }

    this.watcher = null;
    this.result = this._subtract(n1, n2);
  }

  _createClass(SubtractionBaseNSigned, [{
    key: "_subtract",
    value: function _subtract(n1, n2) {
      this.watcher = new Algorithm();

      if (!n1.isNegative && n2.isNegative || n1.isNegative && !n2.isNegative) {
        var n2Switched = new NumberBaseNSigned(n2.base, n2.arr, n2.offset, !n2.isNegative);
        var addition = new AdditionBaseNSigned(n1, n2Switched);
        this.watcher = this.watcher.step('OperatorSwitch').saveVariable('addition', addition.watcher);
        return addition.getResult();
      }

      var base = n1.base;
      var n1Abs = new NumberBaseNSigned(n1.base, n1.arr, n1.offset, false);
      var n2Abs = new NumberBaseNSigned(n2.base, n2.arr, n2.offset, false);
      var comp = new ComparisonBaseNSigned(n1Abs, n2Abs).getResult();
      var isNegative = null;
      var op1 = null;
      var op2 = null;

      if (comp >= 0) {
        // |n1| >= |n2|
        op1 = n1;
        op2 = n2;
        isNegative = n1.isNegative && n2.isNegative;
      } else {
        op1 = n2;
        op2 = n1;
        isNegative = !(n1.isNegative && n2.isNegative);
      }

      this.watcher.step('GetSign').saveVariable('compareValue', comp).saveVariable('signN1', n1.isNegative).saveVariable('signN2', n2.isNegative).saveVariable('isNegative', isNegative);

      var op1Arr = _toConsumableArray(op1.arr);

      var op2Arr = _toConsumableArray(op2.arr);

      var offset = Math.max(op1.offset, op2.offset);

      if (op1.offset < offset) {
        op1Arr.push.apply(op1Arr, _toConsumableArray(Array(offset - op1.offset).fill(0)));
      }

      if (op2.offset < offset) {
        op2Arr.push.apply(op2Arr, _toConsumableArray(Array(offset - op2.offset).fill(0)));
      }

      var length = Math.max(op1Arr.length, op2Arr.length);

      if (op1Arr.length < length) {
        op1Arr.unshift.apply(op1Arr, _toConsumableArray(Array(length - op1Arr.length).fill(0)));
      }

      if (op2Arr.length < length) {
        op2Arr.unshift.apply(op2Arr, _toConsumableArray(Array(length - op2Arr.length).fill(0)));
      }

      var overflow = [];
      var _final = [];
      overflow.unshift(0);

      for (var i = length - 1; i >= 0; i--) {
        var m = op1Arr[i] - op2Arr[i] - overflow[0];

        _final.unshift((m + base) % base);

        if (m < 0) {
          overflow.unshift(1);
        } else {
          overflow.unshift(0);
        }
      }

      var result = new NumberBaseNSigned(base, _final, offset, isNegative);
      this.watcher.step('Subtraction').saveVariable('op1', op1).saveVariable('op2', op2).saveVariable('op1Arr', _toConsumableArray(op1Arr)).saveVariable('op2Arr', _toConsumableArray(op2Arr)).saveVariable('carryArr', [].concat(overflow)).saveVariable('resultArr', [].concat(_final)).saveVariable('result', result);
      this.watcher.step('Final').saveVariable('result', result);
      return new NumberBaseNSigned(base, _final, offset, isNegative);
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return SubtractionBaseNSigned;
}();

var AdditionBaseNSigned = /*#__PURE__*/function () {
  function AdditionBaseNSigned(n1, n2) {
    _classCallCheck(this, AdditionBaseNSigned);

    if (n1.base !== n2.base) {
      throw new Error("AdditionBaseNSigned.constructor(n1, n2): Base of n1(".concat(n1.base, ")\n        and base of n2(").concat(n2.base, ") must be qual."));
    }

    this.watcher = null;
    this.result = this._add(n1, n2);
  }

  _createClass(AdditionBaseNSigned, [{
    key: "_add",
    value: function _add(n1, n2) {
      this.watcher = new Algorithm();

      if (!n1.isNegative && n2.isNegative) {
        // Subtract abs(n2) from n1.
        var toSubtract = new NumberBaseNSigned(n2.base, n2.arr, n2.offset);
        var subtraction = new SubtractionBaseNSigned(n1, toSubtract);
        this.watcher.step('OperatorSwitch').saveVariable('subtraction', subtraction.watcher);
        return subtraction.getResult();
      }

      if (n1.isNegative && !n2.isNegative) {
        // Subtract abs(n1) from n2.
        var _toSubtract = new NumberBaseNSigned(n1.base, n1.arr, n1.offset);

        var _subtraction = new SubtractionBaseNSigned(n2, _toSubtract);

        this.watcher.step('OperatorSwitch').saveVariable('subtraction', _subtraction.watcher);
        return _subtraction.getResult();
      }

      var base = n1.base; // If both n1 and n2 are negative the result must also be negative.

      var isNegative = n1.isNegative && n2.isNegative;
      this.watcher.step('GetSign').saveVariable('signN1', n1.isNegative).saveVariable('signN2', n2.isNegative).saveVariable('isNegative', isNegative);

      var n1Arr = _toConsumableArray(n1.arr);

      var n2Arr = _toConsumableArray(n2.arr);

      var offset = Math.max(n1.offset, n2.offset);

      if (n1.offset < offset) {
        n1Arr.push.apply(n1Arr, _toConsumableArray(Array(offset - n1.offset).fill(0)));
      }

      if (n2.offset < offset) {
        n2Arr.push.apply(n2Arr, _toConsumableArray(Array(offset - n2.offset).fill(0)));
      } // make arrays with the same length


      var length = Math.max(n1Arr.length, n2Arr.length);

      if (n1Arr.length < length) {
        n1Arr.unshift.apply(n1Arr, _toConsumableArray(Array(length - n1Arr.length).fill(0)));
      }

      if (n2Arr.length < length) {
        n2Arr.unshift.apply(n2Arr, _toConsumableArray(Array(length - n2Arr.length).fill(0)));
      }

      var overflow = [];
      var _final = []; // binary addition

      overflow.unshift(0);

      for (var i = length - 1; i >= 0; i--) {
        var m = n1Arr[i] + n2Arr[i] + overflow[0];

        _final.unshift(m % base);

        overflow.unshift(Math.floor(m / base));
      }

      if (overflow[0] > 0) {
        _final.unshift(overflow[0]);
      }

      var result = new NumberBaseNSigned(base, _final, offset, isNegative);
      this.watcher.step('Addition').saveVariable('op1', n1).saveVariable('op2', n2).saveVariable('op1Arr', _toConsumableArray(n1Arr)).saveVariable('op2Arr', _toConsumableArray(n2Arr)).saveVariable('carryArr', [].concat(overflow)).saveVariable('resultArr', [].concat(_final)).saveVariable('result', result);
      this.watcher.step('Final').saveVariable('result', result);
      return new NumberBaseNSigned(base, _final, offset, isNegative);
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return AdditionBaseNSigned;
}();

var MultiplicationBaseNSingleDigit = /*#__PURE__*/function () {
  function MultiplicationBaseNSingleDigit(n, d) {
    _classCallCheck(this, MultiplicationBaseNSingleDigit);

    if (d < 0 || d >= n.base) {
      throw new Error("MultiplicationBaseNSigned.constructor(n1, n2): d(".concat(d, ") is not a part of base of n1(").concat(n.base, ")."));
    }

    this.result = this._multiply(n, d);
  }

  _createClass(MultiplicationBaseNSingleDigit, [{
    key: "_multiply",
    value: function _multiply(n, d) {
      var offset = n.offset;
      var base = n.base;
      var isNegative = n.isNegative;
      var overflow = [0];
      var _final = [];

      for (var i = n.arr.length - 1; i >= 0; i--) {
        var m = d * n.arr[i] + overflow[0];

        _final.unshift(m % base);

        overflow.unshift(Math.floor(m / base));
      }

      _final.unshift(overflow[0]);

      return new NumberBaseNSigned(base, _final, offset, isNegative);
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return MultiplicationBaseNSingleDigit;
}();
var MultiplicationBaseNSigned = /*#__PURE__*/function () {
  function MultiplicationBaseNSigned(n1, n2) {
    _classCallCheck(this, MultiplicationBaseNSigned);

    if (n1.base !== n2.base) {
      throw new Error("MultiplicationBaseNSigned.constructor(n1, n2): Base of n1(".concat(n1.base, ") and base of n2(").concat(n2.base, ") must be qual."));
    }

    this.watcher = null;
    this.result = this._multiply(n1, n2);
  }

  _createClass(MultiplicationBaseNSigned, [{
    key: "_multiply",
    value: function _multiply(n1, n2) {
      this.watcher = new Algorithm();
      this.watcher.step('MultiplicationInput').saveVariable('n1Arr', _toConsumableArray(n1.arr)).saveVariable('n2Arr', _toConsumableArray(n2.arr));
      var base = n1.base;
      var isNegative = n1.isNegative && !n2.isNegative || n2.isNegative && !n1.isNegative;
      this.watcher.step('GetSign').saveVariable('signN1', n1.isNegative).saveVariable('signN2', n2.isNegative).saveVariable('isNegative', isNegative);
      var cur = new NumberBaseNSigned(base, [0], 0, false);
      this.watcher.step('Multiplication').saveVariable('num1', n1).saveVariable('num2', n2); // remove right zeros, fastening the multiplication

      var arr1 = n1.arr;
      var arr2 = n2.arr;

      while (arr1[arr1.length - 1] === 0 && arr2[arr2.length - 1] === 0 && Math.min(n1.arr.length, n2.arr.length) > 0) {
        arr1.pop();
        arr2.pop();
      }

      this.watcher.step('MultiplicationInput').saveVariable('n1Arr', _toConsumableArray(n1.arr)).saveVariable('n2Arr', _toConsumableArray(n2.arr)).saveVariable('leftArr', _toConsumableArray(arr1)).saveVariable('rightArr', _toConsumableArray(arr2)); // multiplication with 0

      if (Math.min(n1.arr.length, n2.arr.length) === 0) {
        var _result = new NumberBaseNSigned(base, [0]);

        this.watcher.step('Result').saveVariable('result', _result).saveVariable('resultArr', _toConsumableArray(_result.arr));
        return _result;
      } // main multiplication


      this.watcher.step('MultiplicationSteps').saveVariable('countSteps', n2.arr.length);

      for (var i = 0; i < n2.arr.length; i++) {
        var num = new NumberBaseNSigned(base, n1.arr, i, false);
        var toAdd = new MultiplicationBaseNSingleDigit(num, arr2[i]).getResult();
        this.watcher.step('MultiplicationSteps').saveVariable("Step".concat(i, "_cur"), cur).saveVariable("Step".concat(i, "_toAdd"), toAdd);

        for (var j = 0; j < i; j++) {
          toAdd.arr.unshift(0);
        }

        cur = new AdditionBaseNSigned(cur, toAdd).getResult();
      }

      this.watcher.step('MultFinal').saveVariable('cur', cur);
      var result = new NumberBaseNSigned(base, cur.arr, cur.offset, isNegative);
      this.watcher.step('Result').saveVariable('result', result).saveVariable('resultArr', _toConsumableArray(result.arr));
      return result;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return MultiplicationBaseNSigned;
}();

function _numToChar(num) {
  if (num >= 0 && num <= 9) {
    return String.fromCharCode(num + '0'.charCodeAt());
  }

  if (num >= 10 && num <= 35) {
    return String.fromCharCode(num + 'A'.charCodeAt());
  }

  return '';
}

function _charToNum(chr) {
  if ('0'.charCodeAt() <= chr.charCodeAt() && chr.charCodeAt() <= '9'.charCodeAt()) {
    return chr.charCodeAt() - '0'.charCodeAt();
  }

  if ('A'.charCodeAt() <= chr.charCodeAt() && chr.charCodeAt() <= 'Z') {
    return chr.charCodeAt() - 'A'.charCodeAt() + 10;
  }

  return -1;
} // Representation of a number in N's complement (Up to digitNum digits)


var NumberBaseNComplement = /*#__PURE__*/function () {
  function NumberBaseNComplement(base, digitNum, representation) {
    var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var negate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    _classCallCheck(this, NumberBaseNComplement);

    if (base < 2 || base > 36) {
      throw new Error("NumberBaseNComplement.constructor(base, digitNum, ...): Base ".concat(base, " is not supported."));
    }

    if (digitNum <= 0) {
      throw new Error('NumberBaseNComplement.constructor(base, digitNum, ...): digitNum must be positive.');
    }

    this.base = base;
    this.offset = offset;
    this.digitNum = digitNum;
    this.stringRepresentation = null;
    this.stringRepresentationNoLeadingZeros = null;
    this.watcher = new Algorithm();

    if (!this._checkArray(representation)) {
      throw new Error('NumberBaseNComplement.constructor(base, digitNum, ...): representation contains invalid number.');
    }

    this.arr = _toConsumableArray(representation);

    this._normalizeOffset();

    this._normalizeArray();

    this.watcher = this.watcher.step('Complement').saveVariable('originalArray', _toConsumableArray(this.arr));
    this.watcher = this.watcher.step('Complement').saveVariable('negate', negate);

    if (negate) {
      this.arr = this.getFlipedArray();
      this.watcher = this.watcher.step('Complement').saveVariable('flippedArray', _toConsumableArray(this.arr)); // Add one

      for (var i = this.arr.length - 1; i >= 0; i--) {
        if (this.arr[i] !== this.base - 1) {
          this.arr[i] += 1;
          break;
        } else {
          this.arr[i] = 0;
        }
      }

      this.watcher = this.watcher.step('Complement').saveVariable('oneAdded', _toConsumableArray(this.arr));

      this._normalizeOffset();

      this._normalizeArray();

      this.watcher = this.watcher.step('Complement').saveVariable('normalizedArray', _toConsumableArray(this.arr));
    } else {
      this.watcher = this.watcher.step('Complement').saveVariable('flippedArray', _toConsumableArray(this.arr)).saveVariable('oneAdded', _toConsumableArray(this.arr)).saveVariable('normalizedArray', _toConsumableArray(this.arr));
    } // delete right digits if the array is to long


    while (this.arr.length > digitNum) {
      this.arr.pop();
    }

    this.negative = negate;
    this.signBit = negate ? 1 : 0;
    this.stringRepresentation = this._constructString(this.arr);
  }

  _createClass(NumberBaseNComplement, [{
    key: "_normalizeOffset",
    value: function _normalizeOffset() {
      while (this.offset < 0) {
        this.arr.push(0);
        this.offset++;
      }
    }
  }, {
    key: "_normalizeArray",
    value: function _normalizeArray() {
      // Delete zeros from right.
      while (this.offset > 0 && this.arr[this.arr.length - 1] === 0) {
        this.arr.splice(this.arr.length - 1, 1);
        this.offset--;
      } // Bring array to the right size.


      if (this.arr.length > this.digitNum + this.offset) {
        this.arr.splice(this.digitNum + this.offset, this.arr.length - (this.digitNum + this.offset));
      } else {
        var _this$arr;

        (_this$arr = this.arr).push.apply(_this$arr, _toConsumableArray(Array(this.digitNum + this.offset - this.arr.length).fill(0)));
      }
    }
  }, {
    key: "_checkArray",
    value: function _checkArray(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] < 0 || this.base <= arr[i]) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_constructString",
    value: function _constructString(arr) {
      var result = '';

      for (var i = 0; i < arr.length; i++) {
        result += _numToChar(arr[i]);

        if (i === this.digitNum - 1 && this.offset > 0) {
          result += '.';
        }
      }

      return result;
    }
  }, {
    key: "getFlipedArray",
    value: function getFlipedArray() {
      var result = [];

      for (var i = 0; i < this.arr.length; i++) {
        result.push(this.base - 1 - this.arr[i]);
      }

      return result;
    }
  }, {
    key: "isNegative",
    value: function isNegative() {
      return this.arr[0] >= Math.ceil(this.base / 2);
    }
  }, {
    key: "translate",
    value: function translate(newDigitNum) {
      if (newDigitNum <= 0) {
        throw new Error('NumberBaseNComplement.translate(newDigitNum): newDigitNum must be positive.');
      }

      if (newDigitNum <= this.digitNum) {
        var newRepresentation = _toConsumableArray(this.arr).splice(0, this.digitNum - newDigitNum);

        return new NumberBaseNComplement(this.base, newDigitNum, newRepresentation, this.offset);
      } // Sign extend.


      var sign = this.isNegative() ? this.base - 1 : 0;

      var arrCopy = _toConsumableArray(this.arr);

      arrCopy.unshift.apply(arrCopy, _toConsumableArray(Array(newDigitNum - this.digitNum).fill(sign)));
      return new NumberBaseNComplement(this.base, newDigitNum, arrCopy, this.offset);
    }
  }]);

  return NumberBaseNComplement;
}();
function getBaseNComplementFromString(base, digitNum, str) {
  if (base < 2 || base > 36) {
    throw new Error("getBaseNComplementFromString(base, str): Base ".concat(base, " is not supported."));
  }

  var arr = [];
  var pointCount = 0;
  var offset = 0;

  for (var i = 0; i < str.length; i++) {
    if (str[i] === '.') {
      pointCount++;
      offset = str.length - i - 1;
      continue;
    }

    var n = _charToNum(str[i]);

    if (n < 0 || n >= base) {
      throw new Error("getBaseNComplementFromString(str): Given string is not compatible with base ".concat(base, "."));
    }

    arr.push(_charToNum(str[i]));
  }

  if (pointCount > 1) {
    throw new Error('getBaseNComplementFromString(base, str): Given string contains more than 1 point.');
  }

  return new NumberBaseNComplement(base, digitNum, arr, offset);
}

// maybe make a new file that dedicates itself to the BASENCOMPLEMENT Addition separately

var AdditionBaseNComplement = /*#__PURE__*/function () {
  function AdditionBaseNComplement(n1, n2) {
    _classCallCheck(this, AdditionBaseNComplement);

    if (n1.base !== n2.base) {
      throw new Error("AdditionBaseNComplement.constructor(n1, n2): Base of n1(".concat(n1.base, ") and base of n2(").concat(n2.base, ") must be qual."));
    }

    if (n1.digitNum !== n2.digitNum) {
      throw new Error("AdditionBaseNComplement.constructor(n1, n2): DigitNum of n1(".concat(n1.digitNum, ") and digitNum of n2(").concat(n2.digitNum, ") must be qual."));
    }

    this.producedOverflow = false;
    this.carryOutSet = false;
    this.watcher = null;
    this.result = this._add(n1, n2);
  }

  _createClass(AdditionBaseNComplement, [{
    key: "_add",
    value: function _add(n1, n2) {
      this.watcher = new Algorithm();
      /* const isEqual = n1.arr.length === n2.arr.length &&
        n1.arr.every((value, index) => value === n2.arr[index]);
      if (isEqual && n1.signBit !== n2.signBit) { // edgecase x - x == zero
        const final = [];
        for (let i = 0; i < n1.arr.length; i++) {
          final.shift(0);
        }
        const result = new NumberBaseNComplement(n1.base, n1.digitNum, final, 0, false);
        this.watcher
          .step('Addition')
          .saveVariable('op1', n1)
          .saveVariable('op2', n2)
          .saveVariable('op1Arr', [...n1.arr])
          .saveVariable('op2Arr', [...n2.arr])
          .saveVariable('carryArr', [])
          .saveVariable('resultArr', [...final])
          .saveVariable('result', result)
          .saveVariable('overflow', this.producedOverflow)
          .saveVariable('equal', isEqual);
        return result;
      } */

      var base = n1.base;

      var n1Arr = _toConsumableArray(n1.arr);

      var n2Arr = _toConsumableArray(n2.arr);

      var carryBits = [];
      var _final = []; // binary addition

      carryBits.unshift(0);

      for (var i = n1Arr.length - 1; i >= 0; i--) {
        var m = n1Arr[i] + n2Arr[i] + carryBits[0];

        _final.unshift(m % base);

        carryBits.unshift(Math.floor(m / base));
      } // We have an overflow if the XOR of the first two carry out bits are 1


      this.producedOverflow = carryBits[0] !== carryBits[1]; // TODO this negative value is IEEE specific, since an overflow does not change the sign

      var isNegative = n1.signBit === 1 && n2.signBit === 1 || !(n1.signBit === 0 && n2.signBit === 0) && _final[0] === 1 && !this.producedOverflow;

      if (isNegative) {
        // cut throuth overflow for negative values
        while (_final.length > n1.digitNum) {
          _final.shift();
        }
      }

      var digitNum = n1.digitNum; // add overflow for positive or neg/neg addition

      if (n1.signBit === n2.signBit && carryBits.length > digitNum) {
        digitNum++;

        _final.unshift(carryBits[0]);
      }

      this.negativeResult = isNegative;
      var result = new NumberBaseNComplement(base, digitNum, _final, 0, false);
      this.watcher.step('Addition').saveVariable('op1', n1).saveVariable('op2', n2).saveVariable('op1Arr', _toConsumableArray(n1Arr)).saveVariable('op2Arr', _toConsumableArray(n2Arr)).saveVariable('carryArr', [].concat(carryBits)).saveVariable('resultArr', [].concat(_final)).saveVariable('result', result).saveVariable('overflow', this.producedOverflow); // .saveVariable('equal', isEqual);

      return result;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return AdditionBaseNComplement;
}();

var DivisionBaseNSigned = /*#__PURE__*/function () {
  function DivisionBaseNSigned(n1, n2, manBitNum) {
    _classCallCheck(this, DivisionBaseNSigned);

    if (manBitNum !== undefined) {
      this.manBitNum = manBitNum;
    } else {
      this.manBitNum = null;
    }

    if (n1.base !== n2.base) {
      console.log('DivisonBaseNComplement(Number, Number): Base of n1('.concat(n1.base, ') and base of n2(').concat(n2.base, ') are not compatible.'));
    }

    if (n1.digitNum !== n2.digitNum) {
      console.log('DivisonBaseNComplement(Number, Number): DigitNum of n1('.concat(n1.digitNum, ') and digitNum of n2(').concat(n2.digitNum, ') are not compatible.'));
    }

    this.watcher = null;
    this.producedOverflow = false;
    this.firstNegativeStep = false;
    this.result = this._divide(n1, n2);
  }

  _createClass(DivisionBaseNSigned, [{
    key: "_divide",
    value: function _divide(n1, n2) {
      this.watcher = new Algorithm();
      var offset = Math.max(n1.offset, n2.offset);
      var digitsToTake = n1.arr.length + offset + 1;
      this.watcher.step('DivisionInput').saveVariable('n1Arr', _toConsumableArray(n1.arr)).saveVariable('n2Arr', _toConsumableArray(n2.arr));
      this.watcher.step('DetermineSize').saveVariable('n1Offset', n1.offset).saveVariable('n2Offset', n2.offset).saveVariable('digitNum', n1.digitNum).saveVariable('offset', offset).saveVariable('digitsToTake', digitsToTake);

      var n1copy = _toConsumableArray(n1.arr);

      var op2arr = _toConsumableArray(n2.arr); // fill left op with 0 if smaller than right op


      for (var k = 0; k < n2.arr.length - n1.arr.length; k++) {
        n1copy.push(0);
      } // drop if both ops have 0 on the right


      while (n1copy[n1copy.length - 1] === 0 && op2arr[op2arr.length - 1] === 0) {
        n1copy.splice(-1, 1);
        op2arr.splice(-1, 1);
      }

      var op1arr = _toConsumableArray(n1copy);

      var arr = []; // unnormalised result

      var remain = true;
      var i = op2arr.length - 1; // iterator while loop, until mantice length

      var posOp1arr = op2arr.length; // position in left op

      var countSteps = 0; // binary division related to long division in binary

      while (i <= this.manBitNum * 2 && remain) {
        if (op1arr.length > op2arr.length) {
          op2arr = op2arr.concat(Array(op1arr.length - op2arr.length).fill(0, 0)); // Pad right
        }

        var op1 = new NumberBaseNComplement(n1.base, op1arr.length, op1arr, offset, false);
        var op2 = new NumberBaseNComplement(n2.base, op2arr.length, op2arr, offset, true);
        var operation = new AdditionBaseNComplement(op1, op2);
        var subtractionResult = operation.getResult();

        if (countSteps === 0 && operation.negativeResult) {
          this.firstNegativeStep = true;
        }

        this.watcher.step('DivisionSteps').saveVariable("Step".concat(countSteps, "_Sub1"), _toConsumableArray(op1arr)).saveVariable("Step".concat(countSteps, "_Sub2"), _toConsumableArray(op2arr)).saveVariable("Step".concat(countSteps, "_SubRes"), _toConsumableArray(subtractionResult.arr)).saveVariable("Step".concat(countSteps, "_SubRes_isNegative"), operation.negativeResult);

        var subarray = _toConsumableArray(subtractionResult.arr);

        if (!subarray.every(function (a) {
          return a === 0;
        })) {
          // subt. not zero
          if (operation.negativeResult === false) {
            // subt. positive result
            this.watcher.step('DivisionSteps').saveVariable("Step".concat(countSteps, "_SubRes_isZero"), false);
            arr.push(1);
            op1arr = _toConsumableArray(subtractionResult.arr);
          } else {
            arr.push(0);
          }

          if (posOp1arr >= n1copy.length) {
            // add 0 to op1arr
            op1arr.push(0);
          } else {
            // add the value at the actual position of the dividend
            op1arr.push(n1copy[posOp1arr - 1]);
            posOp1arr += 1;
          }

          if (op1arr.length > op2arr.length) {
            // corrects array length
            op2arr.unshift(0);
          }
        } else {
          arr.push(1);
          this.watcher.step('DivisionSteps').saveVariable("Step".concat(countSteps, "_SubRes_isZero"), true);
          remain = false; // subt. result is zero => no remain
        }

        this.watcher.step('DivisionSteps').saveVariable("Step".concat(countSteps, "_ActRes"), [].concat(arr));
        i += 1;
        countSteps += 1;
      }

      this.watcher.step('DivisionSteps').saveVariable('countSteps', countSteps);
      var finalResult = new NumberBaseNSigned(n1.base, [].concat(arr), offset, n1.isNegative !== n2.isNegative);
      this.watcher.step('Result').saveVariable('digitsToTake', digitsToTake).saveVariable('result', finalResult).saveVariable('resultArr', [].concat(arr));
      return finalResult;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return DivisionBaseNSigned;
}();

var SubtractionBaseNComplement = /*#__PURE__*/function () {
  function SubtractionBaseNComplement(n1, n2) {
    _classCallCheck(this, SubtractionBaseNComplement);

    if (n1.base !== n2.base) {
      throw new Error("SubtractionBaseNComplement.constructor(n1, n2):\n        Base of n1(".concat(n1.base, ") and base of n2(").concat(n2.base, ") must be qual."));
    }

    if (n1.digitNum !== n2.digitNum) {
      throw new Error("SubtractionBaseNComplement.constructor(n1, n2):\n        DigitNum of n1(".concat(n1.digitNum, ") and digitNum of n2(").concat(n2.digitNum, ") must be qual."));
    }

    this.watcher = null;
    this.producedOverflow = false;
    this.result = this._subtract(n1, n2);
  }

  _createClass(SubtractionBaseNComplement, [{
    key: "_subtract",
    value: function _subtract(n1, n2) {
      this.watcher = new Algorithm();
      var base = n1.base;
      var digitNum = n1.digitNum;

      var n1Arr = _toConsumableArray(n1.arr);

      var n2Arr = _toConsumableArray(n2.getFlipedArray()); // twos complement


      var offset = Math.max(n1.offset, n2.offset);

      if (n1.offset < offset) {
        n1Arr.push.apply(n1Arr, _toConsumableArray(Array(offset - n1.offset).fill(0)));
      }

      if (n2.offset < offset) {
        n2Arr.push.apply(n2Arr, _toConsumableArray(Array(offset - n2.offset).fill(0)));
      }

      var overflow = [1];
      var _final = []; // subtraction by addition with twos complement

      for (var i = n1Arr.length - 1; i >= 0; i--) {
        var m = n1Arr[i] + n2Arr[i] + overflow[0];

        _final.unshift(m % base);

        overflow.unshift(Math.floor(m / base));
      }

      _final.unshift(overflow[0]);

      var result = new NumberBaseNComplement(base, digitNum, _final, offset);
      var overflowPossible = n1.isNegative() && !n2.isNegative() || !n1.isNegative() && n2.isNegative();
      var signChanged = overflowPossible && (n1.isNegative() && !result.isNegative() || !n1.isNegative() && result.isNegative());
      this.producedOverflow = overflow[0] > 0 && signChanged;
      this.watcher.step('Subtraction').saveVariable('op1', n1).saveVariable('op2', n2).saveVariable('op1Arr', _toConsumableArray(n1Arr)).saveVariable('op2Arr', _toConsumableArray(n2Arr)).saveVariable('carryArr', [].concat(overflow)).saveVariable('resultArr', [].concat(_final)).saveVariable('result', result).saveVariable('overflow', this.producedOverflow);
      return result;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return SubtractionBaseNComplement;
}();

var MultiplicationBaseNComplement = /*#__PURE__*/function () {
  function MultiplicationBaseNComplement(n1, n2) {
    _classCallCheck(this, MultiplicationBaseNComplement);

    if (n1.base !== n2.base) {
      throw new Error("MultiplicationBaseNComplement.constructor(n1, n2):\n        Base of n1(".concat(n1.base, ") and base of n2(").concat(n2.base, ") must be qual."));
    }

    if (n1.digitNum !== n2.digitNum) {
      throw new Error("MultiplicationBaseNComplement.constructor(n1, n2):\n        DigitNum of n1(".concat(n1.digitNum, ") and digitNum of n2(").concat(n2.digitNum, ") must be qual."));
    }

    this.watcher = null;
    this.producedOverflow = false;
    this.result = this._multiply(n1, n2);
  }

  _createClass(MultiplicationBaseNComplement, [{
    key: "_multiply",
    value: function _multiply(n1, n2) {
      this.watcher = new Algorithm();
      var base = n1.base;
      var offset = Math.max(n1.offset, n2.offset);
      var digitsToTake = 2 * (n1.digitNum + offset);
      this.watcher.step('DetermineSize').saveVariable('n1Offset', n1.offset).saveVariable('n2Offset', n2.offset).saveVariable('digitNum', n1.digitNum).saveVariable('offset', offset).saveVariable('digitsToTake', digitsToTake);
      var n1Translated = n1.translate(digitsToTake - offset);
      var n2Translated = n2.translate(digitsToTake - offset);

      var op1Arr = _toConsumableArray(n1Translated.arr);

      var op2Arr = _toConsumableArray(n2Translated.arr);

      op1Arr.push.apply(op1Arr, _toConsumableArray(Array(Math.max(n2Translated.offset - n1Translated.offset, 0)).fill(0)));
      op2Arr.push.apply(op2Arr, _toConsumableArray(Array(Math.max(n1Translated.offset - n2Translated.offset, 0)).fill(0)));
      var op1 = new NumberBaseNSigned(n1Translated.base, op1Arr, offset, false);
      var op2 = new NumberBaseNSigned(n2Translated.base, op2Arr, offset, false);
      var operation = new MultiplicationBaseNSigned(op1, op2);
      var result = operation.getResult();
      this.watcher.step('Multiply').saveVariable('multiplication', operation.watcher);

      var resultArr = _toConsumableArray(result.arr);

      resultArr.push.apply(resultArr, _toConsumableArray(Array(Math.max(2 * offset - result.offset, 0)).fill(0)));

      if (resultArr.length < digitsToTake) {
        resultArr.unshift.apply(resultArr, _toConsumableArray(Array(digitsToTake - resultArr.length).fill(0)));
      }

      if (resultArr.length > digitsToTake) {
        resultArr.splice(0, resultArr.length - digitsToTake);
      }

      var finalDigitnum = digitsToTake - 2 * offset;
      var finalOffset = 2 * offset;
      var finalResult = new NumberBaseNComplement(base, finalDigitnum, resultArr, finalOffset);
      this.watcher.step('Result').saveVariable('digitsToTake', digitsToTake).saveVariable('result', finalResult);
      return finalResult;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return MultiplicationBaseNComplement;
}();

/* eslint-disable no-bitwise */
function numToChar$1(num) {
  if (num >= 0.0 && num <= 9) {
    return String.fromCharCode(num + '0'.charCodeAt(0));
  }

  if (num >= 10 && num <= 35) {
    return String.fromCharCode(num + 'A'.charCodeAt(0));
  }

  return '';
}

function charToNum$1(chr) {
  if ('0'.charCodeAt() <= chr.charCodeAt() && chr.charCodeAt() <= '9'.charCodeAt()) {
    return chr.charCodeAt() - '0'.charCodeAt();
  }

  if ('A'.charCodeAt() <= chr.charCodeAt() && chr.charCodeAt() <= 'Z') {
    return chr.charCodeAt() - 'A'.charCodeAt() + 10;
  }

  return -1;
} // Representation of a number in N's complement (Up to digitNum digits)


var NumberIEEE = /*#__PURE__*/function () {
  function NumberIEEE(expBitNum, manBitNum, representation) {
    _classCallCheck(this, NumberIEEE);

    if (expBitNum <= 0 || manBitNum <= 0) {
      console.log('IEEENumber(number, number, arr): Invalid number of bits for exponent and mantissa.');
    }

    this.expBitNum = expBitNum;
    this.manBitNum = manBitNum;
    this.bitNum = expBitNum + manBitNum + 1;

    this._checkArray(representation);

    this.arr = _toConsumableArray(representation);
    this.sign = this.arr[0];
    this.bias = (1 << expBitNum - 1) - 1;
    this.E = this._constructE();
    this.M = this._constructM();
    var isNaN = false;
    var isInf = true;
    var isZero = true;

    for (var i = expBitNum + 1; i < this.bitNum; i++) {
      if (this.arr[i] !== 0) {
        isZero = false;
        isNaN = true;
        isInf = false;
      }
    }

    for (var _i = 1; _i <= expBitNum; _i++) {
      if (this.arr[_i] !== 0) {
        isZero = false;
      }

      if (this.arr[_i] !== 1) {
        isNaN = false;
        isInf = false;
      }
    }

    this.isNaN = isNaN;
    this.isInfinity = isInf;
    this.isZero = isZero;
    this.isDenormalized = this.E === 0 && this.M !== 0;
    this.exponent = this._constructExponent();
    this.mantissa = this._constructMantissa();
    this.exponentBits = this._constructExponentBits();
    this.mantissaBits = this._constructMantissaBits();
    this.bitString = this._constructBitString();
    this.valueString = this._constructValString();
  }

  _createClass(NumberIEEE, [{
    key: "_checkArray",
    value: function _checkArray(arr) {
      if (arr.length !== this.bitNum) {
        return false;
      }

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] < 0 || arr[i] >= 2) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_constructBitString",
    value: function _constructBitString() {
      var result = '';
      var count = 0;

      for (var i = 0; i < this.arr.length; i++) {
        result += numToChar$1(this.arr[i]);

        if (i === 0 || i === this.expBitNum) {
          count = 0;
          result += ' ';
        }

        if (count % 4 === 0) {
          result += ' ';
        }

        count++;
      }

      return result;
    }
  }, {
    key: "_constructValString",
    value: function _constructValString() {
      var sign = this.arr[0] === 0 ? '+' : '-';

      if (this.isNan) {
        return 'NaN';
      }

      if (this.isInfinity) {
        return "".concat(sign, "inf");
      }

      if (this.isZero) {
        return "".concat(sign, "0");
      }

      return "".concat(sign).concat(this.mantissa, "e").concat(this.exponent);
    }
  }, {
    key: "_constructE",
    value: function _constructE() {
      var result = 0;

      for (var i = 1; i < 1 + this.expBitNum; i++) {
        result *= 2;
        result += this.arr[i];
      }

      return result;
    }
  }, {
    key: "_constructM",
    value: function _constructM() {
      var result = 0.0;

      for (var i = this.bitNum - 1; i >= 1 + this.expBitNum; i--) {
        result /= 2.0;
        result += this.arr[i];
      }

      result /= 2.0;
      return result;
    }
  }, {
    key: "_constructExponent",
    value: function _constructExponent() {
      return Math.max(-this.bias + 1, this.E - this.bias);
    }
  }, {
    key: "_constructMantissa",
    value: function _constructMantissa() {
      if (this.isDenormalized || this.isZero) {
        return this.M;
      }

      return 1 + this.M;
    }
  }, {
    key: "_constructExponentBits",
    value: function _constructExponentBits() {
      var result = _toConsumableArray(this.arr);

      result.splice(0, 1);
      result.splice(this.expBitNum, this.manBitNum);
      return result;
    }
  }, {
    key: "_constructMantissaBits",
    value: function _constructMantissaBits() {
      var firstBit = this.isDenormalized || this.isZero ? 0 : 1;

      var result = _toConsumableArray(this.arr);

      result.splice(0, 1 + this.expBitNum);
      result.unshift(firstBit);
      return result;
    }
  }]);

  return NumberIEEE;
}();
function getIEEEFromString(expBitNum, str) {
  var string = str;

  if (str.length <= expBitNum + 2) {
    console.log('getIEEEFromString(expBitNum, str): Given string is not compatible with the given number of expBitNum.');
    process.exit(1);
  }

  var inf = false;
  var zero = false;
  var nan = false;

  if (string.search('Inf') !== -1) {
    inf = true;
  } else if (string.search('Zero') !== -1) {
    zero = true;
  } else if (string.search('Nan') !== -1) {
    nan = true;
  } // Remove whitesapce


  string = string.replace(/\s+/g, '');
  var hadText = false;

  if (inf || zero || nan) {
    var oldLength = string.length; // eslint-disable-next-line no-useless-escape

    string = string.replace(/[^0-9\.]+/g, '');

    if (oldLength > string.length) {
      hadText = true;
    }
  }

  for (var i = 0; i < string.length; i++) {
    var n = charToNum$1(string[i]);

    if (n < 0 || n >= 2) {
      console.log('getIEEEFromString(expBitNum, str): Given string is not compatible with base 2.');
      process.exit(1);
    }
  } // Conversion from string to array


  var arr = [];

  for (var _i2 = 0; _i2 < string.length; _i2++) {
    if (string[_i2] === ' ') continue; // delete whitespace

    arr.push(charToNum$1(string[_i2]));
  }

  var number = new NumberIEEE(expBitNum, arr.length - expBitNum - 1, arr);

  if (hadText && inf) {
    number.isInfinity = true;
  } else if (hadText && nan) {
    number.isNaN = true;
  } else if (hadText && zero) {
    number.isZero = true;
  }

  return number;
}

var AdditionIEEE = /*#__PURE__*/function () {
  function AdditionIEEE(n1, n2) {
    _classCallCheck(this, AdditionIEEE);

    if (n1.expBitNum !== n2.expBitNum) {
      console.log("AdditionIEEE(Number, Number): expBitNum of n1(".concat(n1.expBitNum, ")\n        and expBitNum of n2(").concat(n2.expBitNum, ") not compatible."));
      process.exit(1);
    }

    if (n1.manBitNum !== n2.manBitNum) {
      console.log("AdditionIEEE(Number, Number): manBitNum of n1(".concat(n1.manBitNum, ")\n        and manBitNum of n2(").concat(n2.manBitNum, ") not compatible."));
      process.exit(1);
    }

    this.producedOverflow = false;
    this.watcher = null;
    this.result = this._add(n1, n2);
  }

  _createClass(AdditionIEEE, [{
    key: "_add",
    value: function _add(n1, n2) {
      this.watcher = new Algorithm();
      this.watcher = this.watcher.step('Edgecases');
      var expBitNum = n1.expBitNum;
      var manBitNum = n1.manBitNum;
      console.log(n1);
      console.log(n2);
      var bitNum = n1.bitNum; // Edgecases:

      if (n1.isZero) {
        // Return n2
        var _result = new NumberIEEE(expBitNum, manBitNum, _toConsumableArray(n2.arr));

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'n2zero');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result);
        return _result;
      }

      if (n2.isZero) {
        // Return n1
        var _result2 = new NumberIEEE(expBitNum, manBitNum, _toConsumableArray(n1.arr));

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'none');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result2);
        return _result2;
      }

      if (n1.isNaN || n2.isNaN || n1.isInfinity && n2.isInfinity && n1.sign !== n2.sign) {
        // Return NaN
        var _result3 = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(1));

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'nan');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result3);
        return _result3;
      }

      if (n1.isInfinity || n2.isInfinity) {
        // Return Infinty
        var _sign = n1.isInfinity ? n1.sign : n2.sign;

        var infArray = [_sign];
        infArray.push.apply(infArray, _toConsumableArray(Array(expBitNum).fill(1)));
        infArray.push.apply(infArray, _toConsumableArray(Array(manBitNum).fill(0)));

        var _result4 = new NumberIEEE(expBitNum, manBitNum, infArray);

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'inf');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result4);
        return _result4;
      } // Get unnormalized exponent


      var exponent1;
      var exponent2;
      var mantissa1;
      var mantissa2;
      var sign1;
      var sign2;
      var switched;

      if (n1.exponent >= n2.exponent) {
        exponent1 = n1.exponent;
        exponent2 = n2.exponent;
        mantissa1 = _toConsumableArray(n1.mantissaBits);
        mantissa2 = _toConsumableArray(n2.mantissaBits);
        sign1 = n1.sign;
        sign2 = n2.sign;
      } else {
        switched = true;
        exponent1 = n2.exponent;
        exponent2 = n1.exponent;
        mantissa1 = _toConsumableArray(n2.mantissaBits);
        mantissa2 = _toConsumableArray(n1.mantissaBits);
        sign1 = n2.sign;
        sign2 = n1.sign;
      } // difference between both exponents


      var deltaE = this._getDeltaExponent(exponent1, exponent2);

      this.watcher = this.watcher.step('CalculateDeltaE').saveVariable('switched', switched).saveVariable('expN1', n1.exponent).saveVariable('expN2', n2.exponent).saveVariable('expN1Bits', _toConsumableArray(n1.exponentBits)).saveVariable('expN2Bits', _toConsumableArray(n2.exponentBits)).saveVariable('deltaE', deltaE).saveVariable('preShift', _toConsumableArray(mantissa2)); // Shift smaller mantissa (mantissa2) to bigger mantissa (add 0s at start, remove last bits)

      if (deltaE > 0) {
        for (var i = 0; i < Math.abs(deltaE); i++) {
          mantissa2.unshift(0);
          mantissa2.pop();
        }
      }

      var additionData = this._addMantissa(mantissa1, mantissa2, sign1, sign2, mantissa2.length, deltaE, n1.isDenormalized || n2.isDenormalized);

      var sign = additionData.sign ? 1 : 0;
      var normalizedMantissa = additionData.normalizedMantissa;
      var shift = additionData.shift; // Check if newly calculated mantissa is equal to 0

      if (additionData.isZero || shift === normalizedMantissa.length - 1 && normalizedMantissa[0] === 0) {
        var _result5 = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(0));

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'zero');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result5);
        return _result5;
      } // Calculate bits of the final Exponent


      var finalE = exponent1 + n1.bias + shift; // If we have a denormalized number, move the mantissa right again
      // console.log(finalE, normalizedMantissa);

      if (finalE <= 0) {
        // Shift the leading 1 into the mantissa
        normalizedMantissa.unshift(1);
        normalizedMantissa.pop(); // shift the 1 to express the finalE

        for (var _i = 0; _i < Math.abs(finalE); ++_i) {
          normalizedMantissa.unshift(0);
          normalizedMantissa.pop();
        }

        finalE = 0;
      }

      var exponentBits = this._getExponentBits(expBitNum, finalE); // console.log(finalE, normalizedMantissa);


      this.watcher = this.watcher.step('Normalize').saveVariable('normalizedMantissa', _toConsumableArray(normalizedMantissa)).saveVariable('shift', shift).saveVariable('n1ExpBits', _toConsumableArray(n1.exponentBits)).saveVariable('finalExpBits', _toConsumableArray(exponentBits)); // Check if newly calculated ieee is equal to inf

      if (finalE >= Math.pow(2, expBitNum) - 1) {
        var _infArray = [sign];

        _infArray.push.apply(_infArray, _toConsumableArray(Array(expBitNum).fill(1)));

        _infArray.push.apply(_infArray, _toConsumableArray(Array(manBitNum).fill(0)));

        var _result6 = new NumberIEEE(expBitNum, manBitNum, _infArray);

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'inf');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result6);
        return _result6;
      } // normal case result


      this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'none');
      var resultArray = [sign];
      resultArray.push.apply(resultArray, _toConsumableArray(exponentBits));
      resultArray.push.apply(resultArray, _toConsumableArray(normalizedMantissa));
      console.log(expBitNum, manBitNum, resultArray);
      var result = new NumberIEEE(expBitNum, manBitNum, resultArray);
      console.log(result);
      this.watcher = this.watcher.step('Result').saveVariable('result', result);
      return result;
    }
  }, {
    key: "_getDeltaExponent",
    value: function _getDeltaExponent(exp1, exp2) {
      return exp1 - exp2;
    }
  }, {
    key: "_addMantissa",
    value: function _addMantissa(mantissa1, mantissa2, sign1, sign2, binNum, deltaE, originallyDenormalized) {
      this.watcher = this.watcher.step('AddMantissa').saveVariable('mantissa1', mantissa1).saveVariable('mantissa2', mantissa2).saveVariable('sign1', sign1).saveVariable('sign2', sign2).saveVariable('binNum', binNum);
      var isEqual = !originallyDenormalized && mantissa1.length === mantissa2.length && mantissa1.every(function (value, index) {
        return value === mantissa2[index];
      });
      this.watcher = this.watcher.step('AddMantissa').saveVariable('equalMantissa', isEqual); // x + x = 2x

      if (isEqual && sign1 === sign2) {
        var _normalizedMantissa = _toConsumableArray(mantissa1);

        _normalizedMantissa.shift();

        _normalizedMantissa.push(0);

        var _shift = 1;
        var _sign2 = sign1;
        this.watcher = this.watcher.step('AddMantissa').saveVariable('addition', 'none').saveVariable('shift', 0).saveVariable('sign', _sign2).saveVariable('unnormalizedMantissa', _toConsumableArray(mantissa1)).saveVariable('normalizedMantissa', _toConsumableArray(_normalizedMantissa));
        return {
          sign: _sign2,
          normalizedMantissa: _normalizedMantissa,
          shift: _shift
        };
      } // x + (-x) = 0


      if (isEqual && sign1 !== sign2) {
        var _normalizedMantissa2 = [];

        for (var i = 0; i < mantissa1.length; i++) {
          _normalizedMantissa2.push(0);
        }

        var _shift2 = 0;
        var _sign3 = sign1;
        this.watcher = this.watcher.step('AddMantissa').saveVariable('addition', 'none').saveVariable('shift', 0).saveVariable('sign', _sign3).saveVariable('unnormalizedMantissa', [].concat(_normalizedMantissa2)).saveVariable('normalizedMantissa', [].concat(_normalizedMantissa2));
        return {
          sign: _sign3,
          normalizedMantissa: _normalizedMantissa2,
          shift: _shift2,
          isZero: true
        };
      }

      var op1;
      var op2; // if deltaE > 0 then the sign of the first summand leads the result sign

      if (deltaE > 0) {
        op1 = new NumberBaseNComplement(2, binNum, mantissa1, binNum, false); // ! Special case: mantissa2 is completely zero => VB = 0

        var hasSign = sign1 !== sign2 && !mantissa2.every(function (item) {
          return item === 0;
        });
        op2 = new NumberBaseNComplement(2, binNum, mantissa2, binNum, hasSign);
      } else {
        op1 = new NumberBaseNComplement(2, binNum, mantissa1, binNum, sign1 === 1);
        op2 = new NumberBaseNComplement(2, binNum, mantissa2, binNum, sign2 === 1);
      }

      this.watcher = this.watcher.step('AddMantissa').saveVariable('complement1', JSON.parse(JSON.stringify(op1.watcher)));
      this.watcher = this.watcher.step('AddMantissa').saveVariable('complement2', JSON.parse(JSON.stringify(op2.watcher)));
      console.log(op1, op2);
      var addition = new AdditionBaseNComplement(op1, op2);
      this.watcher = this.watcher.step('AddMantissa').saveVariable('addition', JSON.parse(JSON.stringify(addition.watcher)));
      var additionResult = addition.getResult();
      var sign = sign1 === 1; // case respects to a possible changed sign if the summands have the same exponent

      if (deltaE === 0) {
        additionResult = new NumberBaseNComplement(2, additionResult.arr.length, _toConsumableArray(additionResult.arr), binNum, addition.negativeResult);
        sign = addition.negativeResult;
      }

      var unnormalizedMantissa = _toConsumableArray(additionResult.arr);

      this.watcher = this.watcher.step('AddMantissa').saveVariable('unnormalizedMantissa', _toConsumableArray(unnormalizedMantissa));
      var shift = 0; // shift for overflowed addition

      if (unnormalizedMantissa.length > mantissa1.length) {
        shift = unnormalizedMantissa.length - mantissa1.length;
      }

      if (addition.carryOutSet) {
        shift = 1;
      } else {
        // shift right until a leading 1 is found
        while (Math.abs(shift) <= unnormalizedMantissa.length && unnormalizedMantissa[0] === 0) {
          unnormalizedMantissa.shift();
          unnormalizedMantissa.push(0);
          shift--;
        }
      } // shift is bigger than mantissa length => 0


      if (shift === -unnormalizedMantissa.length) {
        var _normalizedMantissa3 = _toConsumableArray(unnormalizedMantissa);

        this.watcher = this.watcher.step('AddMantissa').saveVariable('shift', shift).saveVariable('sign', sign).saveVariable('unnormalizedMantissa', _toConsumableArray(_normalizedMantissa3));
        return {
          sign: sign,
          normalizedMantissa: _normalizedMantissa3,
          shift: shift,
          isZero: true
        };
      } // remove leading 1


      unnormalizedMantissa.shift();
      unnormalizedMantissa.push(0); // round resulting array

      var normalizedMantissa = roundArray(unnormalizedMantissa, mantissa1.length - 1);
      this.watcher = this.watcher.step('AddMantissa').saveVariable('shift', shift).saveVariable('sign', sign).saveVariable('normalizedMantissa', _toConsumableArray(normalizedMantissa));
      return {
        sign: sign,
        normalizedMantissa: normalizedMantissa,
        shift: shift,
        isZero: false
      };
    }
  }, {
    key: "_calculateShift",
    value: function _calculateShift(unnormalizedMantissa, cDigits) {
      if (cDigits >= 1) {
        return cDigits - 1;
      }

      var shift = 0;

      for (var i = 1; i < unnormalizedMantissa.length; i++) {
        shift--;

        if (unnormalizedMantissa[i] === 1) {
          break;
        }
      }

      return shift;
    }
  }, {
    key: "_getNormalizedMantissa",
    value: function _getNormalizedMantissa(manBitNum, unnormalizedMantissa, shift) {
      var normalizedMantissa = [];

      for (var i = 0; i < manBitNum; i++) {
        var access = i + Math.max(-shift, 0) + 1;
        var num = access < unnormalizedMantissa.length ? unnormalizedMantissa[access] : 0;
        normalizedMantissa.push(num);
      }

      return normalizedMantissa;
    }
  }, {
    key: "_getExponentBits",
    value: function _getExponentBits(expBitNum, finalE) {
      var curE = finalE;
      var exponentBits = [];

      for (var i = 0; i < expBitNum; i++) {
        exponentBits.unshift(curE % 2);
        curE = Math.floor(curE / 2);
      }

      return exponentBits;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return AdditionIEEE;
}();

var SubtractionIEEE = /*#__PURE__*/function () {
  function SubtractionIEEE(n1, n2) {
    _classCallCheck(this, SubtractionIEEE);

    if (n1.expBitNum !== n2.expBitNum) {
      console.log("SubtractionIEEE(Number, Number): expBitNum of n1(".concat(n1.expBitNum, ") and expBitNum of n2(").concat(n2.expBitNum, ") not compatible."));
    }

    if (n1.manBitNum !== n2.manBitNum) {
      console.log("SubtractionIEEE(Number, Number): manBitNum of n1(".concat(n1.manBitNum, ") and manBitNum of n2(").concat(n2.manBitNum, ") not compatible."));
    }

    this.producedOverflow = false;
    this.result = this._subtract(n1, n2);
  }

  _createClass(SubtractionIEEE, [{
    key: "_subtract",
    value: function _subtract(n1, n2) {
      this.watcher = new Algorithm();

      var flipedArr2 = _toConsumableArray(n2.arr);

      flipedArr2[0] = flipedArr2[0] === 0 ? 1 : 0;
      var op1 = new NumberIEEE(n1.expBitNum, n1.manBitNum, n1.arr);
      var op2 = new NumberIEEE(n2.expBitNum, n2.manBitNum, flipedArr2);
      this.watcher = this.watcher.step('Input').saveVariable('op1Sign', op1.sign).saveVariable('op1Sign', op1.exponentBits).saveVariable('op1Sign', op1.mantissaBits).saveVariable('op1Sign', op2.sign).saveVariable('op1Sign', op2.exponentBits).saveVariable('op1Sign', op2.mantissaBits); // a - b = a + (-b)

      var addition = new AdditionIEEE(op1, op2);
      this.watcher = this.watcher.step('Addition').saveVariable('addition', addition.watcher);
      return addition.getResult();
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return SubtractionIEEE;
}();

var MultiplicationIEEE = /*#__PURE__*/function () {
  function MultiplicationIEEE(n1, n2) {
    _classCallCheck(this, MultiplicationIEEE);

    if (n1.expBitNum !== n2.expBitNum) {
      console.log("MultiplicationIEEE(Number, Number): expBitNum of n1(".concat(n1.expBitNum, ")\n        and expBitNum of n2(").concat(n2.expBitNum, ") not compatible."));
    }

    if (n1.manBitNum !== n2.manBitNum) {
      console.log("MultiplicationIEEE(Number, Number): manBitNum of n1(".concat(n1.manBitNum, ")\n        and manBitNum of n2(").concat(n2.manBitNum, ") not compatible."));
    }

    this.producedOverflow = false;
    this.result = this._multiply(n1, n2);
  }

  _createClass(MultiplicationIEEE, [{
    key: "_multiply",
    value: function _multiply(n1, n2) {
      this.watcher = new Algorithm();
      var expBitNum = n1.expBitNum;
      var manBitNum = n1.manBitNum;
      var bitNum = n1.bitNum;
      var sign = (n1.sign && !n2.sign || !n1.sign && n2.sign) + 0;
      this.watcher = this.watcher.step('MulMantissa').saveVariable('sign', sign); // Edgecases:

      if (n1.isNaN || n2.isNaN || n1.isInfinity && n2.isZero || n1.isZero && n2.isInfinity) {
        // Return NaN
        var _result = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(1));

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'nan');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result);
        return _result;
      }

      if (n1.isInfinity || n2.isInfinity) {
        // Return Infinty
        var infArray = [sign];
        infArray.push.apply(infArray, _toConsumableArray(Array(expBitNum).fill(1)));
        infArray.push.apply(infArray, _toConsumableArray(Array(manBitNum).fill(0)));

        var _result2 = new NumberIEEE(expBitNum, manBitNum, infArray);

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'inf');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result2);
        return _result2;
      }

      if (n1.isZero || n2.isZero) {
        // Return Zero
        var _infArray = [sign];

        _infArray.push.apply(_infArray, _toConsumableArray(Array(expBitNum).fill(0)));

        _infArray.push.apply(_infArray, _toConsumableArray(Array(manBitNum).fill(0)));

        var _result3 = new NumberIEEE(expBitNum, manBitNum, _infArray);

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'zero');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result3);
        return _result3;
      }

      var op1 = new NumberBaseNSigned(2, n1.mantissaBits);
      var op2 = new NumberBaseNSigned(2, n2.mantissaBits);
      var multiplication = new MultiplicationBaseNSigned(op1, op2);
      this.watcher = this.watcher.step('Multiplication').saveVariable('multiplication', multiplication.watcher);
      var multiplicationResult = multiplication.getResult();
      var digitNum = multiplicationResult.digitNum; // Adds zeros if unnormalized mantissa is to short

      var unnormalizedMantissa = _toConsumableArray(multiplicationResult.arr);

      this.watcher = this.watcher.step('MulMantissa').saveVariable('unnormalizedMantissa', unnormalizedMantissa);

      for (var i = unnormalizedMantissa.length; i < Math.max(n1.mantissaBits.length, n2.mantissaBits.length); i++) {
        unnormalizedMantissa.push(0);
      } // deletes zeros at the front of the mantissa


      var cDigits = digitNum;

      while (cDigits > 1 && unnormalizedMantissa[0] === 0) {
        unnormalizedMantissa.splice(0, 1);
        cDigits--;
      } // Calculate shift
      // Positive: Rightshift | Negative: Leftshift


      var shift = multiplicationResult.arr.length - multiplicationResult.offset - op1.arr.length;

      if (cDigits >= 1) {
        shift = cDigits - 1;
      } else {
        for (var _i = 0; _i < unnormalizedMantissa.length; _i++) {
          if (unnormalizedMantissa[_i] === 1) {
            break;
          }

          shift--;
        }
      }

      this.watcher = this.watcher.step('MulMantissa').saveVariable('shift', shift); // Check if newly calculated ieee is equal to zero

      if (shift === unnormalizedMantissa.length - 1 && unnormalizedMantissa[0] === 0) {
        var _result4 = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(0));

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'zero');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result4);
        return _result4;
      } // normalizes the mantissa


      var normalizedMantissa = []; // const toRound = unnormalizedMantissa[manBitNum] === 1;

      var toRound = unnormalizedMantissa.length <= manBitNum ? false : unnormalizedMantissa[manBitNum + 1] === 1;

      for (var _i2 = 0; _i2 < manBitNum; _i2++) {
        var access = _i2 + Math.max(-shift, 0) + 1;
        var num = access < unnormalizedMantissa.length ? unnormalizedMantissa[access] : 0;
        normalizedMantissa.push(num);
      }

      if (toRound) {
        normalizedMantissa = roundArray(normalizedMantissa, manBitNum, toRound, n1.base);
      }

      this.watcher = this.watcher.step('CalculateExp').saveVariable('E1', n1.E).saveVariable('E2', n2.E).saveVariable('bias', n1.bias).saveVariable('notShifted', n1.E + n2.E - n1.bias);
      this.watcher = this.watcher.step('MulMantissa').saveVariable('normalizedMantissa', normalizedMantissa);
      var finalE = n1.E + n2.E - n1.bias + shift;

      if (finalE <= 0) {
        // Shift the leading 1 into the mantissa
        normalizedMantissa.unshift(1);
        normalizedMantissa.pop(); // shift the 1 to express the finalE

        for (var _i3 = 0; _i3 < Math.abs(finalE); ++_i3) {
          normalizedMantissa.unshift(0);
          normalizedMantissa.pop();
        }

        finalE = 0;
      } // Check if denormalization has to take place

      /* if (finalE < 0) {
        const denormArray = [sign];
        // Exponent of ZERO indicates the denormalized representation
        denormArray.push(...Array(expBitNum).fill(0));
        // Now shift the mantissa by the extra amount
        for (let i = 0; i < Math.abs(finalE); i += 1)  {
          normalizedMantissa.unshift(0);
        }
        normalizedMantissa.splice(manBitNum, (normalizedMantissa.length - manBitNum));
        denormArray.push(...normalizedMantissa);
        const result = new NumberIEEE(expBitNum, manBitNum, denormArray);
         this.watcher = this.watcher.step('ResultEdgecase')
          .saveVariable('edgecase', 'denormalized');
        this.watcher = this.watcher.step('Result')
          .saveVariable('result', result);
        return result;
      } */
      // caluclates the exponent bits


      var curE = finalE;
      var exponentBits = [];

      for (var _i4 = 0; _i4 < expBitNum; _i4++) {
        exponentBits.unshift(curE % 2);
        curE = Math.floor(curE / 2);
      } // Check if newly calculated ieee is equal to inf


      if (finalE >= Math.pow(2, expBitNum) - 1) {
        var _infArray2 = [sign];

        _infArray2.push.apply(_infArray2, _toConsumableArray(Array(expBitNum).fill(1)));

        _infArray2.push.apply(_infArray2, _toConsumableArray(Array(manBitNum).fill(0)));

        var _result5 = new NumberIEEE(expBitNum, manBitNum, _infArray2);

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'inf');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result5);
        return _result5;
      } // normal case result


      this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'none');
      var resultArr = [sign];
      resultArr.push.apply(resultArr, exponentBits);
      resultArr.push.apply(resultArr, _toConsumableArray(normalizedMantissa));
      var result = new NumberIEEE(expBitNum, manBitNum, resultArr);
      this.watcher = this.watcher.step('Result').saveVariable('result', result);
      return result;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return MultiplicationIEEE;
}();

var DivisionIEEE = /*#__PURE__*/function () {
  function DivisionIEEE(n1, n2) {
    _classCallCheck(this, DivisionIEEE);

    if (n1.expBitNum !== n2.expBitNum) {
      console.log('DivisionIEEE(Number, Number): expBitNum of n1('.concat(n1.expBitNum, ') and expBitNum of n2(').concat(n2.expBitNum, ') not compatible.'));
    }

    if (n1.manBitNum !== n2.manBitNum) {
      console.log('DivisionIEEE(Number, Number): manBitNum of n1('.concat(n1.manBitNum, ') and manBitNum of n2(').concat(n2.manBitNum, ') not compatible.'));
    }

    this.producedOverflow = false;
    this.result = this._divide(n1, n2);
  }

  _createClass(DivisionIEEE, [{
    key: "_divide",
    value: function _divide(n1, n2) {
      this.watcher = new Algorithm();
      var expBitNum = n1.expBitNum;
      var manBitNum = n1.manBitNum;
      var bitNum = n1.bitNum;
      var sign = (n1.sign && !n2.sign || !n1.sign && n2.sign) + 0; // Edgecases:

      if (n1.isNaN || n2.isNaN || n1.isInfinity && n2.isZero || n1.isZero && n2.isInfinity) {
        // Return NaN
        var _result = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(1));

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'nan');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result);
        return _result;
      }

      if (n1.isInfinity && n2.isInfinity || n1.isZero && n2.isZero) {
        // Return NaN, the second
        var _result2 = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(1));

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'nan');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result2);
        return _result2;
      }

      if (n1.isInfinity && !n2.isInfinity || !n1.isZero && n2.isZero) {
        // Return Infinty
        var infArray = [sign];
        infArray.push.apply(infArray, _toConsumableArray(Array(expBitNum).fill(1)));
        infArray.push.apply(infArray, _toConsumableArray(Array(manBitNum).fill(0)));

        var _result3 = new NumberIEEE(expBitNum, manBitNum, infArray);

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'inf');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result3);
        return _result3;
      }

      if (!n1.isInfinity && n2.isInfinity || n1.isZero) {
        // Return Zero
        var _infArray = [sign];

        _infArray.push.apply(_infArray, _toConsumableArray(Array(expBitNum).fill(0)));

        _infArray.push.apply(_infArray, _toConsumableArray(Array(manBitNum).fill(0)));

        var _result4 = new NumberIEEE(expBitNum, manBitNum, _infArray);

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'zero');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result4);
        return _result4;
      } // check if mantissas are equal


      var k = 0;
      var similar = true;

      while (k < n1.mantissaBits.length && similar === true) {
        if (n1.mantissaBits[k] !== n2.mantissaBits[k]) {
          similar = false;
        }

        k += 1;
      }

      var unnormalizedMantissa = [];
      var normalizedMantissa = [];
      var shift = 0;
      this.watcher = this.watcher.step('Division').saveVariable('equalMantissa', similar);

      if (similar === false) {
        // case mantissa not equal
        var op1 = new NumberBaseNSigned(2, n1.mantissaBits, n1.offset, false);
        var op2 = new NumberBaseNSigned(2, n2.mantissaBits, n2.offset, false);
        var operation = new DivisionBaseNSigned(op1, op2, Math.max(n1.manBitNum + 1, n2.manBitNum + 1));
        this.watcher = this.watcher.step('Division').saveVariable('division', operation.watcher);
        var divisionResult = operation.getResult();
        unnormalizedMantissa = _toConsumableArray(divisionResult.arr); // cut unnormalized matissa if to long

        var digitNum = operation.manBitNum;
        this.watcher = this.watcher.step('Division').saveVariable('divMantissa', _toConsumableArray(unnormalizedMantissa));
        unnormalizedMantissa = roundArray(unnormalizedMantissa, digitNum); // Calculate shift
        // Positive: Rightshift | Negative: Leftshift

        var i = 0;

        while (i < unnormalizedMantissa.length) {
          if (unnormalizedMantissa[i] === 1) {
            break;
          }

          i += 1;
          shift -= 1;
        }

        if (operation.firstNegativeStep) {
          shift -= 1;
        }

        if (shift === unnormalizedMantissa.length - 1 && unnormalizedMantissa[0] === 0) {
          // Return zero
          var _result5 = new NumberIEEE(expBitNum, manBitNum, Array(bitNum).fill(0));

          this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'zero');
          this.watcher = this.watcher.step('Result').saveVariable('result', _result5);
          return _result5;
        }

        for (var _i = 1; _i <= manBitNum; _i += 1) {
          var num = _i < unnormalizedMantissa.length ? unnormalizedMantissa[_i] : 0;
          normalizedMantissa.push(num);
        }
      } else {
        // equal mantissas => mantissa = 1.0
        for (var _i2 = 0; _i2 < manBitNum; _i2 += 1) {
          normalizedMantissa.push(0);
        }
      }

      var finalE = n1.E - n2.E + n1.bias + shift;

      if (finalE <= 0) {
        // Shift the leading 1 into the mantissa
        normalizedMantissa.unshift(1);
        normalizedMantissa.pop(); // shift the 1 to express the finalE

        for (var _i3 = 0; _i3 < Math.abs(finalE); ++_i3) {
          normalizedMantissa.unshift(0);
          normalizedMantissa.pop();
        }

        finalE = 0;
      }

      var curE = finalE;
      var exponentBits = [];

      for (var _i4 = 0; _i4 < expBitNum; _i4 += 1) {
        exponentBits.unshift(curE % 2);
        curE = Math.floor(curE / 2);
      }

      this.watcher = this.watcher.step('Exponent').saveVariable('E1', n1.E).saveVariable('E2', n2.E).saveVariable('Bias', n1.bias).saveVariable('Shift', shift).saveVariable('EUnshifted', n1.E - n2.E + n1.bias).saveVariable('FinalE', finalE);
      this.watcher = this.watcher.step('Mantissa').saveVariable('unnormalizedMantissa', _toConsumableArray(unnormalizedMantissa)).saveVariable('normalizedMantissa', [].concat(normalizedMantissa));
      /* Check if denormalization has to take place
      if (finalE < 0) {
        const denormArray = [sign];
        // Exponent of ZERO indicates the denormalized representation
        denormArray.push(...Array(expBitNum).fill(0));
        // Unshift the leading 1 into the mantissa
        normalizedMantissa.unshift(1);
        // Now shift the mantissa by the extra amount
        for (let i = 0; i < Math.abs(finalE); i += 1)  {
          normalizedMantissa.unshift(0);
        }
        normalizedMantissa.splice(manBitNum, (normalizedMantissa.length - manBitNum));
        denormArray.push(...normalizedMantissa);
        const result = new NumberIEEE(expBitNum, manBitNum, denormArray);
         this.watcher = this.watcher.step('ResultEdgecase')
          .saveVariable('edgecase', 'denormalized');
        this.watcher = this.watcher.step('Result')
          .saveVariable('result', result);
        return result;
      } */
      // Check if newly calculated ieee is equal to inf

      if (finalE >= Math.pow(2, expBitNum) - 1) {
        var _infArray2 = [sign];

        _infArray2.push.apply(_infArray2, _toConsumableArray(Array(expBitNum).fill(1)));

        _infArray2.push.apply(_infArray2, _toConsumableArray(Array(manBitNum).fill(0)));

        var _result6 = new NumberIEEE(expBitNum, manBitNum, _infArray2);

        this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'inf');
        this.watcher = this.watcher.step('Result').saveVariable('result', _result6);
        return _result6;
      } // normal case result


      this.watcher = this.watcher.step('ResultEdgecase').saveVariable('edgecase', 'none');
      var resultArray = [sign];
      resultArray.push.apply(resultArray, exponentBits);
      resultArray.push.apply(resultArray, normalizedMantissa);
      var result = new NumberIEEE(expBitNum, manBitNum, resultArray);
      this.watcher = this.watcher.step('Result').saveVariable('edgecase', 'none').saveVariable('result', result);
      return result;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return DivisionIEEE;
}();

var AdditionBaseNComplementToLatex = /*#__PURE__*/function () {
  function AdditionBaseNComplementToLatex(watcher) {
    _classCallCheck(this, AdditionBaseNComplementToLatex);

    this.watcher = watcher;
    this.result = this._generateLatex();
  }

  _createClass(AdditionBaseNComplementToLatex, [{
    key: "_generateLatex",
    value: function _generateLatex() {
      var _firstline;

      if (this.watcher.start.name !== 'Addition') {
        console.log("AdditionToLatex._generateLatex(): Watcher does not have a step titled 'Addition.'");
        process.exit(1);
      }

      var data = this.watcher.start.data;
      var width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;
      var arrayCs = Array(width).fill('c').join('');

      var firstline = _toConsumableArray(data.op1Arr).map(function (e) {
        return e.toString();
      });

      (_firstline = firstline).unshift.apply(_firstline, _toConsumableArray(Array(width - firstline.length).fill('')));

      firstline = firstline.join(' & ');

      var carryArr = _toConsumableArray(data.carryArr);

      var op2Arr = _toConsumableArray(data.op2Arr);

      if (carryArr.length > width - 1) {
        carryArr.splice(0, 1);
      }

      if (carryArr.length > op2Arr.length) {
        op2Arr.unshift.apply(op2Arr, _toConsumableArray(Array(carryArr.length - op2Arr.length).fill('')));
      }

      var secondline = [];

      for (var i = 0; i < op2Arr.length; i++) {
        if (carryArr[i] !== 0) {
          secondline.push([op2Arr[i], carryArr[i]]);
        } else {
          secondline.push([op2Arr[i], '']);
        }
      }

      secondline = secondline.map(function (e) {
        return "\\underset{".concat(e[1].toString(), "}{").concat(e[0].toString(), "}");
      });
      secondline.unshift('+');
      secondline = secondline.join(' & ');

      var thirdline = _toConsumableArray(data.resultArr).map(function (e) {
        return e.toString();
      });

      thirdline.unshift('=');
      thirdline = thirdline.join(' & ');
      var latex = ['\\begin{align*}', "\t&\\begin{array}{".concat(arrayCs, "}"), "\t\t ".concat(firstline, " \\\\"), "\t\t ".concat(secondline, " \\\\ \\hline"), "\t\t ".concat(thirdline, " \\\\"), '\t\\end{array}\\\\', '\t&\\implies\\begin{aligned}', "\t\t&\\text{Ergebnis:}\\ ".concat(data.result.stringRepresentation, " \\\\"), "\t\t&\\text{Es ist ".concat(data.overflow ? '' : 'k', "ein Overflow aufgetreten.}"), '\t\\end{aligned}\\\\', '\\end{align*}'].join('\n');
      return latex;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return AdditionBaseNComplementToLatex;
}();

var SubtractionBaseNComplementToLatex = /*#__PURE__*/function () {
  function SubtractionBaseNComplementToLatex(watcher) {
    _classCallCheck(this, SubtractionBaseNComplementToLatex);

    this.watcher = watcher;
    this.result = this._generateLatex();
  }

  _createClass(SubtractionBaseNComplementToLatex, [{
    key: "_generateLatex",
    value: function _generateLatex() {
      var _firstline;

      if (this.watcher.start.name !== 'Subtraction') {
        console.log("SubtractionToLatex._generateLatex(): Watcher does not have a step titled 'Subtraction.'");
        process.exit(1);
      }

      var data = this.watcher.start.data;
      var width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;
      var arrayCs = Array(width).fill('c').join('');

      var firstline = _toConsumableArray(data.op1Arr).map(function (e) {
        return e.toString();
      });

      (_firstline = firstline).unshift.apply(_firstline, _toConsumableArray(Array(width - firstline.length).fill('')));

      firstline = firstline.join(' & ');

      var carryArr = _toConsumableArray(data.carryArr);

      var op2Arr = _toConsumableArray(data.op2Arr);

      if (carryArr.length > width - 1) {
        carryArr.splice(0, 1);
      }

      if (carryArr.length > op2Arr.length) {
        op2Arr.unshift.apply(op2Arr, _toConsumableArray(Array(carryArr.length - op2Arr.length).fill('')));
      }

      var secondline = [];

      for (var i = 0; i < op2Arr.length; i++) {
        if (carryArr[i] !== 0) {
          secondline.push([op2Arr[i], carryArr[i]]);
        } else {
          secondline.push([op2Arr[i], '']);
        }
      }

      secondline = secondline.map(function (e) {
        return "\\underset{".concat(e[1].toString(), "}{").concat(e[0].toString(), "}");
      });
      secondline.unshift('+');
      secondline = secondline.join(' & ');

      var thirdline = _toConsumableArray(data.resultArr).map(function (e) {
        return e.toString();
      });

      thirdline.unshift('=');
      thirdline = thirdline.join(' & ');
      var latex = ['\\begin{align*}', "\t&\\begin{array}{".concat(arrayCs, "}"), "\t\t ".concat(firstline, " \\\\"), "\t\t ".concat(secondline, " \\\\ \\hline"), "\t\t ".concat(thirdline, " \\\\"), '\t\\end{array}\\\\', '\t&\\implies\\begin{aligned}', "\t\t&\\text{Ergebnis:}\\ ".concat(data.result.stringRepresentation, " \\\\"), "\t\t&\\text{Es ist ".concat(data.overflow ? '' : 'k', "ein Overflow aufgetreten.}"), '\t\\end{aligned}\\\\', '\\end{align*}'].join('\n');
      return latex;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return SubtractionBaseNComplementToLatex;
}();

var MultiplicationBaseNSignedToLatex = /*#__PURE__*/function () {
  function MultiplicationBaseNSignedToLatex(multInfo) {
    _classCallCheck(this, MultiplicationBaseNSignedToLatex);

    this.result = this._generateLatex(multInfo);
  }

  _createClass(MultiplicationBaseNSignedToLatex, [{
    key: "_generateLatex",
    value: function _generateLatex(multInfo) {
      var latex = [];
      latex.push('\\begin{enumerate}');

      if (multInfo.GetSign !== undefined && multInfo.GetSign != null) {
        latex.push("\\item Get Final Sign: \\ ".concat(multInfo.GetSign.latex));
      }

      if (multInfo.Multiplication !== undefined && multInfo.Multiplication != null) {
        latex.push('\\item Multiply absolute values: \\\\');
        latex.push(multInfo.Multiplication.latex);
      }

      if (multInfo.Final !== undefined && multInfo.Final != null) {
        latex.push("\\item[] Final Result: \\ ".concat(multInfo.Final.latex));
      }

      latex.push('\\end{enumerate}');
      return latex.join('\n');
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return MultiplicationBaseNSignedToLatex;
}();

var MultiplicationBaseNComplementToLatex = /*#__PURE__*/function () {
  function MultiplicationBaseNComplementToLatex(watcher) {
    _classCallCheck(this, MultiplicationBaseNComplementToLatex);

    this.algorithm = watcher;
    this.result = this._generateLatex();
  }

  _createClass(MultiplicationBaseNComplementToLatex, [{
    key: "_generateLatex",
    value: function _generateLatex() {
      var latexSize;
      var latexMultiplication;
      this.algorithm = this.algorithm.start;

      while (this.algorithm.name !== 'Result') {
        if (this.algorithm.name === 'DetermineSize') {
          latexSize = this._computeDetermineSize();
        } else if (this.algorithm.name === 'Multiply') {
          latexMultiplication = this._computeMultiplication();
        } else {
          console.log('MultiplicationBaseNComplementToLatex._generateLatex(): Unknown step.');
          process.exit(0);
        }

        this.algorithm = this.algorithm.next;
      }

      var latex = ['\\begin{enumerate}', "\\item Get needed size: \\ ".concat(latexSize, " "), '\\item Sign extend operands to $S$ and multiply as positive numbers: \\\\', "".concat(latexMultiplication), '\\item[] Take the $S$ last digits.\\\\', "Final Result: \\ $".concat(this.algorithm.data.result.stringRepresentation, "$"), '\\end{enumerate}'].join('\n');
      return latex;
    }
  }, {
    key: "_computeDetermineSize",
    value: function _computeDetermineSize() {
      var data = this.algorithm.data;
      var latex = "$S = 2 \\cdot \\max(\\text{length}(n1), \\text{length}(n2)) = 2 \\cdot \\max(".concat(data.n1Offset + data.digitNum, ", ").concat(data.n2Offset + data.digitNum, ")$ = ").concat(data.digitsToTake);
      return latex;
    }
  }, {
    key: "_computeMultiplication",
    value: function _computeMultiplication() {
      var data = this.algorithm.data;
      var latex = new MultiplicationBaseNSignedToLatex(data.multiplication, true).getResult();
      return latex;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return MultiplicationBaseNComplementToLatex;
}();

var SubtractionBaseNSignedToObject = /*#__PURE__*/function () {
  function SubtractionBaseNSignedToObject(watcher) {
    _classCallCheck(this, SubtractionBaseNSignedToObject);

    this.watcher = watcher;
    this.result = this._generateObject();
  }

  _createClass(SubtractionBaseNSignedToObject, [{
    key: "_generateObject",
    value: function _generateObject() {
      var curStep = this.watcher.start;
      var retObject = {};

      while (curStep != null) {
        if (curStep.name === 'OperatorSwitch') {
          retObject[curStep.name] = this._workOperatorSwitch(curStep);
        }

        if (curStep.name === 'GetSign') {
          retObject[curStep.name] = this._workGetSign(curStep);
        }

        if (curStep.name === 'Subtraction') {
          retObject[curStep.name] = this._workSubtraction(curStep);
        }

        if (curStep.name === 'Final') {
          retObject[curStep.name] = this._workFinal(curStep);
        }

        curStep = curStep.next;
      }

      return retObject;
    }
  }, {
    key: "_workOperatorSwitch",
    value: function _workOperatorSwitch(curStep) {
      var data = curStep.data;
      var addition = new AdditionBaseNSignedToObject(data.addition);
      var additionObject = addition.getResult();
      return {
        other: additionObject
      };
    }
  }, {
    key: "_workGetSign",
    value: function _workGetSign(curStep) {
      var data = curStep.data;
      var latexGetSign;

      if (data.compareValue >= 0) {
        // n1 >= n2
        latexGetSign = "$N_{1} \\geq N_{2} \\implies  S_{F} = S_{1} \\land S_{2} = ".concat(data.signN1 ? 1 : 0, " \\land ").concat(data.signN2 ? 1 : 0, " = ").concat(data.isNegative ? 1 : 0, "$");
      } else if (data.compareValue < 0) {
        // n1 < n2
        latexGetSign = "$N_{1} < N_{2} \\implies  S_{F} = \\neg (S_{1} \\land S_{2}) = \\neg(".concat(data.signN1 ? 1 : 0, " \\land ").concat(data.signN2 ? 1 : 0, ") = ").concat(data.isNegative ? 1 : 0, "$");
      }

      return {
        latex: latexGetSign
      };
    }
  }, {
    key: "_workSubtraction",
    value: function _workSubtraction(curStep) {
      var data = curStep.data;
      return {
        latex: this._getLatexSubtraction(data),
        html: this._getHTMLSubtraction(data)
      };
    }
  }, {
    key: "_getLatexSubtraction",
    value: function _getLatexSubtraction(data) {
      var _firstline, _secondline, _thirdline;

      var width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;
      var arrayCs = Array(width).fill('c').join('');

      var firstline = _toConsumableArray(data.op1Arr).map(function (e) {
        return e.toString();
      });

      (_firstline = firstline).unshift.apply(_firstline, _toConsumableArray(Array(width - firstline.length).fill('')));

      firstline = firstline.join(' & ');

      var secondline = _toConsumableArray(data.op2Arr).map(function (e) {
        return e.toString();
      });

      (_secondline = secondline).unshift.apply(_secondline, _toConsumableArray(Array(width - secondline.length - 1).fill('')));

      secondline.unshift('-');
      secondline = secondline.join(' & ');

      var thirdline = _toConsumableArray(data.carryArr).map(function (e) {
        return e === 0 ? '' : e.toString();
      });

      (_thirdline = thirdline).unshift.apply(_thirdline, _toConsumableArray(Array(width - thirdline.length).fill('')));

      thirdline = thirdline.join(' & ');

      var fourthline = _toConsumableArray(data.resultArr).map(function (e) {
        return e.toString();
      });

      fourthline.unshift('=');
      fourthline = fourthline.join(' & ');
      var latex = ['\\begin{align*}', "\t\\begin{array}{".concat(arrayCs, "}"), "\t\t ".concat(firstline, " \\\\"), "\t\t ".concat(secondline, " \\\\ "), "\t\t ".concat(thirdline, " \\\\ \\hline"), "\t\t ".concat(fourthline, " \\\\"), '\t\\end{array}\\\\', '\\end{align*}'].join('\n');
      return latex;
    }
  }, {
    key: "_getHTMLSubtraction",
    value: function _getHTMLSubtraction(data) {
      var _firstline2, _secondline2, _thirdline2;

      var width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;

      var firstline = _toConsumableArray(data.op1Arr).map(function (e) {
        return e.toString();
      });

      (_firstline2 = firstline).unshift.apply(_firstline2, _toConsumableArray(Array(width - firstline.length).fill('')));

      firstline = firstline.map(function (e) {
        return "<td>".concat(e, "</td>");
      });
      firstline = firstline.join(' ');

      var secondline = _toConsumableArray(data.op2Arr).map(function (e) {
        return e.toString();
      });

      (_secondline2 = secondline).unshift.apply(_secondline2, _toConsumableArray(Array(width - secondline.length - 1).fill('')));

      secondline.unshift('-');
      secondline = secondline.map(function (e) {
        return "<td>".concat(e, "</td>");
      });
      secondline = secondline.join(' ');

      var thirdline = _toConsumableArray(data.carryArr).map(function (e) {
        return e === 0 ? '' : e.toString();
      });

      (_thirdline2 = thirdline).unshift.apply(_thirdline2, _toConsumableArray(Array(width - thirdline.length).fill('')));

      thirdline = thirdline.map(function (e) {
        return "<td>".concat(e, "</td>");
      });
      thirdline = thirdline.join(' ');

      var fourthline = _toConsumableArray(data.resultArr).map(function (e) {
        return e.toString();
      });

      fourthline.unshift('=');
      fourthline = fourthline.map(function (e) {
        return "<td>".concat(e, "</td>");
      });
      fourthline = fourthline.join(' ');
      var html = ['<table>', "\t<tr> ".concat(firstline, " </tr>"), "\t<tr> ".concat(secondline, " </tr>"), "\t<tr> ".concat(thirdline, " </tr>"), "\t<tr> ".concat(fourthline, " </tr>"), '</table>'].join('\n');
      return html;
    }
  }, {
    key: "_workFinal",
    value: function _workFinal(curStep) {
      var data = curStep.data;
      return {
        latex: "$".concat(data.result.stringRepresentation, "$")
      };
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return SubtractionBaseNSignedToObject;
}();
var SubtractionBaseNSignedToLatex = /*#__PURE__*/function () {
  function SubtractionBaseNSignedToLatex(subtractInfo) {
    _classCallCheck(this, SubtractionBaseNSignedToLatex);

    this.result = this._generateLatex(subtractInfo);
  }

  _createClass(SubtractionBaseNSignedToLatex, [{
    key: "_generateLatex",
    value: function _generateLatex(subtractInfo) {
      var latex = [];

      if (subtractInfo.OperatorSwitch !== undefined && subtractInfo.OperatorSwitch != null) {
        var addition = new AdditionBaseNSignedToLatex(subtractInfo.OperatorSwitch.other);
        var additionLatex = addition.getResult();
        latex.push('Convert subtraction to an Addition by fliping the sign of the second operand:');
        latex.push(additionLatex);
        return latex.join('\n');
      }

      latex.push('\\begin{enumerate}');

      if (subtractInfo.GetSign !== undefined && subtractInfo.GetSign != null) {
        latex.push("\\item Get Final Sign: \\ ".concat(subtractInfo.GetSign.latex));
      }

      if (subtractInfo.Subtraction !== undefined && subtractInfo.Subtraction != null) {
        latex.push('\\item Subtract the smaller absolute value from the bigger absolute value: \\\\');
        latex.push(subtractInfo.Subtraction.latex);
      }

      if (subtractInfo.Final !== undefined && subtractInfo.Final != null) {
        latex.push("\\item[] Final Result: \\ ".concat(subtractInfo.Final.latex));
      }

      latex.push('\\end{enumerate}');
      return latex.join('\n');
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return SubtractionBaseNSignedToLatex;
}();

var AdditionBaseNSignedToObject = /*#__PURE__*/function () {
  function AdditionBaseNSignedToObject(watcher) {
    _classCallCheck(this, AdditionBaseNSignedToObject);

    this.watcher = watcher;
    this.result = this._generateObject();
  }

  _createClass(AdditionBaseNSignedToObject, [{
    key: "_generateObject",
    value: function _generateObject() {
      var curStep = this.watcher.start;
      var retObject = {};

      while (curStep != null) {
        if (curStep.name === 'OperatorSwitch') {
          retObject[curStep.name] = this._workOperatorSwitch(curStep);
        }

        if (curStep.name === 'GetSign') {
          retObject[curStep.name] = this._workGetSign(curStep);
        }

        if (curStep.name === 'Addition') {
          retObject[curStep.name] = this._workAddition(curStep);
        }

        if (curStep.name === 'Final') {
          retObject[curStep.name] = this._workFinal(curStep);
        }

        curStep = curStep.next;
      }

      return retObject;
    }
  }, {
    key: "_workOperatorSwitch",
    value: function _workOperatorSwitch(curStep) {
      var data = curStep.data;
      var subtraction = new SubtractionBaseNSignedToObject(data.subtraction);
      var subtractionObject = subtraction.getResult();
      return {
        other: subtractionObject
      };
    }
  }, {
    key: "_workGetSign",
    value: function _workGetSign(curStep) {
      var data = curStep.data;
      return {
        latex: "$".concat(data.signN1 ? 1 : 0, " \\land ").concat(data.signN2 ? 1 : 0, " = ").concat(data.isNegative ? 1 : 0, "$")
      };
    }
  }, {
    key: "_workAddition",
    value: function _workAddition(curStep) {
      var data = curStep.data;
      return {
        latex: this._getLatexAddition(data),
        html: this._getHTMLAddition(data)
      };
    }
  }, {
    key: "_getLatexAddition",
    value: function _getLatexAddition(data) {
      var _firstline, _secondline, _thirdline;

      var width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;
      var arrayCs = Array(width).fill('c').join('');

      var firstline = _toConsumableArray(data.op1Arr).map(function (e) {
        return e.toString();
      });

      (_firstline = firstline).unshift.apply(_firstline, _toConsumableArray(Array(width - firstline.length).fill('')));

      firstline = firstline.join(' & ');

      var secondline = _toConsumableArray(data.op2Arr).map(function (e) {
        return e.toString();
      });

      (_secondline = secondline).unshift.apply(_secondline, _toConsumableArray(Array(width - secondline.length - 1).fill('')));

      secondline.unshift('+');
      secondline = secondline.join(' & ');

      var thirdline = _toConsumableArray(data.carryArr).map(function (e) {
        return e === 0 ? '' : e.toString();
      });

      (_thirdline = thirdline).unshift.apply(_thirdline, _toConsumableArray(Array(width - thirdline.length).fill('')));

      thirdline = thirdline.join(' & ');

      var fourthline = _toConsumableArray(data.resultArr).map(function (e) {
        return e.toString();
      });

      fourthline.unshift('=');
      fourthline = fourthline.join(' & ');
      var latex = ['\\begin{align*}', "\t\\begin{array}{".concat(arrayCs, "}"), "\t\t ".concat(firstline, " \\\\"), "\t\t ".concat(secondline, " \\\\ "), "\t\t ".concat(thirdline, " \\\\ \\hline"), "\t\t ".concat(fourthline, " \\\\"), '\t\\end{array}\\\\', '\\end{align*}'].join('\n');
      return latex;
    }
  }, {
    key: "_getHTMLAddition",
    value: function _getHTMLAddition(data) {
      var _firstline2, _secondline2, _thirdline2;

      var width = Math.max(data.op1Arr.length, data.op2Arr.length, data.resultArr.length) + 1;

      var firstline = _toConsumableArray(data.op1Arr).map(function (e) {
        return e.toString();
      });

      (_firstline2 = firstline).unshift.apply(_firstline2, _toConsumableArray(Array(width - firstline.length).fill('')));

      firstline = firstline.map(function (e) {
        return "<td>".concat(e, "</td>");
      });
      firstline = firstline.join(' ');

      var secondline = _toConsumableArray(data.op2Arr).map(function (e) {
        return e.toString();
      });

      (_secondline2 = secondline).unshift.apply(_secondline2, _toConsumableArray(Array(width - secondline.length - 1).fill('')));

      secondline.unshift('+');
      secondline = secondline.map(function (e) {
        return "<td>".concat(e, "</td>");
      });
      secondline = secondline.join(' ');

      var thirdline = _toConsumableArray(data.carryArr).map(function (e) {
        return e === 0 ? '' : e.toString();
      });

      (_thirdline2 = thirdline).unshift.apply(_thirdline2, _toConsumableArray(Array(width - thirdline.length).fill('')));

      thirdline = thirdline.map(function (e) {
        return "<td>".concat(e, "</td>");
      });
      thirdline = thirdline.join(' ');

      var fourthline = _toConsumableArray(data.resultArr).map(function (e) {
        return e.toString();
      });

      fourthline.unshift('=');
      fourthline = fourthline.map(function (e) {
        return "<td>".concat(e, "</td>");
      });
      fourthline = fourthline.join(' ');
      var html = ['<table>', "\t<tr> ".concat(firstline, " </tr>"), "\t<tr> ".concat(secondline, " </tr>"), "\t<tr> ".concat(thirdline, " </tr>"), "\t<tr> ".concat(fourthline, " </tr>"), '</table>'].join('\n');
      return html;
    }
  }, {
    key: "_workFinal",
    value: function _workFinal(curStep) {
      var data = curStep.data;
      return {
        latex: "$".concat(data.result.stringRepresentation, "$")
      };
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return AdditionBaseNSignedToObject;
}();
var AdditionBaseNSignedToLatex = /*#__PURE__*/function () {
  function AdditionBaseNSignedToLatex(additionInfo) {
    _classCallCheck(this, AdditionBaseNSignedToLatex);

    this.result = this._generateLatex(additionInfo);
  }

  _createClass(AdditionBaseNSignedToLatex, [{
    key: "_generateLatex",
    value: function _generateLatex(additionInfo) {
      var latex = [];

      if (additionInfo.OperatorSwitch !== undefined && additionInfo.OperatorSwitch != null) {
        var subtraction = new SubtractionBaseNSignedToLatex(additionInfo.OperatorSwitch.other);
        var subtractLatex = subtraction.getResult();
        latex.push('\t Convert Addition to Subtraction:');
        latex.push(subtractLatex);
        return latex.join('\n');
      }

      latex.push('\\begin{enumerate}');

      if (additionInfo.GetSign !== undefined && additionInfo.GetSign != null) {
        latex.push("\\item Get Final Sign: \\ ".concat(additionInfo.GetSign.latex));
      }

      if (additionInfo.Addition !== undefined && additionInfo.Addition != null) {
        latex.push('\\item Add absolute values: \\\\');
        latex.push(additionInfo.Addition.latex);
      }

      if (additionInfo.Final !== undefined && additionInfo.Final != null) {
        latex.push("\\item[] Final Result: \\ ".concat(additionInfo.Final.latex));
      }

      latex.push('\\end{enumerate}');
      return latex.join('\n');
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return AdditionBaseNSignedToLatex;
}();

var AdditionIEEEToObject = /*#__PURE__*/function () {
  function AdditionIEEEToObject(watcher) {
    _classCallCheck(this, AdditionIEEEToObject);

    this.watcher = watcher;
    this.result = this._generateObject();
  }

  _createClass(AdditionIEEEToObject, [{
    key: "_generateObject",
    value: function _generateObject() {
      var curStep = this.watcher.start;
      var retObject = {};

      while (curStep != null) {
        if (curStep.name === 'Edgecases') {
          retObject.Edgecases = this._workEdgecases(curStep);
        }

        if (curStep.name === 'CalculateDeltaE') {
          retObject.CalculateDeltaE = this._workCalculateDeltaE(curStep);
        }

        if (curStep.name === 'AdjustMantissa') {
          retObject.AdjustMantissa = this._workAdjustMantissa(curStep);
        }

        if (curStep.name === 'ResultZero') {
          retObject.Result_Zero = this._workResult_Zero(curStep);
        }

        if (curStep.name === 'AddMantissa') {
          retObject.AddMantissa = this._workAddMantissa(curStep);
        }

        if (curStep.name === 'Normalize') {
          retObject.Normalize = this._workNormalize(curStep);
        }

        if (curStep.name === 'Result') {
          retObject.Result = this._workResult(curStep);
        }

        curStep = curStep.next;
      }

      return retObject;
    }
  }, {
    key: "_workEdgecases",
    value: function _workEdgecases(curStep) {
      var possibleCase = curStep.next;

      if (possibleCase == null) {
        return null;
      }

      if (possibleCase.name === 'Edgecase_NaN') {
        return "Edgecase NaN: $R = ".concat(possibleCase.data.result.bitString.replace(/ /g, '\\ '), "$");
      }

      if (possibleCase.name === 'Edgecase_Inf') {
        return "Edgecase Infinity: $R = ".concat(possibleCase.data.result.bitString.replace(/ /g, '\\ '), "$");
      }

      return null;
    }
  }, {
    key: "_workCalculateDeltaE",
    value: function _workCalculateDeltaE(curStep) {
      var data = curStep.data;
      return "$\\Delta E = ".concat(data.expN2Bits.join(''), " - ").concat(data.expN1Bits.join(''), " = ").concat(data.deltaE, "$");
    }
  }, {
    key: "_workAdjustMantissa",
    value: function _workAdjustMantissa(curStep) {
      var data = curStep.data;
      return ['\\begin{align*}', "\t&m_{1}' = ".concat(data.op1.stringRepresentation), "\t&m_{2}' = ".concat(data.op2.stringRepresentation), '\\end{align*}'].join('\n');
    }
  }, {
    key: "_workAddMantissa",
    value: function _workAddMantissa(curStep) {
      var data = curStep.data;
      return new AdditionBaseNComplementToLatex(data.addition).getResult();
    }
  }, {
    key: "_workResultZero",
    value: function _workResultZero(curStep) {
      var data = curStep.data;
      return "Mantissa is zero: $R = ".concat(data.result.bitString.replace(/ /g, '\\ '), "$");
    }
  }, {
    key: "_workNormalize",
    value: function _workNormalize(curStep) {
      var data = curStep.data;
      return ['\\begin{align*}', "\t&\\rightarrow m_{R} = 1.".concat(data.normalizedMantissa.join(''), "\\cdot 2^{").concat(data.shift, "}"), "\t&\\rightarrow E_{R} = ".concat(data.n1ExpBits.join('')).concat(data.shift >= 0 ? '+' : '-').concat(Math.abs(data.shift), " = ").concat(data.finalExpBits.join('')), '\\end{align*}'].join('\n');
    }
  }, {
    key: "_workResult",
    value: function _workResult(curStep) {
      var data = curStep.data;
      return "$R = ".concat(data.result.bitString.replace(/ /g, '\\ '), "$");
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return AdditionIEEEToObject;
}();
var AdditionIEEEToLatex = /*#__PURE__*/function () {
  function AdditionIEEEToLatex(watcher) {
    _classCallCheck(this, AdditionIEEEToLatex);

    this.watcher = watcher;
    this.result = this._generateLatex();
  }

  _createClass(AdditionIEEEToLatex, [{
    key: "_generateLatex",
    value: function _generateLatex() {
      var additionInfo = new AdditionIEEEToObject(this.watcher).getResult();

      if (additionInfo.Edgecases !== undefined && additionInfo.Edgecases != null) {
        return additionInfo.Edgecases;
      }

      var latex = ['\\begin{enumerate}'];

      if (additionInfo.CalculateDeltaE !== undefined && additionInfo.CalculateDeltaE != null) {
        latex.push('\t\\item  Calculate $\\Delta E$:');
        latex.push("\t".concat(additionInfo.CalculateDeltaE));
      }

      if (additionInfo.AdjustMantissa !== undefined && additionInfo.AdjustMantissa != null) {
        latex.push('\t\\item  Adjust Mantissa:');
        latex.push("\t".concat(additionInfo.AdjustMantissa));
      }

      if (additionInfo.AddMantissa !== undefined && additionInfo.AddMantissa != null) {
        latex.push('\t\\item  Add Adjusted Mantissa:');
        latex.push("\t".concat(additionInfo.AddMantissa));
      }

      if (additionInfo.ResultZero !== undefined && additionInfo.ResultZero != null) {
        latex.push('\t\\item  Mantissa is zero:');
        latex.push("\t".concat(additionInfo.ResultZero));
      }

      if (additionInfo.Normalize !== undefined && additionInfo.Normalize != null) {
        latex.push('\t\\item  Normalize:');
        latex.push("\t".concat(additionInfo.Normalize));
      }

      if (additionInfo.Result !== undefined && additionInfo.Result != null) {
        latex.push('\t\\item  Result:');
        latex.push("\t".concat(additionInfo.Result));
      }

      latex.push('\\end{enumerate}');
      return latex.join('\n');
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return AdditionIEEEToLatex;
}();

var NumberPolyadic = /*#__PURE__*/function () {
  function NumberPolyadic(power, representation) {
    _classCallCheck(this, NumberPolyadic);

    if (power <= 1) {
      throw new TypeError('Polyadic Number: Invalid power given, has to be greater 1.');
    }

    if (power === 16) {
      this.power = 0x10;
    } else {
      this.power = power;
    }

    this.comma = representation.length;

    if (!this._checkArray(representation)) {
      throw new TypeError('Polyadic Number: Invalid representation given.');
    }

    this.arr = _toConsumableArray(representation);

    this._actualizeValues();

    this.isNegative = false; // for subtraction

    this.watcher = new Algorithm();
  }

  _createClass(NumberPolyadic, [{
    key: "_actualizeValues",
    value: function _actualizeValues() {
      this._checkArray(this.arr);

      this.value = this._getValue();
      this.bitString = this.arr.join('');
      this.valueString = this._constructValString();
    }
  }, {
    key: "_checkArray",
    value: function _checkArray(arr) {
      this.comma = arr.length;
      var commas = 0;

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] < 0 || arr[i] >= this.power) {
          return false;
        }

        if (arr[i] === ',' || arr[i] === '.') {
          this.comma = i;
          commas += 1;

          if (commas > 1) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: "_getValue",
    value: function _getValue() {
      var firstNum = 0;

      if (this.arr[0] === '-') {
        this.sign = '-';
        firstNum = 1;
      } else if (this.arr[0] === '+') {
        this.sign = '+';
        firstNum = 1;
      } else {
        this.sign = '+';
      }

      if (this.power === 10) {
        return parseFloat(this.arr.join(''));
      }

      var val = 0;
      var count = 0;

      for (var i = this.comma - 1; i >= firstNum; i -= 1) {
        val += parseInt(this.arr[i], this.power) * Math.pow(this.power, count);
        count += 1;
      }

      count = 1;

      for (var _i = this.comma + 1; _i < this.arr.length; _i += 1) {
        val += parseInt(this.arr[_i], this.power) * Math.pow(1 / this.power, count);
        count += 1;
      }

      if (this.sign === '-') {
        return -val;
      }

      return val;
    }
  }, {
    key: "_constructValString",
    value: function _constructValString() {
      return "".concat(this.value);
    } // arithmetical methods for direct conversion and polyadic arithmetic

    /** !!Internal method!!
     * Add a single digit to the actual number.
     * @param {*} digit : Int, single digit number.
     * @param {*} exp : Int, optional position in the array.
     */

  }, {
    key: "_additionOneDigit",
    value: function _additionOneDigit(digit) {
      var exp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // pepare working arrays
      var splitted = this.arr.join('').split('.');
      var numBeforeComma = [];
      var numAfterComma = [];

      if (Array.isArray(splitted) && splitted.length === 2) {
        numBeforeComma = splitted[0].split('');
        numAfterComma = splitted[1].split('');
      } else {
        numBeforeComma = splitted[0].split('');
      }

      var overflow = 0;
      var act = digit;
      var breakAfterComma = false; // before comma

      if (exp < 0) {
        for (var i = 0; i < Math.abs(exp) + 1 - numAfterComma.length; i += 1) {
          // left padding
          numAfterComma.push('0');
        }

        for (var _i2 = Math.abs(exp) - 1; _i2 >= 0; _i2 -= 1) {
          var res = 0;

          if (this.power === 16) {
            res = parseInt(numAfterComma[_i2], 16) + parseInt(act, 16);
          } else {
            res = parseInt(numAfterComma[_i2], 10) + parseInt(act, 10);
          }

          if (res >= this.power) {
            overflow = res - this.power;
            numAfterComma[_i2] = overflow.toString(this.power).toUpperCase();
            act = 1;
            this.watcher = this.watcher.step('constructResult').saveVariable("overflowAfterComma".concat(_i2), 1);
          } else {
            numAfterComma[_i2] = res.toString(this.power).toUpperCase();
            breakAfterComma = true; // this.watcher = this.watcher.step('constructResult')
            //   .saveVariable(`overflowAfterComma${i}`, 0);

            break;
          }
        }
      } // after comma


      if (!breakAfterComma || exp >= 0) {
        var start = numBeforeComma.length - 1;

        if (exp >= 0) {
          for (var _i3 = 0; _i3 < exp + 1 - numBeforeComma.length; _i3 += 1) {
            // left padding
            numBeforeComma.unshift('0');
          }

          start = numBeforeComma.length - 1 - exp;
        }

        for (var _i4 = start; _i4 >= 0; _i4 -= 1) {
          var _res = 0;

          if (this.power === 16) {
            _res = parseInt(numBeforeComma[_i4], 16) + parseInt(act, 16);
          } else {
            _res = parseInt(numBeforeComma[_i4], 10) + parseInt(act, 10);
          }

          if (_res >= this.power) {
            overflow = _res - this.power;
            numBeforeComma[_i4] = overflow.toString(this.power).toUpperCase();
            act = 1;
            this.watcher = this.watcher.step('constructResult').saveVariable("overflowBeforeComma".concat(_i4), 1);

            if (_i4 === 0) {
              // overflow at highest position
              numBeforeComma.unshift('1');
            }
          } else {
            numBeforeComma[_i4] = _res.toString(this.power).toUpperCase(); // this.watcher = this.watcher.step('constructResult')
            //   .saveVariable(`overflowBeforeComma${i}`, 1);

            break;
          }
        }
      }

      var resultArray = [];
      numBeforeComma.map(function (a) {
        return resultArray.push(a);
      });

      if (Array.isArray(splitted) && splitted.length === 2) {
        resultArray.push('.');
        numAfterComma.map(function (a) {
          return resultArray.push(a);
        });
      }

      this.arr = resultArray;
    }
    /** !!Internal method!!
     * Subtract a single digit to the actual number.
     * @param {*} digit : Int, single digit number.
     * @param {*} exp : Int, optional position in the array.
     */

  }, {
    key: "_subtractOneDigit",
    value: function _subtractOneDigit(digit) {
      var exp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // pepare working arrays
      var splitted = this.arr.join('').split('.');
      var numBeforeComma = [];
      var numAfterComma = [];

      if (Array.isArray(splitted) && splitted.length === 2) {
        // have comma?
        numBeforeComma = splitted[0].split('');
        numAfterComma = splitted[1].split('');
      } else {
        numBeforeComma = splitted[0].split('');
      }

      var underflow = 0;
      var act = digit; // Check if result must be negative

      if (exp >= 0 && numBeforeComma.length < exp + 1) {
        // case general higher exponent at subtrahend
        this.isNegative = true;

        for (var i = 0; i < exp + 1 - numBeforeComma.length; i += 1) {
          // left padding
          numBeforeComma.unshift('0');
        }
      } else if ( // case subtrahend and minuend has the same exponent
      // but subtrahend has the higher digit at highest exponent
      exp >= 0 && numBeforeComma.length === exp + 1 && parseInt(numBeforeComma[exp], this.power) - parseInt(act, this.power) < 0) {
        this.isNegative = true;
      } else if ( // case no number before comma
      // exponenten subtrahend after comma is greater the exponent of the minuend
      exp < 0 && numBeforeComma.length === 0 && numAfterComma.length + exp < 0) {
        this.isNegative = true;
      } // calc result for a single digit


      var breakAfterComma = false;
      this.watcher = this.watcher.step('constructResult').saveVariable('digit', digit).saveVariable('exp', exp); // before comma

      if (exp < 0) {
        for (var _i5 = 0; _i5 < Math.abs(exp) - numAfterComma.length; _i5 += 1) {
          // left padding
          numAfterComma.push('0');
        }

        for (var _i6 = Math.abs(exp) - 1; _i6 >= 0; _i6 -= 1) {
          var res = 0;

          if (this.power === 16) {
            res = parseInt(numAfterComma[_i6], 16) - parseInt(act, 16);
          } else {
            res = parseInt(numAfterComma[_i6], 10) - parseInt(act, 10);
          }

          if (res < 0) {
            underflow = Math.abs(res);
            numAfterComma[_i6] = (this.power - underflow).toString(this.power).toUpperCase();
            act = 1;

            if (numBeforeComma.length === 0 && (_i6 === 0 || _i6 === 1 && numAfterComma[0] === '0')) {
              // case underflow makes result negative
              this.isNegative = true;
            }

            this.watcher = this.watcher.step('constructResult').saveVariable("underflowAfterComma".concat(_i6), 1);
          } else {
            numAfterComma[_i6] = res.toString(this.power).toUpperCase();
            breakAfterComma = true;
            this.watcher = this.watcher.step('constructResult').saveVariable("underflowAfterComma".concat(_i6), 0);
            break;
          }
        }
      } // after comma


      if (!breakAfterComma || exp >= 0) {
        var start = numBeforeComma.length - 1;

        if (exp >= 0) {
          for (var _i7 = 0; _i7 < exp + 1 - numBeforeComma.length; _i7 += 1) {
            // left padding
            numBeforeComma.unshift('0');
          }

          start = numBeforeComma.length - 1 - exp;
        }

        for (var _i8 = start; _i8 >= 0; _i8 -= 1) {
          var _res2 = 0;

          if (this.power === 16) {
            _res2 = parseInt(numBeforeComma[_i8], 16) - parseInt(act, 16);
          } else {
            _res2 = parseInt(numBeforeComma[_i8], 10) - parseInt(act, 10);
          }

          if (_res2 < 0) {
            underflow = Math.abs(_res2);
            numBeforeComma[_i8] = (this.power - underflow).toString(this.power).toUpperCase();
            act = 1;

            if (_i8 === 0 || _i8 === 1 && numBeforeComma[0] === '0') {
              // case underflow makes result negative
              this.isNegative = true;
            }

            this.watcher = this.watcher.step('constructResult').saveVariable("underflowBeforeComma".concat(_i8), 1);
          } else {
            numBeforeComma[_i8] = _res2.toString(this.power).toUpperCase();
            this.watcher = this.watcher.step('constructResult').saveVariable("underflowBeforeComma".concat(_i8), 0);
            break;
          }
        }
      }

      var resultArray = [];
      numBeforeComma.map(function (a) {
        return resultArray.push(a);
      });

      if (Array.isArray(splitted) && splitted.length === 2) {
        resultArray.push('.');
        numAfterComma.map(function (a) {
          return resultArray.push(a);
        });
      }

      this.arr = resultArray;
    }
    /**
     * Add a float to the actual polyadic
     * @param {*} input : String, Float to add
     */

  }, {
    key: "_additionFloat",
    value: function _additionFloat(input) {
      this.watcher = this.watcher.step('Input').saveVariable('operator', '+').saveVariable('bitString1', this.bitString).saveVariable('bitString2', input);
      var val = input.split('.');

      if (Array.isArray(val) && val.length === 2) {
        var afterComma = val[1].split('');
        this.watcher = this.watcher.step('Input').saveVariable('afterComma', _toConsumableArray(afterComma));

        for (var i = afterComma.length - 1; i >= 0; i -= 1) {
          this.watcher = this.watcher.step('constructResult').saveVariable("digitAfterComma".concat(i), afterComma[i]).saveVariable("expAfterComma".concat(i), -i - 1);

          this._additionOneDigit(afterComma[i], -i - 1);
        }
      } // reverse, so index and exponent go the same way


      var beforeComma = val[0].split('').reverse();
      this.watcher = this.watcher.step('Input').saveVariable('beforeComma', _toConsumableArray(beforeComma).reverse());

      for (var _i9 = 0; _i9 < beforeComma.length; _i9 += 1) {
        this.watcher = this.watcher.step('constructResult').saveVariable("digitBeforeComma".concat(_i9), beforeComma[_i9]).saveVariable("expBeforComma".concat(_i9), -_i9 - 1);

        this._additionOneDigit(beforeComma[_i9], _i9);
      }

      this._actualizeValues();

      this.watcher = this.watcher.step('Result').saveVariable('array', _toConsumableArray(this.arr)).saveVariable('bitString', this.bitString).saveVariable('value', this.value).saveVariable('valueString', this.valueString).saveVariable('sign', this.sign).saveVariable('comma', this.comma);
    }
    /**
     * Subtract a float to the actual polydic
     * @param {*} input : String, Float to subtract
     */

  }, {
    key: "_subtractionFloat",
    value: function _subtractionFloat(input) {
      this.watcher = this.watcher.step('Input').saveVariable('operator', '-').saveVariable('bitString1', this.bitString).saveVariable('bitString2', input);
      var inputSplitted = input.toString().split('.');

      if (Array.isArray(inputSplitted) && inputSplitted.length === 2) {
        var afterComma = inputSplitted[1].split('');
        this.watcher = this.watcher.step('Input').saveVariable('afterComma', _toConsumableArray(afterComma));

        for (var i = afterComma.length - 1; i >= 0; i -= 1) {
          this._subtractOneDigit(afterComma[i], -i - 1);
        }
      }

      var beforeComma = inputSplitted[0].split('').reverse();
      this.watcher = this.watcher.step('Input').saveVariable('beforeComma', _toConsumableArray(beforeComma).reverse());
      var lenPadding = Math.max(beforeComma.length - this.comma, 0);
      this.arr = Array(lenPadding).fill('0').concat(this.arr);

      for (var _i10 = 0; _i10 < beforeComma.length; _i10 += 1) {
        this._subtractOneDigit(beforeComma[_i10], _i10);
      } // invert digit if the result is negative


      if (this.isNegative) {
        this.arr[this.arr.length - 1] = (parseInt(this.arr[this.arr.length - 1], this.power) - 1).toString(this.power).toUpperCase();

        for (var _i11 = 0; _i11 < this.arr.length; _i11 += 1) {
          var a = this.arr[_i11];

          if (a !== '-' && a !== '.' && a !== ',') {
            this.arr[_i11] = // invert digits
            (this.power - parseInt(a, this.power) - 1).toString(this.power).toUpperCase();
          }
        }

        this.arr.unshift('-');
        this.isNegative = false;
      }

      this._actualizeValues();

      this.watcher = this.watcher.step('Result').saveVariable('array', _toConsumableArray(this.arr)).saveVariable('bitString', this.bitString).saveVariable('value', this.value).saveVariable('valueString', this.valueString).saveVariable('sign', this.sign).saveVariable('comma', this.comma);
    }
  }]);

  return NumberPolyadic;
}();

var ConversionPolyadicNumbers = /*#__PURE__*/function () {
  function ConversionPolyadicNumbers(n, power) {
    _classCallCheck(this, ConversionPolyadicNumbers);

    this.modus = '';

    if (n.power === power) {
      console.log('ConversionPolyadicNumbers(Number, Int): Source and destination power is equal.');
    }

    if (n.power === 16 && power === 2) {
      // Applying Shortcut Methods
      this.watcher = new Algorithm();
      this.watcher = this.watcher.step('Modus').saveVariable('modus', 'ShortcutHexToBin');
      this.modus = 'ShortcutHexToBin';
      this.solution = this._shortcutHexToBin(n);
    } else if (n.power === 2 && power === 16) {
      this.watcher = new Algorithm();
      this.watcher = this.watcher.step('Modus').saveVariable('modus', 'ShortcutBinToHex');
      this.modus = 'ShortcutBinToHex';
      this.solution = this._shortcutBinToHex(n);
    } else {
      this.watcher = [new Algorithm(), new Algorithm()];

      if (power === 10) {
        this.watcher[0] = this.watcher[0].step('Modus').saveVariable('modus', 'PowerToTen');
        this.modus = 'PowerToTen';
        this.solution = this._convertPowerToTen(n);
      } else if (n.power === 10) {
        this.watcher[1] = this.watcher[1].step('Modus').saveVariable('modus', 'TenToPower');
        this.modus = 'TenToPower';
        this.solution = this._convertTenToPower(n, power);
      } else {
        this.watcher[0] = this.watcher[0].step('Modus').saveVariable('modus', 'PowerToPower');
        this.modus = 'PowerToPower';
        this.watcher[1] = this.watcher[1].step('Modus').saveVariable('modus', 'PowerToPower');

        var PowerToTen = this._convertPowerToTen(n);

        this.solution = this._convertTenToPower(PowerToTen, power);
      }
    }
  }

  _createClass(ConversionPolyadicNumbers, [{
    key: "_convertPowerToTen",
    value: function _convertPowerToTen(n) {
      this.watcher[0] = this.watcher[0].step('Input').saveVariable('number', n);
      var firstNum = 0; // Determine sign

      if (n.arr[0] === '-') {
        this.sign = '-';
        firstNum = 1;
      } else if (n.arr[0] === '+') {
        this.sign = '+';
        firstNum = 1;
      } else {
        this.sign = '+';
      }

      this.watcher[0] = this.watcher[0].step('ConstructNumber').saveVariable('sign', this.sign);
      var val = 0;
      var count = 0;

      for (var i = n.comma - 1; i >= firstNum; i -= 1) {
        var act = parseInt(n.arr[i], n.power) * Math.pow(n.power, count);
        val += act;
        this.watcher[0] = this.watcher[0].step('ConstructNumber').saveVariable("beforeComma".concat(count, "In"), n.arr[i]).saveVariable("beforeComma".concat(count, "Res"), act);
        count += 1;
      }

      this.watcher[0] = this.watcher[0].step('ConstructNumber').saveVariable('stepsBeforeComma', count);
      count = 1;

      for (var _i = n.comma + 1; _i < n.arr.length; _i += 1) {
        var _act = parseInt(n.arr[_i], n.power) * Math.pow(1 / n.power, count);

        val += _act;
        this.watcher[0] = this.watcher[0].step('ConstructNumber').saveVariable("afterComma".concat(count - 1, "In"), n.arr[_i]).saveVariable("afterComma".concat(count - 1, "Res"), _act);
        count += 1;
      }

      this.watcher[0] = this.watcher[0].step('ConstructNumber').saveVariable('stepsAfterComma', count - 1); // Make result

      if (this.sign === '-') {
        var _result = new NumberPolyadic(10, (-val).toString());

        this.watcher[0] = this.watcher[0].step('Result').saveVariable('resultValue', -val).saveVariable('resultNumber', _result);
        return _result;
      }

      var result = new NumberPolyadic(10, val.toString());
      this.watcher[0] = this.watcher[0].step('Result').saveVariable('resultValue', val).saveVariable('resultNumber', result);
      return result;
    }
  }, {
    key: "_convertTenToPower",
    value: function _convertTenToPower(n, power) {
      this.watcher[1] = this.watcher[1].step('Input').saveVariable('number', n).saveVariable('power', power);
      this.watcher[1] = this.watcher[1].step('ConstructNumber').saveVariable('sign', n.sign);
      var nbc = Math.floor(Math.abs(n.value)); // separate |nbc.xxx|
      // Division Algorithm before Comma

      var val = ''; // result string before comma

      var count = 0;
      var act = [nbc, 1]; // [divisor, remain]

      this.watcher[1] = this.watcher[1].step('ConstructNumber').saveVariable('beforeCommaVal', nbc);

      while (act[0] > 0) {
        act = this._divisionWithRemain(act[0], power, 10);
        this.watcher[1] = this.watcher[1].step('ConstructNumber').saveVariable("beforeComma".concat(count, "Div"), act[0]).saveVariable("beforeComma".concat(count, "Remain"), act[1]);
        count += 1;

        if (power === 16) {
          act[1] = act[1].toString(16).toUpperCase();
        }

        val = act[1] + val;
      }

      this.watcher[1] = this.watcher[1].step('ConstructNumber').saveVariable('stepsBeforeComma', count);

      if (count === 0) {
        val = '0';
      } // Multiplication Algorithm after Comma


      var val2 = ''; // result string after comma

      count = 0;

      if (n.value.toString().indexOf('.') >= 0) {
        var limitAfterComma = n.value.toString().split('.')[1].length; // crop value after comma by ignoring floating point arithmetic

        act = [(Math.abs(n.value) - nbc).toFixed(limitAfterComma), 1];
        var vals = [act[0]]; // list of calculated values for periodicity

        this.watcher[1] = this.watcher[1].step('ConstructNumber').saveVariable('isPeriodic', false).saveVariable('periodicStart', 0).saveVariable('periodicEnd', 9).saveVariable('afterCommaVal', act[0]);

        while (act[0] > 0 && count < 9) {
          act = this._multiplicationStepFrom10(act[0], power, limitAfterComma);
          this.watcher[1] = this.watcher[1].step('ConstructNumber').saveVariable("afterComma".concat(count, "Mul"), act[0]).saveVariable("afterComma".concat(count, "Remain"), act[1]);

          if (power === 16) {
            act[1] = act[1].toString(16).toUpperCase();
          }

          val2 += act[1];
          var indexVal = vals.indexOf(act[0].toString());

          if (indexVal >= 0) {
            // perodicity found, no further calculation
            this.watcher[1] = this.watcher[1].step('ConstructNumber').saveVariable('isPeriodic', true).saveVariable('periodicStart', indexVal).saveVariable('periodicEnd', count);
            count += 1;
            break;
          } else {
            vals.push(act[0].toString());
          }

          count += 1;
        }
      }

      this.watcher[1] = this.watcher[1].step('ConstructNumber').saveVariable('stepsAfterComma', count); // Make result

      var resVal;

      if (val2 !== '') {
        resVal = "".concat(val, ".").concat(val2);
      } else {
        resVal = val;
      }

      if (n.sign === '-') {
        resVal = "-".concat(resVal);
      }

      var result = new NumberPolyadic(power, resVal);
      this.watcher[1] = this.watcher[1].step('Result').saveVariable('resultValue', resVal).saveVariable('resultNumber', result);
      return result;
    } // Division with Remain to an arbitrary power

  }, {
    key: "_divisionWithRemain",
    value: function _divisionWithRemain(n1, n2, power) {
      var i = 0;
      var r = 0;

      while (parseInt((i * n2).toString(10), power) <= n1) {
        r = parseInt((n1 - parseInt((i * n2).toString(10), power)).toString(10), power);
        i += 1;
      }

      return [i - 1, r]; // Divisor, Remain
    } // Computes one multiplication step for multiplication algorithm

  }, {
    key: "_multiplicationStepFrom10",
    value: function _multiplicationStepFrom10(n1, n2, limit) {
      var res = parseFloat((parseFloat(n1) * parseFloat(n2)).toFixed(limit));

      if (res >= 1) {
        return [parseFloat((res - Math.floor(res)).toFixed(limit)), Math.floor(res)];
      } else {
        return [res, 0]; // Result, Remain
      }
    } // Shortcut methods

  }, {
    key: "_shortcutHexToBin",
    value: function _shortcutHexToBin(n) {
      var _this = this;

      this.watcher = this.watcher.step('Input').saveVariable('number', n); // Determine sign

      if (n.arr[0] === '-') {
        this.sign = '-';
      } else if (n.arr[0] === '+') {
        this.sign = '+';
      } else {
        this.sign = '+';
      }

      this.watcher = this.watcher.step('ConstructNumber').saveVariable('sign', this.sign); // shift out -/+ sign

      var hexArray = n.arr;

      if (n.arr[0] === '-' || n.arr[0] === '+') {
        hexArray.shift();
      } // conversion cycle


      var resultVal = '';
      var afterComma = false;
      var count = 0;
      hexArray.forEach(function (act) {
        if (act === '.') {
          // handle comma
          resultVal += '.';
          afterComma = true;
          _this.watcher = _this.watcher.step('ConstructNumber').saveVariable('stepsBeforeComma', count);
          count = 0;
        } else {
          // conversion
          var binary = parseInt(act, 16).toString(2).padStart(4, '0');
          resultVal += binary;

          if (afterComma) {
            // after comma
            _this.watcher = _this.watcher.step('ConstructNumber').saveVariable("afterComma".concat(count), binary);
          } else {
            // before comma
            _this.watcher = _this.watcher.step('ConstructNumber').saveVariable("beforeComma".concat(count), binary);
          }

          count += 1;
        }
      });

      if (afterComma) {
        this.watcher = this.watcher.step('ConstructNumber').saveVariable('stepsAfterComma', count);
      } else {
        this.watcher = this.watcher.step('ConstructNumber').saveVariable('stepsBeforeComma', count).saveVariable('stepsAfterComma', 0);
      } // make result


      if (this.sign === '-') {
        resultVal = "-".concat(resultVal);
      }

      var result = new NumberPolyadic(2, resultVal);
      this.watcher = this.watcher.step('Result').saveVariable('resultValue', resultVal).saveVariable('resultNumber', result);
      return result;
    }
  }, {
    key: "_shortcutBinToHex",
    value: function _shortcutBinToHex(n) {
      this.watcher = this.watcher.step('Input').saveVariable('number', n); // Determine sign

      if (n.arr[0] === '-') {
        this.sign = '-';
      } else if (n.arr[0] === '+') {
        this.sign = '+';
      } else {
        this.sign = '+';
      } // shift out -/+ sign


      var posComma = n.comma;
      var binArray = n.arr.join('');

      if (n.arr[0] === '-' || n.arr[0] === '+') {
        binArray = binArray.slice(1);
        posComma -= 1;
      } // Padding if before or after comma some zeros missing


      if (posComma < binArray.length - 1) {
        // case has comma
        var actLength = binArray.length;
        var lenBeforeComma = posComma;
        var lenAfterComma = actLength - posComma - 1;
        var padStart = '';

        if (lenBeforeComma % 4 !== 0) {
          for (var _i2 = 0; _i2 < 4 - lenBeforeComma % 4; _i2 += 1) {
            padStart += '0';
          }
        }

        var padEnd = '';

        if (lenAfterComma % 4 !== 0) {
          for (var _i3 = 0; _i3 < 4 - lenAfterComma % 4; _i3 += 1) {
            padEnd += '0';
          }
        }

        binArray = padStart + binArray + padEnd;
      } else {
        // has no comma -> only front padding
        var _padStart = '';

        if (posComma % 4 !== 0) {
          for (var _i4 = 0; _i4 < 4 - posComma % 4; _i4 += 1) {
            _padStart += '0';
          }
        }

        binArray = _padStart + binArray;
      } // conversion cycle


      var resultVal = '';
      var afterComma = false;
      var count = 0;
      var act = '';
      var i = 0;

      while (i <= binArray.length) {
        if (act.length < 4 && binArray[i] !== '.') {
          // set up 4 digits to conversion
          act += binArray[i];
          i += 1;
        } else if (act.length === 0 && binArray[i] === '.') {
          // handle comma
          resultVal += '.';
          afterComma = true;
          this.watcher = this.watcher.step('ConstructNumber').saveVariable('stepsBeforeComma', count);
          count = 0;
          i += 1;
        } else {
          // conversion step
          var hex = parseInt(act, 2).toString(16).toUpperCase();
          resultVal += hex;

          if (afterComma) {
            // after comma
            this.watcher = this.watcher.step('ConstructNumber').saveVariable("afterComma".concat(count, "Bin"), act).saveVariable("afterComma".concat(count, "Hex"), hex);
          } else {
            // before comma
            this.watcher = this.watcher.step('ConstructNumber').saveVariable("beforeComma".concat(count, "Bin"), act).saveVariable("beforeComma".concat(count, "Hex"), hex);
          }

          act = '';
          count += 1;
        }
      }

      if (afterComma) {
        this.watcher = this.watcher.step('ConstructNumber').saveVariable('stepsAfterComma', count);
      } else {
        this.watcher = this.watcher.step('ConstructNumber').saveVariable('stepsBeforeComma', count).saveVariable('stepsAfterComma', 0);
      } // make result


      if (this.sign === '-') {
        resultVal = "-".concat(resultVal);
      }

      var result = new NumberPolyadic(16, resultVal);
      this.watcher = this.watcher.step('Result').saveVariable('resultValue', resultVal).saveVariable('resultNumber', result);
      return result;
    }
  }]);

  return ConversionPolyadicNumbers;
}();

var AdditionPolyadic = /*#__PURE__*/function () {
  function AdditionPolyadic(n1, n2) {
    _classCallCheck(this, AdditionPolyadic);

    if (n1.power !== n2.power) {
      console.log("AdditionPolyadic(Number, Number): power of n1(".concat(n1.power, ")\n            and power of n2(").concat(n2.power, ") not compatible."));
      process.exit(1);
    }

    this.result = this._add(n1, n2);
    this.watcher = JSON.parse(JSON.stringify(this.result.watcher));
  }

  _createClass(AdditionPolyadic, [{
    key: "_add",
    value: function _add(n1, n2) {
      var result = '';

      if (n1.sign === '+' && n2.sign === '+') {
        // (+) + (+)
        result = new NumberPolyadic(n1.power, n1.bitString);

        result._additionFloat(n2.bitString);
      } else if (n1.sign === '+' && n2.sign === '-') {
        // (+) + (-) => (+) - (+)
        result = new NumberPolyadic(n1.power, n1.bitString);
        var bitString = n2.bitString.substring(1);

        result._subtractionFloat(bitString);
      } else if (n1.sign === '-' && n2.sign === '+') {
        // (-) + (-) => - ((+) + (+))
        var bitString1 = n2.bitString.substring(1);
        var bitString2 = n2.bitString.substring(1);
        bitString2.shift();
        var intermidiate = new NumberPolyadic(n1.power, bitString1);

        intermidiate._additionFloat(bitString2);

        var resultBitString = intermidiate.bitString;
        resultBitString = "-".concat(resultBitString);
        result = new NumberPolyadic(n1.power, resultBitString);
      }

      return result;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return AdditionPolyadic;
}();

var SubtractionPolyadic = /*#__PURE__*/function () {
  function SubtractionPolyadic(n1, n2) {
    _classCallCheck(this, SubtractionPolyadic);

    if (n1.power !== n2.power) {
      console.log("SubtractionPolyadic(Number, Number): power of n1(".concat(n1.power, ")\n            and power of n2(").concat(n2.power, ") not compatible."));
      process.exit(1);
    }

    this.result = this._sub(n1, n2);
    this.watcher = JSON.parse(JSON.stringify(this.result.watcher));
  }

  _createClass(SubtractionPolyadic, [{
    key: "_sub",
    value: function _sub(n1, n2) {
      var result;

      if (n1.sign === '+' && n2.sign === '+') {
        // (+) - (+)
        result = new NumberPolyadic(n1.power, n1.bitString);

        result._subtractionFloat(n2.bitString);
      } else if (n1.sign === '+' && n2.sign === '-') {
        // (+) - (-) => (+) + (+)
        result = new NumberPolyadic(n1.power, n1.bitString);
        var bitString = n2.bitString.substring(1);

        result._additionFloat(bitString);
      } else if (n1.sign === '-' && n2.sign === '+') {
        // (-) - (+) => - ((+) + (+))
        var bitString1 = n1.bitString.substring(1);
        var intermidiate = new NumberPolyadic(n1.power, bitString1);

        intermidiate._additionFloat(n2.bitString);

        var resultBitString = intermidiate.bitString;
        resultBitString = "-".concat(resultBitString);
        result = new NumberPolyadic(n1.power, resultBitString);
      }

      return result;
    }
  }, {
    key: "getResult",
    value: function getResult() {
      return this.result;
    }
  }]);

  return SubtractionPolyadic;
}();

/**
 * Class representing a single Literal (e.g. \
 * a, \
 * x0, ...) \
 * that is identified by a global id. \
 * 1.: That global ID is/should be shared by every Literal
 * pointing at the 'same real world' Literal. (e.g. every
 * 'a' and 'not a' have the ID 0 and every x2 has the ID 3) \
 * 2.: The global IDs start counting at 0 with the Literal
 * being on-top/to-the-bottom of the KVDiagram i.e. the one
 * that comes into existance upon mirroring the KVDiagram
 * (of size 1x1) to the right (-> width=2, height=1).
 */
var BooleanFunctionLiteral = /*#__PURE__*/function () {
  /**
     * Creates an Instance of some Literal.
     * @param {number} id ID that identifies this literal
     * @param {boolean} negated boolean specifiying if this
     * literal is negated (-> not a) or not (-> a).
     */
  function BooleanFunctionLiteral(id, negated) {
    _classCallCheck(this, BooleanFunctionLiteral);

    this._id = id;
    this._negated = negated;
  }

  _createClass(BooleanFunctionLiteral, [{
    key: "getId",
    value: function getId() {
      return this._id;
    }
  }, {
    key: "isNegated",
    value: function isNegated() {
      return this._negated;
    }
    /**
    * Recursively computes and returns string representation of this BooleanFunction
    * @param {[string]} literalNames Array of names put in place of literals
    * @param {string} op_orStr String used in place of logic OR operator. Defaults to '+'
    * @param {string} op_andStr String used in place of logic AND operator. Defaults to nothing
    * @param {string} negationHeader String inserted before negated literal
    * @param {string} negationFooter String inserted right after negated literal
    * @param {string} bracketOpen String used for open brackets. Defaults to normal open brackets
    * @param {string} bracketClosed String used for closed brackets. Defaults to normal closed brackets
    */

  }, {
    key: "computeString",
    value: function computeString(literalNames) {
      var negationHeader = arguments.length > 3 ? arguments[3] : undefined;
      var negationFooter = arguments.length > 4 ? arguments[4] : undefined;

      if (!this.isNegated()) {
        return literalNames[this.getId()];
      } else {
        return negationHeader + literalNames[this.getId()] + negationFooter;
      }
    }
    /**
       * @returns Returns a deep cloned copy of this Literal Instance.
       */

  }, {
    key: "clone",
    value: function clone() {
      return new BooleanFunctionLiteral(this._id, this._negated);
    }
    /**
       * @param {BooleanFunctionLiteral} other
       * @returns true if given literal is equivalent in meaning and
       * negation to this literal. false if not.
       */

  }, {
    key: "equals",
    value: function equals(other) {
      return this.getId() == other.getId() && this.isNegated() == other.isNegated();
    }
  }, {
    key: "amountLiterals",
    value: function amountLiterals() {
      return 1;
    }
  }]);

  return BooleanFunctionLiteral;
}();

var BooleanFunctionOperator_AND = '*';
var BooleanFunctionOperator_OR = '+';
/**
 * Class representing a boolean function (Schaltfunktion).
 * e.g. (terms[0]) -logicOperator- (terms[1]) -logicOperator- (terms[2]) -lo...
 */

var BooleanFunction$1 = /*#__PURE__*/function () {
  /**
     * @param {BooleanFunctionOperator_AND | BooleanFunctionOperator_OR} logicOperator logic
     *  operator concatenating the individual terms. \
     *  Either BooleanFunction.js > BooleanFunctionOperator_AND \
     *  or BooleanFunction.js > BooleanFunctionOperator_OR
     * @param {[BooleanFunction | BooleanFunctionLiteral]} terms
     */
  function BooleanFunction(logicOperator, terms) {
    _classCallCheck(this, BooleanFunction);

    if (terms) {
      this._terms = terms;
    } else {
      this._terms = [];
    }

    this._logicOperator = logicOperator;
  }
  /**
     * Adds given term to the end of this functions internal
     * list of terms.
     * @param {BooleanFunction | BooleanFunctionLiteral} term
     */


  _createClass(BooleanFunction, [{
    key: "addTerm",
    value: function addTerm(term) {
      this._terms.push(term);
    } // toString() {
    //     //tODO implement new literal way of doin things
    //     let str = "";
    //     for(let t = 0; t < this._terms.length; t++) {
    //         str += '(' + this._terms[t] + ')';
    //         str += t < this._terms.length ? this._logicOperator : '';
    //     }
    // }

    /**
       * @returns {[BooleanFunction | BooleanFunctionLiteral]}
       */

  }, {
    key: "getTerms",
    value: function getTerms() {
      return this._terms;
    }
  }, {
    key: "spliceTerms",
    value: function spliceTerms(a, b) {
      this._terms.splice(a, b);
    }
    /**
       * @returns Returns the logical operator which concatenates
       * the indiviual terms of this BooleanFuncion.
       */

  }, {
    key: "getLogicOperator",
    value: function getLogicOperator() {
      return this._logicOperator;
    }
    /**
       * @param {BooleanFunction} other
       * @param {Boolean} checkOrder Whether to also want the
       * subsequent terms to be in the same order. defaults to false.
       * @param {Boolean} checkOrderOfSubSubTerms Whether
       * all subterms of subterms (of subterms...) must also be in
       * the same order
       * @returns true if given BooleanFunction is equivalent to
       * this BooleanFunction. Also checks all subsequent terms
       * recursively.
       */

  }, {
    key: "equals",
    value: function equals(other) {
      var _this = this;

      var checkOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var checkOrderOfSubSubTerms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this.getLogicOperator() != other.getLogicOperator() || this.getTerms().length != other.getTerms().length) {
        return false;
      } // check if subterms are equivalent


      if (checkOrder) {
        for (var t = 0; t < this.getTerms().length; t++) {
          if (!this.getTerms()[t].equals(other.getTerms()[t], checkOrderOfSubSubTerms)) {
            return false;
          }
        }
      } else {
        var _loop = function _loop(_t) {
          var querry = _this.getTerms()[_t]; // check if an equivalent term can be found in -other-


          if (other.getTerms().filter(function (otherTerm) {
            return otherTerm.equals(querry);
          }).length == 0) {
            return {
              v: false
            };
          }
        };

        for (var _t = 0; _t < this.getTerms().length; _t++) {
          var _ret = _loop(_t);

          if (_typeof(_ret) === "object") return _ret.v;
        }
      }

      return true;
    }
    /**
    * Recursively computes and returns string representation of this BooleanFunction
    * @param {[string]} literalNames Array of names put in place of literals
    * @param {string} op_orStr String used in place of logic OR operator. Defaults to '+'
    * @param {string} op_andStr String used in place of logic AND operator. Defaults to nothing
    * @param {string} negationHeader String inserted before negated literal
    * @param {string} negationFooter String inserted right after negated literal
    * @param {string} bracketOpen String used for open brackets. Defaults to normal open brackets
    * @param {string} bracketClosed String used for closed brackets. Defaults to normal closed brackets
    */

  }, {
    key: "computeString",
    value: function computeString(literalNames) {
      var op_orStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+';
      var op_andStr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var negationHeader = arguments.length > 3 ? arguments[3] : undefined;
      var negationFooter = arguments.length > 4 ? arguments[4] : undefined;
      var bracketOpen = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '(';
      var bracketClosed = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : ')';
      var reverseOrder = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
      var str = '';
      var amountTerms = this.getTerms().length;
      var useBrackets = amountTerms > 1 && this.getLogicOperator() !== BooleanFunctionOperator_OR;

      for (var t = reverseOrder ? amountTerms - 1 : 0; reverseOrder ? t >= 0 : t < amountTerms; t += reverseOrder ? -1 : 1) {
        var subTerm = this.getTerms()[t];
        var subTermIsLiteral = subTerm instanceof BooleanFunctionLiteral; // open bracket

        if (useBrackets && !subTermIsLiteral) {
          str += bracketOpen;
        } // Literal / Subterm


        str += subTerm.computeString(literalNames, op_orStr, op_andStr, negationHeader, negationFooter, bracketOpen, bracketClosed, reverseOrder); // closed bracket

        if (useBrackets && !subTermIsLiteral) {
          str += bracketClosed;
        } // OP


        if (!reverseOrder) {
          if (t < amountTerms - 1
          /* && this.getLogicOperator() === BooleanFunctionOperator_OR */
          ) {
              str += this.getLogicOperator() == BooleanFunctionOperator_OR ? op_orStr : op_andStr;
            }
        } else if (t > 0
        /* && this.getLogicOperator() === BooleanFunctionOperator_OR */
        ) {
            str += this.getLogicOperator() == BooleanFunctionOperator_OR ? op_orStr : op_andStr;
          }
      }

      return str;
    }
    /**
    * Recursively computes and returns basic latex represenation of this BooleanFunction. \
    * Latex shortcut to BooleanFunction.computeString(..)
    * @param {[string]} literalNames Array of names put in place of literals
    */

  }, {
    key: "toLatex",
    value: function toLatex() {
      var literalNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['x0', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7'];
      var reverseOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return this.computeString(literalNames, '+', '', '\\bar{', '}', '\\left(', '\\right)', reverseOrder);
    }
    /**
       * @returns Returns deep cloned version of this BooleanFunction.
       * Recursively calls .clone() on all subsequent terms and literals.
       */

  }, {
    key: "clone",
    value: function clone() {
      var termsCloned = [];

      for (var i = 0; i < this._terms.length; i++) {
        termsCloned[i] = this._terms[i].clone();
      }

      return new BooleanFunction(this._logicOperator, termsCloned);
    }
    /**
       * @returns Recursively computes amount of BooleanFunctionLiterals
       * in this and all subsequent terms.
       */

  }, {
    key: "amountLiterals",
    value: function amountLiterals() {
      var sum = 0;

      this._terms.forEach(function (term) {
        return sum += term.amountLiterals();
      });

      return sum;
    }
  }]);

  return BooleanFunction;
}();

/**
 *  Class encapsulating a KVDiagram / Symmetriediagramm
 */
var KVDiagram = /*#__PURE__*/function () {
  /**
     * @param {number[][]} values values[y][x] (also [row, row, ...])\
     * 0 / 1 / 2=DontCare
     */
  function KVDiagram(values, amountLiterals) {
    _classCallCheck(this, KVDiagram);

    this._values = values;
    this._amountLiterals = amountLiterals;

    this._generateLiteralToKVMapping();
  }

  _createClass(KVDiagram, [{
    key: "getAmountLiterals",
    value: function getAmountLiterals() {
      return this._amountLiterals;
    }
  }, {
    key: "getValues",
    value: function getValues() {
      return this._values;
    }
    /**
       * computes kv-index of given y-x position (counting starts at 0). \
       * e.g. \
       * (0, 0) -> 0 \
       * (0, 1) -> 1 \
       * (1, 0) -> 2 \
       * (1, 1) -> 3 \
       * ...
       */

  }, {
    key: "computeKVIndex",
    value: function computeKVIndex(y, x) {
      // tODO overhaul this and the _generateLiteralToKVMapping function
      var index = 0;

      for (var i = 0; i < this._amountLiterals; i++) {
        if (this._literalToKVMapping[i][0] == 0 || this._literalToKVMapping[i][0] == 2) {
          // literal acts on columns
          for (var j = 0; j < this._literalToKVMapping[i][1].length; j++) {
            if (x == this._literalToKVMapping[i][1][j]) {
              index += Math.pow(2, i);
              break;
            }
          }
        } else {
          // literal acts on rows
          for (var j = 0; j < this._literalToKVMapping[i][1].length; j++) {
            if (y == this._literalToKVMapping[i][1][j]) {
              index += Math.pow(2, i);
              break;
            }
          }
        }
      }

      return index;
    }
    /**
       * NOTE: not tested yet
       * @param {KVDiagram} other
       */

  }, {
    key: "equals",
    value: function equals(other) {
      if (this._amountLiterals != other._amountLiterals) {
        return false;
      }

      if (this._values.length != other._values.length) {
        return false;
      } // loop through columns


      for (var y = 0; y < Math.max(this.getValues().length, other.getValues().length); y++) {
        if (this.getValues()[y] == undefined || other.getValues()[y] == undefined || this.getValues()[y].length != other.getValues()[y].length) {
          return false;
        } // loop through rows


        for (var x = 0; x < Math.max(this.getValues()[y].length, other.getValues()[y].length); x++) {
          if (this.getValues()[y][x] == undefined || other.getValues()[y][x] == undefined || this.getValues()[y][x] != other.getValues()[y][x]) {
            return false;
          }
        }
      }

      return true;
    }
    /**
       * generates mapping/array specifying which literals act (are 'positive') on which columns/rows, \
       *  e.g. \
       *  -array[INDEX_OF_LITERAL][0] --> this literal sits on the (0=top / 1=left
       *      / 2=bottom / 3=right) side of the SD; \
       *  \
       *  -array[INDEX_OF_LITERAL][1] --> list of columns/rows it's positive on (e.g.
       *      [1, 2]);
       */

  }, {
    key: "_generateLiteralToKVMapping",
    value: function _generateLiteralToKVMapping() {
      this._literalToKVMapping = [];
      var width = this._values[0].length;
      var height = this._values.length;

      for (var i = 0; i < this._amountLiterals; i++) {
        this._literalToKVMapping[i] = [];
        this._literalToKVMapping[i][0] = i % 4; // now get overlayed

        this._literalToKVMapping[i][1] = [];

        if (this._literalToKVMapping[i][0] == 0 || this._literalToKVMapping[i][0] == 2) {
          var gespiegelt = Math.round(Math.log2(width / 2)); // wie viel felder überdeckt die nicht gespiegelte Variante

          var wieVielteSpaltenCover = i / 2;
          var basisFelder = Math.pow(2, wieVielteSpaltenCover); // first column is 2er-potence

          var first = Math.pow(2, i / 2);

          for (var o = 0; o < basisFelder; o++) {
            this._literalToKVMapping[i][1].push(first + o);
          } // now compute rest of cells


          for (var j = 0; j < gespiegelt - wieVielteSpaltenCover; j++) {
            // durchlaufe das komplette array und spiegel alle werte nach hinten
            var oldLength = this._literalToKVMapping[i][1].length;

            for (var k = oldLength - 1; k >= 0; k--) {
              var partWidth = Math.pow(2, 2 + j + wieVielteSpaltenCover);
              var newIndex = partWidth - 1 - this._literalToKVMapping[i][1][k];

              this._literalToKVMapping[i][1].push(newIndex);
            }
          }
        } else {
          var gespiegelt = Math.round(Math.log2(height / 2)); // wie viel felder überdeckt die nicht gespiegelte Variante

          var wieVielteZeilenCover = (i - 1) / 2;
          var basisFelder = Math.pow(2, wieVielteZeilenCover); // first row is 2er-potence

          var first = Math.pow(2, (i - 1) / 2);

          for (var o = 0; o < basisFelder; o++) {
            this._literalToKVMapping[i][1].push(first + o);
          } // now compute rest of cells


          for (var j = 0; j < gespiegelt - wieVielteZeilenCover; j++) {
            // durchlaufe das komplette array und spiegel alle werte nach hinten
            var oldLength = this._literalToKVMapping[i][1].length;

            for (var k = oldLength - 1; k >= 0; k--) {
              var partHeight = Math.pow(2, 2 + j + wieVielteZeilenCover);
              var newIndex = partHeight - 1 - this._literalToKVMapping[i][1][k];

              this._literalToKVMapping[i][1].push(newIndex);
            }
          }
        }
      }
    }
  }]);

  return KVDiagram;
}();
function generateRandomKVDiagram(amountLiterals) {
  var notPracticallyEmptyOrFull = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var diagramWidth = Math.pow(2, Math.floor((amountLiterals + 1) / 2));
  var diagramHeight = Math.pow(2, Math.floor(amountLiterals / 2));

  while (true) {
    var amountOnes = 0;
    var amountZeros = 0;
    var values = [];

    for (var y = 0; y < diagramHeight; y++) {
      values[y] = [];

      for (var x = 0; x < diagramWidth; x++) {
        var r = Math.random();

        if (r < 1 / 3.0) {
          values[y][x] = '0';
          amountZeros++;
        } else if (r < 2 / 3.0) {
          values[y][x] = '1';
          amountOnes++;
        } else {
          values[y][x] = '-';
        }
      }
    }

    if (notPracticallyEmptyOrFull && (amountZeros === 0 || amountOnes === 0)) continue;
    return new KVDiagram(values, amountLiterals);
  }
}

/**
 * Computes Minterms from given KVDiagram. For every cell in the
 * KVDiagram that contains a '1', a Minterm is generated. Dont cares
 * are therefore not included.
 * @param {KVDiagram} kvdiagram
 * @returns {[BooleanFunction]} Array of BooleanFunctions, each
 * one representing a single minterm.
 */

function computeMinTermsFromKV(kvdiagram) {
  var minTerms = [];
  var kv = kvdiagram.getValues();

  for (var y = 0; y < kv.length; y++) {
    for (var x = 0; x < kv[0].length; x++) {
      if (kv[y][x] != 1) {
        continue;
      } // Converting the kvindex(base 10) to a binary number
      // shows us which literals are 'positive' (-> 1) on the cell
      // and which are negated (-> 0)


      var index = kvdiagram.computeKVIndex(y, x);
      var binary = index.toString(2); // fill in missing literals

      while (binary.length < kvdiagram.getAmountLiterals()) {
        binary = "0".concat(binary);
      } // convert string representation to object structure


      var minTerm = new BooleanFunction$1(BooleanFunctionOperator_AND, []);

      for (var c = 0; c < binary.length; c++) {
        minTerm.addTerm(new BooleanFunctionLiteral(c, binary.charAt(binary.length - 1 - c) == '0'));
      }

      minTerms.push(minTerm);
    }
  }

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

function computeMaxTermsFromKV(kvdiagram) {
  var maxTerms = [];
  var kv = kvdiagram.getValues();

  for (var y = 0; y < kv.length; y++) {
    for (var x = 0; x < kv[0].length; x++) {
      if (kv[y][x] != 0) {
        continue;
      } // Converting the kvindex(base 10) to a binary number
      // shows us which literals are 'positive' (-> 1) on the cell
      // and which are negated (-> 0)


      var index = kvdiagram.computeKVIndex(y, x);
      var binary = index.toString(2); // fill in missing literals

      while (binary.length < kvdiagram.getAmountLiterals()) {
        binary = "0".concat(binary);
      } // convert string representation to object structure


      var maxTerm = new BooleanFunction$1(BooleanFunctionOperator_OR, []);

      for (var c = 0; c < binary.length; c++) {
        maxTerm.addTerm(new BooleanFunctionLiteral(c, binary.charAt(binary.length - 1 - c) != '0'));
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

function computeDontCareMinTermsFromKV(kvdiagram) {
  var minTerms = [];
  var kv = kvdiagram.getValues();

  for (var y = 0; y < kv.length; y++) {
    for (var x = 0; x < kv[0].length; x++) {
      if (kv[y][x] != '-') {
        continue;
      } // Converting the kvindex(base 10) to a binary number
      // shows us which literals are 'positive' (-> 1) on the cell
      // and which are negated (-> 0)


      var index = kvdiagram.computeKVIndex(y, x);
      var binary = index.toString(2); // fill in missing literals

      while (binary.length < kvdiagram.getAmountLiterals()) {
        binary = "0".concat(binary);
      } // convert string representation to object structure


      var minTerm = new BooleanFunction$1(BooleanFunctionOperator_AND, []);

      for (var c = 0; c < binary.length; c++) {
        minTerm.addTerm(new BooleanFunctionLiteral(c, binary.charAt(binary.length - 1 - c) == '0'));
      }

      minTerms.push(minTerm);
    }
  }

  return minTerms;
}

var BooleanFunctionUtil = /*#__PURE__*/function () {
  function BooleanFunctionUtil() {
    _classCallCheck(this, BooleanFunctionUtil);
  }

  _createClass(BooleanFunctionUtil, [{
    key: "convertBaseTermsToStringFormat",

    /** Converts array of BooleanFunction baseTerms to an array
       * of their respective string representations. See
       * convertBaseTermToStringFormat(..) for further reference.
       * @param {[BooleanFunction]} baseTerms
       */
    value: function convertBaseTermsToStringFormat(baseTerms, globalAmountLiterals) {
      var termsStr = [];

      for (var t = 0; t < baseTerms.length; t++) {
        termsStr.push(this.convertBaseTermToStringFormat(baseTerms[t], globalAmountLiterals));
      }

      return termsStr;
    }
    /**
       * Converts a BaseTerm (i.e. function consisting only of BooleanFunctionLiterals directly)
       * to its string representation (e.g. '0-101').
       * See Readme.md for further info on the string format. \
       * The returned string fullfills the format specification of having the Literal-IDs in descending
       * order.
       * @param {BooleanFunction} baseTerm BooleanFunction baseTerm to convert.
       * @param {number} globalAmountLiterals Number defining how many global literals exists
       * as to fill the String with DontCares to match that total amount. Or to cut it if move literals
       * than -globalAmountLiterals- are present in the BooleanFunction.
       * @returns {string} string representation of given baseTerm.
       */

  }, {
    key: "convertBaseTermToStringFormat",
    value: function convertBaseTermToStringFormat(baseTerm, globalAmountLiterals) {
      var strRepresentation = '';
      /** @type {[BooleanFunctionLiteral]} */

      var literals = baseTerm.getTerms();

      if (globalAmountLiterals == undefined) {
        console.trace('error in BooleanFunctionUtil.js > convertBaseTermToStringFormat(..) \n' + 'No globalAmountLiterals (2nd parameter) was given\n');
      }

      var id = 0; // let literalsProcessed = 0;
      // while(literalsProcessed < globalAmountLiterals) {

      while (id < globalAmountLiterals) {
        // search for literal with id
        var literalsWithThatID = literals.filter(function (literal) {
          return literal.getId() == id;
        });

        if (literalsWithThatID.length > 1) {
          console.trace('error in BooleanFunctionUtil.js > convertBaseTermToStringFormat(..) \n' + 'Given baseTerm had multiple Literals with the same ID. Conversion to String format ' + 'not possible. Returning null');
          return null;
        }

        if (literalsWithThatID.length == 1) {
          strRepresentation = (literalsWithThatID[0].isNegated() ? '0' : '1') + strRepresentation; // literalsProcessed++;
        } else {
          // dont care, as the literal was not present
          strRepresentation = "-".concat(strRepresentation);
        }

        id++;
      }

      return strRepresentation;
    }
    /**
       * Converts string representation (e.g. '01-1') to its BooleanFunction equivalent.
       * See Readme.md for further info on the string format. \
       * Literal-IDs are assumed to be in descending order, starting with termStr.length()-1,
       * ending with 0. \
       * DontCares, represented by '-' will be ignored and no literal will be inserted
       * into the output term for it.
       * @param {string} termStr
       * @param {BooleanFunctionOperator_OR | BooleanFunctionOperator_AND} booleanFunctionOperator
       *  see BooleanFunction.js for BooleanFunction Operator constants
       * @returns {BooleanFunction}
       */

  }, {
    key: "convertStringFormatBaseTermToBooleanFunction",
    value: function convertStringFormatBaseTermToBooleanFunction(termStr, booleanFunctionOperator) {
      var term = new BooleanFunction$1(booleanFunctionOperator, []);

      for (var c = 0; c < termStr.length; c++) {
        var index = termStr.length - 1 - c;
        if (termStr[index] == '-') continue;
        term.addTerm(new BooleanFunctionLiteral(c, termStr.charAt(index) == '0'));
      } // console.log('conversion from "' + termStr + '"');
      // console.log(term);


      return term;
    }
    /**
       * @param {[BooleanFunction | BooleanFunctionLiteral]} array
       * @returns deep cloned version of given array
       */

  }, {
    key: "cloneBooleanFunctionArray",
    value: function cloneBooleanFunctionArray(array) {
      var arrayNew = [];

      for (var i = 0; i < array.length; i++) {
        arrayNew[i] = array[i].clone();
      }

      return arrayNew;
    }
    /**
       * Converts the final (most cost effective) solution of a petrick
       * statement to its BooleanFunction equivalent. Uses prime terms
       * that have been carried around in the petrickStatementObjMinORMax
       * itself to do so.
       * @param { {
       *      primeTerms: [BooleanFunction],
       *      cheapestSolution: String,
       *      PRIMETERM_SYMBOL_BASE_CHAR_CODE: number,
       *      etc___: "..."
       *  } } petrickStatementObjMinORMax petrick statement obj of EITHER 'min-terms'
       * OR 'max-terms' as returned by _computePetrickStatement(..) or
       * computePetrickStatement(..)[<ONE VARIANT>].
       * @param {BooleanFunctionOperator_OR | BooleanFunctionOperator_AND} booleanFunctionOpTopLevel A
       * BooleanFunction Operator as defined in file BooleanFunction.js. The resulting BooleanFunction
       * will get this OP as its main arithmetic operator.
       * @returns {BooleanFunction}
       */

  }, {
    key: "convertFinalPetrickSolutionToBooleanFunction",
    value: function convertFinalPetrickSolutionToBooleanFunction(petrickStatementObjMinORMax, booleanFunctionOpTopLevel) {
      /** @type {[BooleanFunction]} */
      var primeTerms = petrickStatementObjMinORMax.primeTerms; // retrieve cheapest solution from obj

      /** @type {String} */

      var solutionStr = petrickStatementObjMinORMax.cheapestSolution; // build minimal-form BooleanFunction

      var bf = new BooleanFunction$1(booleanFunctionOpTopLevel, []);
      var PRIMETERM_SYMBOL_BASE_CHAR_CODE = petrickStatementObjMinORMax.PRIMETERM_SYMBOL_BASE_CHAR_CODE;

      for (var p = 0; p < solutionStr.length; p++) {
        var primeTermi = solutionStr.charCodeAt(p) - PRIMETERM_SYMBOL_BASE_CHAR_CODE;
        bf.addTerm(primeTerms[primeTermi].clone());
      }

      return bf;
    }
    /**
       *
       * @param petrickStatementObj as returned by the petrick statement algorithm
       * @param {BooleanFunctionOperator_AND | BooleanFunctionOperator_OR} booleanFunctionOpTopLevel OP
       * resulting boolean function containing prime terms
       */

  }, {
    key: "extractCheapestSolutionFromPetrickStatementObj",
    value: function extractCheapestSolutionFromPetrickStatementObj(petrickStatementObj, booleanFunctionOpTopLevel) {
      var primeTerms = petrickStatementObj.primeTerms;
      var lastStep = petrickStatementObj.steps[petrickStatementObj.steps.length - 1];
      var cheapestSolution = lastStep.bf.getTerms()[0].getTerms()[petrickStatementObj.cheapestSolution];
      console.log(lastStep, lastStep.bf);
      var out = new BooleanFunction$1(booleanFunctionOpTopLevel, []);

      for (var l = 0; l < cheapestSolution.getTerms().length; l++) {
        var primeTermi = cheapestSolution.getTerms()[l].getId();
        out.addTerm(primeTerms[primeTermi].clone());
      }

      return out;
    }
    /**
       * Returns a sorted version of the given array of Baseterms by their
       * respective KVDiagram-Index.
       * Does not change the original array in any way.
       * BooleanFunctions themselves are not clones
       * @param {[BooleanFunction]} baseTerms
       */

  }, {
    key: "sortBaseTermsByKVIndex",
    value: function sortBaseTermsByKVIndex(baseTerms) {
      var kvindices = [];

      for (var b = 0; b < baseTerms.length; b += 1) {
        var baseTerm = baseTerms[b];
        var kvindex = parseInt(baseTerm.getTerms().map(function (bfliteral) {
          return bfliteral.isNegated() ? '0' : '1';
        }).reverse().join(''), 2);
        kvindices[b] = kvindex;
      } // get array with baseTerms and their respective kvindices


      var kvindicesTupleSorted = kvindices.map(function (kvindex, i) {
        return [baseTerms[i], kvindex];
      }).sort(function (a, b) {
        return Math.sign(a[1] - b[1]);
      });
      return kvindicesTupleSorted.map(function (tuple) {
        return tuple[0];
      });
    }
    /**
       * @param {BooleanFunction} primeTerm
       * @param {[BooleanFunction]} baseTerm
       * @returns {boolean} Boolean stating if the given prime term coveres the
       * given base term
       */

  }, {
    key: "primeTermCoversBaseTerm",
    value: function primeTermCoversBaseTerm(primeTerm, baseTerm) {
      var _loop = function _loop(l) {
        var primeTermLiteral = primeTerm.getTerms()[l];
        if (baseTerm.getTerms().find(function (baseTermLiteral) {
          return baseTermLiteral.equals(primeTermLiteral);
        }) === undefined) return {
          v: false
        };
      };

      for (var l = 0; l < primeTerm.getTerms().length; l++) {
        var _ret = _loop(l);

        if (_typeof(_ret) === "object") return _ret.v;
      }

      return true;
    }
    /**
       * Untestet!
       * Converts deep cloned array of maxTerms variants of given minTerms
       * @param {[BooleanFunction]} minTerms
       */

  }, {
    key: "convertMinTermsToMaxTerms",
    value: function convertMinTermsToMaxTerms(minTerms) {
      var maxTerms = [];

      for (var t = 0; t < minTerms.length; t++) {
        var minTerm = minTerms[t];
        var minTermLiterals = minTerm.getTerms();
        var maxTerm = new BooleanFunction$1(BooleanFunctionOperator_OR, []);
        maxTerms[t] = maxTerm;

        for (var l = 0; l < minTermLiterals.length; l++) {
          maxTerm.addTerm(new BooleanFunctionLiteral(minTermLiterals[l].getId(), !minTermLiterals[l].isNegated()));
        }
      }

      return maxTerms;
    }
    /**
       * @param {BooleanFunction} bfLeft
       * @param {BooleanFunction} bfRight
       * @returns true if bfLeft fully contains all of rights literals
       * [bfRight ist Untermenge von bfLeft]
       */

  }, {
    key: "booleanFunctionContainsAnother",
    value: function booleanFunctionContainsAnother(bfLeft, bfRight) {
      var _loop2 = function _loop2(r) {
        var subTermRight = bfRight.getTerms()[r];

        if (bfLeft.getTerms().find(function (l) {
          return l.equals(subTermRight);
        }) === undefined) {
          return {
            v: false
          };
        }
      };

      for (var r = 0; r < bfRight.getTerms().length; r++) {
        var _ret2 = _loop2(r);

        if (_typeof(_ret2) === "object") return _ret2.v;
      }

      return true;
    }
  }, {
    key: "computeBinaryStringRepresentationOfBaseTerm",
    value: function computeBinaryStringRepresentationOfBaseTerm(baseTermBF, amountVariablesTotal) {
      var str = '';

      var _loop3 = function _loop3(v) {
        var literal = baseTermBF.getTerms().find(function (l) {
          return l.getId() === v;
        });

        if (literal == undefined) {
          str += '-';
        } else if (literal.isNegated()) {
          str += '0';
        } else {
          str += '1';
        }
      };

      for (var v = amountVariablesTotal - 1; v >= 0; v--) {
        _loop3(v);
      }

      return str;
    }
  }]);

  return BooleanFunctionUtil;
}();

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

function computeQuineCluskeyClasses(minTerms, maxTerms, dontCareMinTerms) {
  return {
    'min-terms': _computeQuineCluskeyClasses(minTerms, dontCareMinTerms),
    'max-terms': _computeQuineCluskeyClasses(maxTerms, dontCareMinTerms)
  };
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
  if (!minOrMaxTermsBF || minOrMaxTermsBF.length == 0) {
    console.error('error in _computeQuineCluskeyClasses(..): given MinOrMaxTerms was undefined ' + 'or of length 0. Might be bc knf = 1 or dnf = 0.');
    return null;
  }

  var isMinterm = minOrMaxTermsBF[0].getLogicOperator() == BooleanFunctionOperator_AND;
  var numVariables = minOrMaxTermsBF[0].getTerms().length; // parse object representation of parameters to string format

  var util = new BooleanFunctionUtil();
  var baseTerms = util.convertBaseTermsToStringFormat(minOrMaxTermsBF, numVariables);
  var dontCares = util.convertBaseTermsToStringFormat(dontCareMinTermsBF, numVariables); // NOTE: dont care min terms are negated (i.e. transformed into maxterms), if
  //       we are also dealing with maxterms as base terms

  if (!isMinterm) {
    for (var d = 0; d < dontCares.length; d++) {
      var dontCareStr = dontCares[d];
      var dontCareNegatedStr = '';

      for (var c = 0; c < dontCareStr.length; c++) {
        dontCareNegatedStr += dontCareStr[c] == '-' ? '-' : dontCareStr[c] == '1' ? '0' : '1';
      }

      dontCares[d] = dontCareNegatedStr;
    }
  }
  /** contains all Q_classes, for example Q_4_4 with all the terms as pairs of [term, bool:term minimized?] */


  var Q_container = [];
  /** counts which Qs to compare */

  var q_class = numVariables; // generate first layer of classes that contain the unchanged base terms

  Q_container[q_class] = [];

  for (var i = 0; i <= numVariables; i++) {
    Q_container[q_class][i] = [];
  }

  for (var i = 0; i < baseTerms.length; i++) {
    // get number of 1s
    var num = baseTerms[i].replace(/[^1]/g, '').length;
    Q_container[q_class][num].push([baseTerms[i], false]);
  }

  for (var i = 0; i < dontCares.length; i++) {
    // get number of 1s
    var num = dontCares[i].replace(/[^1]/g, '').length;
    Q_container[q_class][num].push([dontCares[i], false]);
  } // start reduction phase


  while (q_class > 0) {
    // create next smaller q-class
    Q_container[q_class - 1] = [];

    for (var l = 0; l < q_class; l++) {
      Q_container[q_class - 1][l] = [];
    } // compare classes


    for (var class_comp = q_class; class_comp > 0; class_comp--) {
      // skip if no terms in classes that should be compared
      var sizeQU = Q_container[q_class][class_comp].length;
      var sizeQU2 = Q_container[q_class][class_comp - 1].length;
      if (sizeQU < 1 || sizeQU2 < 1) continue; // compare all terms of u and u-1

      var seen = {}; // to remove duplicates

      for (var _c = 0; _c < sizeQU; _c++) {
        for (var _d = 0; _d < sizeQU2; _d++) {
          // only one position should differ
          var term1 = Q_container[q_class][class_comp][_c][0];
          var term2 = Q_container[q_class][class_comp - 1][_d][0];
          var diffs = -1;

          for (var e = 0; e < numVariables; e++) {
            var charA = term1.charAt(e);
            var charB = term2.charAt(e);

            if (charA != charB) {
              if (charA == '-' || charB == '-') {
                // if one has a -, the term cannot be reduced
                diffs = -2;
                break;
              }

              if (diffs == -1) {
                diffs = e;
              } else {
                // more than one diff: break
                diffs = -2;
                break;
              }
            }
          } // there is exactly one diff, put it in next class


          if (diffs >= 0) {
            // new term has a - at the position where the reduction took place
            var termNew = _replaceAt(term1, diffs, '-'); // set boolean to true, was reduced!


            Q_container[q_class][class_comp][_c][1] = true;
            Q_container[q_class][class_comp - 1][_d][1] = true; // there was a reduction, so we can start the algorithm on the next stage
            // change = true;

            if (seen[termNew] !== 1) {
              seen[termNew] = 1;
              Q_container[q_class - 1][class_comp - 1].push([termNew, false]);
            }
          }
        }
      }
    }

    q_class--;
  } // convert from string to object representation


  var Q_containerObj = [];

  for (var _i = 0; _i < Q_container.length; _i++) {
    Q_containerObj[_i] = [];

    for (var j = 0; j < Q_container[_i].length; j++) {
      Q_containerObj[_i][j] = [];

      for (var t = 0; t < Q_container[_i][j].length; t++) {
        Q_containerObj[_i][j][t] = [util.convertStringFormatBaseTermToBooleanFunction(Q_container[_i][j][t][0], isMinterm ? BooleanFunctionOperator_AND : BooleanFunctionOperator_OR), Q_container[_i][j][t][1]];
      }
    }

    Q_containerObj[_i].reverse();
  }

  return Q_containerObj;
}
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

function computePrimesFromKV(kvdiagram) {
  // base terms
  var minTerms = computeMinTermsFromKV(kvdiagram);
  var maxTerms = computeMaxTermsFromKV(kvdiagram);
  var dontCareMinTerms = computeDontCareMinTermsFromKV(kvdiagram);
  var dontCareMaxTerms = new BooleanFunctionUtil().convertMinTermsToMaxTerms(dontCareMinTerms);
  var q_containerObjMinMax = computeQuineCluskeyClasses(minTerms, maxTerms, dontCareMinTerms);
  return computePrimes(q_containerObjMinMax, dontCareMinTerms, dontCareMaxTerms);
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

function computePrimes(q_containerObjMinMax, dontCareMinTerms, dontCareMaxTerms) {
  return {
    'min-terms': _computePrimes(q_containerObjMinMax['min-terms'], dontCareMinTerms),
    'max-terms': _computePrimes(q_containerObjMinMax['max-terms'], dontCareMaxTerms)
  };
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
  var primes = [];

  for (var c = 0; c < q_containerObj.length; c++) {
    for (var n = 0; n < q_containerObj[c].length; n++) {
      for (var t = 0; t < q_containerObj[c][n].length; t++) {
        var termCapsule = q_containerObj[c][n][t];

        if (termCapsule[1] == true) // term was absorbed
          {
            continue;
          }

        if (primes.includes(termCapsule[0])) // skip duplicates
          {
            continue;
          } // skip ones only covering dont cares


        if (_primeTermCoversOnlyDontCares(termCapsule[0], dontCares)) continue;
        primes.push(termCapsule[0]);
      }
    }
  } // clone terms


  var out = [];

  for (var _t = 0; _t < primes.length; _t++) {
    out.push(primes[_t].clone());
  }

  return out;
}
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
  var numVariables = dontCares[0].getTerms().length;
  var util = new BooleanFunctionUtil();
  var primeTermAreaSize = Math.pow(2, numVariables - primeTerm.getTerms().length);
  var dontCaresCovered = 0;

  for (var dc = 0; dc < dontCares.length; dc++) {
    if (util.primeTermCoversBaseTerm(primeTerm, dontCares[dc])) dontCaresCovered++;
  }

  return dontCaresCovered === primeTermAreaSize;
}

/**
 * Type of Step, where a prime term was identified as a core, bc it is
 * the only one covering a certain base term
 */

var BOOLEAN_FUNCTION_PRIME_TABLES_STEP_FOUND_CORE = 'found-core';
/**
 * Type of Step, where a column is crossed out, bc it is already being covered
 * by some prime term.
 */

var BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_COLUMN_BC_COVERED = 'cross-column-bc-covered';
/**
 * Type of Step, where a row is crossed out, bc all of its crosses
 * are already being covered. (if this type would not exist, such empty rows
 * would be reduced thru Row-Domination. But on paper, just crossing an empty row
 * out is more straightforward)
 */

var BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_ROW_BC_COVERED = 'cross-row-bc-covered';
/**
 * Type of Step, where a row is dominated by some other row. A cost analysis of
 * both rows has been done if this Step was taken by the algorithm.
 */

var BOOLEAN_FUNCTION_PRIME_TABLES_STEP_ROW_DOMINATION = 'row-domination';
/**
 * Type of Step, where a column is dominated by some other column. The dominatING column
 * is to be crossed out.
 */

var BOOLEAN_FUNCTION_PRIME_TABLES_STEP_COLUMN_DOMINATION = 'column-domination';
/**
 * Type of Step that is appended to the step array, stating that the table has a cyclic Rest
 * that can not be minimized by only using this PrimeTable approach. This step is appended exactly
 * then, when {}.cyclic === true.
 */

var BOOLEAN_FUNCTION_PRIME_TABLES_STEP_HAS_CYCLIC_REST = 'has-cyclic-rest';
/**
 * This will execute the prime table / Ueberdeckungstabellen algorithm
 * once for (minTerms with primeTerms) and once for (maxTerms with primeTerms).
 * @param {[BooleanFunction]} minTerms Array of Minterms
 * @param {[BooleanFunction]} maxTerms Array of Maxterms
 * @param { {
 *      'min-terms': [BooleanFunction],
 *      'max-terms': [BooleanFunction]
 * } } primeTerms Object containing Min and Max primeterms
 * as returned by computePrimes[-FromKV](..)
 * @returns { {
 *      'min-terms': {},
 *      'max-terms': {}
 * } }
 */

function computePrimeTable(minTerms, maxTerms, primeTerms) {
  var sortBaseTermsByKVIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var util = new BooleanFunctionUtil();
  var minTermsSorted = !sortBaseTermsByKVIndex ? minTerms : util.sortBaseTermsByKVIndex(minTerms);
  var maxTermsSorted = !sortBaseTermsByKVIndex ? maxTerms : util.sortBaseTermsByKVIndex(maxTerms);
  return {
    'min-terms': _computePrimeTable(minTermsSorted, primeTerms['min-terms']),
    'max-terms': _computePrimeTable(maxTermsSorted, primeTerms['max-terms'])
  };
}
/**
 * @param {[BooleanFunction]} baseTerms
 * @param {[BooleanFunction]} primeTerms
 * @returns {
 *      {
 *        'coverTable': [[boolean]],
 *        'steps': [Step],
 *        'baseTerms': [BooleanFunction],
 *        'primeTerms': [BooleanFunction],
 *        'cyclic': boolean
 *      }
 *  }
 */

function _computePrimeTable(baseTerms, primeTerms) {
  var util = new BooleanFunctionUtil();
  var returnObj = {
    coverTable: null,
    // filled in below
    steps: [],
    // filled in below
    baseTerms: util.cloneBooleanFunctionArray(baseTerms),
    primeTerms: util.cloneBooleanFunctionArray(primeTerms)
  }; // create cover table

  var petrickTable = [];

  for (var i = 0; i < baseTerms.length; i++) {
    petrickTable[i] = [];

    for (var j = 0; j < primeTerms.length; j++) {
      if (_primeTermCoversBaseTerm(primeTerms[j], baseTerms[i])) petrickTable[i][j] = true;else petrickTable[i][j] = false;
    }
  }

  returnObj.coverTable = petrickTable; // create helper table[col][row]:
  //  -1: no info
  //   0: striked out
  //   1: is core (kind of used but kind of not)

  var helperTable = [];

  for (var col = 0; col < petrickTable.length; col++) {
    helperTable[col] = [];

    for (var _i = 0; _i < petrickTable[0].length; _i++) {
      helperTable[col][_i] = -1;
    }
  }

  var crossedOutRows = [];
  var crossedOutColumns = []; // check for Kernimplikanten und deren abgedeckte columns

  _computePrimeTable_checkForCores(returnObj, helperTable, crossedOutRows, crossedOutColumns);

  var changes = true;

  while (changes === true) {
    changes = false; // Spaltendominanz

    changes = _computePrimeTable_checkForSpaltenDominanz(returnObj, helperTable, crossedOutRows, crossedOutColumns) || changes; // through column dominance some lines may have been silently cut of their last Xs. remove those officially

    changes = _computePrimeTable_checkForEmptyLines(returnObj, helperTable, crossedOutRows) || changes; // Zeilendominanz (See VL Folien 17, Seite 33 for algorithm)
    // Example case where Zeilendominanz is necessary:
    // 1 0 1 0
    // 1 1 1 0

    changes = _computePrimeTable_checkForZeilenDominanz(returnObj, helperTable, crossedOutRows, crossedOutColumns, primeTerms) || changes; // check for Kernimplikanten again. e.g. important at
    // 0 1 1 0
    // 0 - 1 1
    // 0 0 1 -
    // - 1 - 0

    changes = _computePrimeTable_checkForCores(returnObj, helperTable, crossedOutRows, crossedOutColumns) || changes; // console.log("looping");
  } // 0 0 0 0
  // 1 1 0 1
  // 0 1 1 1
  // 0 0 1 0
  // shows that it is necessary to loop through Zeilendominanz and searching for cores multiple times!


  var hasCyclicRest = !_computePrimeTable_isCompletelySolved(helperTable, crossedOutRows, crossedOutColumns);
  returnObj.cyclic = hasCyclicRest;

  if (hasCyclicRest) {
    returnObj.steps.push(new Step$1(BOOLEAN_FUNCTION_PRIME_TABLES_STEP_HAS_CYCLIC_REST, {}));
  }

  return returnObj;
}

function _computePrimeTable_checkForCores(returnObj, helperTable, crossedOutRows, crossedOutColumns) {
  var changes = false;
  var petrickTable = returnObj.coverTable; // check for kernimplika(n)te(n)

  for (var col = 0; col < petrickTable.length; col++) {
    if (crossedOutColumns.includes(col)) continue; // > get row that is covering this column

    var rowCoveringTheColumn = -1;
    var isCore = true;

    for (var row = 0; row < petrickTable[0].length; row++) {
      if (petrickTable[col][row] == true && helperTable[col][row] == -1) {
        if (rowCoveringTheColumn == -1) {
          rowCoveringTheColumn = row;
        } else {
          isCore = false;
          break;
        }
      }
    }

    if (!isCore) {
      continue;
    } // > We have found a core term


    changes = true;
    returnObj.steps.push(new Step$1(BOOLEAN_FUNCTION_PRIME_TABLES_STEP_FOUND_CORE, {
      core: rowCoveringTheColumn,
      column: col
    })); // cross current column

    _crossColumn(petrickTable, col, helperTable);

    crossedOutColumns.push(col); // cross current row

    _crossRow(petrickTable, rowCoveringTheColumn, helperTable);

    crossedOutRows.push(rowCoveringTheColumn); // cross columns (base terms) that this core also covers

    for (var i = 0; i < petrickTable.length; i++) {
      if (col == i) continue;
      if (crossedOutColumns.includes(i)) continue;

      if (petrickTable[i][rowCoveringTheColumn] == true) {
        _crossColumn(petrickTable, i, helperTable);

        crossedOutColumns.push(i);
        returnObj.steps.push(new Step$1(BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_COLUMN_BC_COVERED, {
          column: i,
          coveredBy: rowCoveringTheColumn
        }));
      }

      if (helperTable[i][rowCoveringTheColumn] != 1) {
        helperTable[i][rowCoveringTheColumn] = 0;
      }
    }

    helperTable[col][rowCoveringTheColumn] = 1;
  }

  return changes;
}

function _computePrimeTable_checkForSpaltenDominanz(returnObj, helperTable, crossedOutRows, crossedOutColumns) {
  var changes = false;
  var petrickTable = returnObj.coverTable; // > search for a column that covers the same but less than some other column

  for (var colDominatori = 0; colDominatori < petrickTable.length; colDominatori++) {
    if (crossedOutColumns.includes(colDominatori)) continue; // search for the col it can dominate

    for (var colMi = 0; colMi < petrickTable.length; colMi++) {
      if (colDominatori == colMi || crossedOutColumns.includes(colMi)) continue; // check condition of domination

      var dominationPossible = true;

      for (var row = 0; row < petrickTable[0].length; row++) {
        if (crossedOutRows.includes(row)) continue; // dominated col does not have a mark in this row

        if (petrickTable[colMi][row] == false) continue; // > a mark in dominated col. And in dominating? => OK

        if (petrickTable[colDominatori][row]) continue;
        dominationPossible = false;
        break;
      }

      if (!dominationPossible) continue; // > DOMINATION!
      // -> cross out dominatING column

      changes = true;
      crossedOutColumns.push(colDominatori);

      _crossColumn(petrickTable, colDominatori, helperTable);

      returnObj.steps.push(new Step$1(BOOLEAN_FUNCTION_PRIME_TABLES_STEP_COLUMN_DOMINATION, {
        dominator: colDominatori,
        dominated: colMi
      }));
    }
  }

  return changes;
}

function _computePrimeTable_checkForZeilenDominanz(returnObj, helperTable, crossedOutRows, crossedOutColumns, primeTerms) {
  var changes = false;
  var petrickTable = returnObj.coverTable; // > search for a row, that covers more than some other row

  for (var rowDominatori = 0; rowDominatori < petrickTable[0].length; rowDominatori++) {
    if (crossedOutRows.includes(rowDominatori)) continue; // search for the row it can dominate

    for (var rowMi = 0; rowMi < petrickTable[0].length; rowMi++) {
      if (rowDominatori == rowMi || crossedOutRows.includes(rowMi)) continue; // check condition of domination

      var dominationPossible = true;

      for (var col = 0; col < petrickTable.length; col++) {
        if (crossedOutColumns.includes(col)) continue; // dominated row does not have a mark in this col

        if (petrickTable[col][rowMi] == false) continue; // > mark in dominated row. And in dominating? => OK

        if (petrickTable[col][rowDominatori]) continue;
        dominationPossible = false;
        break;
      }

      if (!dominationPossible) continue; // > Possibly Dominated lines have been found!
      // check cost (amount of literals. See VL Folien 17, Seite 33)

      var costDominator = primeTerms[rowDominatori].getTerms().length;
      var costDominated = primeTerms[rowMi].getTerms().length;
      var domination = false;

      if (costDominator <= costDominated) {
        // > Dominating row is cheaper or equally cheap as dominated row
        domination = true;
      } else {
        // > Dominated row is cheaper

        /* VL Folien 17, Seite 30:
                    [Wenn z2 <= z1 , jedoch] c2 < c1 und es existieren keine Zeilen zk
                    (Primterme pk), welche die restlichen Einsstellen der Zeile z1
                    überdecken können und weniger als die Differenz c1 - c2 kosten
                    (d.h.: c1 <= c2 + ck).
                    -> Dann kann die Zeile z2 auch gestrichen werden.
                */
        // > search for other row that fits the condition above
        for (var rowOtheri = 0; rowOtheri < petrickTable[0].length; rowOtheri++) {
          // search for OTHER row
          if (rowOtheri == rowDominatori || rowOtheri == rowMi || crossedOutRows.includes(rowOtheri)) continue; // check if it is cheaper than the difference

          var costOther = primeTerms[rowOtheri].getTerms().length;
          if (!(costDominator <= costDominated + costOther)) continue; // check if this row coveres the 'restlichen Einstellen' of dominator row

          var otherRowCoveresRestlicheEinsstellen = true;

          for (var _col = 0; _col < petrickTable.length; _col++) {
            // it only needs to cover other EINSstellen
            if (petrickTable[_col][rowDominatori] == false) continue; // it only needs to cover OTHER einsstellen

            if (petrickTable[_col][rowMi] == true) continue; // > the 'other' row would need to cover this column

            if (petrickTable[_col][rowOtheri] == false) {
              // > but it does not
              otherRowCoveresRestlicheEinsstellen = false;
              break;
            }
          }

          if (otherRowCoveresRestlicheEinsstellen) {
            // > we have found another row that fits this very specific condition.
            // Domination will therefore not take place with in constellation
            domination = false;
            break;
          } // > this line was not one that fit the specific condition. Go on
          // to check if some other line fits it.

        }
      }

      if (domination == false) {
        // Row 'rowDominatori' does not legally cover 'rowMi' due to
        // costDom > rowMi AND the very specific condition stated above.
        continue;
      } // > DOMINATION!


      changes = true;
      crossedOutRows.push(rowMi);

      _crossRow(petrickTable, rowMi, helperTable);

      returnObj.steps.push(new Step$1(BOOLEAN_FUNCTION_PRIME_TABLES_STEP_ROW_DOMINATION, {
        dominator: rowDominatori,
        dominated: rowMi
      }));
    }
  }

  return changes;
}

function _computePrimeTable_checkForEmptyLines(returnObj, helperTable, crossedOutRows, crossedOutColumns) {
  var changes = false;
  var petrickTable = returnObj.coverTable;

  for (var row = 0; row < petrickTable[0].length; row++) {
    if (crossedOutRows.includes(row)) continue; // console.log("checking row " + row + ".......");

    var isLineEmpty = true;

    for (var col = 0; col < petrickTable.length; col++) {
      if (!petrickTable[col][row]) continue;

      if (helperTable[col][row] === 0) // if cell is striked out
        {
          continue;
        } // console.log("found a uncovered cross in column " + col + " with value: " + helperTable[col][row]);


      isLineEmpty = false;
      break;
    }

    if (!isLineEmpty) continue; // console.log("row " + row + " is empty!");

    _crossRow(petrickTable, row, helperTable);

    crossedOutRows.push(row);
    returnObj.steps.push(new Step$1(BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_ROW_BC_COVERED, {
      row: row
    }));
    changes = true;
  }

  return changes;
}

function _computePrimeTable_isCompletelySolved(helperTable, crossedOutRows, crossedOutColumns) {
  for (var row = 0; row < helperTable[0].length; row++) {
    if (!crossedOutRows.includes(row)) {
      return false;
    }
  }

  for (var col = 0; col < helperTable.length; col++) {
    if (!crossedOutColumns.includes(col)) {
      return false;
    }
  }

  return true;
}
/**
 * Sets every cell in a column of the helper table to zero,
 * unless it is marked as a core.
 */


function _crossColumn(petrickTable, column, helperTable) {
  for (var i = 0; i < petrickTable[0].length; i++) {
    if (helperTable[column][i] != 1) {
      helperTable[column][i] = 0;
    }
  }
}
/**
 * Sets every cell in a row of the helper table to zero.
 */


function _crossRow(petrickTable, row, helperTable) {
  for (var col = 0; col < petrickTable.length; col++) {
    helperTable[col][row] = 0;
  }
}
/**
 * Checks if the given prime term covers a given min term
 * in the kvdiagram.
 * @param {BooleanFunction} primeTerm
 * @param {BooleanFunction} minTerm
 */


function _primeTermCoversBaseTerm(primeTerm, minTerm) {
  // check if for every literal in the prime term, an equivalent
  // literal in the base term exists
  var primeLiterals = primeTerm.getTerms();
  var baseLiterals = minTerm.getTerms();

  for (var pl = 0; pl < primeLiterals.length; pl++) {
    // check for occurence of current prime-literal
    // somewhere in the base term
    var primeLiteralIsInBaseTerm = false;

    for (var bl = 0; bl < baseLiterals.length; bl++) {
      if (primeLiterals[pl].equals(baseLiterals[bl])) {
        primeLiteralIsInBaseTerm = true;
        break;
      }
    }

    if (!primeLiteralIsInBaseTerm) return false;
  }

  return true;
}
/**
 * Convenience class to encapsulate a single 'step' during
 * the Ueberdeckungstabellen algorithm.
 * See constructor for further reference.
 */


var Step$1 =
/**
   * @param {BOOLEAN_FUNCTION_PRIME_TABLES_STEP_FOUND_CORE
   *      | BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_COLUMN_BC_COVERED
   *      | BOOLEAN_FUNCTION_PRIME_TABLES_STEP_ROW_DOMINATION
   *      | BOOLEAN_FUNCTION_PRIME_TABLES_STEP_COLUMN_DOMINATION
   *      | BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_ROW_BC_COVERED } actionType
   *      ID-like value defining the type of action performed in this step. See
   *      exported constants at the top of this file.
   * @param values Values regarding the current step. Meant to be used for
   *      easy access / embedding of step-details from front-end. For which values
   *      are set on what -type- of step, see the readme.md
   */
function Step(actionType, _ref) {
  var core = _ref.core,
      column = _ref.column,
      coveredBy = _ref.coveredBy,
      dominator = _ref.dominator,
      dominated = _ref.dominated,
      row = _ref.row;

  _classCallCheck(this, Step);

  this.actionType = actionType;
  this.core = core;
  this.column = column;
  this.row = row;
  this.coveredBy = coveredBy;
  this.dominator = dominator;
  this.dominated = dominated;
};

var BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_INITIAL = 'bf-ps-initial';
var BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_DISTRIBUTION = 'bf-ps-distribution';
var BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_IDEMPOTENCE = 'bf-ps-idempotence';
var BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_ABSORPTION = 'bf-ps-absorption';
var BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_SORTING = 'bf-ps-sorting';
/**
 * Computes the petrick statement (obj) e.g. containing the cheapest solution
 * and different snapshots of solving the statement mathematically one by one.
 * @param { {
 *      'min-terms': {},
 *      'max-terms': {}
 * } } primeTableObj Object containing cover table data as returned by
 * computePrimeTable(..) or computePrimeTableFromKV(..)
 * @returns { {
 *      'min-terms': {},
 *      'max-terms': {}
 * } } The petrick statement (obj) split into a 'min-terms' and a 'max-terms'
 * variant. See README and _computePetrickStatement(..) for more info on the return value.
 */

function computePetrickStatement(primeTableObj) {
  return {
    'min-terms': _computePetrickStatementBF(primeTableObj['min-terms']),
    'max-terms': _computePetrickStatementBF(primeTableObj['max-terms'])
  };
}

function _computePetrickStatementBF(primeTableObjMinORMax) {
  // build petrickterm
  var petrickTable = primeTableObjMinORMax.coverTable; // create basic Petrickterm without any simplifications

  var bfPetrickTerm = new BooleanFunction$1(BooleanFunctionOperator_AND, []); // ' = 1'

  for (var col = 0; col < petrickTable.length; col++) {
    bfPetrickTerm.addTerm(new BooleanFunction$1(BooleanFunctionOperator_OR, []));

    for (var row = 0; row < petrickTable[0].length; row++) {
      if (petrickTable[col][row]) {
        bfPetrickTerm.getTerms()[col].addTerm(new BooleanFunction$1(BooleanFunctionOperator_AND, [new BooleanFunctionLiteral(row, false)])); // console.log(col, row);
      } // constellationDirect[col] += String.fromCharCode(PRIMETERM_SYMBOL_BASE_CHAR_CODE + row); // => i.e. 'A' + row

    }
  }

  var util = new BooleanFunctionUtil();
  var returnObj = {
    steps: [new PetrickStatementStep(bfPetrickTerm, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_INITIAL)],
    // NOTE: having primeTerms here is a bit heselig, but its not hurting anyone
    primeTerms: util.cloneBooleanFunctionArray(primeTableObjMinORMax.primeTerms)
  };

  function __registerStep(stepObj) {
    returnObj.steps.push(stepObj);
  }

  function __getLastStep() {
    return returnObj.steps[returnObj.steps.length - 1];
  } // some preparations to make the algorithm sleeker:
  // sort terms by literal count (accending)


  bfPetrickTerm.getTerms().sort(function (a, b) {
    return a.amountLiterals() - b.amountLiterals();
  });

  if (!bfPetrickTerm.equals(__getLastStep().bf, true, true)) {
    // > if some change occured
    __registerStep(new PetrickStatementStep(bfPetrickTerm, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_SORTING));
  } // multi-term absorption


  var track_amountBeforeAbsorption0 = bfPetrickTerm.getTerms().length;

  _absorbBF(bfPetrickTerm);

  var track_amountAfterAbsorption0 = bfPetrickTerm.getTerms().length;

  if (track_amountAfterAbsorption0 !== track_amountBeforeAbsorption0) {
    __registerStep(new PetrickStatementStep(bfPetrickTerm, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_ABSORPTION));
  } // sort terms by literal count (descending)


  bfPetrickTerm.getTerms().sort(function (a, b) {
    return b.amountLiterals() - a.amountLiterals();
  });

  if (!bfPetrickTerm.equals(__getLastStep().bf, true, true)) {
    // > if some change occured
    __registerStep(new PetrickStatementStep(bfPetrickTerm, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_SORTING));
  } // repeat until the main konjunctive term only consists of one single subterm:
  // 1: distribute the leftmost subterm with its neighbour
  // 2: 'Idempotenz + absorption' between the newly created objects
  // 3: This addition of konjunctions (subsubterms) will be treated as the new 'leftmost'
  // (4:) Shift all terms except the leftmost one to the left in the main BF
  // console.log("whole term before: ");
  // console.log(require('util').inspect(bfPetrickTerm, true, null, true /* enable colors */));


  while (bfPetrickTerm.getTerms().length > 1) {
    // console.log();
    // console.log("-loop cycle start-");
    // 1: Distribute leftmost subterm with its neighbour on the right
    bfPetrickTerm.getTerms()[0] = _distributeBF(bfPetrickTerm.getTerms()[0], bfPetrickTerm.getTerms()[1]);
    bfPetrickTerm.getTerms().splice(1, 1); // remove second term and shift righter ones to the left

    __registerStep(new PetrickStatementStep(bfPetrickTerm, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_DISTRIBUTION)); // console.log("whole term after first distribution: ");
    // console.log(require('util').inspect(bfPetrickTerm, true, null, true /* enable colors */));
    // 2. a) Simplify the newly created terms (all inside of the first disjunction / subterm)


    var subterms = bfPetrickTerm.getTerms()[0].getTerms();
    var changeBySelectUniqueTerms = false;

    for (var i = 0; i < subterms.length; i++) {
      var lengthBefore = subterms[i].getTerms().length;
      subterms[i] = new BooleanFunction$1(BooleanFunctionOperator_AND, _selectUniqueTermsBF(subterms[i].getTerms()));
      var lengthAfter = subterms[i].getTerms().length;
      if (lengthBefore !== lengthAfter) changeBySelectUniqueTerms = true;
    }

    if (changeBySelectUniqueTerms) {
      __registerStep(new PetrickStatementStep(bfPetrickTerm, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_IDEMPOTENCE));
    } // console.log("whole term after first reduction: ");
    // console.log(require('util').inspect(bfPetrickTerm, true, null, true /* enable colors */));
    // 2. b) Some of those sub parts will now be able to be absorbed. Remove them


    var track_lengthBeforeAbsorption = bfPetrickTerm.getTerms()[0].getTerms().length;

    _absorbBF(bfPetrickTerm.getTerms()[0]);

    var track_lengthAfterAbsorption = bfPetrickTerm.getTerms()[0].getTerms().length;

    if (track_lengthBeforeAbsorption !== track_lengthAfterAbsorption) {
      __registerStep(new PetrickStatementStep(bfPetrickTerm, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_ABSORPTION));
    } // console.log("Whole term after absorption of subterms of first BF: ");
    // console.log(require('util').inspect(bfPetrickTerm, true, null, true /* enable colors */));

  } // find cheapest solution
  // compute cost of each individual prime term


  var primeTerms = primeTableObjMinORMax.primeTerms;
  var costPrimeTerms = [];

  for (var t = 0; t < primeTerms.length; t++) {
    costPrimeTerms[t] = primeTerms[t].getTerms().length;
  } // compute cost of each possible solution


  var costSolution = [];
  var solutions = bfPetrickTerm.getTerms()[0].getTerms();
  var amountSolutions = solutions.length;

  for (var s = 0; s < amountSolutions; s++) {
    costSolution[s] = 0;
    var solution = solutions[s]; // add cost of each individual prime term in it

    for (var _t = 0; _t < solution.getTerms().length; _t++) {
      // e.g. 'C' - 'A' = 2:
      var primeTermi = solution.getTerms()[_t].getId();

      costSolution[s] += costPrimeTerms[primeTermi];
    } // add amount of primeterms to the cost


    costSolution[s] += solution.getTerms().length;
  } // get solution with lowest cost


  var costSolutionMin = costSolution[0];
  var costSolutionMinIndex = 0;

  for (var _i2 = 0; _i2 < costSolution.length; _i2++) {
    if (costSolution[_i2] < costSolutionMin) {
      costSolutionMin = costSolution[_i2];
      costSolutionMinIndex = _i2;
    }
  }

  returnObj.cheapestSolution = costSolutionMinIndex;
  return returnObj;
}

function _distributeBF(termLeft, termRight) {
  // termLeft and termRight are both disjunctions of conjunctions
  // console.log("term left: ");
  // console.log(require('util').inspect(termLeft, true, null, true /* enable colors */));
  // console.log("term right: ");
  // console.log(require('util').inspect(termRight, true, null, true /* enable colors */));
  // cross match
  var bfMatchCollection = new BooleanFunction$1(BooleanFunctionOperator_OR, []);

  for (var i = 0; i < termLeft.getTerms().length; i++) {
    for (var j = 0; j < termRight.getTerms().length; j++) {
      // match conjunctions i and j (combine their literals)
      var leftConjunction = termLeft.getTerms()[i].clone();
      var rightConjunction = termRight.getTerms()[j]; // console.log('left: ', leftConjunction, '; right: ', rightConjunction);
      // add all literals of rightConjunction to leftConjunction
      // if they are not yet contained (not (yet) implemented, as seeing the
      // process step by step from a students perspective might be better)

      for (var rightLiteralI = 0; rightLiteralI < rightConjunction.getTerms().length; rightLiteralI++) {
        var rightLiteral = rightConjunction.getTerms()[rightLiteralI]; //
        // if (leftConjunction.getTerms().find(literalLeft => literalLeft.getId() === rightLiteral.getId()) === undefined)

        leftConjunction.addTerm(rightLiteral);
      }

      bfMatchCollection.addTerm(leftConjunction);
    }
  } // console.log("After: ");
  // console.log(require('util').inspect(bfMatchCollection, true, null, true /* enable colors */));


  return bfMatchCollection;
}

function _selectUniqueTermsBF(terms) {
  var uniqueTerms = [];

  for (var t = terms.length - 1; t >= 0; t--) {
    var term = terms[t];
    var termUnique = true;

    for (var c = 0; c < t; c++) {
      if (term.equals(terms[c])) {
        termUnique = false;
        break;
      }
    }

    if (!termUnique) continue;
    uniqueTerms.push(term);
  }

  return uniqueTerms;
}

function _absorbBF(bfTerm) {
  // NOTE: there must not be identical literals in any SINGLE BooleanFunction!
  // for every sub term, check if it fully contains another subterm (literal-wise)
  var util = new BooleanFunctionUtil();
  var amountSubTermsBefore = bfTerm.getTerms().length;
  var absorbedRegister = [];

  function __absorb(i) {
    absorbedRegister[i] = true;
  }

  var terms = bfTerm.getTerms();

  for (var t = 0; t < terms.length; t++) {
    var term = terms[t]; // compare against

    for (var compi = 0; compi < terms.length; compi++) {
      if (compi === t) continue;
      if (absorbedRegister[compi] === true) continue; // prevents two identical terms from absorbing each other and fading out of existance completely

      var comp = terms[compi];
      if (term.getTerms().length < comp.getTerms().length) continue; // term can not contain comp

      if (util.booleanFunctionContainsAnother(term, comp)) {
        // console.log("absorbed term ", t, " bc of term ", compi);
        __absorb(t); // since literals of comp are a subset of term's


        break;
      }
    }
  } // bfTerm.clearTerms();


  for (var _t3 = amountSubTermsBefore - 1; _t3 >= 0; _t3--) {
    if (absorbedRegister[_t3] === true) {
      bfTerm.spliceTerms(_t3, 1); // remove that term from the BF
    }
  } // console.log("absorbed reg: ", absorbedRegister);
  // console.log("After absorption of subterms: ");
  // console.log(require('util').inspect(bfTerm, true, null, true /* enable colors */))

}
/**
 * Object depicting a single step in the petrick statemen algorithm.
 */


var PetrickStatementStep =
/**
   * this.bf is the result of this step/action
   */
function PetrickStatementStep(booleanFunctionObj, actionType) {
  _classCallCheck(this, PetrickStatementStep);

  this.bf = booleanFunctionObj.clone();
  this.actionType = actionType;
};

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

function computeDMF(petrickStatementObj) {
  var util = new BooleanFunctionUtil(); // return util.convertFinalPetrickSolutionToBooleanFunction(
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

  return util.extractCheapestSolutionFromPetrickStatementObj(petrickStatementObj['min-terms'], BooleanFunctionOperator_OR);
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

function computeKMF(petrickStatementObj) {
  var util = new BooleanFunctionUtil(); // return util.convertFinalPetrickSolutionToBooleanFunction(
  //     petrickStatementObj['max-terms'],
  //     BooleanFunctionOperator_AND
  // );

  return util.extractCheapestSolutionFromPetrickStatementObj(petrickStatementObj['max-terms'], BooleanFunctionOperator_AND);
}

var BooleanFunctionNF = /*#__PURE__*/function () {
  function BooleanFunctionNF() {
    _classCallCheck(this, BooleanFunctionNF);
  }

  _createClass(BooleanFunctionNF, [{
    key: "computeDNFFromKV",

    /**
       * Computes DNF from given KVDiagram. \
       * NOTE: For better performance use computeDNF(..)
       * if you already have the necessary Minterms at hand.
       * @param {KVDiagram} kvdiagram
       * @returns {BooleanFunction} BooleanFunction representing the DNF
       */
    value: function computeDNFFromKV(kvdiagram) {
      var minTerms = computeMinTermsFromKV(kvdiagram);
      return this.computeDNF(minTerms);
    }
    /**
       * Computes DNF from given Minterms (as BooleanFunctions). \
       * NOTE: The given Minterms are deep cloned before encapsulating
       * them in a BooleanFunction.
       * @param {[BooleanFunction]} minTerms
       * @returns {BooleanFunction} a BooleanFunction representing the DNF
       */

  }, {
    key: "computeDNF",
    value: function computeDNF(minTerms) {
      // deep clone minTerms array
      var minTermsCloned = [];

      for (var i = 0; i < minTerms.length; i++) {
        minTermsCloned[i] = minTerms[i].clone();
      }

      return new BooleanFunction$1(BooleanFunctionOperator_OR, minTermsCloned);
    }
    /**
       * Computes KNF from given KVDiagram. \
       * NOTE: For better performance use computeKNF(..)
       * if you already have the necessary Maxnterms at hand.
       * @param {KVDiagram} kvdiagram
       * @returns {BooleanFunction} BooleanFunction representing the KNF
       */

  }, {
    key: "computeKNFFromKV",
    value: function computeKNFFromKV(kvdiagram) {
      var maxTerms = computeMaxTermsFromKV(kvdiagram);
      return this.computeKNF(maxTerms);
    }
    /**
       * Computes KNF from given Maxterms (as BooleanFunctions). \
       * NOTE: The given Maxterms are deep cloned before encapsulating
       * them in a BooleanFunction.
       * @param {[BooleanFunction]} maxTerms
       * @returns {BooleanFunction} BooleanFunction representing the KNF
       */

  }, {
    key: "computeKNF",
    value: function computeKNF(maxTerms) {
      // deep clone maxTerms array
      var maxTermsCloned = [];

      for (var i = 0; i < maxTerms.length; i++) {
        maxTermsCloned[i] = maxTerms[i].clone();
      }

      return new BooleanFunction$1(BooleanFunctionOperator_AND, maxTermsCloned);
    }
  }]);

  return BooleanFunctionNF;
}();

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

function optimizeBooleanFunction(kvdiagram) {
  var util = new BooleanFunctionUtil(); // base terms

  var minTerms = computeMinTermsFromKV(kvdiagram);
  var maxTerms = computeMaxTermsFromKV(kvdiagram);
  var dontCareMinTerms = computeDontCareMinTermsFromKV(kvdiagram);
  var dontCareMaxTerms = util.convertMinTermsToMaxTerms(dontCareMinTerms); // normal forms

  var computerNF = new BooleanFunctionNF();
  var dnf = computerNF.computeDNF(minTerms);
  var knf = computerNF.computeKNF(maxTerms); // quine cluskey classes

  var quineClasses = computeQuineCluskeyClasses(minTerms, maxTerms, dontCareMinTerms); // primes

  var primes = computePrimes(quineClasses, dontCareMinTerms, dontCareMaxTerms); // Ueberdeckungstabelle

  var primeTableObj = computePrimeTable(minTerms, maxTerms, primes, true); // Petrick Ausdruck

  var petrickStatement = computePetrickStatement(primeTableObj); // Minimal forms

  var dmf = computeDMF(petrickStatement);
  var kmf = computeKMF(petrickStatement);
  return {
    dnf: dnf,
    // BooleanFunction
    knf: knf,
    // BooleanFunction
    quineClasses: quineClasses,
    primes: primes,
    primeTable: primeTableObj,
    petrickStatement: petrickStatement,
    dmf: dmf,
    // BooleanFunction
    kmf: kmf // BooleanFunction

  };
}

export { AdditionBaseNComplement, AdditionBaseNComplementToLatex, AdditionBaseNSigned, AdditionBaseNSignedToLatex, AdditionBaseNSignedToObject, AdditionIEEE, AdditionIEEEToLatex, AdditionIEEEToObject, AdditionPolyadic, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_ABSORPTION, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_DISTRIBUTION, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_IDEMPOTENCE, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_INITIAL, BOOLEAN_FUNCTION_PETRICK_STATEMENT_STEP_SORTING, BOOLEAN_FUNCTION_PRIME_TABLES_STEP_COLUMN_DOMINATION, BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_COLUMN_BC_COVERED, BOOLEAN_FUNCTION_PRIME_TABLES_STEP_CROSS_ROW_BC_COVERED, BOOLEAN_FUNCTION_PRIME_TABLES_STEP_FOUND_CORE, BOOLEAN_FUNCTION_PRIME_TABLES_STEP_HAS_CYCLIC_REST, BOOLEAN_FUNCTION_PRIME_TABLES_STEP_ROW_DOMINATION, BooleanFunction$1 as BooleanFunction, BooleanFunctionLiteral, BooleanFunctionOperator_AND, BooleanFunctionOperator_OR, BooleanFunctionUtil, CMOS$1 as CMOS, CMOSBuilder, CMOS as CMOSOLD, CMOSVisualBuilder, ComparisonBaseNSigned, ConversionPolyadicNumbers, DivisionBaseNSigned, DivisionIEEE, KVDiagram, LatexGenerator, MultiplicationBaseNComplement, MultiplicationBaseNComplementToLatex, MultiplicationBaseNSigned, MultiplicationBaseNSignedToLatex, MultiplicationBaseNSingleDigit, MultiplicationIEEE, NumberBaseNSigned, NumberPolyadic, SVGGenerator, SubtractionBaseNComplement, SubtractionBaseNComplementToLatex, SubtractionBaseNSigned, SubtractionBaseNSignedToLatex, SubtractionIEEE, SubtractionPolyadic, TextCMOS, computePrimesFromKV, generateRandomKVDiagram, getBaseNComplementFromString, getIEEEFromString, getNumFromString, optimizeBooleanFunction, parseBooleanFunction, roundArray, toLaTeX };
