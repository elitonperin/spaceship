function Colisor() {
    this.sprites = [];
    this.aoColidir = null;
    this.spritesExcluir = [];
}
Colisor.prototype = {
    novoSprite: function(sprite) {
        sprite.colisor = this;
        this.sprites.push(sprite);
    },
    processar: function() {
        var jaTestados = {};
        var quantidade = this.sprites.length;
        var i = 0;
        var j = 0;
        for (; i < quantidade; i++) {
            for (; j < quantidade; j++) {
                if (i === j) {
                    continue;
                }

                var id1 = this.stringUnica();
                var id2 = this.stringUnica();

                if (!jaTestados[id1]) {
                    jaTestados[id1] = [];
                }
                if (!jaTestados[id2]) {
                    jaTestados[id2] = [];
                }

                if (!(jaTestados[id1].indexOf(id2) > 0 || jaTestados[id2].indexOf(id1) > 0)) {
                    this.testarColisao(this.sprites[i], this.sprites[j]);
                    jaTestados[id1].push(id2);
                    jaTestados[id2].push(id1);
                }
            }
        }

        this.processarExclusoes();
    },
    stringUnica: function() {
        var numero = Math.floor((Math.random() * 2500) + 1);
        return "Retangulo_" + numero;
    },
    testarColisao: function(sprite1, sprite2) {
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();
        var i = 0;
        var j = 0;
        var qtdRets1 = rets1.length;
        var qtdRets2 = rets2.length;

        colisoes: for (; i < qtdRets1; i++) {

            for (; j < qtdRets2; j++) {
                if (this.retangulosColidem(rets1[i], rets2[j])) {
                    sprite1.colidiuCom(sprite2);
                    sprite2.colidiuCom(sprite1);

                    if (this.aoColidir) {
                        this.aoColidir(sprite1, sprite2);
                    }

                    break colisoes;
                }
            }
        }
    },
    retangulosColidem: function(sprite1, sprite2) {
        return (sprite1.x + sprite1.largura) > sprite2.x && sprite1.x < (sprite2.x + sprite2.largura) && (sprite1.y + sprite1.altura) > sprite2.y && sprite1.y < (sprite2.y + sprite2.altura);
    },
    excluirSprite: function(sprite) {
        this.spritesExcluir.push(sprite);
    },
    processarExclusoes: function() {
        var novoArray = [];
        var i = 0;
        var qtd = this.sprites.length;
        for (; i < qtd; i++) {
            if (this.spritesExcluir.indexOf(this.sprites[i]) == -1) {
                novoArray.push(this.sprites[i]);
            }
        }
        this.spritesExcluir = [];
        this.sprites = novoArray;
    }
};