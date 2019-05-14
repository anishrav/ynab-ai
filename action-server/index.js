const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ynab = require("ynab");
const accessToken = require('./keys').accessToken;
const ynabAPI = new ynab.API(accessToken);
const port = 5055;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', (req, res) => handleMessage(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function handleMessage(req, res) {
    let incoming_request = req.body;
    console.log(incoming_request['tracker']['latest_message']['entities']);
    console.log(incoming_request['tracker']['slots']);
    console.log('');
    if (incoming_request['next_action'] === "action_activity") {
        // handle the activity reponse
        let response = {};
        response['responses'] = [];
        response['responses'].push({'text': `Here's your activity!`});
        console.log(response);
        res.json(response);
        return;
    }
}