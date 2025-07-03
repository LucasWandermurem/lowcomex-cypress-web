import ExcluirMercadoriaAction from '../../support/actions/Mercadoria/excluir-mercadoria-action'

import Mensagem from '../../support/actions/components/mensagem'

describe('Excluir mercadoria', () => {

    beforeEach(function () {
        cy.visit('portal/');

        cy.fixture('dados-basicos').then((massa) => {
            this.dadosBasicos = massa;
        })

    })

    it('Usuário não confirma a exclusão do item de mercadoria', function () {
        ExcluirMercadoriaAction.acessarOpcaoExcluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes);
        ExcluirMercadoriaAction.confirmarExclusao(false)
        ExcluirMercadoriaAction.voltarOpcaoExcluir()
    })

    it('Usuário confirma a exclusão do item de mercadoria', function () {
        ExcluirMercadoriaAction.acessarOpcaoExcluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.operacoes);
        ExcluirMercadoriaAction.confirmarExclusao(true)
        Mensagem.mensagemRetornada('Mensagem de validação!')
    })

    it('Usuário confirma a exclusão do item de mercadoria - Em retificação', function () {
        ExcluirMercadoriaAction.acessarOpcaoExcluir('gerente', this.dadosBasicos.cnpj.representado, this.dadosBasicos.numeroRequisicao.emRetificacao);
        ExcluirMercadoriaAction.confirmarExclusao(true)
        Mensagem.mensagemRetornada('Mensagem de validação!')
    })
})
