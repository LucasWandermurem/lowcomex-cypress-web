import ConsultarDadosBasicosAction from '../dados-basicos/consultar-dados-basicos-action'

import Acesso from '../components/acesso'

class ExcluirMateriaPrimaAction {

    constructor() {
        this.simButton = '#btnSim'
        this.naoButton = '#btnNao'
        this.excluirButton = '#btnExcluirMateriaPrima'
    }

    acessarOpcaoExcluir(perfil, cnpj, numeroRequisicao) {

        Acesso.acessarFormulario('/lowcomex/#/consulta-Requisicao', perfil, cnpj);
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(numeroRequisicao);
        ConsultarDadosBasicosAction.consultar(numeroRequisicao, true);
        cy.get('#p-tabpanel-1-label').should('contain', 'Materia-prima').click()
        cy.get(this.excluirButton).click()
    }

    confirmarExclusao(confirma) {
        cy.get('.message-header').should('contain', 'Confirmação')
        cy.get('.message-content').should('contain', 'Confirma a exclusão deste item de materia-prima?')

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

export default new ExcluirMateriaPrimaAction;