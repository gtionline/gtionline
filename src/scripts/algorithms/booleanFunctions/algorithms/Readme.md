# DNF / KNF

*see [BooleanFunctionNF.js](./BooleanFunctionNF.js)*
### API
```js
computeDNFFromKV(KVDiagram) : BooleanFunction
computeKNFFromKV(KVDiagram) : BooleanFunction
```
### Return value
```js
optimizeBooleanFunction(KVDiagram) : {
    ...
    dnf: BooleanFunction {
        _terms: [
            BooleanFunction {
                _terms: [
                    BooleanFunctionLiteral { _id: 0, _negated: true },   
                    BooleanFunctionLiteral { _id: 1, _negated: true }
                ], _logicOperator: '*' },
            BooleanFunction {
                _terms: [
                    BooleanFunctionLiteral { _id: 0, _negated: true },
                    BooleanFunctionLiteral { _id: 1, _negated: false }
                ], _logicOperator: '*' }
        ],
        _logicOperator: '+'
    },
    ...
}
```


# Quine MC Cluskey classes
*see [BooleanFunctionQuineCluskey.js](BooleanFunctionQuineCluskey.js)*
### API
```js
computeQuineCluskeyClassesFromKV(KVDiagram) : {/*see below*/}
```
### Return value
```js
{
    'min-terms': [[..]] /* 2d array of classes for PrimimplikaNten */,
    'max-terms': [[..]] /* 2d array of classes for Primimplikate */
}
```
A 2d array collection of classes is structured in the following manner:
```js
classes[class_amount_literals][class_amount_negations][nth term] =
    [
        BooleanFunction /* possibly shortened term */,
        Boolean /* stating if this term was absorbed / eliminated */
    ]
```
e.g. the seventh ~~prime~~ term in Q_3_2 being at: \
`array[3][2][6][0] `: BooleanFunction \
and the boolean specifiying if it was absorbed (crossed out) at: \
`array[3][2][6][1] `: Boolean

### Note
The length attribute of the class arrays (in every dimension) is always well defined and [0] always points to *something*, meaning the following for loop should be ok.
```js
for(let c = 0; c < classes.length; c++) {
    for(let n = 0; n < classes[c].length; n++) {
        ..
    }
}
```


# Primes / Primimplika(n)te(n)
*see [BooleanFunctionPrimes.js](BooleanFunctionPrimes.js)*
### API
```js
computePrimesFromKV(KVDiagram) : {/*see below*/}
```
### Return value
```js
{
    'min-terms': [BooleanFunction, ..], /* Array of Primimplikanten */
    'max-terms': [BooleanFunction, ..]  /* Array of Primimplikate */
}
```
Note that if a BooleanFunctionLiteral does not need to be present, i.e. two terms were shortened because they only differed in the literal Y, that Y will not be present in the resulting term. Thus BooleanFunctions found in some Class Q_z_b will only have *z* Terms/Literals. Therefore there is (currently ;p) no need for any 'Dont Care Literal'-Objects. 

That means that looping over the terms of the individual BooleanFunctions will only give you Literals that would actually appear if you were to write it down on paper.





# Prime Table / Ueberdeckungstabelle
*see [BooleanFunctionPrimeTables.js](BooleanFunctionPrimeTables.js)*
### API
```js
computePrimeTableFromKV(KVDiagram) : {/* see below */}
```
### Return value
```js
{
    'min-terms': {
        'coverTable': [[Boolean, ..], ..],        
        'baseTerms': [BooleanFunction, ..],
        'primeTerms': [BooleanFunction, ..],
        'steps': [Step, ..],
        'cyclic': boolean
    },
    'max-terms': {
        /* same as above, but Primimplikate were used as basis */
    }
}
```
### `coverTable`:
2D matrix (coverTable[x][y]) stating in which cells a 'X' was placed (->true) and in which not. Counting starts at [0][0] with the first cell.
### `baseTerms`:
Array of BooleanFunctions which stand above their column. Counting starts at 0.
### `primeTerms`:
Array of prime terms that would be displayed to the left of a row. Counting starts at 0.
### `steps`:
Array of instances of class Step in *BooleanFunctionPrimeTables.js*.
### `cyclic`:
Boolean stating if the table has is cyclic rest, that could not be solved by this algorithm.

Steps could be iterated over to show the user step by step what the algorithm did.

