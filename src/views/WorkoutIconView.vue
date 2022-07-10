<template>
  <svg
    v-if="workoutType === 'cardio'"
    xmlns="http://www.w3.org/2000/svg"
    height="48px"
    viewBox="0 0 24 24"
    width="48px"
    fill="#26a69a"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="48px"
    viewBox="0 0 24 24"
    width="48px"
    fill="#26a69a"
    v-else
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    workoutType: {
      type: String,
      default: "",
    },
  },
};
</script>
