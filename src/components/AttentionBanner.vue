<template>
  <div class="attention">
    <font-awesome-icon
      class="infoCircle"
      icon="info-circle"
    />
    <label>{{ text }}</label>
  </div>
</template>

<script>
export default {
  name: 'AttentionBanner',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.attention {
  background: $lightPurple;
  border-left: 4px solid $purple;
  display: inline-block;
  text-align: left;
  height: 40px;
  line-height: 40px;
  padding-left: 60px;
  position: relative;
  box-sizing: border-box;
  width: 663px;
  margin: auto;
}

.infoCircle {
  position: absolute;
  margin: auto;
  left: 15px;
  top: 8px;
  color: $purple;
  font-size: 24px;
  display: block;
}
</style>
