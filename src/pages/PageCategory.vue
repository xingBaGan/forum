<template>
  <div class="col-full" v-if="asyncDataStatus_ready">
    <category-list-item :category="category"/>
  </div>
</template>

<script>
import CategoryListItem from "@comp/CategoryListItem";
import { mapGetters, mapActions } from "vuex";
import asyncDataStatus from "@/mixins/asyncDataStatus";
export default {
  components: {
    CategoryListItem
  },
  mixins: [asyncDataStatus],
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
  },
  methods: {
    ...mapActions(["fetchCategory", "fetchForums"])
  },
  created() {
    this.fetchCategory({ id: this.id })
      .then(category => this.fetchForums({ ids: Object.keys(category.forums) }))
      .then(() => {
        this.asyncDataStatus_fetched();
      });
  }
};
</script>

<style scoped>
</style>
