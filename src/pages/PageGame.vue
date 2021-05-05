<template>
  <div class="box1" v-if="asyncDataStatus_ready">
    <div class="game-card">
      <div class="aside">
        <img :src="game.bg_images" alt="" class="game-avater" />
        <div class="content">
          <h2 class="title">{{ game.name }}</h2>
          <h3 class="desc">{{ game.description }}</h3>
          <div class="img-aside">
            <div class="btns">
              <span @click="concernOn" class="btn">{{subscribed?"取消关注":"关注"}}</span>
              <template v-if="!hasEvaluatedItem">
                 <span class="btn"
                ><i class="fa fa-heart-o" aria-hidden="true"></i>想玩</span
              >
              <span class="btn" @click="showModal"
                ><i class="fa fa-star-o" aria-hidden="true"></i>玩过</span
              >
              </template>
              <template v-else>
                  <span class="time">玩过{{hasEvaluatedItem.hours}}h</span><span class="u-btn" @click="beforeUpdateEvaluation">修改</span>
              </template>
            </div>
            <div class="baside">{{ game.publish_time }}</div>
          </div>
        </div>
      </div>
      <div class="value">
        社区评分
        <div class="number">{{ score?score: game.number }}
          <span class="sign" v-if="score">/5</span>
        </div>

      </div>
    </div>
    <evaluation-list class="evaluations-list" :evaluations="list" />
     <modal name="evaluation-dialog"  width="800" height="450" :adaptive="true">
       <evaluation-editor
        :modiflag="couldModi"
        :hours="editorVal.hours"
         :content="editorVal.content" :rate="editorVal.star" @closeModal="!couldModi?createEvaluation($event):updateEvaluation($event)"/>
     </modal>
  </div>
</template>

<script>
import $api from "../api";
import asyncDataStatus from "@/mixins/asyncDataStatus";
import EvaluationList from "../components/EvaluationList.vue";
import EvaluationEditor from '../components/EvaluationEditor'
// import evaluation from '../api/evaluation';
export default {
  mixins: [asyncDataStatus],
  components: {
    EvaluationList,
    EvaluationEditor
  },
  data() {
    return {
      game: {},
      list: [],
      editorVal:{
        hours:0,
        star:0,
        content:""
      }
    };
  },
  methods: {
    concernOn(){
    //  if(this.game.followers){
    //     if(!this.subscribed){
    //        this.game.followers = [this.userId,...this.game.followers]
    //     }else{
    //       let index = this.game.followers.findIndex(follow => follow == this.userId)
    //       this.game.followers.splice(index,1)
    //     }
    //  }
    //   else  this.game.followers = [this.userId];
    //   $api.games.updateGameById(this.game.id,this.game).then(res=>{
    //     console.log(res);
    //   })
      $api.games.concernedOnGame({authId:this.userId,game:this.game,subscribed:this.subscribed}).then((res)=>{
        console.log(res)
      })
    },
    showModal() {
     if(this.couldModi){
        let {hours,content,star} = this.hasEvaluatedItem
        this.editorVal = { hours:Number(hours),content,star}
     }
      this.$modal.show('evaluation-dialog');
    },
    beforeUpdateEvaluation(){
       this.showModal()
    },
    updateEvaluation($event){
      let payload = {postId:this.hasEvaluatedItem.postId,id:this.hasEvaluatedItem.id,...$event}
      $api.evaluations.updateEvaluation(payload).then(()=>{
        console.log('更新成功')
         this.$modal.hide('evaluation-dialog')
          this.getGameInfo();
      })
    },
    createEvaluation($event){
      let publishedAt = Math.floor(Date.now() / 1000)
      let payload = {...$event,
      ...{gameId:this.game.id,userId:this.userId,publishedAt,}}
      $api.evaluations.createEvaluation(payload).then((res)=>{
          this.$modal.hide('evaluation-dialog')
          // this.$forceUpdate()
          this.getGameInfo();
       })
    },
    getGameInfo(){
       $api.games.getGameByForumId(this.forumId).then((res) => {
      //返回的是posts的Promise的值与evaluations
      this.asyncDataStatus_fetched();
      this.game = res.data[0];
      $api.evaluations.getEvaluationByGameId(this.game.id).then((res) => {
        res["postResolved"].then((refs) => {
          refs.forEach((ref, index) => {
            ref.once("value", (snapshot) => {
              // console.log(snapshot.key)
              let item =this.list.find(evaluation=>{
               return evaluation.postId == snapshot.key
             })
             if(!item){
                this.list.push({
                ...snapshot.val(),
                ...res["evaluations"][index],
              });
             }else{
               item = {
                ...snapshot.val(),
                ...res["evaluations"][index],
              }
             }
            });
          });
        });
        this.asyncDataStatus_fetched();
      });
    });
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    subscribed(){
      if(!this.game.followers) return false;
      if(!this.game.followers.length) return false;
     return this.game.followers.includes(this.userId)
    },
    forumId() {
      return this.$route.params.forumId;
    },
    userId(){
      return this.$store.state.auth.authId;
    },
    hasEvaluatedItem(){
      return this.list.find(evaluation=>{
       return evaluation.userId == this.userId;
      })
    },
    score(){
      const reducer = (accumulator, evaluation) => accumulator + evaluation.star;
      return (this.list.reduce(reducer,0)/this.list.length).toFixed(2);
    },
    couldModi(){
      return this.hasEvaluatedItem?true:false;
    }
  },
  created() {
   this.getGameInfo()
  },
};
</script>

<style scoped>
.sign{
  @apply text-sm text-gray-700;
}
.time{
  @apply ml-2;
}
.u-btn{
  @apply ml-2 text-white hover:text-red-600;
}
.evaluations-list {
  max-width: 75vw;
  @apply mt-2;
}
.box1 {
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
.btn > i {
  @apply mr-1;
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
