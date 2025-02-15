{
  const BooleanOperation = options.BooleanOperation;
  const makeFunction = options.makeBooleanFunction;
  const makeOperation = options.makeBooleanOperation;
  const makeVariable = options.makeBooleanVariable;
  const makeLiteral = options.makeBooleanLiteral;
}

Function
    = name:(Variable "=")? expression:Expression {
      return makeFunction(name ? name[0].toString() : null, expression);
    }

Expression
    = XorTerm

XorTerm
    = head:XnorTerm tail:(("^" / "xor") XnorTerm)* {
      if (tail.length > 0) {
        return makeOperation(BooleanOperation.XOR, [head].concat(tail.map(function(x) { return x[1]; })), false);
      } else {
        return head;
      }
    }

XnorTerm
    = head:NorTerm tail:(("<=>" / "xnor") NorTerm)* {
      if (tail.length > 0) {
        return makeOperation(BooleanOperation.XNOR, [head].concat(tail.map(function(x) { return x[1]; })), false);
      } else {
        return head;
      }
    }

NorTerm
    = head:OrTerm tail:(("nor") OrTerm)* {
      if (tail.length > 0) {
        return makeOperation(BooleanOperation.NOR, [head].concat(tail.map(function(x) { return x[1]; })), false);
      } else {
        return head;
      }
    }

OrTerm
    = head:NandTerm tail:(("+" / "|" / "or") NandTerm)* {
      if (tail.length > 0) {
        return makeOperation(BooleanOperation.OR, [head].concat(tail.map(function(x) { return x[1]; })), false);
      } else {
        return head;
      }
    }

NandTerm
    = head:AndTerm tail:("nand" AndTerm)* {
      if (tail.length > 0) {
        return makeOperation(BooleanOperation.NAND, [head].concat(tail.map(function(x) { return x[1]; })), false);
      } else {
        return head;
      }
    }

AndTerm
    = head:NotTerm tail:(("*" / "&" / "and") NotTerm)* {
      if (tail.length > 0) {
        return makeOperation(BooleanOperation.AND, [head].concat(tail.map(function(x) { return x[1]; })), false);
      }
      else {
        return head;
      }
    }

NotTerm
    = Whitespace* ("!" / "~" / "not") term:PrimaryTerm {
      return makeOperation(BooleanOperation.NOT, term, false);
    }
    / term:PrimaryTerm

PrimaryTerm
    = variable:Variable
    / literal:Literal
    / LeftParenthesis term:Expression RightParenthesis {
      term.hasParentheses = true;
      return term;
    }

Literal
    = Whitespace* value:("0" / "1") Whitespace* {
      return makeLiteral(value);
    }

Variable
    = !Operators Whitespace* characters:([a-zA-Z]+[0-9]*) Whitespace* {
      return makeVariable(characters[0].join('') + characters[1].join(''));
    }

LeftParenthesis
    = Whitespace* "(" Whitespace*
RightParenthesis
    = Whitespace* ")" Whitespace*

Whitespace
    = [ \t\r\n]+

Operators
    = "and" / "or" / "xor" / "not" / "xnor" / "nand" / "nor"
