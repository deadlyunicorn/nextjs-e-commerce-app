describe('order-place.cy.tsx', () => {
  it('visits order page', () => {
    cy.on('uncaught:exception',()=>false)
    cy.visit('localhost:3000/');
    cy.wait(1000);
    cy.contains('ADD TO').click();
    cy.contains('Successfully updated cart.',{timeout:20000});
    try{
      cy.visit('localhost:3000/checkout')
    }
    finally{
      cy.get('input[name="customer_email"]',{timeout:20000}).type('testingWith@cypress.test');
      cy.get('input[name="customer_firstname"]').type('Test');
      cy.get('input[name="customer_lastname"]').type('Run');
      cy.get('input[name="shipping_town_city"]').type('York');
      cy.get('input[name="card_postal_zip_code"]').type('40400');
      cy.get('input[name="shipping_street"]').type('Very 202');
      cy.get('input[name="card_cvc"]').type('123');
      cy.get('input[name="card_expiry_month"]').type('11');
      cy.get('input[name="card_expiry_year"]').type('2024');
      cy.contains('Submit').click();
    }

  })
})