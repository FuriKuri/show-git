var ContentHandler = require('./content');
var CallbackHandler = require('./callback');

module.exports = exports = function(app) {
    var contentHandler = new ContentHandler();
    var callbackHandler = new CallbackHandler();
    app.get('/', contentHandler.displayMainPage);
    app.get('/callback', callbackHandler.handleCallback);
}