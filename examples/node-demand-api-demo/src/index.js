require('isomorphic-fetch')
const { runExample } = require('./demand-api')

runExample().then(data => {
  console.log('FINISH')
})
