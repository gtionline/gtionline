<template>
  <div id="websiteContainer">
    <TheNavigationBar />
    <div id="content">
      <router-view />
    </div>
    <footer id="footer">
      <span>{{ $t('disclaimerFooter') }}</span>
      <span>
        © {{ $t('copyright') }}
        <a href="https://www.studon.fau.de/studon/ilias.php?ref_id=4386562&cmd=view&cmdClass=ilobjcontentpagegui&cmdNode=12b:q0&baseClass=ilrepositorygui">{{ $t('impressum') }}</a>.
        {{ $t('contact') }}: <a href="mailto:cs12-gti@fau.de?subject=GTI-Online Feedback&body=Nachricht">cs12-gti@fau.de</a>
        <!-- <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>-->
      </span>
      <div id="logoContainerFooter">
        <a href="https://www.cs12.tf.fau.de">
          <img
            id="codesignLogo"
            alt="white codesign logo"
            src="@/assets/codesign_white.png"
          >
        </a>
        <a href="https://www.fau.de/">
          <img
            id="fauLogo"
            alt="white FAU logo"
            src="@/assets/FAU_logo_white.png"
          >
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import TheNavigationBar from './components/TheNavigationBar.vue';

export default {
  name: 'App',
  components: {
    TheNavigationBar,
  },
};
</script>

<style lang="scss">
#fauLogo, #codesignLogo {
  top: 18px;
  height: 30px;
  display: block;
  position: absolute;
  right: 30px;
}

#codesignLogo {
  right: 205px;
}

#websiteContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

.logoContainerFooter {
  position: absolute;
  right: 0;
  top: 0;
}

#content {
  flex-grow: 1;
  overflow: auto;
  min-height: 2em;
  /* padding-bottom: 68px;
  padding-top: 64px; */

  & > div {
    padding: 10px;
  }
}

#footer {
  text-align: center;
  padding: 5px;
  background-color: $fresherBlue;
  color: white;
  /* position: fixed; */
  width: 100%;
  bottom:0;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  white-space: nowrap;

  a {
    color: white;
  }

  span {
    display: block;
    overflow-x: auto;
    padding: 2px;
    margin: 0;
  }
}

html {
  height: 100%;
}

body {
  height: 100%;
  line-height: 25px;
}

.bodyContainer {
  width: 1000px;
  margin: auto;
  text-align: left;
}

@media screen and (max-width: 1000px) {
  .bodyContainer {
    width: 100%;
  }
}

#app {
  font-family: 'Source Sans Pro', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  // background: linear-gradient(90deg, rgba(3,9,18,1) 0%, rgba(4,18,52,1) 20%, rgba(4,18,52,1) 80%, rgba(3,9,18,1) 100%);
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.tab:hover {
  background: #ababab5e;
}

.menu li:hover {
  background: #ffffff2b;
}

h4 {
  font-size: 18px;
  /* margin-top: 40px; */
}

@media screen and (max-width: 700px) {
  #content {
    padding-bottom: 136px;
  }
  #codesignLogo, #fauLogo {
    display: none;
  }
}
@media screen and (max-width: 1229px) {
  #codesignLogo, #fauLogo {
    display: none;
  }
}

</style>
