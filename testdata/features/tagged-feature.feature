@feature-tag
Feature: Foo

  @scenario-outline-tag
  Scenario Outline: Bar
    Given <name>

    @examples-tag
    Examples:
    | name    |
    | passing |
    | failing |
