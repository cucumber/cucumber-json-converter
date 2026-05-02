const { Given, Before, After } = require('@cucumber/cucumber')

Before({ tags: '@failing_before' }, () => {
  throw new Error('failing before hook')
})

After({ tags: '@failing_after' }, () => {
  throw new Error('failing after hook')
})

Given(/pass/, () => {})

Given(/pending/, () => 'pending')

Given(/fail/, () => {
  throw new Error('this step failed')
})

let decay = 0
Given(/decaying/, () => {
  const failing = decay > 0
  decay++
  if (failing) throw new Error('Decayed')
})

Given(/skip/, () => 'skipped')

Given(/I have (\d+) cukes in my (.*)/, (_count, _something) => {})
