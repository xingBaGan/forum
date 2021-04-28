<template>
  <div class="box1">
    <div class="game-card">
      <div class="aside">
        <img :src="game.bg_images" alt="" class="game-avater">
        <div class="content">
          <h2 class="title">{{game.name}}</h2>
          <h3 class="desc">{{game.description}}</h3>
          <div class="img-aside">
            <div class="btns">
              <span class="btn">关注</span>
              <span class="btn">想玩</span>
              <span class="btn">玩过</span>
            </div>
            <div class="baside">{{game.publish_time}}</div>
          </div>
        </div>
      </div>
      <div class="value">社区评分
        <h3 class="number">{{game.number}}</h3>
      </div>
    </div>
      <evaluation-list class="evaluations-list" :evaluations="list" />
  </div>
</template>

<script>
import $api from "../api";
import asyncDataStatus from "@/mixins/asyncDataStatus";
import EvaluationList from '../components/EvaluationList.vue';
export default {
  mixins: [asyncDataStatus],
  components: {
    EvaluationList
  },
  data() {
    return {
      game: {},
      list: []
    };
  },
  computed: {
    forumId() {
      return this.$route.params.forumId;
    }
  },
  beforeMount() {
    $api.games.getGameByForumId(this.forumId).then(res => {
      //返回的是posts的Promise的值与evaluations
      this.asyncDataStatus_fetched();
      this.game = res.data[0];
      $api.evaluations.getEvaluationByGameId(this.game.id).then(res =>
        res["postResolved"].then(refs => {
          refs.forEach((ref, index) => {
            ref.on("value", snapshot => {
              this.list.push({
                ...snapshot.val(),
                ...res["evaluations"][index]
              });
            });
          });
        })
      );
    });
  }
};
</script>

<style scoped>

.evaluations-list{
   max-width: 75vw;
   @apply   mt-2;
}
.box1{
  flex-direction: column;
  @apply flex mx-auto;
}
.desc {
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  @apply text-base;
}
.game-card {
  background-color: #263959;
  max-width: 75vw;
  @apply rounded  h-full bg-blue-300 px-4  bg-opacity-90 flex justify-between mt-8 max-w-full lg:max-w-4xl;
}
.game-avater {
  height: 160px;
  width: 120px;
  position: relative;
  top: -10px;
  object-fit: cover;
  @apply shadow-2xl;
}
.aside {
  flex-grow: 1;
  @apply flex justify-between;
}
.content {
  flex-grow: 1;
  @apply p-4 flex flex-col justify-between;
}
.title {
  @apply text-gray-100 text-4xl font-bold text-left;
}

.btn {
  border: 1px solid white;
  @apply py-1 px-3 mt-3 text-white text-sm ml-2 hover:text-black hover:bg-blue-400;
}
.img-aside {
  @apply flex justify-between;
}
.value {
  width: 300px;
  @apply text-base text-black py-4;
}
.number {
  @apply text-4xl text-black mt-2;
}
.baside {
  @apply mt-4 pr-2;
}
</style>
