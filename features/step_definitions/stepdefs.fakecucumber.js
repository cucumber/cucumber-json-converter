const x = require('@cucumber/fake-cucumber')

x.Before("@failing_before", function () {
  throw new Error("failing before hook")
})

x.After("@failing_after", function () {
  throw new Error("failing after hook")
})

x.Given(/pass/, function () {
})

x.Given(/pending/, function () {
  return 'pending'
})

x.Given(/fail/, function () {
  throw new Error("this step failed")
})

let decay = 0
x.Given(/decaying/, function () {
  const failing = decay > 0
  decay++
  if(failing) throw new Error("Decayed")
})

x.Given(/skip/, function () {
  return 'skipped'
})

