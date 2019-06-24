/**
 * @module config/canvas
 * @see components
 */

export default {
  /**
   * Check if is object out of canvas.
   * @param {object} element
   */
  checkCanvasEdges (element) {
    return parseInt(element.style.left, 10) < -10 ||
      parseInt(element.style.left, 10) > 600 ||
      (parseInt(element.style.top, 10) < -10 ||
        parseInt(element.style.top, 10) > 600)
  },
  /**
   * @param {object} element
   * @param {object} event
   */
  getNewCursorPosition (element, event) {
    element.positions.v1 = element.positions.v3 - event.clientX
    element.positions.v2 = element.positions.v4 - event.clientY
    element.positions.v3 = event.clientX
    element.positions.v4 = event.clientY
    return element
  },
  /**
   * @param {object} element
   */
  setNewElementPosition (element) {
    element.content.style.cursor = 'grabbing'
    element.content.style.top =
      element.content.offsetTop - element.positions.v2 + 'px'
    element.content.style.left =
      element.content.offsetLeft - element.positions.v1 + 'px'
    return element
  }
}
