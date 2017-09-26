const { Given, Before, After } = require('cucumber')

Before({ tags: "@failing-before" }, function () {
  throw new Error("failing before hook")
})

After({ tags: "@failing-after" }, function () {
  throw new Error("failing after hook")
})

Given(/pass/, function () {
})

Given(/pending/, function () {
  return 'pending'
})

Given(/fail/, function () {
  throw new Error("this step failed")
})

let flakes = 0
Given(/flaky/, function () {
  failing = flakes == 0
  flakes++
  if(failing) throw new Error("Flaky")
})

Given(/skip/, function () {
  return 'skipped'
})
