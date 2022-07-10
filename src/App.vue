<template>
  <Navigation />
  <main class="ft-main">
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <template #default>
          <component :is="Component" :key="$route.path"></component>
        </template>
        <template #fallback>
          <Spinner />
        </template>
      </suspense>
    </router-view>
  </main>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { useStore } from "vuex";
import { supabase } from "./supabase";
import Spinner from "./components/Spinner.vue";

export default {
  components: {
    Navigation,
    Spinner,
  },
  setup() {
    const store = useStore();

    store.commit("updateUserSession", supabase.auth.session());
    supabase.auth.onAuthStateChange((_, session) => {
      store.commit("updateUserSession", session);
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");

body {
  margin: 0;
}

html,
body,
#app {
  height: 100%;
}

#app {
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
}
.ft-main {
  display: flex;
  justify-content: center;
  overflow: auto;
  padding: 10px;
}

.ft-input-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ft-form-control-label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #26a69a;
  text-transform: capitalize;
}
.ft-action-button {
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
.ft-action-button:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
