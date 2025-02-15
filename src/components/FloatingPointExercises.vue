<template>
  <div class="fp-exercise pageContainer">
    <h3 class="title">
      {{ $t('exercises') }}
    </h3>
    <div class="bodyContainer">
      <p class="introduction">
        {{ $t('fpExerciseIntro') }}
      </p>
      <h4>{{ $t('generateEx') }}</h4>
      <div>
        <div class="floatingPointInput">
          <h5>{{ $t('randomExercise') }}:</h5>
          <FSelect
            :sel="selectedFormat[0]"
            :num="0"
            :options="operationOptions"
            @input="selectOp"
          />
          <div class="divMargin" />
          <button @click="generateExercise">
            {{ $t('generate') }}
          </button>
        </div>
        <div class="floatingPointInput">
          <h5>{{ $t('fp_from_archive') }}:</h5>
          <FSelect
            ref="archivedExercisesFPDropDownMenu"
            :options="archivedExerciseTitles"
            :sel="0"
            @input="selectArchivedExercise"
          />
          <div class="divMargin" />
          <button @click="loadArchivedExercise">
            {{ $t('load') }}
          </button>
        </div>
      </div>
      <div id="exerciseField">
        <MathJax :formula="exerciseText" />
      </div>
      <h4>{{ $t('ownSolution') }}</h4>
      <AttentionBanner :text="$t('attRound')" />
      <div class="solutionArea">
        <div class="solutionInput">
          <p>{{ $t('signBit') }}</p>
          <input
            id="propVB"
            v-model="propVB"
            :class="backVB"
          >
        </div>
        <div class="divMargin" />
        <div class="solutionInput">
          <p>{{ $t('exponentBits') }}</p>
          <input
            id="propE"
            v-model="propE"
            :class="backE"
          >
        </div>
        <div class="divMargin" />
        <div class="solutionInput">
          <p>{{ $t('fractionBits') }}</p>
          <input
            id="propM"
            v-model="propM"
            :class="backM"
          >
        </div>
        <div class="divMargin" />
        <button
          id="checkSolution"
          @click="checkSolution"
        >
          {{ $t('check') }}
        </button>
      </div>
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
import { fpLoadArchivedExercise, fpGetArchivedExerciseTitles, fpGetExerciseIndexOfHandle } from '@/scripts/fpArchivedExercises';
import AttentionBanner from './AttentionBanner.vue';
import * as randomIEEE from '../scripts/randomIEEE';
import FormatSelect from './FormatSelect.vue';
// import SolutionAccordion from './SolutionAccordion.vue';
import Accordion from './EmbeddedAccordion.vue';
import AccordionItem from './EmbeddedAccordionItem.vue';
import MathJax from './MathJax.vue';
import * as solution from '../scripts/ieeeSolution';
import * as checker from '../scripts/checkSolution';
import * as description from '../scripts/DescriptionSolution';
import * as pdf from '../scripts/generatePdf';

