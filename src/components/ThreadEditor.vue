<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        type="text"
        v-model="activeTitle"
        id="thread_title"
        class="form-input"
        name="title"
        @blur="$v.activeTitle.$touch()"
      >
      <template v-if="$v.activeTitle.$error">
        <span v-if="!$v.activeTitle.required" class="form-error">Thread must have a title</span>
        <span
          v-if="!$v.activeTitle.minLength"
          class="form-error"
        >The title must be least 10 characters long</span>
      </template>
    </div>
    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="activeText"
        id="thread_title"
        class="form-input"
        cols="30"
        rows="10"
        @blur="$v.activeText.$touch()"
      ></textarea>
      <template v-if="$v.activeText.$error">
        <span v-if="!$v.activeText.required" class="form-error">Thread must have some content</span>
        <span
          v-if="!$v.activeText.minLength"
          class="form-error"
        >The text of the thread must be least 40 characters long. Type at least {{40 - activeText.length}} more</span>
      </template>
    </div>
    <div class="btn-group">
      <button class="btn-ghost btn" @click.prevent="cancel">Cancel</button>
      <button class="btn-blue btn" type="submit" name="publish">{{isUpdate?'Update': 'Publish'}}</button>
    </div>
  </form>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  props: {
    forum: {
      type: Object
    },
    text: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  validations: {
    activeTitle: {
      required,
      minLength: minLength(10)
    },
    activeText: {
      required,
      minLength: minLength(40)
    }
  },

  data() {
    return {
      activeTitle: this.title,
      activeText: this.text
    };
  },
  computed: {
    isUpdate() {
      return !!this.title;
    }
  },
  methods: {
    save() {
      this.$emit("save", { title: this.activeTitle, text: this.activeText });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>
