import ConsultarDadosBasicosAction from '../../support/actions/dados-basicos/consultar-dados-basicos-action'

import Acesso from '../../support/actions/components/acesso'
import Cabecalho from '../../support/actions/components/cabecalho'
import Mensagem from '../../support/actions/components/mensagem'

describe('Consultar dados básicos perfil: Cliente', function () {

    beforeEach(function () {
        cy.fixture('dados-basicos').then((massa) => {
            this.dadosBasicos = massa;
        })
        cy.loginUnico('cliente', 'cnpjRepresentado')
        cy.visitarPagina('/lowcomex/#/consulta-requisicao')
    })

    it('Consultar dados básicos - perfil : Cliente', function () {
        ConsultarDadosBasicosAction.verificarFormulario('consultarRequisicao', 'Consulta de Requisição')
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.requisicao.emElaboracao);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.requisicao.emElaboracao);
        Cabecalho.verificarCabecalho(this.dadosBasicos.requisicao.emElaboracao);
        ConsultarDadosBasicosAction.verificarFormulario('exibirRequisicao', 'Requisição ' + this.dadosBasicos.requisicao.emElaboracao);
        ManterDadosBasicosAction.verificarDadosFormulario('consultarRequisicao', this.dadosBasicos.requisicao.emElaboracao, true);
    })

    it('Verificar que o número do Requisição não foi informado', function () {
        ConsultarDadosBasicosAction.consultar('');
        Mensagem.mensagemRetornada("Mensagem de validação aqui!");
        Mensagem.mensagemCampo("Campo obrigatório");
    })

    it('Consultar Requisição invalido', function () {
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.requisicao.invalido);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.requisicao.invalido);
        Mensagem.mensagemRetornada("Mensagem de validação aqui!")
    })

    it('Verificar que o número do Requisição não foi cadastrado', function () {
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.requisicao.inexistente);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.requisicao.inexistente);
        Mensagem.mensagemRetornada("Mensagem de validação aqui!" + this.dadosBasicos.requisicao.inexistente)
    })

    it('Verificar que o usuário não é representante legal do Requisição', function () {
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.requisicao.naoRepresentado);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.requisicao.naoRepresentado);
        Mensagem.mensagemRetornada("Mensagem de validação aqui!");
    })

    it('Selecionar o botão limpar após informar os dados do Requisicao', function () {
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.requisicao.emElaboracao);
        ConsultarDadosBasicosAction.limpar();
        ConsultarDadosBasicosAction.verificarDadosFormulario(this.dadosBasicos.requisicao.emElaboracao, false);
    })

    it('Exportar dados do Requisicao', function () {
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.requisicao.emElaboracao);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.requisicao.emElaboracao, false);
        ConsultarDadosBasicosAction.exportar();
    })

})

describe('Consultar dados básicos perfil: Gerente', function () {

    before(function () {
        cy.visit('portal/')

        cy.fixture('dados-basicos').then((massa) => {
            this.dadosBasicos = massa;
        })

    })

    it('Consultar dados básicos - perfil : Gerente', function () {
        Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', 'gerente', this.dadosBasicos.cnpj.representado);
        ConsultarDadosBasicosAction.verificarFormulario('consultarRequisicao', 'Consulta de Requisição')
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.requisicao.emElaboracao);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.requisicao.emElaboracao);
        Cabecalho.verificarCabecalho(this.dadosBasicos.requisicao);
        ConsultarDadosBasicosAction.verificarFormulario('exibirRequisicao', 'Requisição ' + this.dadosBasicos.requisicao.emElaboracao);
        ManterDadosBasicosAction.verificarDadosFormulario('consultarRequisicao', this.dadosBasicos.requisicao, true);
    })

})

describe('Consultar dados básicos perfil: Funcionário', function () {

    before(function () {
        cy.visit('portal/')

        cy.fixture('dados-basicos').then((massa) => {
            this.dadosBasicos = massa;
        })

    })

    it('Consultar dados básicos - perfil : Funcionário', function () {
        Acesso.acessarFormulario('/lowcomex/#/consulta-requisicao', 'funcionario', this.dadosBasicos.cnpj.representado);
        ConsultarDadosBasicosAction.verificarFormulario('consultarRequisicao', 'Consulta de Requisição')
        ConsultarDadosBasicosAction.preencherNumeroRequisicao(this.dadosBasicos.requisicao.emElaboracao);
        ConsultarDadosBasicosAction.consultar(this.dadosBasicos.requisicao.emElaboracao);
        Cabecalho.verificarCabecalho(this.dadosBasicos.requisicao);
        ConsultarDadosBasicosAction.verificarFormulario('exibirRequisicao', 'Requisição ' + this.dadosBasicos.requisicao.emElaboracao);
        ManterDadosBasicosAction.verificarDadosFormulario('consultarRequisicao', this.dadosBasicos.requisicao, true);
    })

})