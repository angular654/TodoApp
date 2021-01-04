<template>
  <div class="files">
    <div v-if="reg === true">
      <div class="loading" v-if="submitStatus === 'PENDING'">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <h1>Файлы({{filteredFiles(allFiles).length}})</h1>
      <div class="input-field col s6">
        <i class="medium material-icons prefix">search</i>
        <input v-model="search" id="icon_prefix" type="text" class="validate" />
        <label for="icon_prefix">Найти</label>
      </div>
      <div v-if="filteredFiles(allFiles).length">
        <div v-for="(file,idx) in filteredFiles(allFiles)" :key="idx">
          <div class="note">
            <a class="btn btn-small waves-effect waves-light blue darken-4" v-on:click="delete_file(idx,file.name,file._id)"><i class="material-icons">delete</i></a>
            <div class="card ">
              <img src="@/assets/file.png" width="50" height="50" />
              <div class="card-title">{{file.name}}</div>
              <b>{{ file.createdAt | formatDate }}</b>
              <br>
              <a :href="file.url" target="_blank" download>Открыть</a>
            </div> 
            <input hidden type="text" :value="id = file._id" name="id" />
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
      user: sessionStorage.getItem("user"),
      reg: JSON.parse(sessionStorage.getItem("auth")),
      submitStatus: null,
      id: "",
      filename: "",
      search: "",
      token: sessionStorage.getItem("token"),
    };
  },
  computed: mapGetters(["allFiles"]),
  async mounted() {
    this.submitStatus = "PENDING";
    await this.$store.dispatch("fetchFiles");
    this.submitStatus = "OK";
  },
  methods: {
   delete_file(id, filename,_id) {
     this.$store.commit('REMOVE_FILE',this.$store.dispatch("fetchNotes"),id)
      this.$http({
        url: Config.files_api + this.token + "/delete",
        method: "delete",
        data: {
          name: filename,
          id: _id,
        },
      });
      this.$store.dispatch("fetchFiles");
    },
    filteredFiles(files) {
      const s = this.search.toLowerCase();
      return files.filter((n) => {
        return Object.values(n).some((m) =>
          m.toString().toLowerCase().includes(s)
        );
      });
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
a {
  padding-left: 0.4rem;
}
.card-title,b {
  padding-left: 1.3rem;
}
#icon_prefix {
  width: auto;
}
#delete {
  background-color: rgb(13, 16, 231);
  color: #ffffff;
  cursor: pointer;
}
</style> 