import axios from "axios";
export default {
    actions: {
        async fetchNotes(ctx) {
            await axios
                .get(`http://localhost:4000/api/notes/${sessionStorage.getItem("token")}`)
                .then((response) => (this.notes = response.data))
                .catch((error) => (this.errors = error));
            ctx.commit('ubdateNotes', this.notes)
        }
    },
    mutations: {
        ubdateNotes(state, notes) {
            state.notes = notes
        },
    },
    state: {
        notes: []
    },
    getters: {
        allNotes(state) {
            return state.notes
        }
    }
}