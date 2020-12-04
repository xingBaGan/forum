<template>
  <div>
    <category-list-item
      v-for="categoryItem in keyWithCategories"
      :key="categoryItem.name"
      :category="categoryItem"
    />
  </div>
</template>

<script>
import CategoryListItem from "@comp/CategoryListItem";
export default {
  components: {
    CategoryListItem
  },
  props: {
    categories: {
      required: true,
      type: Object
    }
  },
  computed: {
    keyWithCategories() {
      return Object.entries(this.categories).map(item => {
        return { id: item[0], ...item[1] };
      });
    }
  }
};
</script>

<style scoped>
</style>
