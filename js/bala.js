class balaObj {
    constructor(x,y) {
       this.posX=x
       this.posY=y
       this.posFinX
       this.posFinY
       this.cambio=true
       this.img=new Image
       this.img.src="img/bala.png"
    }

    
cambiarFun(x,y){
    if (this.cambio==true) {
        this.posFinX=x
        this.posFinY=y
        this.cambio=false
    }
}
   


}