import ConsultarDadosBasicosAction from '../dados-basicos/consultar-dados-basicos-action'

import Acesso from '../components/acesso'

class ExibirMercadoriaAction {

    constructor() {
        this.inputCodItem = '#codigoCodItem'
        this.inputQtdeUnidadeComercializacao = '#p-panel-5-content #lip_quantidadeUnidadeComercializacao'
        this.inputUnidadeComercializacao = '#p-panel-5-content #lip_unidadeComercializacao'
        this.inputQtdeQuilogramaLiquido = '#p-panel-5-content #lip_quantidadeQuilogramaLiquido'

        this.salvarButton = '#btnSalvar'
        this.limparButton = '#btnLimpar'
        this.cancelarButton = '#p-panel-5-content #btnCancelar'
    }

    acessarOpcaoIncluir(perfil, cnpj, numeroRequisicao) {
        Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', perfil, cnpj);
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(numeroRequisicao);
        ConsultarDadosBasicosAction.consultar(numeroRequisicao, true);

        //clicar na aba mercadorias
        cy.get('#p-tabpanel-2-label').should('contain', 'Mercadorias').click()
        cy.get('#listaItensMercadoria .grid-title').should('contain', 'Lista de Itens de Mercadorias')
        cy.get('#btnIncluirItemMercadoria').should('contain', 'Incluir Mercadoria').click()
    }
    verificarFormulario(titulo, estadoRequisicao, colunaAcoes, permiteManter) {

        cy.get('#p-panel-5_header').should('contain', 'Inclusão de Item de Mercadoria')

        cy.get('#p-panel-5-content label[for="codigoCodItem"]').should('contain', 'CodItem:')
        cy.get('#p-panel-5-content label[class="control-label"]').should('contain', 'Descrição da CodItem:')
        cy.get('#p-panel-5-content label[for="quantidadeQuilogramaLiquido"]').should('contain', 'Quantidade em kg líquido:')
        cy.get('#p-panel-5-content label[for="quantidadeUnidadeComercializacao"]').should('contain', 'Quantidade na unidade de comercialização:')
        cy.get('#p-panel-5-content label[for="unidadeComercializacao"]').should('contain', 'Unidade de comercialização:')

        // Verificar classe e quantidade de campos obrigatórios 
        cy.get('#p-panel-5-content label[for="codigoCodItem"]').should('have.class', 'control-label required')
        cy.get('#p-panel-5-content label[for="unidadeComercializacao"]').should('not.have.class', 'control-label required')
        cy.get('.control-label.required').should('have.length', 2)

        cy.get(this.salvarButton).should('be.visible')
        cy.get(this.limparButton).should('be.visible')
        cy.get(this.cancelarButton).should('exist')
    }

    verificarDadosFormulario(itemMercadoria, existe) {
        if (existe === false) {
            cy.get(this.inputCodItem).should('not.have.value', itemMercadoria.codItem)
            cy.get(this.inputQtdeUnidadeComercializacao).should('not.have.value', itemMercadoria.quantidadeUnidadeComercializacao)
            cy.get(this.inputUnidadeComercializacao).should('not.have.value', itemMercadoria.unidadeComercializacao)
            cy.get(this.inputQtdeQuilogramaLiquido).should('not.have.value', itemMercadoria.quantidadeQuilogramaLiquido)
        } else {
            cy.get('#numRequisicao').should('contain', requisicao)
        }
    }

    preencherFormulario(itemMercadoria, informarUCom) {
        cy.get(this.inputCodItem).type(itemMercadoria.codItem).focus().blur()
        // cy.get(this.inputDescricaoComplementar).focus()
        cy.get('#p-panel-5-content #descricaoCodItem').should('be.visible')
        cy.get(this.inputQtdeQuilogramaLiquido).type(itemMercadoria.quantidadeQuilogramaLiquido)
        cy.get(this.inputQtdeUnidadeComercializacao).type(itemMercadoria.quantidadeUnidadeComercializacao)
        cy.get(this.inputUnidadeComercializacao).should('be.visible')
        if (informarUCom === true) {
            cy.get('.control-label.required').should('have.length', 3)
            cy.get(this.inputUnidadeComercializacao).type(itemMercadoria.unidadeComercializacao, { force: true })
        }

    }

    preencherCodItem(codItem) {
        cy.get(this.inputCodItem).clear().type(codItem)
    }

    salvar() {
        cy.get(this.salvarButton).click();
    }

    limpar() {
        cy.get(this.limparButton).click()
    }

    cancelar() {
        cy.get(this.cancelarButton, { force: true }).click()
    }

    voltarOpcaoIncluir() {
        cy.get('#btnIncluirItemMercadoria').should('be.visible')
    }

    clicarOpcaoIncluir() {
        cy.get('#btnIncluirItemMercadoria').should('be.visible').click()
    }

}

export default new ExibirMercadoriaAction;