export default {
    actions: {
        async fetchNotes(ctx) {
            await this.$http
                .get("http://localhost:4000/api/todos/")
                .then((response) => (this.notes = response.data))
                .catch((error) => (this.errors = error));
            ctx.commit('ubdateNotes', this.notes)
        },
        async deleteNote({ commit }, id) {
            await this.$http({
                url: "http://localhost:4000/api/todos/delete",
                method: "post",
                data: {
                    _id: id,
                },
            });
            commit('DELETE_NOTE', id)
        }
    },
    mutations: {
        ubdateNotes(state, notes) {
            state.notes = notes
        },
        DELETE_NOTE(state) {
            state.notes.$remove(state.notes.id)
        }
    },
    state: {
        notes: []
    },
    getters: {
        allNotes(state) {
            return state.notes
        },
        notesCount(state) {
            return state.notes.length;
        }
    }
}