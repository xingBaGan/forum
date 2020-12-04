<template>
  <div class="forum-list">
    <h2 class="list-title">
      <router-link :to="{name:'Category',params:{id:category.id}}">{{category.name}}</router-link>
    </h2>
    <forum-list :forums="forumsByCategoryId(category.id)"></forum-list>
  </div>
</template>

<script>
import forumList from "./ForumList";
export default {
  components: {
    forumList
  },
  props: {
    category: {
      type: Object,
      required: true
    }
  },

  computed: {
    forums() {
      return this.$store.state.forums;
    },
    forumsWithKey() {
      return Object.entries(this.forums).map(item => {
        return { id: item[0], ...item[1] };
      });
    }
  },
  methods: {
    forumsByCategoryId(id) {
      return this.forumsWithKey.filter(item => item.categoryId === id);
    }
  }
};
</script>

<style scoped>
</style>
