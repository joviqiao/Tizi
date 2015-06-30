var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var couponScheMa = new Schema({
	couponcode: String,
	percent: {type: Number, default: 1.0 },
	cutmoney: {type: Number, default: 0 },
	status: {type: String, default: 0 },
	enddate: Date
});
exports.coupon = mongoose.model('coupons', couponScheMa);