
import Mensagem from './mensagem'

class CodItem {

    validarCodItem(inputCodItem) {
        // CodItem não existe 
        this.preencherCodItem(inputCodItem, "00000000")
        Mensagem.mensagemRetornada('Mensagem de validação genérica.')
        Mensagem.mensagemCampo("Mensagem de validação genérica.")

        //Descrição da CodItem não foi cadastrada
        this.preencherCodItem(inputCodItem, "11111111")
        Mensagem.mensagemRetornada("Mensagem de validação genérica.")
        Mensagem.mensagemCampo("Mensagem de validação genérica.")

        // CodItem informada não contém 8 digitos
        this.preencherCodItem(inputCodItem, "0101")
        Mensagem.mensagemCampo("Mensagem de validação genérica.");

        // // CodItem sem valor
        // this.limparCodItem(inputCodItem)
        // Mensagem.mensagemCampo("Campo obrigatório");
    }

    preencherCodItem(inputCodItem, codItem) {
        cy.get(inputCodItem).clear().type(codItem)
        cy.get(inputCodItem).focus().blur()
    }

    limparCodItem(inputCodItem) {
        cy.get(inputCodItem).clear().blur()
    }

}

export default new CodItem;