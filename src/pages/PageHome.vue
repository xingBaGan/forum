<template>
  <div class="col-full" v-if="asyncDataStatus_ready">
    <h1 class="push-top">welcome to the forum</h1>
    <!-- <forum-list :forums="keyWithForums"></forum-list> -->
    <category-list :categories="categories"></category-list>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CategoryList from "@/components/CategoryList";
import asyncDataStatus from "@/mixins/asyncDataStatus";
export default {
  name: "Forum",
  mixins: [asyncDataStatus],
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  components: {
    CategoryList
  },
  methods: {
    ...mapActions("categories", ["fetchAllCategories"]),
    ...mapActions("forums", ["fetchForums"])
  },
  created() {
    this.fetchAllCategories().then(categories => {
      Promise.all(
        categories.map(category =>
          this.fetchForums({
            ids: Object.keys(category.forums)
          })
        )
      ).then(() => {
        this.asyncDataStatus_fetched();
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
