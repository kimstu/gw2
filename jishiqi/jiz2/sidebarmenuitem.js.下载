function menuitemactive( u ){

	//获取模块地址
	var model_url = u ? u : window.location.pathname;

	var url = model_url.toString();
	var arrUrl = url.split("/");

	if( arrUrl.length >= 3  )
		var category_url = '/' + arrUrl[1] + '/' + arrUrl[2];
	// else if( arrUrl.length == 2 ){
	// 	var category_url = '/' + arrUrl[1];
	// }
	// else if( arrUrl.length == 1 ){
	// 	var category_url = '/';
	// }

	$("#sidebarnav li a").each(function(index){
		if( $(this).attr('href') == category_url ){
		    $(this).addClass('active');
			$(this).parents('#sidebarnav ul').addClass('in');
			$(this).parents('#sidebarnav li').addClass('active');
			return false;
		}
	});
}


$(document).ready(function(){
	menuitemactive();

	$("#sidebarnav a:not(a[class='has-arrow waves-effect waves-dark'],a[class='has-arrow'])").click(function(){
		$("#sidebarnav a.active:not(a[class='has-arrow waves-effect waves-dark'],a[class='has-arrow'])").removeClass('active');
		$(this).addClass('active');
	});
});
