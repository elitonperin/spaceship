function Nave(context, teclado, animacao, x, y){
	this.context = context;
	this.teclado = teclado;
	this.animacao = animacao;
	this.x = x;
	this.y = y;
}
Nave.prototype = {
	atualizar: function(){
		if(this.teclado.pressionada(SETA_ESQUERDA) && this.x > 20){
			this.x -= 10;
		}
		if(this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 20){
			this.x += 10;
		}
	},	
	desenhar: function(){
		this.context.fillRect(this.x, this.y,20,50);
	},
	atirar: function(){
		var tiro = new Bola(this.context, this.x +10, this.y + 10, 10, 'red' );
		if(this.teclado.pressionada(SETA_DIREITA)){
			tiro.vx = 20;
		}
		else{
			tiro.vx = -20;
		}
		this.animacao.novoSprite(tiro);
	},
	retangulosColisao: function(){
		return [
			{
				x: this.x,
				y: this.y,
				largura: this.x + 20,
				altura: this.y + 20
			}
		];
	},
	colidiuCom: function(sprite){
		console.log('colisao');
		console.log(sprite);
	}
};