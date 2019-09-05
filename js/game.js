
const canvas = document.querySelector("canvas");
const buttonStr = document.querySelector("button.start");
const buttonAgain = document.querySelector(".again");
const sec = document.querySelector("section");
const ctx = canvas.getContext("2d");
var empezar=false
var pause=false
var counter = 0
var moverseX = [false, 0]
var moverseY = [false, 0]
var asteroides = []
var balas = []
var proporcion = 0
var dano =30

var vidas=5
var puntuacion=0
var diff=1


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

    myAudio = new Audio('music/sci-fi.wav');
   
    myAudio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);

    buttonStr.addEventListener("click", function () {
        empezar = true
        sec.style = "display:none"
        
        
        myAudio.play();
    })

    buttonAgain.addEventListener("click", function () {
        buttonAgain.style = "display:none"
        
        empezar = true
        reset()
        start()

    })

   
    
        
    function start() {

        var intervalID = setInterval(() => {


            if (empezar == true) {
                counter++
                if (counter > 10000) {
                    counter = 0;
                }
                if (counter > 5000) {
                    diff++;
                }


                nave.mover()
                nave.disparar()


                //MOVIMIENTO DE LA NAVE
                if (moverseX[0] == true) {
                    nave.posx += moverseX[1] * 6
                }
                if (moverseY[0] == true) {
                    nave.posy += moverseY[1] * 6
                }

                ctx.clearRect(0, 0, w, h)


                HUDdraw()

                //DIBUJA LA NAVE
                ctx.drawImage(nave.img, nave.posx - 40, nave.posy - 40, 80, 80)
                if (nave.posx > w) {
                    nave.posx = 0
                    ctx.drawImage(nave.img, nave.posx - 40, nave.posy - 40, 80, 80)
                }
                if (nave.posx < 0) {
                    nave.posx = w
                    ctx.drawImage(nave.img, nave.posx - 40, nave.posy - 40, 80, 80)
                }

                if (nave.posy > h - 60) {
                    nave.posy = h - 60
                }

                if (nave.posy < 15) {
                    nave.posy = 15
                }





                //DEFINE LA DIFICULTAD
                if (diff >= 3) {

                    if (counter % 400 == 0) {
                        asteroides.push(new asteroidObj(Math.floor(Math.random() * w-20), "img/marron.png", 250, "asteroide"))
                    }
                }
                if (diff >= 2) {
                    if (counter % 300 == 0) {
                        asteroides.push(new asteroidObj(Math.floor(Math.random() * w-20), "img/asteroid.png", 100, "asteroide"))
                    }
                    if (counter % 500 == 0) {
                        asteroides.push(new asteroidObj(Math.floor(Math.random() * w-20), "img/marron.png", 250, "asteroide"))
                    }
                }

                if (counter % 200 == 0) {
                    asteroides.push(new asteroidObj(Math.floor(Math.random() * w-20), "img/asteroid.png", 100, "asteroide"))
                }
                if (counter % 700 == 0) {
                    asteroides.push(new asteroidObj(Math.floor(Math.random() * w-20), "img/marron.png", 250, "asteroide"))
                }
                if (counter % 1000 == 0) {
                    asteroides.push(new asteroidObj(Math.floor(Math.random() * w-20), "img/upgrade.png", 50, "mejora"))
                }
                //TERMINA LA DIFICULTAD

                //DIBUJA ASTEROIDES Y COLISION CON EL PLANETA
                for (let i = 0; i < asteroides.length; i++) {
                    asteroides[i].posY++
                    ctx.drawImage(asteroides[i].img, asteroides[i].posXIni, asteroides[i].posY, 80, 80)
                    if (asteroides[i].posY >= h - 100) {
                        vidas--
                        if (vidas < 0) {
                            canvas.style = "cursor:auto"
                            finish()
                            clearInterval(intervalID)
                        }
                        asteroides.splice(i, 1)
                    }
                }


                //EMPIEZA TODO LO DE LAS BALAS
                for (let i = 0; i < balas.length; i++) {
                    if (balas[i].posY < -20) {
                        balas.splice(i, 1)
                    }
                    // window.onmousemove = function (pos) {
                    //     mousePos[0] = window.event.clientX;
                    //     mousePos[1] = window.event.clientY;

                    //     // console.log("posX: "+mousePos[0]+" ----- posY: "+mousePos[1])
                    // }
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
                    balas[i].posY -= 3
                    ctx.drawImage(balas[i].img, balas[i].posX - 25, balas[i].posY - 25, 50, 50)

                    //COLISION BALAS VS ASTEROIDES
                    for (let j = 0; j < asteroides.length; j++) {
                        if (balas[i].posY < asteroides[j].posY + 80 &&
                            balas[i].posY > asteroides[j].posY &&
                            balas[i].posX < asteroides[j].posXIni + 80 &&
                            balas[i].posX + 30 > asteroides[j].posXIni
                        ) {
                            balas.splice(i, 1)
                            asteroides[j].health -= dano
                            if (asteroides[j].health <= 0) {
                                if (asteroides[j].name == "mejora") {
                                    if (dano < 100)
                                        dano += 30

                                }
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

            }

        }, 1000 / 60);
        
    }
    start()
    


    

};





