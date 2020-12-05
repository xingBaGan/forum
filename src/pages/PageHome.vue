<template>
  <div class="col-full">
    <navbar/>
    <h1 class="push-top">welcome to the forum</h1>
    <!-- <forum-list :forums="keyWithForums"></forum-list> -->
    <category-list :categories="categories"></category-list>
  </div>
</template>

<script>
import CategoryList from "@/components/CategoryList";
import Navbar from "@comp/TheNavbar";
export default {
  name: "HelloWorld",
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  components: {
    CategoryList,
    Navbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
