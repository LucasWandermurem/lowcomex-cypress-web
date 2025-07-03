class Acesso {

    acessarFormulario(pagina, perfil, cnpj) {
        cy.autenticar(perfil, '1245678901', cnpj)
        cy.visitarPagina(pagina)
    }
}

export default new Acesso;