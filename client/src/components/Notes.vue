<template>
  <div id="block" class="notes">
    <div v-if="reg === true">
      <h1>Планы</h1>
      <div class="loading" v-if="submitStatus === 'PENDING'">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <div v-for="(note,idx) in allNotes" :key="idx">
        <div class="note" v-if="note.author == user">
            <div class="card">
              <h4>{{note.title}}</h4>
              <h6 id="author">Автор: {{note.author}}</h6>
              <div class="card-content">{{note.content}}</div>
              <span id="time">{{note.completeTime}} мин</span>
              <br />
              <span id="process">{{note.process}}%</span>
              <br />
              <meter
                id="bar"
                min="0"
                low="50"
                high="100"
                max="100"
                optimum="80"
                v-bind:value="note.process"
              ></meter>
              <br />
              <input hidden  type="text"  v-bind:value=" id =note._id" name="id" />
              <button class="btn blue darken-4">Редактировать</button>
              <br />
              <b>{{note.createdAt | formatDate}}</b>
            </div>
          <br />
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Страница недоступна</h1>
      <img src="@/assets/wl4MD.png" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import Config from "../Api-config";
export default {
  name: "Notes",
  data() {
    return {
      reg: Config.register,
      user: Config.author,
      submitStatus: null
    };
  },
  computed: mapGetters(['allNotes']),
  async mounted(){
    this.submitStatus = "PENDING";
    this.$store.dispatch('fetchNotes');
    this.submitStatus = "OK";
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
