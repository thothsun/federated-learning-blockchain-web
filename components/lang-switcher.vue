<template>
  <span class="lang-switcher">
    <nuxt-link v-for="(locale, i) in showLocales" :key="i" :to="switchLocalePath(locale.code)">
      <el-button @click="handleChangeLang(locale.code)" size="mini" type="info" round>切换至 {{ locale.name }}</el-button>
    </nuxt-link>
  </span>
</template>

<script>
  const Cookie = process.client ? require("js-cookie") : undefined;
  export default {
    name: "LangSwitcher",
    computed: {
      showLocales() {
        return this.$i18n.locales.filter(
          locale => locale.code !== this.$i18n.locale
        );
      }
    },
    methods: {
      handleChangeLang(lang) {
        this.$store.commit("setLang", lang);
        Cookie.set("lang", lang);
      }
    }
  };
</script>
