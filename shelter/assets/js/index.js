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
		cardsOnSlide = 3;
	
	if (+window.getComputedStyle(document.documentElement).width.slice(0, -3) < 768) {
		console.log(+window.getComputedStyle(document.documentElement).width.slice(0, -3));
		cardsOnSlide = 1;
		totalStides = 8;
	} else if (+window.getComputedStyle(document.documentElement).width.slice(0, -3) < 768) {
		console.log(+window.getComputedStyle(document.documentElement).width.slice(0, -3));
		cardsOnSlide = 2;
		totalStides = 4;
	}

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

	const toCreateSlide = (animateClass) => {
		slidesContainer.innerHTML = '';
		for (let i = 0; i < cardsOnSlide; i++) {
			if (petsCatalogue[i + currentSlide * cardsOnSlide]) {				
				toCreateCard(petsCatalogue[i + currentSlide * cardsOnSlide], animateClass);
			}
		}
	}

	toCreateSlide('animate__slideInRight');

	nextBtn.addEventListener('click', () => {
		currentSlide = currentSlide == totalStides - 1 ? 0 : currentSlide + 1;
		console.log(currentSlide);
		toCreateSlide('animate__slideInRight');
	});

	prevBtn.addEventListener('click', () => {
		currentSlide = currentSlide == 0 ? totalStides - 1 : currentSlide - 1;
		
		console.log(currentSlide);
		toCreateSlide('animate__slideInLeft');
	}); 

	/*console.log(+window.getComputedStyle(document.documentElement).width.slice(0, -3));

	if (+window.getComputedStyle(document.documentElement).width.slice(0, -3) < 1279) {
		console.log(+window.getComputedStyle(document.documentElement).width.slice(0, -3));
		cardsOnSlide = 2;
		slides = 4;
	} */
});