var express = require('express');
var router = express.Router();
var randomCode = require('../common/tools').randomCode;


var user = require('../models/Model').user;
var scoksaccount = require('../models/Model').scoksaccount;
var coupon = require('../models/Model').coupon;
var order = require('../models/Model').order;


//index page
router.get('/', function(req, res, next) {
	
	var DDoscode = randomCode(8);
	console.log("code");
	res.render('index', {page:"signup", error : "", info: ""});
});

//signup
router.post('/signup', function(req, res, next) {
	
	var email = req.body.email;
	var password = req.body.password;
	var emailverify = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	console.log(emailverify.test(email));
	if (!emailverify.test(email)) {
		res.render('index', {page:"signup", error : "error", info: "请输入您的邮箱！"});
	}else if(!!password && password.length < 4){
		res.render('index', {page:"signup", error : "error", info: "密码好像太少了吧！"});
	}else{
		user.count({ email : email},function( err, doc){
			if(doc == 0){
				scoksaccount.findOne({ status : "2"},function(err, obj){
					if (err) throw err;
					obj.name = email.split("@")[0]+"-"+randomCode(3);
					obj.createdate = new Date();
					obj.status = "0";
					var userstap = new user({
						email: email,
						password: password
					});
					userstap.socks.push(obj);
					obj.save(function(err) {
					  if (err) throw err;
					});
					userstap.save(function(err) {
					  if (err) throw err;
					  console.log('User：'+email+' saved successfully!'+userstap);
					  req.session.user = userstap;
					res.redirect('/index');
					});
					
				});
			}else{
				res.render('index', {page:"signup", error : "exist",email:email, info: "账号已经存在，请登录！"});
				console.log('User：'+email+' fail signup, account aready exist!');
			}
		});
	}
});

//signin
router.post('/signin', function(req, res, next) {
	
	var email = req.body.email;
	var password = req.body.password;
	user.findOne({ email : email, password: password}, function(err, userobj) {
		if (err) throw err;
		if(!!userobj){
			req.session.user = userobj;
			res.redirect('/index');
		}else{
			console.log('User：'+email+' fail signin, account input error!');
		  	res.render('index', {page:"signin", error : "error", info: "账号或密码有误，请重试！"});
		}
	});
});

//index
router.get('/index', function(req, res, next) {
	console.log( req.session.user.email);
	console.log( req.session.user.password);
	user.findOne({ email : req.session.user.email, password: req.session.user.password}).populate('socks').exec(function(err, userobj) {
		if (err) throw err;
		if(!!userobj){
			if (err) throw err;
			req.session.user = userobj;
			res.render('usercenter', {user:userobj});
		}else{
			req.session.destroy(function(err) {
				res.redirect('/');
			});
		}
	});
});

//signout
router.get('/signout', function(req, res, next) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
});

//pay before
router.get('/paytoback', function(req, res, next) {
	var serid = req.query.serid;
	var couponcode = req.query.couponcode;
	var money = parseFloat(req.query.money);
	console.log(money);
	var erortype = true;//验证是否为套餐类型
	var addhs = 0;//延长的时间
	var viptypestp = "1";//VIP类型
	var payment = money;//实际付款
	var couponcut = 0;
	switch(money){
		case 2:addhs=24 * 60 * 60 * 1000;break;
		case 3:viptypestp="2";addhs=24 * 60 * 60 * 1000;break;
		case 9:addhs=30 * 24 * 60 * 60 * 1000;break;
		case 19:viptypestp="2";addhs=30 * 24 * 60 * 60 * 1000;break;
		case 99:addhs=360 * 24 * 60 * 60 * 1000;break;
		case 199:viptypestp="2";addhs=360 * 24 * 60 * 60 * 1000;break;
		default:erortype = false;res.render('payresult', {info : "您的支付请求有问题，请核对！"});
	}
	user.findOne({ email : req.session.user.email, password: req.session.user.password}, function(err, userobj) {
		if (err) throw err;
		if (!userobj){res.render('error', {info : "操作异常，重新登录！"});}
		coupon.findOne({couponcode: couponcode, status: "0"}, function(err, copponobj){
			if (err) throw err;
			//邀请码处理
			if (!!copponobj) {
				if( copponobj.enddate.valueOf() > new Date().valueOf()){//优惠码有效
					couponcut = money*copponobj.percent + copponobj.cutmoney
					payment = money - couponcut; // 优惠码之后的金额
					couponid = copponobj._id;
					copponobj.status = "1";
					copponobj.save(function(err){
						if (err) throw err;
					});
				}
			}
			if(payment < 0 || payment == 0){
				payment = 0;
				paystatus = "1";
			}
			var stmporderidcode = parseInt(new Date().getTime()/1000) + randomCode(8);//生成唯一订单号
			var stmpenddate = 0;

			//sock号处理
			if(!serid){
				scoksaccount.findOne({ status : "2"},function(err, sockaccobj){
					if (err) throw err;
					if (!sockaccobj){res.render('error', {info : "无服务了，请联系 Jovi：joveqiao@qq.com！"});}
					stmpenddate = new Date().getTime()+addhs;
					sockaccobj.name = req.session.user.email.split("@")[0]+"-"+randomCode(3);
					sockaccobj.createdate = new Date();
					if(payment == 0){
						//不需要支付
						sockaccobj.enddate = new Date(stmpenddate);
						sockaccobj.status = "1";
						userobj.socks.push(sockaccobj);
						sockaccobj.save(function(err){
							if (err) throw err;
						});
						userobj.save(function(err){
							if (err) throw err;
							res.render('payresult', {info : "使用优惠码成功，创建完成！"});
						});
					}else{
						//还需要支付
						// sockaccobj.save(function(err){
						// 	if (err) throw err;
						// });
						//sockaccobj._id stmpenddate
						console.log("fufeizhong...");
					}
				});
			}else{
				scoksaccount.findOne({ _id : serid},function(err, sockaccobj){						
					if (err) throw err;
					if(!sockaccobj)res.render('payresult', {info : "Error，续费出现问题，不存在的对象！"});
					if(sockaccobj.enddate.valueOf() > new Date().valueOf()){
						stmpenddate = sockaccobj.enddate.getTime()+addhs;
					}else{
						stmpenddate = new Date().getTime()+addhs;
					}
					if(payment == 0){
						sockaccobj.enddate = new Date(stmpenddate);
						sockaccobj.status = "1";
						sockaccobj.save(function(err){
							if (err) throw err;
							res.render('payresult', {info : "使用优惠码成功，成功续费！"});
						});
					}else{
						console.log("fufeizhong...");
					}
				});
			}
		});
	});
});


module.exports = router;