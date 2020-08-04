<template>
  <div id="block">
    <h1>Место для хранения файлов</h1>
     <div v-for="(file,idx) in files" :key="idx">
       <img v-bind:src="'uploads/' + file.name">
       {{file.name}}
       <p><a v-bind:href="'uploads/' + file.name" download>Скачать</a></p>
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
      errors: ""
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