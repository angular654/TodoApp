<template>
  <div id="block" class="notes">
    <div v-if="reg === true">
      <h1>Планы</h1>
      <div class="loading" v-if="submitStatus === 'PENDING'">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <p class="error" v-if="errors.length">{{errors}}</p>
      <div v-for="(todo,idx) in todos" :key="idx" >
        <div class="note"  v-if="todo.author == user">
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
            >{{todo.process}}</meter>
            <br />
            <b>{{todo.createdAt | formatDate}}</b>
          </div>
          <form id="delete_btn" @submit.prevent="submit">
            <input  hidden type="text"  v-bind:value="todo._id"  name="id" />
            <button id="btn" class="btn blue darken-4" type="submit" name="action">X</button>
          </form>
          <br />
        </div>
      </div>

    </div>
    <div v-else>
      <h1>Страница недоступна</h1>
      <img src="@/assets/wl4MD.png">
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
      reg: Config.register,
      user: Config.author
    };
  },
  async mounted() {
    this.submitStatus = "PENDING";
    await axios
      .get(Config.getBaseUrl())
      .then(response => (this.todos = response.data))
      .catch(error => (this.errors = error));
    this.submitStatus = "OK";
  },
  methods : {
    async submit() {
    console.log(this.id)
     console.log(
        await axios({
          url: Config.getBaseUrl()+'delete',
          method: "post",
          data: {
            id: this.id
          }
        })
      );
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
  padding-top: 0rem;
}
</style>
