describe('create-account flow', () => {
  describe('given the user is logged in', () => {
    beforeEach(() => {
      cy.login('mihai.maxim@thinslices.com', 'password1234')
    })
    it('should redirect me to /dashboard', () => {
      cy.visit('http://localhost:3000/register')

      cy.url().should('include', '/dashboard')
    })
  })
  describe('given the user is not logged in', () => {
    beforeEach(() => {
      cy.clearCookies()
    })

    it('should display the create account page', () => {
      cy.visit('http://localhost:3000/register')
      cy.contains('Create account')

      cy.get('[data-cy="create-account-button"]').should('exist')

      cy.get('[data-cy="email-address-input-label"]').should('exist')
      cy.get('[data-cy="email-address-input"]').should('exist')
      cy.get('[data-cy="password-input-label"]').should('exist')
      cy.get('[data-cy="password-input"]').should('exist')

      cy.get('[data-cy="confirmPassword-input-label"]').should('exist')
      cy.get('[data-cy="confirmPassword-input"]').should('exist')

      cy.get('a[href="/login"]').should('exist')
    })

    describe('given the inputs are not completed', () => {
      it('should display "Can\'t be empty" text three times', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('[data-cy="create-account-button"]').click()

        cy.contains("Can't be empty")
          .get("span:contains(Can't be empty)")
          .should('have.length', 3)
      })
    })

    describe('given the passwords do not match', () => {
      it('should display Please check again', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('[data-cy="email-address-input"]').type(
          'mihai.maxim@thinslices.com',
        )

        cy.get('[data-cy="password-input"]').type('test')
        cy.get('[data-cy="confirmPassword-input"]').type('test2')

        cy.get('[data-cy="create-account-button"]').click()

        cy.contains('Please check again').should('exist')
      })
    })

    describe('given the input is correct', () => {
      describe('given the user already has an account', () => {
        it('should display User already exists', () => {
          cy.intercept('POST', '/api/register', {
            statusCode: 409,
          }).as('registerUser')

          cy.visit('http://localhost:3000/register')

          cy.get('[data-cy="email-address-input"]').type(
            'mihai.maxim@thinslices.com',
          )
          cy.get('[data-cy="password-input"]').type('password1234')
          cy.get('[data-cy="confirmPassword-input"]').type('password1234')

          cy.get('[data-cy="create-account-button"]').click()

          cy.wait('@registerUser')

          cy.contains('User already exists')
            .get('span:contains(User already exists)')
            .should('have.length', 1)
        })
      })
      describe('given the user does not have an account', () => {
        it('should redirect me to /dashboard', () => {
          cy.intercept('POST', '/api/register', {
            statusCode: 201,
          }).as('registerUser')

          cy.visit('http://localhost:3000/register')

          cy.get('[data-cy="email-address-input"]').type(
            'mihai.maxim@thinslices.com',
          )

          cy.get('[data-cy="password-input"]').type('password1234')
          cy.get('[data-cy="confirmPassword-input"]').type('password1234')

          cy.get('[data-cy="create-account-button"]').click()

          cy.wait('@registerUser')

          cy.url().should('include', '/dashboard')
        })
      })
    })
  })
})
