<template>
  <div class="thread-list">
    <h2 class="list-title">Threads</h2>
    <thread-list-item
      v-for="(thread,index) in threads"
      :key="index"
      :thread="thread"
      :id="thread.id"
    ></thread-list-item>
  </div>
</template>

<script>
import ThreadListItem from "@/components/ThreadListItem";
export default {
  components: {
    ThreadListItem
  },
  props: {
    threads: {
      reqired: true
    }
  }
};
</script>

<style  scoped>
</style>
