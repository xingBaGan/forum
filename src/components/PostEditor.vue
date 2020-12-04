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
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: "7uVPJS9GHoftN58Z2MXCYDqmNAh2"
      };

      this.newPostTest = "";
      this.$emit("save", { post });
    }
  }
};
</script>

<style  scoped>
</style>
