import Vue from 'vue'
import Vuex from 'vuex'
import notes from './modules/notes'
import files from './modules/files'

Vue.use(Vuex)

export default new Vuex.Store({
   modules: {
      notes,
      files
   }
})