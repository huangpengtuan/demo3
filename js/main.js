function bodyScroll(e){    
	e.preventDefault();
}
jQuery(document).ready(function($){
	var $menu_trigger = $('#menu-trigger'),
		$content_wrapper = $('.main-content'),
		$header = $('header');
	
	//open-close lateral menu clicking on the menu icon
	$menu_trigger.on('click', function(event){
		event.preventDefault();
		
		$menu_trigger.toggleClass('is-clicked');
		$header.toggleClass('menu-open');
		$content_wrapper.toggleClass('menu-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#top-nav').toggleClass('menu-open');
		
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}

		
		var isOpen = $header.hasClass("menu-open");
		if(isOpen){
			document.addEventListener('touchmove', bodyScroll, false);
		}else{
			document.removeEventListener('touchmove', bodyScroll, false);			
		}
	});
	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#menu-trigger, #menu-trigger span') ) {
			$menu_trigger.removeClass('is-clicked');
			$header.removeClass('menu-open');
			$content_wrapper.removeClass('menu-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('#top-nav').removeClass('menu-open');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});
});