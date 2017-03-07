'use strict'

const Promise = require('bluebird'),
        fetch = require('node-fetch'),
            _ = require('lodash'),
      zincKey = process.env.ZINC_KEY,
         auth = 'Basic ' + new Buffer(zincKey + ':').toString('base64');
fetch.Promise = Promise;

function _request(method, path, data) {
    data = JSON.stringify(data);

    const reqOptions = {
        method: method,
        headers: {
          'Authorization': auth,
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    if (!_.isUndefined(data) && !_.isEmpty(data)) {
        reqOptions.body = data;
    }

    return fetch(path, reqOptions)
            .then(res => res.json())
            .then(json => json);
}

function post(path, data) {
    return _request('POST', path, data);
}

function get(path, data) {
    return _request('GET', path, data);
}

function del(path, data) {
    return _request('DELETE', path, data);
}

module.exports = {
    order: {
        create: function (data) {
            return post('https://api.zinc.io/v1/orders', data);
        },
        retrieve: function(order_id) {
            return get('https://api.zinc.io/v1/orders/' + order_id);
        },
        cancel: function(order_id) {
            return post('https://api.zinc.io/v1/orders/' + order_id + '/cancellation', requestParams);
        }
    },
    product: {
        getDetails: (productId) => {
            return get(`https://api.zinc.io/v1/products/${productId}?retailer=amazon`);
        },
        getPrices: (productId) => {
            return get(`https://api.zinc.io/v1/products/${productId}/offers?retailer=amazon`);
        }
    }
};
