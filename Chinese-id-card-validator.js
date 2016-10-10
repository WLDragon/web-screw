/**
 * 校验中华人民共和国身份证号码
 * 校验内容包括
 *  1、长度和字符的合法性
 *  2、省级行政区编号的正确性
 *  3、生日合法性，不出现2月30日的情况
 *  4、最后一位校验码的正确性
 */
function check(id) {
	//长度15或18，必须是数字或最后一位是X
	if(!/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(id)) return false;

	//把15位转为18位，最后一位为校验位，15位的号码不需要校验
	if(id.length == 15) {
		var ids = id.split('');
		ids.splice(6, 0, '1', '9'); //splice返回的是被删除的无素，不能连缀操作
		id = ids.join('') + '#';
	}

	//拆分，提取号码信息
	var chips = id.match(/^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(\d{3})(\d|X|#)$/);
	var area = chips[1] * 1;
	var year = chips[3];
	var month = chips[4];
	var date = chips[5];
	var code = chips[7];

	//前6位为省市区编号，因为行政区太多且会变更，所以只检验前两位省级行政区编号
	if([11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82].indexOf(area) === -1) return false;

	//校验生日合法性
	if(new Date(year, month, date).getDate() != date) return false;

	//15位号码跳过校验位
	if(code === '#') return true;

	//校验校验位
	var x = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
	var w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	var sum = 0;
	for(var i = 0; i < 17; i++) {
		sum += id.charAt(i) * w[i];
	}
	
	return x[sum % 11] === code;
}