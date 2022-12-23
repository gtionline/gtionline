<template>
<div class="polyadic">
  <tabs v-model="selectedTab">
    <tab
      v-for="(tab, i) in tabs"
      :key="`t${i}`"
      :val="tab"
      :label="$t(tab)"
      :indicator="true"
    />
  </tabs>
  <tab-panels
    v-model="selectedTab"
    :animate="false"
    :swipeable="false"
  >
    <tab-panel val="conversionExercise">
      <h3 class="title">{{$t('conversionExercise')}}</h3>
      <pce/>
    </tab-panel>
    <tab-panel val="conversion">
      <h3 class="title">{{$t('conversion')}}</h3>
      <pcf/>
    </tab-panel>
    <tab-panel val="arithmeticFree">
      <h3 class="title">{{$t('arithmetic')}}</h3>
      <paf/>
    </tab-panel>
  </tab-panels>
</div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import {
  Tabs, Tab, TabPanels, TabPanel,
} from 'vue3-tabs';
import PolyadicConversionExercise from './PolyadicConversionExercise.vue';
import PolyadicConversionFree from './PolyadicConversionFree.vue';
import PolyadicArithmeticFree from './PolyadicArithmeticFree.vue';

const tabs = ['conversionExercise', 'conversion', 'arithmeticFree'];

export default defineComponent({
  name: 'TinyTabs',
  components: {
    pce: PolyadicConversionExercise,
    pcf: PolyadicConversionFree,
    paf: PolyadicArithmeticFree,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
  },
  data() {
    return {
      selectedTab: 'conversionExercise',
    };
  },
  setup() {
    const state = reactive({
      selectedTab: tabs[1],
    });
    return {
      tabs,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
</style>
