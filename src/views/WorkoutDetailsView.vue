<template>
  <div v-if="loaded" class="ft-workout-details-wrapper">
    <Spinner v-if="loading" />
    <Alert v-if="errorMsg" :message="errorMsg" />
    <div v-if="!workout" class="ft-no-data">
      <span class="ft-no-data__message">No workout found</span>
      <RouterLink :to="{ name: 'Create' }" name="Create Workout" />
    </div>
    <div v-else class="ft-workout-details">
      <Card fullSize className="ft-workout-info-card">
        <div class="ft-workout-info__actions">
          <Delete v-if="!editing" @onClick="handleDelete" />
          <Edit v-if="!editing" @onClick="handleEdit" />
          <Save v-if="editing" @onClick="handleUpdate" />
          <Clear v-if="editing" @onClick="handleClear" />
        </div>
        <div class="ft-workout-info">
          <WorkoutIcon :workoutType="workout.workout_type" />
          <span v-if="!editing" class="ft-workout-info__name">{{
            workout.workout_name
          }}</span>
          <TextField
            v-if="editing"
            :value="workout.workout_name"
            @onChange="handleExerciseNameChange"
          />
        </div>
      </Card>
      <Card>
        <div class="ft-workout-exercises">
          <div
            class="ft-workout-exercise"
            :class="{ 'ft-workout-exercise--editing': editing }"
            v-for="(exer, ind) in workout.exercises"
            :key="ind"
          >
            <div
              class="ft-workout-details__exercise"
              :class="{ 'ft-workout-details__exercise--editing': editing }"
              v-for="(key, ind) in Object.keys(exer).filter((k) => k !== 'id')"
              :key="ind"
            >
              <span
                v-if="!editing"
                class="ft-workout-details__header ft-form-control-label"
                >{{ key }}</span
              >
              <span v-if="!editing" class="ft-workout-details__value">{{
                exer[key]
              }}</span>

              <TextField
                v-if="editing"
                :value="exer[key]"
                @onChange="
                  (value) => handleExerciseChange({ id: exer.id, [key]: value })
                "
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Alert from "../components/Alert.vue";
import { supabase } from "../supabase";
import RouterLink from "../components/RouterLink.vue";
import Card from "../components/Card.vue";
import WorkoutIcon from "./WorkoutIconView.vue";
import Delete from "../components/action/Delete.vue";
import Edit from "../components/action/Edit.vue";
import Clear from "../components/action/Clear.vue";
import Save from "../components/action/Save.vue";
import Spinner from "../components/Spinner.vue";
import TextField from "../components/TextField.vue";

import { useRoute } from "vue-router";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Alert,
    RouterLink,
    Card,
    WorkoutIcon,
    Delete,
    Spinner,
    Edit,
    Clear,
    Save,
    TextField,
  },

  async setup() {
    const route = useRoute();
    const loaded = ref(false);
    const errorMsg = ref("");
    const workout = ref(null);
    const loading = ref(false);
    const editing = ref(false);
    const router = useRouter();
    const defaultWorkoutData = ref(null);

    try {
      errorMsg.value = "";
      let { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("id", route.params.workoutId);
      if (error) throw error;
      workout.value = defaultWorkoutData.value = data[0];
    } catch (error) {
      errorMsg.value = error.message;
    } finally {
      loaded.value = true;
    }

    const handleDelete = async () => {
      if (confirm("Are you sure you want to delete this item?")) {
        loading.value = true;
        try {
          const { error } = await supabase
            .from("workouts")
            .delete()
            .eq("id", workout.value.id);
          if (error) throw error;
          router.push({ name: "Home" });
        } catch (error) {
          console.error(error.message);
        } finally {
          loading.value = false;
        }
      }
    };

    const handleExerciseChange = (value) => {
      debugger;
      const updatedExtercise = workout.value.exercises.map((exe) => {
        if (exe.id === value.id) {
          return { ...exe, ...value };
        }
        return exe;
      });
      workout.value = { ...workout.value, exercises: updatedExtercise };
    };

    const handleEdit = () => {
      editing.value = true;
    };

    const handleExerciseNameChange = (name) => {
      workout.value.workout_name = name;
    };

    const handleUpdate = async () => {
      try {
        loading.value = true;
        const { error } = await supabase
          .from("workouts")
          .update({
            workout_name: workout.value.workout_name,
            exercises: workout.value.exercises,
          })
          .eq("id", workout.value.id);
        if (error) throw error;
      } catch (error) {
        console.error(error.message);
      } finally {
        editing.value = false;
        loading.value = false;
      }
    };

    const handleClear = () => {
      editing.value = false;
      workout.value = defaultWorkoutData.value;
    };

    return {
      loaded,
      workout,
      errorMsg,
      loading,
      editing,
      handleEdit,
      handleDelete,
      handleClear,
      handleExerciseChange,
      handleUpdate,
      handleExerciseNameChange,
    };
  },
};
</script>

<style scoped>
.ft-workout-exercise {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  align-items: center;
}
.ft-workout-exercise.ft-workout-exercise--editing {
  grid-template-columns: 150px 100px 100px 100px;
}

.ft-workout-details__exercise:not(.ft-workout-details__exercise--editing) {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ft-workout-details {
  display: flex;
  flex-direction: column;
  gap: 35px;
  justify-content: center;
  align-items: center;
}
.ft-workout-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
}
.ft-workout-info__name {
  font-size: 1.25rem;
  font-weight: 600;
}

.ft-workout-exercises {
  display: grid;
  grid-gap: 12px;
}

.ft-workout-info__actions {
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.ft-workout-info-card {
  position: relative;
}
</style>
