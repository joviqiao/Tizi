var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var couponScheMa = new Schema({
	couponcode: String,
	percent: {type: Number, default: 1.0 },
	cutmoney: {type: Number, default: 0 },
	status: {type: String, default: 0 },
	enddate: Date
});

var orderScheMa = new Schema({
	orderid: String,
	buydate: {type: Date, default: Date.now },
	packgename: String,
	total: Number,
	payment: Number,
	paystatus: String,//0 创建成功 1 支付成功；
	couponid: String
});

var scoksaccountScheMa = new Schema({
	name: String,
	sip: String,
	spt: String,
	pwd: String,
	encry: String,
	lpt: String,
	viptype: {type: String, default: "1" },
	enddate : {type: Date, default: Date.now },
	createdate : {type: Date, default: Date.now },
	status : {type: String, default: "2" },//0 停用  1 使用  2 初始化
	op:{type: String, default: "0" }
});

//user
var userScheMa = new Schema({
	email: String,
	password: String,
	socks : [{ type: Schema.Types.ObjectId, ref: 'scoksaccounts' }],
	orders: [{ type: Schema.Types.ObjectId, ref: 'orders' }],
	notice: [{
		name: String,
		content: String,
		status: {type: String, default: "0" },
		notedate: String
	}]
});

exports.coupon = mongoose.model('coupons', couponScheMa);
exports.order = mongoose.model('orders', orderScheMa);
exports.scoksaccount = mongoose.model('scoksaccounts', scoksaccountScheMa);
exports.user = mongoose.model('users', userScheMa);