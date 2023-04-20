<template>
  <div
    id="login"
    class="d-flex flex-column col-lg-4 offset-lg-4 col-md-6 offset-md-3 align-items-center h-100 justify-content-center"
  >
    <div class="auth-image">
      <img src="@/assets/logo.jpg" alt="Logo" />
    </div>

    <div class="auth-heading">
      <h4>{{ props.title }} to Hello Word</h4>
      <div class="text-center text-secondary">
        {{ props.subTitle }}
      </div>
    </div>

    <div v-if="props.formType === 'Signin'" class="auth-form pt-5">
      <form @submit.prevent="handleSigninSubmit">
        <div class="mb-4">
          <input
            type="text"
            class="form-control shadow-none"
            placeholder="Username"
            v-model="loginForm.username"
            required
          />
          <p v-if="props.errorList.username" class="text-danger">
            {{ props.errorList.username }}
          </p>
        </div>
        <div class="mb-4">
          <input
            type="password"
            class="form-control shadow-none"
            placeholder="Password"
            v-model="loginForm.password"
            required
          />
          <p v-if="props.errorList.password" class="text-danger">
            {{ props.errorList.password }}
          </p>
        </div>
        <button type="submit" class="btn w-100 py-3">
          {{ props.title.toUpperCase() }}
        </button>
      </form>
    </div>

    <div v-else class="auth-form pt-5">
      <form @submit.prevent="handleSignupSubmit">
        <div class="mb-4">
          <input
            type="email"
            class="form-control shadow-none"
            placeholder="Email"
            v-model="signupForm.email"
            required
          />
        </div>
        <div class="mb-4">
          <input
            type="text"
            class="form-control shadow-none"
            placeholder="Username"
            v-model="signupForm.username"
            required
          />
        </div>
        <div class="mb-4">
          <input
            type="password"
            class="form-control shadow-none"
            placeholder="Password"
            v-model="signupForm.password"
            required
          />
        </div>
        <div class="mb-4">
          <input
            type="password"
            class="form-control shadow-none"
            placeholder="Confirm Password"
            v-model="signupForm.confirmPassword"
            required
          />
        </div>
        <button type="submit" class="btn w-100 py-3">SIGN UP</button>
      </form>
    </div>

    <div v-if="props.formType === 'Signin'" class="sign-up pt-3">
      <button @click="goToSignup" class="btn w-100 py-3">
        Don't have an account? <span class="text-primary">Sign up</span>
      </button>
    </div>

    <div v-else class="sign-up pt-3">
      <button @click="goToSignin" class="btn w-100 py-3">
        Already have an account? <span class="text-primary">Login</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["title", "subTitle", "formType", "errorList"]);
const emit = defineEmits(["submitLogin", "submitSignup"]);

const loginForm = ref({
  username: "",
  password: "",
});

const signupForm = ref({
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
});

const goToSignup = () => {
  router.push({ name: "Signup" });
};
const goToSignin = () => {
  router.push({ name: "Login" });
};

const handleSigninSubmit = () => {
  emit("submitLogin", loginForm.value.username, loginForm.value.password);
};

const handleSignupSubmit = () => {
  emit(
    "submitSignup",
    signupForm.value.email,
    signupForm.value.username,
    signupForm.value.password
  );
};
</script>

<style lang="scss" scoped>
#login {
  .auth-image {
    height: 14rem;
    width: 14rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .auth-heading {
    h4 {
      font-size: 2rem;
      line-height: 110%;
      margin: 22px 0 14px;
    }
  }

  .auth-form {
    width: 90%;

    input {
      padding: 1rem;
      border-radius: 1rem;
      width: 100%;

      &:focus {
        border-color: #0d6efd;
      }

      &:hover {
        border: 1px solid #0d6efd;
        color: #0d6efd;
      }
    }

    button {
      border-radius: 1rem;
      font-size: 1rem;
      font-weight: 500;
      background-color: #3390ec;
      color: #fff;

      &:hover {
        background-color: #2086ea;
      }
    }
  }

  .sign-up {
    width: 90%;

    button:hover {
      border-radius: 1rem;
      background-color: #eff6fe;
    }
  }
}
</style>
