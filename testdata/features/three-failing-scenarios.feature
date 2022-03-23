Feature: three-failing-scenarios
  Scenario: S1
    Given this step fails

  Scenario: S2
    Given this step passes
    When this step fails

  Scenario: S3
    Given this step passes
    When this step passes
    Then this step fails
