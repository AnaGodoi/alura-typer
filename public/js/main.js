var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function () {
    atualizaTamFrase();
    inicializaContadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    inicializaMarcadores();
    $(".botao-remover").click(removeLinha);
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    })
    $(".tooltip").tooltipster({
        trigger: "custom"
    })
});

function atualizaTempo(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamFrase() {
    var frase = $(".frase").text(); // aqui estamos usando a função de puxar a classe do html, como se fosse document.querySelector e com o .text dizemos oq queremos selecionar
    var numPalavras = frase.split(/\S+/).length;

    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numPalavras);
}


function inicializaContadores() {
    campo.on("input", function () {

        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;

        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);

    });
}


function inicializaCronometro() {

    campo.one("focus", function (params) {
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante)
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.addClass("campo-desativado");
    inserePlacar();

}

function inicializaMarcadores() {

    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}



function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}


