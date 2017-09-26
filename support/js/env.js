const { Given, Before, After } = require('cucumber')

Before({ tags: "@failing-before" }, function () {
  throw new Error("failing before hook")
})

After({ tags: "@failing-after" }, function () {
  throw new Error("failing after hook")
})

Given(/pass/, function () {
})

Given(/fail/, function () {
  throw new Error("this step failed")
})

Given(/skip/, function () {
  return 'skipped'
})
