#!/usr/bin/env node

const yeoman = require('yeoman-environment')

const env = yeoman.createEnv()

const Generator = require('./generators/app')

env.registerStub(Generator, 'generator:app')

env.run('generator:app', err => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
})
