<template>
  <div class="post-list">
    <post-list-item v-for="post in posts" :key="post[0]" :post="post[1]" class="post"/>
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
      type: Array
    }
  }
};
</script>

<style  scoped>
</style>
