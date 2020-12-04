<template>
  <div>
    <div class="col-large push-top">
      <h1>{{thread.title}}</h1>
      <p>
        By
        <a href="#" class="link-unstyled">{{user.name}}</a>,
        <AppDate :timestamp="thread.publishedAt"/>
        <span
          class="hide-mobile text-faded text-small"
          style="float:right;margin-top:2px;"
        >3 reples by 3 contributors</span>
      </p>
      <post-list :posts="posts"></post-list>
      <post-editor @save="addPost" :threadId="id"/>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      thread: this.$store.state.threads[this.id],
      users: this.$store.state.users
    };
  },
  computed: {
    posts() {
      let postIds = Object.keys(this.thread.posts);
      return Object.entries(this.$store.state.posts).filter(([key, value]) => {
        return postIds.includes(key);
      });
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    }
  },
  methods: {
    addPost(eventData) {
      // console.log(eventData);
      let postId = "greatPost" + Math.random();
      let post = eventData.post;
      this.$set(this.$store.state.posts, postId, post);
      this.$set(this.thread.posts, postId, postId);
      this.$set(this.$store.state.users[post.userId].posts, postId, postId);
    }
  }
};
</script>

<style scoped>
</style>
