Before('@failing-before') do
  raise "Failing before hook"
end

After('@failing-after') do
  raise "Failing after hook"
end

Given /pass/ do
end

Given /fail/ do
  fail "Fail"
end

Given /pending/ do
  pending
end

$flakes = 0
Given /flaky/ do
  failing = $flakes == 0
  $flakes += 1
  raise "Flaky fail" if failing
end

Given /skip/ do
  skip_this_scenario
end
