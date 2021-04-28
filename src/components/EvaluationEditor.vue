<template>
  <div>
       <h1>玩过</h1>
    <div class="info">
     <label for="game_time"> 游戏时长数:<input id="game_time" value="nuber" type="text" v-model="hours" /></label>
      <rate :length="5"  v-model="myRate"/>
    </div>
    <rich-text-editor ref="rte"/>
    <div class="end-bar"><span @click="post" class="post-btn">提交</span></div>
  </div>
</template>

<script>
import RichTextEditor from "./RichTextEditor.vue";
export default {
  components: { RichTextEditor },
  data() {
      return {
          hours: 0,
          myRate:0
      }
  },
  methods: {
      post() {
          this.$emit('closeModal',{hours:this.hours, star:this.myRate, content:this.rteContent});
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