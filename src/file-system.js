import fs from 'fs';
import path from 'path';
import Barrel from 'oak-barrel';

class FileSystem {

    constructor(dataDirectory) {
        this.writeStreams = new Map();
        this.initialize = new Promise(resolve => {
            this.DATA_DIRECTORY = path.join(dataDirectory, '/.oak');
            this.RACKS_DIRECTORY = path.join(this.DATA_DIRECTORY, '/racks');
            fs.mkdir(this.DATA_DIRECTORY, () => {
                fs.mkdir(this.RACKS_DIRECTORY, () => {
                    resolve();
                });
            });
        });
    }

    push(rack, barrel) {
        return this.initialize.then(() => {
            let writeStream;
            if (this.writeStreams.has(rack)) {
                writeStream = this.writeStreams.get(rack);
            } else {
                writeStream = fs.createWriteStream(this.getRackPath(rack), {
                    flags: 'a'
                });
                this.writeStreams.set(rack, writeStream);
            }
            writeStream.write(barrel);
        });
    }

    readRack(rack, callback) {
        let buffer = Buffer.from([]);
        return this.initialize.then(() => {
            return new Promise((resolve, reject) => {
                let readStream = fs.createReadStream(this.getRackPath(rack));
                readStream.on('data', data => {
                    buffer = Buffer.concat([buffer, data]);
                    let result = Barrel.getFirstBarrels(buffer);
                    result.barrels.forEach(barrel => callback(barrel));
                    buffer = result.buffer;
                });
                readStream.on('close', resolve);
                readStream.on('error', error => {
                    error.code === 'ENOENT' ? resolve() : reject(error);
                });
            });
        });
    }

    end(rack) {
        return new Promise(resolve => {
            if (!this.writeStreams.has(rack)) {
                return resolve();
            }
            this.writeStreams.get(rack).on('close', () => {
                this.writeStreams.delete(rack);
                resolve();
            });
            this.writeStreams.get(rack).end();
        });
    }

    getRackPath(rack) {
        return path.join(this.RACKS_DIRECTORY, '/' + rack);
    }

}

export default FileSystem;
