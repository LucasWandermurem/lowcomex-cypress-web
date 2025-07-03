import AlterarMercadoriaAction from '../../support/actions/mercadoria/alterar-mercadoria-action'
import Mensagem from '../../support/actions/components/mensagem'
import CampoNumerico from '../../support/actions/components/campo-numerico'

describe('Alterar Item de Mercadoria', () => {

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
    
    context('Alterar mercadoria por perfil', function() {
        const perfis = [
            { label: 'cliente', estadoRequisicao: 'em elaboracao' },
            { label: 'cliente', estadoRequisicao: 'em retificacao'},
            { label: 'gerente', estadoRequisicao: 'em elaboracao' },
            { label: 'gerente', estadoRequisicao: 'em retificacao'},
        ]

        perfis.forEach(function (perfil) {
            it.only(`Alterar item de mercadoria para Requisicao ${perfil.estadoRequisicao} - Perfil: ${perfil.label}`, function () {
                switch (perfil.estadoRequisicao) {
                    case 'em elaboracao':
                        var numeroRequisicao = this.dadosBasicos.numeroRequisicao.operacoes;
                        break;
                    case 'em retificacao':
                        var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emRetificacao;
                        this.dadosBasicos.requisicao.situacao.label = 'Em retificação'
                        break;
                    default:
                        break;
                }
                
                AlterarMercadoriaAction.acessarOpcaoAlterar(perfil.label, this.dadosBasicos.cnpj.representado, numeroRequisicao)
                AlterarMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, true)
                AlterarMercadoriaAction.salvar()
                Mensagem.mensagemRetornada(`Mensagem de validação!`)
            })
        })
    })

    it('Apresentar formulario para alterar item mercadoria', function () {
        AlterarMercadoriaAction.acessarOpcaoAlterar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)
        AlterarMercadoriaAction.verificarFormulario(this.mercadoria.itemMercadoria.numeroItemMercadoria)
    })

    it('Cancelar alteração do item de mercadoria', function () {
        AlterarMercadoriaAction.acessarOpcaoAlterar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)
        AlterarMercadoriaAction.limparFormulario()
        AlterarMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, true)
        AlterarMercadoriaAction.cancelar()
    })

    it('Verificar que um ou mais campos não foram informados', function () {
        AlterarMercadoriaAction.acessarOpcaoAlterar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)
        AlterarMercadoriaAction.limparFormulario()
        AlterarMercadoriaAction.preencherFormulario(this.mercadoria.itemMercadoria, false)
        AlterarMercadoriaAction.salvar()
        Mensagem.mensagemRetornada("Mensagem de validação!")
        Mensagem.mensagemCampo("Campo obrigatório")
    })


    it('Verificar situações em que ocorre falha relacionado ao preenchimento dos campos numéricos', function () {
        AlterarMercadoriaAction.acessarOpcaoAlterar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes)

        CampoNumerico.validarCampoNumerico('#id-elemento')
        CampoNumerico.validarCampoNumerico('#id-elemento')
    })
})