<template>
  <div class="post">
    <div class="user-info" v-if="user">
      <a href="#" class="user-name">{{user.name}}</a>
      <img href="#" class="avatar-large" :src="user.avatar" alt="">
      <p href="" class="desktop-only text-small">{{userPostCount}} posts</p>
      <p href="" class="desktop-only text-small">{{userThreadCount}} threads</p>
    </div>
    <div class="post-content">
      <template v-if="!editing">
        <div>{{post.text}}</div>
        <a
          @click.prevent="editing =true && canEdit"
          href="#"
          style="margin-left:auto;"
          class="link-unstyled"
          title="make a change"
        >
          <i class="fa fa-pencil" v-if="canEdit"></i>
        </a>
      </template>
      <div v-else style=" width: 100%;">
        <post-editor :post="post" @save="editing =false" @cancel="editing =false"/>
      </div>
    </div>
    <div class="post-date text-faded">
      <span class="iconfont icon-custom-love " :class="{'icon-love':isLiked}" @click="like"></span>
     <span class="like"> {{likeLen}}</span>

      <div class="rel iconfont icon-arrowdown pos">
        <ul class="oth-bths">
          <li @click="report">
            <span class="iconfont icon-warning pos"></span>举报
          </li>
          <li @click="collect">
            <span class="iconfont icon-shoucang pos" :class="{'icon-shoucang-filled':collected}"></span>收藏
          </li>
        </ul>
      </div>
      <div v-if="post.edited" class="edition-info">edited</div>
      <AppDate :timestamp="post.publishedAt"/>
    </div>
  </div>
</template>

<script>


import PostEditor from "./PostEditor";
import { mapActions } from "vuex";
export default {
  components: {
    PostEditor
  },
  props: {
    post: {//传入的post.likes 不会响应式的
    //必须在下面获取store itmes 中的值
      required: true,
      type: Object
    }
  },
  data() {
    return {
      editing: false,
      isLiked: false,
      collected: false,
      likeLen: 0
    };
  },
  beforeMount() {
    //TODO:喜爱功能
    if (this.$store.state.posts.items[this.post.id].likes)
      this.likeLen = Object.keys(this.$store.state.posts.items[this.post.id].likes).length ;
    if (!this.$store.state.posts.items[this.post.id].likes) {
      this.isLiked = false;
      return;
    }
    this.isLiked = this.$store.state.posts.items[this.post.id].likes[
      this.$store.state.auth.authId
    ]
      ? true
      : false;
  },
  computed: {
    // post_likes() {
    //   return this.$store.state.posts.items[this.post.id].likes;
    // },
    canEdit() {
      return this.user && this.user.id === this.$store.state.auth.authId;
    },
    user() {
      return this.$store.getters["users/usersWithId"].find(user => {
        return user.id === this.post.userId;
      });
    },
    userPostCount() {
      return this.$store.getters["users/userPostsCount"](this.post.userId);
    },
    userThreadCount() {
      return this.$store.getters["users/userThreadsCount"](this.post.userId);
    }
  },
  methods: {
    ...mapActions("posts", ["likePost"]),
    like() {
      this.isLiked = !this.isLiked;
      let payload = {
        like: this.isLiked,
        postId: this.post.id
      };
      this.likePost(payload).then(res => {
        console.log(
          res.like ? "add post 💌" + res.postId : "remove post 💌" + res.postId
        );
        this.likeLen = this.$store.state.posts.items[this.post.id]
          ? Object.keys(this.$store.state.posts.items[this.post.id].likes).length
          : 0;
      });
    },
    collect() {
      this.collected = !this.collected;
    },
    report() {}
  }
};
</script>

<style scoped>
.rel {
  @apply relative;
}
.pos {
  display: inline;
  @apply mr-4;
}
.oth-bths {
  min-width: 80px;
  height: 60px;
  text-align: left;
  top: 10px;
  left: 0;
  color: white;
  display: none;
  position: absolute;
  @apply shadow-2xl bg-blue-700 opacity-60 p-2;
}
.like{
  @apply pr-4;
}

.icon-arrowdown:hover {
  color: red;
}
.icon-arrowdown:hover .oth-bths {
  display: block;
}
.oth-bths li:hover {
  color: red;
}
</style>
