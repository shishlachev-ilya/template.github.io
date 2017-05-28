$(document).ready(function() {
	
	$('.popup').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});

	$(".more__link").on("click", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
  });


	var arrow = $('.b-arrow');

	arrow.hover(
		function(){
			arrow.addClass('t-arrow');
	}, 
		function(){
			arrow.removeClass('t-arrow');
	});

	$('.inner__list').hover(
		function(){
			arrow.addClass('t-arrow');
	}, 
		function(){
			arrow.removeClass('t-arrow');
	});

	
	function activeItem(e){
		e.preventDefault(false);

		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else{
			//убираем у всех активность и добавляем нужным
			$('.advantages__item').removeClass('active'); 
			$(this).addClass('active');
		}
		
		
	}


	$('.advantages__item').on('click', activeItem);




	var h_hght = 30; // высота шапки
	var h_mrg = 0;    // отступ когда шапка уже не видна
	                 
	$(function(){
	 
	    var elem = $('.header__bottom');
	    var top = $(this).scrollTop();
	     
	    if(top > h_hght){
	        elem.css('top', h_mrg);

	    }           
	     
	    $(window).scroll(function(){
	        top = $(this).scrollTop();
	         
	        if (top+h_mrg < h_hght) {
	            elem.css('top', (h_hght-top));
	            elem.removeClass('new_bg');
	            
	        } else {
	            elem.css('top', h_mrg);
        			elem.addClass('new_bg');
	        }
	    });
	 
	});


	$('.advantages__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
	});

	$('.main__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '.small__slider'
	});
	$('.small__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.main__slider',
		dots: false,
		centerMode: false,
		arrows: true,
		autoplay: true,
  	autoplaySpeed: 5000,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});

	$('.phone').mask('8(999) 999 99 99');

	$('.form').submit(function(e){
		e.preventDefault(false);

		var user = $(this).find('.name').val();
		var	phone = $(this).find('.phone').val();
		var nameError = $(this).find('.name__error');
		var phoneError = $(this).find('.phone__error');
		var validName = false;
		var validPhone = false;
		
		if(user == ''){
			nameError.fadeIn(200);
		}else{
			nameError.fadeOut(200);
			validName = true;
		}

		if(phone == ''){
			phoneError.fadeIn(200);
		}else{
			phoneError.fadeOut(200);
			validPhone = true;
		}
		

		if(validName == true && validPhone == true){
			// $('.site__form').unbind('submit').submit();
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: $(this).serialize()
			}).done(function(){
				//clear form
				$.magnificPopup.open({
				  items: {
				    src: '#success-send-form'
			  	},
			  	type: 'inline'

				}, 0);
			}).fail(function(){

				$.magnificPopup.open({
				  items: {
				    src: '#fail-send-form'
			  	},
			  	type: 'inline'

				}, 0);

			});
			
		}
	});

	$('.my-form').submit(function() {
		
		return false;
	});



	$('.mobile__link').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('mobile-active');
		$('.mobile__nemu-list').slideToggle();
	});

	$('.mobile_active-link').on('click', function(){
		$('.mobile__inner__list').slideToggle();
	});

	$(window).resize(function(){
		if($(window).width() < 480){
			$('.history__item').addClass('history__active');
		}else{
			$('.history__item').removeClass('history__active');
		}
	})

	$('body').on('click', '.history__active', function(){
		$(this).children('.history__text').slideToggle();
		$(this).toggleClass('h-arrow-top');
	});
	

});