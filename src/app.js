(function() {
    window.onload = function() {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        var imagens = [];
        var animador = {};
        var teclado = {};
        var colisor = {};
        var nuvens = {};
        var estrelas = {};
        var espaco = {};
        var nave = {};
        var inimigo = {};
        var totalImagens = 0;
        var imagensCarregadas = 0;

        carregarImagens();


        function carregarImagens() {
            imagens = {
                espaco: "fundo-espaco.png",
                estrelas: "fundo-estrelas.png",
                nuvens: "fundo-estrelas.png",
                nave: "nave-spritesheet.png",
                ovni: "ovni.png",
                explosao: "explosao.png"
            };

            for (var i in imagens) {
                var img = new Image();
                img.src = 'images/' + imagens[i];
                img.onload = carregando;
                imagens[i] = img;
                totalImagens++;
            }
        }

        function carregando() {
            imagensCarregadas++;
            if (imagensCarregadas === totalImagens)
                iniciarObjetos();
        }

        function iniciarObjetos() {
            animador = new Animador(context);
            teclado = new Teclado(document);
            colisor = new Colisor();
            espaco = new Fundo(context, imagens.espaco, 60);
            estrelas = new Fundo(context, imagens.estrelas, 150);
            nuvens = new Fundo(context, imagens.nuvens, 500);
            nave = new Nave(context, teclado, imagens.nave, (canvas.width / 2 - 18), (canvas.height - 48), 250);

            animador.novoSprite(espaco);
            animador.novoSprite(estrelas);
            animador.novoSprite(nuvens);
            animador.novoSprite(nave);

            colisor.novoSprite(nave);
            animador.novoProcessamento(colisor);
            criacaoInimigos();

            animador.ligar();
        }

        function criacaoInimigos() {
            criadorInimigos = {
                ultimoOvni: new Date().getTime(),

                processar: function() {
                    var agora = new Date().getTime();
                    var decorrido = agora - this.ultimoOvni;
                    if (decorrido > 1000) {
                        novoOvni();
                        this.ultimoOvni = agora;
                    }
                }
            };

            animador.novoProcessamento(criadorInimigos);
        }

        function novoOvni() {
            var ovni = new Ovni(context, imagens.ovni,imagens.explosao);
            ovni.x = Math.floor(Math.random() * (context.canvas.width - imagens.ovni.width + 1));
            ovni.y = imagens.ovni.height;
            ovni.velocidade = Math.floor(Math.random() * 500) + 150;
            colisor.novoSprite(ovni);
            animador.novoSprite(ovni);
        }
    };
}());