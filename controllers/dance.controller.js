'use strict';

var mongoose = require('mongoose');
var DanceModel = mongoose.model('DanceModel');

module.exports = function () {
    var methods = {
        apiRoot: function (request, response) {
            response.send('Welcome to Our Dance Api...Don\'t Get It Twisted');
        },

        listDances: function (request, response, next) {
            DanceModel.find(function (err, dances) {
                if (err) {
                    response.json(err);
                }

                response.json(dances);
            });
        },

        getDance: function (request, response, next) {

            var danceName = request.params.name.toLowerCase();

            DanceModel.find({name: danceName}, function (err, dance) {
              if (err) {
                response.status(404).json('Not Found');
              }

              response.json(dance);
            });
        },

        addDance: function (request, response, next) {
            DanceModel.create(request.body, function (err, dance) {
                if (err) {
                    response.json(err);
                }

                response.json({
                    message: 'Dance ' + request.body.name + ' was added to the list of dances.'
                });

                next();
            });
        },

        editDance: function (request, response) {
            var danceName = request.params.name.toLowerCase();
            var dance = request.body;

            DanceModel.update({name: danceName}, dance, function (err) {
                if (err) {
                    response.status(404).json('Not Found');
                }

                response.status(200).json('Update Successful');

            });
        },

        removeDance: function (request, response) {
            var danceName = request.params.name.toLowerCase();

            DanceModel.remove({name: danceName}, function (err, dance) {

                if (err) {
                    response.status(404).json('Not Found');
                }

                response.json('Delete Successful');
            });
        }
    };

    return methods;
};
