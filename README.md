
zinc-wrapper
==========

It's a super lightweight module for making requests to the [zinc.io](http://docs.zincapi.com/) API.


# Motivation

I wanted to drop a service into my app to handle zinc requests for me.

# Features

- It's small
- It uses

# Install

`npm install zinc-wrapper --save`


# Usage

```javascript
const ZincWrapper = require('zinc-wrapper');

function findCheapestPrice (item, preferences) {
    return ZincService.product.getPrices(item)
        .then(response => {
            let cheapestOffer = false;
            response.offers.each(candidateOffer => {
                console.log(candidateOffer.price)
                // ===> 13.37
                console.log(candidateOffer.ship_price)
                // ===> 4.22
            }
        });
    });
}
```

See [test cases](https://github.com/brianpgerson/zinc-wrapper/test/zinc-fetch.test.js) for more examples.


# API

## product.getDetails(productId)

returns a Promise that resolves to a zinc product object or an error

### product.getPrices(productId)

returns a Promise that resolves to a zinc product offers object or an error

### order.create(data)

returns a Promise that resolves to a zinc order `request_id` that you can use to retrieve the order's status

### order.retrieve(requestId)

returns a Promise that resolves to an `order_response` or `error`

### Testing

Just run `npm test` from the root directory. Make sure your api key is available on process.env or set it first, like `ZINC_CLIENT=12xxxxxxxYZ npm test`.


# License

MIT


# Acknowledgement

I used Evan Tann's [wrapper](https://github.com/egtann/zinc) as a reference.