export default {
  name: 'FloatingPointExercises',
  components: {
    FSelect: FormatSelect,
    // Accordion: SolutionAccordion,
    Accordion,
    AccordionItem,
    AttentionBanner,
    MathJax
  },
  data() {
    const useCookies = false;
    let hasdefault = false;
    let input1 = '';
    if (useCookies && window.sessionStorage.getItem('Exer_fp1')) {
      input1 = window.sessionStorage.getItem('Exer_fp1');
      hasdefault = true;
    }
    let input2 = '';
    if (useCookies && window.sessionStorage.getItem('Exer_fp2')) {
      input2 = window.sessionStorage.getItem('Exer_fp2');
      hasdefault = true;
    }
    let operator = 'add';
    if (useCookies && window.sessionStorage.getItem('Exer_operator')) {
      operator = window.sessionStorage.getItem('Exer_operator');
      hasdefault = true;
    }
    let expBits = 5;
    if (useCookies && window.sessionStorage.getItem('Exer_expBits')) {
      expBits = parseInt(window.sessionStorage.getItem('Exer_expBits'), 10);
      hasdefault = true;
    }
    let length = 16;
    if (useCookies && window.sessionStorage.getItem('Exer_numBits')) {
      length = parseInt(window.sessionStorage.getItem('Exer_numBits'), 10);
      hasdefault = true;
    }
    return {
      useCookies,
      selectedFormat: [operator],
      mouseDown: false,
      exponentBits: expBits,
      numBits: length,
      propVB: '',
      backVB: '',
      propE: '',
      backE: '',
      propM: '',
      backM: '',
      solution: '',
      solutionObject: '',
      containerWidth: 500,
      watcher: '',
      solutionSteps: [],
      fp1: input1,
      fp2: input2,
      default: hasdefault,
      archivedExerciseSelectedIndex: 0,
    };
  },
  computed: {
    archivedExerciseTitles() {
      return fpGetArchivedExerciseTitles(this.$i18n);
    },
    operationOptions() {
      return {
        add: `${this.$t('addition')} (+)`,
        sub: `${this.$t('subtraction')} (-)`,
        mul: `${this.$t('multiplication')} (*)`,
        div: `${this.$t('division')} (/)`,
      };
    },
    solDescr() {
      console.log('Print', this.exponentBits, this.numBits, this.fp1, this.fp2);
      const ieeeSolution = new solution.IEEESolution(this.exponentBits, this.numBits);
      ieeeSolution.computeSolution(this.fp1, this.fp2, this.selectedFormat[0]);
      const watcher = ieeeSolution.watcher;
      console.log(watcher);
      const descr = new description.DescriptionSolution(
        this,
        this.exponentBits,
        this.numBits,
        watcher,
      );
      descr.makeDescriptionArithmetic(this.fp1, this.fp2, ieeeSolution.result, this.selectedFormat[0]);
      this.setVariables(watcher, ieeeSolution.result, ieeeSolution.resultObject);
      return descr.result;
    },
    exerciseText() {
      if (this.fp1 === '') {
        return '';
      }
      const operation = this.selectedFormat[0];
      const opNames = {
        add: [this.$t('addition'), '+'],
        mul: [this.$t('multiplication'), '\\cdot'],
        sub: [this.$t('subtraction'), '-'],
        div: [this.$t('division'), '/'],
      };
      console.log(operation);
      console.log('Info', { op1: opNames[operation][0], op2: opNames[operation][1] });
      // `Es seien die Gleitkommazahlen \\( fp_1 \\) und \\( fp_2 \\) im 16 Bit Gleitkommaformat gegeben. Berechnen Sie die ${opNames[operation][0]} \\( fp_1 ${opNames[operation][1]} fp_2 \\) ohne die Binärdarstellung zu verlassen und geben Sie diese wieder als Gleitkommazahl an:
      const introText = this.$t('fpExerciseText', { op1: opNames[operation][0], op2: opNames[operation][1] });
      console.log(introText);
      return `${introText} 

          \\( fp_1 = \\text{${this.fp1}} \\)\n
          \\( fp_2 = \\text{${this.fp2}} \\)`;
    },
  },
  mounted() {
    this.loadExerciseFromURL();

    this.$nextTick(() => {
      if (this.default) {
        this.drawExercise();
        // this.computeSolution();
      }
    });
  },
  updated() {
    this.$nextTick(() => {
      if (window.MathJax) {
        window.MathJax.typeset();
      }
    });
  },
  methods: {
    setVariables(watcher, solutionIn, solutionObject) {
      this.watcher = watcher;
      this.solution = solutionIn;
      this.solutionObject = solutionObject;
    },
    selectArchivedExercise(num, exerciseIndex) {
      this.archivedExerciseSelectedIndex = exerciseIndex;
    },
    loadArchivedExercise() {
      const index = this.archivedExerciseSelectedIndex;
      if (index < 0) {
        return;
      }
      const exercise = fpLoadArchivedExercise(this.$i18n, index).data;
      this.fp1 = exercise.fp1;
      this.fp2 = exercise.fp2;
      this.selectedFormat[0] = exercise.op;
      this.prepareExercise();
    },
    saveVals() {
      if (this.useCookies) {
        window.sessionStorage.setItem('Exer_fp1', this.fp1);
        window.sessionStorage.setItem('Exer_fp2', this.fp2);
        window.sessionStorage.setItem('Exer_operator', this.selectedFormat[0]);
        window.sessionStorage.setItem('Exer_expBits', this.exponentBits);
        window.sessionStorage.setItem('Exer_numBits', this.numBits);
      }
    },
    downloadPdf() {
      if (this.useCookies) {
        window.sessionStorage.setItem('FPF_operator', this.selectedFormat[0]);
        window.sessionStorage.setItem('FPF_format1', 'ieee');
        window.sessionStorage.setItem('FPF_format2', 'ieee');
        window.sessionStorage.setItem('FPF_inputNums1', this.fp1);
        window.sessionStorage.setItem('FPF_inputNums2', this.fp2);
        window.sessionStorage.setItem('FPF_expBits', this.exponentBits);
        window.sessionStorage.setItem('FPF_numBits', this.numBits);
      }
      // this.computeSolution();
      const descr = new pdf.PdfDescription(
        this,
        this.exponentBits,
        this.numBits,
        this.watcher,
      );
      descr.generatePdf(this.fp1, this.fp2, this.solution, this.selectedFormat[0], 'ieee', 'ieee');
    },
    checkSolution() {
      const checkSolution = new checker.CheckSolution(this.exponentBits);
      checkSolution.checkSolution(this.solutionObject, this.propVB, this.propE, this.propM);
      this.backVB = checkSolution.getVBStatus();
      this.backE = checkSolution.getEStatus();
      this.backM = checkSolution.getMStatus();
    },
    drawExercise() {
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      });
    },
    prepareExercise() {
      this.saveVals();
      this.drawExercise();
    },
    generateExercise() {
      const random = new randomIEEE.RandomIEEE(this.exponentBits, this.numBits);
      random.generateRandomIEEE();
      this.fp1 = random.result;
      random.generateRandomIEEE();
      this.fp2 = random.result;
      console.log(this.fp1, this.fp2);
      this.prepareExercise();
    },
    selectVal(num, val) {
      this.selectedFormat[num] = val;
      const nnum = num > 2 ? 1 : 0;
      this.checkAndConvertFormat(nnum);
    },
    selectOp(num, val) {
      this.selectedFormat[num] = val;
      // this.computeSolution();
    },
    loadExerciseFromURL() {
      if (!this.$route.query) {
        return;
      }
      // Load Exercise statet in URL parameters (...?load=)
      const exerciseHandle = this.$route.query.load;
      if (!exerciseHandle) {
        return;
      }
      const exerciseIndex = fpGetExerciseIndexOfHandle(this.$i18n, exerciseHandle);
      if (exerciseIndex === -1) {
        console.error('Unknown BooleanFunctionMinimizer-exercise handle: ', exerciseHandle);
        return;
      }
      // retrieve exercise data
      this.selectArchivedExercise(0, exerciseIndex);
      this.loadArchivedExercise();

      // Select the loaded exercise in the drop-down menu
      this.$nextTick(() => {
        this.$refs.archivedExercisesFPDropDownMenu.setSelected(exerciseIndex);
      });
    },
    /* computeSolution() {
      const ieeeSolution = new solution.IEEESolution(this.exponentBits, this.numBits);
      console.log(this.selectedFormat[0]);
      ieeeSolution.computeSolution(this.fp1, this.fp2, this.selectedFormat[0]);
      const watcher = ieeeSolution.watcher;
      this.watcher = watcher;
      this.solution = ieeeSolution.result;
      this.solutionObject = ieeeSolution.resultObject;
      const descr = new description.DescriptionSolution(
        this,
        this.exponentBits,
        this.numBits,
        watcher,
      );
      descr.makeDescriptionArithmetic(this.fp1, this.fp2, this.solution, this.selectedFormat[0]);
      this.solutionSteps = reactive(descr.result);
    }, */
  },
};
</script>

