// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Alterar para o ambiente desejado
var ambiente = Cypress.env('TES')

Cypress.Commands.add('loginUnico', (perfil, tipoCNPJ) => {
    cy.session([perfil, tipoCNPJ], () => {
        cy.visit(ambiente + '/portal/')

        var cpf = Cypress.env('cpfUsuario')

        if (tipoCNPJ == 'cnpjRepresentado') {
            var cnpj = Cypress.env('cnpjRepresentado')
        } else {
            var cnpj = Cypress.env('cnpjNaoRepresentado')
        }

        if (perfil == 'cliente') {
            cy.get('#id').click()
            cy.get('#id').click()
            cy.get('#id').type(cpf)
            cy.get('#id').type(cnpj)
        } else {
            if (perfil == 'funcionario') {
                var transacoes = 'perfil1 perfil2'
            } else if (perfil == 'gerente') {
                var transacoes = 'perfil1 perfil2 perfil3'
            }
            cy.get('#id').click()
            cy.get('#id').click()
            cy.get('#id').type(cpf)
            cy.get('#id').type('LOWCOMEX')
            cy.get('#id').type('LOWCOMEX')
            cy.get('#id').type('RJ')
            cy.get('#id').type(transacoes)
        }
        cy.get('#id').click()
        cy.title().should('be.equal', 'Lowcomex')
        cy.get('#bem-vindo > h1', { timeout: 15000 }).should('contain', 'Bem-vindo USUÁRIO_' + cpf)

    }).as('Autenticação')
});

Cypress.Commands.add('visitarPagina', (pagina, parametro) => {
    if (parametro == null) {
        cy.visit(ambiente + pagina)
    } else {
        cy.visit(ambiente + pagina + parametro)
    }

})


Cypress.Commands.add('menuLowcomex', (perfil) => {
    if (perfil == 'funcionario') {
        cy.get('#id').click()
        cy.get('#id')
            .click()
            .should('contain', 'Lowcomex')
    } else {
        cy.get('#id').click()
        cy.get('#id')
            .click()
            .should('contain', 'Lowcomex')
    }

})

Cypress.Commands.add('acessarFormulario', (pagina, perfil, cpf, cnpj) => {

    cy.autenticar(perfil, cpf, cnpj);

    cy.menuLowcomex(perfil)
    cy.visit(pagina)
})