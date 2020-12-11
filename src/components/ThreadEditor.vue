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
        @blur="$v.form.title.$touch()"
      >
      <template v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.required" class="form-error">Thread must have a title</span>
        <span
          v-if="!$v.form.title.minLength"
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
        @blur="$v.form.text.$touch()"
      ></textarea>
      <template v-if="$v.form.text.$error">
        <span v-if="!$v.form.text.required" class="form-error">Thread must have some content</span>
        <span
          v-if="!$v.form.text.minLength"
          class="form-error"
        >The text of the thread must be least 40 characters long. Type at least {{40 - form.text.length}} more</span>
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
    form: {
      title: {
        required,
        minLength: minLength(10)
      },
      text: {
        required,
        minLength: minLength(40)
      }
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
