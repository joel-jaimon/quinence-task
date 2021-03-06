require("dotenv").config();
const express = require("express");
var cors = require("cors");
const cognito = require("./configs/Cognito");
const app = express();
const port = 4000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.post("/cognito-clientid", (req, res) => {
  res.json({
    clientId: process.env.COGNITO_CLIENT_ID,
  });
});

app.post("/cognito-userpool-id", (req, res) => {
  res.json({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
  });
});

app.post("/get-users", async (req, res) => {
  return await cognito.listUsers(
    {
      UserPoolId: process.env.COGNITO_CLIENT_ID,
      AttributesToGet: ["email"],
    },
    (err, data) => {
      if (err) {
        res.json({
          res: err,
        });
        console.log("err", err);
      } else {
        res.json({
          res: data,
        });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
