'use strict';

var dances = require('./../controllers/dance.controller');


module.exports = function (router) {

    router.route('/')
        .get(dances.apiRoot);

    router.route('/dances')
        .get(dances.listDances)
        .post(dances.addDance);

    router.route('/dances/:name')
        .get(dances.getDance)
        .put(dances.editDance)
        .delete(dances.removeDance);
};
