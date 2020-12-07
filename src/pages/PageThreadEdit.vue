<template>
  <div class="col-full push-top">
    <h1>
      Editing
      <i>{{thread.name}}</i>
    </h1>
    <thread-editor :text="text" :title="thread.title" @save="save"/>
  </div>
</template>

<script>
import ThreadEditor from "@comp/ThreadEditor";
export default {
  components: {
    ThreadEditor
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    thread() {
      return this.$store.getters.threadsWithId.find(
        item => item.id === this.id
      );
    },
    text() {
      return this.$store.state.posts[this.thread.firstPostId].text;
    }
  },
  methods: {
    save({ title, text }) {
      this.$store
        .dispatch("updateThread", {
          threadId: this.id,
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
