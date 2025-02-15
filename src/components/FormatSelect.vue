<template>
  <div
    class="selectBox"
    :disabled="isDisabled"
  >
    <select
      v-model="selectedOption"
      class="fpfSelect"
      :disabled="isDisabled"
      @input="event => { $emit('input', num, event.target.value) }"
    >
      <option
        v-for="(name, option) in options"
        :key="option"
        :value="option"
      >
        {{ name }}
      </option>
    </select>
    <font-awesome-icon
      class="angleDown"
      icon="angle-down"
    />
  </div>
</template>

<script>
export default {
  name: 'FormatSelect',
  props: {
    num: {
      type: Number,
      required: true
    },
    sel: {
      type: String,
      required: true
    },
    options: {
      type: Object,  // Since it's used as a key-value map
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input'],
  data() {
    return {
      selectedOption: 'binary',
    };
  },
  watch: {
    sel: {
      immediate: true,
      handler(newValue) {
        this.selectedOption = newValue;
      },
    },
  },
  created() {
    this.selectedOption = this.sel;
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
  appearance: none;
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
