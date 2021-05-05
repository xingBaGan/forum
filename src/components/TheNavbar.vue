<template>
  <header class="header" id="header" v-handle-scroll="closeMobileNav">
    <router-link :to="{name:'Home'}" class="logo">
      <img src="../assets/img/vueschool-logo.svg" alt="">
    </router-link>
    <div
      class="btn-hamburger"
      @click="mobileNavOpen=!mobileNavOpen"
      v-click-outside="closeMobileNav"
    >
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>
    <nav class="navbar" :class="{'navbar-open':mobileNavOpen}">
      <ul v-if="user">
        <li class="navbar-user" v-click-outside="closeUserDropdown">
          <a @click.prevent.stop="userDropdownOpen = !userDropdownOpen">
            <img :src="user.avatar" alt="" class="avatar-small">
            <span>
              {{user.name}}
              <img src="../assets/img/arrow-profile.svg" alt="" class="icon-profile">
            </span>
          </a>
        </li>
        <!-- dropdown menu -->
        <!-- add class "active-drop" to show the dropdown -->
        <div id="user-dropdown" :class="{'active-drop': userDropdownOpen}">
          <div class="triangle-drop"></div>
          <ul class="dropdown-menu">
            <li class="dropdown-menu-item">
              <router-link :to="{name: 'Profile'}">主页</router-link>
            </li>
            <li class="dropdown-menu-item">
              <a
                @click.prevent="$store.dispatch('auth/signOut').then(()=>{$router.push({name:'Home'})})"
              >登出</a>
            </li>
          </ul>
        </div>
        <li class="navbar-mobile-item">
          <router-link :to="{name: 'Profile'}">主页</router-link>
        </li>
        <li class="navbar-mobile-item">
          <a
            @click.prevent="$store.dispatch('auth/signOut').then(()=>{$router.push({name:'Home'})})"
          >登出</a>
        </li>
      </ul>
      <ul v-else>
        <li class="navbar-item">
          <router-link :to="{name: 'Login'}">登入</router-link>
        </li>
        <li class="navbar-item">
          <router-link :to="{name: 'Register'}">注册</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import clickOutside from "@/directives/click-outside";
import handleScroll from "@/directives/handle-scroll";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userDropdownOpen: true,
      mobileNavOpen: false
    };
  },
  directives: {
    clickOutside,
    handleScroll
  },
  computed: {
    ...mapGetters("auth", {
      user: "authUser"
    })
  },
  methods: {
    closeUserDropdown() {
      this.userDropdownOpen = false;
    },
    closeMobileNav() {
      this.mobileNavOpen = false;
    }
  },
  created() {
    if (!this.$store.state.authId) return;
    this.$store.dispatch("users/fetchUser", { id: this.$store.state.authId });
  }
};
</script>

<style scoped>
</style>
