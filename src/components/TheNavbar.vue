<template>
  <header class="header" id="header" @click="userDropdownOpen=false">
    <router-link :to="{name:'Home'}" class="logo">
      <img src="../assets/img/vueschool-logo.svg" alt="">
    </router-link>
    <div class="btn-hamburger">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>
    <nav class="navbar">
      <ul v-if="user">
        <li class="navbar-user">
          <a @click.prevent.stop="userDropdownOpen=!userDropdownOpen">
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
              <router-link :to="{name: 'Profile'}">View Profile</router-link>
            </li>
            <li class="dropdown-menu-item">
              <a
                @click.prevent="$store.dispatch('signOut').then(()=>{$router.push({name:'Home'})})"
              >Sign Out</a>
            </li>
          </ul>
        </div>
      </ul>
      <ul v-else>
        <li class="navbar-item">
          <router-link :to="{name: 'Login'}">Sign In</router-link>
        </li>
        <li class="navbar-item">
          <router-link :to="{name: 'Register'}">Register</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userDropdownOpen: true
    };
  },
  computed: {
    ...mapGetters({
      user: "authUser"
    })
  },
  created() {
    if (!this.$store.state.authId) return;
    this.$store.dispatch("fetchUser", { id: this.$store.state.authId });
  }
};
</script>

<style scoped>
</style>
