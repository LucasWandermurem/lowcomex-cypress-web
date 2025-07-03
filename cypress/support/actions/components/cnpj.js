import Mensagem from '../components/mensagem'

class CNPJ {

    validarCNPJ(inputCNPJ, cnpj) {
        //TODO: Melhororar verificação
        //CNPJs inválidos conhecidos
        this.preencherCNPJ(inputCNPJ, "00000000000000")
        Mensagem.mensagemCampo("CNPJ inválido")
        this.preencherCNPJ(inputCNPJ, "11111111111111")
        Mensagem.mensagemCampo("CNPJ inválido")
        this.preencherCNPJ(inputCNPJ, "22222222222222")
        Mensagem.mensagemCampo("CNPJ inválido")
        this.preencherCNPJ(inputCNPJ, "33333333333333")
        Mensagem.mensagemCampo("CNPJ inválido")
        this.preencherCNPJ(inputCNPJ, "44444444444444")
        Mensagem.mensagemCampo("CNPJ inválido")
        this.preencherCNPJ(inputCNPJ, "55555555555555")
        Mensagem.mensagemCampo("CNPJ inválido")
        this.preencherCNPJ(inputCNPJ, "66666666666666")
        Mensagem.mensagemCampo("CNPJ inválido")
        this.preencherCNPJ(inputCNPJ, "77777777777777")
        Mensagem.mensagemCampo("CNPJ inválido")
        this.preencherCNPJ(inputCNPJ, "88888888888888")
        Mensagem.mensagemCampo("CNPJ inválido")
        this.preencherCNPJ(inputCNPJ, "99999999999999")
        Mensagem.mensagemCampo("CNPJ inválido")

        //TODO: Implementar verificação do campo diferente de 8 e 14 posições
        //CNPJ diferente de 8 e 14 posições
        //CNPJ valido
        cnpj = cnpj.replace(/[^\d]+/g,'');
        var tamanho = cnpj.length - 2
        var soma = '0'
        
        for (i = tamanho; i <= 14; i++) {
            this.preencherCNPJ(inputCNPJ, soma)
            cy.get(inputCNPJ).should('have.value', soma)
            soma = soma.concat('1')
        }
        
    }

    preencherCNPJ(inputCNPJ, cnpj) {
        cy.get(inputCNPJ).clear().type(cnpj)
        cy.get(inputCNPJ).focus().blur()
    }
}

export default new CNPJ;