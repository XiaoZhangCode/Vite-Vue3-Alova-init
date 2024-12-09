<template>
  <a-config-provider :locale="zhCN">
    <component :is="layoutComponent">
      <router-view />
    </component>
  </a-config-provider>
</template>
<script setup lang="ts">
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { computed } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "./layouts/BasicLayout.vue";

const route = useRoute();

const layoutComponent = computed(() => {
  // 根据路由的meta字段返回对应的布局组件
  return route.meta.requiresAuth ? "div" : BasicLayout;
});
</script>
<style scoped></style>
