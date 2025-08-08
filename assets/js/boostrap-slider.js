document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-img');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    let isTransitioning = false;
    const transitionDuration = 500;
    const autoSlideInterval = 3000;

    function updateSliderPosition() {
        sliderWrapper.style.transition = `transform ${transitionDuration}ms ease`;
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function goToNextSlide() {
        if (!isTransitioning) {
            isTransitioning = true;
            currentIndex = (currentIndex + 1) % slides.length;
            updateSliderPosition();
            setTimeout(() => {
                isTransitioning = false;
            }, transitionDuration);
        }
    }

    function goToPrevSlide() {
        if (!isTransitioning) {
            isTransitioning = true;
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSliderPosition();
            setTimeout(() => {
                isTransitioning = false;
            }, transitionDuration);
        }
    }

    nextButton.addEventListener('click', goToNextSlide);
    prevButton.addEventListener('click', goToPrevSlide);

    setInterval(goToNextSlide, autoSlideInterval);
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function onDragStart(event) {
        isDragging = true;
        if (event.type === 'touchstart') {
            startX = event.touches[0].clientX;
        } else {
            startX = event.clientX;
            document.addEventListener('mousemove', onDragMove);
            document.addEventListener('mouseup', onDragEnd);
            if (event.pointerId !== undefined) {
                event.target.setPointerCapture(event.pointerId);
            }
        }
    }

    function onDragMove(event) {
        if (isDragging) {
            currentX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
            const diffX = startX - currentX;
            sliderWrapper.style.transform = `translateX(${-currentIndex * 100 + diffX}px)`;
        }
    }

    function onDragEnd(event) {
        if (isDragging) {
            isDragging = false;
            const diffX = startX - currentX;
            if (diffX > 50) {
                goToNextSlide();
            } else if (diffX < -50) {
                goToPrevSlide();
            } else {
                updateSliderPosition();
            }
            if (event.pointerId !== undefined) {
                event.target.releasePointerCapture(event.pointerId);
            }
            document.removeEventListener('mousemove', onDragMove);
            document.removeEventListener('mouseup', onDragEnd);
        }
    }

    sliderWrapper.addEventListener('mousedown', onDragStart);
    sliderWrapper.addEventListener('touchstart', onDragStart);
    sliderWrapper.addEventListener('touchmove', onDragMove);
    sliderWrapper.addEventListener('touchend', onDragEnd);
});
