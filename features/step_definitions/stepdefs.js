const { Given, Before, After } = require('cucumber')

Before({ tags: "@failing_before" }, function () {
  throw new Error("failing before hook")
})

After({ tags: "@failing_after" }, function () {
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

let decay = 0
Given(/decaying/, function () {
  const failing = decay > 0
  decay++
  if(failing) throw new Error("Decayed")
})

Given(/skip/, function () {
  return 'skipped'
})
