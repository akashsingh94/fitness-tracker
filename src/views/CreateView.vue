<template>
  <div class="ft-create-workout-wrapper">
    <Alert v-if="error" :message="error" />
    <Success v-if="successMsg" :message="successMsg" />
    <Card headerTitle="Record Workout">
      <div class="ft-create-workout-card-wrapper">
        <form
          @submit.prevent="handleCreateWorkout"
          class="ft-create-workout-form"
          autocomplete="off"
        >
          <TextField
            label="Workout Name"
            :value="workoutName"
            @onChange="handleWorkoutNameChange"
          />
          <Dropdown
            label="Workout Type"
            placeholder="select workout type..."
            :options="options"
            :value="workoutType"
            @onChange="handleWorkoutTypeChange"
          />
          <StrengthTrainingForm
            :exercises="strengthTrainingExercises"
            v-if="workoutType === 'strengthTraining'"
            @onExerciseChange="handleStrengthTrainingExerciseChange"
            @onDelete="handleStrengthTrainingExerciseDelete"
          />

          <CardioWorkoutForm
            :exercises="cardioExercises"
            v-if="workoutType === 'cardio'"
            @onExerciseChange="handleCardioExerciseChange"
            @onDelete="handleCardioExerciseDelete"
          />

          <Button
            v-if="workoutType"
            name="add exercise"
            @onClick="handleAddExercise"
            contentWidth
          />
          <Button name="Record Workout" type="submit" />
        </form>
      </div>
    </Card>
    <Spinner v-if="loading" />
  </div>
</template>

<script>
import Dropdown from "../components/Dropdown.vue";
import Card from "../components/Card.vue";
import TextField from "../components/TextField.vue";
import Button from "../components/Button.vue";
import StrengthTrainingForm from "./StrengthTrainingForm.vue";
import CardioWorkoutForm from "./CardioWorkoutForm.vue";
import Alert from "../components/Alert.vue";
import Spinner from "../components/Spinner.vue";
import { supabase } from "../supabase";
import Success from "../components/Success.vue";
import { v4 as uuidv4 } from "uuid";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Dropdown,
    Card,
    TextField,
    Button,
    StrengthTrainingForm,
    CardioWorkoutForm,
    Alert,
    Spinner,
    Success,
  },
  setup() {
    const options = [
      { name: "Cardio", value: "cardio" },
      { name: "Strength Training", value: "strengthTraining" },
    ];

    const store = useStore();
    const workoutName = ref("");
    const workoutType = ref("");
    const strengthTrainingExercises = ref([]);
    const cardioExercises = ref([]);
    const error = ref("");
    const loading = ref(false);
    const successMsg = ref("");

    const handleWorkoutNameChange = (value) => {
      workoutName.value = value;
    };

    const addNewStrengthTrainingExercises = () => {
      strengthTrainingExercises.value.push({
        id: uuidv4(),
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
      });
    };

    const addNewCardioExercises = () => {
      cardioExercises.value.push({
        id: uuidv4(),
        type: "",
        distance: "",
        duration: "",
        pace: "",
      });
    };

    const handleStrengthTrainingExerciseChange = (value) => {
      strengthTrainingExercises.value = strengthTrainingExercises.value.map(
        (exe) => {
          if (exe.id === value.id) {
            return { ...exe, ...value };
          }
          return exe;
        }
      );
    };

    const handleStrengthTrainingExerciseDelete = (id) => {
      strengthTrainingExercises.value = strengthTrainingExercises.value.filter(
        (exe) => exe.id !== id
      );
    };

    const handleCardioExerciseChange = (value) => {
      cardioExercises.value = cardioExercises.value.map((exe) => {
        if (exe.id === value.id) {
          return { ...exe, ...value };
        }
        return exe;
      });
    };

    const handleCardioExerciseDelete = (id) => {
      cardioExercises.value = cardioExercises.value.filter(
        (exe) => exe.id !== id
      );
    };

    const handleAddExercise = () => {
      if (workoutType.value === "strengthTraining") {
        addNewStrengthTrainingExercises();
      }
      if (workoutType.value === "cardio") {
        addNewCardioExercises();
      }
    };

    const handleWorkoutTypeChange = (value) => {
      workoutType.value = value;
      if (
        value === "strengthTraining" &&
        strengthTrainingExercises.value.length === 0
      ) {
        addNewStrengthTrainingExercises();
      }
      if (value === "cardio" && cardioExercises.value.length === 0) {
        addNewCardioExercises();
      }
    };

    const handleCreateWorkout = async () => {
      error.value = "";
      const hasStrengthTrainingExercises =
        strengthTrainingExercises.value &&
        strengthTrainingExercises.value.length;
      const hasCardioExercises =
        cardioExercises.value && cardioExercises.value.length;
      if (!hasStrengthTrainingExercises && !hasCardioExercises) {
        error.value = "Please add atleast one exercise!!";
        return;
      }

      try {
        loading.value = true;
        const userId = computed(() => store.state.userSession.user.id);

        const addedExercise =
          workoutType.value === "strengthTraining"
            ? strengthTrainingExercises.value.map((w) => ({
                exercise: w.exercise,
                sets: w.sets,
                reps: w.reps,
                weight: w.weight,
                id: w.id,
              }))
            : cardioExercises.value.map((w) => ({
                type: w.type,
                distance: w.distance,
                duration: w.duration,
                pace: w.pace,
                id: w.id,
              }));
        const { error } = await supabase.from("workouts").insert({
          workout_name: workoutName.value,
          workout_type: workoutType.value,
          exercises: addedExercise,
          user_id: userId.value,
        });
        if (error) throw error;
        successMsg.value = "Workouts added successfully!!";
        workoutName.value = "";
        workoutType.value = "";
        strengthTrainingExercises.value = [];
        cardioExercises.value = [];
        window.setTimeout(() => {
          successMsg.value = "";
        }, 5000);
      } catch (error1) {
        error.value = error1.message;
      } finally {
        loading.value = false;
      }
    };

    return {
      options,
      workoutName,
      workoutType,
      strengthTrainingExercises,
      cardioExercises,
      error,
      loading,
      successMsg,
      handleWorkoutNameChange,
      handleWorkoutTypeChange,
      handleCreateWorkout,
      handleAddExercise,
      handleStrengthTrainingExerciseChange,
      handleStrengthTrainingExerciseDelete,
      handleStrengthTrainingExerciseDelete,
      handleCardioExerciseDelete,
      handleCardioExerciseChange,
    };
  },
};
</script>

<style scoped>
.ft-create-workout-card-wrapper {
  width: 600px;
}

.ft-create-workout-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ft-create-workout-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}
</style>
