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

describe('Signup page', () => {

    beforeEach(() => {
        cy.visit('/signup');
    });

    it('OK, signup page rendered successfully', () => {
        cy.get('.signup-form')
    });
    it('Signup page has 5 child elements', () => {
        cy.get('.signup-form').children().should('have.length', 5);
    });
    it('Test Signup a user', () => {
        cy.get('input[cy-data="name-input"]').type('Justin');
        cy.get('input[cy-data="email-input"]').type('jjustin634@gmail.com');
        cy.get('input[cy-data="pass-input"]').type('ThisIsAPassword123');
        cy.get('button[cy-data="button-submit"]').click();
    });
}); 

describe('Login page', () => {

    beforeEach(() => {
        cy.visit('/login');
    });

    it('OK, Login page rendered successfully', () => {
        cy.get('.login-form')
    });
    it('Signup page has 4 child elements', () => {
        cy.get('.login-form').children().should('have.length', 4);
    });
    it('Test Signup a user', () => {
        cy.get('input[cy-data="email-input"]').type('jjustin634@gmail.com');
        cy.get('input[cy-data="pass-input"]').type('ThisIsAPassword123');
        cy.get('button[cy-data="button-submit"]').click();
    });
}); 

describe('Shop page', () => {

    beforeEach(() => {
        cy.visit('/shop');
    });

    it('OK, Shop page rendered successfully', () => {
        cy.get('.shop-page-div')
    });
    it('Signup page has 1 child div', () => {
        cy.get('.shop-page-div').children().should('have.length', 1);
    });
    it('row-style has 2 child div', () => {
        cy.get('.row-style').children().should('have.length', 2);
    });
    it('category-filter has 4 child div', () => {
        cy.get('.category-filter').children().should('have.length', 4);
    });
    it('col-8 has 2 child div', () => {
        cy.get('.col-8').children().should('have.length', 2);
    });
}); 