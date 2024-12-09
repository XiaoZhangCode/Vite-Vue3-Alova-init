<template>
  <div id="userLayout" style="min-height: 100vh">
    <a-layout >
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.svg" class="logo" alt="logo" width="25" height="25"/>
          <h1 class="title">template init</h1>
        </a-space>
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

<style scoped>
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png") 0 0 / 100% 100%;
}

#userLayout .logo {
  width: 60px;
  height: 60px;
}
.header {
  margin-bottom: 0 !important;
  background: transparent;
}
#userLayout .title{
  margin-bottom: 0;
  font-size: 28px;
}
#userLayout .header {
  margin-top: 16px;
  font-size: 21px;
}
#userLayout .content {
  margin-bottom: 16px;
  padding: 20px;
}

#userLayout .footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
  text-align: center;
}
.ant-layout{
  background: transparent !important;
}
</style>
