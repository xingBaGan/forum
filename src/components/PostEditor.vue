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
        @blur="$v.newPostTest.$touch()"
      ></textarea>
      <template v-if="$v.newPostTest.$error">
        <span v-if="!$v.newPostTest.required" class="form-error">Thread must have some content</span>
        <span
          v-if="!$v.newPostTest.minLength"
          class="form-error"
        >The text of the thread must be least 20 characters long. Type at least {{20 - newPostTest.length}} more</span>
      </template>
    </div>
    <div class="form-actions">
      <button v-if="isUpdate" class="btn-ghost btn" @click.prevent="cancel">Cancel</button>
      <button class="btn-blue">{{isUpdate?'Update':'Submit post'}}</button>
    </div>
  </form>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
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
  validations: {
    newPostTest: {
      required,
      minLength: minLength(20)
    }
  },
  computed: {
    isUpdate() {
      return !!this.post;
    }
  },
  methods: {
    ...mapActions("posts", ["createPost", "updatePost"]),
    save() {
      let promise = this.isUpdate ? this.update() : this.create();
      if (!promise) return;
      promise.then(postId => {
        this.$emit("save", { postId });
        this.$v.$reset();
      });
    },
    create() {
      let post = {
        text: this.newPostTest,
        threadId: this.threadId
      };
      if (this.$v.$invalid) {
        return;
      }
      this.newPostTest = "";
      return this.createPost(post);
    },
    update() {
      const payload = {
        id: this.post.id,
        text: this.newPostTest
      };
      if (this.$v.$invalid) {
        return;
      }
      return this.updatePost(payload);
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style  scoped>
</style>
