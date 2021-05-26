class ArticlePage{

    getHeaderHed(){
        return cy.get(".content-header__hed");
    }

    getHeaderDek(){
        return cy.get(".content-header__dek");
    }

    getAuthor() {
        return cy.get(".byline__name");
    }
  
    getPublishDate() {
      return cy.get(".content-header__publish-date");
    }

}

export default ArticlePage