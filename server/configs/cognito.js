const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_COGNITO_USER_ACCESSKEY,
  secretAccessKey: process.env.AWS_COGNITO_USER_SECRETKEY,
  region: "us-east-2",
});
const cognito = new AWS.CognitoIdentityServiceProvider();

module.exports = cognito;
