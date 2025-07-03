class Mensagem {

    mensagemRetornada(texto) {
        cy.get('#iMsgText', { timeout: 15000 }).should('contain', texto)
    }

    mensagemCampo(texto) {
        cy.contains('.message', texto).should('be.visible')
        // cy.contains(texto).its('length').should('eq', 2)
    }

    alertaMateriaPrima(texto) {
        cy.get('.classe-da-mensagem').should('contain', texto)
    }
}

export default new Mensagem;