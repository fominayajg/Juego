
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
var counter = 0
var moverseX = [false, 0]
var moverseY = [false, 0]
var asteroides = []
var balas = []
var proporcion = 0


var vidas=5
var puntuacion=0



var w = window.innerWidth
var h = window.innerHeight
canvas.setAttribute("width", `${w}px`);
canvas.setAttribute("height", `${h}px`);
var w2 = w / 2;
var h2 = h / 2;
var mousePos = []
var nave = new naveObj(w2, h2)



//DETECTA POSICION DEL RATON









window.onload = function () {



    var intervalID = setInterval(() => {
        counter++
        if (counter > 1000) {
            counter = 0;
        }


        nave.mover()
        nave.disparar()

        if (moverseX[0] == true) {
            nave.posx += moverseX[1] * 4
        }
        if (moverseY[0] == true) {
            nave.posy += moverseY[1] * 4
        }

        ctx.clearRect(0, 0, w, h)


       HUDdraw()


        ctx.drawImage(nave.img, nave.posx - 40, nave.posy - 40, 80, 80)
        
        


        if (counter % 200 == 0) {
            asteroides.push(new asteroidObj(Math.floor(Math.random() * w), "img/asteroid.png",100))
        }
        if (counter % 700 == 0){
            asteroides.push(new asteroidObj(Math.floor(Math.random() * w), "img/marron.png", 200))
        }

        for (let i = 0; i < asteroides.length; i++) {
            asteroides[i].posY++
            ctx.drawImage(asteroides[i].img, asteroides[i].posXIni, asteroides[i].posY, 80, 80)
            if (asteroides[i].posY>=h-100) {
                vidas--
                if (vidas<0){
                    alert("gameover")
                    clearInterval(intervalID)
                }
                asteroides.splice(i,1)
            }


        }

        for (let i = 0; i < balas.length; i++) {
            if (balas[i].posY < -20) {
                balas.splice(i, 1)
            }



            window.onmousemove = function (pos) {
                mousePos[0] = window.event.clientX;
                mousePos[1] = window.event.clientY;

                // console.log("posX: "+mousePos[0]+" ----- posY: "+mousePos[1])
            }
            // balas[i].cambiarFun(mousePos[0], mousePos[1])
            // if (balas[i].posFinX >= balas[i].posFinY) {
            //     proporcion = balas[i].posFinX / balas[i].posFinY
            //     balas[i].posX+=1
            //     balas[i].posY-=proporcion
            // }else{
            //     proporcion = balas[i].posFinY / balas[i].posFinX

            //     balas[i].posX += proporcion
            //     if (balas[i].posFinY<nave.posy) {
            //         balas[i].posY -= 1
            //     }

            // }


            balas[i].posY-=3
            ctx.drawImage(balas[i].img,balas[i].posX-25, balas[i].posY-25, 50, 50)





            for (let j = 0; j < asteroides.length; j++) {
                if (balas[i].posY < asteroides[j].posY + 80 &&
                    balas[i].posY > asteroides[j].posY &&
                    balas[i].posX < asteroides[j].posXIni + 80 &&
                    balas[i].posX + 30 > asteroides[j].posXIni
                ) {
                    balas.splice(i, 1)
                    asteroides[j].health -= 35
                    if (asteroides[j].health <= 0) {
                        asteroides.splice(j, 1)
                        puntuacion++
                    }
                }

            }

            // let balaDani = new Image
            // balaDani.src = "img/bala.png"
            // balaDani.onload = function () {
            //     // var bulletVector = new Victor(mousePos[0], mousePos[1])
            //     var factor = 1
            //     setInterval(() => {
            //         var bulletVector = new Victor(mousePos[0] - w2, mousePos[1] - h2)
            //         factor += .05
            //         bulletVector.multiply(new Victor(factor, factor))

            //         // ctx.beginPath()
            //         // ctx.moveTo(nave.posx, nave.posy)
            //         // ctx.lineTo(bulletVector.x + nave.posx, bulletVector.y + nave.posy)
            //         // ctx.strokeStyle = "rgb(255, 255, 255)"
            //         // ctx.stroke()
            //         // ctx.closePath()
                    
            //         ctx.drawImage(balaDani, bulletVector.x + nave.posx - 25, bulletVector.y + nave.posy - 25, 50, 50)
            //     }, 1000);
            // }

           
        }



    }, 1000 / 60);





};





