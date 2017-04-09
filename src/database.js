import Barrel from 'oak-barrel';
import Meta from 'oak-meta';

class Database {

    constructor(fileSystem) {
        this.fileSystem = fileSystem;
        this.subscriptions = new Map();
        this.corkedBarrels = new Map();
        this.locks = new Map();
    }

    selectRack(rack) {
        Meta.validateRackName(rack);
        return {
            publish: data => this.publish(rack, data),
            subscribe: callback => this.subscribe(rack, callback)
        };
    }

    publish(rack, data) {
        Meta.validateRackName(rack);
        if (this.locks.has(rack)) {
            if (!this.corkedBarrels.has(rack)) {
                this.corkedBarrels.set(rack, []);
            }
            this.corkedBarrels.get(rack).push(data);
            return;
        }
        let stringified = JSON.stringify(data);
        let barrel = Barrel.fromText(stringified);
        this.fileSystem.push(rack, barrel);
        if (this.subscriptions.has(rack)) {
            this.subscriptions.get(rack).forEach(callback => callback(JSON.parse(stringified)));
        }
    }

    subscribe(rack, callback) {
        Meta.validateRackName(rack);
        if (!this.subscriptions.has(rack)) {
            this.subscriptions.set(rack, new Map());
        }
        let subscription = Symbol();
        this.subscriptions.get(rack).set(subscription, callback);
        this.cork(rack);
        this.fileSystem.end(rack).then(() => {
            return this.fileSystem.readRack(rack, barrel => {
                if (!this.subscriptions.get(rack).has(subscription)) {
                    return;
                }
                callback(JSON.parse(Barrel.toText(barrel)));
            });
        }).then(() => {
            this.uncork(rack);
        });
        return {
            unsubscribe: () => {
                this.unsubscribe(rack, subscription);
            }
        };
    }

    unsubscribe(rack, subscription) {
        this.subscriptions.get(rack).delete(subscription);
    }

    cork(rack) {
        if (!this.locks.has(rack)) {
            this.locks.set(rack, 0);
        }
        this.locks.set(rack, this.locks.get(rack) + 1);
    }

    uncork(rack) {
        this.locks.set(rack, this.locks.get(rack) - 1);
        if (this.locks.get(rack) === 0) {
            this.locks.delete(rack);
            if (this.corkedBarrels.has(rack)) {
                this.corkedBarrels.get(rack).forEach(data => this.publish(rack, data));
                this.corkedBarrels.delete(rack);
            }
        }
    }

}

export default Database;
