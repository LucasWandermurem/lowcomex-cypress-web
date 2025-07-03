import AlterarMateriaPrimaAction from '../../support/actions/materiaPrima/alterar-materiaPrima-action'

import Mensagem from '../../support/actions/components/mensagem'
import CodItem from '../../support/actions/components/cod-item'

describe('Alterar Item de MateriaPrima', () => {

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

    it('Apresentar formulario para alterar item materiaPrima', function () {
        AlterarMateriaPrimaAction.acessarOpcaoAlterar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao);
        AlterarMateriaPrimaAction.verificarFormulario()
    })

    it('Alterar item de materiaPrima', function () {
        AlterarMateriaPrimaAction.acessarOpcaoAlterar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao);
        AlterarMateriaPrimaAction.limparFormulario()
        AlterarMateriaPrimaAction.preencherFormulario(this.materiaPrima.itemMateriaPrima)
        AlterarMateriaPrimaAction.salvar();
        Mensagem.mensagemRetornada('Mensagem de validação!' + this.materiaPrima.itemMateriaPrima.numeroItemMateriaPrima)
    })

    it('Cancelar alteração do item de MateriaPrima', function () {
        AlterarMateriaPrimaAction.acessarOpcaoAlterar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao);
        AlterarMateriaPrimaAction.limparFormulario()
        AlterarMateriaPrimaAction.preencherFormulario(this.materiaPrima.itemMateriaPrima)
        AlterarMateriaPrimaAction.cancelar();
    })

    it('Verificar que um ou mais campos não foram informados', function () {
        AlterarMateriaPrimaAction.acessarOpcaoAlterar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao);
        AlterarMateriaPrimaAction.limparFormulario()
        AlterarMateriaPrimaAction.salvar();
        Mensagem.mensagemRetornada("Mensagem de validação!");
        Mensagem.mensagemCampo("Campo obrigatório");
    })

    it('Verificar situações em que ocorre falha relacionado ao preenchimento do Código do Item', function () {
        AlterarMateriaPrimaAction.acessarOpcaoAlterar('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.requisicao);

        CodItem.validarCodItem('#codItem')
    })

})