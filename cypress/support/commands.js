Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (data) => {
  cy.get("[id='firstName']").type(data.firstName);
  cy.get("[id='lastName']").type(data.lastName);
  cy.get("[id='email']").type(data.email);
  cy.get("[id='open-text-area']").type(data.feedback);
  cy.contains("[type='submit']", "Enviar").click();
});
