<template>
  <div class="profile-card">
    <p class="text-center">
      <img alt="" :src="user.avatar" class="avatar-xlarge">
    </p>
    <h1 class="title">{{user.username}}</h1>
    <p class="text-lead">{{user.name}}</p>
    <p class="text-justify">
      <span v-if="user.bio">{{user.bio}}</span>
      <span v-else>no bio specified</span>
    </p>
    <span class="online">{{user.username}} is online</span>
    <div class="stats">
      <span>{{userPostsCount}} posts</span>
      <span>{{userThreadsCount}} threads</span>
    </div>
    <hr>
    <p v-if="user.website" class="text-large text-center">
      <i class="fa-globe fa">
        <a :href="user.website">{{user.website}}</a>
      </i>
    </p>
    <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>
    <div class="text-center">
      <hr>
      <router-link :to="{name:'ProfileEdit'}" class="btn-green btn-small">Edit profile</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      type: Object,
      validator: obj => {
        let hasId = obj.id;
        if (!hasId) {
          console.error("the user must has `Id` property");
        }
        return hasId;
      }
    }
  },
  computed: {
    userThreadsCount() {
      return this.$store.getters["users/userThreadsCount"](this.user.id);
    },
    userPostsCount() {
      return this.$store.getters["users/userPostsCount"](this.user.id);
    }
  }
};
</script>

<style scoped>
</style>
