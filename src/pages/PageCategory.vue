<template>
  <div class="col-full">
    <category-list-item :category="category"/>
  </div>
</template>

<script>
import CategoryListItem from "@comp/CategoryListItem";
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
    categories() {
      return this.$store.state.categories;
    },
    keyWithCategories() {
      return Object.entries(this.categories).map(item => {
        return { id: item[0], ...item[1] };
      });
    },
    category() {
      return this.keyWithCategories.filter(item => item.id === this.id)[0];
    }
  }
};
</script>

<style scoped>
</style>
