![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js][] testing toolkit

Lead Maintainer: [Mircea Alexandru](https://github.com/mirceaalexandru)

# Purpose

  * A production test system to test the external API of a Seneca application
  * Need to be able to export the API description from seneca-web of all APIs
  * A separate plugin/applition will run continuous tests against this API.

# Architecture

The test system is composed from two different parts:

  * Mite - this is a minimal plugin that will be loaded by the host application to be tested. It will have minimum functionality to make sure it will not affect the host application.
  * Seneca-sentinel - a fully independent WEB application that is offering:
    * Can be used to monitor multiple mite-hosting applications from multiple clients. In this way, using a single/central Sentinel application more clients and their application.
    * Can be used to monitor also non-mite HTTP applications. (TBD)
    * User management - for access the application
    * Mite management - possibility to defined and control remote mite access
    * Monitor mite management
    * Define tests suites with validation of response based on HTTP status/parambulator rules on JSON response
    * Visualization of monitored health/test data by using:
      * Internal charts - TBD
    * Alarm management - manage internal alarm rules based on monitored application events. These alarms can trigger notification of two types:
      * HTTP notifications - notifications that will be displayed in the Sentinel site
      * E-mail notifications - email notifications sent to specific email addresses

# Usage

  * The mite plugin must be loaded by the host seneca application. No other configuration is required.
  * To start the seneca-sentinel application please take a look on its documentation.
    * After seneca-sentinel is started the connection to the application to be monitored can be added.

# Status

  * Project status - under development, do not use in production.


# Mite

## Description

A plugin for reporting basic application information.

This plugin will attach to a host seneca application and will report using HTTP API the basic health and
configuration information about the host application.

## Install

```sh
npm install seneca-mite --save
```

## Usage


```JavaScript
var seneca = require('seneca')()
seneca.use('mite')
```

## Configuration

No configuration is required for this plugin. It can be controlled/configured from a remote seneca-sentinel application.

Take a look on seneca-sentinel for details

## Test

```sh
npm test
```


## Contributing

The [Senecajs org][Seneca.js] encourage open participation. If you feel you can help in any way, be it with documentation, examples, extra testing, or new features please get in touch.

## License

Copyright Seneca Microservices Framework and other contributors 2015 - 2016, Licensed under [MIT][].

[Seneca.js]: https://github.com/senecajs/
[MIT]: ./LICENSE
