Feature: Scenario Outline
  Scenario Outline:
    Given a <something> step
    And a passing step

    Examples:
      | something |
      | passing   |
      | failing   |
      | pending   |
