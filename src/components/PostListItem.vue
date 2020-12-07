<template>
  <div>
    <div class="post">
      <div class="user-info">
        <a href="#" class="user-name">{{user.name}}</a>
        <img href="#" class="avatar-large" :src="user.avatar" alt="">
        <p href="" class="desktop-only text-small">{{userPostCount}} posts</p>
      </div>
      <div class="post-content">
        <div>{{post.text}}</div>
      </div>
      <AppDate class="post-date text-faded" :timestamp="post.publishedAt"/>
    </div>
  </div>
</template>

<script>
import { countObjectProperties } from "@/utils";
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed: {
    user() {
      return this.$store.state.users[this.post.userId];
    },
    userPostCount() {
      return countObjectProperties(this.user.posts);
    }
  }
};
</script>

<style scoped>
</style>
