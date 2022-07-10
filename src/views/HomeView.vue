<template>
  <div v-if="loaded" class="ft-home">
    <div v-if="workouts.length === 0" class="ft-no-data">
      <span class="ft-no-data__message">No workouts found</span>
      <RouterLink :to="{ name: 'Create' }" name="Create Workout" />
    </div>
    <div v-else class="ft-workouts-wrapper">
      <div class="ft-workout" v-for="(workout, index) in workouts" :key="index">
        <Workout :workout="workout" />
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase";
import { ref } from "vue";

import RouterLink from "../components/RouterLink.vue";
import Workout from "./WorkoutView.vue";

export default {
  components: { RouterLink, Workout },
  async setup() {
    const loaded = ref(false);
    const workouts = ref([]);
    try {
      let { data, error } = await supabase.from("workouts").select("*");
      if (error) throw error;
      workouts.value = data;
    } catch (error) {
      console.error(error.message);
    } finally {
      loaded.value = true;
    }
    return { loaded, workouts };
  },
};
</script>

<style>
.ft-no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.ft-no-data__message {
  font-weight: 600;
  font-size: 1.3rem;
}
.ft-workouts-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 800px;
}
</style>
