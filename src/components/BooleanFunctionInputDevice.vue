<template>
  <div>
    <div>
      <label for="numVarSelect">{{ $t('numVarInput') }}:</label>
      <FSelect
        id="numVarSelect"
        :sel="dropDownMenuSelectedNumVars"
        :num="0"
        class="leftMargin10"
        :options="numVarOptions"
        @input="onChooseNumVars"
      />
      <!-- <button @click="setNumVar()" class="leftMargin10">{{$t('confirm')}}</button> -->
    </div>

    <div class="mtop">
      <!-- <label>{{$t('varNaming')}}:</label> -->
      <div class="divMargin" />
      <div class="radioCounter">
        <label
          v-for="radio in radios"
          :key="radio.value"
          class="p-default p-round p-smooth p-pulse"
        >
          <input
            ref="radios"
            v-model="varNamingScheme"
            name="varRadio"
            class="mj"
            type="radio"
            :value="radio.value"
          >
          <div
            class="radioSvg"
            v-html="toSvg(radio.name)"
          />
        </label>
      </div>
    </div>
    <div class="">
      <table
        v-if="varNamingScheme === 'custom'"
        class="customNamingTable"
      >
        <thead>
          <tr>
            <td v-html="toSvg('i')" />
            <th
              v-for="index in customIndices"
              :key="index"
            >
              {{ index }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-html="toSvg('\\alpha')" />
            <td
              v-for="index in customIndices"
              :key="index"
            >
              <input
                v-model="customNamingScheme[index]"
                type="text"
                :placeholder="`a_${index}`"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <span style="padding-top:3px; padding-right:10px;">{{ $t("kvDiagram") }}</span>
    <ToggleSwitch
      checked-default="false"
      @toggle="toggleMethodOfInputForBooleanFunction"
    />
    <span style="padding-top:3px; padding-left:10px;">{{ $t("truthtable") }}</span>
    <!-- </div> -->
    <div>
      <!--KeepAlive makes the components persist, even if not shown. Removing
      this results in for example losing the KVDiagram state after switching to bftable input mode-->
      <KeepAlive>
        <KVDiagr
          v-if="methodOfInputForBooleanFunction === METHOD_OF_INPUT_FOR_BOOLEAN_FUNCTION_KVDIAGRAM"
          ref="childKVDiagram"
          :num-variables="numVariables"
          :var-names="currentVarNames"
          class="kvdiagram"
          @kvdiagram-modified="onKVDiagramModified($event, kvdiagram)"
          @requesting-kvdiagram-data-after-reactivation="notifyChildKVDiagramOfBF()"
        />
        <TruthTable
          v-else
          ref="childTruthTable"
          :num-variables="numVariables"
          :var-names="currentVarNames"
          @truthtable-modified="onTruthTableModified($event, kvdiagram)"
          @requesting-bf-after-reactivation="notifyChildTruthTableOfBF()"
        />
      </KeepAlive>
      <button
        class="button-export-png"
        @click="exportPNG()"
      >
        PNG
      </button>
      <!-- <button v-else @click="tmpFunc()">Set smth in KVDiagram</button> -->
    </div>
  </div>
</template>

<script>
// import { onMounted } from 'vue';
import { KVDiagram } from '@/scripts/algorithms/booleanFunctions/KVDiagram';
import KVDiagr from './KVDiagram.vue';
import TruthTable from './TruthTable.vue';
import FormatSelect from './FormatSelect.vue';
import ToggleSwitch from './ToggleSwitch.vue';

export default {
  name: 'BooleanFunctionInputDevice',
  components: {
    KVDiagr,
    FSelect: FormatSelect,
    TruthTable,
    ToggleSwitch,
  },
  data() {
    this.METHOD_OF_INPUT_FOR_BOOLEAN_FUNCTION_KVDIAGRAM = 'method_kvdiagram';
    this.METHOD_OF_INPUT_FOR_BOOLEAN_FUNCTION_FUNCTION_TABLE = 'method_function_table';
    this.DEFAULT_NUM_VARIABLES = 4;

    return {
      methodOfInputForBooleanFunction: this.METHOD_OF_INPUT_FOR_BOOLEAN_FUNCTION_KVDIAGRAM,

      booleanFunctionAsKVDiagram: new KVDiagram(null, this.DEFAULT_NUM_VARIABLES),

      numVariables: this.DEFAULT_NUM_VARIABLES,
      dropDownMenuSelectedNumVars: this.DEFAULT_NUM_VARIABLES,
      numVarOptions: {
        2: 2, 3: 3, 4: 4, 5: 5,
      },

      varNamingScheme: 'xyz',
      // currentVarNames: this.varNames.xyz,
      radios: [
        { value: 'abc', name: 'a, b, \\dots' },
        { value: 'xyz', name: 'x, y, \\dots' },
        { value: 'x', name: 'x_0, x_1, \\dots' },
        { value: 'x1', name: 'x_1, x_2, \\dots' },
        { value: 'custom', name: 'custom' },
      ],

      customIndices: [0, 1, 2, 3, 4],
      customNamingScheme: {
        0: '', 1: '', 2: '', 3: '', 4: '',
      },
    };
  },
  computed: {
    varNames() {
      return {
        custom: this.customNamingScheme,
        abc: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        xyz: ['x', 'y', 'z', 'u', 'v', 'w', 'q'],
        x: ['x_0', 'x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6'],
        x1: ['x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6', 'x_7'],
      };
    },
    currentVarNames() {
      return this.varNames[this.varNamingScheme];
    },
  },
  watch: {
    numVariables(newAmount, oldAmount) {
      if (newAmount === oldAmount || newAmount < 1) {
        return;
      }
      // set to empty bf in new size
      this.booleanFunctionAsKVDiagram = new KVDiagram(null, newAmount);
      // console.log('BFInputDevices internal watch function registered a change in numVariables! Set to bf ', this.booleanFunctionAsKVDiagram);
    },
  },
  created() {
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  },
  methods: {
    setMethodOfInputForBooleanFunction(method) {
      this.methodOfInputForBooleanFunction = method;

      // console.log('set method to: ');
      // console.log(method);
    },
    toggleMethodOfInputForBooleanFunction(toggleChecked) {
      if (toggleChecked) {
        this.methodOfInputForBooleanFunction = this.METHOD_OF_INPUT_FOR_BOOLEAN_FUNCTION_FUNCTION_TABLE;
      } else {
        this.methodOfInputForBooleanFunction = this.METHOD_OF_INPUT_FOR_BOOLEAN_FUNCTION_KVDIAGRAM;
      }
    },
    onChooseNumVars(num, val) {
      this.dropDownMenuSelectedNumVars = parseInt(val, 10);

      this.setNumVar();
    },
    setNumVar() {
      this.numVariables = this.dropDownMenuSelectedNumVars;
    },
    onKVDiagramModified(kvdiagram) {
      // update this' bf on event from child stating that kv diagram has been modified there
      this.setBooleanFunctionFromKVDiagram(kvdiagram);
    },
    onTruthTableModified(kvdiagram) {
      // console.log('received: ', kvdiagram);
      this.setBooleanFunctionFromKVDiagram(kvdiagram);
    },
    /** @param {Proxy(KVDiagram)} kvdiagram
     * 'PROTECTED' METHOD
     * Only updates internal state. Used by the children (event listeners of events emitted by children)
     * to notify this InputDevice of changes.
     * Therefore only manipulates internal state and does not manipulate the children.
    */
    setBooleanFunctionFromKVDiagram(kvdiagram) {
      this.booleanFunctionAsKVDiagram = kvdiagram;
      // console.log('BooleanFunctionInputDevice.setBooleanFunctionFromKVDiagram(kvdiagram) called. Parameter kvdiagram:');
      // console.log(this.booleanFunctionAsKVDiagram);
    },
    /** @param {Proxy(KVDiagram)} kvdiagram
     * Updates internal state and actively notifies children of update.
     * Used from outside or the InputDevice element itself to overwrite the entire state (including children) as well.
    */
    async overwriteBFFromKVDiagram(kvdiagram) {
      /* await is needed, to have the change of the Prop 'numVariables' be visible to the child before
       calling methods on the child requiring the new value */
      await (this.numVariables = kvdiagram.getAmountLiterals());

      this.setBooleanFunctionFromKVDiagram(kvdiagram);
      if (this.methodOfInputForBooleanFunction === this.METHOD_OF_INPUT_FOR_BOOLEAN_FUNCTION_FUNCTION_TABLE) {
        this.notifyChildTruthTableOfBF();
      } else {
        this.notifyChildKVDiagramOfBF();
      }
    },
    getSVG(id) {
      const formula = this.varNames[this.varNamingScheme][id];
      const formulaSVG = window.MathJax.tex2svg(formula);
      const svgmath = formulaSVG.getElementsByTagName('svg')[0];
      return svgmath.outerHTML;
    },
    toSvg(formula) {
      const formulaSVG = window.MathJax.tex2svg(formula);
      const svgmath = formulaSVG.getElementsByTagName('svg')[0];
      return svgmath.outerHTML;
    },
    notifyChildKVDiagramOfBF() {
      this.$refs.childKVDiagram.setKVDiagram(this.getBFAsKVDiagram());
    },
    notifyChildTruthTableOfBF() {
      this.$refs.childTruthTable.setKVDiagram(this.getBFAsKVDiagram());
    },
    injectCustomVariableNames(variableNames) {
      console.log(variableNames);
      for (let i = 0; i < 5; i += 1) {
        this.customNamingScheme[i] = i < variableNames.length ? variableNames[i] : '';
      }

      // activate custom naming scheme
      this.varNamingScheme = 'custom';
    },
    exportPNG() {
      let svg;
      if (this.methodOfInputForBooleanFunction === this.METHOD_OF_INPUT_FOR_BOOLEAN_FUNCTION_FUNCTION_TABLE) {
        svg = this.$refs.childTruthTable.getSVGDOM();
      } else {
        svg = this.$refs.childKVDiagram.getSVGDOM();
      }
      const can = document.createElement('canvas');
      const ctx = can.getContext('2d');
      const loader = new Image();
      const scalingFactor = 3;
      can.width = parseInt(svg.getAttribute('width'), 10) * scalingFactor;
      loader.width = can.width;
      can.height = parseInt(svg.getAttribute('height'), 10) * scalingFactor;
      loader.height = can.height;
      // console.log(can.width);
      // console.log(can.height);
      loader.onload = () => {
        ctx.drawImage(loader, 0, 0, loader.width, loader.height);
        const exportImg = can.toDataURL();
        const aDownloadLink = document.createElement('a');
        aDownloadLink.download = 'sym.png';
        aDownloadLink.href = exportImg;
        aDownloadLink.click();
      };
      const svgAsXML = (new XMLSerializer()).serializeToString(svg);
      loader.src = `data:image/svg+xml,${encodeURIComponent(svgAsXML)}`;
    },
    //
    // ### GETTER METHODS ###
    //
    getBFAsKVDiagram() {
      return this.booleanFunctionAsKVDiagram;
    },
    // tmpFunc() { // only for debugging. // TODO remove
    //   console.log('tmpFunc() called');
    //   // console.log(this.$refs);
    //   // this.$refs.childKVDiagram.setKVDiagram(this.booleanFunctionAsKVDiagram);
    //   this.onKVDiagramModified(new KVDiagram([[1, 0], [0, 0]], 2));
    // },
  },
};
</script>

<style lang="scss">
@media screen and (max-width: 750px) {
  .radioCounter {
    flex-direction: column !important;

    input {
      margin-top: 0px !important;
      height: 17px !important;
      position: relative !important;
      transform: translate(0, -.7em) !important;
    }
  }

  .radioSvg {
    margin-top: -1em !important;
  }

  .mtop {
    .divMargin {
      display: block;
      height: 1em;
    }
  }
}

.mtop {

  // margin-top: .5em;
  .divMargin {
    display: block;
  }
}

.radioCounter {
  display: flex;
  flex-direction: row;
}

.p-default {
  margin-right: 10px;
}

.customNamingTable {
  margin: 0 auto;
  margin-bottom: 1em;

  input {
    width: 40px;
  }
}

.button-export-png {
  float: right;
  margin-top: -4em;

  padding-left: 3px !important;
  padding-right: 3px !important;
  font-size: .7em;
  height: 1.8em;
  line-height: 2em;
  background-color: $lightBlue;
  color: black;
}
</style>
