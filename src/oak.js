import FileSystem from './file-system';
import Database from './database';

class Oak {

    static configure(options) {
        if (options === undefined) {
            throw new Error('The `options` parameter must be defined.');
        }
        if (typeof options !== 'object') {
            throw new Error('The `options` parameter must be an object.');
        }
        if (options.dataDirectory === undefined) {
            throw new Error('The option `dataDirectory` must be defined.');
        }
        if (typeof options.dataDirectory !== 'string') {
            throw new Error('The option `dataDirectory` must be a string.');
        }
        let fileSystem = new FileSystem(options.dataDirectory);
        return new Database(fileSystem);
    }

}

export default Oak;
