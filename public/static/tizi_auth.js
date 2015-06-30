$(function() {
	$(".useroption").hover(function() {
		$(".settingoption").show();
	}, function() {
		$(".settingoption").hover(function() {
			$(".settingoption").show();
		}, function() {
			$(".settingoption").hide();
		});
		$(".settingoption").hide();
	});
	$(".senior").click(function() {
		$(".senior").addClass("activeon");
		$(".junior").removeClass("activeon");
		$("#choice2").show();
		$("#choice1").hide();
	});
	$(".junior").click(function() {
		$(".junior").addClass("activeon");
		$(".senior").removeClass("activeon");
		$("#choice1").show();
		$("#choice2").hide();
	});
});
