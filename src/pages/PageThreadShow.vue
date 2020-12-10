<template>
  <div class="col-large push-top" v-if="asyncDataStatus_ready">
    <h1>
      {{thread.title}}
      <router-link
        :to="{name:'ThreadEdit',params:{id:this.id}}"
        class="btn-green btn-small"
        tag="button"
      >Edit the thread</router-link>
    </h1>
    <div>
      By
      <a href="#" class="link-unstyled">{{user.name}}</a>,
      <AppDate :timestamp="thread.publishedAt"/>
      <span
        class="hide-mobile text-faded text-small"
        style="float:right;margin-top:2px;"
      >{{repliesCount}} reples by {{contributorsCount}} contributors</span>
    </div>
    <post-list :posts="posts"></post-list>
    <post-editor :threadId="id" v-if="authUser"/>
    <div v-else class="text-center" style="mrgin-bottom:50px;">
      <router-link :to="{name:'Login',query:{redirectTo:$route.path}}">Sign in</router-link>&nbsp;or&nbsp;
      <router-link :to="{name:'Register',query:{redirectTo:$route.path}}">Register</router-link>to post a reply
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PostEditor from "@comp/PostEditor";
import PostList from "@comp/PostList";
import asyncDataStatus from "@/mixins/asyncDataStatus";
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
  mixins: [asyncDataStatus],
  computed: {
    ...mapGetters(["postsWithId", "authUser"]),
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
      return this.thread && this.$store.state.users[this.thread.userId];
    },
    repliesCount() {
      return (
        this.posts[0] &&
        this.$store.getters.threadRepliesCount(this.posts[0].threadId)
      );
    },
    contributorsCount() {
      //find the repiles
      let repiles = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts[postId]);
      // get the user ids
      const userIds = repiles.map(post => post && post.userId);
      //count the unique ids
      return userIds.filter((item, index) => {
        return userIds.indexOf(item) === index;
      }).length;
    }
  },
  methods: {
    ...mapActions(["fetchThread", "fetchUser", "fetchPosts"])
  },
  created() {
    this.fetchThread({ id: this.id }).then(thread => {
      //fetch user
      this.fetchUser({ id: thread.userId });
      let repiles = Object.keys(this.thread.posts);
      this.fetchPosts({ ids: repiles }).then(posts => {
        Promise.all(
          posts.map(post => {
            //fetch user
            this.fetchUser({ id: post.userId });
          })
        ).then(() => {
          this.asyncDataStatus_fetched();
        });
      });
    });
  }
};
</script>

<style scoped>
</style>
