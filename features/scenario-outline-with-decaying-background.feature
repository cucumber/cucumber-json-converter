Feature: scenario-outline-with-decaying-background
  Background:
    Given a decaying step

  Scenario Outline: S1
    Given a <something> step

    Examples:
      | something |
      | passing   |
      | passing   |
