<template>
  <div class="fp-exercise pageContainer">
    <div class="bodyContainer">
      <p class="introduction">
        {{ $t('polyConvGenIntro') }}
      </p>
      <h4>{{ $t('generateEx') }}</h4>
      <div>
        <div class="floatingPointInput">
          <h5>{{ $t('randomExercise') }}:</h5>
          <button @click="generateExercise">
            {{ $t('generate') }}
          </button>
        </div>
        <div class="floatingPointInput">
          <h5>{{ $t('fp_from_archive') }}:</h5>
          <FSelect
            ref="archivedExercisesDropDownMenu"
            :options="archivedExerciseTitles"
            :sel="selectedArchivedExercise"
            @input="selectArchivedExercise"
          />
          <div class="divMargin" />
          <button @click="loadArchivedExercise">
            {{ $t('load') }}
          </button>
        </div>
      </div>
      
      <div
        id="exerciseField"
        v-html="exerciseText"
      />
      <!-- <h4>{{$t('ownSolution')}}</h4>
      <div class="solutionArea">
        <div class="solutionInput">
          <p>{{$t('signBit')}}</p>
          <input id="prop" :class="back" v-model="prop">
        </div>
        <button id="checkSolution" @click="checkSolution">{{$t('check')}}</button>
      </div> -->
      <h4>{{ $t('correctSolution') }}</h4>
      <div style="position: relative">
        <AttentionBanner :text="$t('attSolve')" />
        <!-- <div class="pdfGen">
          <button v-on:click="downloadPdf" v-if="this.solution">{{$t('getDescription')}}</button>
        </div> -->
      </div>
      <div id="solution">
        <Accordion :solution-description="solDescr">
          <AccordionItem
            v-for="panel in solDescr"
            :key="panel.name"
          >
            <template #accordion-item-title>
              {{ panel.name }}
            </template>
            <template #accordion-item-body>
              <span v-html="panel.text" />
              <Accordion v-if="panel.subpanels != null">
                <AccordionItem
                  v-for="subpanel in panel.subpanels"
                  :key="subpanel.name"
                >
                  <template #accordion-item-title>
                    {{ subpanel.name }}
                  </template>
                  <template #accordion-item-body>
                    <span v-html="subpanel.text" />
                  </template>
                </AccordionItem>
              </Accordion>
            </template>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import AttentionBanner from './AttentionBanner.vue';
import Accordion from './EmbeddedAccordion.vue';
import AccordionItem from './EmbeddedAccordionItem.vue';
import FormatSelect from './FormatSelect.vue';
import * as solution from '../scripts/polyadicSolution';
import * as description from '../scripts/DescriptionPolyadicConversion';
import * as pdf from '../scripts/generatePdfPolyadicConversion';
import { formatToPower } from '../scripts/polyadicUtil';
import { polyadicLoadArchivedExercise, polyadicGetArchivedExerciseTitles, polyadicGetExerciseIndexOfHandle } from '../scripts/polyadicArchivedExercises';

