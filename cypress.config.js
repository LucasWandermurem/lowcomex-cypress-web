const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseURL: 'URL DO SITE AQUI!',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
