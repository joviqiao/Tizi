var express = require('express');
var router = express.Router();

var randomCode = require('../common/tools').randomCode;
var mongoose = require('mongoose');

var user = require('../models/Model').user;
var scoksaccount = require('../models/Model').scoksaccount;
var coupon = require('../models/Model').coupon;


/* GET users listing. */
router.post('/signin', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;
	if(email === "joveqiao@qq.com" && password === "QIAOgang4008"){
		req.session.back = "joveqiao";
		res.redirect('/background/index');
	}else{
		res.send('dou ni wan !');
	}
  
});
router.get('/', function(req, res, next) {
	console.log("backlogin");
	res.render('backlogin', {});
});

router.get('/createsocks', function(req, res, next) {
	scoksaccount.count({},function( err, counts){
		if (err) throw err;
		var serport = 30000 + counts;
		var spt = "" + serport;
		var pwd = randomCode(6);
		var scoksaccountobj = new scoksaccount({
			name: "",
			sip: "162.243.157.214",
			spt: spt,
			pwd: pwd,
			encry: "aes-256-cfb",
			lpt: "1080"
		});	
		scoksaccountobj.save(function(err) {
		  if (err) throw err;
		  res.redirect('/background/index');
		});
	});
	
});


router.get('/index', function(req, res, next) {
	if(req.session.back !== "joveqiao"){
		res.send('dou ni wan !');
	}else{
		scoksaccount.count({},function( err, counts){
			var totalsernum = counts;
			scoksaccount.count({status:"1"},function( err, usenum){
				var usenums = usenum;
				scoksaccount.count({status:"0"},function( err, stopnum){
					var stopums = stopnum;
					scoksaccount.count({op:"1"},function( err, opnum){
						var opnums = opnum;
						scoksaccount.find({},function(err, scas){
							coupon.find({},function(err, couponobja){
								user.find({},function(err, users){
									res.render('backindex', {users:users,totalsernum:totalsernum,usenums:usenums,opnums:opnums,stopums:stopums,scas:scas,coupon:couponobja});
								});
							});
						});
					});
				});	
			});
		});
	}
  
});
router.get('/createcoupon', function(req, res, next) {
	if(req.session.back !== "joveqiao"){
		res.send('dou ni wan !');
	}else{
		var money = parseFloat(req.query.money);
		var present = parseFloat(req.query.present);

		var couponcode = randomCode(10);
		var date = new Date();
		var enddate = new Date(date.getTime() + 30*24*60*60*1000);

		var couponobj = new coupon({
			couponcode: couponcode,
			percent: present,
			cutmoney: money,
			enddate: enddate
		});

		couponobj.save(function(err) {
		  if (err) throw err;
		  res.redirect('/background/index');
		});
	}
  
});

module.exports = router;
