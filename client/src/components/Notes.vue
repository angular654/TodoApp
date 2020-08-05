<template>
  <div id="block" class="notes">
    <div v-if="reg === true">
      <div v-if="todos.length">
      <h1>Планы</h1>
      <div class="loading" v-if="submitStatus === 'PENDING'">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <div v-for="(todo,idx) in todos" :key="idx">
        <div class="note" v-if="todo.author == user">
          <form @submit.prevent="complete_note">
            <div class="card">
              <h4>{{todo.title}}</h4>
              <h6 id="author">Автор: {{todo.author}}</h6>
              <div class="card-content">{{todo.content}}</div>
              <span id="time">{{todo.completeTime}} мин</span>
              <br />
              <span id="process">{{todo.process}}%</span>
              <br />
              <meter
                id="bar"
                min="0"
                low="50"
                high="100"
                max="100"
                optimum="80"
                v-bind:value="todo.process"
              ></meter>
              <br />
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                v-model.number="progress"
               
              />
              <input hidden type="text" :value="id = todo._id" name="id" />
              <button class="btn blue darken-4" type="submit">Сохранить</button>
              <br />
              <b>{{todo.createdAt | formatDate}}</b>
            </div>
          </form>
          <form id="delete_btn" @submit.prevent="delete_note">
            <button id="btn" class="btn blue darken-4" type="submit" name="action">X</button>
          </form>
          <br />
        </div>
      </div>
      </div>
      <div v-else>
      <h1>Тут пусто</h1>
    </div>
    </div>
    <div v-else>
      <h1>Страница недоступна</h1>
      <img src="@/assets/wl4MD.png" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Config from "../Api-config";
export default {
  name: "Notes",
  data() {
    return {
      todos: {},
      note: {},
      errors: "",
      submitStatus: null,
      id: "",
      progress: 0,
      reg: Config.register,
      user: Config.author,
    };
  },
  async mounted() {
    this.submitStatus = "PENDING";
    await this.get_note();
    this.submitStatus = "OK";
  },
  methods: {
    async delete_note() {
      await axios({
        url: Config.getBaseUrl() + "delete",
        method: "post",
        data: {
          id: this.id,
        },
      });
      await this.get_note();
    },
    async get_note() {
      await axios
        .get(Config.getBaseUrl())
        .then((response) => (this.todos = response.data))
        .catch((error) => (this.errors = error));
    },
    async complete_note() {
      await axios({
        url: Config.getBaseUrl() + "complete",
        method: "post",
        data: {
          id: this.id,
          process: this.progress
        },
      });
      await this.get_note();
    },
  },
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
  padding-top: 0rem;
}
</style>
