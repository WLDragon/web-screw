/**
 * 获取分页按钮上显示的数字
 * @param currentPage
 * @param totalPage
 * @param buttonLength 按钮数量，可选，默认为7
 */
function getPageScope(currentPage, totalPage, buttonLength){
	buttonLength = buttonLength || 7;

	var begin = currentPage - (~~(buttonLength / 2));
	if(begin < 1) begin = 1;
	//向后取足够的页数
	var end = begin + buttonLength - 1;
	if(end > totalPage) {
		end = totalPage;
		//向前取足够页数
		begin = end - buttonLength + 1;
		if(begin < 1) begin = 1;
	}

	return {
		begin: begin,
		end: end
	};
}