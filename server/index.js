const express = require("express");
const config = require('./config');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');

const PORT = process.env.PORT || 3001;

const app = express();

const payload = {
  iss: config.APIKey,
  exp: (new Date()).getTime() + 5000
};
const token = jwt.sign(payload, config.APISecret);

app.get("/newmeeting", (req, res) => {
  email = "jasdhadly1911@gmail.com";
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "test create meeting by jass",
      type: 1,
      settings: {
        host_video: "false",
        participant_video: "false",
        approval_type: 0,
      }
    },
    auth: {
      bearer: token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
      res.send("API call failed, reason: " + JSON.stringify(err));
    });
});

app.get("/inviteinmeeting", (req, res) => {
  console.log(req.params);
  let params = {
    "ttl": 7200*4,
    "attendees": [
      {
        email: "jaspreet@supertal.com",
        name: "gagan"
      }
    ]
  };
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/meetings/" + '74634773235' + "/invite_links",
    body: params,
    auth: {
      bearer: token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
      res.send("API call failed, reason: " + JSON.stringify(err));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});