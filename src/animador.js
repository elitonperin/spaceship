function Animador(context, colisor){
	this.context = context;
	this.sprites = [];
	this.ligado = false;
	this.colisor = colisor;
}
Animador.prototype = {
	novoSprite: function(sprite){
		this.sprites.push(sprite);
	},
	ligar: function(){
		this.ligado = true;
		this.proximoFrame();
	},
	desligar: function(){
		this.ligado = false;
	},
	proximoFrame: function(){
		if(!this.ligado){
			return;
		}
		this.limparTela();
		var i = 0;
		var quantidade = this.sprites.length;
		for(; i < quantidade; i++){
			this.sprites[i].atualizar();
		}
		for(i = 0; i < quantidade; i++){
			this.sprites[i].desenhar();
		}

		this.desenharRetangulosDeColisao();

		this.colisor.processar();

		var vm = this;
		requestAnimationFrame(function(){
			vm.proximoFrame();
		});
	},
	limparTela: function(){
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
	},
	desenharRetangulosDeColisao: function(){
		var ctx = this.context;
		ctx.save();
		ctx.strokeStyle = 'yellow';
		for(var i = 0, count = this.sprites.length; i < count; i++){
			var retangulos = this.sprites[i].retangulosColisao();
			for(var j = 0, countJ = retangulos.length; j < countJ; j++){
				var rect = retangulos[j];
				ctx.strokeRect(rect.x, rect.y, rect.largura, rect.altura);
			}
			
		}
		ctx.restore();
	}
};