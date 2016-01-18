function Nave(context, teclado, imagem, x, y, velocidade) {
    this.context = context;
    this.teclado = teclado;
    this.imagem = imagem;
    this.animador = {};
    this.x = x;
    this.y = y;
    this.velocidade = velocidade;
}
Nave.prototype = {
    atualizar: function() {
        var vm = this;
        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.x -= this.velocidade;
        }
        if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.imagem.width) {
            this.x += this.velocidade;
        }
        if (this.teclado.pressionada(SETA_CIMA) && this.y > 0) {
            this.y -= this.velocidade;
        }
        if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - this.imagem.height) {
            this.y += this.velocidade;
        }
        this.teclado.disparou(ESPACO, function() {
            vm.atirar();
        });



    },
    desenhar: function() {
        this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
        this.desenharRetangulosDeColisao();
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
            altura: this.imagem.height
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

        if (sprite instanceof Ovni) {
            this.animador.desligar();
            alert("Fim de jogo");
        }
    }
};