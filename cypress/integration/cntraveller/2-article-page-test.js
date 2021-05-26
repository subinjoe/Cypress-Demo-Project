/// <reference types="cypress" />
const _ = Cypress._;

let articleItems = require('../../fixtures/article-items.json');

describe('Article Page Tests', () => {


  articleItems.forEach((value, index, array) => {

    it(`Test Article Section ${index}`, () => {

      cy.on('uncaught:exception', (err, runnable) => {
        expect(err.message).to.include("Cannot read property 'split' of undefined")
        return false
      })

      cy.clickArticle(index, value);

    })

  })

})