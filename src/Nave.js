function Nave(context, teclado, imagem, x, y, velocidade) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.animador = {};
    this.x = x;
    this.y = y;
    this.velocidade = velocidade;

    this.spriteSheet = new Spritesheet(context, imagem, 3, 2);
    this.spriteSheet.linha = 0;
    this.spriteSheet.intervalo = 100;
}
Nave.prototype = {
    atualizar: function() {
        var vm = this;
        var incremento = this.velocidade * this.animador.decorrido / 1000;
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.x -= incremento;
        }
        if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 36) {
            this.x += incremento;
        }
        if (this.teclado.pressionada(SETA_CIMA) && this.y > 0) {
            this.y -= incremento;
        }
        if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 48) {
            this.y += incremento;
        }
        this.teclado.disparou(ESPACO, function() {
            vm.atirar();
        });

    },
    desenhar: function() {

        if (this.teclado.pressionada(SETA_ESQUERDA)) {
            this.spriteSheet.linha = 1;
        } else if (this.teclado.pressionada(SETA_DIREITA)) {
            this.spriteSheet.linha = 2;
        } else
            this.spriteSheet.linha = 0;

        this.spriteSheet.desenhar(this.x, this.y);
        this.spriteSheet.proximoQuadro();
        //this.desenharRetangulosDeColisao();
    },
    atirar: function() {
        var tiro = new Tiro(this.context, this, 'blue');
        this.animador.novoSprite(tiro);
        this.colisor.novoSprite(tiro);
    },
    retangulosColisao: function() {
        return [{
            x: this.x,
            y: this.y + 18,
            largura: 15,
            altura: 14
        }, {
            x: this.x + 20,
            y: this.y + 18,
            largura: 15,
            altura: 14
        }, {
            x: this.x + 15,
            y: this.y,
            largura: 5,
            altura: 48
        }];
    },
    desenharRetangulosDeColisao: function() {
        var ctx = this.context;
        ctx.save();
        ctx.strokeStyle = 'yellow';
        var retangulos = this.retangulosColisao();
        for (var j = 0, countJ = retangulos.length; j < countJ; j++) {
            var rect = retangulos[j];
            ctx.strokeRect(rect.x, rect.y, rect.largura, rect.altura);
        }

        ctx.restore();
    },
    colidiuCom: function(sprite) {
        /**
        if (sprite instanceof Ovni) {
            this.animador.desligar();
            alert("Fim de jogo");
        }
        **/
    }
};