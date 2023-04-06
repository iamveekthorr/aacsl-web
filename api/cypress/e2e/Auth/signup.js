/// <reference types="Cypress" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(
  "User supplies valid firstname, lastname, email, password and date of birth",
  () => {
    cy.api({
      method: "POST",
      url: Cypress.env("signup_url"),
      body: {
        firstName: Cypress.env("firstName"),
        lastName: Cypress.env("lastName"),
        password: Cypress.env("password"),
        email: Cypress.env("email"),
        dob: Cypress.env("dob"),
      },
    }).as("details");
  }
);

Given("User supplies any invalid/empty credential", () => {
  cy.api({
    method: "POST",
    url: Cypress.env("signup_url"),
    failOnStatusCode: false,
    body: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      dob: "",
    },
  }).as("details");
});

Given("User supplies already registered email", () => {
  cy.api({
    method: "POST",
    url: Cypress.env("signup_url"),
    failOnStatusCode: false,
    body: {
      firstName: Cypress.env("firstName"),
      lastName: Cypress.env("lastName"),
      email: Cypress.env("email"),
      password: Cypress.env("password"),
    },
  }).as("details");
});

Then("User has successfully signed up", () => {
  cy.get("@details").its("status").should("eq", 200);
});

Then("signup attempt should fail", () => {
  cy.get("@details").its("status").should("eq", 400);
});

Then("signup attempt should fail with duplicate", () => {
  cy.get("@details").its("status").should("eq", 409);
});