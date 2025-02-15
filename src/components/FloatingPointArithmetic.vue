<template>
  <div class="fp-arithmetic pageContainer">
    <h3 class="title">
      {{ `${$t('floatingPoint')} ${$t('arithmetic')}` }}
    </h3>
    <div class="bodyContainer">
      <p class="introduction">
        {{ $t('fpArithIntro') }}
      </p>
      <h4>{{ $t('fpformat') }}</h4>
      <p class="introduction">
        {{ $t('fpFormatSelection') }}
      </p>
      <div class="floatingPointFormatSelection">
        <FSelect
          class="bits"
          :num="5"
          :sel="selectedFormat[5]"
          :options="bitrangeOptions"
          @input="selectBitRange"
        />
        <FSelect
          class="mobile_bits"
          :num="5"
          :sel="selectedFormat[5]"
          :options="bitrangeOptions"
          @input="selectBitRange"
        />
        <div
          class="formatContainer"
          @mousemove="sliderMouseMove"
        >
          <div class="sign">
            VB
          </div>
          <div
            class="exponent"
            :style="{
              width:
                `${60 + exponentBits * (containerWidth / (numBits - 1))}px`,
            }"
          >
            <div
              class="expandExponent"
              @click="expandFraction"
            >
              <div class="arrowLeft">
                <div class="arrowMask" />
              </div>
            </div>
            E({{ exponentBits }})
            <div
              class="slider"
              @mousedown="sliderMouseDown"
            />
          </div>
          <div
            class="fraction"
            :style="{
              width: `${60 + (numBits - exponentBits - 1)
                * (containerWidth / (numBits - 1))}px`,
            }"
          >
            <div
              class="expandFraction"
              @click="expandExponent"
            >
              <div class="arrowRight">
                <div class="arrowMask" />
              </div>
            </div>
            M({{ (numBits - exponentBits - 1) }})
          </div>
        </div>
        <div
          class="mobile_formatContainer"
          @mousemove="sliderMouseMove"
        >
          <div class="mobile_sign">
            Sign(1)
          </div>
          <div
            class="mobile_exponent"
            @click="expandExponent"
          >
            Exponent({{ exponentBits }}) &uarr;
          </div>
          <div
            class="mobile_fraction"
            @click="expandFraction"
          >
            Mantisse({{ (numBits - exponentBits - 1) }}) &darr;
          </div>
        </div>
      </div>
      <h4>{{ $t('operationSelect') }}</h4>
      <div class="fpOperationContainer">
        <div
          id="fpOperationTable"
          class="fpOperationTable"
        >
          <div class="container">
            <div>{{ $t('firstFloatingPoint') }}</div>
            <table
              id="fpfTable1"
              class="floatingPointInput"
            >
              <tbody>
                <tr>
                  <td>
                    <input
                      id="fpfInput0"
                      v-model="inputNums[0]"
                      :placeholder="$t('inputNumber') "
                      @input="checkAndConvertFormat(0)"
                    >
                  </td>
                  <td>
                    <FSelect
                      :num="0"
                      :sel="selectedFormat[0]"
                      :options="formatOptions"
                      @input="selectVal"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      id="fpfInput1"
                      v-model="numLeft"
                      disabled
                    >
                  </td>
                  <td>
                    <FSelect
                      :num="1"
                      :sel="selectedFormat[1]"
                      :is-disabled="true"
                      :options="formatOptions"
                      @input="selectVal"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="container">
            <div>{{ $t('operand') }}</div>
            <div class="operand">
              <FSelect
                :num="2"
                :sel="selectedFormat[2]"
                :options="operationOptions"
                @input="selectOp"
              />
            </div>
          </div>
          <div class="container">
            <div>{{ $t('secondFloatingPoint') }}</div>
            <table
              id="fpfTable2"
              class="floatingPointInput"
            >
              <tbody>
                <tr>
                  <td>
                    <input
                      id="fpfInput2"
                      v-model="inputNums[1]"
                      :placeholder="$t('inputNumber')"
                      @input="checkAndConvertFormat(1)"
                    >
                  </td>
                  <td>
                    <FSelect
                      :num="3"
                      :sel="selectedFormat[3]"
                      :options="formatOptions"
                      @input="selectVal"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      id="fpfInput3"
                      v-model="numRight"
                      disabled
                    >
                  </td>
                  <td>
                    <FSelect
                      :num="4"
                      :sel="selectedFormat[4]"
                      :is-disabled="true"
                      :options="formatOptions"
                      @input="selectVal"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="solutionArea">
        <div class="solutionInput">
          <p>{{ $t('signBit') }}</p>
          <input
            id="propVB"
            v-model="propVB"
            :class="backVB"
          >
          <div
            v-if="backVB === 'correctInput'"
            class="checkmark"
          >
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
            >
              <polygon
                fill="#43A047"
                points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"
              />
            </svg>
          </div>
        </div>
        <div class="divMargin" />
        <div class="solutionInput">
          <p>{{ $t('exponentBits') }}</p>
          <input
            id="propE"
            v-model="propE"
            :class="backE"
          >
          <div
            v-if="backE === 'correctInput'"
            class="checkmark"
          >
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
            >
              <polygon
                fill="#43A047"
                points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"
              />
            </svg>
          </div>
        </div>
        <div class="divMargin" />
        <div class="solutionInput">
          <p>{{ $t('fractionBits') }}</p>
          <input
            id="propM"
            v-model="propM"
            :class="backM"
          >
          <div
            v-if="backM === 'correctInput'"
            class="checkmark"
          >
            <svg
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
            >
              <polygon
                fill="#43A047"
                points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"
              />
            </svg>
          </div>
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
        <div>
          <AttentionBanner
            v-if="denominatorZero === false"
            :text="$t('attSolve')"
          />
          <AttentionBanner
            v-if="negativeSummand"
            :text="$t('negativeSummand')"
          />
          <AttentionBanner
            v-if="negativeSubtrahend"
            :text="$t('negativeSubtrahend')"
          />
        </div>
        <div>
          <AttentionBanner
            v-if="negativeMinuendSubtrahend"
            :text="$t('negativeMinuendSubtrahend')"
          />
        </div>
        <!-- <div class="pdfGen">
          <button v-on:click="downloadPdf" v-if="this.solution">{{$t('getDescription')}}</button>
        </div>
        <div class="mobile_pdfGen">
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
      <div id="jaxHelper" />
    </div>
  </div>
