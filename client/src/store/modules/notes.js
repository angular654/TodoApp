import axios from "axios";
export default {
    actions: {
        async fetchNotes(ctx) {
            if (JSON.parse(sessionStorage.getItem("auth")) === true) {
                await axios
                    .get(`http://localhost:49060/todos/${sessionStorage.getItem("token")}/get`,{
                        author_id: sessionStorage.getItem("user_id")
                    })
                    .then((response) => (this.notes = response.data))
                    .catch((error) => (this.errors = error));
                ctx.commit('ubdateNotes', this.notes)
            }
            return false
        },
    },
    mutations: {
        ubdateNotes(state, notes) {
            state.notes = notes
        },
    },
    state: {
        notes: [],
    },
    getters: {
        allNotes(state) {
            return state.notes
        }
    }
}