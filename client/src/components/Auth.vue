<template>
  <div id="block">
    <div v-if="reg !== true">
      <form @submit.prevent="submit">
        <h2 id="file-text">Регистрация</h2>
        <label for="name">Name</label>
        <input type="text" v-model="name" required />
        <span v-if="msg.name">{{msg.name}}</span>
        <br />
        <label for="email">Email</label>
        <input type="text" v-model="email" required />
        <br />
        <span v-if="msg.email">{{msg.email}}</span>
        <br />
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
        <br />
        <span v-if="msg.password">{{msg.password}}</span>
        <br />
        <button class="btn blue darken-4" type="submit" name="action">Зарегистрироваться</button>
        <p class="ok" v-if="submitStatus === 'OK'">Готово!</p>
        <p class="loading" v-if="submitStatus === 'PENDING'">Регистрация...</p>
      </form>
    </div>
    <div v-else>
      <h2>Вы уже вошли в ToDoApp</h2>
    </div>
  </div>
</template>

<script>
import { stringify } from "querystring";
import Config from "../Api-config";
export default {
  name: "Auth",
  data() {
    return {
      name: "",
      password: "",
      email: "",
      msg: [],
      submitStatus: null,
      reg: JSON.parse(localStorage.getItem("auth")),
      token: "",
    };
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
    name(value) {
      this.name = value;
      this.validateName(value);
    },
  },
  methods: {
    validateEmail(value) {
      if (
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        this.msg["email"] = "";
      } else {
        this.msg["email"] = "Неверный Email";
      }
    },
    validatePassword(value) {
      let difference = 10 - value.length;
      if (value.length < 8) {
        this.msg["password"] =
          "Длина  пароля должна быть минимум 10 символов! " +
          `осалось символов : ${difference}`;
      } else {
        this.msg["password"] = "";
      }
    },
    validateName(value) {
      let difference = 5 - value.length;
      if (value.length < 5) {
        this.msg["name"] =
          "Длина  логина  должна быть минимум 5 символов! " +
          `осалось символов : ${difference}`;
      } else {
        this.msg["name"] = "";
      }
    },
    async submit() {
      this.submitStatus = "PENDING";
      await this.$http
        .post(Config.auth_api + "reg", {
          username: this.name,
          password: this.password,
          email: this.email,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", this.name);
          localStorage.setItem("auth", response.data.auth);
          this.$router.push(`/`);
        });
      this.submitStatus = "OK";
      this.reg = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2,
h1 {
  font-size: 2rem;
}
span {
  color: rgb(199, 15, 15);
  font-weight: bold;
}
.ok {
  font-weight: bold;
  color: rgb(63, 63, 173);
}
.loading {
  font-weight: bold;
  color: rgb(87, 179, 148);
}
</style>