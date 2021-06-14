var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();

    inicializaMarcadores();
    
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}


function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var conteudoSemEspaco = conteudo.replace(/\s+/g, '');
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        var qtdCaracteres = conteudoSemEspaco.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.toggleClass("campo-desativado");
            }
        }, 1000);
    });
}

function reiniciaJogo() {
    campo.val("");
    campo.attr("disabled", false);
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    
    inicializaCronometro();

    campo.toggleClass("campo-desativado");

    campo.removeClass("borda-vermelha"); //novo
    campo.removeClass("borda-verde"); //novo
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);
        if(digitado == comparavel) {
            campo.removeClass("borda-vermelha");
            campo.addClass("borda-verde");
           } else {
            campo.removeClass("borda-verde");
            campo.addClass("borda-vermelha");
           }
    });
   }
