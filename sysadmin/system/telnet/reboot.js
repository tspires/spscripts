#!/usr/bin/env node
var telnet   = require('telnet-client');
var log      = require('npmlog');

if (!process.argv.slice(2)) {
  log.error("No hostname!");
}
var ip = process.argv.slice(2);
var connection = new telnet();

var params = {
  host   : ip,
  timeout: 1500
};

var cmd = 'reboot';
connection.on('ready', function(prompt) {
  connection.exec(cmd, function(response) {
    log.info(response); 
    connection.end();
  });
});

connection.on('timeout', function() {
  log.warn('Socket timeout...');
  connection.end();
});

connection.on('close', function() {
  log.info('Connection closed...');
});

connection.connect(params);
