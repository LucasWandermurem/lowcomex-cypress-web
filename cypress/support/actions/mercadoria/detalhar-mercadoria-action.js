import ConsultarDadosBasicosAction from '../dados-basicos/consultar-dados-basicos-action'

import Acesso from '../components/acesso'
import Ajuda from "../components/ajuda"

class DetalharMercadoriaAction {

    constructor() {
        this.labelCodItem = '#p-fieldset-5 label[class="control-label"]'
        this.labelDescricaoCodItem = '#p-fieldset-5 label[class="control-label"]'
        this.labelQuantidadeKgLiquido = '#p-fieldset-5 label[class="control-label"]'
        this.labelQuantidadeUnidadeComercializacao = '#p-fieldset-5 label[class="control-label"]'
        this.labelUnidadeComercializacao = '#p-fieldset-5 label[class="control-label"]'

        this.fecharButton = '#btnFechar'
    }

    acessarOpcaoDetalhar(perfil, cnpj, numeroRequisicao) {
        Acesso.acessarFormulario('/lowcomex/#/consulta-ato', perfil, cnpj);
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(numeroRequisicao);
        ConsultarDadosBasicosAction.consultar(numeroRequisicao, true);

        //clicar na aba mercadorias
        cy.get('#p-tabpanel-2-label').should('contain', 'Mercadorias').click()

    }

    verificarFormulario() {

        cy.get('.p-fieldset-legend-text').should('contain', 'Dados do Mercadoria')

        cy.get(this.labelCodItem).should('contain', 'CodItem:')
        cy.get(this.labelDescricaoCodItem).should('contain', 'Descrição da CodItem:')    
        cy.get(this.labelQuantidadeKgLiquido).should('contain', 'Quantidade em kg líquido:')
        cy.get(this.labelQuantidadeUnidadeComercializacao).should('contain', 'Quantidade na unidade de comercialização:')
        cy.get(this.labelUnidadeComercializacao).should('contain', 'Unidade de comercialização:')
        cy.get(this.fecharButton).should('be.visible')
    }

    acessarItem(requisicao) {
        cy.visit("/lowcomex/#/detalhar-item-mercadoria/" + requisicao + "&1&0")
    }

    fechar() {
        cy.get(this.fecharButton).click()
    }

}

export default new DetalharMercadoriaAction;