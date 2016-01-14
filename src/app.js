(function() {
    window.onload = function() {
        var imgEspaco = new Image();
        imgEspaco.src = "images/fundo-espaco.png";

        var imgEstrelas = new Image();
        imgEstrelas.src = "images/fundo-estrelas.png";

        var imgNuvens = new Image();
        imgNuvens.src = "images/fundo-nuvens.png"

        var carregadas = 0;
        var total = 3;

        imgEspaco.onload = carregando;
        imgEstrelas.onload = carregando;
        imgNuvens.onload = carregando;

        function carregando() {
            carregadas++;
            if (carregadas = total)
                iniciar();
        }

        function iniciar() {
            var context = document.getElementById("myCanvas").getContext("2d");
            var teclado = new Teclado(document);
            var colisor = new Colisor();
            var animador = new Animador(context, colisor);

            var fundoEspaco = new Fundo(context, imgEspaco, 3);
            var fundoEstrelas = new Fundo(context, imgEstrelas, 7);
            var fundoNuvens = new Fundo(context, imgNuvens, 10);

            animador.novoSprite(fundoEspaco);
            animador.novoSprite(fundoEstrelas);
            animador.novoSprite(fundoNuvens);

            animador.ligar();
        }
    };
}());