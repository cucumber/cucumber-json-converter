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

$decay = 0
Given /decaying/ do
  failing = $decay > 0
  $decay += 1
  raise "Decayed" if failing
end

Given /pending/ do
  pending
end

Given /skip/ do
  skip_this_scenario
end
