import axios from "axios";
export default {
    actions: {
        async fetchNotes(ctx) {
            if (JSON.parse(sessionStorage.getItem("auth")) === true) {
                await axios
                    .get(`https://todoapp-notes.herokuapp.com/todos/${sessionStorage.getItem("token")}/get`,{
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
        REMOVE_NOTE (state, id) {
           state.notes.splice(id,1);
          },
        UPDATE_NOTE (state, process,id) {
                state.notes.find(item => item.id === id).process = process;
        },
        CREATE_NOTE(state, newPost) {
            state.notes.unshift(newPost)
        }
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