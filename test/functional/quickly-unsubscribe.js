import fs from 'fs';
import path from 'path';
import Oak from '../../index';

describe('quickly unsubscribe', () => {

    let database;
    let rack;

    before(() => {
        return new Promise(resolve => {
            fs.mkdir(path.join(__dirname, './quickly_unsubscribe'), resolve);
        });
    });

    it('creates the database', () => {
        database = Oak.configure({
            dataDirectory: path.join(__dirname, './quickly_unsubscribe')
        });
    });

    it('selects the "quickly_unsubscribe" rack', () => {
        rack = database.selectRack('quickly_unsubscribe');
    });

    it('publishes the numbers 1 through 100', () => {
        for (let i = 1; i <= 100; i++) {
            rack.publish(i);
        }
    });

    it('subscribes to the "quickly_unsubscribe" rack for only 5 barrels', () => {
        return new Promise((resolve, reject) => {
            let count = 0;
            let subscription = rack.subscribe(() => {
                count++;
                if (count === 5) {
                    subscription.unsubscribe();
                }
            });
            setTimeout(() => {
                if (count < 5) {
                    return reject(new Error('Did not receive 5 barrels.'));
                }
                if (count > 5) {
                    return reject(new Error('Received more than 5 barrels.'));
                }
                resolve();
            }, 100);
        });
    });

});
