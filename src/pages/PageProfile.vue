<template>
  <div class="flex-grid" v-if="asyncDataStatus_ready">
    <user-profile-card v-if="!edit" :user="user"/>
    <user-profile-card-editor v-else :user="user" @child-ready="asyncDataStatus_fetched"/>
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">{{user.username}} 的 最近活动</span>
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
import asyncData from "@/mixins/asyncDataStatus";
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
  mixins: [asyncData],
  computed: {
    ...mapGetters("auth", {
      user: "authUser"
    }),
    userPosts() {
      if (this.user.posts) {
        return this.$store.getters["posts/postsWithId"].filter(
          post => post.userId === this.user.id
        );
      }
    }
  },
  methods: {
    childReady() {
      this.asyncDataStatus_fetched();
    }
  },
  beforeCreate() {
    this.$store.dispatch("auth/fetchAuthUser").then(user => {
      this.$store
        .dispatch("posts/fetchPosts", { ids: Object.keys(user.posts) })
        .then(() => {
          this.asyncDataStatus_fetched();
        });
    });
  },
  updated() {
    if (this.$route.query.back) {
      this.asyncDataStatus_fetched();
    }
  }
};
</script>

<style scoped>
</style>
