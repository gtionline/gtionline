<template>
  <div
    class="kvDiagram"
    @click="((a) => $emit('clicked-somewhere', a))"
  >
    <svg
      id="kvContainer"
      ref="svgdom"
      :width="svgWidth"
      :height="svgHeight"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g :transform="`translate(${extraWidths[1]}, ${0})`">
        <g
          v-for="(d, i) in diagram"
          :key="`cell_${i}`"
          :transform="`translate(${getX(i)}, ${getY(i)})`"
        >
          <rect
            fill="transparent"
            stroke="#898989"
            :width="blockWidth"
            :height="blockWidth"
            @click="modifiable ? changeNumber(i) : {}"
          />
          <!-- <text :x="blockWidth / 2" :y="blockWidth / 2" dominant-baseline="middle"
          class="unclickable" text-anchor="middle">{{legitStates[d.number]}}</text> -->
          <text
            :x="blockWidth / 2"
            :y="blockWidth / 2"
            dominant-baseline="middle"
            class="unclickable"
            text-anchor="middle"
          >{{ legitStates[d.number] }}</text> <!-- Check if this .number does what it should-->
          <text
            :x="blockWidth - 3"
            :y="blockWidth - 7"
            dominant-baseline="middle"
            class="unclickable indexNumber"
            font-size="13"
            text-anchor="end"
          >{{ indices[i].index }}</text>
        </g>
        <g
          v-for="bar in literalBars"
          :key="bar.id"
        >
          <rect
            :x="bar.x"
            :y="bar.y"
            :width="bar.width"
            :height="bar.height"
          />
          <g
            ref="bars"
            :transform="`translate(${bar.textX}, ${bar.textY})`"
            v-html="getSVG(bar.index)"
          />
        </g>
        <rect
          id="unclickable"
          class="unclickable"
          fill="none"
          stroke="black"
          :x="paddingHorizontal"
          :y="paddingVertical"
          :width="blockWidth * cellsHorizontal"
          :height="blockWidth * cellsVertical"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { KVDiagram } from '@/scripts/algorithms/booleanFunctions/KVDiagram';

