<template>
  <div id="block">
    <div v-if="reg === true">
    <h1>Место для хранения файлов</h1>
     <div v-for="(file,idx) in files" :key="idx" >
     <div class="card" v-if="file.author == user">
       <img v-bind:src="'uploads/' + file.name">
       {{file.name}}
       <p><a v-bind:href="file.name" download>Скачать</a></p>
      </div>
     </div>
    </div>
    <div v-else>
     <img src="@/assets/wl4MD.png">
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Config from "../Api-config";
export default {
  name: "FileStorage",
  data() {
    return {
      files: {},
      file: {},
      errors: "",
      user: Config.author,
      reg: Config.register
    };
  },
  async mounted() {
    await axios
      .get(Config.getBaseUrl()+"files")
      .then(response => (this.files = response.data))
      .catch(error => (this.errors = error));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 2rem;
}
#block {
  padding-left: 40px;
  padding-right: 40px;
}
</style> 