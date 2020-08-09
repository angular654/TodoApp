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
    <router-view></router-view>
  </div>
</template>

<script>
import M from "materialize-css";
export default {
  name: "App",
  async mounted() {
    await M.AutoInit();
  },
};
</script>

<style>
#title {
  padding-left: 2rem;
}
input {
  width: auto;
}
</style>
