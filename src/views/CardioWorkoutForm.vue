<template>
  <div
    :key="exercise.id"
    v-for="exercise in exercises"
    class="ft-cardio-exercises-wrapper"
  >
    <Dropdown
      label="Type"
      placeholder="select cardio type..."
      :options="cardioTypeOptions"
      :value="exercise.type"
      @onChange="
        (value) => $emit('onExerciseChange', { id: exercise.id, type: value })
      "
    />
    <TextField
      label="Distance"
      :value="exercise.distance"
      @onChange="
        (value) =>
          $emit('onExerciseChange', { id: exercise.id, distance: value })
      "
    />
    <TextField
      label="Duration"
      :value="exercise.duration"
      @onChange="
        (value) =>
          $emit('onExerciseChange', { id: exercise.id, duration: value })
      "
    />
    <TextField
      label="Pace"
      :value="exercise.pace"
      @onChange="
        (value) => $emit('onExerciseChange', { id: exercise.id, pace: value })
      "
    />
    <Delete @onClick="$emit('onDelete', exercise.id)" />
  </div>
</template>

<script>
import TextField from "../components/TextField.vue";
import Delete from "../components/action/Delete.vue";
import Dropdown from "../components/Dropdown.vue";
import { ref } from "vue";

export default {
  components: {
    TextField,
    Delete,
    Dropdown,
  },
  props: {
    exercises: {
      type: Array,
      default: [],
    },
  },
  emits: ["onExerciseChange", "onDelete"],
  setup() {
    const exercise = ref("");
    const sets = ref("");
    const reps = ref("");
    const weight = ref("");

    const cardioTypeOptions = [
      { name: "Run", value: "run" },
      { name: "Walk", value: "walk" },
    ];

    return { exercise, sets, reps, weight, cardioTypeOptions };
  },
};
</script>

<style scoped>
.ft-cardio-exercises-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) 40px;
  grid-gap: 10px;
  align-items: center;
}
</style>
