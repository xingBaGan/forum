<template>
  <div>
    <category-list-item
      v-for="categoryItem in CategoriesWithId"
      :key="categoryItem.name"
      :category="categoryItem"
    />
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
    categories: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters("categories", {
      CategoriesWithId: "categoriesWithId"
    })
  }
};
</script>

<style scoped>
</style>
