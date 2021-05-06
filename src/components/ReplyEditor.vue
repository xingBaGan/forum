<template>
  <div class="reply" v-if="user">
    <div class="reply-top">
      <img class="user-icon" :src="user.avatar" alt="">
      <textarea name="" id="" v-model="content"></textarea>
    </div>
    <span class="reply-btn" @click="replyTo">回复</span>
  </div>
  <div v-else class="text-center" style="mrgin-bottom:50px;">
      <router-link :to="{name:'Login',query:{redirectTo:$route.path}}">登录</router-link>&nbsp;或者&nbsp;
      <router-link :to="{name:'Register',query:{redirectTo:$route.path}}">注册</router-link>才能够去回复
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    replyTo() {
      this.$emit("reply", { content: this.content });
    }
  },
  computed: {
    ...mapGetters("auth", {
      user: "authUser"
    })
  }
};
</script>

<style scoped>
.reply-top {
  @apply flex flex-row;
}
.reply {
  @apply flex my-4 flex-col;
}
.user-icon {
  @apply w-8 h-8 bg-red-400 rounded-full ml-4;
}
.reply textarea {
  width: calc(100% - 2em);
  background-color: #545454;
  color: white;
  @apply mx-4 h-12;
}
.reply-btn {
  /* width:50px; */
  @apply px-1 py-2 bg-blue-800 text-white  self-end mt-2 mr-4;
}
</style>
