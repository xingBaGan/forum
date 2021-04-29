<template>
  <div>
       <h1>玩过</h1>
    <div class="info">
     <label for="game_time"> 游戏时长数:<input id="game_time" value="0" type="number" v-model="hours_temp" /></label>
      <rate :length="5"  v-model="rate_temp"/>
    </div>
    <rich-text-editor ref="rte" :content="content"/>
    <div class="end-bar">
      <span @click="post" class="post-btn">{{!modiflag?"提交":"修改"}}</span>
    </div>
  </div>
</template>

<script>
import RichTextEditor from "./RichTextEditor.vue";
export default {
  components: { RichTextEditor },
  props: {
    modiflag:{type:Boolean},
    hours: {
      type: Number,
      default: 0
    },
    rate:{
      type: Number,
      default: 0
    },
    content:{
      type:String,
      default:this.rteContent
    }
  },
  data() {
    return {
      rate_temp: this.rate,
      hours_temp:this.hours
    }
  },
  methods: {
      post() {
          this.$emit('closeModal',{hours:this.hours_temp, star:this.rate_temp, content:this.rteContent});
      }
  },
  computed: {
      rteContent() {
          return this.$children[1].$refs.myQuillEditor.value
      }
  },
};
</script>

<style >
h1{
    @apply mt-2 ml-4;
}
.info{
    @apply flex justify-between  px-4;
}
.end-bar {
  height: auto;
  @apply flex justify-end;
}
.post-btn {
  margin-top: 2px;
  @apply py-1 px-2 bg-blue-700 text-white;
}
.ql-editor {
  height: 250px;
}
</style>
