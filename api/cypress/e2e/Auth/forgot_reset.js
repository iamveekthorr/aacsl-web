/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let reset_code;
Given("user is registered and submits forgot password request", () => {
	cy.request({
		method: "PATCH",
		url: Cypress.env("forgot_password_url"),
		body: {
		email: Cypress.env("email"),
		},
	}).as("response");
	cy.get("@response").its("status").should("equal", 200);

	// wait for email to come in before getting email lists
	cy.wait(15000);
})

When("user receives email with valid reset token", () => {
	cy.request({
		method: "GET",
		url: "https://developerapi.mailnest.io/api/v1/inboxes/qcomq09dkkop09/mails",
		headers: {
			"Content-Type": "application/json",
			"Api-Token": "30745eefb5da4ab17d93a5f403e015af",
		},
	}).as("inbox_res");
	cy.get("@inbox_res").its("status").should("equal", 200);
	cy.get("@inbox_res").its("body.data.0.mailId")
		.then((mailId) => {
			// console.log(mailId);
			// using mailId, get mail with reset code and extract reset code using regex
			cy.request({
				method: "GET",
				url: 'https://developerapi.mailnest.io/api/v1/mails/' + mailId,
				headers: {
					"Content-Type": "application/json",
					"Api-Token": "30745eefb5da4ab17d93a5f403e015af",
				},
			}).as("mail_res");
			cy.get("@mail_res").its("status").should("equal", 200);
			cy.get("@mail_res").its("body.data.0.contentText")
				.then((mail_text) => {
					const regex = /\d{4}/g;
					const match = mail_text.match(regex);
					reset_code = match[0];
				});
		});
});

Then("user should be able to reset password successfully", () => {
cy.api({
	method: "PATCH",
	url: Cypress.env("reset_password_url"),
	body: {
	password: Cypress.env("new_password"),
	confirmPassword: Cypress.env("new_password"),
	email: Cypress.env("email"),
	token: reset_code,
	},
}).as("response");
cy.get("@response").its("status").should("equal", 200);
});