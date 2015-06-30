$(function() {
	$(window).scrollTop(0);
	prevTop = 0; //滚动参数
	currTop = 0;
	var allheight = $(document).height(); //总高度
	windowheight = $(window).height();
	$(".comtainheit").css("height", windowheight);
	$(".signup").click(function(){
		$(".signup").addClass("active");
		$(".signin").removeClass("active");
		$(".signupform").show();
		$(".signinform").hide();
	});
	$(".signin").click(function(){
		$(".signin").addClass("active");
		$(".signup").removeClass("active");
		$(".signinform").show();
		$(".signupform").hide();
	});
	var stmp = 1;
	var fq = setInterval(function(){
		if(stmp === 1){
			$(".fanqiang").removeClass("shake").addClass("bounceOutUp");
			stmp = 0;
		}else{
			$(".fanqiang").removeClass("bounceOutUp").addClass("shake");
			stmp = 1;
		}
	}, 1000*2)
	

	//滚动划过一屏
	//				$(window).mousewheel(function(event, delta) {
	//					currTop = $(window).scrollTop(); //获取当前高度
	//					var pingheight = $(".comtainheit").height(); //获取当前每屏高度
	//					if (delta > 0) {
	//						var fixtop = 0;
	//						fixtop = currTop - (currTop % pingheight);
	//						$("html, body").animate({
	//							scrollTop: fixtop
	//						}, 800);
	//					} else {
	//						var fixtop = 0;
	//						fixtop = pingheight * (Math.floor(currTop / pingheight) + 1);
	//						if (fixtop > (allheight - pingheight)) {
	//							//什么都不做
	//						} else {
	//							$("html, body").animate({
	//								scrollTop: fixtop
	//							}, 800);
	//						}
	//					}
	//					return false;
	//				});

});

//设置一屏大小
$(window).resize(function() {
	windowheight = $(window).height();
	$(".comtainheit").css("height", windowheight);
});