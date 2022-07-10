<template>
  <div class="ft-login-wrapper">
    <Alert v-if="errorMessage" :message="errorMessage" />
    <Card headerTitle="Login">
      <div class="ft-login-form-wrapper">
        <form
          @submit.prevent="handleLogin"
          class="ft-login-form"
          autocomplete="off"
        >
          <TextField
            label="email"
            :value="email"
            @onChange="handleEmailChange"
          />
          <TextField
            label="password"
            :value="password"
            type="password"
            @onChange="handlePasswordChange"
          />

          <Button name="login" type="submit" />
          <div class="ft-login-form__footer">
            Do not have account?
            <RouterLink :to="{ name: 'Register' }" name="Register" />
          </div>
        </form>
      </div>
    </Card>
    <Spinner v-if="loading" />
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import TextField from "../components/TextField.vue";
import Button from "../components/Button.vue";
import RouterLink from "../components/RouterLink.vue";
import Alert from "../components/Alert.vue";
import Spinner from "../components/Spinner.vue";
import { supabase } from "../supabase";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: {
    Card,
    TextField,
    Button,
    RouterLink,
    Alert,
    Spinner,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const loading = ref(false);
    const store = useStore();
    const router = useRouter();

    const handleEmailChange = (value) => {
      email.value = value;
    };

    const handlePasswordChange = (value) => {
      password.value = value;
    };

    const handleLogin = async () => {
      errorMessage.value = "";
      if (!email.value.trim() || !password.value) {
        errorMessage.value = "Please fill all the fields!!";
        return;
      }

      try {
        loading.value = true;
        const { session, error } = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        store.commit("updateUserSession", session);
        router.push({ name: "Home" });
      } catch (error) {
        errorMessage.value = error.message;
      } finally {
        loading.value = false;
      }
    };

    // expose to template and other options API hooks
    return {
      email,
      password,
      handleEmailChange,
      handlePasswordChange,
      errorMessage,
      handleLogin,
      loading,
    };
  },
};
</script>

<style scoped>
.ft-login-wrapper {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.ft-login-wrapper .ft-card {
  width: 300px;
}

.ft-login-wrapper .ft-router-link {
  margin-left: 5px;
}

.ft-login-form {
  display: grid;
  grid-row-gap: 12px;
}
.ft-login-form__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}
</style>
