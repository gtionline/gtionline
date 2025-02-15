<template>
  <div>
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: tab === selectedTab }"
        @click="selectTab(tab)"
      >
        {{ $t(tab) }}
      </button>
    </div>
    <div class="tab-content">
      <slot :name="selectedTab" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedTab: this.tabs[0],
    };
  },
  methods: {
    selectTab(tab) {
      this.selectedTab = tab;
    },
  },
};
</script>

<style scoped>
  .tabs {
    display: flex;
    justify-content: center;
  }
  .tabs button {
    padding: 0 20px;
    cursor: pointer;
    border: none;
    background: none;
    color: black;
    border-radius: 0;
  }
  .tabs button.active {
    border-bottom: 2px solid #007bff;
    font-weight: bold;
  }
  .tab-content {
    padding: 15px;
    padding-bottom: 5px;
    border-top: 1px solid #ddd;
    border-radius: 4px;
  }
</style>
