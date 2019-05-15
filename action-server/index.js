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
        console.log(json);
        budget_id = json['data']['budgets'][0]['id'];
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
    if (incoming_request['next_action'] === "action_activity") {
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
        
        today = new Date();

        let transactions = [];
        
        if (time_unit === 'month') {
            today.setMonth(today.getMonth() - time_count);
        }

        if (time_unit == 'week') {
            today.setDate(today.getDate() - time_count * 7);
        }

        // if budget_action === 'spend':
        if (action === 'spend') {
            // pull transactions for timeframe
            let api_url = url.format({
                protocol: 'https',
                hostname: `api.youneedabudget.com`,
                pathname: `v1/budgets/${budget_id}/transactions`,
                query: {
                    since_date: today.toISOString()
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
                transactions = json.data.transactions;

                // calculate total amount of outflow
                let amount = 0;
                for (let transaction of transactions) {
                    // console.log(transaction.payee_name);
                    if (transaction.amount < 0 
                        && transaction.cleared == 'cleared' 
                        && !transaction.transfer_account_id) {
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
                let text = `In the past ${time_count} ${time_unit}, you have spent $${amount}.`;
                response['responses'].push({'text': text});
                console.log(response);
                res.json(response);
                return;
            })
            .catch( e => console.error(e));

        }

        if (action === 'budget') {
            // pull all categories from YNAB API
            let api_url = url.format({
                protocol: 'https',
                hostname: `api.youneedabudget.com`,
                pathname: `v1/budgets/${budget_id}/categories`
            });
            fetch(api_url, {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + accessToken
                })
            })
            .then(res => res.json())
            .then(json => {
                let categories = [];
                // iterate through response to add category id's to categories
                for (let category_group of json.data.category_groups) {
                    for (let category of category_group.categories) {
                        categories.push(category.id);
                    }
                }

                return categories;
            })
            
        let api_url = url.format({
            protocol: 'https',
            hostname: `api.youneedabudget.com`,
            pathname: `v1/budgets/${budget_id}/categories`
        });
        fetch(api_url, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        })
        .then(res => res.json())
        .then(json => {
            let categories = [];
            // iterate through response to add category id's to categories
            for (let category_group of json.data.category_groups) {
                for (let category of category_group.categories) {
                    categories.push(category.id);
                }
            }

            return categories;
        })
        .then(categories => {
            console.log(categories);
            let today = new Date();
            let time_count = 1;
            today.setMonth(today.getMonth() - time_count);
            let budgeted_amount = 0;
            for (let i = 0; i <= time_count; i++) {
                today.setMonth(today.getMonth() + i);
                let month = today.toISOString();
                
                for (category of categories){
                    api_url = url.format({
                        protocol: 'https',
                        hostname: `api.youneedabudget.com`,
                        pathname: `v1/budgets/${budget_id}/months/${month}/categories/${category}`
                    });

                    fetch(api_url, {
                        method: 'get',
                        headers: new Headers({
                            'Authorization': 'Bearer ' + accessToken
                        })
                    })
                    .then(res => res.json())
                    .then(json => {
                        console.log(json);
                        budgeted_amount += json.data.category.budgeted;
                    })
                    .catch(e => console.error(e));
                }
            }
        })
            .catch(e => console.error(e));
        }
        
    }
}
