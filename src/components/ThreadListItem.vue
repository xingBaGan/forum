<template>
  <div class="thread" v-if="user">
    <div>
      <p>
        <router-link :to="`/thread/${id}`">{{thread.title}}</router-link>
      </p>
      <p class="text-faded text-xsmall">
        By
        <a href="#">{{user.name}}</a>
        ,
        <app-date :timestamp="thread.publishedAt"/>
      </p>
    </div>
    <div class="activity" v-if="lastUser">
      <p class="replies-count">{{repliesCount}} replies</p>
      <img class="avatar-medium" :src="lastUser.avatar" alt="头像" v-load-img-failed="true">
      <div>
        <p class="text-xsmall">
          <a href="#">{{lastUser.name}}</a>
        </p>
        <p class="text-xsmall text-faded">
          <app-date :timestamp="lastPost.publishedAt"></app-date>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AppDate from "@comp/AppDate";
import loadImgFailed from "@/directives/load-img-failed";
export default {
  props: {
    thread: {
      required: true,
      type: Object
    },
    id: {
      required: true
    }
  },
  components: {
    AppDate
  },
  directives: {
    loadImgFailed
  },
  computed: {
    repliesCount() {
      return this.$store.getters["threads/threadRepliesCount"](this.thread.id);
    },
    user() {
      return this.$store.state.users.items[this.thread.userId];
    },
    lastPost() {
      let postId = this.thread.firstPostId;
      if (this.thread.lastPostId) {
        postId = this.thread.lastPostId;
      }
      return this.$store.state.posts.items[postId];
    },
    lastUser() {
      return (
        this.lastPost && this.$store.state.users.items[this.lastPost.userId]
      );
    }
  },
  created() {
    let postId = this.thread.firstPostId;
    if (this.thread.lastPostId) {
      postId = this.thread.lastPostId;
    }
    this.$store.dispatch("posts/fetchPost", { id: postId }).then(post => {
      this.$store.dispatch("users/fetchUser", { id: post.userId });
      this.$store.dispatch("users/fetchUser", { id: this.thread.userId });
    });
  }
};
</script>

<style scoped>
</style>
