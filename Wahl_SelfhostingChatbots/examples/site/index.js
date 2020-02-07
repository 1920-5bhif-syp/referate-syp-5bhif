var botui = new BotUI( 'hello-world' );
var input = document.getElementById( "input" );

input.addEventListener( "keyup", function ( event ) {
    if ( event.keyCode === 13 ) {
        event.preventDefault();
        document.getElementById( "sendButton" ).click();
    }
} );

async function sendmessage() {
    var message = document.getElementById( "input" ).value;
    botui.message.human( {
        content: message
    } );
    let resp = await fetch( 'http://localhost:5005/webhooks/rest/webhook', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify( {
            message: message
        } )
    } ).then( response => { return response.json() } );
    for ( var i = 0; i < resp.length; i++ ) {
        if ( resp[ i ].text ) {
            botui.message.bot( {
                content: resp[ i ].text
            } );
        }
        else if ( resp[ i ].image ) {
            botui.message.bot( {
                content: "![cute image](" + resp[ i ].image + ")"
            } );
        }

    }
    document.getElementById( "input" ).value = "";
}