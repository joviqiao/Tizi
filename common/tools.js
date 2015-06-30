//生成要求长度的字符串
var randomCode = function(digitNum){
	var codeArry = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9"];
	var _randomCode = "";
	for(var i = 0; i < digitNum; i ++){
		var id = Math.floor(Math.random()*58);
		_randomCode = _randomCode + codeArry[id];
	}
	return _randomCode;
}

exports.randomCode = randomCode;