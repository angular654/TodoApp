<template>
  <div id="App">
    <nav class="blue darken-4">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo" id="title"><router-link to="/info"><i class="material-icons">info_outline</i></router-link>ToDoApp</router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link to="/signin">Вход<i class="large material-icons">person_outline</i></router-link>
          </li>
          <li>
            <router-link to="/auth">Регистрация<i class="large material-icons">person_add</i></router-link>
          </li>
          <li>
            <router-link to="/create">
              <i class="large material-icons">add_box</i>
            </router-link>
          </li>
          <li>
            <router-link to="/files">Файлы <i class="large material-icons">insert_drive_file</i></router-link>
          </li>
        </ul>
        <ul class="sidenav" id="mobile-demo">
          <li>
            <router-link to="/signin">Sign In</router-link>
          </li>
          <li>
            <router-link to="/auth">Sign Up</router-link>
          </li>
          <li>
            <router-link to="/create">
              <i class="large material-icons">add_box</i>
            </router-link>
          </li>
          <li>
            <router-link to="/files">Files</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <main>
      <router-view></router-view>
    </main>
    <br>
    <br>
    <footer class="blue darken-4">
      <hr />
      <div class="footer-copyright">
        <div class="white-text">
          <a class="waves-effect waves-blue" v-on:click="scrollToTop()" id="toMenu"><i class=" small material-icons">arrow_drop_up</i></a>
          © 2020 by Vladimir Ivahnenko
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import M from "materialize-css";
export default {
  name: "App",
  myhistory: [],
  mounted() {
    M.AutoInit();
  },
  methods : {
    back() {
      window.history.length > 2 ? this.$router.go(-1): false 
    },
     scrollToTop() {
                window.scrollTo(0,0);
     }
  }
};
</script>

<style>
#title {
  padding-left: 2rem;
}
input {
  width: auto;
}
footer {
  color: blue;
  position: fixed; /* Фиксированное положение */
  left: 0;
  bottom: 0;
  width: 100%;
}
img {
  margin-left: 0.3rem;
}
main {
  overflow: auto;
}
@media screen and (max-width: 800px) {
  #title {
    padding-left: 0rem;
  }
}
#block {
  padding-left: 40px;
  padding-right: 40px;
}
#back {
  color: #0D47A1;
}
.nav-wrapper {
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}
#toMenu {
  padding-left: 25%;
  color: rgb(255, 255, 255);
}
</style>
