let doc = document;

let slidesData = [
    {title: 'slide1', img: 'img-1.jpg', category: 'pet'},
    {title: 'slide2', img: 'img-2.jpg', category: 'predator'},
    {title: 'slide3', img: 'img-3.jpg', category: 'pet'},
    {title: 'slide4', img: 'img-4.jpg', category: 'nature'},
    {title: 'slide5', img: 'img-5.jpg', category: 'nature'},
];

let slides = renderSlides(slidesData, '.slider');
let btnPrev = doc.querySelector('#btn-prev');
let btnNext = doc.querySelector('#btn-next');
let dots = '';

let slidesCount = slides.length;
let currentSlide = 1;

renderDots();
showSlide(currentSlide);

btnPrev.onclick = slidePrev;
btnNext.onclick = slideNext;

function renderSlides(dataArr, parentSelector) {
    let parent = doc.querySelector(parentSelector);
    let slidesItemHtml = dataArr
                .map(function(slide) {
                    let slides = slide.category == "nature"
                    ? `slide ${slide.category}` 
                    : `slide ${slide.category}`;
            
                    return `
                        <div class="slide" title="${slides}">
                            <img src="./img/${slide.img}" alt="">
                        </div>`})
                .join('');

    let slidesHtml = `<div class="slides">${slidesItemHtml}</div>`
    parent.innerHTML += slidesHtml;
    let slidesEls = doc.querySelectorAll('.slide');

    return slidesEls;
}

function slideNext() {
    changeSlide(currentSlide + 1);
}
function slidePrev() {
    changeSlide(currentSlide - 1);
}

function showSlide() {
    if (currentSlide > slidesCount) {
        currentSlide = 1;
    }
    if (currentSlide < 1) {
        currentSlide = slidesCount;
    }
    slides[currentSlide - 1].classList.add('slide_active');
    dots[currentSlide - 1].classList.add('slider__dot_active');
}
function hideSlide() {
    slides[currentSlide - 1].classList.remove('slide_active');
    dots[currentSlide - 1].classList.remove('slider__dot_active');
}
function changeSlide(newValue) {
    hideSlide(currentSlide);
    currentSlide = newValue;
    showSlide(currentSlide);
}

function renderDots() {
    let slidersDotsEl = doc.querySelector('.slider__dots');
    for (let i = 0; i < slidesCount; i++) {
        dots += '<span class="slider__dot"></span>'
    }
    slidersDotsEl.innerHTML = dots;

    dots = doc.querySelectorAll('.slider__dot');
    for (let i = 0; i < dots.length; i ++) {
        dots[i].onclick = function() {
            changeSlide(i + 1);
        }
    }
}

