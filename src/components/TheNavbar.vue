<template>
  <header class="header" id="header" v-if="user">
    <router-link :to="{name:'Home'}" class="logo">
      <img src="../assets/img/vueschool-logo.svg" alt="">
    </router-link>
    <div class="btn-hamburger">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>
    <nav class="navbar">
      <li class="navbar-user">
        <router-link :to="{name:'Profile'}">
          <img :src="user.avatar" alt="" class="avatar-small">
          <span>
            {{user.name}}
            <img src="../assets/img/arrow-profile.svg" alt="" class="icon-profile">
          </span>
        </router-link>
      </li>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "authUser"
    })
  },
  created() {
    this.$store.dispatch("fetchUser", { id: this.$store.state.authId });
  }
};
</script>

<style scoped>
</style>
