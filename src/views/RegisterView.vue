<template>
  <div class="ft-register-wrapper">
    <Alert v-if="errorMessage" :message="errorMessage" />
    <Card headerTitle="Register">
      <div class="ft-register-form-wrapper">
        <form
          @submit.prevent="handleSubmit"
          class="ft-register-form"
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
          <TextField
            label="confirm password"
            :value="confirmPassword"
            type="password"
            @onChange="handleConfirmPasswordChange"
          />
          <Button name="register" type="submit" />
          <div class="ft-register-form__footer">
            Already have account?
            <RouterLink :to="{ name: 'Login' }" name="Login" />
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
import { ref } from "vue";
import Alert from "../components/Alert.vue";
import Spinner from "../components/Spinner.vue";
import { supabase } from "../supabase";
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
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");
    const loading = ref(false);
    const handleEmailChange = (value) => {
      email.value = value;
    };

    const handlePasswordChange = (value) => {
      password.value = value;
    };

    const handleConfirmPasswordChange = (value) => {
      confirmPassword.value = value;
    };

    const handleSubmit = async () => {
      errorMessage.value = "";
      if (!email.value.trim() || !password.value || !confirmPassword.value) {
        errorMessage.value = "Please fill all the fields!!";
        return;
      }
      if (password.value.length < 6) {
        errorMessage.value = "Password should be at least 6 characters!!";
        return;
      }
      if (confirmPassword.value !== password.value) {
        errorMessage.value = "Passwords mismatched!!";
        return;
      }

      try {
        loading.value = true;
        const { error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        });
        if (error) throw error;
        router.push({ name: "Login" });
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
      confirmPassword,
      handleEmailChange,
      handlePasswordChange,
      handleConfirmPasswordChange,
      errorMessage,
      handleSubmit,
      loading,
    };
  },
};
</script>

<style scoped>
.ft-register-wrapper {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ft-register-wrapper .ft-router-link {
  margin-left: 5px;
}

.ft-register-form {
  display: grid;
  grid-row-gap: 12px;
}
.ft-register-form__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
}
</style>
