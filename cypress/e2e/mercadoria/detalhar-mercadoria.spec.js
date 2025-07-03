import DetalharMercadoriaAction from "../../support/actions/mercadoria/detalhar-mercadoria-action"

describe('Detalhar Item de Mercadoria', () => {
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

    context('Detalhar mercadoria por perfil', function () {

        const perfis = [
            { label: 'cliente', estadoRequisicao: 'em elaboracao' },
            { label: 'cliente', estadoRequisicao: 'em retificacao'},
            { label: 'cliente', estadoRequisicao: 'em alteracao'},
            { label: 'gerente', estadoRequisicao: 'em elaboracao' },
            { label: 'gerente', estadoRequisicao: 'em retificacao'},
            { label: 'gerente', estadoRequisicao: 'em alteracao'},
            { label: 'funcionario', estadoRequisicao: 'em elaboracao' },
            { label: 'funcionario', estadoRequisicao: 'em retificacao'},
            { label: 'funcionario', estadoRequisicao: 'em alteracao'},
        ]
     
        perfis.forEach(function (perfil) {
            it(`Detalhar item de mercadoria para Requisicao ${perfil.estadoRequisicao} - Perfil: ${perfil.label}`, function () {

                switch (perfil.estadoRequisicao) {
                    case 'em elaboracao':
                        var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emElaboracao;
                        break;
                    case 'em retificacao':
                        var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emRetificacao;
                        this.dadosBasicos.acContinuo.situacao.label = 'Em retificação'
                        break;
                    default:
                        break;
                }

                DetalharMercadoriaAction.acessarOpcaoDetalhar(perfil.label, this.dadosBasicos.cnpj.representado, numeroRequisicao)
                DetalharMercadoriaAction.acessarItem(numeroRequisicao)
                DetalharMercadoriaAction.verificarFormulario()
                DetalharMercadoriaAction.verificarOutrasEntidades()
            })
        })

        it(`Fechar detalhamento do item de mercadoria`, function () {
            DetalharMercadoriaAction.acessarOpcaoDetalhar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.emElaboracao)
            DetalharMercadoriaAction.acessarItem(this.dadosBasicos.numeroRequisicao.emElaboracao)
            DetalharMercadoriaAction.fechar()
        })
    })
})