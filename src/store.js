import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: [],
    canvas: []
  },
  actions: {
    /**
     * Send async images to mutation.
     * @param {any} state
     * @param {array} images
     */
    updateImages({
      commit
    }, images) {
      commit('updateImages', images)
    },
    /**
     * Send async canvas to mutation.
     * @param {any} state
     * @param {object} element
     */
    addToCanvas({
      commit
    }, element) {
      commit('addToCanvas', element)
    },
    /**
     * Send async canvas to mutation.
     * @param {any} state
     * @param {object} content
     */
    setCanvasElementContent({
      commit
    }, content) {
      commit('setCanvasElementContent', content)
    },
    /**
     * Send async canvas to mutation.
     * @param {any} state
     * @param {number} index
     */
    removeFromCanvas({
      commit
    }, index) {
      commit('removeFromCanvas', index)
    }
  },
  mutations: {
    /**
     * Save images for render into store.
     * @param {any} state
     * @param {array} images
     */
    updateImages(state, images) {
      state.images = [...images]
    },
    /**
     * Add element into canvas store.
     * @param {any} state
     * @param {object} element
     */
    addToCanvas(state, element) {
      state.canvas.push({
        index: element.index,
        text: element.text,
        src: element.src,
        positions: element.positions
      })
    },
    /**
     * @param {any} state
     * @param {object} content
     */
    setCanvasElementContent(state, content) {
      state.canvas[state.canvas.length - 1].content = content;
    },
    /**
     * Remove element from canvas store.
     * @param {any} state
     * @param {number} index
     */
    removeFromCanvas(state, index) {
      state.canvas = state.canvas.filter(item => item.index !== index)
    }
  }
})
