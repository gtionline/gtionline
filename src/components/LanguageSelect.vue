<template>
  <div
    class="langSelect"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div
      class="selected"
      :class="{ open }"
      @click="open = !open"
    >
      <img
        class="langImg"
        alt="language flag"
        :src="selected.img"
      >
      <span class="longLanguageName">{{ selected.nameLong }}</span>
      <font-awesome-icon
        class="angleDown"
        icon="angle-down"
      />
    </div>
    <div
      class="items"
      :class="{ selectHide: !open }"
    >
      <div
        v-for="lang of languages"
        :key="lang.name"
        class="item"
        @click="optionSelect(lang)"
      >
        <img
          class="langImg"
          alt="language flag"
          :src="lang.img"
        >
        <span class="longLanguageName">{{ lang.nameLong }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import americanFlag from '../assets/americanFlag.png';
import frenchFlag from '../assets/frenchFlag.png';
import spanishFlag from '../assets/spanishFlag.png';
import chineseFlag from '../assets/chineseFlag.png';
import japaneseFlag from '../assets/japaneseFlag.png';
import ukraineFlag from '../assets/ukraineFlag.png';
import portugueseFlag from '../assets/portugueseFlag.png';
// import latinFlag from '..@/assets/latinFlag.png';
import germanFlag from '../assets/germanFlag.png';

export default {
  name: 'LanguageSelect',
  props: ['sel', 'tabindex'],
  data() {
    return {
      languages: [
        {
          name: 'de',
          nameLong: 'Deutsch',
          img: germanFlag,
        },
        {
          name: 'en',
          nameLong: 'English',
          img: americanFlag,
        },
        {
          name: 'fr',
          nameLong: 'Français',
          img: frenchFlag,
        },
        {
          name: 'es',
          nameLong: 'Español',
          img: spanishFlag,
        },
        {
          name: 'pt',
          nameLong: 'Português',
          img: portugueseFlag,
        },
        {
          name: 'uk',
          nameLong: 'Українська',
          img: ukraineFlag,
        },
        {
          name: 'ja',
          nameLong: '日本語',
          img: japaneseFlag,
        },
        {
          name: 'ch',
          nameLong: '中国',
          img: chineseFlag,
        },

        /* {
          name: 'lt',
          nameLong: 'Latin',
          img: latinFlag,
        }, */
      ],
      selected: null,
      open: false,
    };
  },
  created() {
    this.selected = this.languages[0];
  },
  mounted() {
    this.$emit('input', this.selected);
  },
  methods: {
    optionSelect(lang) {
      this.selected = lang;
      this.open = false;
      this.$emit('input', lang);
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.langSelect {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 36px;
  line-height: 36px;
  font-size: 13px;
  text-align: left;
  text-decoration: none;
  vertical-align: middle;
  background-color: transparent;
  color: #202124!important;
  background-image: none;
}

.selected {
  position: relative;
  border-radius: 6px;
  background-color: #fff;
  border: none;
  display: inline-block;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;
  padding-right: 30px;
  vertical-align: middle;

  &.open {
    border-radius: 6px 6px 0px 0px;
  }

  /* &:after {
    content: "\f3d0";
    font-family: IonIcons;
    font-size: 1.2em;
    position:absolute;
    right: 10px;
    transition: .3s all;
    transform: rotate(0deg);
    pointer-events: none;
  } */
  .angleDown {
    font-size: 1.5em;
    position:absolute;
    right: 10px;
    top: 9px;
    transition: .3s all;
    transform: rotate(0deg);
    pointer-events: none;
  }
}

.items {
  color: #111;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  position: absolute;
  background-color: #e9e9e9;
  left: 0;
  right: 0;
}

.item {
  color: #111;
  padding-left: 8px;
  cursor: pointer;
  user-select: none;

  &:hover{
    background-color: #d0d0d0;
  }
}

.langImg {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  padding-right: 5px;
}

.selectHide {
  display: none;
}
</style>
