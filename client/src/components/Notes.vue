<template>
  <div id="block">
    <div v-if="reg === false">
      <div class="loading" v-if="submitStatus === 'PENDING'">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <h1>Планы</h1>
      <div class="input-field col s6">
        <i class="material-icons prefix" id="icon">search</i>
        <input v-model="search" id="icon_prefix" type="text" class="validate" />
        <label for="icon_prefix">Найти</label>
      </div>
      <div v-if="filteredNotes(notes).length">
        <div v-for="(note,idx) in filteredNotes(notes)" :key="idx" class="notes">
          <div class="note" v-if="note.author == user">
            <div class="card">
              <button id="delete_btn" @click="delete_note(note._id)">X</button>
              <h4 id="author">{{note.title}}</h4>
              <h6 id="author">Автор: {{note.author}}</h6>
              <div class="card-content">{{note.content}}</div>
              <span id="time">{{note.completeTime}} мин</span>
              <br />
              <span id="process">{{note.process}}%</span>
              <br />
              <meter id="bar" min="0" low="50" max="100" optimum="80" v-bind:value="note.process"></meter>
              <br />
              <input type="range" v-model="note.process" name="id" />
              <button
                class="btn blue darken-4"
                @click="comlete_note(note._id,note.process)"
              >Сохранить</button>
              <input hidden type="text" v-bind:value="note._id" name="id" />
              <br />
              <b>{{note.createdAt | formatDate}}</b>
            </div>
            <br />
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
import Config from "../Api-config";
export default {
  name: "Notes",
  data() {
    return {
      reg: Config.register,
      user: Config.author,
      submitStatus: null,
      progress: 0,
      search: "",
      notes: []
    };
  },
  async mounted() {
    this.submitStatus = "PENDING";
    await this.getNotes()
  },
  methods: {
    async delete_note(id) {
      await this.$http({
        url: Config.getBaseUrl() + "delete",
        method: "post",
        data: {
          id: id
        }
      });
    },
    async comlete_note(id, progress) {
      await this.$http({
        url: Config.getBaseUrl() + "complete",
        method: "post",
        data: {
          id: id,
          process: progress
        }
      });
    },
    filteredNotes(todos) {
      const s = this.search.toLowerCase();
      return todos.filter(n => {
        return Object.values(n).some(m =>
          m
            .toString()
            .toLowerCase()
            .includes(s)
        );
      });
    },
    async getNotes(){
       this.submitStatus = "PENDING";
      this.$http.get(
        `http://localhost:4000/api/todos/${this.$route.params.name}/${this.$route.params.id}`,
      )
      .then(response => (this.notes = response.data))
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
#block {
  padding-left: 40px;
  padding-right: 40px;
}
.error {
  color: rgb(199, 15, 15);
  font-weight: bold;
}
.ok {
  font-weight: bold;
  color: rgb(63, 63, 173);
}
.loading {
  font-weight: bold;
  color: rgb(87, 179, 148);
}
#bar {
  height: 2rem;
  width: 10rem;
}
.note {
  padding-left: 1rem;
}
#author {
  padding-left: 1rem;
}
#btn {
  width: 3rem;
}
#time {
  color: rgb(133, 128, 128);
  padding-left: 1rem;
}
#process {
  padding-left: 0.5rem;
}
#delete_btn {
  color: white;
  background-color: blue;
}
#Count {
  padding-right: 50%;
  padding-left: 50%;
}
.notes {
  float: left;
  align-items: center;
}
#icon_prefix {
  width: auto;
}
</style>
