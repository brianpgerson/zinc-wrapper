'use strict'

const Promise = require('bluebird'),
        fetch = require('node-fetch'),
            _ = require('lodash');

module.exports = function (zincKey) {
    if (_.isUndefined(zincKey)) {
        throw new Error('zinc API key is undefined');
    }
    const auth = 'Basic ' + new Buffer(zincKey + ':').toString('base64');

    function _request(method, path, data) {
        const reqOptions = {
            method: method,
            headers: {
              'Authorization': auth,
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        if (!_.isUndefined(data) && !_.isEmpty(data)) {
            data = JSON.stringify(data);
            reqOptions.body = data;
        };

        return fetch(path, reqOptions)
            .then(res => {
                return res.json()
            })
            .then(json =>  {
                console.log(json);
                return json;
            })
            .catch(err => {
                console.log(err);
                return {error: `error with fetch request!: ${err}`};
            });
    }

    return {
        order: {
            create: function (data) {
                return _request('POST', `https://api.zinc.io/v1/orders`, data);
            },
            retrieve: function(orderId) {
                return _request('GET', `https://api.zinc.io/v1/orders/${orderId}`);
            }
        },
        product: {
            getDetails: (productId) => {
                return _request('GET', `https://api.zinc.io/v1/products/${productId}?retailer=amazon`);
            },
            getPrices: (productId) => {
                return _request('GET', `https://api.zinc.io/v1/products/${productId}/offers?retailer=amazon`);
            }
        }
    }
};
