<template>
  <div class="accordion-item">
    <!-- Item title -->
    <div
      class="accordion-item-header"
      @click="doclick"
    >
      <slot name="accordion-item-title" />
      <font-awesome-icon
        class="angleDown"
        icon="angle-down"
      />
    </div>
    <!-- Item body -->
    <div
      v-if="expanded === true"
      ref="accordion_item_body"
      class="accordion-item-body"
    >
      <!-- NOTE: 'expanding sideways' is now more like a fullscreen mode -->
      <button
        v-if="expandableSideways"
        class="accordion-item-expand-sideways-toggle ion-md-expand"
        @click="toggleExpandSideways"
      >
        >
      </button>
      <slot name="accordion-item-body" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['expandableSideways'],
  data() {
    return {
      expanded: false,
      expandedSideways: true,
    };
  },
  methods: {
    doclick(e) {
      this.expanded = !this.expanded;

      if (e.target.classList.contains('accordion-item-header')) {
        e.target.classList.toggle('active');
      }
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      });
      e.preventDefault();
    },
    toggleExpandSideways(e) {
      this.expandedSideways = !this.expandedSideways;
      // console.log('target: ', e.target);
      this.$nextTick(() => {
        if (window.MathJax) {
          window.MathJax.typeset();
        }
      });

      if (e.target.classList.contains('accordion-item-expand-sideways-toggle')) {
        // e.target.classList.toggle('active');
        // console.log('toggle requested!');
        this.$refs.accordion_item_body.classList.toggle(
          'accordion-item-body-expanded-sideways',
        );
      }
    },
  },
};
</script>

<style scoped lang="scss">

  @media screen and (max-width: 750px) {
    .accordion-item-body {
      padding: .8em !important;
    }
  }

  .accordion-item-header {
    background-color: $freshBlue;

    text-align: left;
    padding: 12px;
    padding-left: 1.5em;
    color: white;
    border-bottom: 1px solid #3a4ba4;
    cursor: pointer;

    &:hover {
      background-color: $fresherBlue;
      position: relative;
      z-index: 5;
    }
  }

  .angleDown {
    font-size: 1.5em;
    float: right;
    position: relative;
    transition: .3s all;
    transform: rotate(0deg);
  }

  .accordion-item-header.active .angleDown {
    transform: rotate(-180deg);
  }

  .accordion-item-body {
    border-top-style: none;
    border-bottom-style: none;
    border-left-style: solid;
    border-right-style: solid;
    border: lightgray;
    // padding: 1em;
    overflow-x: auto;
    background: #ffffff5e;
    text-align: left;
    padding: 1.5em;

    overflow-x: auto;

    .accordion-item-expand-sideways-toggle {
      position: sticky;
      left: 0;
      font-size: 1.4em;

      padding-top: .08em;
      background-color: $freshBlue;
    }
    .accordion-item-expand-sideways-toggle:hover {
      background-color: transparent;
      color: rgba(black, 0.2);
    }
  }

  .accordion-item-body-expanded-sideways {
    // position: relative;
    // width: 96vw;
    // left: 50%;
    // margin-left: -49vw;

    background: rgba(255, 255, 255, 1);

    border-style: solid;
    border-width: 1px;

    position: fixed;
    overflow-y: auto;
    z-index: 2;
    margin-left: 0;

    top: 5%;
    left: 0%;
    width: 100%;
    height: 90%;
    @media screen and (max-width: 1400px) {
      width: 95%;
      height: 90%;
      top: 10px;
      left: 0%;
      padding-top: 4em !important
    }
    @media screen and (max-width: 700px) {
      // width: 90%;
    }

  }

  /* .accordion-item:first-child {
    .accordion-item-header {
      border-top-style: solid;
    }
  } */
  .accordion-item:last-child {
    .accordion-item-body {
      border-bottom-style: solid;
    }
  }

  // .accordion-item-header.active {
  //   background-color: red;
  // }
</style>
