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
import { mapGetters } from "vuex";
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
    ...mapGetters({
      forumsWithKey: "forumsWithId"
    }),
    forums() {
      return this.$store.state.forums;
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
