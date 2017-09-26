var { Given, Before } = require('cucumber')

Given(/pass/, function () {
})

Given(/fail/, function () {
  throw new Error("this step failed")
})

Given(/skip/, function () {
  return 'skipped'
})

Before({ tags: "@failing-before" }, function () {
  throw new Error("failing before hook")
})
