<template>
  <h4>Заметка</h4>
</template>

<script>
import axios from "axios";
import Config from "../Api-config";
export default {
  data() {
    return {
      reg: Config.register,
      user: Config.author,
      note: {},
      errors: ""
    };
  },
  methods: {
    async complete_note() {
      await axios({
        url: Config.getBaseUrl() + "complete",
        method: "post",
        data: {
          id: this.id,
          process: this.progress,
        },
      });
      await this.get_note();
    },
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
  },
};
</script>

<style>
</style>