<style scoped lang="scss">
$arrow-size: 12px;

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

.fpOperationTable{
  margin: auto;
  margin-top: 20px;
}

.divMargin{
  display: inline-block;
  width: 10px;
}

.operand{
  position: relative;
  display: inline-block;
  margin: 10px;
}

.floatingPointInput{
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

.formatContainer {
  display: inline-flex;
  flex-direction: row;
  margin: 10px;
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

.sign {
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: white;
  background: $freshBlue;
  border-right: 1px solid white;
}

.exponent{
  height: 40px;
  line-height: 40px;
  background: $freshBlue;
  color: white;
  position: relative;
  user-select: none;
  border-right: 1px solid white;
}

.fraction{
  height: 40px;
  line-height: 40px;
  background: $freshBlue;
  color: white;
  position: relative;
  user-select: none;
}

.expandExponent{
  position: absolute;
  width: 40px;
  height: 40px;
  display: block;
  right: 0px;
  top: 0px;
  line-height: 40px;
  &:hover{
    cursor: pointer;
  }
}

.expandFraction{
  position: absolute;
  width: 40px;
  height: 40px;
  display: block;
  left: 0px;
  top: 0px;
  line-height: 40px;
  &:hover{
    cursor: pointer;
  }
}

.arrowRight {
  width: $arrow-size;
  height: $arrow-size;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%) rotate(225deg);
}

.arrowLeft {
  width: $arrow-size;
  height: $arrow-size;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 65%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.arrowMask {
  width: 100%;
  height: 100%;
  background-color: $freshBlue;
  position: absolute;
  left: 15%;
  top: -15%;
  right: 0%;
  bottom: 0%;
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
</style>
