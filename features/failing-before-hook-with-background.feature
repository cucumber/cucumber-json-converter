Feature: failing-before-hook-with-background
  Background:
    Given this step passes

  @failing_before
  Scenario: S1
    Given this step passes
