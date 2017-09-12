require 'cucumber/core/test/filters/activate_steps_for_self_test'

AfterConfiguration do |config|
  config.filters << Cucumber::Core::Test::Filters::ActivateStepsForSelfTest.new
end
