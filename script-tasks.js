'use strict';

const querystring = require('querystring');
let https = require('https');
let program = require('commander');

let options = {
  host: 'graph.facebook.com',
  path: '/v2.6/me/thread_settings',
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
  }
};

const greetingMessage = {
  "setting_type": "greeting",
  "greeting": {
      "text":"Pen Pal Shuffle! The old school way to meet people!"
  }
};

const gettingStarted = {
  "setting_type":"call_to_actions",
  "thread_state":"new_thread",
  "call_to_actions":[
    {
      "payload":"getting_started"
    }
  ]
};

const persistentMenu = {
  "setting_type" : "call_to_actions",
  "thread_state" : "existing_thread",
  "call_to_actions":[
    {
      "type":"postback",
      "title":"Help",
      "payload":"persistent:help"
    },
    {
      "type":"postback",
      "title":"Find a new pen pal",
      "payload":"persistent:new_penpal"
    }
  ]
};

const commands = {
  "gettingStarted": gettingStarted,
  "greetingMessage": greetingMessage,
  "persistentMenu": persistentMenu
};

program
  .version('0.0.1')
  .option('-s, --script <script>', 'Script To Run', /^(greetingMessage|gettingStarted|persistentMenu)$/i)
  .option('-a, --access-token <accessToken>', 'Page Access Token')
  .parse(process.argv);

if (typeof program.script === 'undefined' || typeof commands[program.script] === 'undefined') {
   console.error('no script given!');
   process.exit(1);
} else if (typeof program.accessToken === 'undefined') {
   console.error('no access token given!');
   process.exit(1);
};

options.path = options.path + "?access_token=" + program.accessToken;

let req = https.request(options, res => {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', e => {
  console.log('problem with request: ' + e.message);
});

console.log(JSON.stringify(commands[program.script]));

// write data to request body
req.write(JSON.stringify(commands[program.script]));
req.end();
