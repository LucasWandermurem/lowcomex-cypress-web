import consultarDadosBasicosAction from '../dados-basicos/consultar-dados-basicos-action'

import Acesso from '../components/acesso'

class ExcluirMercadoriaAction {

    constructor() {
        this.simButton = '#btnSim'
        this.naoButton = '#btnNao'
        this.excluirButton = '#btnExcluirMercadoria'
    }

    acessarOpcaoExcluir(perfil, cnpj, numeroRequisicao) {
        Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', perfil, cnpj);
        consultarDadosBasicosAction.preencherNumeroRequisicao(numeroRequisicao);
        consultarDadosBasicosAction.consultar(numeroRequisicao, true);

        //clicar na aba Mercadorias
        cy.get('#p-tabpanel-2-label').should('contain', 'Mercadorias').click()

        //Acessar último registro
        cy.get('#listaItensMercadoria th[id="numeroItem"]').should('contain', 'Item')
        cy.get('div[data-test="numeroItem"]').click().click()
        cy.get(this.excluirButton).click()

    }

    confirmarExclusao(confirma) {
        cy.get('.lowcomex-message-header').should('contain', 'Confirmação')
        cy.get('.lowcomex-message-content').should('contain', 'Confirma a exclusão deste item de mercadoria?')
        if (confirma === true) {
            this.excluir()
        } else {
            this.cancelarExclusao()
        }
    }

    excluir() {
        cy.get(this.simButton).click();
    }

    cancelarExclusao() {
        cy.get(this.naoButton).click()
        cy.get(this.excluirButton).should('be.visible')
    }

    voltarOpcaoExcluir() {
        cy.get(this.excluirButton).should('be.visible')
    }
}

export default new ExcluirMercadoriaAction;