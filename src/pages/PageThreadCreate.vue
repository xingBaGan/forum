<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in
      <i>{{forum.name}}</i>
    </h1>
    <thread-editor :forum="forum" @save="save"/>
  </div>
</template>

<script>
import ThreadEditor from "@comp/ThreadEditor";
export default {
  components: {
    ThreadEditor
  },
  props: {
    forumId: {
      type: String,
      required: true
    }
  },
  computed: {
    forum() {
      return this.$store.getters.forumsWithId.find(
        item => item.id === this.forumId
      );
    }
  },
  methods: {
    save({ title, text }) {
      this.$store
        .dispatch("createThread", {
          forumId: this.forum.id,
          title,
          text
        })
        .then(threadId => {
          this.$router.push({ name: "ThreadShow", params: { id: threadId } });
        });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>
