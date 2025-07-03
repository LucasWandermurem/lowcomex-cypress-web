import consultarDadosBasicosAction from '../dados-basicos/consultar-dados-basicos-action'

import Acesso from '../components/acesso'

class IncluirMateriaPrimaAction {

    constructor() {
        this.labelCodItem = '#labelCodItem'
        this.labelDescricaoCodItem = '#labelDescricaoCodItem'
        this.inputCodItem = '#inputCodItem'
        this.descricaoCodItem = '#descricaoCodItem'
        this.incluirMateriaPrimaButton = '#btnIncluirItemMateriaPrima'
        this.salvarButton = '#btnSalvar'
        this.limparButton = '#btnLimpar'
        this.cancelarButton = '#btnCancelar'
    }

    acessarOpcaoIncluir(perfil, cnpj, numeroRequisicao, espera) {
        Acesso.acessarFormulario('/lowcodex/#/consulta-requisicao', perfil, cnpj);
        consultarDadosBasicosAction.preencherNumeroRequisicao(numeroRequisicao);
        consultarDadosBasicosAction.consultar(numeroRequisicao, true);

        //clicar na aba MateriaPrima
        cy.get('#p-tabpanel-1-label').should('contain', 'MateriaPrima').click()

        if (espera === true) {
            cy.wait(30000)
            cy.get(this.incluirMateriaPrimaButton).should('contain', 'Incluir MateriaPrima').click()
        } else {
            cy.get(this.incluirMateriaPrimaButton).should('contain', 'Incluir MateriaPrima').click()
        }
    }
    verificarFormulario() {

        cy.get('#p-panel-2').should('contain', 'Inclusão de Item de Matéria-prima')

        cy.get(this.labelCodItem).should('contain', 'Código do item:')
        cy.get(this.labelDescricaoCodItem).should('contain', 'Descrição da código do item:')

        // Verificar classe e quantidade de campos obrigatórios 
        cy.get(this.labelCodItem).should('have.class', 'control-label required')    
        cy.get('.control-label.required').should('have.length', 1)

        cy.get(this.salvarButton).should('be.visible')
        cy.get(this.limparButton).should('be.visible')
        cy.get(this.cancelarButton).should('exist')
    }

    verificarDadosFormulario(itemMateriaPrima, existe) {
        if (existe === false) {
            cy.get(this.inputCodItem).should('not.have.value', itemMateriaPrima.coditem.codigo)
        } else {
            cy.get('#numRequisicao').should('contain', Requisicao)
        }
    }

    preencherFormulario(itemMateriaPrima) {
        cy.get(this.inputCodItem).type(itemMateriaPrima.coditem.codigo).focus().blur()
        cy.get(this.descricaoCodItem).should('be.visible')
    }

    preencherCodItem(coditem) {
        cy.get(this.inputCodItem).clear().type(coditem)
    }

    salvar() {
        cy.get(this.salvarButton).click();
    }

    limpar() {
        cy.get(this.limparButton).click()
    }

    cancelar() {
        cy.get(this.cancelarButton).click()
    }

    voltarOpcaoIncluir() {
        cy.get(this.incluirMateriaPrimaButton).should('be.visible')
    }
}

export default new IncluirMateriaPrimaAction;