<template>
  <div class="flex-grid">
    <user-profile-card v-if="!edit" :user="user"/>
    <user-profile-card-editor v-else :user="user"/>
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{user.username}}'s recent activity</span>
        <a href="#">see onl started threads</a>
      </div>
      <hr>
      <PostList :posts="userPosts"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostList from "@comp/PostList";
import UserProfileCard from "@comp/UserProfileCard";
import UserProfileCardEditor from "@comp/UserProfileCardEditor";
export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },
  props: {
    edit: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      user: "authUser"
    }),
    userPosts() {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts).filter(
          post => post.userId === this.user.id
        );
      }
    }
  }
};
</script>

<style scoped>
</style>