export default {
  name: 'PolyadicConversionExercise',
  components: {
    Accordion,
    AccordionItem,
    AttentionBanner,
    FSelect: FormatSelect,
  },
  data() {
    return {
      selectedFormat: ['decimal', 'binary'], // 0: in format, 1: out format
      power: [10, 10],
      mouseDown: false,
      solution: '',
      generated: false,
      solutionObject: '',
      solutionSteps: [],
      containerWidth: 500,
      watcher: '',
      prop: '',
      back: '',
      inputNum: '',
      modus: '',
      archivedExerciseTitles: [],
      selectedArchivedExercise: 0,
    };
  },
  computed: {
    falseFormatOutput() {
      return this.$t('falseFormat');
    },
    solDescr() {
      return this.solutionSteps;
    },
    formatOptions() {
      return {
        decimal: `${this.$t('decimal')} (${this.$t('systemInBase')}  10)`,
        binary: `${this.$t('binary')} (${this.$t('systemInBase')} 2)`,
        ternary: `${this.$t('ternary')} (${this.$t('systemInBase')} 3)`,
        quaternary: `${this.$t('quaternary')} (${this.$t('systemInBase')} 4)`,
        quinary: `${this.$t('quinary')} (${this.$t('systemInBase')} 5)`,
        senary: `${this.$t('senary')} (${this.$t('systemInBase')} 6)`,
        septenary: `${this.$t('septenary')} (${this.$t('systemInBase')} 7)`,
        octal: `${this.$t('octal')} (${this.$t('systemInBase')} 8)`,
        novenary: `${this.$t('novenary')} (${this.$t('systemInBase')} 9)`,
        hex: `${this.$t('hexadecimal')} (${this.$t('systemInBase')} 16)`,
      };
    },
    exerciseText() {
      if (this.inputNum === '') {
        return '';
      }
      return `${this.$t('polyadicExercise1')} ${this.formatOptions[this.selectedFormat[0]]} ${this.inputNum} ${this.$t('polyadicExercise3')} ${this.formatOptions[this.selectedFormat[1]]}.`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.containerWidth = Math.min(500, window.innerWidth - 250);
      });
      window.addEventListener('unload', () => {
        this.containerWidth = Math.min(500, window.innerWidth - 250);
      });
      if (this.default) {
        this.recalculate();
        this.drawExercise();
        this.generated = true;
      }
    });
    // Load archived exercise titles
    this.archivedExerciseTitles = polyadicGetArchivedExerciseTitles(this.$i18n);
    this.loadExerciseFromURL();
  },
  methods: {
    recalculate() {
      this.computeSolution();
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typeset(); // https://github.com/mathjax/MathJax/issues/2557
        }
      });
    },
    drawExercise() {
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      });
    },
    generateExercise() {
      // choose formats
      const formats = Object.keys(this.formatOptions);
      const format1 = formats[Math.floor(Math.random() * formats.length)];
      const indexFormat1 = formats.indexOf(format1);
      if (indexFormat1 > -1) {
        formats.splice(indexFormat1, 1);
      }
      const format2 = formats[Math.floor(Math.random() * formats.length)];
      this.selectedFormat = [format1, format2];
      // generate input number
      let number = '';
      const numDigitsBeforeComma = Math.floor(1 + Math.random() * 3);
      const numDigitsAfterComma = Math.floor(Math.random() * 4);
      this.power[0] = formatToPower(format1);
      this.power[1] = formatToPower(format2);

      const digitValues = [];
      for (let i = 0; i < this.power[0]; i += 1) {
        digitValues.push(i.toString(this.power[0]));
      }

      if (numDigitsBeforeComma > 0) {
        for (let i = 0; i < numDigitsBeforeComma; i += 1) {
          number += digitValues[Math.floor(Math.random() * digitValues.length)];
        }
      } else {
        number = '0';
      }
      number = number.replace(/^0+(?=\d)/, '');

      if (numDigitsAfterComma > 0) {
        number += '.';
        for (let i = 0; i < numDigitsAfterComma; i += 1) {
          number += digitValues[Math.floor(Math.random() * digitValues.length)];
        }
      }

      if (((numDigitsAfterComma > 0) || (numDigitsAfterComma > 0)) && (Math.random() < 0.5)) {
        number = `-${number}`;
      }
      number = number.toUpperCase();
      this.inputNum = number;
      this.generated = true;
      this.recalculate();
      this.drawExercise();
    },
    downloadPdf() {
      this.recalculate();
      const descr = new pdf.PdfDescription(this, this.watcher);
      descr.generatePdf();
    },
    computeSolution() {
      // calc solution
      const polyadicSolution = new solution.PolyadicSolution();
      polyadicSolution.convertFormat(this.inputNum, this.power[0], this.power[1]);
      this.watcher = JSON.parse(JSON.stringify(polyadicSolution.watcher));
      this.solution = polyadicSolution.result;
      // construct description
      const descr = new description.DescriptionPolyadicConversion(this, this.watcher);
      descr.makeDescription(polyadicSolution.modus, this.selectedFormat);
      this.solutionSteps = descr.result;
      this.solutionObject = polyadicSolution.resultObject;
      this.modus = polyadicSolution.modus;
    },
    checkSolution() {
      if (this.solutionObject.bitStrint === this.propSol) {
        this.backSol = 'correctInput';
      } else {
        this.backSol = 'incorrectInput';
      }
    },
    preventGlobalMouseEvents() {
      document.body.style['pointer-events'] = 'none';
    },
    restoreGlobalMouseEvents() {
      document.body.style['pointer-events'] = 'auto';
    },
    mouseupListener(e) {
      this.restoreGlobalMouseEvents();
      document.removeEventListener('mouseup', this.mouseupListener, { capture: true });
      document.removeEventListener('mousemove', this.sliderMouseMove, { capture: true });
      e.stopPropagation();
      this.mouseDown = false;
    },
    captureMouseEvents(e) {
      this.preventGlobalMouseEvents();
      document.addEventListener('mouseup', this.mouseupListener, { capture: true });
      document.addEventListener('mousemove', this.sliderMouseMove, { capture: true });
      e.preventDefault();
      e.stopPropagation();
    },
    loadArchivedExercise() {
      const index = this.selectedArchivedExercise;
      if (index < 0) return;

      const exercise = polyadicLoadArchivedExercise(this.$i18n, index);
      this.inputNum = exercise.data.inputNum;
      this.selectedFormat = [exercise.data.fromFormat, exercise.data.toFormat];
      this.power = [
        formatToPower(exercise.data.fromFormat),
        formatToPower(exercise.data.toFormat)
      ];
      
      // Generate solution after loading exercise
      this.generated = true;
      this.recalculate();
      this.drawExercise();
    },
    selectArchivedExercise(num, index) {
      this.selectedArchivedExercise = index;
    },
    loadExerciseFromURL() {
      if (!this.$route.query) return;

      const exerciseHandle = this.$route.query.load;
      if (!exerciseHandle) return;

      const exerciseIndex = polyadicGetExerciseIndexOfHandle(this.$i18n, exerciseHandle);
      if (exerciseIndex === -1) {
        console.error('Unknown PolyadicConversion exercise handle:', exerciseHandle);
        return;
      }

      this.selectedArchivedExercise = exerciseIndex;
      this.loadArchivedExercise(); // This will load the exercise and generate the solution

      this.$nextTick(() => {
        this.$refs.archivedExercisesDropDownMenu.value = exerciseIndex;
      });
    }
  },
};
</script>

