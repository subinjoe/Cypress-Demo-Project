/**
 * This class defines Page Object model for home page in cntraveller website
 *
 * @class HomePage
 */


class HomePage{

    // constructor(){}

    getArticles(){
        return cy.get('.multi-packages>div:nth-child(2) .summary-item');
    }

    findRubric(){
        return cy.get(".summary-item__rubric");
    }

    findRubricLink(){
        return cy.get(".summary-item__content .rubric__link");
    }

    findHedLink(){
        return cy.get(".summary-item__hed-link");
    }

    findDek(){
        return cy.get(".summary-item__dek");
    }

    findAuthor(){
        return cy.get(".summary-item__byline__content .byline__name");
    }

    getImage(){
        return cy.get(".summary-item__asset-container .responsive-image__image");
    }

    getTrendingStoriesTitle(){
        return cy.get('.multi-packages .summary-collection-row .section-title__hed');
    }

    getTrendingStories(){
        return cy.get('.multi-packages .summary-collection-row .summary-item');
    }

    getContentEl(){
        return cy.get(".multi-packages>div:nth-child(2) .summary-item .summary-item__content");
    }

    getInspirationTitle(){
        return cy.get('.multi-packages>div:nth-child(5) .grid--item .section-title__hed');
    }

    getInspirations(){
        return cy.get('.multi-packages>div:nth-child(5) .summary-item--has-rule');
    }

    getDestinationGuidesTitle(){
        return cy.get('.multi-packages>div:nth-child(7) .grid--item .section-title__hed');
    }

    getDestinationGuides(){
        return cy.get('.multi-packages>div:nth-child(7) .summary-item--has-rule');
    }

    getTravelNewsTitle(){
        return cy.get('.multi-packages>div:nth-child(8) .grid--item .section-title__hed');
    }

    getTravelNews(){
        return cy.get('.multi-packages>div:nth-child(8) .summary-item--has-rule');
    }

    getPackingListTitle(){
        return cy.get('.multi-packages>div:nth-child(9) .grid--item .section-title__hed');
    }

    getPackingList(){
        return cy.get('.multi-packages>div:nth-child(9) .summary-item--has-rule');
    }

}

export default HomePage