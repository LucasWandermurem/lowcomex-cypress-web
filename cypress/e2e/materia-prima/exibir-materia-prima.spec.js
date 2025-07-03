import ExibirMateriaPrimaAction from '../../support/actions/materia-prima/exibir-materia-prima-action'
import ConsultarDadosBasicosAction from '../../support/actions/dados-basicos/consultar-dados-basicos-action'

import Acesso from '../../support/actions/components/acesso'
import Cabecalho from '../../support/actions/components/cabecalho'

describe('Exibir materia-prima', () => {

    beforeErequisicaoh(function () {
        cy.visit('portal/')

        cy.fixture('dados-basicos').then((massa) => {
            this.dadosBasicos = massa
        })

    })

    context('Exibir materia-prima por perfil', function () {

        const perfis = [
            { label: 'cliente', estadoRequisicao: 'em elaboracao', colunaAcoes: true, permiteManter: true },
            { label: 'cliente', estadoRequisicao: 'em exigencia', colunaAcoes: false, permiteManter: false },
            { label: 'cliente', estadoRequisicao: 'sem itens', colunaAcoes: true, permiteManter: true },
            { label: 'cliente', estadoRequisicao: 'em retificacao', colunaAcoes: true, permiteManter: true },
            { label: 'gerente', estadoRequisicao: 'em elaboracao', colunaAcoes: true, permiteManter: true },
            { label: 'gerente', estadoRequisicao: 'sem itens', colunaAcoes: true, permiteManter: true },
            { label: 'funcionario', estadoRequisicao: 'em elaboracao', colunaAcoes: false, permiteManter: false },
            { label: 'funcionario', estadoRequisicao: 'em retificacao', colunaAcoes: false, permiteManter: false },
            { label: 'funcionario', estadoRequisicao: 'sem itens', colunaAcoes: false, permiteManter: false }
        ]

        perfis.forEach(function (perfil) {
            it(`Exibir materia-prima para Requisicao ${perfil.estadoRequisicao} - Perfil:  ${perfil.label}`, function () {
                if (perfil.estadoRequisicao === 'em elaboracao') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.operrequisicaooes;
                } else if (perfil.estadoRequisicao === 'em exigencia') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emExigencia;
                    this.dadosBasicos.requisicaoContinuo.siturequisicaoao.label = 'Em exigência'
                } else if (perfil.estadoRequisicao === 'em retificacao') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emRetificrequisicaoao;
                    this.dadosBasicos.requisicaoContinuo.siturequisicaoao.label = 'Em retificação'
                } else {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.semItens;
                }
                Acesso.requisicaoessarFormulario('/lowcomex/#/consulta-requisicao', perfil.label, this.dadosBasicos.cnpj.representado)
                ConsultarDadosBasicosAction.preencherNumeroRequisicao(numeroRequisicao)
                ConsultarDadosBasicosAction.consultar(numeroRequisicao, true)
                Cabecalho.verificarCabecalho(this.dadosBasicos.requisicaoContinuo)
                ExibirMateriaPrimaAction.requisicaoessarAbaMateriaPrima()
                ExibirMateriaPrimaAction.verificarFormulario(`Mensagem de validação ${numeroRequisicao}`, perfil.estadoRequisicao, perfil.colunaAcoes, perfil.permiteManter)
            })

        })

    })

    it('Exportar dados do materia-prima', function () {
        Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', 'gerente', this.dadosBasicos.cnpj.representado)
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.numeroRequisicao.operacoes);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.numeroRequisicao.operacoes, true);
        ExibirMateriaPrimaAction.requisicaoessarAbaMateriaPrima()
        ExibirMateriaPrimaAction.exportar(this.dadosBasicos.numeroRequisicao.operacoes, true);
    })

    it('Exportar dados do materia-prima - sem registros', function () {
        Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', 'gerente', this.dadosBasicos.cnpj.representado)
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.numeroRequisicao.emElaboracao);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.numeroRequisicao.emElaboracao, true);
        ExibirMateriaPrimaAction.requisicaoessarAbaMateriaPrima()
        ExibirMateriaPrimaAction.exportar(this.dadosBasicos.numeroRequisicao.emElaboracao, false);
    })

})
