var { Given } = require('cucumber')

Given(/pass/, function (callback) {
  callback()
})

Given(/fail/, function (callback) {
  callback(new Error("this step failed"))
})
