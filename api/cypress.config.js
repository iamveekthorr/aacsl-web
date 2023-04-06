const { defineConfig } = require("cypress");
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = {
  e2e: {
    baseUrl: "https://aacls-web-app.azurewebsites.net/v1/auth",
    specPattern: "**/*.feature",
    setupNodeEvents,
    env: {
      login_url: "/login",
      signup_url: "/signup",
      forgot_password_url: "/forgot-password",
      reset_password_url: "/reset-password",
      change_password_url: "/change-password",
      email: "oladipupo@5ranalysis.com",
      password: "@WXsT3456",
      new_password: "@WXsT7890",
      bad_email: "notTrusted@example.com",
      bad_password: "csc419@Test",
      firstname: "Oladipupo",
      lastname: "Oduwole",
      dob: "2000-12-20",
      snapshotOnly: false,
    },
  },
};
