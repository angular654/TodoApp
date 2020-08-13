export default {
    actions: {
        async fetchFiles(ctx) {
            await this.$http.get("http://localhost:4000/api/files/", {
                jwt: this.$route.params.id,
                name: this.$route.params.name
            }).then((response) => {
                this.notes = response.data
            }
            );
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
        },
        filesCount(state) {
            return state.files.length
        }
    }
}