<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input type="text" v-model="activeTitle" id="thread_title" class="form-input" name="title">
    </div>
    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea v-model="activeText" id="thread_title" class="form-input" cols="30" rows="10"></textarea>
    </div>
    <div class="btn-group">
      <button class="btn-ghost btn" @click.prevent="cancel">Cancel</button>
      <button class="btn-blue btn" type="submit" name="publish">{{isUpdate?'Update': 'Publish'}}</button>
    </div>
  </form>
</template>

<script>
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
