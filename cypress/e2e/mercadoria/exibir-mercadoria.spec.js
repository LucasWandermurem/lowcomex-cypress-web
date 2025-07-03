import ExibirMercadoriaAction from '../../support/actions/mercadoria/exibir-mercadoria-action'
import ConsultarDadosBasicosAction from '../../support/actions/dados-basicos/consultar-dados-basicos-action'
import Acesso from '../../support/actions/components/acesso'
import Cabecalho from '../../support/actions/components/cabecalho'


describe('Exibir mercadoria', () => {

    beforeEach(function () {
        cy.visit('portal/');

        cy.fixture('dados-basicos').then((massa) => {
            this.dadosBasicos = massa;
        })

    })

    context('Exibir mercadoria por perfil', function () {

        const perfis = [
            { label: 'cliente', estadoRequisicao: 'muitos mercadorias', colunaAcoes: true, permiteManter: true },
            { label: 'cliente', estadoRequisicao: 'em retificacao', colunaAcoes: true, permiteManter: true },
            { label: 'gerente', estadoRequisicao: 'em elaboracao', colunaAcoes: true, permiteManter: true },
            { label: 'gerente', estadoRequisicao: 'sem itens', colunaAcoes: true, permiteManter: true },
            { label: 'gerente', estadoRequisicao: 'em retificacao', colunaAcoes: true, permiteManter: true },
            { label: 'funcionario', estadoRequisicao: 'em elaboracao', colunaAcoes: false, permiteManter: false },
            { label: 'funcionario', estadoRequisicao: 'sem itens', colunaAcoes: false, permiteManter: false },
            { label: 'funcionario', estadoRequisicao: 'em retificacao', colunaAcoes: false, permiteManter: false }
        ]

        perfis.forEach(function (perfil) {
            it(`Exibir mercadoria para Requisicao ${perfil.estadoRequisicao} - Perfil:  ${perfil.label}`, function () {
                if (perfil.estadoRequisicao === 'em elaboracao') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emElaboracao;
                } else if (perfil.estadoRequisicao === 'muitos mercadorias') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.muitasEntidades;
                } else if (perfil.estadoRequisicao === 'em exigencia') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emExigencia;
                    this.dadosBasicos.acContinuo.situacao.label = 'Em exigência'
                } else if (perfil.estadoRequisicao === 'em retificacao') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emRetificacao;
                    this.dadosBasicos.acContinuo.situacao.label = 'Em retificação'
                } else {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.semItens;
                }
                Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', perfil.label, this.dadosBasicos.cnpj.representado);
                ConsultarDadosBasicosAction.preencherNumeroRequisicao(numeroRequisicao);
                ConsultarDadosBasicosAction.consultar(numeroRequisicao, true);
                Cabecalho.verificarCabecalho(this.dadosBasicos.acContinuo);
                ExibirMercadoriaAction.verificarFormulario(`Requisição ${numeroRequisicao}`, perfil.estadoRequisicao, perfil.colunaAcoes, perfil.permiteManter)
            })

        })

    })

    it('Exportar dados do mercadoria', function () {
        Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', 'gerente', this.dadosBasicos.cnpj.representado)
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.numeroRequisicao.operacoes);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.numeroRequisicao.operacoes, true);
        ExibirMercadoriaAction.acessarAbaMercadoria()
        ExibirMercadoriaAction.exportar(this.dadosBasicos.numeroRequisicao.operacoes, true);
    })

    it('Exportar dados do mercadoria - sem registros', function () {
        Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', 'gerente', this.dadosBasicos.cnpj.representado)
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.numeroRequisicao.emElaboracao);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.numeroRequisicao.emElaboracao, true);
        ExibirMercadoriaAction.acessarAbaMercadoria()
        ExibirMercadoriaAction.exportar(this.dadosBasicos.numeroRequisicao.emElaboracao, false);
    })

})
