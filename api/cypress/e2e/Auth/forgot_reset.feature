Feature: forgot/reset password

    Scenario: User forgot password
    Given user is registered and submits forgot password request
    When user receives email with valid reset token
    Then user should be able to reset password successfully