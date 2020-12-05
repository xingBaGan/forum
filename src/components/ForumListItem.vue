<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        href="#"
        class="text-xlarge"
        :to="{name:'Forum',params:{id:forum.id}}"
      >{{forum.name}}</router-link>
      <p>{{forum.description}}</p>
    </div>
    <div class="threads-count">
      <p class="count">{{threadscount}}</p>
      {{threadscount === 1 ? 'thread':'threads'}}
    </div>
    <div class="last-thread"></div>
  </div>
</template>

<script>
import { countObjectProperties } from "@/utils";
export default {
  props: {
    forum: {
      type: Object,
      required: true
    }
  },
  computed: {
    threadscount() {
      return countObjectProperties(this.forum.threads);
    }
  }
};
</script>

<style scoped>
</style>
