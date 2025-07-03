class Cabecalho {

    verificarCabecalho(dadosCabecalho) {
        cy.get('#classe-do-elemento', { timeout: 17000 }).should('contain', 'Situação:');
        cy.get('#classe-do-elemento').should('contain', 'Cliente:');
        cy.get('#classe-do-elemento').should('contain', 'Regime:');
        cy.get('#classe-do-elemento').should('contain', 'Modalidade:');
        cy.get('#classe-do-elemento').should('contain', 'Tipo:');

        cy.contains(dadosCabecalho.situacao.label)
        cy.get('#classe-do-elemento').should('contain', dadosCabecalho.cnpjCliente.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"));
        cy.get('#classe-do-elemento').should('contain', dadosCabecalho.regime.label);
        cy.get('#classe-do-elemento').should('contain', dadosCabecalho.modalidade.label);
        cy.get('#classe-do-elemento').should('contain', dadosCabecalho.tipo.label);
    }

}

export default new Cabecalho;