/// <reference types="cypress" />

import HomePage from '../../support/pageobject/home-page';

const _ = Cypress._;

describe.only('Home Page Test', () => {

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
            cy.writeFile("./cypress/fixtures/article-items.json", articleItems.items);

        });


        cy.visit('/');

    })

    it('Validate articles section', () => {

        homePage.getArticles().each(($el, index, $list) => {

            cy.assertCard($el, articleItems.items[index]);
            // homePage.findHedLink().should("have.attr", "href", articleItems.items[index].url);

        })
        // let image = homePage.findImage($el);
        // // expect(image, articleItems[index].image.sources.xxl.url)
        // // .to.have.attr("src", articleItems[index].image.sources.xxl.url.replace(',', '%2C'));
        // expect(image.src).to.be.visible;
    })

    it('Validate trending stories section', () => {

        homePage.getTrendingStoriesTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(trendingStories.dangerousHed);
            })

        homePage.getTrendingStories().each(($el, index, $list) => {

            cy.assertCard($el, trendingStories.items[index]);

        })
    })

    it('Validate inspiration section', () => {

        homePage.getInspirationTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(inspiration.dangerousHed);
            })

        homePage.getInspirations().each(($el, index, $list) => {

            cy.assertCard($el, inspiration.items[index]);


        })
    })

    it('Validate destination guides section', () => {

        homePage.getDestinationGuidesTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(destinationGuides.dangerousHed);
            })

        homePage.getDestinationGuides().each(($el, index, $list) => {

            cy.assertCard($el, destinationGuides.items[index]);


        })
    })

    it('Validate travel news section', () => {

        homePage.getTravelNewsTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(travelNews.dangerousHed);
            })

        homePage.getTravelNews().each(($el, index, $list) => {

            cy.assertCard($el, travelNews.items[index]);


        })
    })

    it('Validate packing list section', () => {

        homePage.getPackingListTitle().should('be.visible')
            .then(item => {
                expect(item).to.contain.text(packingList.dangerousHed);
            })

        homePage.getPackingList().each(($el, index, $list) => {
            cy.assertCard($el, packingList.items[index]);
        })
    })

});