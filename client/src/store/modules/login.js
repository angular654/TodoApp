export default {
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    mutations: {
    },
    actions: {
        login () {
        this('http://localhost:4000/api/todos/signin', {
                username: this.username,
                password: this.pwd1
            }).then(response => {
                localStorage.setItem('token', response.data.token)
            }).catch(error => {
                console.log("Error login")
                console.log(error)
            })
            this.dialog = false
        }
    },
    getters: {
    }
}