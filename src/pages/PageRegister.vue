<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="register" class="card card-form">
        <h1 class="text-center">Register</h1>
        <div class="form-group">
          <label for="name">Full Name</label>
          <input v-model="form.name" type="text" id="name" class="form-input">
        </div>
        <div class="form-group">
          <label for="username">UserName</label>
          <input v-model="form.username" type="text" id="username" class="form-input">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" class="form-input">
        </div>
        <div class="form-group">
          <label for="email">Password</label>
          <input v-model="form.password" type="password" id="password" class="form-input">
        </div>
        <!-- <div class="form-group">
          <label for="avatar">Avatar</label>
          <input v-model="form.avatar" type="text" id="avatar" class="form-input">
        </div>-->
        <div class="form-actions">
          <button class="btn-blue btn-block" type="submit">Register</button>
        </div>
      </form>
      <div class="text-center push-top">
        <button @click="registerWithGoogle" class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        username: "",
        email: "",
        password: "",
        avatar:
          "https://picgo-1300491698.cos.ap-nanjing.myqcloud.com/20201105234618_36638.jpeg"
      }
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("registerUserWithEmailAndPassword", this.form)
        .then(() => this.$router.push("/"));
    },
    registerWithGoogle() {
      //   console.log(this.form);
      //   this.$store
      //     .dispatch("createUser", this.form)
      //     .then(() => this.$router.push("/"));
    }
  },
  created() {
    this.$emit("ready");
  }
};
</script>

<style  scoped>
</style>
