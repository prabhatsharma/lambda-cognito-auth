'use strict';

var config = require('../config');
const querystring = require('querystring');
var request = require('request');
var AWS = require('aws-sdk');


module.exports.callback = (event, context, callback) => {
    const res = {
        statusCode: 302, //redirect to application auth url,
    };

    var host = event.headers.Host;
    var stage = event.requestContext.stage;

    var data = {
        redirect_uri: 'https://' + host + '/' + stage + '/callback/google',
        code: event.queryStringParameters.code,
        client_secret: config.GOOGLE_SECRET,
        client_id: config.GOOGLE_ID,
        scope: config.GOOGLE_SCOPE,
        grant_type: 'authorization_code'
    };

    request.post({
        uri: config.GOOGLE_TOKEN_URL,
        formData: data
    }, (error, response, body) => {
        // Add the Google access token to the Cognito credentials login map.
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.COGNITO_IDENTITY_POOL_ID,   //dauth
            Logins: {
                'accounts.google.com': JSON.parse(body).id_token
            }
        });

        // Obtain AWS credentials
        AWS.config.credentials.get(function () {
            // Access AWS resources here.
            // Credentials will be available when this function is called.
            var identityId = AWS.config.credentials.identityId;

            var cognitoidentity = new AWS.CognitoIdentity();

            var params = {
                IdentityId: identityId, /* required */
                Logins: {
                    'accounts.google.com': JSON.parse(body).id_token
                    /* anotherKey: ... */
                }
            };

            cognitoidentity.getOpenIdToken(params, function (err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    console.log(data);           // successful response
                    res.headers = {
                        location: config.APPLICAION_URL + '/auth/google?' + querystring.stringify(data)
                    }
                    callback(null, res);   //redirect to front end application
                }
            });
        });
    });
}