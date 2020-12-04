<template>
  <div>
    <div class="post">
      <div class="user-info">
        <a href="#" class="user-name">{{user.name}}</a>
        <img href="#" class="avatar-large" :src="user.avatar" alt="">
        <a href="" class="desktop-only text-small">{{userPostCount}} posts</a>
      </div>
      <div class="post-content">
        <div>{{post.text}}</div>
      </div>
      <AppDate class="post-date text-faded" :timestamp="post.publishedAt"/>
    </div>
  </div>
</template>

<script>
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
      const postIdsArray = Object.keys(this.user.posts);
      return postIdsArray.length;
    }
  }
};
</script>

<style scoped>
</style>
