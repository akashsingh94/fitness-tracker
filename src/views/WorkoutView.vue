<template>
  <div v-if="workout" class="ft-workout-wrapper">
    <router-link
      class="ft-workout-details-link"
      :to="{ name: 'WorkoutDetails', params: { workoutId: workout.id } }"
    >
      <Card>
        <div class="ft-workout">
          <WorkoutIcon :workoutType="workout.workout_type" />
          <h3 class="ft-workout__name">{{ workout.workout_name }}</h3>
          <span class="ft-workout__exercises"
            >#{{ workout.exercises.length }} exercises</span
          >
        </div>
      </Card>
    </router-link>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import WorkoutIcon from "./WorkoutIconView.vue";

export default {
  components: {
    Card,
    WorkoutIcon,
  },
  props: {
    workout: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.ft-workout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.ft-workout__name {
  margin: 0;
}

.ft-workout__exercises {
  color: rgba(0, 0, 0, 0.87);
  background-color: #b2dfdb;
  border-radius: 16px;
  white-space: nowrap;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 12px;
  padding-right: 12px;
  white-space: nowrap;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ft-workout__name {
  white-space: nowrap;
}

.ft-workout-details-link {
  color: #000;
  text-decoration: none;
}
</style>
