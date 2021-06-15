import { CognitoUserPool } from "amazon-cognito-identity-js";

console.log(process.env.REACT_APP_USER_POOL_ID);

const poolConfig = {
  UserPoolId: process.env.REACT_APP_CLIENT_ID!,
  ClientId: process.env.REACT_APP_USER_POOL_ID!,
};

export default new CognitoUserPool(poolConfig);
