export default {
    getBaseUrl() {
        return `http://localhost:4000/verify/${sessionStorage.getItem("token")}/api/todos/`
    }
}