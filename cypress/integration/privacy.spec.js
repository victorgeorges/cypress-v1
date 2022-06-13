/*it('teste de página independente' , function(){
    cy.visit('./src/privacy.html')
    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
})*/

//ele faz o teste
Cypress._.times(3, function(){
    it('teste de página independente' , function(){
        cy.visit('./src/privacy.html')
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
})