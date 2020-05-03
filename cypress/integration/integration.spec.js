describe('e-ccomerce app home page', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('OK, Home page rendered successfully', () => {
        cy.get('.main-container')
    });

    it('Home page has 2 child elements', () => {
        cy.get('.main-container').children().should('have.length', 2);
    });

});

describe('e-ccomerce app', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('OK, Home page rendered successfully', () => {
        cy.get('.main-container')
    });

    it('Home page has 2 child elements', () => {
        cy.get('.main-container').children().should('have.length', 2);
    });

});