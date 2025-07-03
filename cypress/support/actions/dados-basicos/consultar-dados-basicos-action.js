class ConsultarDadosBasicosAction {

    constructor() {
        this.consultarButton = '#btnConsultar'
        this.limparButton = 'p-button[id=btnLimpar]'
        this.NumeroRequisicao = '#radio1'
        this.OutrosParametros = '#radio2'
    }

    verificarFormulario(operacao, titulo) {
        cy.get('.titulo').should('contain', titulo)

        if (operacao === 'consultarRequisicao') {
            cy.get('#p-panel-0_header').should('contain', 'Filtros da Consulta')
            cy.get('.control-label').should('contain', 'Tipo de consulta:')
            cy.get('#radio1').should('be.checked')
            cy.get('#radio2').should('not.be.checked')
            cy.get('.control-label').should('contain', 'Número da Requisição:')
            cy.get('#numRequisicao').should('be.visible')
            cy.get(this.consultarButton).should('be.visible')
            cy.get(this.limparButton).should('be.visible')

        } else {
            cy.get('.titulo').should('contain', titulo)
            cy.get('#ui-tabpanel-0-label').should('contain', 'Dados Básicos').should('be.visible')
            cy.contains('Número do Requisicao:')
            cy.contains('Versão do Requisicao:')
            cy.contains('Situação:')
            cy.contains('CNPJ do beneficiário:')
            cy.contains('Razão social do beneficiário')
            cy.contains('Regime:')
            cy.contains('Modalidade:')
            cy.contains('Tipo:')
        }
    }

    verificarDadosFormulario(requisicao, existe) {
        if (existe === false) {
            cy.get('#numRequisicao').should('not.have.value', requisicao)
        } else {
            cy.get('#numRequisicao').should('contain', requisicao)
        }
    }

    preencherNumeroRequisicao(requisicao) {
        const requisicaoFormatada = requisicao.replace(/Requisicao/g, "")
        cy.get('.div-principal').type(requisicaoFormatada)
    }

    verificarResultadoDeConsulta(tipoDeCodItem, codItem) {
        // cy.get('#p-panel-3_header').should('contain', 'Filtros da Consulta')
        // cy.get('#listaConsulta').should('contain', 'Número do ato')
        // cy.get('#listaConsulta').should('contain', 'CNPJ do beneficiário')
        // cy.get('#listaConsulta').should('contain', 'Situação')
        // cy.get('#listaConsulta').should('contain', 'Data da última situação')
        if (tipoDeCodItem == 'materia-prima') {
            cy.get('#p-tabpanel-1-label').click()
        } else if (tipoDeCodItem == 'mercadoria') {
            cy.get('#p-tabpanel-2-label').click()
        }
        cy.get('td[data-test="1CodItem"]').should('contain', codItem)
    }

    selecionarNumeroRequisicao() {
        cy.get(this.NumeroRequisicao).click()
    }

    consultar(requisicao, exibeRequisicao) {
        cy.get(this.consultarButton).click()
        if (exibeRequisicao === true) {
            cy.get('lowcomex-numero-requisicao-link').should('contain', requisicao)
            cy.visit("/lowcomex/#/exibir-requisicao/" + requisicao)
        }
    }

    limpar() {
        cy.get(this.limparButton).click()
    }

}

export default new ConsultarDadosBasicosAction;