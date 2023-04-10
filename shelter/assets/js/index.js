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

	const toCreateCard = ({img, petName},parent, animateClass) => {
		const card = document.createElement('div');
		card.classList.add('pet-card', 'animate__animated',animateClass);
		card.innerHTML = `
			<img src="${img}" alt="${petName}" class="pet-card__img">
			<div class="pet-card__title">${petName}</div>
			<button class="btn btn_secondary pet-card__btn">Learn more</button>
		`;
		parent.append(card);
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
	const toCreateSlide = (container,array, animateClass) => {
		if (container) {
			container.innerHTML = '';
			toCalculateCardsIndex().forEach( item => {
				toCreateCard(array[item], container, animateClass);
			});
		}		
	}
	toCreateSlide(slidesContainer, petsCatalogue, 'animate__slideInRight');

	if (nextBtn) {
		nextBtn.addEventListener('click', () => {
			currentSlide = currentSlide == totalStides - 1 ? 0 : currentSlide + 1;
			toCreateSlide(slidesContainer, petsCatalogue, 'animate__slideInRight');
		});
	}	

	if (prevBtn) {
		prevBtn.addEventListener('click', () => {
			currentSlide = currentSlide == 0 ? totalStides - 1 : currentSlide - 1;
			toCreateSlide(slidesContainer, petsCatalogue, 'animate__slideInLeft');
		}); 
	}	

	



	/*----------Popap----------*/

	const modalOverlay = document.querySelector('.overlay_modal'),
		  closeBtn = document.querySelector('.modal__close'),
		  petsGaleryWrapper = document.querySelector('.pets-galery__wrapper');

	let petName = '',
		petCard;

	const toLayoutPetCard = (cardWrapperSelector) => {
		if (cardWrapperSelector) {
			cardWrapperSelector.addEventListener('click', (event) => {
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
		}
	}
	
	toLayoutPetCard(slidesContainer);
	toLayoutPetCard(petsGaleryWrapper);
	
	if (closeBtn) {
		closeBtn.addEventListener('click', () => {		
			modalOverlay.style.display = 'none';
			document.body.style.overflow = "visible";
		});
	}	


	modalOverlay.addEventListener('click', (event) => {
		if (event.target.matches('.overlay_modal') || event.target.matches('.modal__close')) {
			modalOverlay.style.display = 'none';
			document.body.style.overflow = "visible";
		}
	});



	/*----------pagination-navigation----------*/

	const nextPagPageBtn = document.querySelector('#next-page'),
		  prevPagPageBtn = document.querySelector('#prev-page'),
		  firstPagePagBtn = document.querySelector('#first-page'),
		  lastPagePagBtn = document.querySelector('#last-page'),
		  currentPagPageNum = document.querySelector('#page-num'),
		  galeryContainer = document.querySelector('.pets-galery__wrapper');

	let totalPagPages = 6,
		currentPagPage = 1;

	const objOfPetsData = {};
	let arrOfPetsPages = [],
		petCount = 1;	

	const toChangePaginationData = () => {
		if (parseFloat(window.getComputedStyle(document.documentElement).width) < 541) {
			totalPagPages = 16;
		} else if (parseFloat(window.getComputedStyle(document.documentElement).width) < 1279) {
			totalPagPages = 8;
		} else {
			totalPagPages = 6;
		}
		console.log(window.getComputedStyle(document.documentElement).width);
	}
	toChangePaginationData();

	/*----------pagination-slides----------*/

	

	

	/* forming an array of 48 elements */
	for (let repeat = 0; repeat < 6; repeat++) {
		petsCatalogue.forEach( (item) => {
			objOfPetsData[petCount] = item;
			petCount++;
		});
	}

	const toCreateGaleryCard = ({petName, img}) => {
		const card = document.createElement('div');
		card.classList.add('pet-card');
		card.innerHTML = `
			<img src="${img}" alt="${petName}" class="pet-card__img">
			<div class="pet-card__title">${petName}</div>
			<button class="btn btn_secondary pet-card__btn">Learn more</button>
		`;
		galeryContainer?.append(card);
	}

	const toCreateRandArr = (min, max) => {
		let arr = [];
		for (let i = 0; i < max; i++) {
			let randInt = toCalcRandomInt(min, max);
			arr[i] = randInt;
			while (arr.indexOf(randInt) != i) {
				randInt = toCalcRandomInt(min, max);
				arr[i] = randInt;
			}
		}
		return arr;
	}

	for (let n = 0; n < totalPagPages; n++) {
		let ar = toCreateRandArr(1, 48/totalPagPages);
		console.log(ar);
		arrOfPetsPages[n] = ar;
	}

	console.log(arrOfPetsPages);

	const toCreateGaleryPage = (arr) => {
		if (galeryContainer) {
			galeryContainer.innerHTML = '';
			arr.forEach( item => {
				toCreateGaleryCard(objOfPetsData[item]);
			});
		}		
	}
	toCreateGaleryPage(arrOfPetsPages[0]);
	console.log(objOfPetsData);
	


	/*----------Window-resize-listener----------*/
	window.addEventListener('resize', function(){
        this.clearTimeout(doneResizing);
        doneResizing = this.setTimeout(function(){
            toListenerResize();
			toChangePaginationData();
			toCreateRandArr();
			toCreateGaleryPage(arrOfPetsPages[0]);
			toCreateSlide(slidesContainer, petsCatalogue, 'animate__slideInRight');
        }, 500);
    });	

	

	const toCheckCurrentPage = (num) => {
		if (num  == totalPagPages) {
			nextPagPageBtn.classList.add('btn_inactive');
			lastPagePagBtn.classList.add('btn_inactive');
			prevPagPageBtn.classList.remove('btn_inactive');
			firstPagePagBtn.classList.remove('btn_inactive');
		} else if (num == 1) {
			prevPagPageBtn.classList.add('btn_inactive');
			firstPagePagBtn.classList.add('btn_inactive');
			nextPagPageBtn.classList.remove('btn_inactive');
			lastPagePagBtn.classList.remove('btn_inactive');
		} else {
			prevPagPageBtn.classList.remove('btn_inactive');
			firstPagePagBtn.classList.remove('btn_inactive');
			nextPagPageBtn.classList.remove('btn_inactive');
			lastPagePagBtn.classList.remove('btn_inactive');
		}

		currentPagPageNum.textContent = currentPagPage;
	}

	if (nextPagPageBtn) {
		nextPagPageBtn.addEventListener('click', () => {
			if (currentPagPage == totalPagPages) {
				currentPagPage = totalPagPages;
			} else {
				currentPagPage++;
			}

			toCheckCurrentPage(currentPagPage);
			toCreateGaleryPage(arrOfPetsPages[currentPagPage - 1]);
		});
	}

	if (prevPagPageBtn) {
		prevPagPageBtn.addEventListener('click', () => {
			if (currentPagPage == 1) {
				currentPagPage = 1;
			} else {
				currentPagPage--;
			}

			toCheckCurrentPage(currentPagPage);
			toCreateGaleryPage(arrOfPetsPages[currentPagPage - 1]);
		});
	}

	if (lastPagePagBtn) {
		lastPagePagBtn.addEventListener('click', () => {
			currentPagPage = totalPagPages;			
			toCheckCurrentPage(currentPagPage);			
			toCreateGaleryPage(arrOfPetsPages[currentPagPage - 1]);
		});
	}
	
	if (firstPagePagBtn) {
		firstPagePagBtn.addEventListener('click', () => {
			currentPagPage = 1;			
			toCheckCurrentPage(currentPagPage);			
			toCreateGaleryPage(arrOfPetsPages[currentPagPage - 1]);
		});
	}

	
});