const templateAbsolutePath = `${__dirname}/templates`;

const authAbsolutePath = `${templateAbsolutePath}/auth`;

export const emailTemplates = {
  // Auth
  WELCOME_EMAIL: `${authAbsolutePath}/welcome-email.pug`,
  RESET_PASSWORD: `${authAbsolutePath}/password-reset.pug`,
  EMAIL_VERIFICATION: `${authAbsolutePath}/email-verification.pug`,
  RESET_SUCCESSFUL: `${authAbsolutePath}/successful-reset.pug`,
};
