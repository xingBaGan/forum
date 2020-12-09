<template>
  <div class="col-full" :class="$style.centered">
    <h1 :class="$style.headingLarge">Not Found</h1>
    <p :class="$style.textLarge">Oooops, we could't find what you are looking for,why don't you
      <router-link to="/">go Home Instead</router-link>
    </p>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$emit("ready");
  }
};
</script>

<style  module>
.headingLarge {
  font-size: 100px;
}
.textLarge {
  font-size: 50px;
}
.centered {
  text-align: center;
}
</style>
