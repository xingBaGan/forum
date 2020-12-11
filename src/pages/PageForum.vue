<template>
  <div class="forum-full" v-if="asyncDataStatus_ready">
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
import { mapGetters, mapActions } from "vuex";
import asyncDataStatus from "@/mixins/asyncDataStatus";
import { Promise } from "q";
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
  mixins: [asyncDataStatus],
  computed: {
    ...mapGetters("forums", {
      forumsWithId: "forumsWithId"
    }),
    ...mapGetters("threads", ["threadsWithId"]),
    forum() {
      return this.forumsWithId.filter(forum => forum.id === this.id)[0];
    },
    threads() {
      return this.threadsWithId.filter(thread => thread.forumId === this.id);
    }
  },
  methods: {
    ...mapActions("threads", ["fetchThreads"]),
    ...mapActions("users", ["fetchUser"]),
    ...mapActions("forums", ["fetchForum"])
  },
  created() {
    this.fetchForum({ id: this.id }).then(forum => {
      this.fetchThreads({ ids: Object.keys(forum.threads) })
        .then(threads =>
          Promise.all(
            threads.map(thread => this.fetchUser({ id: thread.userId }))
          )
        )
        .then(() => {
          this.asyncDataStatus_fetched();
        });
    });
  }
};
</script>

<style  scoped>
.forum-full {
  width: 100%;
}
</style>
