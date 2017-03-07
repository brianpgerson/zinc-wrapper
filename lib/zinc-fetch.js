'use strict'

const Promise = require('bluebird'),
        fetch = require('node-fetch'),
            _ = require('lodash'),
      zincKey = process.env.ZINC_KEY,
         auth = 'Basic ' + new Buffer(zincKey + ':').toString('base64');
fetch.Promise = Promise;

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
    }

    return fetch(path, reqOptions)
            .then(res => res.json())
            .then(json => json);
}

module.exports = {
    order: {
        create: function (data) {
            return _request('POST', `https://api.zinc.io/v1/orders`, data);
        },
        retrieve: function(orderId) {
            return _request('GET', `https://api.zinc.io/v1/orders/${orderId}`);
        },
        cancel: function(orderId, requestParams) {
            return _request('POST', `https://api.zinc.io/v1/orders/${orderId}/cancellation`, requestParams);
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
};
