import { assert } from 'chai';
import Oak from '../../index';

describe('errors', () => {

    it('should require options to be defined', () => {
        assert.throws(() => Oak.configure(), /The `options` parameter must be defined./);
    });

    it('should require options to be an object', () => {
        assert.throws(() => Oak.configure('Hello'), /The `options` parameter must be an object./);
    });

    it('should require the dataDirectory object to be defined', () => {
        assert.throws(() => Oak.configure({}), /The option `dataDirectory` must be defined./);
    });

    it('should require the dataDirectory object to be a string', () => {
        assert.throws(() => Oak.configure({dataDirectory: 123}), /The option `dataDirectory` must be a string./);
    });

});
