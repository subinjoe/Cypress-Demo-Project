import HomePage from '../support/pageobject/home-page';
import ArticlePage from '../support/pageobject/article-page';

const _ = Cypress._;

const articlePage = new ArticlePage();
const homePage = new HomePage();


Cypress.Commands.add('clickArticle', (index, articleItem) => {

  cy.visit('/', { timeout: 500000 });

  let contentEl = homePage.getContentEl().eq(index);

  contentEl.click();

  cy.location('pathname', { timeout: 50000 })
    .should('include', articleItem.url);

  cy.log("URL here is", cy.window().url());

  articlePage.getHeaderHed().should('have.text', htmlDecode(articleItem.dangerousHed));

  articlePage.getHeaderDek().should('have.text', htmlDecode(articleItem.dangerousDek).replace("Conde", "Condé"));

  articlePage.getAuthor().should('have.text', _.get(articleItem, 'contributors.author.items.0.name'));

  articlePage.getPublishDate().should('have.text', articleItem.date);

})


Cypress.Commands.add('assertCard', ($el, cardData) => {

  cy.wrap($el).within(() => {

    homePage.findHedLink().should('have.text', htmlDecode(cardData.dangerousHed))

    homePage.findDek().should('have.text', htmlDecode(cardData.dangerousDek));

    homePage.findRubric().should('have.text', htmlDecode(cardData.rubric.name));

    homePage.findAuthor().each(($e, index, $list) => {
      assert.equal($e.text(), cardData.contributors.author.items[index].name);
    })

  })

})


function htmlDecode(html) {
  let div = document.createElement("div");
  div.innerHTML = html;
  let text = div.textContent || div.innerText || "";
  return text;
}

  