</template>

<script>
/* eslint no-useless-escape: 0  no-case-declarations: 0 */
import AttentionBanner from './AttentionBanner.vue';
import FormatSelect from './FormatSelect.vue';
import Accordion from './EmbeddedAccordion.vue';
import AccordionItem from './EmbeddedAccordionItem.vue';
import * as description from '../scripts/DescriptionSolution';
import * as checker from '../scripts/checkSolution';
import * as pdf from '../scripts/generatePdf';
import * as convertFormat from '../scripts/formatConversions';
import * as solution from '../scripts/ieeeSolution';

export default {
  name: 'FloatingPointArithmetic',
  components: {
    FSelect: FormatSelect,
    Accordion,
    AccordionItem,
    AttentionBanner,
  },
  data() {
    const useCookies = false;
    let hasdefault = false;
    let operator = 'add';
    if (useCookies && window.sessionStorage.getItem('FPF_operator')) {
      operator = window.sessionStorage.getItem('FPF_operator');
      hasdefault = true;
    }
    let format1 = 'decimal';
    if (useCookies && window.sessionStorage.getItem('FPF_format1')) {
      format1 = window.sessionStorage.getItem('FPF_format1');
      hasdefault = true;
    }
    let format2 = 'decimal';
    if (useCookies && window.sessionStorage.getItem('FPF_format2')) {
      format2 = window.sessionStorage.getItem('FPF_format2');
      hasdefault = true;
    }
    let input1 = '';
    if (useCookies && window.sessionStorage.getItem('FPF_inputNums1')) {
      input1 = window.sessionStorage.getItem('FPF_inputNums1');
      hasdefault = true;
    }
    let input2 = '';
    if (useCookies && window.sessionStorage.getItem('FPF_inputNums2')) {
      input2 = window.sessionStorage.getItem('FPF_inputNums2');
      hasdefault = true;
    }
    let expBits = 5;
    if (useCookies && window.sessionStorage.getItem('FPF_expBits')) {
      expBits = parseInt(window.sessionStorage.getItem('FPF_expBits'), 10);
      hasdefault = true;
    }
    let length = 16;
    if (useCookies && window.sessionStorage.getItem('FPF_numBits')) {
      length = parseInt(window.sessionStorage.getItem('FPF_numBits'), 10);
      hasdefault = true;
    }
    const bitRangeName = this.numBitsToBitRange(length);
    return {
      useCookies,
      selectedFormat: [format1, 'ieee', operator, format2, 'ieee', bitRangeName], // 0: input left, 1: converted left, 2: operand, 3: input right, 4: converted right, 5: bit range
      mouseDown: false,
      solution: '',
      solutionObject: '',
      inputNums: { 0: input1, 1: input2 },
      nums: { 0: '', 1: '' },
      exponentBits: expBits,
      numBits: length,
      containerWidth: 500,
      solutionSteps: [],
      negativeSummand: false,
      negativeSubtrahend: false,
      negativeMinuendSubtrahend: false,
      denominatorZero: false,
      default: hasdefault,
      watcher: '',
      propVB: '',
      backVB: '',
      propE: '',
      backE: '',
      propM: '',
      backM: '',
    };
  },
  computed: {
    falseFormatOutput() {
      return this.$t('falseFormat');
    },
    numLeft() {
      return this.checkAndConvertFormat(0);
    },
    numRight() {
      return this.checkAndConvertFormat(1);
    },
    solDescr() {
      if (this.nums[0] == this.falseFormatOutput && this.nums[1] == this.falseFormatOutput) {
        return [];
      }
      console.log('solDescr', this.nums[0], this.nums[1], this.exponentBits, this.numBits);
      const ieeeSolution = new solution.IEEESolution(this.exponentBits, this.numBits);
      ieeeSolution.computeSolution(this.nums[0], this.nums[1], this.selectedFormat[2]);
      console.log('ieeeSolution', ieeeSolution);
      const watcher = JSON.parse(JSON.stringify(ieeeSolution.watcher));
      const negativeMinuendSubtrahend = ieeeSolution.negativeMinuendSubtrahend;
      const negativeSubtrahend = ieeeSolution.negativeSubtrahend;
      const negativeSummand = ieeeSolution.negativeSummand;
      let solutionIEEE = [];
      let solutionObject = [];
      solutionIEEE = ieeeSolution.result;
      const descr = new description.DescriptionSolution(
        this,
        this.exponentBits,
        this.numBits,
        ieeeSolution.watcher,
      );
      console.log('descr', descr, this.exponentBits, this.numBits, ieeeSolution.watcher);
      console.log('SelFormat', this.selectedFormat[2]);
      descr.makeDescriptionArithmetic(
        this.nums[0],
        this.nums[1],
        solutionIEEE,
        this.selectedFormat[2],
      );
      solutionObject = ieeeSolution.resultObject;
      this.setVariables(watcher, negativeMinuendSubtrahend, negativeSubtrahend, negativeSummand, solutionIEEE, solutionObject);
      console.log('descr.result', descr.result);
      return descr.result;
    },
    operationOptions() {
      return {
        add: `${this.$t('addition')} (+)`,
        sub: `${this.$t('subtraction')} (-)`,
        mul: `${this.$t('multiplication')} (*)`,
        div: `${this.$t('division')} (/)`,
      };
    },
    formatOptions() {
      return {
        decimal: `${this.$t('decimal')}`,
        binary: `${this.$t('binary')}`,
        ieee: 'IEEE',
      };
    },
    bitrangeOptions() {
      return {
        eight: '8 Bit',
        sixteen: '16 Bit',
        thirtytwo: '32 Bit',
        // sixtyfour: '64 bit',
      };
    },
  },
  watch: {
    input() {
      this.saveVals();
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
    });
    if (this.default) {
      this.checkAndConvertFormat(0);
      this.checkAndConvertFormat(1);
      this.recalculate();
    }
  },
  methods: {
    setVariables(watcher, negativeMinuendSubtrahend, negativeSubtrahend, negativeSummand, solutionIEEE, solutionObject) {
      this.watcher = watcher;
      this.negativeMinuendSubtrahend = negativeMinuendSubtrahend;
      this.negativeSubtrahend = negativeSubtrahend;
      this.negativeSummand = negativeSummand;
      this.solution = solutionIEEE;
      this.solutionObject = solutionObject;
    },
    saveVals() {
      if (this.useCookies) {
        window.sessionStorage.setItem('FPF_operator', this.selectedFormat[2]);
        window.sessionStorage.setItem('FPF_format1', this.selectedFormat[0]);
        window.sessionStorage.setItem('FPF_format2', this.selectedFormat[3]);
        window.sessionStorage.setItem('FPF_inputNums1', this.inputNums[0]);
        window.sessionStorage.setItem('FPF_inputNums2', this.inputNums[1]);
        window.sessionStorage.setItem('FPF_expBits', this.exponentBits);
        window.sessionStorage.setItem('FPF_numBits', this.numBits);
      }
    },
    recalculate() {
      this.saveVals();
      this.containerWidth = Math.min(500, window.innerWidth - 250);
      this.convertFormat(0);
      this.convertFormat(1);
      // this.computeSolution();
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typeset(); // https://github.com/mathjax/MathJax/issues/2557
        }
      });
    },
    numBitsToBitRange(numBits) {
      return { 8: 'eight', 16: 'sixteen', 32: 'thirtytwo' }[numBits];
    },
    selectBitRange(num, val) {
      this.selectedFormat[num] = val;
      if (val === 'eight') {
        this.numBits = 8;
        this.exponentBits = 3;
      } else if (val === 'sixteen') {
        this.numBits = 16;
        this.exponentBits = 5;
      } else if (val === 'thirtytwo') {
        this.numBits = 32;
        this.exponentBits = 8;
      }
      this.recalculate();
    },
    selectVal(num, val) {
      this.selectedFormat[num] = val;
      const nnum = num > 2 ? 1 : 0;
      this.checkAndConvertFormat(nnum);
    },
    selectOp(num, val) {
      this.selectedFormat[num] = val;
      this.recalculate();
    },
    checkFormat(format, conv) {
      let commaOccured = false;
      const convert = conv.replace(/\s/g, '');
      if (format === 'ieee' && convert.length !== this.numBits) {
        return false;
      }
      for (let i = 0; i < convert.length; i += 1) {
        if (format === 'binary') {
          if (!(['0', '1', ',', '.', '-', '+'].includes(convert[i]))) {
            return false;
          }
        }
        if (format === 'ieee') {
          if (convert[i] !== '0' && convert[i] !== '1') {
            return false;
          }
        }
        if (format === 'decimal') {
          if (!(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            ',', '.', '-', '+'].includes(convert[i]))) {
            return false;
          }
        }
        if (format === 'binary' || format === 'decimal') {
          if ((convert[i] === '+' || convert[i] === '-') && i > 1) {
            return false;
          }
        }
        if (['-', '+'].includes(convert[i]) && i > 0) {
          return false;
        }
        if (convert[i] === ',' || convert[i] === '.') {
          if (commaOccured) {
            return false;
          }
          commaOccured = true;
        }
      }
      // Block all inputs without numbers
      if (!/\d/.test(convert)) {
        return false;
      }
      return true;
    },
    checkAndConvertFormat(num) {
      const firstFormat = this.selectedFormat[num * 3];
      const toConvert = this.inputNums[num];
      if (!this.checkFormat(firstFormat, toConvert)) {
        this.nums[num] = this.falseFormatOutput;
        return this.falseFormatOutput;
      }
      const converted = this.convertFormat(num);
      // this.computeSolution();
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      });
      return converted;
    },
    downloadPdf() {
      this.recalculate();
      const descr = new pdf.PdfDescription(
        this,
        this.exponentBits,
        this.numBits,
        this.watcher,
      );
      descr.generatePdf(
        this.inputNums[0],
        this.inputNums[1],
        this.solution,
        this.selectedFormat[2],
        this.selectedFormat[0],
        this.selectedFormat[3],
      );
    },
    convertFormat(num) {
      const firstFormat = this.selectedFormat[num * 3];
      const secondFormat = this.selectedFormat[num * 3 + 1];
      const toConvert = this.inputNums[num];
      const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
      if (toConvert.length === 0) {
        return '';
      }
      let converted = toConvert;
      if (firstFormat === 'binary') {
        if (secondFormat === 'decimal') { // dead code
          converter.binToDec(toConvert);
          converted = converter.result;
        } else if (secondFormat === 'ieee') {
          converter.binToIEEE(toConvert);
          converted = converter.result;
        }
      } else if (firstFormat === 'decimal') {
        if (secondFormat === 'binary') { // dead code
          converter.decToBin(toConvert);
          converted = converter.result;
        } else if (secondFormat === 'ieee') {
          converter.decToBin(toConvert);
          console.log(converter.result);
          converter.binToIEEE(converter.result);
          converted = converter.result;
        }
      } else if (firstFormat === 'ieee') {
        if (secondFormat === 'binary') { // dead code
          converter.ieeeToBin(toConvert);
          converted = converter.result;
        } else if (secondFormat === 'decimal') { // dead code
          converter.ieeeToBin(toConvert);
          converter.binToDec(converter.result);
          converted = converter.result;
        }
      }
      this.nums[num] = converted;
      return converted;
    },
    checkSolution() {
      const checkSolution = new checker.CheckSolution(this.exponentBits);
      checkSolution.checkSolution(this.solutionObject, this.propVB, this.propE, this.propM);
      this.backVB = checkSolution.getVBStatus();
      this.backE = checkSolution.getEStatus();
      this.backM = checkSolution.getMStatus();
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
    sliderMouseDown(e) {
      this.mouseDown = true;
      this.xCoord = e.pageX;
      this.captureMouseEvents(e);
    },
    sliderMouseMove(e) {
      if (this.mouseDown) {
        const blockSize = (this.containerWidth / (this.numBits - 1));
        if (e.pageX - this.xCoord > blockSize) {
          this.xCoord += blockSize;
          if (this.exponentBits + 1 < this.numBits - 1) {
            this.exponentBits += 1;
            if (this.nums[0] !== this.falseFormatOutput) {
              this.convertFormat(0);
            }
            if (this.nums[1] !== this.falseFormatOutput) {
              this.convertFormat(1);
            }
            // this.computeSolution();
          }
          this.$nextTick(() => {
            if (window.MathJax) {
              window.MathJax.typeset(); // https://github.com/mathjax/MathJax/issues/2557
            }
          });
        }
        if (this.xCoord - e.pageX > blockSize) {
          this.xCoord -= blockSize;
          if (this.exponentBits > 2) {
            this.exponentBits -= 1;
            if (this.nums[0] !== this.falseFormatOutput) {
              this.convertFormat(0);
            }
            if (this.nums[1] !== this.falseFormatOutput) {
              this.convertFormat(1);
            }
            // this.computeSolution();
          }
          this.$nextTick(() => {
            if (window.MathJax) {
              window.MathJax.typeset(); // https://github.com/mathjax/MathJax/issues/2557
            }
          });
        }
      }
    },
    expandFraction() {
      this.exponentBits = Math.max(this.exponentBits - 1, 2);
      this.recalculate();
    },
    expandExponent() {
      this.exponentBits = Math.min(this.exponentBits + 1, this.numBits - 2);
      this.recalculate();
    },
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
  margin: 0 20px;
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

.sign {
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: white;
  background: $freshBlue;
  border-right: 1px solid white;
}

.mobile_sign {
  width: 80%;
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

.mobile_exponent{
  height: 40px;
  width: 80%;
  line-height: 40px;
  background: $freshBlue;
  color: white;
  position: relative;
  user-select: none;
  border-right: 1px solid white;
}

.checkmark {
  height: 36px;
  padding-left: 5px;
  display: inline-block;
  vertical-align: middle;
  line-height: 36px;
  margin-bottom: -5px;
}

.checkmark svg {
  width: 20px;
  height: 20px;
}

.fraction{
  height: 40px;
  line-height: 40px;
  background: $freshBlue;
  color: white;
  position: relative;
  user-select: none;
}

.mobile_fraction{
  height: 40px;
  width: 80%;
  line-height: 40px;
  background: $freshBlue;
  color: white;
  position: relative;
  user-select: none;
  border-right: 1px solid white;
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

.mobile_expandExponent{
  height: 40px;
  width: 80%;
  line-height: 40px;
  background: $freshBlue;
  color: white;
  position: relative;
  user-select: none;
  border-right: 1px solid white;
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

.mobile_expandFraction{
  height: 40px;
  width: 80%;
  line-height: 40px;
  background: $freshBlue;
  color: white;
  position: relative;
  user-select: none;
  border-right: 1px solid white;
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
  .exponent{
    display: none;
  };
  .fraction{
    display: none;
  };
  .expandExponent{
    display: none;
  };
  .expandFraction{
    display: none;
  };
  .arrowMask{
    display: none;
  }
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
  .mobile_sign{
    display: none;
  };
  .mobile_exponent{
    display: none;
  };
  .mobile_fraction{
    display: none;
  };
  .mobile_expandExponent{
    display: none;
  };
  .mobile_expandFraction{
    display: none;
  };
  .mobile_pdfGen{
    display: none;
  };
}
</style>
