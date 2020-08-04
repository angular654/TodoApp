<template>
  <div class="files">
    <div v-if="reg === true">
      <div class="loading" v-if="submitStatus === 'PENDING'">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <h1>Место для хранения файлов</h1>
      <div v-for="(file,idx) in files" :key="idx">
        <div class="card"> 
         <div class="card-image"><img class="card-image" :src="getImgUrl(file.name)" /></div>
          <br>
          <div class="card-title">{{file.name}}</div>
          <p>
            <a :href="getImgUrl(file.name)" download>Скачать</a>
          </p>
        </div>
      </div>
      </div>
      <div v-else>
        <h1>Страница недоступна</h1>
      </div>
    </div>
</template>

<script>
import axios from "axios";
import Config from "../Api-config";
export default {
  name: "FileStorage",
  data() {
    return {
      files: {},
      file: {},
      errors: "",
      user: Config.author,
      reg: Config.register,
      submitStatus: null
    };
  },
  async mounted() {
    this.submitStatus = "PENDING";
    await axios
      .get(Config.getBaseUrl() + "files")
      .then((response) => (this.files = response.data))
      .catch((error) => (this.errors = error));
      this.submitStatus = "OK";
  },
  methods: {
    getImgUrl(pic) {
      return require("../files/" + pic);
    },
    validateFile(filename) {
      if (filename.split(".").pop() == "png"||"jpg"||"JPEG"||"PNG") {
        return true
      } else {
        return false
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 2rem;
}
.files {
  padding-left: 40px;
  padding-right: 40px;
  align-items: center;
}
.card {
  height: 60%;
  width: 60%;
}
</style> 