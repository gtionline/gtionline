/**
 * Type for the KV diagram values
 * 0 = False, 1 = True, 2 = Don't Care, '-' = Don't Care (string version)
 */
type KVValue = 0 | 1 | 2 | '0' | '1' | '-';
type KVMatrix = KVValue[][];

/**
 * Class encapsulating a KVDiagram / Symmetriediagramm
 */
export class KVDiagram {
  private _amountLiterals: number;
  private _values: KVMatrix;
  private _literalToKVMapping: [number, number[]][];

  /**
   * @param values values[y][x] (also [row, row, ...])
   * 0 / 1 / 2=DontCare
   * pass null for a KVDiagram with only Zeros
   */
  constructor(values: KVMatrix | null, amountLiterals: number) {
    this._amountLiterals = amountLiterals;
    this._literalToKVMapping = [];
    if (values != null) {
      this._values = values;
    } else {
      const diagramWidth = (2 ** Math.floor((amountLiterals + 1) / 2));
      const diagramHeight = (2 ** Math.floor(amountLiterals / 2));
      const vals: KVMatrix = [];
      for (let y = 0; y < diagramHeight; y += 1) {
        vals[y] = [];
        for (let x = 0; x < diagramWidth; x += 1) {
          vals[y][x] = 0;
        }
      }
      this._values = vals;
    }

    this._generateLiteralToKVMapping();
  }

  getAmountLiterals(): number {
    return this._amountLiterals;
  }

  getValues(): KVMatrix {
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
  computeKVIndex(y: number, x: number) {
    let index = 0;
    for (let i = 0; i < this._amountLiterals; i += 1) {
      if (this._literalToKVMapping[i][0] === 0 || this._literalToKVMapping[i][0] === 2) {
        // literal acts on columns
        for (let j = 0; j < this._literalToKVMapping[i][1].length; j += 1) {
          if (x === this._literalToKVMapping[i][1][j]) {
            index += 2 ** i;
            break;
          }
        }
      } else {
        // literal acts on rows
        for (let j = 0; j < this._literalToKVMapping[i][1].length; j += 1) {
          if (y === this._literalToKVMapping[i][1][j]) {
            index += 2 ** i;
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
  equals(other: KVDiagram): boolean {
    if (this._amountLiterals !== other._amountLiterals) {
      return false;
    }

    if (this._values.length !== other._values.length) {
      return false;
    }

    // loop through columns
    for (let y = 0; y < Math.max(this.getValues().length, other.getValues().length); y += 1) {
      if (this.getValues()[y] === undefined || other.getValues()[y] === undefined
        || this.getValues()[y].length !== other.getValues()[y].length) {
        return false;
      }

      // loop through rows
      for (let x = 0; x < Math.max(this.getValues()[y].length, other.getValues()[y].length); x += 1) {
        if (this.getValues()[y][x] === undefined || other.getValues()[y][x] === undefined
          || this.getValues()[y][x] !== other.getValues()[y][x]) {
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
  private _generateLiteralToKVMapping(): void {
    this._literalToKVMapping = [];

    // const width = this._values[0].length;
    // const height = this._values.length;
    const width = 2 ** Math.floor((this._amountLiterals + 1) / 2);
    const height = 2 ** Math.floor(this._amountLiterals / 2);
    for (let i = 0; i < this._amountLiterals; i += 1) {
      this._literalToKVMapping[i] = [i % 4, []];
      // now get overlayed
      if (this._literalToKVMapping[i][0] === 0 || this._literalToKVMapping[i][0] === 2) {
        // spaltenüberwachung
        // wie oft gespiegelt
        const gespiegelt = Math.round(Math.log2(width / 2));
        // wie viel felder überdeckt die nicht gespiegelte Variante
        const wieVielteSpaltenCover = i / 2;
        const basisFelder = 2 ** wieVielteSpaltenCover;
        // first column is 2er-potence
        const first = 2 ** (i / 2);
        for (let o = 0; o < basisFelder; o += 1) {
          this._literalToKVMapping[i][1].push(first + o);
        }
        // now compute rest of cells
        for (let j = 0; j < gespiegelt - wieVielteSpaltenCover; j += 1) {
          // durchlaufe das komplette array und spiegel alle werte nach hinten
          const oldLength = this._literalToKVMapping[i][1].length;
          for (let k = oldLength - 1; k >= 0; k -= 1) {
            const partWidth = 2 ** (2 + j + wieVielteSpaltenCover);
            const newIndex = partWidth - 1 - this._literalToKVMapping[i][1][k];
            this._literalToKVMapping[i][1].push(newIndex);
          }
        }
      } else {
        const gespiegelt = Math.round(Math.log2(height / 2));
        // wie viel felder überdeckt die nicht gespiegelte Variante
        const wieVielteZeilenCover = (i - 1) / 2;
        const basisFelder = 2 ** wieVielteZeilenCover;
        // first row is 2er-potence
        const first = 2 ** ((i - 1) / 2);
        for (let o = 0; o < basisFelder; o += 1) {
          this._literalToKVMapping[i][1].push(first + o);
        }
        // now compute rest of cells
        for (let j = 0; j < gespiegelt - wieVielteZeilenCover; j += 1) {
          // durchlaufe das komplette array und spiegel alle werte nach hinten
          const oldLength = this._literalToKVMapping[i][1].length;
          for (let k = oldLength - 1; k >= 0; k -= 1) {
            const partHeight = 2 ** (2 + j + wieVielteZeilenCover);
            const newIndex = partHeight - 1 - this._literalToKVMapping[i][1][k];
            this._literalToKVMapping[i][1].push(newIndex);
          }
        }
      }
    }
  }
}

export function generateRandomKVDiagram(amountLiterals: number, notPracticallyEmptyOrFull: boolean = false): KVDiagram {
  const diagramWidth = (2 ** Math.floor((amountLiterals + 1) / 2));
  const diagramHeight = (2 ** Math.floor(amountLiterals / 2));

  let amountOnes: number;
  let amountZeros: number;
  let values: KVMatrix;

  do {
    amountOnes = 0;
    amountZeros = 0;

    values = [];
    for (let y = 0; y < diagramHeight; y += 1) {
      values[y] = [];
      for (let x = 0; x < diagramWidth; x += 1) {
        const r = Math.random();
        if (r < 1 / 3.0) {
          values[y][x] = '0';
          amountZeros += 1;
        } else if (r < 2 / 3.0) {
          values[y][x] = '1';
          amountOnes += 1;
        } else {
          values[y][x] = '-';
        }
      }
    }
  } while (notPracticallyEmptyOrFull && (amountZeros === 0 || amountOnes === 0));

  return new KVDiagram(values, amountLiterals);
}
