import DetalharMateriaPrimaAction from "../../support/actions/materiaPrima/detalhar-materia-prima-action"
import ExibirMateriaPrimaAction from "../../support/actions/materiaPrima/exibir-materia-prima-action"
import ConsultarDadosBasicosAction from '../../support/actions/dados-basicos/consultar-dados-basicos-action'

import Acesso from '../../support/actions/components/acesso'

describe('Detalhar materiaPrima', () => {

    beforeEach(function () {
        cy.visit('portal/')

        cy.fixture('dados-basicos').then((massa) => {
            this.dadosBasicos = massa;
        })

        cy.fixture('materia-prima').then((massaMateriaPrima) => {
            this.materiaPrima = massaMateriaPrima;
        })
    })


    context('Detalhar materiaPrima por perfil', function () {

        const perfis = [
            { label: 'cliente', estadoRequisicao: 'em elaboracao' },
            { label: 'cliente', estadoRequisicao: 'em exigencia' },
            { label: 'cliente', estadoRequisicao: 'em retificacao' },
            { label: 'gerente', estadoRequisicao: 'em elaboracao' },
            { label: 'gerente', estadoRequisicao: 'em exigencia' },
            { label: 'gerente', estadoRequisicao: 'em retificacao' },
            { label: 'funcionario', estadoRequisicao: 'em elaboracao' },
            { label: 'funcionario', estadoRequisicao: 'em exigencia' },
            { label: 'funcionario', estadoRequisicao: 'em retificacao' }

        ]

        perfis.forEach(function (perfil) {
            it(`Detalhar materiaPrima para Requisicao ${perfil.estadoRequisicao} - Perfil:  ${perfil.label}`, function () {
                if (perfil.estadoRequisicao === 'em elaboracao') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emElaboracao;
                } else if (perfil.estadoRequisicao === 'em retificacao') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emRetificacao;
                    this.dadosBasicos.acContinuo.situacao.label = 'Em retificação'
                } else if (perfil.estadoRequisicao === 'em exigencia') {
                    var numeroRequisicao = this.dadosBasicos.numeroRequisicao.emExigencia;
                    this.dadosBasicos.requisicao.situacao.label = 'Em exigência'
                }

                Acesso.acessarFormulario('/lowcomex/#/consultar-requisicao', perfil.label, this.dadosBasicos.cnpj.representado);
                ConsultarDadosBasicosAction.preencherNumeroRequisicao(numeroRequisicao);
                ConsultarDadosBasicosAction.consultar(numeroRequisicao, true);
                ExibirMateriaPrimaAction.acessarAbaMateriaPrima();
                DetalharMateriaPrimaAction.acessarItem(numeroRequisicao);
                DetalharMateriaPrimaAction.verificarFormulario(this.dadosBasicos.requisicao);
                DetalharMateriaPrimaAction.verificarDadosFormulario(this.materiaPrima.itemMateriaPrima);
            })

        })

    })

})