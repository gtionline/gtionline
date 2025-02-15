<template>
  <div class="fp-exercise pageContainer">
    <h3 class="title">
      {{ $t('conversion') }}
    </h3>
    <div class="bodyContainer">
      <p class="introduction">
        {{ $t('fpConvIntro') }}
      </p>
      <h4>{{ $t('fpformat') }}</h4>
      <p class="introduction">
        {{ $t('fpFormatSelectionSimple') }}
      </p>
      <div class="floatingPointFormatSelection">
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
      <h4>{{ $t('generateEx') }}</h4>
      <div class="divMargin" />
      <button @click="generateExercise">
        {{ $t('generate') }}
      </button>
      <div
        id="exerciseField"
        v-html="exerciseText"
      />
      <h4>{{ $t('ownSolution') }}</h4>
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
      </div><div id="solution">
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
import { getIEEEFromString } from '@/scripts/algorithms/arithmetic/IEEE/numberIEEE';
import AttentionBanner from './AttentionBanner.vue';
import * as checker from '../scripts/checkSolution';
import * as convertFormat from '../scripts/formatConversions';
import * as description from '../scripts/DescriptionSolution';
import Accordion from './EmbeddedAccordion.vue';
import AccordionItem from './EmbeddedAccordionItem.vue';

export default {
  name: 'FloatingPointConversion',
  components: {
    Accordion,
    AccordionItem,
    AttentionBanner,
  },
  data() {
    const useCookies = false;
    let hasdefault = false;
    let input = '';
    if (useCookies && window.sessionStorage.getItem('Conv_fp1')) {
      input = window.sessionStorage.getItem('Conv_fp1');
      hasdefault = true;
    }
    let expBits = 5;
    if (useCookies && window.sessionStorage.getItem('Conv_expBits')) {
      expBits = parseInt(window.sessionStorage.getItem('Conv_expBits'), 10);
      hasdefault = true;
    }
    let length = 16;
    if (useCookies && window.sessionStorage.getItem('Conv_numBits')) {
      length = parseInt(window.sessionStorage.getItem('Conv_numBits'), 10);
      hasdefault = true;
    }
    return {
      useCookies,
      selectedFormat: '',
      mouseDown: false,
      solution: '',
      generated: false,
      solutionObject: '',
      solutionSteps: [],
      exponentBits: expBits,
      numBits: length,
      containerWidth: 500,
      watcher: '',
      propVB: '',
      backVB: '',
      propE: '',
      backE: '',
      propM: '',
      backM: '',
      fp1: input,
      default: hasdefault,
    };
  },
  computed: {
    solDescr() {
      if (this.fp1 === '') {
        return [];
      }
      const converter = new convertFormat.FormatConversions(this.exponentBits, this.numBits);
      converter.decToBin(this.fp1.toString());
      converter.binToIEEE(converter.result);
      const solutionObject = getIEEEFromString(this.exponentBits, converter.result);
      console.log(solutionObject);
      this.setVariables(solutionObject);
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      });
      const descr = new description.DescriptionSolution(this, this.exponentBits, this.numBits, '');
      descr.makeDescriptionConversion(this.solutionObject);
      return descr.result;
    },
    exerciseText() {
      if (this.fp1 === '') {
        return '';
      }
      return `${this.$t('conversionExercise1')} \\( fp= \\text{${this.fp1}} \\) ${this.$t('conversionExercise2')} ${this.exponentBits}`;
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
        // this.recalculate();
        this.drawExercise();
        this.generated = true;
      }
    });
  },
  methods: {
    setVariables(solutionObject) {
      this.solutionObject = solutionObject;
    },
    saveVals() {
      if (this.useCookies) {
        window.sessionStorage.setItem('Conv_fp1', this.fp1);
        window.sessionStorage.setItem('Conv_expBits', this.exponentBits);
        window.sessionStorage.setItem('Conv_numBits', this.numBits);
      }
    },
    generateExercise() {
      let number = (Math.floor(Math.random() * 100) + Math.random()).toFixed(4);
      if (Math.random() < 0.5) {
        number *= -1;
      }
      this.fp1 = number;
      this.generated = true;
      // this.recalculate();
      this.saveVals();
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
            // this.recalculate();
          }
        }
        if (this.xCoord - e.pageX > blockSize) {
          this.xCoord -= blockSize;
          if (this.exponentBits > 2) {
            this.exponentBits -= 1;
            // this.recalculate();
          }
        }
      }
    },
    expandFraction() {
      this.exponentBits = Math.max(this.exponentBits - 1, 2);
      if (this.generated) {
        // this.recalculate();
        this.saveVals();
      }
    },
    expandExponent() {
      this.exponentBits = Math.min(this.exponentBits + 1, this.numBits - 2);
      if (this.generated) {
        // this.recalculate();
        this.saveVals();
      }
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
