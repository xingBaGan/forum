<template>
  <span :title="timestamp|hummanFriendlyDate">{{timestamp|diffForHumans}}</span>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  props: {
    timestamp: {
      required: true,
      type: Number
    }
  },
  filters: {
    diffForHumans(date) {
      return moment.unix(date).fromNow();
    },
    hummanFriendlyDate(date) {
      return moment.unix(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  }
};
</script>

<style  scoped>
</style>
