'use strict';

// const bluebird = require('bluebird');
// const request = bluebird.promisifyAll(require('request'), { multiArgs: true });

/**
 * GET /users
 * List of API examples.
 */
exports.getUsers = (req, res) => {
    var data = [];
    // data.push({userName: 'Thinhnv'});
    data.push({userName: 'Administrator'});
    res.send(JSON.stringify(data));
};