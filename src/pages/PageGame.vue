<template>
  <div>this is game{{id}}</div>
</template>

<script>
import asyncDataStatus from "@/mixins/asyncDataStatus";
export default {
  mixins: [asyncDataStatus],
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  beforeMount() {
    // this.
    this.asyncDataStatus_fetched();
  }
};
</script>

<style scoped>
</style>
