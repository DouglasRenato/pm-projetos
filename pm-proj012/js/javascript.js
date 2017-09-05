/*##############################################################*/
/* LÓGICA */
/*##############################################################*/
// Variáveis essenciais para o funcionamento.
let realParaDolar = false;
let dolarParaReal = true;
let tempReal = ["0", ",", "0", "0"];
let tempDolar = ["0", ".", "0", "0"];
let clickCont = 0;

// API
let cotacaoDolarOk;
let api = 'http://api.fixer.io/latest?base=USD';
let request = new XMLHttpRequest();
request.open('GET', api);
request.responseType = 'json';
request.send();
request.onload = function () {
    let cotacao = request.response;
    //guarda especifico dado do objeto na variavel global para poder ser usada em qualquer parte.
    cotacaoDolarOk = cotacao.rates.BRL.toFixed(2);
}

// Escolha do tipo de conversão no inicio
$(".moeda").addEventListener("click", function () {
    if ($("header p").innerText == '') {
        if ($(".real-p-dolar").classList.contains("esconde")) {
            imgRealParaDolar();
        } else if ($(".dolar-p-real").classList.contains("esconde")) {
            imgDolarParaReal();
        }
    }
});

// Eventos para capturar o click nos botões
$(".nove").addEventListener("click", function () {
    capturaClique($(".nove").innerText);
});
$(".oito").addEventListener("click", function () {
    capturaClique($(".oito").innerText);
});
$(".sete").addEventListener("click", function () {
    capturaClique($(".sete").innerText);
});
$(".seis").addEventListener("click", function () {
    capturaClique($(".seis").innerText);
});
$(".cinco").addEventListener("click", function () {
    capturaClique($(".cinco").innerText);
});
$(".quatro").addEventListener("click", function () {
    capturaClique($(".quatro").innerText);
});
$(".tres").addEventListener("click", function () {
    capturaClique($(".tres").innerText);
});
$(".dois").addEventListener("click", function () {
    capturaClique($(".dois").innerText);
});
$(".um").addEventListener("click", function () {
    capturaClique($(".um").innerText);
});
$(".cell-zero").addEventListener("click", function () {
    capturaClique($(".cell-zero").innerText);
});
// Botao reseta calculadora
$(".clear").addEventListener("click", function () {
    capturaClique($(".clear").innerText);
});

// // Faz a conversão com base na escolha da moeda
$(".moeda").addEventListener("click", function () {
    if ($(".moeda").classList.contains("moeda-converter")) {
        // Real para dolar
        if ($(".dolar-p-real").classList.contains("esconde") == false) {
            corBotaoConvertido();
            converteDolarParaReal();
        }
        // Dolar para real
        else if ($(".real-p-dolar").classList.contains("esconde") == false) {
            corBotaoConvertido();
            converteRealParaDolar();
        }
    }
});

/*##############################################################*/
/* FUNÇÕES */
/*##############################################################*/
// Captura elemento (questão de produtividade)
function $(elemento) {
    return document.querySelector(elemento);
}

// Mostra botao: real para dolar
function imgRealParaDolar() {
    $(".real-p-dolar").classList.remove("esconde");
    $(".dolar-p-real").classList.add("esconde");
    realParaDolar = true;
    dolarParaReal = false;
}

// Mostra botao: dolar para real
function imgDolarParaReal() {
    $(".real-p-dolar").classList.add("esconde");
    $(".dolar-p-real").classList.remove("esconde");
    realParaDolar = false;
    dolarParaReal = true;
}

// Troca o fundo moeda para laranja (à converter)
function corBotaoConverter() {
    $(".moeda").classList.add("moeda-converter");
    $(".moeda").classList.remove("moeda-convertido");
}

// Troca o fundo moeda para verde (convertido)
function corBotaoConvertido() {
    $(".moeda").classList.add("moeda-convertido");
    $(".moeda").classList.remove("moeda-converter");
}

// Trata o evento click nos botões de 0-9 e c(claer)
function capturaClique(elemento) {
    for (let i = 0; i < 10; i++) {
        if (elemento == i) {
            if ($(".moeda").classList.contains("moeda-convertido")) {
                reseta();
            }
            clickCont++;
            if (realParaDolar == true) {
                $("header p").innerHTML = "R$" + arrayParaMoeda(i, tempReal, ",", ".").join("");
            } else if (dolarParaReal == true) {
                $("header p").innerHTML = "$" + arrayParaMoeda(i, tempDolar, ".", ",").join("");
            }
            corBotaoConverter();
        }
        else if (elemento == 'c') {
            reseta();
        }
    }
}

