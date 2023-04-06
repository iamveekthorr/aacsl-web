Feature: Signup
    Scenario: User signs up successfully
    Given User supplies valid firstname, lastname, email, password and date of birth
    Then User has successfully signed up

    Scenario: User signup attempt fails
    Given User supplies any empty credential
    Then signup attempt should fail

    Scenario: User signup attempt fails
    Given User supplies any invalid credential
    Then signup attempt should fail

    Scenario: particular user already signed up
    Given User supplies already registered email
    Then signup attempt should fail with duplicate
    