let burgerMenu = () => {
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
};

export default burgerMenu;