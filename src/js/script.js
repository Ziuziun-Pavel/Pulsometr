"use strict"

$(document).ready(function(){
		$('.slider_inner').slick({
				prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left-arrow.png"></button>',
				nextArrow: '<button type="button" class="slick-next"><img src="../icons/right-arrow.png"></button>',
				responsive: [
						{
								breakpoint: 992,
								settings: {
									dots: true,
									arrows: false,
								}
							},
							{
								breakpoint: 575,
								settings: {
									swipe: true,
									swipeTOSlide: true,
									prevArrow: false,
									nextArrow: false
								}
							  },
				]
		});  

		$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
			$(this)
			  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

	//Modal

	const consultationBtns = document.querySelectorAll('[data-modal="consultation"]'),
		  consModal = document.querySelector('#consultation'),
		  orderModal = document.querySelector('#order'),
		  orderBtns = document.querySelectorAll('.button_mini'),
		  overlay = document.querySelector('.overlay'),
		  closeModal = document.querySelectorAll('.modal__close');

	let modalDescr = document.querySelector('#order .modal__subtitle');
	const cardTitle = document.querySelectorAll('.catalog-item__subtitle');

 	function closeModall(modal) {
		closeModal.forEach(e => {
			e.addEventListener('click', () => {
				overlay.style.display = 'none';
				modal.style.display = 'none';
			})
		})
	}

	function openModal(modal) {
		overlay.style.display = 'block';
		modal.style.display = 'block';
	}

	consultationBtns.forEach(e => {
		e.addEventListener('click', () => {
			openModal(consModal)
		})
	})

	closeModall(consModal);

	orderBtns.forEach((e, i) => {
		e.addEventListener('click', () => {
			openModal(orderModal);	
		    modalDescr.textContent = cardTitle[i].textContent;
		})
	})

	// let showMdl = setTimeout(openModal.bind(this, consModal), 1000);

	closeModall(orderModal); 

	function validateForm(modal) {
		$(modal).validate({
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
				},
			messages: {
				name: {
					required: "Пожалуйста, введите своё имя",
					minlength: jQuery.validator.format("Имя должно иметь не менее {0} символов"),
				},
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Введите правильный адрес электронной почты"
				}
				}
		});
	}

	validateForm('#main.feed-form');
	validateForm('#consultation form');
	validateForm('#order form');

	$("input[name=phone]").mask("+375 (99) 999-99-99");

	$("form").submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$("#consultation, #order").fadeOut();
			$(".overlay, #mini").fadeIn("slow");

			$('form').trigger('reset');
		});
		return false;
	});

	//scroll
	
const pageUp = document.querySelector('.pageup');

	window.addEventListener('scroll', function() {
		if(document.documentElement.scrollTop > 1000 && document.documentElement.scrollTop < 4000) {
			pageUp.style.display = "block";
			pageUp.style.opacity = "0.5";
		} else if(document.documentElement.scrollTop > 4000) {
			pageUp.style.opacity = "1";
		}

	
	});
	
	pageUp.addEventListener("click", (e) => {
		e.preventDefault();

        document.querySelector('.promo').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
	
	new WOW().init();
});


