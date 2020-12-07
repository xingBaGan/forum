<template>
  <div>
    <div class="col-large push-top">
      <h1>
        {{thread.title}}
        <router-link
          :to="{name:'ThreadEdit',params:{id:this.id}}"
          class="btn-green btn-small"
          tag="button"
        >Edit the thread</router-link>
      </h1>
      <p>
        By
        <a href="#" class="link-unstyled">{{user.name}}</a>,
        <AppDate :timestamp="thread.publishedAt"/>
        <span
          class="hide-mobile text-faded text-small"
          style="float:right;margin-top:2px;"
        >{{repliesCount}} reples by {{contributorsCount}} contributors</span>
      </p>
      <post-list :posts="posts"></post-list>
      <post-editor :threadId="id"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostEditor from "@comp/PostEditor";
import PostList from "@comp/PostList";
export default {
  components: {
    PostList,
    PostEditor
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(["postsWithId"]),
    thread() {
      return this.$store.state.threads[this.id];
    },
    posts() {
      let postIds = Object.keys(this.thread.posts);
      return this.postsWithId.filter(post => {
        return postIds.includes(post.id);
      });
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    },
    repliesCount() {
      return this.$store.getters.threadRepliesCount(this.posts[0].threadId);
    },
    contributorsCount() {
      //find the repiles
      let repiles = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts[postId]);
      // get the user ids
      const userIds = repiles.map(post => post.userId);
      //count the unique ids
      return userIds.filter((item, index) => {
        return userIds.indexOf(item) === index;
      }).length;
    }
  }
};
</script>

<style scoped>
</style>
