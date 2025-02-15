<template>
  <span ref="mathJaxContainer" />
</template>
  
  <script>
  export default {
    name: 'MathJax',
    props: {
      formula: {
        type: String,
        required: true
      }
    },
    mounted() {
      this.renderMath();
    },
    updated() {
      this.renderMath();
    },
    methods: {
      renderMath() {
        this.$refs.mathJaxContainer.innerHTML = this.formula;
        if (window.MathJax) {
          window.MathJax.typeset([this.$refs.mathJaxContainer]);
        }
      }
    }
  };
  </script>