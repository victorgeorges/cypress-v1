/*it('teste de página independente' , function(){
    cy.visit('./src/privacy.html')
    cy.contains('CAC TAT - Política de privacidade').should('be.visible')
})*/

//ele faz o teste 3x o teste de validação com a função de call back
//esse cypress._. é o uso do lodash(._) 
Cypress._.times(3, function(){
    
    it('teste de página independente' , function(){
        cy.visit('./src/privacy.html')
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
})