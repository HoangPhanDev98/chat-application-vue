<template>
  <auth
    :title="title"
    :subTitle="subTitle"
    :formType="formType"
    :errorList="errors"
    @submitLogin="handleLogin"
  />
</template>

<script lang="ts" setup>
import Auth from "@/components/auth/Auth.vue";
import apiClient from "@/services/auth.serivces";
import { setUserData } from "@/utils";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const title = "Sign in";
const subTitle = "Please confirm your username and password.";
const formType = "Signin";
const errors = ref({
  username: "",
  password: "",
});

const handleLogin = async (username: string, password: string) => {
  try {
    const res = await apiClient.login(username, password);
    setUserData(res.data.userId, res.data.username, res.data.accessToken);
    const redirectPath = route.query.redirect || "/";
    router.push(redirectPath as any);
  } catch (err: any) {
    const { status, data } = err.response;

    status === 404
      ? (errors.value.username = data.error)
      : (errors.value.username = "");
    status === 403
      ? (errors.value.password = data.error)
      : (errors.value.password = "");
  }
};
</script>
