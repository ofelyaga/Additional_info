let buttonElement = document.querySelector('#scroll-button')
let targetElement = document.querySelector('#scroll-target')

let scrollTo = function(event){
    console.log(event)
    targetElement.scrollIntoView({behavior: "smooth"})
}

buttonElement.addEventListener('click', scrollTo)