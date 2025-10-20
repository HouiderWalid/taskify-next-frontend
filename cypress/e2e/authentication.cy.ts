describe('Sign in flow', () => {

    const APP_URL = Cypress.config('baseUrl');
    const HOME_URI = '/en'
    const SIGN_IN_URI = '/en/signin'
    const HOME_URL = APP_URL + HOME_URI
    const SIGN_IN_URL = APP_URL + SIGN_IN_URI

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    before(() => {
        cy.task('startMockServer');
    })

    after(() => {
        cy.task('stopMockServer');
    })

    it('Test sign in redirect when no authenticated', () => {
        cy.visit(HOME_URI);
        cy.url().should('eq', SIGN_IN_URL);
    })

    it('Test successful sign in', () => {

        cy.intercept('POST', '**api/sign_in*', {
            statusCode: 200,
            fixture: 'authentication/auth_signin.json'
        }).as('mockedSignIn')

        cy.visit(SIGN_IN_URI);

        const email = 'houiderwalid@gmail.com'
        const password = '123456789'
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(password);
        cy.get('button[type=submit]').click();
        cy.wait('@mockedSignIn')
            .then((interception) => {

                expect(interception.request.body).to.deep.equal({
                    email,
                    password,
                })

            })
            .its('response')
            .then((response) => {
                cy.url().should('eq', HOME_URL);
            })
    })

    it('Test home when authenticated', () => {

        cy.setCookie(
            'persist%3Ataskify-next-user',
            JSON.stringify({token: JSON.stringify('test_token')})
        );

        cy.task('setApiMock', {
            method: 'GET',
            uri: '/api/auth_user',
            statusCode: 200,
            fixture: 'authentication/auth_signed_in_check.json'
        });

        cy.visit(SIGN_IN_URI);
        cy.url().should('eq', HOME_URL);

    })
})