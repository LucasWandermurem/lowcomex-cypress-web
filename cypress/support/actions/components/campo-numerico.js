import Mensagem from "./mensagem";

class CampoNumerico {
    //TODO: Aplicar melhorias de verificação
    //TODO: Passar os valores por parametro: Min, Max, decimais, entre outros...
    //TODO: Retirar ids relacionados ao campo quantidade de kg líquido passando por parametro caso necessário 
    validarCampoNumerico(inputCampoNumerico) {
        
        // Campo numérico com valor válido
        if (inputCampoNumerico === '#lrc_quantidadeQuilogramaLiquido' || inputCampoNumerico === '#lip_quantidadeQuilogramaLiquido') {
            // Campo numérico com 14 inteiros
            this.preencherCampoNumerico(inputCampoNumerico, '10000000000000')
            cy.get(inputCampoNumerico).should('have.value', '10.000.000.000.000')
        } else {
            // Campo numérico com 10 inteiros
            this.preencherCampoNumerico(inputCampoNumerico, "10000000000")
            cy.get(inputCampoNumerico).should('have.value', "1.000.000.000")
        }

        // Campo numerico com 7 decimais
        this.preencherCampoNumerico(inputCampoNumerico, "1,00000000")
        cy.get(inputCampoNumerico).should('have.value', '1,0000000')

        // Campo numérico com valor zerado
        var valorZerado = '0'
        for (var i = 0; i < 9; i++) {
            if ( i == 0 ) {
                this.preencherCampoNumerico(inputCampoNumerico, valorZerado)
                Mensagem.mensagemCampo("Valor inválido")
            } else if ( i == 1 ) {
                valorZerado = valorZerado.concat(',')
            } else {
                valorZerado = valorZerado.concat('0')
            }
                this.preencherCampoNumerico(inputCampoNumerico, valorZerado)
                Mensagem.mensagemCampo("Valor inválido")
            
         }

        // Campo numérico somente com decimal
        var somenteDecimal = '0,1'
        for (var i = 0; i < 7; i++) {
                this.preencherCampoNumerico(inputCampoNumerico, somenteDecimal)
                cy.get(inputCampoNumerico).should('have.value', somenteDecimal)

                somenteDecimal = somenteDecimal.concat('1')
         }

        // Campo numérico com valor separada por "."
        this.preencherCampoNumerico(inputCampoNumerico, "0.1")
        cy.get(inputCampoNumerico).should('be.empty')

        // Campo numérico preenchido com caracter de espaço " "
        this.preencherCampoNumerico(inputCampoNumerico, "     ")
        cy.get(inputCampoNumerico).should('be.empty')

        // Campo numérico preenchido com caracter
        this.preencherCampoNumerico(inputCampoNumerico, "adadadsad")
        cy.get(inputCampoNumerico).should('be.empty')

        // Campo numérico com valor negativo - sera retirado ao validar o min e max
        this.preencherCampoNumerico(inputCampoNumerico, "-1")
        cy.get(inputCampoNumerico).should('have.value', '1')
    }

    preencherCampoNumerico(inputCampoNumerico, valor){
        cy.get(inputCampoNumerico).clear().type(valor)
        cy.get(inputCampoNumerico).focus().blur()
    }
}

export default new CampoNumerico;