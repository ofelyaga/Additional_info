let detailsElement = document.querySelector('#details')

let awaker = function(){
    let rect = detailsElement.getBoundingClientRect()
    // console.log(rect)
    if(rect.top < window.innerHeight && rect.bottom > 0){
        detailsElement.classList.add('awake')
    }
    else{
        detailsElement.classList.remove('awake')
    }
}

document.addEventListener('scroll', awaker)

// key words (let, function, if, else)

// наши переменные (detailsElement, rect, )
// их переменные (document, top, window, innerHeight, bottom, classList)

// наши функции (awake)
// их функции (querySelector, getBoundingClientRect, console.log, add, remove, addEventListener)

// наши значения ('#details', 'awake')
// их значения ('scroll')
