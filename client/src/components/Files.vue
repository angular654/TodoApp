<template>
  <div class="files">
    <div v-if="reg === true">
      <div class="loading" v-if="submitStatus === 'PENDING'">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <h1>Место для хранения файлов</h1>
      <div class="input-field col s6">
        <i class="medium material-icons prefix">search</i>
        <input v-model="search" id="icon_prefix" type="text" class="validate" />
        <label for="icon_prefix">Найти</label>
      </div>
      <div v-if="filteredFiles(files).length">
        <div v-for="(file,idx) in filteredFiles(files)" :key="idx">
          <div class="note">
            <div class="card">
              <img src="@/assets/file.png" width="50" height="50" />
              <div class="card-title">{{file.name}}</div>
              <a :href="file.url" target="_blank" download>Открыть</a>
            </div>
            <input hidden type="text" :value="id = file._id" name="id" />
            <button @click="delete_file(file._id,file.name)">X</button>
          </div>
        </div>
      </div>
      <div v-else>
        <img src="@/assets/notFound.jpg" width="50" height="50" />
        <h6>Ничего не найдено</h6>
      </div>
    </div>
    <div v-else>
      <h1>Страница недоступна</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Config from "../Api-config";
export default {
  name: "FileStorage",
  data() {
    return {
      reg: JSON.parse(sessionStorage.getItem('auth')),
      submitStatus: null,
      id: "",
      filename: "",
      search: "",
      files: []
    };
  },
  async mounted() {
    this.submitStatus = "PENDING";
    await this.getFiles()
    this.submitStatus = "OK";
  },
  methods: {
    async delete_file(id, filename) {
      this.$http({
        url: Config.getBaseUrl() + "deletefile",
        method: "post",
        data: {
          name: filename,
          id: id
        }
      });
      await this.getFiles()
    },
    filteredFiles(files) {
      const s = this.search.toLowerCase();
      return files.filter(n => {
        return Object.values(n).some(m =>
          m
            .toString()
            .toLowerCase()
            .includes(s)
        );
      });
    },
    async getFiles(){
       this.submitStatus = "PENDING";
      this.$http.get(
        `http://localhost:4000/api/todos/files/` + sessionStorage.getItem("user") + '/' + sessionStorage.getItem("token")
      )
      .then(response => (this.files = response.data))
      .catch(error => (this.errors = error));
    this.submitStatus = "OK";
    }
  }
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
a {
  padding-left: 0.4rem;
}
.card-title {
  padding-left: 1.3rem;
}
#icon_prefix {
  width: auto;
}
</style> 