<template>
  <div class="files">
    <div v-if="reg === true">
      <div class="loading" v-if="submitStatus === 'PENDING'">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <h1>Место для хранения файлов({{filesCount}})</h1>
      <div v-for="(file,idx) in allFiles" :key="idx">
          <div class="card">
            <div class="card-image">
            </div>
            <br />
            <div class="card-title">{{file.name}}</div>
          </div>
          <input hidden type="text" :value="id = file._id" name="id" />
          <button @click="delete_file(file._id,file.name)">X</button>
        </div>
    </div>
    <div v-else>
      <h1>Страница недоступна</h1>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Config from "../Api-config";
export default {
  name: "FileStorage",
  data() {
    return {
      user: Config.author,
      reg: Config.register,
      submitStatus: null,
      id: "",
      filename: "",
    };
  },
  computed: mapGetters(["allFiles", "filesCount"]),
  async mounted() {
    this.submitStatus = "PENDING";
    await this.$store.dispatch("fetchFiles");
    this.submitStatus = "OK";
  },
  methods: {
    async delete_file(id, filename) {
      await axios({
        url: Config.getBaseUrl() + "deletefile",
        method: "post",
        data: {
          name: filename,
          id: id,
        },
      });
      this.$store.dispatch("fetchFiles");
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