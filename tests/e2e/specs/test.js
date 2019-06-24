// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h3', 'Form')
    cy.contains('h3', 'Assets')
    cy.contains('h4', 'Text')
    cy.contains('h4', 'Images')
    cy.contains('button', 'Upload')
    cy.contains('button', 'Add Text')
  })
  it('Fill input file', () => {
    const dropEvent = {
      dataTransfer: {
        files: []
      }
    }
    cy.fixture('../fixtures/example.png').then((picture) => {
      return Cypress.Blob.base64StringToBlob(picture, 'image/png').then((blob) => {
        dropEvent.dataTransfer.files.push(blob)
      })
    })
    cy.get('.form-control').trigger('drop', dropEvent)
    cy.get('#submit').click()
  })
  it('Service request get images', () => {
    cy.request('GET', 'http://localhost:8000/images/')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body[0]).to.be.a('string')
        expect(response.body.length).to.be.greaterThan(4)
      })
  })
  it('Drag and Drop', () => {
    cy.get('img').first().click()
    cy.get('.canvas-element').first()
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove', { clientX: 152, clientY: 50 })
      .trigger('mouseup', { force: true })
  })
  it('Add Text', () => {
    cy.get('#addText').click()
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns('Test')
    })
  })
})
