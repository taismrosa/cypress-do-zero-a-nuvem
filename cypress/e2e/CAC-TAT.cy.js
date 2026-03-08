/// <reference types="cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const feedback =
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pretium bibendum ipsum, et facilisis massa laoreet at. Integer aliquam mauris quis pulvinar rutrum. Aenean sit amet lectus eget quam auctor eleifend. Donec enim lorem, aliquam a nunc id, tincidunt rutrum elit. Aliquam tempus sit amet metus sed semper. Vivamus in rhoncus erat. Vivamus sed metus sed erat congue cursus eu vitae arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; ";

    cy.get("[id='firstName']").type("Taís");
    cy.get("[id='lastName']").type("Medeiros");
    cy.get("[id='email']").type("tais@teste.com");
    cy.get("[id='open-text-area']").type(feedback, { delay: 0 });
    cy.contains("[type='submit']", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter formulário com um e-mail com formatação inválida", () => {
    cy.get("[id='firstName']").type("Taís");
    cy.get("[id='lastName']").type("Medeiros");
    cy.get("[id='email']").type("tais@teste");
    cy.get("[id='open-text-area']").type("Teste");
    cy.contains("[type='submit']", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("valida que o campo de telefone aceita apenas valor numérico", () => {
    cy.get("#phone").as("phone").type("teste!@.").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("[id='firstName']").type("Taís");
    cy.get("[id='lastName']").type("Medeiros");
    cy.get("[id='email']").type("tais@teste.com");
    cy.get("[id='open-text-area']").type("Teste");
    cy.get("#phone-checkbox").check();
    cy.contains("[type='submit']", "Enviar").click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, e-mail e telefone", () => {
    cy.get("[id='firstName']")
      .type("Taís")
      .should("have.value", "Taís")
      .clear()
      .should("have.value", "");
    cy.get("[id='lastName']")
      .type("Medeiros")
      .should("have.value", "Medeiros")
      .clear()
      .should("have.value", "");
    cy.get("[id='email']")
      .type("tais@teste.com")
      .should("have.value", "tais@teste.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("999999999")
      .should("have.value", "999999999")
      .clear()
      .should("have.value", "");
    cy.get("[id='open-text-area']")
      .type("Teste")
      .should("have.value", "Teste")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("[type='submit']", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formulário com sucesso usando um comando customizado", () => {
    const data = {
      firstName: "Taís",
      lastName: "Medeiros",
      email: "tais@teste.com",
      feedback: "Teste",
    };

    cy.fillMandatoryFieldsAndSubmit(data);
    cy.get(".success").should("be.visible");
  });
});
