<template>
  <div class="forum-full">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{forum.name}}</h1>
          <p class="text-lead">{{forum.description}}</p>
        </div>
        <router-link
          :to="{name:'ThreadCreate',params:{forumId:this.forum.id}}"
          class="btn-green btn-small"
        >start a thread</router-link>
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
      threadsWithKey: "threadsWithId",
      forumsWithId: "forumsWithId"
    }),
    forum() {
      return this.forumsWithId.filter(forum => forum.id === this.id)[0];
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
