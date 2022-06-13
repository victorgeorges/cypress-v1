/// <reference types="Cypress" />

//const { functionsIn } = require("cypress/types/lodash")
//const { first } = require("cypress/types/lodash")
//const { functionsIn } = require("cypress/types/lodash")

describe('Central de Atendimento ao Cliente TAT ',function(){
        //boa prática para que seja realizado os testes (ele sempre volta pra ca/FUNÇAO DE CALLBACK()
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    //(nome da função, função de callback())
    it('verifica o título da aplicação', function(){
        //compara para ver se o título é igual ao passado
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preencher os campos obrigatórios e acerta o email', function() {
        cy.get('#firstName').type('vi')
        cy.get('#lastName').type('gs')
        cy.get('#email').type('v.g@g.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it('preencher os campos obrigatórios e envia o formulário passa area errada', function(){
        cy.get('#firstName').type('vi')
        cy.get('#lastName').type('gs')
        cy.get('#email').type('v.g')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preencher o campo telefone com letra', function(){
        cy.get('#phone').type('vs').should('have.value','')
        /*é uma foma:cy.get('#phone').type('v.g')/cy.get('button[type="submit"]').click()/cy.get('.error').should('be.visible') */
    })

    it('tentar enviar o form sem o número, sendo que tu marcou número no checkbox', function(){
        cy.get('#phone-checkbox').click()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName').type('vi').should('have.value','vi').clear().should('have.value','')
        cy.get('#lastName').type('ge').should('have.value','ge').clear().should('have.value','')
        cy.get('#email').type('v@g.com').should('have.value','v@g.com').clear().should('have.value','')
        cy.get('#phone').type(9999).should('have.value',9999).clear().should('have.value','')
    })

    it('teste de verificação do envio de dados', function(){
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

        cy.get('#firstName').should('have.value' ,'')
        cy.get('#lastName').should('have.value' ,'')
        cy.get('#email').should('have.value' ,'')
        cy.get('#phone').should('have.value' ,'')
    })

    it('comandos personalizados',function(){
        cy.filMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('preenchendo lista suspensa', function(){ //aqui tem que ser .select() porque é lista suspensa
        cy.get('#product').select('YouTube').should('have.value' , 'youtube')
    })

    it('preenchendo lista suspensa', function(){
        //should(chave, valor)
        cy.get('#product').select('Mentoria').should('have.value' , 'mentoria')
    })
    it('preencher radiobutton', function(){
        //para radio tu passa o input dele e o value
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })

    //nesse each, ele itera, fazendo varias vezes a verificação e passando pelos pontos
    //wrap ele empacota esse código
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length' , 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checking boxes e depois desmarca o último ' , function(){
        cy.get('input[type="checkbox"]').check()
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
    })

    it('selecionar arquivos', function(){
        cy.get('#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json')
       //tu console.log para verificar as info do input do item pra validar o arquivo
       //depois disso tu pega o caminho do json pra colocar aqui e validar se ele subiu certo 
        cy.get('#file-upload').should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
            //console.log($input)
        })       
    })

    it('drag and drop', function(){
        cy.get('#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json',{action : "drag-drop"})
         cy.get('#file-upload').should(function($input){
             expect($input[0].files[0].name).to.equal('example.json')
             //console.log($input)
         }) 
    })
    //quando usar alias, tu chama ele com @
    it('selecionar arquivo usando fixture', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload').selectFile('@sampleFile')
    })
    it('verifica páginas que abrem em outra aba' , function(){
        //tem um atributo , chamado target, que tem valor _blank
        cy.get('#privacy a').should('have.attr' , 'target' , '_blank')
    })
    it.only('acessa página e remove o target' , function(){
        // esse invoke removeAttr retira o target e faz com que seja aberto na mesma página no click
        //já que o cypress não consegue monitorar duas abas juntos
        //tu remove o target e faz com que tudo seja renderizado na mesma página
        cy.get('#privacy a').should('have.attr' , 'target' , '_blank')
        .invoke('removeAttr' , 'target' )
        .click()
        //esse comando aqui em baixo, verifica se contem aquela parte e dps sugere que esteja visível.
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
})

