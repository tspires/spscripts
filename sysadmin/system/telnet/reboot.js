#!/usr/bin/env node
var telnet   = require('telnet-client');
var log      = require('npmlog');

var connection = new telnet();

var params = {
  host : '192.168.0.13',
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
