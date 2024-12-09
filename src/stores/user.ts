import { defineStore } from "pinia";
import { ref } from "vue";
import { ACCESS_ENUM } from "../access/accessEnum.ts";
import Api from '@/api'
import type { LoginUserVO } from '@/api/globals'

export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref<LoginUserVO>({
    userName: "未登录",
  });

  async function fetchLoginUser() {
    const res = await Api.general.getLoginUser();
    console.log(res);
    if (res.code === 0 && res.data) {
      loginUser.value = res.data;
      setLoginUser(res.data);
    } else {
      const user = {
        userName: "未登录",
        userRole: ACCESS_ENUM.NOT_LOGIN,
      };
      loginUser.value = user;
      setLoginUser(user);
    }
  }

  function setLoginUser(newLoginUser: LoginUserVO) {
    loginUser.value = newLoginUser;
  }

  return { loginUser, setLoginUser, fetchLoginUser };
});
