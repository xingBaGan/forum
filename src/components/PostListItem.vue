<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{user.name}}</a>
      <img href="#" class="avatar-large" :src="user.avatar" alt="">
      <p href="" class="desktop-only text-small">{{userPostCount}} posts</p>
    </div>
    <div class="post-content">
      <template v-if="!editing">
        <div>{{post.text}}</div>
        <a
          @click.prevent="editing =true"
          href="#"
          style="margin-left:auto;"
          class="link-unstyled"
          title="make a change"
        >
          <i class="fa fa-pencil"></i>
        </a>
      </template>
      <div v-else style=" width: 100%;">
        <post-editor :post="post" @save="editing =false" @cancel="editing =false"/>
      </div>
    </div>
    <div class="post-date text-faded">
      <div v-if="post.edited" class="edition-info">edited</div>
      <AppDate :timestamp="post.publishedAt"/>
    </div>
  </div>
</template>

<script>
import PostEditor from "./PostEditor";
export default {
  components: {
    PostEditor
  },
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      editing: false
    };
  },
  computed: {
    user() {
      return this.$store.state.users[this.post.userId];
    },
    userPostCount() {
      return this.$store.getters.userPostsCount(this.post.userId);
    }
  }
};
</script>

<style scoped>
</style>
