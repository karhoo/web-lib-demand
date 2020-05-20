const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

const {
  getHttpClient,
  testHttpClient,
  getAddressSuggestions,
  getPlaceDetails,
  checkAvailability,
} = require('./demand-api')
const { askAPIidentifier, askForLocation, askToChooseLocation } = require('./inquirer')

require('isomorphic-fetch')

clear()

function promptError(data) {
  console.log(chalk.bgRed('Something went wrong'))
  console.log(chalk.red('Error:', data.error.message))
}

async function handleLocation(httpService, direction = 'pickup') {
  const { locationAnswer } = await askForLocation(direction)

  const locationAutoCompleteData = await getAddressSuggestions(httpService, locationAnswer)

  if (!locationAutoCompleteData.ok) {
    promptError(locationAutoCompleteData)
    return
  }

  if (locationAutoCompleteData.body.locations.length === 0) {
    console.log('No location for', locationAnswer, 'is found')
    return
  }

  const { locations } = locationAutoCompleteData.body

  const { selectedLocation } = await askToChooseLocation(locations)

  const { place_id } = locations.find(i => i.display_address === selectedLocation)

  console.log(chalk.yellow(`Getting place details for ${selectedLocation}`))

  const locationPlaceDetails = await getPlaceDetails(httpService, place_id)
  const availabilityData = await checkAvailability(httpService, place_id)

  console.log('Place details: ', locationPlaceDetails.body.address.display_address)
  console.log(
    chalk.bgYellowBright.black('In this area', availabilityData.body.categories, 'car types are availible\n')
  )

  return place_id
}

console.log(chalk.blue(figlet.textSync('demand-api', { horizontalLayout: 'full' })))
console.log(
  'We will use',
  chalk.bgMagentaBright('SANDBOX'),
  'environment with',
  chalk.bgMagentaBright('API identifier')
)

const run = async () => {
  const { identifier } = await askAPIidentifier()

  const httpService = getHttpClient(identifier)

  console.log('Testing your API identifier ...')
  const testResponse = await testHttpClient(httpService)

  if (!testResponse.ok) {
    promptError(testResponse)
    return
  }

  console.log('Test', chalk.green('OK'))

  console.log('\n--------------------------\nLocations Service\n')

  const pickUpPlaceId = await handleLocation(httpService, 'pickup')
  console.log()
  const dropoffUpPlaceId = await handleLocation(httpService, 'dropoff')

  console.log('\n--------------------------\n Quotes Service\n')
  console.log('Booking for', pickUpPlaceId, 'and', dropoffUpPlaceId)
}

run()
