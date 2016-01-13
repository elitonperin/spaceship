(function(){
	window.onload = function(){
		var context = document.getElementById("myCanvas").getContext("2d");	
		var teclado = new Teclado(document);
		//var nave = new Nave(context, teclado, animador, 30,30);
		var bola  = new Bola(context, 100,100,20,'red');
		var bola2  = new Bola(context, 50,200,30,'blue');
		var colisor = new Colisor();
		var animador = new Animador(context, colisor);
		//colisor.novoSprite(nave);
		colisor.novoSprite(bola);
		colisor.novoSprite(bola2);

		//teclado.disparou(ESPACO, function(){
	//		nave.atirar();
//		});

//		animador.novoSprite(nave);
		animador.novoSprite(bola);
		animador.novoSprite(bola2);

		animador.ligar();
	};
}());