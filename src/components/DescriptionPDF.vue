<template>
  <div>
    <div style="display: flex; margin-bottom: 40px; margin-top: 0">
      <div style="flex: 50%; padding: 15px;">
        <img
          :src="codesign_logo"
          alt="CODESIGN_LOGO"
          style="width: 50%"
        >
      </div>
      <div style="flex: 50%; padding: 15px;">
        <img
          :src="fau_logo"
          alt="FAU_Logo"
          style="width: 50%"
        >
      </div>
    </div>
    <div
      id="equation"
      ref="equation"
      v-html="math"
    />
    <!--<button @click="render">Render</button>-->
  </div>
</template>

<script>
import faulogo from '@/assets/FAU_logo.png';
import codesignlogo from '@/assets/codesign.png';

export default {
  name: 'DescriptionPDF',
  data() {
    return {
      math: '',
      fau_logo: faulogo,
      codesign_logo: codesignlogo,
    };
  },
  beforeMount() {
    /* eslint-disable */
    window.addEventListener('afterprint', () => {
      window.open(this.$route.params.returnRoute, '_self');
    });
    /* eslint-enable */
  },
  mounted() {
    this.compileMath();
  },
  updated() {
    this.$nextTick(() => {
      setTimeout(() => {
        window.print();
      }, 250);
    });
  },
  methods: {
    render() {
      /* eslint-disable */
      const pdfGen = new jspdf.jsPDF('l', 'pt', 'a4');
      pdfGen.html(document.getElementById("equation"), {
        callback: function call(pdfFin) {
          const iframe = document.createElement('iframe');
          iframe.setAttribute('style', 'position:absolute;right:200px; top:200px; bottom:0; height:1000px; width:1000px');
          document.body.appendChild(iframe);
          iframe.src = pdfFin.output('datauristring');
        },
      });
      /* eslint-enable */
    },
    compileMath() {
      const langSelect = document.getElementById('languageDropdown');
      langSelect.style.visibility = 'collapse';
      const navBar = document.querySelector('.navbar');
      navBar.style.visibility = 'collapse';
      const menubtn = document.getElementById('menu-btn');
      menubtn.style.visibility = 'collapse';
      const menuicon = document.querySelector('.menu-icon');
      menuicon.style.visibility = 'hidden';
      const menu = document.querySelector('.menu');
      menu.style.visibility = 'collapse';
      const icon = document.getElementById('logo');
      icon.style.visibility = 'collapse';
      this.math = this.$route.params.math;
      this.$nextTick().then(() => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
  #equation {
    width: 1000px;
  }
</style>
