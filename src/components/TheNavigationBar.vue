<template>
  <div class="navbar">
    <!--<div class="hamburger" @click="responsive = !responsive"><font-awesome-icon class="bars" icon="bars"/></div> -->
    <input
      id="menu-btn"
      class="menu-btn"
      type="checkbox"
    >
    <label
      id="checkBoxLabel"
      class="menu-icon"
      for="menu-btn"
    ><span class="navicon" /></label>
    <router-link
      class="logoContainer"
      to="/"
    >
      <img
        id="logo"
        alt="logo"
        src="@/assets/logo.png"
      >
    </router-link>
    <!-- <ul class="menu" :class="responsive ? 'responsive' : ''">
      <li v-for="submenu in menu" v-bind:key="submenu.id">
        <router-link active-class="selectedNav" :to="`${submenu.link}`">{{submenu.label}}</router-link>
        <ul class="navbar-dropdown" v-if="submenu.items !== undefined">
          <li v-for="item in submenu.items" v-bind:key="item.id">
            <router-link :to="`${item.link}`">{{item.label}}</router-link>
          </li>
        </ul>
      </li>
    </ul> -->
    <div
      class="menu"
      :class="responsive ? 'responsive' : ''"
    >
      <router-link
        v-for="submenu in menu"
        :key="submenu.id"
        class="routerLink"
        active-class="selectedNav"
        :to="`${submenu.link}`"
        @click="checkMenuClose"
      >
        <span>{{ submenu.label }}</span>
      </router-link>
    </div>
    <div id="languageDropdown">
      <LSelect @input="chooseLang" />
    </div>
  </div>
</template>

<script>
import LanguageSelect from '@/components/LanguageSelect.vue';

export default {
  name: 'TheNavigationBar',
  components: {
    LSelect: LanguageSelect,
  },
  data() {
    return {
      responsive: false,
    };
  },
  computed: {
    menu() {
      return [
        {
          id: 0,
          label: this.$t('polyadic'),
          link: 'polyadic',
        },
        {
          id: 1,
          label: this.$t('floatingPoint'),
          link: 'fparithmetic',
        },
        {
          id: 2,
          label: this.$t('functionMin'),
          link: 'bfminimizer',
        },
        {
          id: 3,
          label: 'CMOS',
          link: 'cmos',
        },
        /* {
          id: 4,
          label: this.$t('contact'),
          link: 'contact',
        }, */
      ];
    },
  },
  methods: {
    checkMenuClose() {
      // console.log('Check');
      const checkBox = document.getElementById('menu-btn');
      checkBox.checked = false;
    },
    chooseLang(lang) {
      this.$i18n.locale = lang.name;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.selectedNav {
  background: $fresherBlue;
  border-radius: 15px;
}

#logo {
  height: 20px;
  width: 100px;
}

#languageDropdown {
  position: absolute;
  right: 14px;
  top: 14px;
}

.navbar {
  /* position: fixed; */
  flex-shrink: 0;
  width: 100%;
  top: 0;
  display: block;
  background-color: $freshBlue;
  color: white;
  z-index: 102;

  ul {
    list-style-type: none;
    li:hover > .navbar-dropdown {
      display: block;
    }
  }

  .routerLink {
    display: inline-block;
    position: relative;
    text-align: left;
    border-bottom: 1px solid #0d336f26;
    text-decoration: none;

    &:hover {
      color: $freshYellow;
    }

    span {
      white-space: nowrap;
      cursor: pointer;
      text-decoration: none;
      color: white;
      padding: 0.4em 1em;
      line-height: 2.0;
    }
  }

  li {
    display: inline-block;
    position: relative;
    text-align: left;
    border-bottom: 1px solid #0d336f26;

    &:hover {
      color: $freshYellow;
    }

    a {
      white-space: nowrap;
      cursor: pointer;
      text-decoration: none;
      color: white;
      padding: 0.4em 1em;
      line-height: 2.0;
    }
  }

  .menu-btn {
    display: none;
  }

  .menu-icon {
    cursor: pointer;
    display: block;
    float: left;
    padding: 28px 20px;
    position: relative;
    user-select: none;
    .navicon {
      background: white;
      display: block;
      height: 2px;
      position: relative;
      transition: background .2s ease-out;
      width: 18px;
    }
    .navicon:before, .navicon:after {
      background: white;
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      transition: all .2s ease-out;
      width: 100%;
    }
    .navicon:before {
      top: 5px;
    }
    .navicon:after {
      top: -5px;
    }
  }
  .menu {
    clear: both;
    overflow: hidden;
    max-height: 0;
    margin: 4px;
    margin-top: 7px;
    padding-left: 0;
    transition: max-height .2s ease-out;
  }
}

.hamburger {
  display: none;
}

@media (min-width: 768px) {
  .navbar {
    .menu {
      clear: none;
      max-height: none;
      overflow: visible;
      margin: 16px 0;
    }
    .menu-icon {
      display: none;
    }
  }
  #content {
    padding-top: 102px;
  }
  #logo {
    position: absolute;
    left: 10px;
    top: 20px;
  }
}

@media (max-width: 768px) {
  .hamburger {
    cursor: pointer;
    display: block;
    width: 40px;
    float: left;
    margin-top: 14px;
    margin-left: 10px;
    font-size: 24px;
  }

  :deep(.longLanguageName) {
    display: none;
  }

  .logoContainer {
    display: block;
    margin-top: 20px;
    margin-right: 50px;
  }

  #languageDropdown {
    top: 8px;
  }

  /* .menu-btn:checked ~ .menu {
    max-height: 240px;
    overflow: visible;
  } */

  .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }
  .menu-btn:checked ~ .menu-icon .navicon:before {
    transform: rotate(-45deg);
  }
  .menu-btn:checked ~ .menu-icon .navicon:after {
    transform: rotate(45deg);
  }
  .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
  .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
    top: 0;
  }

  .menu-btn:checked ~ .menu {
    position: relative;
    li, .routerLink {
      float: none;
      display: block;
      text-align: left;
      padding: 5px 0;
    }
  }

  .navbar {
    .menu {
      clear: none;
      max-height: none;
      overflow: visible;
      margin: 0;
      margin-top: 7px;
      li, .routerLink {
        display: none;
      }
    }

    .menu.responsive {
      position: relative;
      li, .routerLink {
        float: none;
        display: block;
        text-align: left;
        padding: 5px 0;
      }
    }

    .menu-icon {
      display: block;
    }
  }
  #content {
    padding-top: 102px;
  }
}

.navbar-dropdown {
  padding: 0;
  display: none;
  position: absolute;
  top: 100%;
  z-index: 2;
  box-sizing: border-box;
  overflow-y: auto;
  color: black;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-bottom: none;
  border-bottom: 2px solid $freshBlue;
  left: 50%;
  transform: translate(-50%);

  li {
    padding: 0;
    display: block;
    a {
      color: $freshBlue;
      text-decoration: none;
      padding: 0.4em 1em;
      line-height: 30px;
      display: block;
    }
  }
  li:hover {
    background-color: #F9F9F9;
    a {
      color: $darkYellow;
    }
  }
}
</style>
