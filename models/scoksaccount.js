var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var scoksaccountScheMa = new Schema({
	name: String,
	sip: String,
	spt: String,
	pwd: String,
	encry: String,
	lpt: String,
	viptype: {type: String, default: "1" },
	enddate : {type: Date, default: Date.now },
	createdate : Date,
	status : {type: String, default: "2" },//0 停用  1 使用  2 初始化
	op:{type: String, default: "0" }
});
exports.scoksaccount = mongoose.model('scoksaccounts', scoksaccountScheMa);