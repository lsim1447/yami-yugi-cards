$(document).ready(function(){
	$(".fa-times").click(function(){
		$(".sidebar_menu").addClass("hide_menu");
		$(".toggle_menu").addClass("opacity_one");
		$(".fa-times").hide();
	});

	$(".toggle_menu").click(function(){
		$(".sidebar_menu").removeClass("hide_menu");
		$(".toggle_menu").removeClass("opacity_one");
		$(".fa-times").show();
	});

	$(".search_auto_complete").focusout(function(){
		$('.seach_results_container').hide();
	});

	$(".search_auto_complete").focusin(function(){
		$('.seach_results_container').show();
	});
});