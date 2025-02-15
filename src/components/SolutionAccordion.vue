<template>
  <div class="accordion js-accordion accordionContainer">
    <div
      v-for="panel in solutionDescription"
      :key="panel.name"
      class="accordion__item js-accordion-item"
      @click="setActive"
    >
      <div class="accordion-header js-accordion-header">
        {{ panel.name }}
      </div>
      <div class="accordion-body js-accordion-body">
        <div class="accordion-body__contents">
          <span v-html="panel.text" />
          <!-- <slot :name="'slot'+index" scope="props"></slot> -->
        </div>
        <div class="accordion js-accordion">
          <div
            v-for="subpanel in panel.subpanels"
            :key="subpanel.name"
            class="accordion__item js-accordion-item"
            @click="setActive"
          >
            <div class="accordion-header js-accordion-header">
              {{ subpanel.name }}
            </div>
            <div class="accordion-body js-accordion-body">
              <div class="accordion-body__contents">
                <span v-html="subpanel.text" />
              </div>
              <div
                v-for="subsubpanel in subpanel.subsubpanels"
                :key="subsubpanel.name"
                class="accordion__item js-accordion-item"
                @click="setActive"
              >
                <div class="accordion-header js-accordion-header">
                  {{ subsubpanel.name }}
                </div>
                <div class="accordion-body js-accordion-body">
                  <div class="accordion-body__contents">
                    <span v-html="subsubpanel.text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SolutionAccordion',
  props: ['solutionDescription'],
  data() {
    return {};
  },
  methods: {
    setActive(e) {
      if (e.target.classList.contains('accordion-header')) {
        if (e.target.parentNode === e.currentTarget) {
          e.currentTarget.classList.toggle('active');
        }
      }
      e.preventDefault();
    },
  },
};
</script>

<style scoped lang="scss">
.accordion {
  font-size: 1rem;
  width: 1000px;
  border-radius: 5px;
}

.accordion__item.active > .accordion-body{
  display: block;
}

.accordionContainer {
  margin: 15px auto;
}

.accordion-header, .accordion-body {
  background: white;
}

.accordion-header {
  padding: 1em 1.5em;
  background: $freshBlue;// #3F51B5;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all .3s;
  text-transform: uppercase;
}

.accordion__item {
  border-bottom: 1px solid #3a4ba4;
}

.accordion__item .accordion__item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.accordion__item .accordion__item .accordion__item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.accordion-header:hover {
  background: $brightBlue;
  position: relative;
  z-index: 5;
}

.accordion-body {
  background: #ffffff5e;
  color: #353535;
  display: none;
}

.accordion-body__contents {
  padding: 1.5em 1.5em;
  font-size: .85em;
  text-align: justify;
  text-align-last: center;
}

.accordion__item.active:last-child .accordion-header {
  border-radius: none;
}

.accordion:first-child > .accordion__item > .accordion-header {
  border-bottom: 1px solid transparent;
}

.accordion__item > .accordion-header:after {
  content: "\f3d0";
  font-family: IonIcons;
  font-size: 1.2em;
  float: right;
  position: relative;
  top: -2px;
  transition: .3s all;
  transform: rotate(0deg);
}

.accordion__item.active > .accordion-header:after {
  transform: rotate(-180deg);
}

.accordion__item.active .accordion-header {
  background: $brightBlue;
}

.accordion__item .accordion__item .accordion-header {
  background: #B0B0FF;
  color: #353535;
}

.accordion__item .accordion__item  .accordion__item .accordion-header {
  background: #f1f1f1;
  color: #353535;
  border: 2px #70757a;
}

@media screen and (max-width: 1000px) {
  .accordion {
    width: 100%;
  }
}
</style>
