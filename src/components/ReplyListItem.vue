<template>
  <div class="comment-item">
       <div class="comment-user-info">
           <img class="user-icon" :src="user.avatar" alt="" />
           <span class="name">{{user.name}}</span>
           <div class="user-time">
              <app-date :timestamp="reply.publishedAt"/>
           </div>
           <span class="recomment-btn">回复</span>
       </div>
         <div class="comment-content">
           <p>
              {{reply.content}}
           </p>
         </div>
       </div>
</template>

<script>
import $api from "../api/index.js";
import AppDate from "./AppDate";
  export default {
    components: {
      AppDate,
    },
    props: {
      reply: {
        type: Object,
      },
    },
    data() {
      return {
        user: {}
      }
    },
    created () {
       $api.users.getUserById(this.reply.userId).then((snapshot)=>{
          this.user = snapshot.val()
       })
    },
  }
</script>

<style scoped>
.name{
  @apply ml-2;
}
.comment-item{
 @apply flex-1 flex flex-col mt-2;
}
.comment-user-info{
  @apply  flex flex-row ;
}
.user-time{
   @apply ml-4;
}
.user-icon{
  @apply w-8 h-8 bg-red-400 rounded-full ml-4;
}
.comment-content{
  @apply ml-12 mr-4;
}
.recomment-btn{
  @apply justify-self-end flex-1 text-right mr-4;
}
.comment-content>p{
  width:100%;
  background-color:#545454;
  color:white;
}
</style>
