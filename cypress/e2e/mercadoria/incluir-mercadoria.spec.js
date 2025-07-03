import IncluirMercadoriaAction from "../../support/actions/mercadoria/incluir-mercadoria-action"

import Mensagem from '../../support/actions/components/mensagem'
import CodItem from '../../support/actions/components/codItem'

describe('Incluir Item de Mercadoria', () => {

    beforeEach(function () {
        cy.visit('portal/')

        cy.fixture('dados-basicos').then((massaDadosBasicos) => {
            this.dadosBasicos = massaDadosBasicos
        })

        cy.fixture('mercadoria').then((massaMercadoria) => {
            this.mercadoria = massaMercadoria
        })

        cy.fixture('codItem').then((massaCodItem) => {
            this.codItem = massaCodItem
        })

    })

    it('Apresentar formulario para incluir item mercadoria', function () {
        IncluirMercadoriaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)
        IncluirMercadoriaAction.verificarFormulario('Mensagem de validação')
    })

    it('Incluir item de mercadoria', function () {
        IncluirMercadoriaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)
        IncluirMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, true)
        IncluirMercadoriaAction.salvar()
        Mensagem.mensagemRetornada('Mensagem de validação')
    })

    it('Selecionar o botão limpar após informar os dados do item de mercadoria', function () {
        IncluirMercadoriaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)
        IncluirMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, true)
        IncluirMercadoriaAction.limpar()
        IncluirMercadoriaAction.verificarDadosFormulario(this.mercadoria.itemMercadoria, false)
    })

    it('Cancelar inclusão do item de mercadoria', function () {
        IncluirMercadoriaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)
        IncluirMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, true)
        IncluirMercadoriaAction.cancelar()
        IncluirMercadoriaAction.voltarOpcaoIncluir()
    })

    it('Verificar que um ou mais campos não foram informados', function () {
        IncluirMercadoriaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)
        IncluirMercadoriaAction.salvar()
        Mensagem.mensagemRetornada("Mensagem de validação")
        Mensagem.mensagemCampo("Campo obrigatório")

        IncluirMercadoriaAction.limpar()
        IncluirMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, false)
        IncluirMercadoriaAction.salvar()
        Mensagem.mensagemRetornada("Mensagem de validação")
        Mensagem.mensagemCampo("Campo obrigatório")
    })

    it('Verificar situações em que ocorre falha relacionado ao preenchimento dos campos numéricos', function () {
        IncluirMercadoriaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)
        this.mercadoria.itemMercadoria.quantidadeQuilogramaLiquido = "0,0"
        this.mercadoria.itemMercadoria.quantidadeUnidadeComercializacao = "0,0"
        IncluirMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, true)
        Mensagem.mensagemCampo("Valor inválido")
        IncluirMercadoriaAction.salvar()
        Mensagem.mensagemRetornada("Mensagem de validação")
    })

    it('Verificar situações em que ocorre falha relacionado ao preenchimento da CodItem ou não está vigente ou não possui UME', function () {
        IncluirMercadoriaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)

        CodItem.validarCodItem('#codigoCodItem')
    })

    it('Verificar limite de registros na inclusão de item de mercadoria', function () {
        IncluirMercadoriaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.muitasEntidades)
        IncluirMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, true)
        IncluirMercadoriaAction.salvar()
        Mensagem.mensagemRetornada('Mensagem de validação')
    })

    it('Incluir item de mercadoria - Em retificação', function () {
        IncluirMercadoriaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.emRetificacao)
        IncluirMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, true)
        IncluirMercadoriaAction.salvar()
        Mensagem.mensagemRetornada('Mensagem de validação')
    })

})
