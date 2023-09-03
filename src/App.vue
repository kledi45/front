<template>
  <div>
    <Navbar v-if="!$route.meta.hideNavbar" />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/NavbarComponent.vue'
export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {
      userTheme: "light",
      textTheme: "theme-blue",
    };
  },
  watch: {
    $route: {
      handler(to) {
        document.title = to.meta.title || "UBT Social Media";
      },
    },
  },
  created() {
    const initUserTheme =
    this.getTheme("theme-preference") || this.getMediaPreference();
    const initTextTheme = this.getTheme("text-theme") || this.textTheme;
    this.setTheme(initUserTheme);
    this.setTextTheme(initTextTheme);
  },
  methods: {
    setTheme(theme) {
      localStorage.setItem("theme-preference", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
    },
    setTextTheme(theme) {
      localStorage.setItem("text-theme", theme);
      this.textTheme = theme;
      document.body.className = theme;
    },
    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "light";
      } else {
        return "light";
      }
    },
    getTheme(theme) {
      return localStorage.getItem(theme);
    },
  },
}
</script>

<style lang="scss">
@import "/src/styles/index.scss";
</style>
