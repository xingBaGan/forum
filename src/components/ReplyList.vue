<template>
  <div class="comment-list" >
    <template v-for="(reply,index) in replies">
       <reply-list-item :reply="reply"  :key="index"></reply-list-item>
    </template>
     </div>
</template>

<script>
import ReplyListItem from "./ReplyListItem";
  export default {
    components: {
      ReplyListItem,
    },
    props: {
      replies: {
        type: Array,
        default: []
      }
    },
  }
</script>

<style scoped>
.comment-list{
  @apply flex-col flex ;
}


</style>
