<template>
  <div>
    <div class="main">
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
    <div class="evaluations-list">
      <div class="vm-edit-card-review cl-card cl-item-bg-9 layout-2">
        <section class="flex-box flex-direction-column h100">
          <div class="tit mb10 flex-box">
            <div class="flex-item-1">
              <div class="flex-box">
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
                    class="vm-img-lazy circle wh20 cl-vm-lazyload-img"
                    src="https://pic1.cdncl.net/user/valia/common_pic/bc2a378d9565363a08c30fae63c5378a.png?imageView2/1/w/120/h/120"
                    lazy="loaded"
                  >
                </a>
                <a
                  class="red mr10"
                  target="_blank"
                  data-role="tip-window"
                  data-target=".user-card"
                  data-tpl="user-card-tpl-2"
                  href="/people/valia"
                  data-user-slug="valia"
                >Valia</a>评价
              </div>
              <div class="flex-box flex-align-items-center">
                <span>玩过 5 小时</span>
                <span class="vm-star">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </span>
              </div>
            </div>
            <div>
              <a
                class="action-time pointer gl-hover-text"
                target="_blank"
                data-role="tips-time-human"
                href="/game/One_Hour_One_Life/review/3439996"
                data-tips-content-publish="2018-12-13 14:35:59"
                data-tips-content-update="2018-12-13 14:41:06"
                data-tips-layer-index="20"
              >2018-12-13</a>
            </div>
          </div>
          <div class="flex-box flex-item-2">
            <div class="flex-wrap content-box inline-flex-box flex-direction-column">
              <div class="desc sticky-box">
                <div class="tab-brief flex-box">
                  <div
                    class="tab-brief-text flex-item-1"
                  >这游戏说是生存游戏不如说是大型戏精聊天室。而且是特别政治不正确的那种。但他真的让人意识到人生很短暂，我们来到这世上，忙忙碌碌一辈子就过去了，来不及做一些伟大的事情，甚至来不及与亲友真挚地道别。 我到了16岁，突然长出了胸，才意识到我是个女生...我当即在小镇中心呐喊“wow, ...
                    <span class="show-all-btn">显示全部</span>
                  </div>
                  <div
                    class="tab-brief-img bg-img cl-vm-lazyload-img"
                    lazy="loaded"
                    style="background-image: url(&quot;https://pic1.cdncl.net/user/valia/common_pic/ead7f087b2a10a54a099ca378ea758ab.jpg?imageView2/1/w/360/h/200&quot;);"
                  ></div>
                </div>
                <div
                  class="flex-box flex-align-items-center mt20 flex-align-self-end footer-info-box"
                  data-sticky-column=""
                >
                  <a class="vm-btn vm-btn-vote">
                    <i class="icon cowicon cow-praise"></i>赞同
                  </a>
                  <div class="flex-item-1 flex-box flex-align-items-center">
                    <div class="flex-box">
                      <a class="ml white-5 pointer gl-hover-text-white">4人赞同</a>
                      <a
                        class="ml white-5 pointer gl-hover-text-white ml10"
                        target="_blank"
                        href="/game/One_Hour_One_Life/review/3439996#comment-anchor"
                      >0条评论</a>
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
    </div>
  </div>
</template>

<script>
import $api from "../api";
import asyncDataStatus from "@/mixins/asyncDataStatus";

import game from "../api/game";
export default {
  mixins: [asyncDataStatus],
  components: {},
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
.desc {
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  @apply text-base;
}
.main {
  background-color: #263959;
  max-width: 75vw;
  @apply rounded mx-auto h-full bg-blue-300 px-4  bg-opacity-90 flex justify-between mt-8 max-w-full lg:max-w-4xl;
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
