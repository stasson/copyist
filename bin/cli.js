#!/usr/bin/env node
const importLocal = require('import-local')
const updateNotifier = require('update-notifier')
const pkg = require('../package.json')

if (!importLocal(__filename)) {
  updateNotifier({ pkg }).notify()
  require('../dist/cli.js')
}
