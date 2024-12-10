<template>
  <div id="basicLayout">
    <a-layout class="BasicLayoutBox">
      <a-layout-header class="header">
        <GlobalHeader/>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://github.com/XiaoZhangCode" target="_blank">
           GitHub by CodeXiaoZhang
        </a>
      </a-layout-footer>

    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout {
  margin: 0 auto;
}

.BasicLayoutBox {
  min-height: 100vh;
}

.header {
  margin-bottom: 0 !important;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
}


#basicLayout .header {
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 28px;
  padding: 20px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
#basicLayout .footer a{
  color: #333;
}


</style>
