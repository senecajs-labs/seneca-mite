"use strict"

module.exports = function( options ) {
  var seneca = this;
  var name = 'ProtocolCtrlV1'
  var protocol_version = seneca.export( 'constants/protocol_version' )

  function command( args, response ) {
    var command = args.command
    this.act( "role: 'crypt', decrypt: 'message'", {message: command}, function(err, decrypt){

      var message
      try {
        message = JSON.parse( decrypt.message )
      } catch ( err ) {
        this.log.debug("Cannot parse message", decrypt.message)
        return response( null, {err: true, msg: 'Received unexpected response: ' + decrypt.message} )
      }

      this.act( "role:'protocol_v1',generate:'response'",
        {
          command: message.command
        },
        function(err, data){
          if (err){
            return response(err)
          }
          this.act( "role: 'crypt', encrypt: 'message'", {message: JSON.stringify(data)}, function(err, encrypt){
            response(err, {response: encrypt.message})
          })
        }

      )
    } )
  }

  seneca
    .add( {role: name, cmd: 'command'}, command )

  seneca.act( {role: 'web', use: {
    command: {method: 'POST', alias: '/mite/v1/command', act: {role: name, cmd: 'command'}}
  }} )
}