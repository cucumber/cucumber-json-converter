Before('@failing_before') do
  raise "Failing before hook"
end

After('@failing_after') do
  raise "Failing after hook"
end

AfterStep('@failing_after_step') do
  raise "Failing after step"
end

Given /pass/ do
end

Given /fail/ do
  fail "Fail"
end

$decay = 0
Given /decaying/ do
  failing = $decay > 0
  $decay += 1
  raise "Decayed" if failing
end

$flaky = 0
Given /flaky/ do
  failing = $flaky == 0
  $flaky += 1
  raise "Flaky" if failing
end

Given /pending/ do
  pending
end

Given /skip/ do
  skip_this_scenario
end
