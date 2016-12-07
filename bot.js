
'use strict'

let botBuilder = require('claudia-bot-builder')
let excuse = require('huh')

module.exports = botBuilder(request => {
  return 'Thanks for sending ' + request.text  +
      '. Your message is very important to us, but ' +
      excuse.get()
})
