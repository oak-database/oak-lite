import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import Oak from '../../index';

describe('counter', () => {

    let database;
    let rack;
    let subscription;
    let receivedBarrels = [];
    let expectedBarrels = [1, 2, 3, 4, 5];

    before(() => {
        return new Promise(resolve => {
            fs.mkdir(path.join(__dirname, './counter'), resolve);
        });
    });

    it('creates the database', () => {
        database = Oak.configure({
            dataDirectory: path.join(__dirname, './counter')
        });
    });

    it('selects the "quickly" rack', () => {
        rack = database.selectRack('counter');
    });

    it('subscribes to the "counter" rack', () => {
        subscription = rack.subscribe(barrel => {
            receivedBarrels.push(barrel);
        });
    });

    it('publishes the numbers 1 through 5', () => {
        for (let i = 1; i <= 5; i++) {
            rack.publish(i);
        }
    });

    it('receives the numbers 1 through 10 via the subscription', () => {
        assert.deepEqual(receivedBarrels, expectedBarrels);
    });

    it('unsubscribes from the "counter" rack', () => {
        subscription.unsubscribe();
    });

    it('publishes the numbers 6 through 10', () => {
        for (let i = 6; i <= 10; i++) {
            rack.publish(i);
        }
    });

    it('receives no more numbers via the closed subscription', () => {
        assert.deepEqual(receivedBarrels, expectedBarrels);
    });

});
