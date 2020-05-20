const inquirer = require('inquirer')

module.exports = {
  askAPIidentifier() {
    const questions = [
      {
        name: 'identifier',
        type: 'password',
        message: 'Please input your API identifier for SANDBOX API',
        validate(value) {
          if (value.length) {
            return true
          } else {
            return 'Please input your API identifier for SANDBOX API'
          }
        },
      },
    ]

    return inquirer.prompt(questions)
  },

  askForLocation(direction = 'pickup') {
    const questions = [
      {
        name: 'locationAnswer',
        type: 'input',
        message: `Please enter your ${direction} address`,
        validate(value) {
          return value.length ? true : `Please enter a valid ${direction} address`
        },
      },
    ]

    return inquirer.prompt(questions)
  },

  askToChooseLocation(locations) {
    const questions = [
      {
        name: 'selectedLocation',
        type: 'list',
        message: `Please choose exact address from autocomplete data`,
        choices: locations.map(i => i.display_address),
      },
    ]

    return inquirer.prompt(questions)
  },
}
