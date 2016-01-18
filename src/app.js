(function() {
    window.onload = function() {
        var imgEspaco = new Image();
        imgEspaco.src = "images/fundo-espaco.png";

        var imgEstrelas = new Image();
        imgEstrelas.src = "images/fundo-estrelas.png";

        var imgNuvens = new Image();
        imgNuvens.src = "images/fundo-nuvens.png";

        var imgNave = new Image();
        imgNave.src = "images/nave.png";

        var imgOvni = new Image();
        imgOvni.src = "images/ovni.png";

        var carregadas = 0;
        var total = 5;

        imgEspaco.onload = carregando;
        imgEstrelas.onload = carregando;
        imgNuvens.onload = carregando;
        imgNave.onload = carregando;
        imgOvni.onload = carregando;

        function carregando() {
            carregadas++;
            if (carregadas === total)
                iniciar();
        }

        function iniciar() {
            var context = document.getElementById("myCanvas").getContext("2d");
            var teclado = new Teclado(document);
            var colisor = new Colisor();
            var animador = new Animador(context, colisor);

            animador.novoProcessamento(colisor);

            var fundoEspaco = new Fundo(context, imgEspaco, 3);
            var fundoEstrelas = new Fundo(context, imgEstrelas, 7);
            var fundoNuvens = new Fundo(context, imgNuvens, 10);

            var nave = new Nave(context, teclado, imgNave, 100, 100, 10);

            animador.novoSprite(fundoEspaco);
            animador.novoSprite(fundoEstrelas);
            animador.novoSprite(fundoNuvens);

            colisor.novoSprite(nave);
            animador.novoSprite(nave);

            animador.ligar();

            setInterval(function() {
                novoOvni(context, animador, colisor);
            }, 1000);
        }

        function novoOvni(context, animador, colisor) {
            var ovni = new Ovni(context, imgOvni, 0, 0, 0);
            ovni.x = Math.floor(Math.random() * (context.canvas.width - imgOvni.width + 1));
            ovni.y = imgOvni.height;
            ovni.velocidade = Math.floor(Math.random() * 10) + 1;
            colisor.novoSprite(ovni);
            animador.novoSprite(ovni);

        }
    };
}());