require("dotenv").config();
const express = require("express");
const cognito = require("./configs/Cognito");
const app = express();
const port = 4000;

app.get("/cognito-clientid", (req, res) => {
  res.json({
    clientId: process.env.COGNITO_CLIENT_ID,
  });
});

app.get("/cognito-userpool-id", (req, res) => {
  res.json({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
  });
});

app.get("/get-users", async (req, res) => {
  const data = await cognito.listUsers({
    AttributesToGet: ["email"],
  });

  res.send({
    res: JSON.parse(JSON.stringify(data)),
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