export default {
  name: 'KVDiagram',
  components: {},
  props: {
    numVariables: {
      type: Number,
      default: 4,
    },
    varNames: {
      type: Array,
      default: () => [],
    },
    modifiable: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'kvdiagram-modified',
    'requesting-kvdiagram-data-after-reactivation',
    'clicked-somewhere',
  ],
  data() {
    return {
      indexBaseSystem: 8,

      paddingBase: 27,
      blockWidth: 40,
      diagram: reactive([]),
      legitStates: ['0', '1', '-'],
      barHeight: 3,
      barDistance: 10,

      extraWidths: {
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
      },
    };
  },
  computed: {
    cellsHorizontal() {
      return (2 ** Math.floor((this.numVariables + 1) / 2));
    },
    cellsVertical() {
      return (2 ** Math.floor(this.numVariables / 2));
    },
    paddingHorizontal() {
      return 10 + this.paddingBase * (Math.floor(Math.abs(this.numVariables - 2) / 4) + 1);
    },
    paddingVertical() {
      return 7 + this.paddingBase * (Math.floor(Math.abs(this.numVariables - 1) / 4) + 1);
    },
    svgWidth() {
      return this.paddingHorizontal * 2 + this.cellsHorizontal * this.blockWidth + this.extraWidths[1] + this.extraWidths[3];
    },
    svgHeight() {
      return this.paddingVertical * 2 + this.cellsVertical * this.blockWidth;
    },
    coveredAreaPerVariable() {
      const coveredRows = [];
      for (let i = 0; i < this.numVariables; i += 1) {
        const order = Math.floor(i / 2);
        const index = 2 ** order;
        const coveredVar = [];
        for (let j = index; j < 2 * index; j += 1) {
          coveredVar.push(j);
        }
        // mirror all the covered cells before
        for (let j = i - 2; j >= 0; j -= 2) {
          const covered = coveredRows[j];
          const coveredLength = covered.length;
          for (let k = 0; k < coveredLength; k += 1) {
            covered[2 * coveredLength - 1 - k] = (2 * index - 1 - covered[k]);
          }
          coveredRows[j] = covered;
        }
        coveredRows.push(coveredVar);
      }
      const coveredAreaPerVar = [];
      for (let i = 0; i < this.numVariables; i += 1) {
        coveredAreaPerVar.push({
          isVertical: i % 2 === 0,
          varIndex: i,
          coveredRows: coveredRows[i],
        });
      }
      return coveredAreaPerVar;
    },
    indices() {
      const arr = [];
      for (let i = 0; i < this.cellsHorizontal * this.cellsVertical; i += 1) {
        const x = (i % this.cellsHorizontal);
        const y = Math.floor(i / this.cellsHorizontal);
        let index = '';
        for (const c of this.coveredAreaPerVariable) {
          if (c.isVertical) {
            index += c.coveredRows.includes(x) ? '1' : '0';
          } else {
            index += c.coveredRows.includes(y) ? '1' : '0';
          }
        }
        arr.push({
          binary: index,
          // index: parseInt(index.split('').reverse().join(''), 2),
          index: parseInt(index.split('').reverse().join(''), 2).toString(this.indexBaseSystem),
        });
      }
      return arr;
    },
    literalBars() {
      const bars = [];
      for (const c of this.coveredAreaPerVariable) {
        let startIndex = c.coveredRows[0];
        let endIndex = c.coveredRows[0];
        const intervals = [];
        for (let i = 1; i < c.coveredRows.length; i += 1) {
          if (c.coveredRows[i] === endIndex + 1) {
            endIndex += 1;
          } else {
            intervals.push([startIndex, endIndex]);
            startIndex = c.coveredRows[i];
            endIndex = c.coveredRows[i];
          }
        }
        intervals.push([startIndex, endIndex]);
        for (const [i, interval] of intervals.entries()) {
          const intervalLength = (interval[1] - interval[0] + 1) * this.blockWidth;
          const width = c.isVertical ? intervalLength : this.barHeight;
          const height = c.isVertical ? this.barHeight : intervalLength;
          const index = c.varIndex;
          // String.fromCharCode(97 + c.varIndex);
          const id = `bar${c.varIndex}_${i}`;
          const level = Math.floor(c.varIndex / 4);
          const dist = this.barDistance + this.paddingBase * level;
          let x = 0;
          let y = 0;
          let textX = 0;
          let textY = 0;
          if (c.isVertical) {
            x = this.paddingHorizontal + interval[0] * this.blockWidth;
            y = c.varIndex % 4 === 0
              ? this.paddingVertical - dist
              : this.paddingVertical + this.blockWidth * this.cellsVertical + dist;
            textX = x + width / 2 - 5;
            textY = c.varIndex % 4 === 0 ? y - 12 : y + 10;
          } else {
            x = (c.varIndex + 1) % 4 === 0
              ? this.paddingHorizontal + this.blockWidth * this.cellsHorizontal + dist
              : this.paddingHorizontal - dist;
            y = this.paddingVertical + interval[0] * this.blockWidth;
            textX = (c.varIndex + 1) % 4 === 0 ? x + 9 : x - 13;
            textY = y + height / 2 - 5;
            // varNamingScheme using 'x_0'... and 'x_1'... need more horizontal space
            // if placed to the left of the KVDiagram

            // if ((this.varNames[0] === 'x_0' || this.varNames[0] === 'x_1') && (c.varIndex + 1) % 4 !== 0) {
            //   textX -= 7;
            // const labelWidth = this.varNames[this.varNamingScheme][c.varIndex].length;
            if ((c.varIndex + 1) % 4 !== 0) {
              textX -= this.extraWidths[c.varIndex];
              //   textX -= 7;
            }
          }
          bars.push({
            x, y, width, height, textX, textY, index, id,
          });
        }
      }
      return bars;
    },
  },
  watch: {
    numVariables(newAmount, oldAmount) {
      if (newAmount === oldAmount || newAmount < 1) {
        return;
      }
      this.reconstruct();
      // console.log('KVDiagrams internal watch function registered a change in numVariables! Set to ', newAmount);
    },
  },
  created() {
    // console.log('modifiable: ');
    // console.log(this.modifiable);
    for (let i = 0; i < this.cellsHorizontal * this.cellsVertical; i += 1) {
      this.diagram.push({ number: 0 });
    }
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  },
  activated() {
    // console.log('Request!');
    // console.log('activated kv');
    // tell parent that this wants to have new KVDiagram after it has been activated,
    // since maybe the bf has changed in the meantime through some
    // other means (e.g. other BF Input Method like BFTable)
    this.$emit('requesting-kvdiagram-data-after-reactivation');
  },
  mounted() {
    // console.log('Request!');
    // console.log('mounted');
    // this is for the "ResultKVDiagram", so that it requests data after its Accordion-Item is opened
    this.$emit('requesting-kvdiagram-data-after-reactivation');
  },
  methods: {
    /**
     * Returns JS / KVDiagram representation of this filled diagram.
     */
    getKVDiagram() {
      // compute js representation of KVDiagram from flat diagram
      const diagram2D = [];
      for (let row = 0; row < this.cellsVertical; row += 1) {
        diagram2D[row] = [];
        for (let col = 0; col < this.cellsHorizontal; col += 1) {
          diagram2D[row][col] = this.legitStates[this.diagram[(row * this.cellsHorizontal) + col].number];
        }
      }
      const kvdiagram = new KVDiagram(diagram2D, this.numVariables);
      return kvdiagram;
    },
    setKVDiagram(kvdiagram) {
      // overwrite numvariables
      // this.numVariables = kvdiagram.getAmountLiterals();
      // console.log('Overwriting this.numVariables in KVDiagram.vue > setKVDiagram()');

      // init diagram with zeros
      const diagram = reactive([]);
      for (let i = 0; i < this.cellsHorizontal * this.cellsVertical; i += 1) {
        diagram.push({ number: '0' });
      }

      // copy values over
      const values = kvdiagram.getValues();
      for (let y = 0; y < values.length; y += 1) {
        for (let x = 0; x < values[y].length; x += 1) {
          const flatPos = y * this.cellsHorizontal + x;
          diagram[flatPos].number = this.legitStates.indexOf(values[y][x].toString());
        }
      }
      this.diagram = diagram;
      // console.log('In KVDiagr::setKVDiagram(..): setting KVDiagram\n-js: ', kvdiagram, ',\n-flat: ', this.diagram, ').');
    },
    getX(i) {
      return this.paddingHorizontal + (i % this.cellsHorizontal) * this.blockWidth;
    },
    getY(i) {
      return this.paddingVertical + Math.floor(i / this.cellsHorizontal) * this.blockWidth;
    },
    changeNumber(i) {
      this.diagram[i].number = (this.diagram[i].number + 1) % this.legitStates.length;
      this.$emit('kvdiagram-modified', this.getKVDiagram());
    },
    getSVG(id) {
      const formula = this.varNames[id];
      if (formula == null) {
        return '';
      }
      const formulaSVG = window.MathJax.tex2svg(formula);
      const svgmath = formulaSVG.getElementsByTagName('svg')[0];
      // Stupid hack
      const widthInEx = parseFloat(svgmath.getAttribute('width').slice(0, -2));
      const extraWidth = Math.round((widthInEx - 1) * 8);
      this.extraWidths[id] = extraWidth;
      return svgmath.outerHTML;
    },
    toSvg(formula) {
      const formulaSVG = window.MathJax.tex2svg(formula);
      const svgmath = formulaSVG.getElementsByTagName('svg')[0];
      return svgmath.outerHTML;
    },
    reconstruct() {
      this.diagram = reactive([]);
      for (let i = 0; i < this.cellsHorizontal * this.cellsVertical; i += 1) {
        this.diagram.push({ number: '0' });
      }
    },
    getSVGDOM() {
      /* used to get the SVG DOM, upon user requesting to export svg as PNG */
      return this.$refs.svgdom;
    },
  },
};
</script>

<style lang="scss">
.kvDiagram {
  max-width: -webkit-fill-available;
  overflow: auto;
}
.unclickable {
  pointer-events: none;
}
.indexNumber {
  font-size: 12px;
}
.divMargin {
  display: inline-block;
  width: 10px;
}
.radioSvg {
  display: inline-block;
  vertical-align: 0.9em;
  svg {
    vertical-align: 0;
  }
}
#kvContainer {
  margin-top: 20px;

  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

  cursor: pointer;
  pointer-events: bounding-box;
  // overflow: auto;
  // display: block !important;

  /* Makes KVDiagram entries unselectable */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.pretty {
  height: 1em;
}
</style>
