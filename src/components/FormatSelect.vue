<template>
  <div class="selectBox" :disabled="isDisabled">
    <select
      class="fpfSelect"
      v-model="selectedOption"
      :disabled="isDisabled"
      @input="event => { $emit('input', num, event.target.value) }">
      <option v-for="(name, option) in options" :value="option" :key="option">{{name}}</option>
    </select>
    <font-awesome-icon class="angleDown" icon="angle-down" />
  </div>
</template>

<script>
export default {
  name: 'FormatSelect',
  props: ['num', 'sel', 'options', 'isDisabled'],
  emits: ['input'],
  created() {
    this.selectedOption = this.sel;
    // console.log(`Select was created: ${this.selectedOption}`);
  },
  data() {
    return {
      selectedOption: 'binary',
    };
  },
  watch: {
    sel: { // handler was never called, changing this to sel makes it responsive
      immediate: true,
      handler(newValue) {
        // console.log(`New value selected ${newValue}`);
        this.selectedOption = newValue;
      },
    },
  },
  methods: {
    setSelected(index) {
      this.selectedOption = index;
    },
  },
};
</script>

<style scoped lang="scss">
select{
  -webkit-appearance: none;
  border: none;
  font-size: 13px;
  list-style: none;
  outline: none;
  overflow: hidden;
  text-align: left;
  text-decoration: none;
  vertical-align: middle;
  background-color: transparent;
  //color: #202124!important;
  height: 36px;
  padding-left: 8px;
  padding-right: 30px;
  background-image: none;
}

.selectBox {
  position: relative;
  border-radius: 6px;
  background-color: #fff;
  border: none;
  display: inline-block;

  .angleDown {
    font-size: 1.2em;
    position:absolute;
    right: 10px;
    top: 7px;
    transition: .3s all;
    transform: rotate(0deg);
    pointer-events: none;
  }

  &[disabled=disabled]:after{
    content: "";
  }
}

.bits .angleDown {
  font-size: 1.5em;
  top: 10px;
}
</style>
