'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const burgerBtn = document.querySelector('.burger-menu'),
          burgerLines = burgerBtn.querySelectorAll('.burger-menu__line'),
          navMenu = document.querySelector('.nav'),
          navlinks = navMenu.querySelectorAll('.nav__link');

    burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('burger-menu_active');
            navMenu.classList.toggle('nav_active');
            burgerLines.forEach(line => {
                line.classList.toggle('burger-menu__line_active')
            });
    });

    navlinks.forEach(eachLink => {
        eachLink.addEventListener('click', () => {
            navMenu.classList.remove('nav_active');
            burgerBtn.classList.remove('burger-menu_active');
        });
    })
});