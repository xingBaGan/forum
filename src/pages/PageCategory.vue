<template>
  <div class="col-full">
    <category-list-item :category="category"/>
  </div>
</template>

<script>
import CategoryListItem from "@comp/CategoryListItem";
import { mapGetters } from "vuex";
export default {
  components: {
    CategoryListItem
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      keyWithCategories: "categoriesWithId"
    }),
    categories() {
      return this.$store.state.categories;
    },
    category() {
      return this.keyWithCategories.filter(item => item.id === this.id)[0];
    }
  }
};
</script>

<style scoped>
</style>
