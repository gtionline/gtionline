<template>
  <div class="home">
    <div class="headerHome">
      <h1 class="titleHome">
        <span class="red">GTI</span> ONLINE
      </h1>
      <div class="textHome">
        <p>{{ $t('homePageText') }}</p>
      </div>
      <div class="linkHome">
        <router-link
          v-slot="{
            href, navigate, isActive, isExactActive,
          }"
          to="/fparithmetic"
          custom
        >
          <a
            :href="href"
            :class="['link', isActive && 'router-link-active', isExactActive && 'router-link-exact-active']"
            @click="navigate"
          >
            <div class="linkLabel">{{ $t('startTraining') }}</div>
            <div class="linkButton" />
          </a>
        </router-link>
      </div>
    </div>
    <div class="imageContainer">
      <div class="startImg">
        <img
          alt="Image of a sequential circuit"
          src="@/assets/gtionline.png"
        >
        <p class="imgDescription">
          {{ $t('sequentialCircuit') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style lang="scss" scoped>
  #content .home {
    padding: 0;
    /* margin-top: -64px; */
  }

  img {
    width: 80%;
  }

  .imgDescription {
    color: white;
  }

  .startImg {
    width: 40%;
    height: 40%;
    position: absolute;
    top: 50%;
    left: 50%;
    overflow: visible;
    transform: translateY(-50%);
  }

  #content {
    padding-top: 0px;
  }

  .red {
    /* color:#ff445c; */
  }

  .home {
    display: flex;
    flex-direction: row;
    background: $freshBlue;
  }

  .imageContainer {
    flex: 1;
  }

  .headerHome {
    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;
    padding-left: 130px;
    height: 100vh;
    color: #ebedf0;
    overflow-x: hidden;
    background-attachment: fixed;
    background-size: 35%, 1%;
    background-position: right 0 top 110px, right 110px top 48px;
  }

  .titleHome {
    margin-top: 50px;
    font-size: 83px;
    line-height: 86px;
    letter-spacing: 1px;
    color: #ebedf0;
    max-width: 460px;
    width: 100%;
    z-index: 100;
    text-align: left;

    animation-name: jumpAnimation;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }

  .textHome {
    text-align: left;
    font-size: 20px;
    line-height: 45px;
    color: #ebedf0;
    max-width: 500px;
    width: 100%;
    z-index: 100;
    margin: 40px 0 60px 0;
  }

  .linkHome {
    color: #fff;
    width: max-content;
  }

  .linkHome, .link {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .linkLabel {
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: .8px;
    color: #f9fafb;
    margin-right: 20px;
    transition: all .2s ease;
  }

  .linkButton {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAABmJLR0QA/wD/AP+gvaeTAAABL0lEQVQokZXOu0oDURSF4X/HENTCQi3MTJ7AYGttJYIgBLTKZLAKgoWVIEFMRCzsxDIgQi4iiu9hL2KjXS5WCiJ4IZllFfBCJpPdrrW+cyD0ZElPW05e4/0asbC543FkxjHvXKfXlBgaiEEZeAKWXsa4YkHxoYBGzR5iAYvAM2LFTXFGSb82oQBAo263FrAMvMnwnEdOhgIAmnW7wcgAn8Cm46nYy2wyq4nREQpRICBNwDIGgo121cqW8uUGohER+HldwVz8I85r4oudKAsZ8yYyGBhst6p2b1GfS3oqmHEIBEC+VbVTgEiAm9Ou4ADoYvitip33soGAk9MesA90gFyrahc/81DA8VVCFIGOiWyzZpd/O30B19eUxB0wLWO9XbHaoN/+u5msZl1fq2Gdb/tRYHOxlf28AAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-position: 50%;
    transition: all .2s ease;
  }

  @keyframes jumpAnimation {
    from {transform: translate(0, 0vh);}
    to {transform: translate(0, -4vh);}
  }

  @media screen and (min-width: 1600px) {
    .textHome {
      font-size: 20px;
      max-width: 520px;
      line-height: 38px;
    }
  }

  @media(max-width: 750px){
    .headerHome{
      padding: 20px;
      padding-left: 20px;
      height: auto;
    }
  }

  @media(max-width: 1300px){
    .startImg{
      display: none;
    }
  }
</style>
