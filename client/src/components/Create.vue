<template>
  <div id="block">
    <div v-if="reg !==  true">
      <h2>Страница создания заметок недоступна</h2>
    </div>
    <div v-else>
      <form @submit.prevent="submit">
        <h2>Создать заметку</h2>
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
          <button @click="speechWriter()">Сказать</button>
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
        <button type="submit" class="btn blue darken-4">Загрузить</button>
      </form>
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
      note: {
        title: "",
        content: "",
        time: null,
      },
      creator: sessionStorage.getItem("user"),
      reg: JSON.parse(sessionStorage.getItem("auth")),
      token: sessionStorage.getItem("token"),
      submitStatus: null,
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
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        await this.$http({
          url: Config.getBaseUrl() + "create" + "/" + this.token,
          method: "post",
          data: {
            title: this.note.title,
            content: this.note.content,
            author: this.creator,
            time: this.note.time,
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
    async onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file
      formData.append("author", this.creator);
      await this.$http
        .post(Config.getBaseUrl() + "upload" + "/" + this.token, formData)
        .then((res) => {
          this.$router.push("files");
        })
        .catch((err) => {
          console.log(err);
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
#block {
  padding-left: 40px;
  padding-right: 40px;
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