<template>
  <div>
    <nuxt />
    <a href="https://github.com/Sun-Shuai/federated-learning-blockchain-web" target="_blank">
      <el-image style="position: fixed; top: 0; right: 0; border: 0;z-index: 9999;height: 100px;width: 100px"
                src="/github.png"
                alt="Fork me on GitHub"></el-image>
    </a>
    <lang-switcher style="position: fixed;bottom: 20px;right: 20px;z-index: 9" />
  </div>
</template>

<style>
html {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 62.5%;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  font-size: 1.4rem;
  background-color: white;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}


</style>
<script>
  import LangSwitcher from "../components/lang-switcher";
  export default {
    components: {LangSwitcher}
  }
</script>
