import axios from "axios"
export default {
    actions: {
        async fetchFiles(ctx) {
            if (JSON.parse(localStorage.getItem("auth")) === true) {
                await axios
                    .get(`https://safe-thicket-79673.herokuapp.com/files/${localStorage.getItem("token")}/get`,{
                        author_id: localStorage.getItem("user_id")
                    })
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
        },
        REMOVE_FILE (state, id) {
            state.files.splice(id,1)
          },
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