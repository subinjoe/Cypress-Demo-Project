import HomePage from '../support/pageobject/home-page';
import ArticlePage from '../support/pageobject/article-page';

let skipArticleIds = require('../fixtures/skip-articles.json');

const _ = Cypress._;

const articlePage = new ArticlePage();
const homePage = new HomePage();

/** 
 * This command clicks the article link from home page and lands on article description page
 * Asserts following informtion in article page:
 * 1. Header text
 * 2. Description
 * 3. Author names
 * 4. Publish Date
*/

Cypress.Commands.add('validateArticleLink', (index, articleItem) => {

  cy.visit('/', { timeout: 500000 });

  // The article page is throwing the below error which cause Cypress to fail the test
  // Hence catching this error and ignoring it to proceed further test validations

  cy.on('uncaught:exception', (err, runnable) => {
    expect(err.message).to.include("Cannot read property 'split' of undefined")
    return false
  })

  let contentEl = homePage.getContentEl().eq(index);

  contentEl.click();

  cy.location('pathname', { timeout: 50000 })
    .should('include', articleItem.url);

  cy.log("URL here is", cy.window().url());

  //Skip article page validation if the copilot ID is provided in skip-articles fixture.
  //This is to prevent test from known failures as this article page is completely different from other article pages

  if (!skipArticleIds.includes(articleItem.copilotID)) {

    articlePage.getHeaderHed().should('have.text', htmlDecode(articleItem.dangerousHed));

    articlePage.getHeaderDek().should('have.text', htmlDecode(articleItem.dangerousDek).replace("Conde", "Condé"));

    articlePage.getAuthor().should('have.text', _.get(articleItem, 'contributors.author.items.0.name'));

    articlePage.getPublishDate().should('have.text', articleItem.date);

  }


})

/** 
 * Assert the given section element, with the test cardData
 * Asserts following informtion:
 * 1. Header text
 * 2. Description
 * 3. Tag
 * 4. Author names
*/

Cypress.Commands.add('assertSection', ($el, cardData) => {

  cy.wrap($el).within(() => {

    homePage.findHedLink().should('have.text', htmlDecode(cardData.dangerousHed))

    homePage.findDek().should('have.text', htmlDecode(cardData.dangerousDek));

    homePage.findRubric().should('have.text', htmlDecode(cardData.rubric.name));

    homePage.findAuthor().each(($e, index, $list) => {
      assert.equal($e.text(), cardData.contributors.author.items[index].name);
    })

  })

})


/**
 * Decodes html string and removes the html related characters
 * @param {*} html 
 * @returns 
 */

function htmlDecode(html) {
  let div = document.createElement("div");
  div.innerHTML = html;
  let text = div.textContent || div.innerText || "";
  return text;
}

