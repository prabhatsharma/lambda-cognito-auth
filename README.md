## AWS Lambda functions for federated authentication

Steps

1. serverless is installed - npm -g install serverless
2. Make sure that AWS credentials have been set in environment variables
AWS_SECRET_ACCESS_KEY=Your AWS Access key
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AWS Key ID
3. Set up your application in google developer console @ https://console.developers.google.com/apis/dashboard
4. Set up OAuth credentials. Get the client id and client secret in config.js
5. npm install
6. sls deploy

Now you can visit the signin API. It will redirect you to the front end application URL.

I will post a link to a front end application that can be used with it later. You can use it if you do not have a front end application