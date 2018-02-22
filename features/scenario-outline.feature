Feature: scenario-outline
  Scenario Outline: S1
    Given a <something> step
    And a passing step

    Examples:
      | something |
      | passing   |
      | failing   |
      | pending   |
