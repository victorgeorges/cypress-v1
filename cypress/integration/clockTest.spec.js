describe('Central de Atendimento ao Cliente TAT ',function(){
    //boa prática para que seja realizado os testes (ele sempre volta pra ca/FUNÇAO DE CALLBACK()
    const THREE_SEC = 3000

    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    //(nome da função, função de callback())
    it('verifica o título da aplicação', function(){
        //compara para ver se o título é igual ao passado
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    
    it('preencher os campos obrigatórios e acerta o email', function() {
        //..clock() congela o relógio do navegador
        cy.clock()

        cy.get('#firstName').type('vi') 
        cy.get('#lastName').type('gs')
        cy.get('#email').type('v.g@g.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

        // acelera o relógio do navegador pra não ficar parado esperando dar timeout pelo erro existente 
        cy.tick(THREE_SEC)

        cy.get('.success').should('not.be.visible')
    })

})


