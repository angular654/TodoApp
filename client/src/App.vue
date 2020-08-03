<template>
  <div id="App">
    <nav class="blue darken-4">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo" id="title">ToDoApp</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <router-link to="/signin">Sign In</router-link>
          </li>
          <li>
            <router-link to="/auth">Sign Up</router-link>
          </li>
          <li>
            <router-link to="/create">
              <i class="large material-icons">+</i>
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
export default {
  name: "App"
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
