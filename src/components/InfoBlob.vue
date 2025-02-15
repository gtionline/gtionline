<template>
  <div class="infoblob-container">
    <!-- <div class="infoblob-i">i</div> -->
    <font-awesome-icon icon="info-circle" />
    <div class="infoblob-text-container">
      <slot />
      <!-- <span>
                Zuerst werden die Terme umsortiert, sodass sich absorbierende Terme leichter auffallen.
            </span> -->
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped lang="scss">

$infoblob-border-radius: 5px;

.infoblob-container {
    position: relative;
    text-align: center;
    // float: left;

    /* Makes i unselectable */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    cursor: pointer;

    // background-color: #2196f3;
    display: inline-block;

    width: 25px;
    font-size: 20px;
    // border-width: 1px;
    border-radius: $infoblob-border-radius;
    // border-style: solid;

    // border-color: white;
    color: #275EFE; // green;
    margin-left: 5px;
    white-space: normal;
}

.infoblob-container:hover {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    background-color: rgba(#2196f3, 0.5);
    .infoblob-text-container {
        // visibility: visible;
        display: block;
    }
}

.infoblob-text-container {
    // visibility: hidden;
    display: none;
    z-index: 100;
    position: absolute;
    background-color: white;
    color: black;

    // top: 69%;
    // left: 69%;
    top: 30px;
    left: -150px;
    // margin-left: -50%;
    // margin-right: -50%;
    // transform: translateX(-50%);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    width: 300px;
    padding: 10px;
    border-radius: .3em;
    border-top-left-radius: 0;

    white-space: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
}

@media screen and (max-width: 800px) {
    .infoblob-text-container {
        // show InfoBlob full screen on small devices
        position: fixed;
        top: 25%;
        left: 20%;
        width: 59%;
        z-index: 3;
    }
    .infoblob-container {
        // just visual tweaks
        border-radius: $infoblob-border-radius !important;
    }
}
</style>
