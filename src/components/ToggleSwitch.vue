<!--
Very much inspired by w3schools: 'https://www.w3schools.com/howto/howto_css_switch.asp'
 -->

<template>
  <label class="switch">
    <input
      ref="checkbox"
      type="checkbox"
      @click="event => toggle(event)"
    >
    <span class="slider round" />
  </label>
</template>

<script>
export default {
  props: ['checkedDefault'],
  data() {
    return {
      checked: false,
    };
  },
  mounted() {
    this.checked = (this.checkedDefault === 'true');

    // console.log(this.checked);
    // console.log(typeof (this.checked));
    this.$refs.checkbox.checked = this.checked;
    this.$emit('toggle', this.checked);
  },
  methods: {
    toggle(event) {
      const checkbox = event.target;
      this.checked = checkbox.checked;

      // send event to parent component
      this.$emit('toggle', this.checked);
    },
  },
};
</script>

<style scoped lang="scss">
// the central dependency all other measurements are calculated from: (originally 1.4em)
$toggleswitch-travel: 1.3em;

$toggleswitch-width: calc($toggleswitch-travel / 26) * 60;
$toggleswitch-height: calc($toggleswitch-travel / 26) * 34;
$toggleswitch-knob-bottomleft-pos: calc($toggleswitch-travel / 26) * 4;
$toggleswitch-top-displacement: calc($toggleswitch-travel / 26) * 4;

// initial values:
// $toggleswitch-travel: 26px;
// $toggleswitch-width: 60px;
// $toggleswitch-height: 34px;

// $toggleswitch-travel: 26px;

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: $toggleswitch-width;
  height: $toggleswitch-height;
  top: -$toggleswitch-top-displacement;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  background: linear-gradient(160deg, #F1F4FF, #F9FAFF);
  -webkit-transition: .3s;
  transition: .3s;
}

.slider:before {
  position: absolute;
  content: "";
  height: $toggleswitch-travel;
  width: $toggleswitch-travel;
  left: $toggleswitch-knob-bottomleft-pos;
  bottom: $toggleswitch-knob-bottomleft-pos;
  background-color: white;
  background: linear-gradient(90deg, #4F97FF, #275EFE);
  -webkit-transition: .3s;
  transition: .3s;
}

input:checked + .slider {
  background-color: #2196F3;
  background: linear-gradient(90deg, #4F97FF, #275EFE);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX($toggleswitch-travel);
  -ms-transform: translateX($toggleswitch-travel);
  transform: translateX($toggleswitch-travel);
  background: linear-gradient(160deg, #F1F4FF, #F9FAFF);
}

/* Rounded sliders */
.slider.round {
  border-radius: $toggleswitch-height; // orig:34px
}

.slider.round:before {
  border-radius: 50%;
}
</style>
