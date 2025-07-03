import ExcluirMateriaPrimaAction from '../../support/actions/materia-prima/excluir-materia-prima-action'

import Mensagem from '../../support/actions/components/mensagem'

describe('Excluir materia-prima', () => {

    beforeEach(function () {
        cy.visit('portal/');

        cy.fixture('dados-basicos').then((massa) => {
            this.dadosBasicos = massa;
        })

    })

    it('Usuário não confirma a exclusão do item de materia-prima', function () {
        ExcluirMateriaPrimaAction.acessarOpcaoExcluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes);
        ExcluirMateriaPrimaAction.confirmarExclusao(false, false)
        ExcluirMateriaPrimaAction.voltarOpcaoExcluir()
    })

    it('Usuário confirma a exclusão do item de materia-prima', function () {
        ExcluirMateriaPrimaAction.acessarOpcaoExcluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes);
        ExcluirMateriaPrimaAction.confirmarExclusao(true, false)
        Mensagem.mensagemRetornada('Mensagem de validação!')
    })

})
