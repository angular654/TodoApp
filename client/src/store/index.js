import Vue from 'vue'
import Vuex from 'vuex'
import note from './modules/note'
import file from './modules/file'

Vue.use(Vuex)

 export default new Vuex.Store({
    modules: {
       note,
       file
    }
})