describe('Project Page Flow', () => {

    const APP_URL = Cypress.config('baseUrl');
    const HOME_URI = '/en'
    const SIGN_IN_URI = '/en/signin'
    const PROJECTS_URI = '/en/projects'
    const HOME_URL = APP_URL + HOME_URI
    const SIGN_IN_URL = APP_URL + SIGN_IN_URI
    const PROJECTS_URL = APP_URL + PROJECTS_URI

    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    });

    before(() => {
        cy.task('startMockServer');
    })

    after(() => {
        cy.task('stopMockServer');
    })

    it('Successful project create and display', () => {

        cy.setCookie(
            'persist%3Ataskify-next-user',
            JSON.stringify({token: JSON.stringify('test_token')})
        );

        cy.task('setApiMock', {
            method: 'GET',
            uri: '/api/auth_user',
            statusCode: 200,
            fixture: 'project/projects_display_user_auth.json'
        });

        cy.visit(PROJECTS_URL)

        cy.url().should('eq', PROJECTS_URL);

        cy.get('#open-create-project-modal').click()

        cy.get('#project-modal').should('not.have.class', 'hidden');

        const project_id = 1
        const project_name = 'Project Test Name 1'
        const project_due_date = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 19);
        const project_description = 'Project Test Description 1'
        cy.get('input[id=project_name]').type(project_name)
        cy.get('input[id=project_due_date]')
            .click()
            .type(project_due_date);
        cy.get('textarea[id=project_description]').type(project_description)

        cy.intercept('POST', '**api/project*', {
            statusCode: 200,
            body: {
                code: 200,
                data: {
                    current_page: 1,
                    data: [
                        {
                            id: project_id,
                            name: project_name,
                            description: project_description,
                            due_date: project_due_date,
                            tasks_done_count: 0,
                            tasks_count: 0,
                            task_assigned_members_count: 0
                        }
                    ],
                    per_page: 5,
                    total: 1
                },
                messages: ''
            }
        }).as('mockedProjectCreation')

        cy.get('#project-create-button').click()

        cy.wait('@mockedProjectCreation')
            .then(interception => {

                expect(interception.request.body).to.deep.equal({
                    name: project_name,
                    description: project_description,
                    due_date: project_due_date
                })

            })
            .its('response')
            .then(response => {
                cy.get('#project-modal').should('have.class', 'hidden');
                cy.get('#project-card-' + project_id).should('exist')
                cy.get('#project-card-name-' + project_id).should('contain.text', project_name)
                cy.get('#project-card-description-' + project_id).should('contain.text', project_description)
            })

    })

    it('Successful project update', () => {

        cy.setCookie(
            'persist%3Ataskify-next-user',
            JSON.stringify({token: JSON.stringify('test_token')})
        );

        cy.task('setApiMock', {
            method: 'GET',
            uri: '/api/auth_user',
            statusCode: 200,
            fixture: 'project/projects_display_user_auth.json'
        });

        const project_id = 1
        const project_name = 'Project Test Name 1'
        const project_due_date = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 19);
        const project_description = 'Project Test Description 1'
        cy.intercept('GET', '**api/project*', {
            statusCode: 200,
            body: {
                code: 200,
                data: {
                    current_page: 1,
                    data: [
                        {
                            id: project_id,
                            name: project_name,
                            description: project_description,
                            due_date: project_due_date,
                            tasks_done_count: 0,
                            tasks_count: 0,
                            task_assigned_members_count: 0
                        }
                    ],
                    per_page: 5,
                    total: 1
                },
                messages: ''
            }
        }).as('mockedProjectDisplay')

        cy.visit(PROJECTS_URL)

        cy.wait('@mockedProjectDisplay')
            .its('response')
            .then(response => {
                cy.get('#project-card-actions-' + project_id).should('exist').click()
                cy.get('#project-card-edit-btn-' + project_id).should('exist').click()
                cy.get('#project-modal').should('not.have.class', 'hidden');
                cy.get('input[id=project_name]').should('have.value', project_name)
                cy.get('input[id=project_due_date]').should('have.value', project_due_date)
                cy.get('textarea[id=project_description]').should('have.value', project_description)

                const new_project_name = 'Project Test Name 2'
                const new_project_due_date = new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().slice(0, 19);
                const new_project_description = 'Project Test Description 2'
                cy.get('input[id=project_name]').clear().type(new_project_name)
                cy.get('input[id=project_due_date]')
                    .click()
                    .type(new_project_due_date);
                cy.get('textarea[id=project_description]').clear().type(new_project_description)

                cy.intercept('PUT', `**api/project/${project_id}*`, {
                    statusCode: 200,
                    body: {
                        code: 200,
                        data: {
                            current_page: 1,
                            data: [
                                {
                                    id: project_id,
                                    name: new_project_name,
                                    description: new_project_description,
                                    due_date: new_project_due_date,
                                    tasks_done_count: 0,
                                    tasks_count: 0,
                                    task_assigned_members_count: 0
                                }
                            ],
                            per_page: 5,
                            total: 1
                        },
                        messages: ''
                    }
                }).as('mockedProjectUpdate')

                cy.get('#project-save-button').click()

                cy.wait('@mockedProjectUpdate')
                    .then(interception => {

                        expect(interception.request.body).to.deep.equal({
                            name: new_project_name,
                            description: new_project_description,
                            due_date: new_project_due_date,
                        })

                    })
                    .its('response')
                    .then(response => {
                        cy.get('#project-modal').should('have.class', 'hidden');
                        cy.get('#project-card-' + project_id).should('exist')
                        cy.get('#project-card-name-' + project_id).should('contain.text', new_project_name)
                        cy.get('#project-card-description-' + project_id).should('contain.text', new_project_description)
                    })
            })

    })

    it('Successful project delete', () => {

    })
})