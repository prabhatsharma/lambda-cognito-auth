'use strict';

var googleCallback = require('./callback/callback.google');

module.exports = (event, context, callback) => {
    var signInMethod;
    
    if (event.pathParameters.provider === "google") {
        googleCallback.callback(event, context, callback);
    } else {
        const response = {
            statusCode: 200,
            body: JSON.stringify({
            message: 'Provider not supported',
            event: event,
            context : context
            }),
        };

        callback(null, response);
    }
  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
