Feature: Scenario Outline
  Background:
    Given a decaying step

  Scenario Outline:
    Given a <something> step

    Examples:
      | something |
      | passing   |
      | passing   |