<style scoped lang="scss">
$arrow-size: 12px;

.container {
  display: flex;
  vertical-align: top;
  flex-direction: column;
  flex-grow: 1;
}

.divMargin{
  display: inline-block;
  width: 10px;
}

.operand{
  position: relative;
  margin: 10px;
  justify-content: center;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.formatContainer {
  display: inline-flex;
  flex-direction: row;
  margin: 10px;
  font-size: 14px;
  color: white !important;
}

.mobile_formatContainer {
  position: relative;
  right: -10%;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  font-size: 14px;
}

.slider{
  display: block;
  position: absolute;
  right: -6px;
  top: 0px;
  width: 12px;
  height: 100%;
  z-index: 1;
  background: none;
  cursor: ew-resize;
}

.mobile_bits {
  height: 40px;
  line-height: 40px;
  color: white;
  background: $freshBlue;
  border-right: 1px solid white;
}

.mobile_bits :deep(select) {
  color: white;
  background: $freshBlue;
}

.mobile_bits selectBox {
  width: 60% !important;
  border: none;
  background-color: transparent;
  color: white !important;
}

.fraction{
  height: 40px;
  line-height: 40px;
  background: $freshBlue;
  color: white;
  position: relative;
  user-select: none;
}

.pdfGen{
  margin-left: 0;
  display: inline-flex;
  flex-direction: row;
  position: absolute;
  width: 40px;
  height: 40px;
  right: 180px;
  top: 0px;
  line-height: 40px;
}

.mobile_pdfGen{
  margin-left: 0;
  text-align:center;
  position: relative;
  width: 40px;
  height: 40px;
  top: 0px;
  line-height: 40px;
}

#jaxHelper {
  visibility: hidden;
}

.solutionInput {
  display: inline-block;
}

.correctInput {
  background: $lightAzure;
}

.incorrectInput {
  background: $lightRed;
}

#solutionInput {
  width: 200px;
}

@media(max-width: 750px){
  .formatContainer{
    display: none;
  };
  .slider{
    display: none;
  };
  .bits{
    display: none;
  };
  .sign{
    display: none;
  };
  .pdfGen {
    display: none;
  }
}
@media(min-width: 751px){
  .mobile_formatContainer{
    display: none;
  };
  .mobile_slider{
    display: none;
  };
  .mobile_bits{
    display: none;
  };
  .mobile_pdfGen{
    display: none;
  };
}

.floatingPointInput {
  margin: 10px;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #d8d8d8;
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: .2em;
    font-size: 1em;
    text-align: center;
  }
}
</style>
