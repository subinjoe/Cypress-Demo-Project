/// <reference types="cypress" />

import HomePage from '../../support/pageobject/home-page';

const _ = Cypress._;

describe('Home Page Test', () => {

    let articleItems = [];
    let trendingStories = [];
    let inspiration = [];
    let destinationGuides = [];
    let travelNews = [];
    let packingList = [];
    const homePage = new HomePage();

    before(() => {

        cy.request('https://www.cntraveler.com/?us_site=y&format=json').then((response) => {

            expect(response.status).to.eq(200);
            articleItems = _.get(response, 'body.bundle.containers.1', []);
            trendingStories = _.get(response, 'body.bundle.containers.2', []);
            inspiration = _.get(response, 'body.bundle.containers.4', []);
            destinationGuides = _.get(response, 'body.bundle.containers.6', []);
            travelNews = _.get(response, 'body.bundle.containers.7', []);
            packingList = _.get(response, 'body.bundle.containers.8', []);

        });

        cy
            .visit('/')
            .wait(10000);
    })

    it('Validate articles section', () => {

        homePage.getArticles().each(($el, index, $list) => {

            cy.assertSection($el, articleItems.items[index]);

        })

    })

    it('Validate trending stories section', () => {

        homePage.getTrendingStoriesTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(trendingStories.dangerousHed);
            })

        homePage.getTrendingStories().each(($el, index, $list) => {
            cy.assertSection($el, trendingStories.items[index]);
        })
    })

    it('Validate inspiration section', () => {

        homePage.getInspirationTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(inspiration.dangerousHed);
            })

        homePage.getInspirations().each(($el, index, $list) => {
            cy.assertSection($el, inspiration.items[index]);
        })
    })

    it('Validate destination guides section', () => {

        homePage.getDestinationGuidesTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(destinationGuides.dangerousHed);
            })

        homePage.getDestinationGuides().each(($el, index, $list) => {
            cy.assertSection($el, destinationGuides.items[index]);
        })
    })

    it('Validate travel news section', () => {

        homePage.getTravelNewsTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(travelNews.dangerousHed);
            })

        homePage.getTravelNews().each(($el, index, $list) => {
            cy.assertSection($el, travelNews.items[index]);
        })
    })

    it('Validate packing list section', () => {

        homePage.getPackingListTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(packingList.dangerousHed);
            })

        homePage.getPackingList().each(($el, index, $list) => {
            cy.assertSection($el, packingList.items[index]);
        })
    })


    it('Validate article page navigation', () => {

        articleItems.items.forEach((value, index, array) => {

            cy.validateArticleLink(index, value);

        })

    })

});
