<template>
  <div class="forum-full">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{forum.name}}</h1>
          <p class="text-lead">{{forum.description}}</p>
        </div>
        <a href="" class="btn-green btn-small">start a thread</a>
      </div>
    </div>
    <div class="col-full push-top">
      <ThreadList :threads="threads"></ThreadList>
    </div>
  </div>
</template>

<script>
import ThreadList from "@comp/ThreadList";
import { mapGetters } from "vuex";
export default {
  components: {
    ThreadList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters({
      threadsWithKey: "threadsWithId"
    }),
    forum() {
      return this.$store.state.forums[this.id];
    },
    threads() {
      return this.threadsWithKey.filter(thread => thread.forumId === this.id);
    }
  }
};
</script>

<style  scoped>
.forum-full {
  width: 100%;
}
</style>
