# API

This document describes the public interface of the `oak-lite` package.

## Table of Contents

* [API](#api)
    * [Table of Contents](#table-of-contents)
    * [`Oak`](#oak)
        * [`Class Method: Oak.configure(options)`](#class-method-oakconfigureoptions)
    * [`database`](#database)
        * [`database.selectRack(rackName)`](#databaseselectrackrackname)
    * [`rack`](#rack)
        * [`rack.publish(barrel)`](#rackpublishbarrel)
        * [`rack.subscribe(callback)`](#racksubscribecallback)
    * [`subscription`](#subscription)
        * [`subscription.unsubscribe()`](#subscriptionunsubscribe)

## `Oak`

`Oak` is used to create Oak-Lite databases. It is the default export of the `oak-lite` package.

```javascript
import Oak from 'oak-lite';
```

### `Class Method: Oak.configure(options)`

Creates a [`database`](#database) instance.

Example:

```javascript
// Creates a database with a data directory inside /var/lib/myapp/oak
const database = Oak.configure({
    dataDirectory: '/var/lib/myapp/oak'
});
```

## `database`

A `database` is a database instance which can be used to access racks. It is returned by [`Class Method: Oak.configure(options)`](#class-method-oakconfigureoptions).

### `database.selectRack(rackName)`

Returns a [`rack`](#rack) instance from the database.

Example:

```javascript
// Selects the "counter" rack from the database
let rack = database.selectRack('counter');
```

## `rack`

A `rack` stores a sequence of barrels. It is returned by [`database.selectRack(rackName)`](#databaseselectrackrackname).

### `rack.publish(barrel)`

Adds a barrel to the rack which will be sent to all of the rack's subscribers.

Note that the barrel will be converted to a string and back using `JSON.stringify` and back using `JSON.parse`, allowing for correct compatibility with strings, real numbers, booleans, null, and most objects.

Example:

```javascript
rack.publish('Hello, World!');
rack.publish(3.14159);
rack.publish(true);
rack.publish(null);
rack.publish({
    primes: [2, 3, 5, 7, 11, 13],
    directions: {
        left: 'Left!',
        right: 'Right!'
    }
});
```

### `rack.subscribe(callback)`

Calls the supplied `callback` with each of the rack's current and future barrels. Returns a [`subscription`](#subscription) instance which can be used to unsubscribe.

Example:

```javascript
let subscription = rack.subscribe(barrel => {
    // Prints each barrel of the rack
    console.log(barrel);
});
```

## `subscription`

A `subscription` is a reference to a subscription to the barrels of a rack. It is returned by [`rack.subscribe(callback)`](#racksubscribecallback).

### `subscription.unsubscribe()`

Cancels a subscription.

Example:

```javascript
// Unsubscribe after 5 seconds
setTimeout(subscription.unsubscribe, 5000);
```
