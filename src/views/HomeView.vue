<template>
  <div class="HomeView">
    <h1>Welcome to Your Vue.js App</h1>
  </div>
</template>
<script lang="ts" setup>
// 用户登录函数
// import Api from "../api";
// import { useLoginUserStore } from "../store/user.ts";
// import { onMounted } from "vue";

// let userStore = useLoginUserStore();
// console.log(userStore.loginUser);

// const userLogin = async () => {
//   try {
//     const result = await Api.general.userLogin({
//       data: {
//         userAccount: "admin",
//         userPassword: "12345678",
//       },
//     });
//     console.log(result);
//     if (result.data) {
//       userStore.setLoginUser(result.data);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// onMounted(async () => {
//   await userLogin();
// });
//
// console.log(userStore.loginUser.id);
</script>
<style scoped></style>
