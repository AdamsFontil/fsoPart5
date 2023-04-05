
describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Adams Fontil',
      username: 'Adams',
      password: '12345'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log in')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Adams')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()
      cy.contains('Adams Fontil logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
    describe.only('when logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'Adams', password: '12345' })
        cy.createBlog({ title: 'Living in Finland', author: 'Arto Hellas', url: 'Artoislitt.com' })
        cy.createBlog({ title: 'Ballin Out', author: 'Lebron James', url: 'Lebronwashere.com' })
        cy.createBlog({ title: 'Who is JB', author: 'James Brown', url: 'jb.com' })
      })

      it('a new blog can be made', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('New blog made with cypress')
        cy.get('#author').type('Arto Hellas')
        cy.get('#url').type('fullstackopen.com')
        cy.contains('Create').click()
        cy.contains('New blog made with cypress')
      })

      it('users can like a blog', function() {
        cy.contains('view').click()
        cy.contains('likes 0').should('exist')
        cy.contains('like').click()
        cy.contains('likes 1').should('exist')
      })
      it('creator of blog can delete the blog', function() {
        cy.contains('Ballin Out')
          .contains('view').click()
        cy.contains('remove').click()
        cy.contains('Living in Finland').should('exist')
        cy.contains('Who is JB').should('exist')
        cy.contains('Ballin Out').should('not.exist')
      })
      it('noone else can see the delete button of a blog', function() {
        cy.contains('logout').click()
        const user2 = {
          name: 'Arto Hellas',
          username: 'Arto',
          password: '12345'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
        cy.login({ username: 'Arto', password: '12345' })
        cy.contains('view').click()
        cy.contains('Ballin Out')
        cy.contains('view').click()
        cy.contains('Who is JB')
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
      it.only('blogs are ordered correctly', function() {
        cy.contains('view').click()
        for (let i = 0; i < 2; i++) {
          cy.contains('like').click()
        }
        cy.wait(1000)
        cy.contains('hide').click()
        cy.contains('Ballin Out')
          .contains('view').click()
        for (let i = 0; i < 4; i++) {
          cy.contains('like').click()
        }
        cy.wait(1500)
        cy.contains('hide').click()
        cy.contains('Who is JB')
          .contains('view').click()
        for (let i = 0; i < 5; i++) {
          cy.contains('like').click()
        }
        cy.wait(2000)

        cy.get('.blog').eq(0).should('contain', 'Who is JB')
        cy.get('.blog').eq(1).should('contain', 'Ballin Out')
        cy.get('.blog').eq(2).should('contain', 'Living in Finland')
      })
    })

  })
})
