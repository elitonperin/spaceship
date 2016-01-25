function Explosao(context, imagem, x, y) {
    this.context = context;
    this.imagem = imagem;
    this.x = x;
    this.y = y;
    this.spritesheet = new Spritesheet(context, imagem, 1, 5);
    this.spritesheet.intervalo = 75;
    var explosao = this;
    this.spritesheet.fimDoCiclo = function() {
        explosao.animador.excluirSprite(explosao);
    };
}
Explosao.prototype = {
    atualizar: function() {

    },
    desenhar: function() {
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    }
};