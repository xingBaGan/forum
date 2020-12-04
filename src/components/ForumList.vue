<template>
  <div class="forum-list">
    <forum-list-item v-for="forum in forums" :forum="forum" :key="forum.id"></forum-list-item>
  </div>
</template>

<script>
import ForumListItem from "@comp/ForumListItem";
export default {
  components: {
    ForumListItem
  },
  props: {
    forums: {
      required: true
    }
  }
};
</script>

<style  scoped>
</style>
