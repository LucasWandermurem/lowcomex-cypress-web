class ExibirMercadoriaAction {

    constructor() {
        this.tituloGrid = 'Lista de Itens de Mercadorias'
    }

    verificarFormulario(titulo, estadoRequisicao, colunaAcoes, permiteManter) {
        this.acessarAbaMercadoria()

        cy.get('.titulo').should('contain', titulo)

        cy.get('.grid-title').should('contain', this.tituloGrid)
        cy.get('p-button[label="Filtrar"]').should('contain', 'Filtrar')

        cy.get('#listaItensMercadoria').contains('th', 'Item')
        cy.get('#listaItensMercadoria').contains('th', 'CodItem')
        cy.get('#listaItensMercadoria').contains('th', 'Descrição da CodItem')
        cy.get('#listaItensMercadoria').contains('th', 'Situação')

        if (colunaAcoes === true) {
            cy.get('#listaItensMercadoria').contains('th', 'Ações')
        } else if (colunaAcoes === false) {
            cy.get('#listaItensMercadoria').should('not.have.value', 'Ações')
        }

        if (estadoRequisicao === "sem itens") {
            cy.contains("Nenhum resultado encontrado")
            if (permiteManter === true) {
                cy.get('#btnIncluirItemMercadoria').should('be.visible').should('contain', 'Incluir Mercadoria')
            }
        } else {
            if (permiteManter === true) {

                if (estadoRequisicao === 'em retificacao') {

                    // Verificar item incluido na situacao anterior
                    cy.get('[data-test="1Item"] span').should('not.have.class', 'fa fa-exclamation-triangle lowcomex icon-orange')
                    cy.get('[data-test="1Ações"]').should('be.empty')

                    // Verifcar item incluido na retificao
                    cy.get('div[data-test="numeroItem"]').click().click()
                    cy.get('[data-test="1Item"] span').should('have.class', 'fa fa-exclamation-triangle lowcomex icon-orange')
                    cy.get('[data-test="1Ações"]').should('not.be.empty')
                    cy.get('#btnEditarMercadoria').should('be.visible')
                    cy.get('#btnExcluirMercadoria').should('be.visible')
                    cy.get('#btnSelecionarMercadoria').should('be.visible')
                }

                // TODO: verificar se possui itens

                cy.get('#btnIncluirItemMercadoria').should('be.visible').should('contain', 'Incluir Mercadoria')
            }
        }

    }

    acessarAbaMercadoria() {
        //clicar na aba mercadorias
        cy.get('#p-tabpanel-2-label').should('contain', 'Mercadorias').should('be.visible').click()
    }
}

export default new ExibirMercadoriaAction;