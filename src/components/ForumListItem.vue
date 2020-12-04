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
export default {
  props: {
    forum: {
      type: Object,
      required: true
    }
  },
  computed: {
    threadscount() {
      if (!this.forum.threads) return 0;
      return Object.values(this.forum.threads).length;
    }
  }
};
</script>

<style scoped>
</style>
