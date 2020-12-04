<template>
  <div class="col-full">
    <h1>welcome to the forum</h1>
    <!-- <forum-list :forums="keyWithForums"></forum-list> -->
    <category-list :categories="categories"></category-list>
  </div>
</template>

<script>
import CategoryList from "@/components/CategoryList";

export default {
  name: "HelloWorld",
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  components: {
    CategoryList
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
