document.addEventListener('DOMContentLoaded', () => {
    // START HERE
    const allSlides = [...document.querySelectorAll('.wbn-slide')];
    const btnNext = document.querySelector('.wbn-slider-next-btn');
    const btnPrev = document.querySelector('.wbn-slider-back-btn');

    const slideTime = 500;
    let clickable = true, active = null, newActive = null;

    const initSlider = function () {
        allSlides.forEach(slide => {
            slide.setAttribute(
                'style',
                `transition: transform ${slideTime}ms;
             animation-duration: ${slideTime}ms`
            );
        });
    };

    const changeSlide = function (forward) {
        if (clickable) {
            clickable = false;
            active = document.querySelector('.active');
            const activeIndex = allSlides.indexOf(active);

            if (forward) {
                // Slide Forward
                newActive = allSlides[(activeIndex + 1) % allSlides.length];
                active.classList.add('slideOutLeft');
                newActive.classList.add('slideInRight', 'active');

            } else {
                // Slide Backward
                newActive = allSlides[(activeIndex - 1 + allSlides.length) % allSlides.length];
                active.classList.add('slideOutRight');
                newActive.classList.add('slideInLeft' ,'active');
            }
        }
    }

    allSlides.forEach(slide => slide.addEventListener('transitionend', () => {
        // Check for the old active transition and if clickable is false
        // to not trigger it more than once
        if (slide === active && !clickable) {
            clickable = true;
            console.log(slide)
            // Remove all CSS animation classes on old active
            active.className = 'wbn-slide';
        }

    }));

    // Slide Forward
    btnNext.addEventListener('click', () => changeSlide(true));

    // Slide Backward
    btnPrev.addEventListener('click', () => changeSlide(false));

    // Init Slider
    initSlider();
});
