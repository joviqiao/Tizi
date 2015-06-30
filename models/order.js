var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var orderScheMa = new Schema({
	orderid: String,
	buydate: {type: Date, default: Date.now },
	packgename: String,
	total: Number,
	payment: Number,
	paystatus: String,//0 创建成功 1 支付成功；
	couponid: String
});
exports.order = mongoose.model('orders', orderScheMa);