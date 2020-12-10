<template>
  <div class="col-full push-top" v-if="forum">
    <h1>
      Create new thread in
      <i>{{forum.name}}</i>
    </h1>
    <thread-editor :forum="forum" @save="save" ref="editor"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
  data() {
    return {
      saved: false
    };
  },
  computed: {
    forum() {
      return this.$store.getters.forumsWithId.find(
        item => item.id === this.forumId
      );
    },
    hasUnsavedChanges() {
      return (
        (this.$refs.editor.activeTitle || this.$refs.editor.activeText) &&
        !this.saved
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
          this.saved = true;
          this.$router.push({ name: "ThreadShow", params: { id: threadId } });
        });
    },
    cancel() {
      this.$router.go(-1);
    },
    ...mapActions(["fetchForum"])
  },
  created() {
    this.fetchForum({ id: this.forumId }).then(this.$emit("ready"));
  },
  beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges) {
      const comfirmed = window.confirm(
        "Are you sure want to leave?unsaved changes will be lost."
      );
      if (comfirmed) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
</script>

<style scoped>
</style>
