<template>
  <router-link class="ft-router-link" :to="to">{{ name }}</router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
    },
  },
};
</script>

<style scoped>
.ft-router-link {
  text-decoration: none;
  color: #26a69a;
}
.ft-router-link:hover {
  text-decoration: underline;
}
</style>
