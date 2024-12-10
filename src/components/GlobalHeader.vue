<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <div class="title-bar">
          <img class="logo" src="../assets/logo.svg" alt="logo" width="20" />
          <div class="title">Vue3-init-template</div>
        </div>
      </a-col>
      <a-col flex="auto">
        <a-menu
          class="myMenu"
          :selectedKeys="current"
          mode="horizontal"
          @click="menuClick"
          :items="visibleRoutes"
        >
        </a-menu>
      </a-col>
      <a-flex>
        <div class="userInfo">
          <div class="userName">
            <div v-if="userStore.loginUser.id">
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  <a-flex>
                    <div v-if="userStore.loginUser.userAvatar">
                      <img
                        class="userAvatar"
                        :src="userStore.loginUser.userAvatar"
                        alt="userAvatar"
                      />
                    </div>
                    <div v-else>
                      <a-avatar
                        src="https://www.antdv.com/assets/logo.1ef800a8.svg"
                      />
                    </div>
                    <div class="userName">
                      {{ userStore.loginUser.userName || "无名" }}
                    </div>
                  </a-flex>
                </a>
                <template #overlay>
                  <a-menu @click="myMenuClick">
                    <a-menu-item key="0"> 个人主页</a-menu-item>
                    <a-menu-item key="1"> 退出登录</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <span v-else class="userName" @click="toLogin">未登录</span>
          </div>
        </div>
      </a-flex>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import routes from "../router/routes.ts";
import { type MenuProps, message } from 'ant-design-vue'
import { useLoginUserStore } from "../stores/user.ts";
import checkAccess from "../access/checkAccess.ts";
import Api from "../api";

const current = computed(() => {
  return [router.currentRoute.value.path];
});

let userStore = useLoginUserStore();
// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes
    .filter((item) => {
      if (item.meta?.hideInMenu) {
        return false;
      }
      // 根据权限过滤菜单
      return checkAccess(userStore.loginUser, item.meta?.access as string);
    })
    .map((route) => {
      const menuProps = {
        key: route.path,
        label: route.name,
        title: route?.meta?.title,
        icon: route?.meta?.icon,
      };
      if (route.children && route.children.length > 0) {
        // 如果有子路由，递归处理
        // @ts-ignore
        menuProps.children = route.children.map((childRoute) => {
          return {
            key: childRoute.path,
            label: childRoute.name,
            title: childRoute?.meta?.title,
            icon: childRoute?.meta?.icon,
          };
        });
      }
      return menuProps;
    }) as MenuProps["items"];
});
const router = useRouter();

// 点击菜单 跳转路由
const menuClick = ({ key }: { key: string }) => {
  router.push(key);
};

// 去登录
const toLogin = () => {
  // 获取当前路由地址
  console.log(router.currentRoute.value.path);
  if (router.currentRoute.value.path === "/user/login") {
    return;
  }
  router.push(`/user/login?redirect=${router.currentRoute.value.path}`);
};

// 登录后我的主页和注销
const myMenuClick = async ({ key }: { key: string }) => {
  if (key === "0") {
    message.success("点击成功");
    await router.push("/");
  } else {
    await Api.general.logout();
    message.success("注销成功！");
    await userStore.fetchLoginUser();
    await router.push("/user/login");
  }
};
</script>

<style scoped>
#globalHeader {
  max-width: 1400px;
  padding: 0 20px;
  margin: 0 auto;
}

.userInfo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.userName {
  max-width: 120px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
}

.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 16px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

.userAvatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  object-fit: contain;
  border-radius: 50%;
}
</style>
