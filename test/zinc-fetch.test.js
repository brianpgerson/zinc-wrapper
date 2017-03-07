'use strict'

const Bluebird = require('bluebird'),
        should = require('should'),
         sinon = require('sinon'),
       zincKey = process.env.ZINC_KEY,
             _ = require('lodash'),
   ZincWrapper = require('../lib/zinc-fetch');

describe('The zinc wrapper', () => {

  	it(`should have its main function wrappers`, () => {
      	should.exist(ZincWrapper.order);
        should.exist(ZincWrapper.product);
  	});

    it(`should have its basic functions`, () => {
        _.forEach(ZincWrapper.order, func => {
            (func).should.be.a.Function();
        });

        _.forEach(ZincWrapper.product, func => {
            (func).should.be.a.Function();
        });
    });

    describe(`The product functions`, () => {

        it(`should get product details `, (done) => {
            if (!zincKey) {

            } else {
                ZincWrapper.product.getDetails('0060512806').then(response => {
                    console.log('response')
                    should.exist(response);
                    should.equal('completed', response.status);
                    should.equal('amazon', response.retailer);
                    should.equal('Cryptonomicon', response.title);
                    done();
                });
            }
        });

    });
});
