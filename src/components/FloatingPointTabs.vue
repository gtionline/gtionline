<template>
  <div class="floatingPoint">
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
      <tab-panel val="conversion">
        <fpc />
      </tab-panel>
      <tab-panel val="exercises">
        <fpe />
      </tab-panel>
      <tab-panel val="arithmetic">
        <fpa />
      </tab-panel>
    </tab-panels>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import {
  Tabs, Tab, TabPanels, TabPanel,
} from 'vue3-tabs';
import FloatingPointArithmetic from './FloatingPointArithmetic.vue';
import FloatingPointExercises from './FloatingPointExercises.vue';
import FloatingPointConversion from './FloatingPointConversion.vue';

const tabs = ['conversion', 'exercises', 'arithmetic'];

export default defineComponent({
  name: 'TinyTabs',
  components: {
    fpc: FloatingPointConversion,
    fpe: FloatingPointExercises,
    fpa: FloatingPointArithmetic,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
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
  data() {
    return {
      selectedTab: 'arithmetic',
    };
  },
});
</script>

<style lang="scss">
.default-tabs {
  position: relative;
  margin: 10px auto;
  display: inline-block;

  &__item {
    display: inline-block;
    margin: 0 5px;
    padding: 0 10px;
    padding-bottom: 8px;
    font-size: 16px;
    color: gray;
    background: none;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    border-radius: 0;
    transition: all 0.25s;

    &_active {
      color: black;
      border-bottom: 2px solid gray;
    }

    &:hover {
      background: none;
      border-radius: 0;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:focus {
      outline: none;
      border-bottom: 2px solid gray;
      color: black;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
  &__active-line {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: black;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
.tabs {
  justify-content: center;
  cursor: pointer;
}
.tab {
  margin: auto;
  /* width: 1240px; */
  padding: 8px;
  background: #ffffff5e;
}

.tinytabs {
  margin: auto;
  width: 1240px;
  padding: 8px;

  .tabs {
    margin-left: 15px;
    display: flex;
    flex-flow: row wrap;

    .tab {
      margin: 0 3px 2px 0;
      background: #ffffff5e;
      display: block;
      padding: 12px 15px;
      text-decoration: none;
      color: #666;
      border-radius: 3px 3px 0 0;

      &.sel {
        background: #fff;
        color: #333;
        text-shadow: none;
      }
      .close {
        padding-left: 5px;
      }
    }
  }
  .section {
    background: #ffffff5e;
    overflow: hidden;
    padding: 15px;
    clear: both;
    border-radius: 3px;
  }
}
</style>
