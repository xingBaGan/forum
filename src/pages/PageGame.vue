<template>
  <div>this is game{{forumId}}</div>
</template>

<script>
import $api from "../api";
import asyncDataStatus from "@/mixins/asyncDataStatus";
export default {
  mixins: [asyncDataStatus],
  computed: {
    forumId() {
      return this.$route.params.forumId;
    }
  },
  mounted() {
    $api.games.getGameByForumId(this.forumId).then(res => {
      this.asyncDataStatus_fetched();
      console.log(res.data);
    });
  }
};
</script>

<style scoped>
</style>
