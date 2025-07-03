import ConsultarDadosBasicosAction from '../dados-basicos/consultar-dados-basicos-action'

import Acesso from '../components/acesso'

class AlterarMercadoriaAction {

    constructor() {
        this.labelCodItem = '#p-panel-5 label[for="codigoCodItem"]'
        this.labelDescricaoCodItem = '#p-panel-5 label[class="control-label"]'
        this.labelQuantidadeQuilogramaLiquido = '#p-panel-5 label[for="quantidadeQuilogramaLiquido"]'
        this.labelQuantidadeUnidadeComercialização = '#p-panel-5 label[for="quantidadeUnidadeComercializacao"]'
        this.labelUnidadeComercializacao = '#p-panel-5 label[for="unidadeComercializacao"]'

        this.inputCodItem = '#codigoCodItem'
        this.inputQtdeUnidadeComercializacao = '#lip_quantidadeUnidadeComercializacao'
        this.inputUnidadeComercializacao = '#lip_unidadeComercializacao'
        this.inputQtdeQuilogramaLiquido = '#lip_quantidadeQuilogramaLiquido'

        this.descricaoCodItem = '#descricaoCodItem.text-muted'

        this.editarMercadoriaButton = '#btnEditarMercadoria'
        this.salvarButton = '#btnSalvar'
        this.cancelarButton = '#p-panel-5 #btnCancelar'
        this.btnSim = '#btnSim'
        this.btnNao = '#btnNao'
}

    acessarOpcaoAlterar(perfil, cnpj, requisicao) {
        Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', perfil, cnpj);
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(requisicao);
        ConsultarDadosBasicosAction.consultar(requisicao, true);

        //clicar na aba mercadorias
        cy.get('#p-tabpanel-2-label').should('contain', 'Mercadorias').click()
        
        //Acessar último registro: .last = procura ultimo td com mesmo nome, .parent = mantem dentro do td, .find = localiza o #btnExcluirInsumo dentro do 'parent'
        cy.get('td.p-resizable-column.text-center.last-cell.ng-star-inserted').last().parent().find(this.editarMercadoriaButton).click()
    }

    verificarFormulario(numeroItemMercadoria) {

        //TODO: melhorar verificação identificando numero do item correto
        cy.get('#p-panel-5-titlebar').should('contain', 'Alteração do Item de Mercadoria ')
        cy.get(this.labelCodItem).should('contain', 'CodItem:')
        cy.get(this.labelDescricaoCodItem).should('contain', 'Descrição da CodItem:')
        cy.get(this.labelQuantidadeQuilogramaLiquido).should('contain', 'Quantidade em kg líquido:')
        cy.get(this.labelQuantidadeUnidadeComercialização).should('contain', 'Quantidade na unidade de comercialização:')
        cy.get(this.labelUnidadeComercializacao).should('contain', 'Unidade de comercialização:')

        // Verificar classe e quantidade de campos obrigatórios 
        cy.get(this.labelCodItem).should('have.class', 'control-label required')
        cy.get('#p-panel-5 .control-label.required').should('have.length', 1)

        cy.get(this.salvarButton).should('be.visible')
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
        cy.get(this.inputCodItem).type(itemMercadoria.codItem)
        cy.get(this.descricaoCodItem).should('be.visible')
        cy.get(this.inputQtdeQuilogramaLiquido).clear()
        cy.get(this.inputQtdeQuilogramaLiquido).type(itemMercadoria.quantidadeQuilogramaLiquido).focus().blur()
        cy.get(this.inputQtdeUnidadeComercializacao).clear()
        cy.get(this.inputQtdeUnidadeComercializacao).type(itemMercadoria.quantidadeUnidadeComercializacao).focus().blur()
        cy.get(this.inputUnidadeComercializacao).should('be.visible')
        if (informarUCom === true) {
            cy.get('#p-panel-5 .control-label.required').should('have.length', 3)
            cy.get(this.inputUnidadeComercializacao).type(itemMercadoria.unidadeComercializacao, { force: true })
        }

        // Verificar limite de caracteres no campo
        let charsRestantes = 3900 - itemMercadoria.descricaoItem.length
        cy.get('#charsRestantes').should('contain', `${charsRestantes} caracteres restantes`)
    }

    limparFormulario() {
        cy.get(this.inputCodItem).clear()
        cy.get(this.inputQtdeQuilogramaLiquido).clear()
        cy.get(this.inputQtdeUnidadeComercializacao).clear()
    }

    preencherCodItem(codItem) {
        cy.get(this.inputCodItem).clear().type(codItem)
    }

    salvar() {
        cy.get(this.salvarButton).click();
    }

    cancelar() {
        cy.get(this.cancelarButton, { force: true }).click()
        cy.contains("Lista de Itens de Mercadorias")
    }

    voltarOpcaoAlterar() {
        cy.get(this.editarMercadoriaButton).should('be.visible')
    }
    
}

export default new AlterarMercadoriaAction;