<template>
  <div>
   <!-- @setMonth="getCheckInData" -->
    <vue-checkin  ref="checkCalendar" :checkin="checkInData" @checkIn="checkIn"  class="check"></vue-checkin>
  </div>
</template>

<script>
import moment from "moment";
import $api from "@/api";
// moment.locale("zh-cn");
export default {
  props: {
    userId: {
      type: String,
    }
  },
  data() {
    return {
      checkInData: [
        // {
        //   time: "2021-05-06 08:52", //日期可以直接用2018/01/12 08:52这种正规格式，避免ios解析【-】分割的出问题
        //   amount: 3 //所得金币
        // },
        // {
        //   time: "2021-05-04 08:52",
        //   amount: 10
        // }
      ],
      task:{}
    };
  },
  methods: {
    checkIn() {
       this.$emit('check-out')
        this.checkInData.push({
          time:this.todayTime, //日期可以直接用2018/01/12 08:52这种正规格式，避免ios解析【-】分割的出问题
          amount: 3 //所得金币
        })
        this.checkInData.forEach(item=>{
          this.task.points += item.amount
        })
        $api.tasks.checkIn(this.task).then(()=>{
            console.log("跟新")
        })
    }
  },
  computed: {
    todayTime() {
      return moment(Date.now()).format("YYYY-MM-DD HH:mm");
    },
    hasChecked(){
      return this.$refs.checkCalendar.hasCheckin
    }
  },
  created(){
    $api.tasks.getTaskByUserId(this.userId).then(res=>{
      this.task = res.data[0]
     this.checkInData = res.data[0].checkInData
    })
  }
};
</script>

<style scoped>
.check{
  width: 400px;
  @apply bg-white;
}
th{
  height:70px;
}
</style>
