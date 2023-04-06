/// <reference types="Cypress" />
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("we request for company details with its ID number", () => {
    cy.api({
        method: 'GET',
        url: "https://api.company-information.service.gov.uk/company/00000006",
        headers: {
            'Authorization': 'Basic NDRmOTQzOTQtNDczMS00YjE3LWI2OGUtNDVlMTc0MDZmMjVhOg=='
        }
    }).as('company_details');
});

Then("we should receive details successfully", () => {
    cy.get('@company_details').its('status').should('equal', 200);
});