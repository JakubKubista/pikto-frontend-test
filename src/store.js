import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: []
  },
  actions: {
    /**
     * Send async images to mutation.
     * @param {any} state
     * @param {array} images
     */
    updateImages ({
      commit
    }, images) {
      commit('updateImages', images)
    }
  },
  mutations: {
    /**
     * Save images for render into store.
     * @param {any} state
     * @param {array} images
     */
    updateImages (state, images) {
      state.images = [...images]
    }
  }
})