## Class Step
See the comments around/in the class in code for further info.

The following table describes which values (attributes) of a Step instance are set depending on its actionType. Attributes can be accessed directly (e.g. `stepInstance.coveredBy` ).

*actionTypeIDs are constants defined in the file, all start with BOOLEAN_FUNCTION_PRIME_TABLES_STEP*
| Description | Attributes set | actionTypeID ending |
| - | - | - |
| Some column is only covered by one primeterm, thus that one is a core term. Cross column out. | core, column | _FOUND_CORE |
| Some column is already being covered. Cross it out.| column, coveredBy |_CROSS_COLUMN_BC_COVERED|
| Some rows' crosses are already being covered completely. Cross it out.| row |_CROSS_ROW_BC_COVERED|
| Some row dominates another row. Cross dominated row out. (Cost analysis of both rows was taken in account) | dominator, dominated | _ROW_DOMINATION |
| Some column dominates another column. Cross dominatING column out. (Cost analysis of both columns was taken in account) | dominator, dominated | _COLUMN_DOMINATION |
| Now, a cyclic rest exists that cannot be minimized by the PrimeTable approach. Always the last step in the array. Meaning of .cyclic and existance of this step is identical. |  | _HAS_CYCLIC_REST |


# Petrick Ausdruck / Petrick Statment
*see[BooleanFunctionPetrickStatement.js](BooleanFunctionPetrickStatement.js)*
### API
```js
computePetrickStatementFromKV(KVDiagram): {/*see below*/}
```
### Return value
```js
{
    'min-terms': {
        expressionDirect: [String],     expressionDirectStr: String,
        expressionAbsorbed: [String],   expressionAbsorbedStr: String,
        expressionExpanded: [String],   expressionExpandedStr: String,
        expression: [String],           expressionStr: String,
        
        cheapestSolution: String,

        /*additional info for MF computation*/
        cheapestSolutionIndex: Number,
        PRIMETERM_SYMBOL_BASE_CHAR_CODE: Number,
        primeTerms: [BooleanFunction, ..]
    },
    'max-terms': {/*...*/}
}
```

### `expression<...>`
*see 'Steps' below*

Snapshot of a step in solving the petrick statement mathematically.

Array of Strings building the statment e.g.
```js
["ABC", "ABD", "CBD"] //=> (A op B op C) op (A op ... = 1 
```

### `expression<...>Str`
Human readable, mathematically correct string representation of step <...> as shown below in section 'Steps'.
((doesnt) use brackets and different OPs depending on the step)

### Steps:
1) expressionDirect: e.g. `(A)*(C)*(A+B)*(B+D)*(C+D)` \
    -> Absorption + Idempotenz ->
2) expressionAbsorbed: e.g. `(A)*(C)*(B+D)` \
    -> Ausdistribuieren ->
3) expressionExpanded: e.g. `ABC+ACD` \
    -> Absorption + Idempotenz + Sortierung ->
4) expression: The final petrick statement e.g. `ABC+ACD`

### `cheapestSolution`
String of cheapest solution. (e.g. "ACD")

## Note:
PRIMETERM_SYMBOL_BASE_CHAR_CODE is the charcode of the 0th prime term.
It could therefore be used to change the prime term representation from ABC... to something like abc... or 012... or any other series of chars. When using numbers, one should be aware that if there are more prime terms than digits (-> 10), the algorithm will probably work, but not 11(eleven), but the ASCII value after 9 will be used for the 11th prime term.

In further development this value (which is declared in the _computePetrickStatement(..)) could be somehow passed to the algorithm from the outside.





# DMF / KMF

*see [BooleanFunctionMF.js](./BooleanFunctionMF.js)*
### API
```js
computeDMFFromKV(KVDiagram) : BooleanFunction
computeKMFFromKV(KVDiagram) : BooleanFunction
```
### Return value
```js
optimizeBooleanFunction(KVDiagram) : {
    ...
    dmf: BooleanFunction {
        _terms: [
            BooleanFunction {
                _terms: [
                    BooleanFunctionLiteral { _id: 0, _negated: true },   
                    BooleanFunctionLiteral { _id: 1, _negated: true }
                ], _logicOperator: '*' },

            /* ... */
        ],
        _logicOperator: '+'
    },
    kmf: BooleanFunction {/* ... */ },
    ...
}
```