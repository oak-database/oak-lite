import fs from 'fs';
import path from 'path';
import Oak from '../../index';

describe('stress', () => {

    let database;
    let rack;
    let expectation = 0;
    let expectationsFailed = false;

    before(() => {
        return new Promise(resolve => {
            fs.mkdir(path.join(__dirname, './stress'), resolve);
        });
    });

    it('creates the database', () => {
        database = Oak.configure({
            dataDirectory: path.join(__dirname, './stress')
        });
    });

    it('selects the "stress" rack', () => {
        rack = database.selectRack('stress');
    });

    it('publishes the numbers 1 through 50,000', () => {
        for (let i = 1; i <= 50000; i++) {
            rack.publish(i);
        }
    }).timeout(30 * 1000);

    it('subscribes to the "stress" rack', () => {
        rack.subscribe(barrel => {
            if (!expectationsFailed) {
                expectation++;
                expectationsFailed = barrel !== expectation;
            }
        });
    });

    it('publishes the numbers 50,001 through 100,000', () => {
        for (let i = 50001; i <= 100000; i++) {
            rack.publish(i);
        }
    }).timeout(30 * 1000);

    it('receives the numbers 1 through 100,000 via the subscription', () => {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                if (expectationsFailed) {
                    return reject(new Error('Unexpected barrel received via the subscription.'));
                }
                if (expectation > 100000) {
                    return reject(new Error('Too many barrels received via the subscription.'));
                }
                if (expectation === 100000) {
                    resolve();
                }
            }, 100);
        });
    }).timeout(60 * 1000);

});
