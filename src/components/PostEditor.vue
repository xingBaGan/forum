<template>
  <form @submit.prevent="addPost">
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
    <div class="form-acions">
      <button class="btn-blue">Submit post</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    threadId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newPostTest: ""
    };
  },
  methods: {
    addPost() {
      let post = {
        text: this.newPostTest,
        threadId: this.threadId
      };
      this.newPostTest = "";
      this.$store.dispatch("createPost", post);
    }
  }
};
</script>

<style  scoped>
</style>
