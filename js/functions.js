function HUDdraw() {
    ctx.beginPath()
    ctx.fillStyle = "rgb(255, 255, 255)"
    ctx.font = '30px Play'
    ctx.fillText(`vidas: ${vidas}`, 40, 40)
    ctx.fillText(`Puntos : ${puntuacion}`, 40, 80)
    ctx.fillText(`Daño : ${dano}`, 40, 120)
    ctx.closePath()



    ctx.beginPath()
    ctx.fillStyle = "rgb(250, 148, 41)"
    ctx.fillRect(0, h - 100, w, 100);
    ctx.closePath()

    ctx.beginPath()
    ctx.fillStyle = "rgb(250, 100, 50)"
    ctx.arc(w2, h+10*w-80, 10*w, 0, Math.PI * 2);
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()
    ctx.fillStyle = "rgba(20, 20, 20,0.2)"
    ctx.arc(nave.posx, h-50 , nave.posy*0.05, 0, Math.PI * 2);
    ctx.fill()
    ctx.closePath()
}

function finish() {

    setTimeout(() => {
        ctx.beginPath()
        ctx.clearRect(0, 0, w, h)
        ctx.beginPath()
        ctx.fillStyle = "rgb(250, 148, 41)"
        ctx.fillRect(0, h - 100, w, 100);
        ctx.closePath()

        ctx.beginPath()
        ctx.fillStyle = "rgb(250, 100, 50)"
        ctx.arc(w2, h + 10 * w - 80, 10 * w, 0, Math.PI * 2);
        ctx.fill()
        ctx.closePath()

        ctx.fillStyle = "rgb(255, 255, 255)"
        ctx.font = '100px Play'
        ctx.fillText(`GAME OVER`, w2/2, h2-50,w2)
        ctx.fillText(`Has sacado: ${puntuacion} puntos`,w2/2 , h2 + 100,w2)
        


        
        ctx.closePath()
    }, 100);
    
}