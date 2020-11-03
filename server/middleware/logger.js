'use strict'

var morgan = require('morgan')
var os = require('os')
var fs = require('fs')
var path = require('path')

morgan.token('hostname', function getHostname() {
  return os.hostname()
})
morgan.token('pid', function getPid() {
  return process.pid
})

function jsonFormat(tokens, req, res) {
  return JSON.stringify({
    'remote-address': tokens['remote-addr'](req, res),
    time: tokens['date'](req, res, 'iso'),
    method: tokens['method'](req, res),
    url: tokens['url'](req, res),
    'http-version': tokens['http-version'](req, res),
    'status-code': tokens['status'](req, res),
    'content-length': tokens['res'](req, res, 'content-length'),
    referrer: tokens['referrer'](req, res),
    'user-agent': tokens['user-agent'](req, res),
    hostname: tokens['hostname'](req, res),
    pid: tokens['pid'](req, res),
  })
}

var loggerMiddlerware = function logger(options={}) {
  return morgan(jsonFormat, options)
}

module.exports = loggerMiddlerware
