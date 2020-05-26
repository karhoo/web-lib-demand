const path = require('path')
const packageJson = require('../../../../create-demand-bloc-module/package.json')
const Generator = require('yeoman-generator')

const latestDeps = ['@karhoo/demand-api']

const latestDevDeps = []

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'Your project name',
        default: 'demand-bloc-example',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        default: '',
      },
      {
        type: 'input',
        name: 'version',
        message: 'Your project version',
        default: packageJson.version,
      },
    ])
  }

  writing() {
    this.sourceRoot(path.resolve(__dirname, 'templates'))

    const executionFolder = process.cwd()
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationRoot(path.resolve(executionFolder, `${this.answers.appName}`)),
      this.answers,
      null,
      { globOptions: { dot: true } }
    )
  }

  install() {
    this.installDependencies({ bower: false })
    this.npmInstall(latestDeps)
    this.npmInstall(latestDevDeps, { 'save-dev': true })
  }
}
