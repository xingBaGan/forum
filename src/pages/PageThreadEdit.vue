<template>
  <div class="col-full push-top" v-if="asyncDataStatus_ready">
    <h1>
      Editing
      <i>{{thread.name}}</i>
    </h1>
    <thread-editor :text="text" :title="thread.title" @save="save"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ThreadEditor from "@comp/ThreadEditor";
import asyncDataStatus from "@/mixins/asyncDataStatus";
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
  mixins: [asyncDataStatus],
  computed: {
    thread() {
      return this.$store.getters["threads/threadsWithId"].find(
        item => item.id === this.id
      );
    },
    firstPost() {
      return this.$store.state.posts.items[this.thread.firstPostId];
    },
    text() {
      return this.firstPost ? this.firstPost.text : "";
    }
  },
  methods: {
    ...mapActions("posts", ["fetchPost"]),
    ...mapActions("threads", ["fetchThread"]),
    save({ title, text }) {
      this.$store
        .dispatch("threads/updateThread", {
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
  },
  created() {
    this.fetchThread({ id: this.id }).then(thread => {
      this.fetchPost({ id: this.thread.firstPostId }).then(() => {
        this.asyncDataStatus_fetched();
      });
    });
  }
};
</script>

<style scoped>
</style>
