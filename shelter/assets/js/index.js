'use strict';

import burgerMenu from './burger-menu.js';
import petData from './pet-catalogue.js';

document.addEventListener('DOMContentLoaded', () => {

	burgerMenu();

	const petsCatalogue = petData();

	/*-----------Slider----------*/

	
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
			container.classList.add('animate__animated', 'animate__slideInRight');
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
	toCreateGaleryCard(objOfPetsData[1]);

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

	
	
	/*----------Window-resize-listener----------*/
	
	window.addEventListener('resize', function(){
        this.clearTimeout(doneResizing);
        doneResizing = this.setTimeout(function(){
            toListenerResize();
			toCreateSlide(slidesContainer, petsCatalogue, 'animate__slideInRight');
			toChangePaginationData();
			for (let n = 0; n < totalPagPages; n++) {
				let ar = toCreateRandArr(1, 48/totalPagPages);
				arrOfPetsPages[n] = ar;
			}
			toCreateGaleryPage(arrOfPetsPages[0]);
		console.log(window.getComputedStyle(document.documentElement).width, totalPagPages);
        }, 500);
    });	
	
});