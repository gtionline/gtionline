# tl;dr
*see BooleanFunctionOptimizer.js:*
```js
Object optimizeBooleanFunction(KVDiagram);
```

Takes KVDiagram (see below), \
returns Object containing following optimizations (in lowercase):
- DNF
- KNF
- DMF
- KMF
- QuineMCCluskey classes
- Prime terms (Primimplika(n)te(n))
- Prime Table / Cover Table / Ueberdeckungstabelle
- Petrick Statement

for example:
```js
{
    dnf: BooleanFunction { _terms: [BooleanFunction, Boo...], _logicOperator: '+'},
    knf: BooleanFunction { _terms: [BooleanFunction, Boo...], _logicOperator: '*'},
    dmf: BooleanFunction { _terms: [BooleanFunction, Boo...], _logicOperator: '+'},
    kmf: BooleanFunction { _terms: [BooleanFunction, Boo...], _logicOperator: '*'},,
    quineClasses: { 'min-terms': [[..]], 'max-terms': [[..]] },
    primes: { 'min-terms': [BooleanFunction, ..], 'max-terms': [Boo.., ..] }
    primeTable: { 'min-terms': {..}, 'max-terms': {..} },
    petrickStatement: { 'min-terms': {..}, 'max-terms': {..} }
}
```
### For Documentation on individual return values / Algorithms see [Algorithms/Readme.md](Algorithms/Readme.md)







# The following section is to give a quick introduction to what all the algorihms build upon
<br>
<br>

# KVDiagram / Symmetriediagramm
*see 'KVDiagram.js'*

Class encapsulating a single KVDiagram instance with values.

```js
new KVDiagram(values, amountLiterals) { .. }
```
- *values*: 2D array of the diagram. Stored <b>row</b>-wise *-> values[y][x]*.
- *amountLiterals*: number of distinct variables in the function

You can generate a BooleanFunctions KVDiagram via [BooleanFunctionUtil.js > generateKVDiagramFromBooleanFunction(bf)](BooleanFunctionUtil.js)

# Boolean Function / Schaltfunktion
*see 'BooleanFunction.js'* \
*see 'BooleanFunctionLiteral.js'*

### Represents a Schaltalgebraische expression.

Each function consists of multiple sub terms. A sub term can either be a BooleanFunction (that consists of subterms itself), or a BooleanFunctionLiteral.

e.g.
```js
BooleanFunction {
    _terms: [        
        BooleanFunctionLiteral { _id: 0, _negated: true },
        BooleanFunction { _terms: [..], _logicOperator: '*'},
        BooleanFunctionLiteral { _id: 1, _negated: false }
    ],
    _logicOperator: '+'
}
```

### Every function has a '_logicOperator', e.g. the mathematical symbol between individual terms
e.g
```js
BooleanFunction { _terms: [ /*Minterms*/ ], _logicOperator: '+' } //DNF
```
Valid Logic Operators include:
- BooleanFunctionOperator_AND
- BooleanFunctionOperator_OR
- BooleanFunctionOperator_NOT _NOTE: Makes the BooleanFunction unary. See the section below._

As defined in the top of [BooleanFunction.js](BooleanFunction.js)
### Negation of BooleanFunctions
A BooleanFunction with a \_logicOperator of _BooleanFunctionOperator_NOT_ specifies a unary function that negates its single subterm. If multiple terms are specified in the \_terms array of such a function, behaivior is undefined.

To get rid of all such unary negation functions within a BooleanFunction object, the functions expandBF(BooleanFunction) (GER: ausmultiplizieren) and flattenBF(BooleanFunction) in [BooleanFunctionUtil.js](BooleanFunctionUtil.js) may be used. See their specific documentations for use.
### String -> BooleanFunction
For generation of BooleanFunction objects from strings, a string parser (from the cmos module) is used in combination with the expandBF and flattenBF function to make negations only occur on the literals. See the following function in [BooleanFunctionUtil.js](BooleanFunctionUtil.js):
```js
parseStringToBF(string: BooleanFunction, boolean: expandAndFlatten) :
{
    bf: BooleanFunction // Resulting BooleanFunction
    variables: [string] // Array of variable names as found in the string. x0 is at index 0.
}
```
# Literals
*see BooleanFunctionLiteral.js*

A instance of class BooleanFunctionLiteral represents a single (not necessarily unique) boolean literal, e.g. x0 or x3 or a. \
A Literal is not defined by some name, but by its id. Multiple instances with the same id would, if written down on paper, have the same 'name'. \
Having all of the following instances somewhere during execution is completely legal and intended: 
```js
BooleanFunctionLiteral { _id: 0, _negated: true }   //  not x0
BooleanFunctionLiteral { _id: 3, _negated: false }, //      x3
BooleanFunctionLiteral { _id: 0, _negated: true }   //  not x0
BooleanFunctionLiteral { _id: 1, _negated: true },  //  not x1
BooleanFunctionLiteral { _id: 1, _negated: false }, //      x1
BooleanFunctionLiteral { _id: 2, _negated: false }, //      x2
```

# Misc information
## Internal String representation of BooleanFunctions (-Literals)
*see [BooleanFunctionUtil.js](BooleanFunctionUtil.js)* \
*> convertBaseTermToStringFormat(..)* \
*> convertStringFormatBaseTermToBooleanFunction(..)*

Some of the algorithms use the following string representation of boolean functions to compute stuff. Frontend probably does not need to use this format or the parser functions.

'1' represents the literal (as when written down on paper)\
'0' represents the negated literal (as when written down on paper) \
'\-' represents dont care 

The *logic operator* that semantically goes in beetween the individual literals is not defined in the format and is used loosely by context.

The literal of 'global' index 0 (-> *'x0'*/*'a'*) is the <b>last</b> in the string, e.g. [x2, x1, x0]

### Example
```js
'101-1' // => x4  OP  not x3  OP  x2  OP  x0
```