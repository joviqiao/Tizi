// var ALIPAY_GATEWAY_NEW = "https://mapi.alipay.com/gateway.do?"
// var url = "";

// var service            =   "create_direct_pay_by_user";  //
// var partner            =   "XXX";  //
// var _input_charset     =   "utf-8";  //
// var sign_type          =   "MD5";  //
// var sign               =   "XXX";  //
// var notify_url         =   "XXX"; //
// var return_url         =   "XXX"; //
// var error_notify_url   =   "XXX"; //
// var out_trade_no       =   "";
// var subject            =   "";
// var payment_type       =   "1"; //
// var total_fee          =   0.0;
// var seller_id          =   "XXX"; //

// var alipay = function(tizi_tradeno, tizi_subject, tizi_total){
// 	out_trade_no = tizi_tradeno ;
// 	subject = tizi_subject ;
// 	total_fee = tizi_total ;


// // setEncoding
// 	url = ALIPAY_GATEWAY_NEW + "service=" + service +"&partner=" + partner;
// 	http.get( url, function(res) {
// 	  console.log("Got response: " + res.statusCode);
// 	}).on('error', function(e) {
// 	  console.log("Got error: " + e.message);
// 	});
// }

var 3rdpay = function(digitNum,addhs,scoksaccountid){
	
}

exports.3rdpay = 3rdpay;
exports.alipay = alipay;