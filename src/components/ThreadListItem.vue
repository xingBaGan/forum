<template>
  <div class="thread">
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
    <div class="activity">
      <p class="replies-count">{{repliesCount}} replies</p>
      <!--<img class="avatar-medium" src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png" alt="">-->
      <!--<div>-->
      <!--<p class="text-xsmall">-->
      <!--<a href="#">Bruce Wayne</a>-->
      <!--</p>-->
      <!--<p class="text-xsmall text-faded">2 hours ago</p>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
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
  computed: {
    repliesCount() {
      return this.$store.getters.threadRepliesCount(this.thread.id);
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    }
  }
};
</script>

<style scoped>
</style>
