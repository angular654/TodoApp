<template>
  <div id="block">
    <div v-if="reg !==  true">
      <h3>Страница создания заметок недоступна</h3>
    </div>
    <div v-else>
      <form @submit.prevent="submit">
        <h5>Создать заметку</h5>
        <div class="input-field">
          <input
            type="text"
            v-model.trim="$v.note.title.$model"
            name="title"
            placeholder="Заголовок"
            required
          />
        </div>
        <div
          class="error"
          v-if="!$v.note.title.minLength"
        >Длина заголовока должна быть не меньше {{$v.note.title.$params.minLength.min}}</div>
        <div>
          <textarea
            name="content"
            v-model.trim="$v.note.content.$model"
            placeholder="Содержание"
            class="materialize-textarea"
            required
          ></textarea>
          <a v-on:click="speechWriter()"><i class="small material-icons">keyboard_voice</i></a>
        </div>
        <div
          class="error"
          v-if="!$v.note.content.minLength"
        >Длина контента должна быть не меньше {{$v.note.content.$params.minLength.min}}</div>
        <div
          class="error"
          v-if="!$v.note.content.maxLength"
        >Длина контента должна быть не больше {{$v.note.content.$params.maxLength.max}}</div>
        <div class="input-field">
          <input
            type="number"
            v-model.trim="$v.note.time.$model"
            name="time"
            placeholder="Время выполнения"
            required
          />
        </div>
        <div
          class="error"
          v-if="!$v.note.time.between"
        >Неверное время{{$v.note.time.$params.beetwen}}</div>
        <button
          class="btn blue darken-4"
          type="submit"
          :disabled="submitStatus === 'PENDING'"
        >Создать</button>
        <p class="ok" v-if="submitStatus === 'OK'">Готово!</p>
        <p class="error" v-if="submitStatus === 'ERROR'">Форма заполнена неверно</p>
        <p class="loading" v-if="submitStatus === 'PENDING'">Загрузка...</p>
      </form>
      <form @submit.prevent="onUploadFile">
        <div class="file-field input-field">
          <div class="btn blue darken-4">
            <span>File</span>
            <input type="file" name="file" ref="file" @change="onFileChange" required />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
        <button type="submit" class="btn blue darken-4" :disabled="fileSubmitStatus === 'PENDING'">Загрузить</button>
      </form>
      <div v-if="fileSubmitStatus === 'PENDING'">
        <div class="progress">
        <div class="determinate" id="file-progress" :style="{ width: uploadPercentage + '%' }"></div>
        </div>
        {{uploadPercentage}}/100
      </div>
      <p class="ok" v-if="fileSubmitStatus === 'OK'">{{file_response.data}}</p>
      <p class="error" v-if="fileSubmitStatus === 'ERROR'">{{file_response.data}}</p>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  between,
  maxLength,
} from "vuelidate/lib/validators";
import axios from "axios";
import Config from "../Api-config";
export default {
  name: "Create",
  data() {
    return {
      selectedFile: "",
      uploadPercentage: 0,
      note: {
        title: "",
        content: "",
        time: null
      },
      creator: localStorage.getItem("user"),
      reg: JSON.parse(localStorage.getItem("auth")),
      token: localStorage.getItem("token"),
      submitStatus: null,
      file_response: "",
      fileSubmitStatus:null
    };
  },
  validations: {
    note: {
      title: { minLength: minLength(4) },
      content: { maxLength: maxLength(600), minLength: minLength(5) },
      time: { between: between(1, 59) },
    },
  },
  methods: {
    async submit() {
      this.$v.note.$touch();
      this.$store.commit('CREATE_NOTE',this.$store.dispatch("fetchNotes"),this.$v.note)
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        await this.$http({
          url: Config.todos_api + this.token + "/create",
          method: "post",
          data: {
            title: this.note.title,
            content: this.note.content,
            author: this.creator,
            time: this.note.time,
            author_id: localStorage.getItem("user_id"),
            createdAt: Date.now(),
          },
        });
        this.submitStatus = "OK";
        this.note = {};
        this.$router.push("/");
      }
    },
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file
      formData.append("author", this.creator);
      formData.append("author_id", localStorage.getItem("user_id"))
      this.fileSubmitStatus = "PENDING"
      this.$http
        .post(Config.files_api + this.token + "/" + "upload", formData,
        {
      headers: {
          'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function( progressEvent ) {
        this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ))
      }.bind(this)
    }
        )
        .then((res) => {
          this.fileSubmitStatus = "OK"
          this.file_response = res
        })
        .catch((err) => {
         this.submitStatus = "ERROR";
         this.file_response = err
        });
    },
    speechWriter() {
      var speechRecognition = new webkitSpeechRecognition();
      speechRecognition.lang = "ru-RU";
      speechRecognition.interimResults = false;
      speechRecognition.maxAlternatives = 1;
      speechRecognition.onresult = (event) => {
        const last = event.results.length - 1;
        this.note.content += event.results[last][0].transcript;
      };
      speechRecognition.start();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h2 {
  font-size: 2rem;
}
.ok {
  font-weight: bold;
  color: rgb(78, 78, 214);
}
.error {
  font-weight: bold;
  color: rgb(182, 17, 50);
}
.loading {
  font-weight: bold;
  color: rgb(87, 179, 148);
}
</style>