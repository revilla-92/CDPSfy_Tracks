var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var tracksSchema = new Schema({
	name: { type: String },
	url: { type: String }
});

module.exports = mongoose.model('Track', tracksSchema);