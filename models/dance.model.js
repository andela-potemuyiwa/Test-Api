var mongoose = require('mongoose');
var danceSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    creator: String,
    where_created: String,
    when_created: Date,
    popularity: Number
});

var DanceModel = mongoose.model('DanceModel', danceSchema);

module.exports = DanceModel;
