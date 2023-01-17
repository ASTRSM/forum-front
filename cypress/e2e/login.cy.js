describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should display the login page', () => {
    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should call alert when email is empty', () => {
    cy.get('button[type="submit"]').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email is required')
    })
  })

  it('should call alert when password is empty', () => {
    cy.get('input[id="email"]').type('123123123@gmail.com')
    cy.get('button[type="submit"]').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty')
    })
  })

  it('should call alert when the credentials are invalid', () => {
    cy.get('input[id="email"]').type('fail@gmail.com')
    cy.get('input[id="password"]').type('123123123')
    cy.get('button[type="submit"]').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong')
    })
  })

  it('should login successfully', () => {
    cy.get('input[id="email"]').type('123123123@gmail.com')
    cy.get('input[id="password"]').type('123123123')
    cy.get('button[type="submit"]').click()
    cy.get('button[type="button"]').contains('Logout').should('be.visible')
  })
})
