<template>
  <div id="App">
    <nav class="blue darken-4">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo" id="title">ToDoApp</router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
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
     <footer class="blue darken-4">
          <hr>
          <div class="footer-copyright">
            <div class="white-text">
              © 2020 Copyright Text <a href="https://github.com/angular654"><img src="@/assets/githublogo.png" width="23" height="23"></a>
            </div>
          </div>
        </footer>
  </div>
</template>

<script>
import M from "materialize-css";
export default {
  name: "App",
 mounted() {
     M.AutoInit();
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
    left: 0; bottom: 0; 
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
</style>
