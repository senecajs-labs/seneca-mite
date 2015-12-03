"use strict"

var os = require( 'os' )

module.exports = function( options ) {
  var seneca = this;


  function execute_get_status( args, done ) {
    var that = this

    that.log.debug( 'Command get_status', args.command )

    that.act( "role: 'mite', get: 'os_status'", function( err, system ) {
      if( err ) {
        return done( err, {ok: false} )
      }
      var payload = {
        os: system
      }

      that.act( "role: 'status', get: 'seneca'", function( err, stats ) {
        if( err ) {
          return done( err, {ok: false} )
        }

        payload.seneca_stats = stats

        that.act( "role: 'status', get: 'web'", function( err, webstats ) {
          if( err ) {
            return done( err, {ok: false} )
          }

          payload.web_stats = webstats
          done( null, { ok: true, payload: payload} )
        } )
      } )
    } )
  }


  function cmd_stats( done ) {
    var that = this

    that.act( 'role:seneca,stats:true', function( err, senstats ) {
      senstats.date = new Date()
      done(err, senstats)
    } )
  }


  function cmd_webstats( done ) {
    var that = this

    that.act( 'role:web,stats:true', function( err, webstats ) {
      webstats.date = new Date()
      done(err, webstats)
    } )
  }


  seneca
    .add( {protocol: 1, execute_command: 'getStatus'}, execute_get_status )
}