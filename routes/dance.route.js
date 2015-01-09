'use strict';

var dances = require('./../controllers/dance.controller');


module.exports = function (router) {

    router.route('/')
        .get(dances.root);

    router.route('/api')
        .get(dances.apiRoot);

    router.route('/api/dances')
        .get(dances.listDances)
        .post(dances.addDance);

    router.route('/api/dances/:name')
        .get(dances.getDance)
        .put(dances.editDance)
        .delete(dances.removeDance);
};
