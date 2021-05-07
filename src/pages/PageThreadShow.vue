<template>
  <div class="col-large push-top" v-if="asyncDataStatus_ready">
    <h1>
      {{thread.title}}
      <router-link
        v-if="user.id === $store.state.auth.authId"
        :to="{name:'ThreadEdit',params:{id:this.id}}"
        class="btn-green btn-small"
        tag="button"
      >Edit the thread</router-link>
    </h1>
    <div>
      By
      <a href="#" class="link-unstyled">{{user.name}}</a>,
      <AppDate :timestamp="thread.publishedAt"/>
      <span
        class="hide-mobile text-faded text-small"
        style="float:right;margin-top:2px;"
      >{{repliesCount}} reples by {{contributorsCount}} contributors</span>
    </div>
    <post-list @postComplaint="postComplaint($event)" :posts="posts"></post-list>
    <post-editor :threadId="id" v-if="authUser"/>
    <!-- <rich-text-editor :threadId="id" v-if="authUser"/> -->
    <div v-else class="text-center" style="mrgin-bottom:50px;">
      <router-link :to="{name:'Login',query:{redirectTo:$route.path}}">登录</router-link>&nbsp;或者&nbsp;
      <router-link :to="{name:'Register',query:{redirectTo:$route.path}}">注册</router-link>才能够去讨论
    </div>
    <modal name="complaint-dialog"  width="350" height="400" :adaptive="true" class="complaint-dialog" @closed="resetValue">
      <h1>举报的问题</h1>
      <h3>举报的问题请你选择的理由</h3>
     <ul class="complain-list" @change="change($event)" >
       <li v-for="(reason,index) in reasons" :key="index" ><label :for="'checkbox'+index">{{reason}}<input  :data-index="index" :id="'checkbox'+index" type="checkbox" name="complaints" :value="reason"/></label></li>
     </ul>
     <div class="bt-btns">
       <span class="comfirm-complaint" @click="cancel">取消</span>
       <span class="cancel-complaint" @click="commit">确定</span>
     </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PostEditor from "@comp/PostEditor";
import PostList from "@comp/PostList";
import asyncDataStatus from "@/mixins/asyncDataStatus";
import RichTextEditor from '../components/RichTextEditor.vue';
import complaint from '../api/complaint';
import $api from "../api/index.js";
export default {
  components: {
    PostList,
    PostEditor,
    RichTextEditor
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  mixins: [asyncDataStatus],
  computed: {
    ...mapGetters("posts", ["postsWithId"]),
    ...mapGetters("auth", ["authUser"]),
    thread() {
      return this.$store.state.threads.items[this.id];
    },
    reasonStr(){
      return this.resonResult.filter(str =>str!="").join(",")
    },
    posts() {
      let postIds = Object.keys(this.thread.posts);
      return this.postsWithId.filter(post => {
        return postIds.includes(post.id);
      });
    },
    user() {
      return (
        this.thread &&
        this.$store.getters["users/usersWithId"].find(item => {
          return item.id === this.thread.userId;
        })
      );
    },
    repliesCount() {
      return (
        this.posts[0] &&
        this.$store.getters["threads/threadRepliesCount"](
          this.posts[0].threadId
        )
      );
    },
    contributorsCount() {
      //find the repiles
      let repiles = Object.keys(this.thread.posts)
        .filter(postId => postId !== this.thread.firstPostId)
        .map(postId => this.$store.state.posts.items[postId]);

      // get the user ids
      const userIds = repiles.map(post => post && post.userId);
      //count the unique ids

      return userIds.filter((item, index) => {
        return userIds.indexOf(item) === index;
      }).length;
    }
  },
  methods: {
    ...mapActions("threads", ["fetchThread"]),
    ...mapActions("users", ["fetchUser"]),
    ...mapActions("posts", ["fetchPosts"]),
    cancel() {
      this.$modal.hide('complaint-dialog');
    },
    resetValue(){
      this.valueMap.fill(false)
      this.resonResult.fill("")
    },
    change($event){
      // console.log($event.target.dataset.index)
      let index = $event.target.dataset.index;
      this.valueMap[index] = !this.valueMap[index]
      if(this.valueMap[index]){
          this.$set(this.resonResult,index,this.reasons[index])
      }else {
          this.$set(this.resonResult,index,"")
      }
    },
    postComplaint($event){
     this.complaint = $event;
    },
    commit(){
     this.complaint.reason = this.reasonStr;
     $api.complaints.createComplaint(this.complaint).then(()=>{
       this.cancel();
     })
    }
  },
  data() {
    return{
      reasons:["与游戏无关","谩骂，歧视，侮辱","政治敏感","垃圾广告","出格的色情，暴力"],
      valueMap:Array(5).fill(false),
      resonResult:[],
      complaint:{}
    }
  },
  created() {
    this.fetchThread({ id: this.id }).then(thread => {
      //fetch user
      this.fetchUser({ id: thread.userId });
      let repiles = Object.keys(this.thread.posts);
      this.fetchPosts({ ids: repiles }).then(posts => {
        Promise.all(
          posts.map(post => {
            //fetch user
            this.fetchUser({ id: post.userId });
          })
        ).then(() => {
          this.asyncDataStatus_fetched();
        });
      });
    });
  }
};
</script>

<style scoped>
.complain-list>li{
  @apply hover:bg-gray-300 ;
}
.checked{
  @apply hover:bg-gray-300;
}
.complain-list>li>label{
  @apply block p-4;
}
.complaint-dialog h1{
  @apply pl-4;
}
.complaint-dialog h3{
  @apply pl-4 text-gray-400;
}
.bt-btns{
  @apply px-4 text-right;
}
.bt-btns >span{
  @apply hover:text-red-500;
}
.bt-btns .comfirm-complaint{
  @apply mr-2;
}
</style>
