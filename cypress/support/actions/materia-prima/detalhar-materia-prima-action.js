import Cabecalho from '../components/cabecalho'

class DetalharMateriaPrimaAction {

    constructor() {
        this.CodItem = '#codItem'

        this.fecharButton = '#btnFechar'
    }

    acessarItem(requisicao) {
        cy.visit("/lowcodex/#/detalhar-item-materia-prima/" + requisicao + "&1&0")
    }

    verificarFormulario(dadosBasicos) {
        Cabecalho.verificarCabecalho(dadosBasicos);
        cy.get('.titulo').should('contain', 'Detalhamento do Item de Matéria Prima')
        cy.contains('Código do Item:')
        cy.contains('Descrição da Código do Item:')

        cy.get(this.fecharButton).should('exist')
    }

    verificarDadosFormulario() {
        cy.get(this.CodItem).should('be.visible')
        cy.get(this.CodItem).should('not.be.empty')
        cy.get('#descricaoCodItem').should('be.visible')
    }

    fechar() {
        cy.get(this.fecharButton).click();
    }


}

export default new DetalharMateriaPrimaAction;