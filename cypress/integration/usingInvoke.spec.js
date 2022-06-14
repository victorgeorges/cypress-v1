describe('Central de Atendimento ao Cliente TAT ',function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('exibe e esconde as mensagens de sucesso e error usando invoke' , function(){
    cy.get('.success').should('not.be.visible').invoke('show').should('be.visible')
    .and('contain' ,'Mensagem enviada com sucesso.').invoke('hide').should('not.be.visible')

    cy.get('.error').should('not.be.visible').invoke('show').should('be.visible')
    .and('contain' ,'Valide os campos obrigatórios!').invoke('hide').should('not.be.visible')
    })


    it('preenche área de texto usando invoke' , function(){
        //esse cypress._. é o uso do lodash(._) 
        const $longText = Cypress._.repeat('0123456789' , 20)
        // uma possibilidade(sem invoke):  cy.get('#open-text-area').type($longText)
        cy.get('#open-text-area').invoke('val',$longText).should('have.value' , $longText)
    })


    // ACESSO AO QUE RETORNA DENTRO DA PÁGINA HTML E VERIFICA SE TEM OS ITEMS QUE TU QUER.
    //ENTRA DENTRO DE UMA FUNÇÃO DE CALL BACK RECEBE A RESPOSTA DA REQ
    //DESESTRUTURA E ACESSA AS INFO QUE TU QUER (status, statusText, body)
    it.only('faz uma requisição HTTP' , function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should(function($res){
            //console.log($res) -> para verificar o que ele retorna
            //tu acessando(desestruturando os objetos em JS)
            const {status, statusText, body} = $res
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
            
        })
    })
})