class ExibirMateriaPrimaAction {

    constructor() {
        this.tituloGrid = 'Lista de Itens de Materia Prima'
    }

    verificarFormulario(titulo, estadoRequisicao, colunaAcoes, permiteManter) {

        cy.get('.titulo').should('contain', titulo)

        cy.get('.grid-title').should('contain', this.tituloGrid)
        cy.get('p-button[label="Filtrar"]').should('contain', 'Filtrar')

        cy.get('#listaItensMateriaPrima').contains('th', 'Item')
        cy.get('#listaItensMateriaPrima').contains('th', 'Codigo do Item')
        cy.get('#listaItensMateriaPrima').contains('th', 'Descrição da Codigo do Item')

        if (colunaAcoes === true) {
            cy.get('#listaItensMateriaPrima').contains('th', 'Ações')
        } else if (colunaAcoes === false) {
            cy.get('#listaItensMateriaPrima').should('not.have.value', 'Ações')
        }

        if (estadoRequisicao === "sem itens") {
            cy.contains("Nenhum resultado encontrado")
            if (permiteManter === true) {
                cy.get('#btnIncluirItemMateriaPrima').should('be.visible').should('contain', 'Incluir MateriaPrima')
            }
        } else {
            if (permiteManter === true) {

                if (estadoRequisicao === 'em retificacao') {

                    // Verificar item incluido na situacao anterior
                    cy.get('#listaItensMateriaPrima [data-test="1Item"] span').should('not.have.class', 'fa fa-exclamation-triangle')
                    cy.get('#listaItensMateriaPrima td[data-test="1Ações"] ').should('be.empty')

                    // Verificar item incluido na retificao
                    cy.get('div[data-test="numeroItem"]').click().click()
                    cy.get('#listaItensMateriaPrima [data-test="1Item"] span').should('have.class', 'fa fa-exclamation-triangle')
                    cy.get('#listaItensMateriaPrima [data-test="1Ações"]').should('not.be.empty')
                    cy.get('#listaItensMateriaPrima #btnEditarMateriaPrima').should('be.visible')
                    cy.get('#listaItensMateriaPrima #btnExcluirMateriaPrima').should('be.visible')
                } else {
                    cy.get('#listaItensMateriaPrima #btnEditarMateriaPrima').should('be.visible')
                    cy.get('#listaItensMateriaPrima #btnExcluirMateriaPrima').should('be.visible')
                }
                cy.get('#btnIncluirItemMateriaPrima').should('be.visible').should('contain', 'Incluir MateriaPrima')
            }
        }
    }

    acessarAbaMateriaPrima() {
        cy.get('#p-tabpanel-1-label').should('contain', 'MateriaPrima').should('be.visible').click()
    }

    exportar(requisicao, possuiItens) {

        if (possuiItens === true) {
            cy.get('#listaItensMateriaPrima .p-placeholder').type('CSV' + '{enter}')
            cy.exportarCSV('LOWCODEX_' + requisicao + '_MATERIAPRIMA_',
                '"Item";"Codigo do Item";"Descrição da Codigo do Item"');
        } else {
            cy.get('#listaItensMateriaPrima .p-placeholder').should('not.exist')
        }

    }
}

export default new ExibirMateriaPrimaAction;