// Formata o conteúdo do array para moeda deseja (tela inicial) (até 1Mi)
function arrayParaMoeda(botao, moeda, dezena, milhar) {
    if (clickCont == 1) {
        moeda.splice(3, 1, botao);
    } else if (clickCont == 2) {
        moeda.push(botao);
        moeda.splice(0, 2);
        moeda.splice(1, 0, dezena);
    } else if (clickCont == 3) {
        moeda.push(botao);
        moeda.splice(0, 2);
        moeda.splice(1, 0, dezena);
    } else if (clickCont == 4) {
        moeda.push(botao);
        moeda.splice(1, 1);
        moeda.splice(2, 0, dezena);
    } else if (clickCont == 5) {
        moeda.push(botao);
        moeda.splice(2, 1);
        moeda.splice(3, 0, dezena);
    } else if (clickCont == 6) {
        moeda.push(botao);
        moeda.splice(3, 1);
        moeda.splice(4, 0, dezena);
        moeda.splice(1, 0, milhar);
    } else if (clickCont == 7) {
        moeda.push(botao);
        moeda.splice(5, 1);
        moeda.splice(6, 0, dezena);
        moeda.splice(1, 1);
        moeda.splice(2, 0, milhar);
    } else if (clickCont == 8) {
        moeda.push(botao);
        moeda.splice(6, 1);
        moeda.splice(7, 0, dezena);
        moeda.splice(2, 1);
        moeda.splice(3, 0, milhar);
    } else if (clickCont == 9) {
        moeda.push(botao);
        moeda.splice(7, 1);
        moeda.splice(8, 0, dezena);
        moeda.splice(3, 1);
        moeda.splice(4, 0, milhar);
        moeda.splice(1, 0, milhar);
    }
    return moeda;
}

// Converte de dolar para real
function converteDolarParaReal() {
    // Retira o "$" do inicio para depois poder converter p/ float
    let stringParaFloatTemp = $("header p").innerText.split("$").join("");
    // Transforma string em numero real
    let stringParaFloat = parseFloat(stringParaFloatTemp.split(",").join("")).toFixed(2);
    // Faz o calculo (com a variavel cotacaoDolarOk(resultado da API!)  
    let convertidoDolarparaReal = stringParaFloat * cotacaoDolarOk;
    // Converte a string para um array e guarda na variavel
    let stringParaFloatArray = Array.from(convertidoDolarparaReal.toFixed(2).split(".").join(","));
    // Confere o tamanho do array e add os pontos no local correto (formata)
    if (stringParaFloatArray.length == 7) {
        stringParaFloatArray.splice(1, 0, ".");
    } else if (stringParaFloatArray.length == 8) {
        stringParaFloatArray.splice(2, 0, ".");
    } else if (stringParaFloatArray.length == 9) {
        stringParaFloatArray.splice(3, 0, ".");
    } else if (stringParaFloatArray.length == 10) {
        stringParaFloatArray.splice(1, 0, ".");
        stringParaFloatArray.splice(5, 0, ".");
    } else if (stringParaFloatArray.length == 11) {
        stringParaFloatArray.splice(2, 0, ".");
        stringParaFloatArray.splice(6, 0, ".");
    }
    // Mostra no display o valor já convertido e formatado
    $("header p").classList.add("header-convertido");  
    $("header p").innerHTML = "R$" + stringParaFloatArray.join("");
}

// Converte de real para dolar
function converteRealParaDolar() {
    // Retira o "R$" do inicio para depois poder converter p/ float
    let stringParaFloatTemp = $("header p").innerText.split("R$").join("");
    // Transforma string em numero real, tira os pontos, troca a vrigula pelo ponto e fixa 2 casas depois do ponto.
    let stringParaFloat = parseFloat(stringParaFloatTemp.split(".").join("").split(",").join(".")).toFixed(2);
    // Faz o calculo (com a variavel cotacaoDolarOk(resultado da API!) 
    let convertidoRealParaDolar = stringParaFloat / cotacaoDolarOk;
    // Converte a string para um array e guarda na variavel
    let stringParaFloatArray = Array.from(convertidoRealParaDolar.toFixed(2));
    // Confere o tamanho do array e add os pontos no local correto (formata)
    if (stringParaFloatArray.length == 7) {
        stringParaFloatArray.splice(1, 0, ",");
    } else if (stringParaFloatArray.length == 8) {
        stringParaFloatArray.splice(2, 0, ",");
    } else if (stringParaFloatArray.length == 9) {
        stringParaFloatArray.splice(3, 0, ",");
    } else if (stringParaFloatArray.length == 10) {
        stringParaFloatArray.splice(1, 0, ",");
        stringParaFloatArray.splice(5, 0, ",");
    }
    // Mostra no display o valor já convertido e formatado
    $("header p").classList.add("header-convertido");
    $("header p").innerHTML = "$" + stringParaFloatArray.join("");
}

// Reseta a calculadora
function reseta() {
    $("header p").innerHTML = '';
    $(".moeda").classList.remove("moeda-converter");
    $(".moeda").classList.remove("moeda-convertido");
    $("header p").classList.remove("header-convertido");
    tempReal = ["0", ",", "0", "0"];
    tempDolar = ["0", ".", "0", "0"];
    clickCont = 0;
    // Zera o botao converver, mas continua no mesmo tipo conversão (para continuar na mesma ideia e evitar clicks a mais...)
    if ($(".real-p-dolar").classList.contains("esconde")) {
        imgDolarParaReal();
    } else if ($(".dolar-p-real").classList.contains("esconde")) {
        imgRealParaDolar();
    }
}