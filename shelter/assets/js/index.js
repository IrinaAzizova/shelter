'use strict';

document.addEventListener('DOMContentLoaded', () => {

	/*----------burger_menu----------*/

	const burgerBtn = document.querySelector('.burger-menu'),
		burgerLines = burgerBtn.querySelectorAll('.burger-menu__line'),
		navMenu = document.querySelector('.nav'),
		navlinks = navMenu.querySelectorAll('.nav__link'),
		overlay = document.querySelector('.overlay');

	const toOpenBurgerMenu = (burgerBtnSelector, navMenuSelector, burgerLinesSelector, overlaySelector) => {
		document.body.style.overflow = document.body.style.overflow == "hidden" ? "visible" : "hidden";
		overlaySelector.style.display = overlaySelector.style.display == 'block' ? 'none' : 'block';
		burgerBtnSelector.classList.toggle('burger-menu_active');
		navMenuSelector.classList.toggle('nav_active');
		burgerLinesSelector.forEach(line => {
				line.classList.toggle('burger-menu__line_active');
		});
	};

	const toCloseBurgerMenu = (burgerBtnSelector, navMenuSelector, burgerLinesSelector, overlaySelector) => {
		document.body.style.overflow = "visible";
		overlaySelector.style.display = 'none';
		navMenuSelector.classList.remove('nav_active');
		burgerBtnSelector.classList.remove('burger-menu_active');
		burgerLinesSelector.forEach(line => {
			line.classList.remove('burger-menu__line_active');
		});
	}
	
	burgerBtn.addEventListener('click', () => {
		toOpenBurgerMenu(burgerBtn, navMenu, burgerLines, overlay);
	});

	navlinks.forEach(eachLink => {
		eachLink.addEventListener('click', () => {
			toCloseBurgerMenu(burgerBtn, navMenu, burgerLines, overlay);
		});
	});

	window.addEventListener('keydown', (event) => {
        if (event.key == 'Escape' && burgerBtn.classList.contains('burger-menu_active')) {
            toCloseBurgerMenu(burgerBtn, navMenu, burgerLines, overlay);
        };
    });

	overlay.addEventListener('click', (event) => {
		if (event.target && event.target.classList.contains('overlay')) {
			toCloseBurgerMenu(burgerBtn, navMenu, burgerLines, overlay);
		}
		
	});



	/*-----------Slider----------*/

	const petsCatalogue = [
		{
			petName: 'Katrine',
			species: 'Cat - British Shorthair',
			description: "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
			img: 'assets/img/pets_section/pets-katrine.jpg'
		},
		{
			petName: 'Jennifer',
			species: 'Dog - Labrador',
			description: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
			img: 'assets/img/pets_section/pets-jennifer.jpg'
		},
		{
			petName: 'Woody',
			species: 'Dog - Golden Retriever',
			description: "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
			img: 'assets/img/pets_section/pets-woody.jpg'
		},
		{
			petName: 'Sophia',
			species: 'Dog - Shih tzu',
			description: "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
			img: 'assets/img/pets_section/pets-sofia.jpg'
		},
		{
			petName: 'Scarlett',
			species: 'Dog - Jack Russell Terrier',
			description: "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
			img: 'assets/img/pets_section/pets-scarlet.jpg'
		},		
		{
			petName: 'Timmy',
			species: 'Cat - British Shorthair',
			description: "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
			img: 'assets/img/pets_section/pets-timmy.jpg'
		},
		{
			petName: 'Freddie',
			species: 'Cat - British Shorthair',
			description: "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
			img: 'assets/img/pets_section/pets-freddie.jpg'
		},		
		{
			petName: 'Charly',
			species: 'Dog - Jack Russell Terrier ',
			description: "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
			img: 'assets/img/pets_section/pets-charly.jpg'
		}
	];
	
	const nextBtn = document.querySelector('.slider__arrow_next'),
		prevBtn = document.querySelector('.slider__arrow_prev'),
		slidesContainer = document.querySelector('.slider__slides'),
		sliderWrapper = document.querySelector('.slider__wrapper');

	let totalStides = 3,
		currentSlide = 0,
		cardsOnSlide = 3,
		currentCardsIndex = [],
		doneResizing;

	
	const toListenerResize = () => {
		if (parseFloat(window.getComputedStyle(document.documentElement).width) < 768) {
			cardsOnSlide = 1;
			totalStides = 8;
		} else if (parseFloat(window.getComputedStyle(document.documentElement).width) < 1280) {
			cardsOnSlide = 2;
			totalStides = 4;
		} else {
			totalStides = 3;
			cardsOnSlide = 3;
		}
	}
	toListenerResize();

	const toCreateCard = ({img, petName}, animateClass) => {
		const card = document.createElement('div');
		card.classList.add('pet-card', 'animate__animated',animateClass);
		card.innerHTML = `
			<img src="${img}" alt="${petName}" class="pet-card__img">
			<div class="pet-card__title">${petName}</div>
			<button class="btn btn_secondary pet-card__btn">Learn more</button>
		`;
		slidesContainer.append(card);
	}

	const toCalcRandomInt = (minInt, maxInt) => {
		let random = minInt + Math.random() * (maxInt + 1 - minInt);
		return Math.floor(random);
	}

	const toCalculateCardsIndex = () => {
		let newSlidesIndex = [];

		const toCreateArr = () => {
			for (let i = 0; i < cardsOnSlide; i++) {
				let randInt = toCalcRandomInt(0, 7);
				newSlidesIndex[i] = randInt;
				while (newSlidesIndex.indexOf(randInt) != i) {
					randInt = toCalcRandomInt(0, 7);
					newSlidesIndex[i] = randInt;
				}
			}
			return newSlidesIndex;
		}

		toCreateArr();

		for (let k = 0; k < cardsOnSlide; k++) {
			for (let j = 0; j < cardsOnSlide; j++) {
				while (currentCardsIndex[k] === newSlidesIndex[j]) {
					toCreateArr();
					j = 0; k = 0;
				}
			}
		}
		currentCardsIndex = newSlidesIndex;
		return newSlidesIndex;
	}
	toCalculateCardsIndex();

    //---------forming cards in order---------
	/* const toCreateSlide = (animateClass) => {
		slidesContainer.innerHTML = '';
		for (let i = 0; i < cardsOnSlide; i++) {
			if (petsCatalogue[i + currentSlide * cardsOnSlide]) {				
				toCreateCard(petsCatalogue[i + currentSlide * cardsOnSlide], animateClass);
			}
		}
	} */
	const toCreateSlide = (animateClass) => {
		slidesContainer.innerHTML = '';
		toCalculateCardsIndex().forEach( item => {
			toCreateCard(petsCatalogue[item], animateClass);
		});
	}
	toCreateSlide('animate__slideInRight');

	nextBtn.addEventListener('click', () => {
		currentSlide = currentSlide == totalStides - 1 ? 0 : currentSlide + 1;
		toCreateSlide('animate__slideInRight');
	});

	prevBtn.addEventListener('click', () => {
		currentSlide = currentSlide == 0 ? totalStides - 1 : currentSlide - 1;
		toCreateSlide('animate__slideInLeft');
	}); 

	window.addEventListener('resize', function(){
        this.clearTimeout(doneResizing);
        doneResizing = this.setTimeout(function(){
            toListenerResize();
			toCreateSlide('animate__slideInRight');
        }, 500);
    });	



	/*----------Popap----------*/

	const modalOverlay = document.querySelector('.overlay_modal'),
		  closeBtn = modalOverlay.querySelector('.modal__close');

	let petName = '',
		petCard;

	slidesContainer.addEventListener('click', (event) => {
		if (event.target.matches('.pet-card') || event.target.parentNode.matches('.pet-card')) {
			petCard = event.target.matches('.pet-card') ? event.target : event.target.parentNode;
			petName = petCard.querySelector('.pet-card__title').textContent;

			petsCatalogue.forEach( item => {
				if (item.petName === petName) {
					modalOverlay.innerHTML = `
						<div class="modal-window">
							<button class="btn btn_secondary modal__close" data-modal="close">
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
									</svg>
							</button>
							<img src="${item.img}" alt="${item.petName}" class="modal__img">
							<div class="modal__content">
								<p class="modal__name heading">${item.petName}</p>
								<p class="modal__breed">${item.species}</p>
								<p class="modal__descr">${item.description}</p>
								<ul class="modal__list">
									<li class="modal__item">Age: <span>2 months</span></li>
									<li class="modal__item">Inoculations: <span>none</span></li>
									<li class="modal__item">Diseases: <span>none</span></li>
									<li class="modal__item">Parasites: <span>none</span></li>
								</ul>
							</div>
						</div>
					`;
					console.log(item);
				}
			});
			console.log(petName);

			modalOverlay.style.display = 'flex';
			document.body.style.overflow = "hidden";
		}
	});

	closeBtn.addEventListener('click', () => {		
		modalOverlay.style.display = 'none';
		document.body.style.overflow = "visible";
	});

	modalOverlay.addEventListener('click', (event) => {
		if (event.target.matches('.overlay_modal') || event.target.matches('.modal__close')) {
			modalOverlay.style.display = 'none';
			document.body.style.overflow = "visible";
		}
	});
});