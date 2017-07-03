'use strict'

const Bluebird = require('bluebird'),
        should = require('should'),
         sinon = require('sinon'),
         // Set your own here, or just make sure that the test can pick up
         // your api key wherever you manage it
       zincKey = process.env.ZINC_KEY,
             _ = require('lodash'),
   ZincFetch = require('../lib/zinc-fetch')(zincKey);

describe('The zinc wrapper', () => {

  	it(`should have its main domains`, () => {
      	should.exist(ZincFetch.order);
        should.exist(ZincFetch.product);
  	});

    it(`should have its basic functions`, () => {
        _.forEach(ZincFetch.order, func => {
            (func).should.be.a.Function();
        });

        _.forEach(ZincFetch.product, func => {
            (func).should.be.a.Function();
        });
    });

    describe(`The product functions`, () => {

        it(`should get product details`, (done) => {
            if (zincKey) {
                ZincFetch.product.getDetails('0060512806').then(response => {
                    should.exist(response);
                    should.equal('completed', response.status);
                    should.equal('amazon', response.retailer);
                    should.equal('Cryptonomicon', response.title);
                    done();
                });
            }
        });

        it(`should get product details`, (done) => {
          if (zincKey) {
            ZincFetch.product.getPrices('0060512806').then(response => {
                should.exist(response);  
                done();
              });
            }
        });

    });
});
