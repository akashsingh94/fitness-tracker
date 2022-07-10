<template>
  <div class="ft-navigation-wrapper">
    <header class="ft-navigation-header">
      <div class="ft-logo">
        <img src="../assets/dumble-light.png" alt="logo" />
        <span>Active Tracker</span>
      </div>
      <nav class="ft-navigation">
        <router-link class="ft-navigation-link" :to="{ name: 'Home' }">
          Home
        </router-link>
        <router-link class="ft-navigation-link" :to="{ name: 'Create' }">
          Create
        </router-link>

        <a
          v-if="userSession"
          href="#"
          @click.prevent="signOut"
          class="ft-navigation-link"
        >
          Logout
        </a>
      </nav>
    </header>
  </div>
  <Alert v-if="errorMessage" :message="errorMessage" />
  <Spinner v-if="loading" />
</template>

<script>
import { ref } from "vue";
import Spinner from "./Spinner.vue";
import Alert from "./Alert.vue";
import { supabase } from "../supabase";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { Spinner, Alert },
  setup() {
    const loading = ref(false);
    const errorMessage = ref("");
    const store = useStore();
    const router = useRouter();

    async function signOut() {
      try {
        loading.value = true;
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
        store.commit("updateUserSession", null);
        router.push({ name: "Login" });
      } catch (error) {
        errorMessage.value = error.message;
      } finally {
        loading.value = false;
      }
    }
    return { loading, signOut, errorMessage };
  },
  computed: {
    userSession() {
      return this.$store.state.userSession;
    },
  },
};
</script>

<style scoped>
.ft-navigation-wrapper {
  background-color: #009688;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 65px;
  min-height: 65px;
}
.ft-navigation-link {
  color: #fff;
  font-weight: normal;
  text-decoration: none;
}

.ft-navigation-header {
  width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.ft-navigation-link:hover {
  text-decoration: underline;
}

.ft-navigation {
  display: flex;
  gap: 25px;
}
.ft-logo {
  display: flex;
  align-items: center;
  color: #fff;
  gap: 8px;
}
</style>
