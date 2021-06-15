const ListUsers = () => {
  var params = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    AttributesToGet: ["email"],
  };
  cognitoidentityserviceprovider.listUsers(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
  return <div></div>;
};

export default ListUsers;
