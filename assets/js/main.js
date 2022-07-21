import Carousel from './carousel.js';
import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
    containerID: '.mySlider',
    slideID: '.item',
    interval: 2000,
    isPlaying: true
});

carousel.init();