<template>
  <div class="main">
    <div class="aside">
      <img :src="game.bg_images" alt="" class="game-avater"/>
      <div class="content">
        <h2 class="title">{{game.name}}</h2>
        <div class="img-aside">
          <div class="btns">
            <span class="btn">关注</span>
            <span class="btn">想玩</span>
            <span class="btn">玩过</span>
          </div>
          <div class="baside">
            {{game.publish_time}}
          </div>
        </div>
      </div>
    </div>
    <div class="value">社区评分 <h3 class="number">{{game.number}}</h3> </div>  
  </div>
</template>

<script>
import $api from "../api";
import asyncDataStatus from "@/mixins/asyncDataStatus";
export default {
  mixins: [asyncDataStatus],
  data(){
    return {
      game:{}
    }
  },
  computed: {
    forumId() {
      return this.$route.params.forumId;
    }
  },
  beforeMount() {
      $api.games.getGameByForumId(this.forumId).then(res => {
      this.asyncDataStatus_fetched();
      this.game = res.data[0]
    });
  }
};
</script>

<style scoped>
.main{
  
  @apply container mx-auto h-full bg-blue-300 px-4 bg-indigo-500 bg-opacity-75 flex justify-between mt-8;
}
.game-avater{
  height:160px;
  width:120px;
  position:relative;
  top:-10px;
  object-fit: cover;
  @apply shadow-xl;
}
.aside{
   flex-grow:1;
  @apply flex justify-between;
}
.content{
  flex-grow:1;
  @apply p-4 flex flex-col justify-between;
}
.title{
  @apply text-white text-4xl font-bold text-left;
}

.btn{
  border:1px solid white;
  @apply py-3 px-2 text-white text-sm ml-2;
}
.img-aside{
  
  @apply flex justify-between;
}
.value{

   @apply text-base text-black py-4;
}
.number{
  @apply text-4xl text-black mt-2;
}
.baside{
  @apply mt-4 pr-2;
}
</style>
