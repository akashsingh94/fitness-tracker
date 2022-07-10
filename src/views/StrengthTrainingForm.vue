<template>
  <div
    :key="exercise.id"
    v-for="exercise in exercises"
    class="ft-strength-training-exercises-wrapper"
  >
    <TextField
      label="Exercise"
      :value="exercise.exercise"
      @onChange="
        (value) =>
          $emit('onExerciseChange', { id: exercise.id, exercise: value })
      "
    />
    <TextField
      label="Sets"
      :value="exercise.sets"
      @onChange="
        (value) => $emit('onExerciseChange', { id: exercise.id, sets: value })
      "
    />
    <TextField
      label="Reps"
      :value="exercise.reps"
      @onChange="
        (value) => $emit('onExerciseChange', { id: exercise.id, reps: value })
      "
    />
    <TextField
      label="Weight"
      :value="exercise.weight"
      @onChange="
        (value) => $emit('onExerciseChange', { id: exercise.id, weight: value })
      "
    />
    <Delete @onClick="$emit('onDelete', exercise.id)" />
  </div>
</template>

<script>
import TextField from "../components/TextField.vue";
import Delete from "../components/action/Delete.vue";
import { ref } from "vue";
export default {
  components: {
    TextField,
    Delete,
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

    return { exercise, sets, reps, weight };
  },
};
</script>

<style scoped>
.ft-strength-training-exercises-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) 40px;
  grid-gap: 10px;
  align-items: center;
}
</style>
