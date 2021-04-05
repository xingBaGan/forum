<template>
  <div>this is game{{id}}</div>
</template>

<script>
import $api from "../api";
import asyncDataStatus from "@/mixins/asyncDataStatus";
export default {
  mixins: [asyncDataStatus],
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  mounted() {
    console.log($api);
    $api.games.getGames().then(res => {
      this.asyncDataStatus_fetched();
      console.log(res.data);
    });
  }
};
</script>

<style scoped>
</style>
