<template>
  <div id="app">
    <navbar/>
    <div class="container">
      <router-view v-show="showPage" @ready="pageReady"/>
      <app-spinner v-show="!showPage"/>
    </div>
  </div>
</template>

<script>
import Navbar from "@comp/TheNavbar";
import AppSpinner from "@comp/AppSpinner";
import NProgress from "nprogress";
export default {
  name: "app",
  components: {
    Navbar,
    AppSpinner
  },
  data() {
    return {
      showPage: false
    };
  },
  methods: {
    pageReady() {
      this.showPage = true;
      NProgress.done();
    }
  },
  created() {
    NProgress.configure({
      speed: 200,
      showSpinner: false
    });
    this.$router.beforeEach((to, from, next) => {
      // to and from are both route objects. must call `next`.
      this.showPage = false;
      NProgress.start();
      next();
    });
  }
};
</script>

<style>
@import "./assets/css/style.css";
@import "~nprogress/nprogress.css";
#nprogress .bar {
  background: #8080ff;
}
</style>
