'use strict'

//variables
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children)
const rightButton = document.querySelector('.carousel__button--right');
const leftButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelectorAll('.carousel__indicator');

const slideWith = slides[0].getBoundingClientRect().width;
leftButton.disabled = true

//arrange slides
const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWith*index}px`
}

slides.forEach(setSlidePosition)

rightButton.addEventListener('click', (e)=> {
    const [ currentSlide, currentDote] = document.querySelectorAll('.current-slide')
    const nextSlide = currentSlide.nextElementSibling
    const nextDote = currentDote.nextElementSibling
    const toMove = nextSlide.style.left
    
    track.style.transform = `translateX(-${toMove})`
    currentSlide.classList.remove('current-slide')
    nextSlide.classList.add('current-slide')
    currentDote.classList.remove('current-slide')
    nextDote.classList.add('current-slide')
    
    checkForBeforeAndAfter(nextSlide)
})

leftButton.addEventListener('click', (e)=> {
    const [ currentSlide, currentDote] = document.querySelectorAll('.current-slide')
    const previousSlide = currentSlide.previousElementSibling
    const previousDote = currentDote.previousElementSibling
    const toMove = previousSlide.style.left

    track.style.transform = `translateX(-${toMove})`
    currentSlide.classList.remove('current-slide')
    previousSlide.classList.add('current-slide')
    currentDote.classList.remove('current-slide')
    previousDote.classList.add('current-slide')
    
    checkForBeforeAndAfter(previousSlide)
})


dotsNav.forEach((Dot, index) => {
    Dot.addEventListener('click', ()=>{
        const slideClicked = slides[index]
        const toMove = slideClicked.style.left
        dotsNav.forEach(dot=>dot.classList.remove('current-slide'))
        slides.forEach(slide=>slide.classList.remove('current-slide'))
        track.style.transform = `translateX(-${toMove})`
        Dot.classList.add('current-slide')
        slideClicked.classList.add('current-slide')
        checkForBeforeAndAfter(slideClicked)
    })
})

document.body.addEventListener('keydown', (e)=>{
    switch(e.code) {
        case 'ArrowRight': {
                const [ currentSlide, currentDote] = document.querySelectorAll('.current-slide')
                const nextSlide = currentSlide.nextElementSibling
                const nextDote = currentDote.nextElementSibling
                if(nextSlide) {
                    const toMove = nextSlide.style.left
                
                    track.style.transform = `translateX(-${toMove})`
                    currentSlide.classList.remove('current-slide')
                    nextSlide.classList.add('current-slide')
                    currentDote.classList.remove('current-slide')
                    nextDote.classList.add('current-slide')
                    
                    checkForBeforeAndAfter(nextSlide) 
                }
            }
            break
        case 'ArrowLeft': {
                const [ currentSlide, currentDote] = document.querySelectorAll('.current-slide')
                const previousSlide = currentSlide.previousElementSibling
                const previousDote = currentDote.previousElementSibling
                if(previousSlide) {
                    const toMove = previousSlide.style.left

                    track.style.transform = `translateX(-${toMove})`
                    currentSlide.classList.remove('current-slide')
                    previousSlide.classList.add('current-slide')
                    currentDote.classList.remove('current-slide')
                    previousDote.classList.add('current-slide')
                    
                    checkForBeforeAndAfter(previousSlide)
                }
            }
            break
    }
})

function checkForBeforeAndAfter(element) {
    if(!element.previousElementSibling) {
        leftButton.disabled = true
    } else {
        leftButton.disabled = false
    }
    if(!element.nextElementSibling) {
        rightButton.disabled = true
    } else {
        rightButton.disabled = false
    }
}