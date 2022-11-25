let mouseX
let mouseY
let isSpraing = false

let spray = function(){
    if(isSpraing){
        for(let i=0; i<100; i=i+1){
            let dot = document.createElement('div')
            dot.classList.add('spray-dot')
            
            let sprayRadius = 100

            let dx = (Math.random() - .5) * sprayRadius * 2
            let dy = (Math.random() - .5) * sprayRadius * 2

            let x = mouseX + dx
            let y = mouseY + dy
            let dist = Math.hypot(dx, dy) / sprayRadius

            dot.style.left = x + 'px'
            dot.style.top = y + 'px'
            dot.style.width = (1-dist)*10 + 'px'
            dot.style.height = (1-dist)*10 + 'px'
            let hue = 300 + Math.random() * 50
            dot.style['background-color'] = `hsl(${hue}, 100%, 50%)`

            dot.style['animation-duration'] = 2+6*Math.random() + 's'
        
            document.body.appendChild(dot)    
        }
    }
}

setInterval(spray, 50)

let updateMouseXY = function(event){
    mouseX = event.pageX
    mouseY = event.pageY
}
document.addEventListener('mousemove', updateMouseXY)

// let switchSpraying = function(){
//     isSpraing = !isSpraing
// }

// document.addEventListener('click', switchSpraying)

document.addEventListener('mousedown', function(){isSpraing = true})
document.addEventListener('mouseup', function(){isSpraing = false})