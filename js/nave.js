class naveObj {
    constructor(x,y){
        this.posx= x
        this.posy = y
        this.img= new Image
        this.img.src="img/nave.png"
    }


mover() {

    window.addEventListener("keydown",function(e){
        if (e.keyCode==87 ) {

            moverseY=[true,-1]
        }
        //MUEVE ABAJO
        if (e.keyCode == 83) {
            moverseY = [true, 1]
           
        }
        //MUEVE IZQ
        if (e.keyCode == 65) {
            moverseX = [true, -1]
        }
        //MUEVE DCHA
        if (e.keyCode == 68) {
            moverseX = [true, 1]
        }
    })

    window.addEventListener("keyup", function (e) {
        if (e.keyCode == 87) {

            moverseY = [false, -1]
        }
        //MUEVE ABAJO
        if (e.keyCode == 83) {
            moverseY = [false, 1]
        }
        //MUEVE IZQ
        if (e.keyCode == 65) {
            moverseX = [false, -1]
        }
        //MUEVE DCHA
        if (e.keyCode == 68) {
            moverseX = [false, -1]
        }
    })

}


    disparar(){
       
           if (counter%20==0) {
               balas.push(new balaObj(nave.posx, nave.posy))
           }
          
           
      
        
    }


}




