# LowComex

Este repositório contém a automação de testes end-to-end desenvolvida com **Cypress** para simular cenários reais de uma aplicação web. O objetivo é demonstrar boas práticas de automação e qualidade de software em um contexto semelhante ao ambiente profissional.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de teste.

### 📋 Pré-requisitos

Antes de iniciar, verifique se você possui os seguintes itens instalados na sua máquina:

```
- [Node.js](https://nodejs.org/) (versão 16.x ou superior recomendada)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- Editor de código (ex: [VSCode](https://code.visualstudio.com/))
- Navegador compatível com o Cypress (Chrome, Edge ou Electron)
- Acesso à aplicação web que será testada (URL da aplicação)

> Para usuários Windows, recomenda-se rodar o terminal como administrador ao instalar as dependências.
```

## ⚙️ Executando os testes

Interface gráfica:
```
npx cypress open
```
Modo headless (CI):
```
npx cypress run
```

### 🔩 Analise os testes de ponta a ponta

Automatizar cenários críticos da aplicação **[Lowcomex]**, garantindo a validação de funcionalidades essenciais, como:

```
- Navegação entre páginas
- Validação de regras de negócio
- Testes negativos e de borda
```

## 🛠️ Construído com

* [Cypress](https://www.cypress.io/) - Framework principal de automação
* [Javascript] - Linguagem utilizada nos testes

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo LICENSE.md para detalhes.
