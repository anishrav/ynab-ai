const express = require('express');
const app = express();
const url = require('url');
const bodyParser = require('body-parser');
const ynab = require("ynab");
const accessToken = require('./keys').accessToken;
const ynabAPI = new ynab.API(accessToken);
const port = 5055;
let budget_id = '';

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook', (req, res) => handleMessage(req, res));

app.listen(port, () => {
    console.log(`Action server listening on port ${port}!`);
});

// retrieve budget id from YNAB API
fetch('http://api.youneedabudget.com/v1/budgets/', {
        method: 'get',
        headers: new Headers({
            'Authorization': 'Bearer ' + accessToken
        }),
    })
    .then( response => response.json() )
    .then( json => {
        budget_id = json['data']['budgets'][0]['id'];
     })
     .then( () => {
         let today = new Date();
         today.setDate(today.getDate() - 14);
         
         
     })
    .catch( e => console.log(e));


function handleMessage(req, res) {
    let incoming_request = req.body;
    console.log(`entities: `);
    console.log(incoming_request['tracker']['latest_message']['entities']);
    console.log(`slots:`);
    console.log(incoming_request['tracker']['slots']);
    if (incoming_request['next_action'] === "action_activity") {
        console.log("activity");
        // pull budget_action, time_count and time_unit from slots
        let action = incoming_request['tracker']['slots']['budget_action'];
        let time_count = parseInt(incoming_request['tracker']['slots']['time_count']);
        let time_unit = incoming_request['tracker']['slots']['time_unit'];

        // if time_unit is null, set to month
        if (!time_unit) {
            time_unit = 'month';
        }

        // if time_count is null, set to 1
        if (!time_count) {
            time_count = 1;
        }
        
        // if budget_action === 'spend':
        if (action === 'spend') {
            today = new Date();

            let transactions = [];
            
            if (time_unit === 'month') {
                today.setMonth(today.getMonth() - time_count);
            }

            if (time_unit == 'week') {
                today.setDate(today.getDate() - time_count * 7);
            }

            // pull transactions for timeframe
            let api_url = url.format({
                protocol: 'https',
                hostname: `api.youneedabudget.com`,
                pathname: `v1/budgets/${budget_id}/transactions`,
                query: {
                    since_date: today.toISOString()
                }
            });
            console.log(api_url);

            fetch(api_url, {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + accessToken
                }),
            })
            .then( response => response.json() )
            .then( json => {
                // console.log(json.data.transactions);
                transactions = json.data.transactions;

                // calculate total amount of outflow
                let amount = 0;
                for (let transaction of transactions) {
                    // console.log(transaction.payee_name);
                    if (transaction.amount < 0 && transaction.cleared == 'cleared' && !transaction.transfer_account_id) {
                        console.log(transaction.payee_name);
                        amount += transaction.amount;
                    }
                }
                
                return amount / 1000 * -1;
            })
            .then( amount => {
                // handle the activity reponse
                let response = {};
                response['responses'] = [];
                response['responses'].push({'text': `In the past ${time_count} ${time_unit}, you have spent ${amount}.`});
                console.log(response);
                res.json(response);
                return;
            })
            .catch( e => console.log(e));

        }
        
        // if budget_action == 'budget':
            // get budget + timeframe


        // ynabAPI.transactions
        //     .getTransactions(budget_id, '2019-04-30')
        //     .then(res => console.log(res.data.transactions));
        
        
    }
}