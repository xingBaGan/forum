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
    <div class="last-thread">
      <img v-if="lastUser" class="avatar" :src="lastUser.avatar" alt="头像" v-load-img-failed="true">
    </div>
  </div>
</template>

<script>
import { countObjectProperties } from "@/utils";
import loadImgFailed from "@/directives/load-img-failed";
export default {
  props: {
    forum: {
      type: Object,
      required: true
    }
  },
  directives: {
    loadImgFailed
  },
  computed: {
    threadscount() {
      return countObjectProperties(this.forum.threads);
    },
    lastPost() {
      return this.$store.state.posts.items[this.forum.lastPostId];
    },
    lastUser() {
      return this.lastPost
        ? this.$store.state.users.items[this.lastPost.userId]
        : null;
    }
  },
  created() {
    if (this.forum.lastPostId) {
      this.$store
        .dispatch("posts/fetchPost", { id: this.forum.lastPostId })
        .then(post => {
          this.$store.dispatch("users/fetchUser", { id: post.userId });
        });
    }
  }
};
</script>

<style scoped>
</style>
