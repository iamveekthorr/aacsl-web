Feature: Login
    Scenario: User logs in successfully
    Given user supplies valid email and password
    Then applicaion should login successfully

    Scenario: User login attempt failed
    Given user supplies invalid email and password
    Then application will fail to login

    Scenario: User login attempt failed
    Given user supplies invalid no credentials
    Then application will fail to login