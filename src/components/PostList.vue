<template>
  <div class="post-list">
    <post-list-item v-for="post in posts" :key="post.id" :post="post" class="post"/>
  </div>
</template>

<script>
import PostListItem from "@comp/PostListItem";
export default {
  components: {
    PostListItem
  },
  props: {
    posts: {
      required: true,
      type: Array || undefined
    }
  }
};
</script>

<style  scoped>
</style>
