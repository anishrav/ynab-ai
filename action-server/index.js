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

app.post('/', (req, res) => handleMessage(req, res));

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
        // console.log(budget_id);
     })
    .then(() => {
    })
    .catch(e => console.error(e));


function handleMessage(req, res) {
    let incoming_request = req.body;
    console.log(`entities: `);
    console.log(incoming_request['tracker']['latest_message']['entities']);
    console.log(`slots:`);
    console.log(incoming_request['tracker']['slots']);
    if (incoming_request['next_action'] === "action_spent_since") {
        // pull budget_action, time_count and time_unit from slots
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
        
        // set date to the first date of the timeframe
        let today = new Date();
        if (time_unit === 'month') {
            today.setMonth(today.getMonth() - time_count);
        }

        if (time_unit == 'week') {
            today.setDate(today.getDate() - time_count * 7);
        }

        if (time_unit == 'year') {
            today.setDate(ttoday.getMonth() - time_count * 12);
        }

        // pull transactions for timeframe
        let api_url = url.format({
            protocol: 'https',
            hostname: `api.youneedabudget.com`,
            pathname: `v1/budgets/${budget_id}/transactions`,
            query: {
                since_date: today.toISOString().split('T')[0]
            }
        });

        fetch(api_url, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            }),
        })
        .then( response => response.json() )
        .then( json => {
            let transactions = json.data.transactions;

            // calculate total amount of outflow
            let amount = 0;
            for (let transaction of transactions) {
                // console.log(transaction.payee_name);
                if (transaction.amount < 0 
                    && transaction.cleared == 'cleared' 
                    && !transaction.transfer_account_id) {
                    amount += transaction.amount;
                }
            }
            
            return amount / 1000 * -1;
        })
        .then( amount => {
            // handle the activity reponse
            let response = {};
            response['responses'] = [];
            let plural = time_count > 1 ? 's' : '';
            let text = `In the past ${time_count} ${time_unit}${plural}, you have spent $${amount}.`;
            response['responses'].push({'text': text});
            res.json(response);
            return;
        })
        .catch( e => console.error(e));
    }
    if (incoming_request['next_action'] === "action_spent_timeframe") {
        // get start date and end date
        // pull budget_action, time_count and time_unit from slots
        let start_date = incoming_request['tracker']['slots']['start_date'];
        let end_date = incoming_request['tracker']['slots']['end_date'];
        let time_unit = incoming_request['tracker']['slots']['time_unit'];

        let start = new Date(start_date);
        let end = new Date(end_date);
        let today = new Date();

        // if year on start/end date is 2001, change based on time_unit slot
        if (start.getYear() - 100 === 1) {
            if (time_unit === 'year') {
                start.setYear(today.getYear() - 1);
            }
        }

        if (end.getYear() - 100 === 1) {
            if (time_unit === 'year') {
                end.setYear(today.getYear() - 1);
            }
        }

        // fetch total transactions from start_date to today

        // pull transactions for timeframe
        let api_url = url.format({
            protocol: 'https',
            hostname: `api.youneedabudget.com`,
            pathname: `v1/budgets/${budget_id}/transactions`,
            query: {
                since_date: start.toISOString().split('T')[0]
            }
        });

        let start_amount = fetch(api_url, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            }),
        })
        .then( response => response.json() )
        .then( json => {
            let transactions = json.data.transactions;

            // calculate total amount of outflow
            let amount = 0;
            for (let transaction of transactions) {
                // console.log(transaction.payee_name);
                if (transaction.amount < 0 
                    && transaction.cleared == 'cleared' 
                    && !transaction.transfer_account_id) {
                    amount += transaction.amount;
                }
            }
            
            return amount / 1000 * -1;
        })
        .catch( e => console.error(e));

        // fetch total transactions from end_date to today

        // pull transactions for timeframe
        let api_url = url.format({
            protocol: 'https',
            hostname: `api.youneedabudget.com`,
            pathname: `v1/budgets/${budget_id}/transactions`,
            query: {
                since_date: end.toISOString().split('T')[0]
            }
        });

        let end_amount = fetch(api_url, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            }),
        })
        .then( response => response.json() )
        .then( json => {
            let transactions = json.data.transactions;

            // calculate total amount of outflow
            let amount = 0;
            for (let transaction of transactions) {
                // console.log(transaction.payee_name);
                if (transaction.amount < 0 
                    && transaction.cleared == 'cleared' 
                    && !transaction.transfer_account_id) {
                    amount += transaction.amount;
                }
            }
            
            return amount / 1000 * -1;
        })
        .catch( e => console.error(e));

        Promise.all([start_amount, end_amount]).then(
            (start, end) => {
                // once both promises are fulfilled, subtract start_amount from end_amount
                return end - start;
            }
        )
        .then( amount => {
            // handle the reponse to user
            let response = {};
            response['responses'] = [];
            let text = `Between ${start_date} and ${end_date}, you spent $${amount}.`;
            response['responses'].push({'text': text});
            res.json(response);
            return;
        })
        .catch(e => console.log(e));

    }
}
