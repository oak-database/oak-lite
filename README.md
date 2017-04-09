# `oak-lite`

[![Build Status](https://travis-ci.org/oak-database/oak-lite.svg)](https://travis-ci.org/oak-database/oak-lite)
[![codecov](https://codecov.io/gh/oak-database/oak-lite/branch/master/graph/badge.svg)](https://codecov.io/gh/oak-database/oak-lite)
[![npm](https://img.shields.io/npm/v/oak-lite.svg)](https://www.npmjs.com/package/oak-lite)
[![Dependency Status](https://david-dm.org/oak-database/oak-lite/status.svg)](https://david-dm.org/oak-database/oak-lite)
[![devDependency Status](https://david-dm.org/oak-database/oak-lite/dev-status.svg)](https://david-dm.org/oak-database/oak-lite?type=dev)

Oak-Lite is a lightweight version of Oak, an append-only database with a publish-subscribe model.

## Getting Started

Install the `oak-lite` package into your project with [npm](https://www.npmjs.com/).

```bash
npm install oak-lite --save
```

Use the `oak-lite` module in your project.

```javascript
import Oak from 'oak-lite';

// Configure the database (see the configuration options)
let database = Oak.configure({
    dataDirectory: '/var/lib/myapp/oak'
});

// Select the 'counter' rack
let rack = database.selectRack('counter');

// Subscribe to the rack
let subscription = rack.subscribe(barrel => {
    // Print each barrel to the console
    console.log(barrel);
});

// Publish 3 barrels to the rack
rack.publish(1);
rack.publish(2);
rack.publish(3);

// Unsubscribe from the rack after 10 seconds
setTimeout(() => {
    subscription.unsubscribe();
}, 10 * 1000);
```

## Configuration

The following parameters can be defined when configuring an Oak-Lite database:

| Parameter       | Description                                        | Required | Default |
| --------------- | -------------------------------------------------- | -------- | ------- |
| `dataDirectory` | The directory used by this database to store racks | **Yes**  | *none*  |

## API

The public interface for `oak-lite` is defined in the [API Guide](https://github.com/oak-database/oak-lite/blob/master/docs/api.md).

## Contributing

Pull requests are welcome! To get started, see the [Contributing Guide](https://github.com/oak-database/oak-lite/blob/master/CONTRIBUTING.md).
