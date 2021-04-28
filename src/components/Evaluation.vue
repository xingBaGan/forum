<template>
  <div class="cl-card cl-item-bg-9 layout-2">
    <section class="outbox">
      <div class="tit">
        <div class="flex-item-1">
          <div class="flex-box flex-around">
            <a
              class="mr10"
              target="_blank"
              data-role="tip-window"
              data-target=".user-card"
              data-tpl="user-card-tpl-2"
              style="display: block"
              href="/people/valia"
              data-user-slug="valia"
            >
              <img
                class="avater"
                :src="user.avatar"
                lazy="loaded"
              />
            </a>
            <a
              class="red mr10"
              target="_blank"
              data-role="tip-window"
              data-target=".user-card"
              data-tpl="user-card-tpl-2"
              href="/people/valia"
              data-user-slug="valia"
              >{{user.name}}</a
            >评价
          </div>
          <div class="flex-box flex-align-items-center play-time">
            <span>玩过 5 小时</span>
            <span class="vm-star" style="margin-left: 20px">
              <i
                class="fa fa-star"
                v-for="(item, index) in evaluation.star"
                :key="index"
              ></i>
            </span>
          </div>
        </div>
        <div>
          <app-date :timestamp="evaluation.publishedAt" />
        </div>
      </div>
      <div class="flex-box flex-item-2">
        <div
          class="flex-wrap content-box inline-flex-box flex-direction-column"
        >
          <div class="desc sticky-box">
            <div class="tab-brief flex-box">
              <div class="tab-brief-text flex-item-1">
                {{ evaluation.text }}
                <span class="show-all-btn">显示全部</span>
              </div>
              <div
                class="tab-brief-img bg-img cl-vm-lazyload-img"
                lazy="loaded"
                style="
                  background-image: url('https://pic1.cdncl.net/user/valia/common_pic/ead7f087b2a10a54a099ca378ea758ab.jpg?imageView2/1/w/360/h/200');
                "
              ></div>
            </div>
            <div
              class="flex-box flex-align-items-center mt20 flex-align-self-end footer-info-box"
              data-sticky-column=""
            >
              <a class="vm-btn vm-btn-vote">
                <i class="icon cowicon cow-praise"></i>赞同
              </a>
              <div class="flex-item-1 flex-box flex-align-items-center btns">
                <div class="flex-box">
                  <a class="act ml white-5 pointer gl-hover-text-white"
                    >{{ likeNum }}人赞同</a
                  >
                  <a
                    class="ml white-5 pointer gl-hover-text-white ml10 act"
                    target="_blank"
                    href="/game/One_Hour_One_Life/review/3439996#comment-anchor"
                    >0条评论</a
                  >
                </div>
                <div class="flex-item-1 flex-box flex-direction-row-reverse">
                  <a
                    class="vm-btn-collection inline-flex-box gl-hover-text-white flex-align-items-center ml white5"
                    title="收藏"
                  >
                    <i class="cowicon cow-collection-add"></i>
                    <span class="ml5">收藏</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AppDate from "./AppDate";
import $api from "@/api";
export default {
  beforeMount() {
    $api.users.getUserById(this.evaluation.userId).on('value',(snapshot) => {
      this.user =snapshot.val()
    });
  },
  props: {
    evaluation: {
      type: Object,
    },
  },
  data() {
    return {
      user: {},
    };
  },
  components: {
    AppDate,
  },
  computed: {
    likeNum() {
      if (!this.evaluation.likes) return 0;
      return Object.keys(this.evaluation.likes).length;
    },
  },
};
</script>

<style scoped>
.avater{
  @apply rounded-full w-10 h-10 ;
}
.tab-brief-text {
  @apply mb-4;
}
.btns {
  flex: auto;
  justify-content: space-between;
  align-items: center;
  /* text-align: center; */
  @apply ml-2;
}
.vm-btn {
  border: 1px solid white;
  @apply py-1 px-2 hover:text-white hover:border-green-800;
}
.flex-box {
  @apply flex items-center;
}
.flex-around {
  @apply flex justify-around;
}
.cl-card {
  @apply bg-green-200 p-8;
}
.outbox {
  @apply flex flex-col;
}
.tit {
  @apply flex mb-4 justify-between;
}
.layout-2 {
  /* width: 60%; */
  @apply max-w-full lg:max-w-4xl;
}
.play-time {
  @apply mt-2;
}
.flex-box > .act {
  @apply ml-2;
}
</style>