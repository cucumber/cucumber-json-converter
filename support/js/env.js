var { Given, Before } = require('cucumber')

Given(/pass/, function (callback) {
  callback()
})

Given(/fail/, function (callback) {
  callback(new Error("this step failed"))
})

Before({ tags: "@failing-before" }, function (testCase, callback) {
  callback(new Error("failing before hook"))
})
