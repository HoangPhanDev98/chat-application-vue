<template>
  <auth
    :title="title"
    :subTitle="subTitle"
    :formType="formType"
    @submitSignup="handleSignup"
  />
</template>

<script lang="ts" setup>
import Auth from "@/components/auth/Auth.vue";
import apiClient from "@/services/auth.serivces";

const title = "Sign up";
const subTitle = "Please confirm your email, username and password.";
const formType = "Signup";

const handleSignup = async (
  email: string,
  username: string,
  password: string
) => {
  const response = await apiClient.signup(email, username, password);
  console.log("a", response);
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
