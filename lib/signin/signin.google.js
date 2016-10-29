'use strict';

var config = require('../config');
const querystring = require('querystring');


module.exports.signin = (event, context, callback) => {
    const res = {
        statusCode: 302, //redirect to google auth url
    };

    var host = event.headers.Host;
    var stage = event.requestContext.stage;

    var qs = {
        redirect_uri: 'https://' + host + '/' + stage + '/callback/google',
        prompt: 'consent',
        response_type: 'code',
        client_id: config.GOOGLE_ID,
        scope: config.GOOGLE_SCOPE,
        access_type: 'online'
    };

    var googleUri = config.GOOGLE_OAUTHURL + '?' + querystring.stringify(qs);

    res.headers = {
        Location: googleUri
    };

    callback(null, res);   
}