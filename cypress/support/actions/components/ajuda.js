import Mensagem from '../components/mensagem'

class Ajuda {
    validarAjuda(iconeAjuda, caixaTexto, textoAjuda) {
        cy.get(iconeAjuda).last().click()
        Mensagem.mensagemAjuda(caixaTexto, textoAjuda)
        cy.get(iconeAjuda).last().click()

    }
}

export default new Ajuda