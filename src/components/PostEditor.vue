<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="form-input"
        :value="newPostTest"
        v-on:input="newPostTest=$event.target.value"
      ></textarea>
    </div>
    <div class="form-actions">
      <button v-if="isUpdate" class="btn-ghost btn" @click.prevent="cancel">Cancel</button>
      <button class="btn-blue">{{isUpdate?'Update':'Submit post'}}</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    threadId: {
      type: String,
      required: false
    },
    post: {
      type: Object
    }
  },
  data() {
    return {
      newPostTest: this.post ? this.post.text : ""
    };
  },
  computed: {
    isUpdate() {
      return !!this.post;
    }
  },
  methods: {
    save() {
      (this.isUpdate ? this.update() : this.create()).then(postId => {
        this.$emit("save", { postId });
      });
    },
    create() {
      let post = {
        text: this.newPostTest,
        threadId: this.threadId
      };
      this.newPostTest = "";
      return this.$store.dispatch("createPost", post);
    },
    update() {
      const payload = {
        id: this.post.id,
        text: this.newPostTest
      };
      return this.$store.dispatch("updatePost", payload);
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style  scoped>
</style>
