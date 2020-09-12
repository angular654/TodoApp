import axios from "axios"
export default {
    actions: {
        async fetchFiles(ctx) {
            if (JSON.parse(sessionStorage.getItem("auth")) === true) {
                await axios
                    .get(`http://localhost:4000/api/${sessionStorage.getItem("token")}/files`)
                    .then((response) => (this.files = response.data))
                    .catch((error) => (this.errors = error));
                ctx.commit('ubdateFiles', this.files)
            }
            return false
        }
    },
    mutations: {
        ubdateFiles(state, files) {
            state.files = files
        }
    },
    state: {
        files: []
    },
    getters: {
        allFiles(state) {
            return state.files
        }
    }
}