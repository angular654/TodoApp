import axios from "axios"
export default {
    actions: {
        async fetchFiles(ctx) {
            await axios
                .get(`http://localhost:4000/api/todos/files/${sessionStorage.getItem("token")}`)
                .then((response) => (this.files = response.data))
                .catch((error) => (this.errors = error));
            ctx.commit('ubdateFiles', this.files)
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