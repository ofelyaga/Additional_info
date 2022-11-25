let hoverGallery = document.querySelectorAll('.project-box')

for (i = 0; i < hoverGallery.length; i++) {

  let projectBoxElement = hoverGallery[i]

  projectBoxElement.addEventListener('mousemove', function(event){
    hoverAnimation(i, projectBoxElement, event)
  })

}

let hoverAnimation = function(i, object, event){
 
  let elementWidth = object.offsetWidth + 1 // это чтобы последний пискель не ломал всё
  
  let imagesCount = object.querySelectorAll('img').length
  let stripeWidth = elementWidth / imagesCount;
  
  mouseX = event.offsetX

  let imageN = Math.floor(mouseX/stripeWidth)

  let projectImageElement = object.querySelector('.project-images')
  let imageShift = imageN * -100

  projectImageElement.style.top = `${imageShift}%`
}



