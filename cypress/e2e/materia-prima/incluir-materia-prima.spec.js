import IncluirMateriaPrimaAction from '../../support/actions/materia-prima/incluir-materia-prima-action'

import Mensagem from '../../support/actions/components/mensagem'
import CodItem from '../../support/actions/components/codItem'

describe('Incluir Item de Matéria-Prima', () => {

    beforeEach(function () {
        cy.visit('portal/');

        cy.fixture('dados-basicos').then((massaDadosBasicos) => {
            this.dadosBasicos = massaDadosBasicos;
        })

        cy.fixture('materiaPrima').then((massaMateriaPrima) => {
            this.materiaPrima = massaMateriaPrima;
        })

        cy.fixture('codItem').then((massaCodItem) => {
            this.codItem = massaCodItem;
        })
    })

    it('Apresentar formulario para incluir item matéria-prima', function () {
        IncluirMateriaPrimaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao.operacoes);
        IncluirMateriaPrimaAction.verificarFormulario('Inclusão de Matéria Prima')
    })

    it('Incluir item de matéria-prima', function () {
        IncluirMateriaPrimaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao.operacoes);
        IncluirMateriaPrimaAction.preencherFormulario(this.materiaPrima.itemMateriaPrima)
        IncluirMateriaPrimaAction.salvar();
        Mensagem.mensagemRetornada('Mensagem de validação!')
    })

    it('Selecionar o botão limpar após informar os dados do item de Matéria-prima', function () {
        IncluirMateriaPrimaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao.operacoes);
        IncluirMateriaPrimaAction.preencherFormulario(this.materiaPrima.itemMateriaPrima)
        IncluirMateriaPrimaAction.limpar();
        IncluirMateriaPrimaAction.verificarDadosFormulario(this.materiaPrima.itemMateriaPrima, false);
    })

    it('Cancelar inclusão do item de Matéria-prima', function () {
        IncluirMateriaPrimaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao.operacoes);
        IncluirMateriaPrimaAction.preencherFormulario(this.materiaPrima.itemMateriaPrima)
        IncluirMateriaPrimaAction.cancelar();
        IncluirMateriaPrimaAction.voltarOpcaoIncluir();
    })

    it('Verificar que um ou mais campos não foram informados', function () {
        IncluirMateriaPrimaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao.operacoes);
        IncluirMateriaPrimaAction.salvar();
        Mensagem.mensagemRetornada("Mensagem de validação!");
        Mensagem.mensagemCampo("Campo obrigatório");
    })

    it('Verificar situações em que ocorre falha relacionado ao preenchimento da CodItem ou não está vigente ou não possui UME', function () {
        IncluirMateriaPrimaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao.operacoes);

        CodItem.validarCodItem('#codigoCodItem')

    })

    it('Verificar limite de registros na inclusão de item de matéria-prima', function () {
        IncluirMateriaPrimaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao.muitasEntidades, true);
        IncluirMateriaPrimaAction.preencherFormulario(this.materiaPrima.itemMateriaPrima)
        IncluirMateriaPrimaAction.salvar();
        Mensagem.mensagemRetornada('Mensagem de validação!')
    })

    it('Incluir item de materiaPrima - Em retificação', function () {
        IncluirMateriaPrimaAction.acessarOpcaoIncluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao.emRetificacao);
        IncluirMateriaPrimaAction.preencherFormulario(this.materiaPrima.itemMateriaPrima)
        IncluirMateriaPrimaAction.salvar();
        Mensagem.mensagemRetornada('Mensagem de validação!')
    })

})