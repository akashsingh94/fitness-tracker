<template>
  <div class="ft-card" :class="[className, { 'ft-card--full-size': fullSize }]">
    <h2 v-if="headerTitle" class="ft-card-header">{{ headerTitle }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    headerTitle: {
      type: String,
    },
    className: {
      type: String,
      default: "",
    },
    fullSize: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.ft-card {
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05)
  );
  background-color: #eeeeee;
}
.ft-card-header {
  margin: 0;
  margin-bottom: 15px;
  color: #26a69a;
}

.ft-card {
  padding: 20px;
  height: max-content;
  width: max-content;
  box-sizing: border-box;
}
.ft-card.ft-card--full-size {
  height: 100%;
  width: 100%;
}
</style>
