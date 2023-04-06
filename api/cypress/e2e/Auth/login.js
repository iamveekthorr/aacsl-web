/// <reference types="Cypress" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("user supplies valid email and password", () => {
	cy.api({
		method: 'POST',
		url: Cypress.env('login_url'),
		body: {
			email: Cypress.env('email'),
			password: Cypress.env('password')
		}
	}).as('details')
});

Then("applicaion should login successfully", () => {
	cy.get('@details').its('status').should('eq', 200)
});

Given("user supplies invalid email and password", () => {
	cy.api({
		method: 'POST',
		url: Cypress.env('login_url'),
		failOnStatusCode: false,
		body: {
			email: Cypress.env('bad_email'),
			password: Cypress.env('bad_password')
		}
	}).as('details')
});

Given("user supplies invalid no credentials", () => {
	cy.api({
		method: 'POST',
		url: Cypress.env('login_url'),
		failOnStatusCode: false,
		body: {
			email: "",
			password: ""
		}
	}).as('details')
});

Then("application will fail to login", () => {
	cy.get('@details').its('status').should('eq', 400)
});