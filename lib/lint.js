const chalk = require('chalk')
const { defaults } = require('lodash')
const standard = require('standard')

function handler (error, data) {
  if (error) throw error

  data.results.forEach(result => {
    if (!result.errorCount && !result.warningCount) return

    console.log(chalk.blue(result.filePath))

    result.messages.forEach(message => {
      switch (message.severity) {
        case 1:
          console.log(chalk.yellow(message.line, message.message))
          break
        case 2:
          console.log(chalk.red(message.line, message.message))
          break
      }
    })
  })
}

module.exports = function (path, options) {
  options = defaults(options, {
    fix: true
  })

  standard.lintFiles(path, options, handler)
}
