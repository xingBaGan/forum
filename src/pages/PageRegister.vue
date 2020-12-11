<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="register" class="card card-form">
        <h1 class="text-center">Register</h1>
        <div class="form-group">
          <label for="name">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            class="form-input"
            @blur="$v.form.name.$touch()"
          >
          <template v-if="$v.form.name.$error">
            <span v-if="!$v.form.name.required" class="form-error">This field is required</span>
          </template>
        </div>
        <div class="form-group">
          <label for="username">UserName</label>
          <input
            v-model.lazy="form.username"
            type="text"
            id="username"
            class="form-input"
            @blur="$v.form.username.$touch()"
          >
          <template v-if="$v.form.username.$error">
            <span v-if="!$v.form.username.required" class="form-error">This field is required</span>
            <span v-if="!$v.form.username.unique" class="form-error">Sorry! This username is taken</span>
          </template>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model.lazy="form.email"
            type="email"
            id="email"
            class="form-input"
            @blur="$v.form.email.$touch()"
          >
          <template v-if="$v.form.email.$error">
            <span v-if="!$v.form.email.required" class="form-error">This field is required</span>
            <span
              v-if="!$v.form.email.email"
              class="form-error"
            >please input the correct email format</span>
            <span v-if="!$v.form.email.unique" class="form-error">Sorry! This email is taken</span>
          </template>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="form-input"
            @blur="$v.form.password.$touch()"
          >
          <template v-if="$v.form.password.$error">
            <span v-if="!$v.form.password.required" class="form-error">This field is required</span>
            <span
              v-if="!$v.form.password.minLength"
              class="form-error"
            >The password must be at least 6 characters long</span>
          </template>
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
import { required, email, minLength } from "vuelidate/lib/validators";
import { uniqueUserName, uniqueEmail } from "@/utils/validators";

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
  validations: {
    form: {
      name: {
        required
      },
      username: {
        required,
        unique: uniqueUserName
      },
      email: {
        required,
        email,
        unique: uniqueEmail
      },
      password: {
        required,
        minLength: minLength(6)
      },
      avatar: {
        required
      }
    }
  },
  methods: {
    register() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      this.$store
        .dispatch("auth/registerUserWithEmailAndPassword", this.form)
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
