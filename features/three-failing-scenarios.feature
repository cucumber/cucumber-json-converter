Feature:
  Scenario:
    Given this step fails

  Scenario:
    Given this step passes
    When this step fails

  Scenario:
    Given this step passes
    When this step passes
    Then this step fails
