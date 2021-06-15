export const getPoolConfig = async () => {
  let REACT_APP_CLIENT_ID: null | string;
  let REACT_APP_USER_POOL_ID: null | string;
  await fetch(`${process.env.REACT_APP_SERVER_URL}/cognito-clientid`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      REACT_APP_CLIENT_ID = data.clientId;
    })
    .catch((err) => console.log(err));
  await fetch(`${process.env.REACT_APP_SERVER_URL}/cognito-userpool-id`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => (REACT_APP_USER_POOL_ID = data.userPoolId))
    .catch((err) => console.log(err));
  const poolConfig = {
    UserPoolId: await REACT_APP_CLIENT_ID!,
    ClientId: await REACT_APP_USER_POOL_ID!,
  };
  console.log(poolConfig);
  return poolConfig;
};
