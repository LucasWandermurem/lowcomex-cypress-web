import ConsultarDadosBasicosAction from '../dados-basicos/consultar-dados-basicos-action'

import Acesso from '../components/acesso'

class AlterarMateriaPrimaAction {

    constructor() {
        this.inputCodItem = '#codItem'
        this.descricaoCodItem = '#descricaoCodItem.text-muted'
        this.alterarButton = '#btnEditarMateriaPrima'
        this.salvarButton = '#btnSalvar'
        this.cancelarButton = '#btnCancelar'
    }

    acessarOpcaoAlterar(perfil, cnpj, numeroMateriaPrima, coditem) {
        Acesso.acessarFormulario('/lowcodex/#/consulta-requisicao', perfil, cnpj);
        ConsultarDadosBasicosAction.preencherNumeroMateriaPrima(numeroMateriaPrima);
        ConsultarDadosBasicosAction.consultar(numeroMateriaPrima, true);
        cy.get('#p-tabpanel-1-label').should('contain', 'MateriaPrima').click()
        cy.get(this.alterarButton).click()
    }
    verificarFormulario() {
        cy.contains("Alteração do Item de MateriaPrima 001")
        cy.get(this.labelCodItem).should('contain', 'Código do item:')
        cy.get(this.labelDescricaoCodItem).should('contain', 'Descrição da código do item:')
        // Verificar classe e quantidade de campos obrigatórios 
        cy.get(this.labelCodItem).should('have.class', 'control-label required')    
        cy.get('.control-label.required').should('have.length', 1)
        cy.get(this.salvarButton).should('be.visible')
        cy.get(this.cancelarButton).should('exist')
    }

    verificarDadosFormulario(itemMateriaPrima, existe) {
        if (existe === false) {
            cy.get(this.inputCodItem).should('not.have.value', itemMateriaPrima.coditem.codigo)

        } else {
            cy.get('#numMateriaPrima').should('contain', requisicao)
        }
    }

    preencherFormulario(itemMateriaPrima) {
        cy.get(this.inputCodItem).type(itemMateriaPrima.codItem.codigo).blur()
        cy.get(this.descricaoCodItem).should('be.visible')
    }

    limparFormulario() {
        cy.get(this.inputCodItem).clear()
    }

    preencherCodItem(codItem) {
        cy.get(this.inputCodItem).clear().type(codItem)
    }

    salvar() {
        cy.get(this.salvarButton).click();
    }

    cancelar() {
        cy.get(this.cancelarButton).click()
        cy.contains("Lista de Itens de MateriaPrimas")
    }

    voltarOpcaoAlterar() {
        cy.get('#btnEditarMateriaPrima').should('be.visible')
    }

    verificarCaixaDeConfirmacao() {
        cy.get('.message-header').should('contain', 'Confirmação')
        cy.get('#btnSim').should('be.visible').should('contain', 'Sim')
        cy.get('#btnNao').should('be.visible').should('contain', 'Não')
    }
}

export default new AlterarMateriaPrimaAction;