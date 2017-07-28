'use strict';

//guarda o botão html em uma variavel para uso
var botaoImc = document.querySelector('#botao-imc');

//cria evento no botao. Quando o botao for clicado executa a função
botaoImc.addEventListener('click', function () {
    //criar as variaveis para guardar os inputs de entrada de dados
    var valorAltura = document.querySelector('#valor-altura'),
        valorPeso = document.querySelector('#valor-peso'),
        resultadoImc = void 0;

    //condições para evitar que o usuario esqueça de informar os dados nos inputs
    if (valorAltura.value == '') {
        valorAltura.focus();
    } else if (valorPeso.value == '') {
        valorPeso.focus();
    } else if (valorAltura.value <= 0) {
        alert('Confira os dados! \nValores negativos e nulos não são permitidos.');
        valorAltura.focus();
    } else if (valorPeso.value <= 0) {
        alert('Confira os dados! \nValores negativos e nulos não são permitidos.');
        valorPeso.focus();
    } else {
        //se tudo estiver preenchido corretamente, ai sim ele executa o código para gerar as informações para o usuário
        //captura o valor digitado nos inputs
        var valorAlturaOk = parseFloat(valorAltura.value);
        var valorPesoOk = parseFloat(valorPeso.value);

        //faz o calculo IMC
        resultadoImc = valorPesoOk / (valorAlturaOk * valorAlturaOk);

        //variaveis para guardar os locais onde serão mostrados os resultados para o usuário
        var campoResultadoImc = document.querySelector('.calculado');
        var resultadoImcValor = document.querySelector('.resultados h3');
        var resultadoImcClassificacao = document.querySelector('.resultados h4'

        //mostra o resultado do IMC(o valor) no html. Antes ele é fixado para 1 casa depois do ponto, depois transformado em string, depois trocado o ponto para virgula para melhor apresentar o dado na tela
        );resultadoImcValor.innerHTML = resultadoImc.toFixed(1).toString().replace('.', ',');

        //condições para mostrar qual classifição o resultado do IMC se encaixa.
        if (resultadoImc < 16) {
            resultadoImcClassificacao.innerHTML = 'Magreza grave';
        } else if (resultadoImc >= 16 && resultadoImc < 17) {
            resultadoImcClassificacao.innerHTML = 'Magreza moderada';
        } else if (resultadoImc >= 17 && resultadoImc < 18.5) {
            resultadoImcClassificacao.innerHTML = 'Magreza leve';
        } else if (resultadoImc >= 18.5 && resultadoImc < 25) {
            resultadoImcClassificacao.innerHTML = 'Saudável';
        } else if (resultadoImc >= 25 && resultadoImc < 30) {
            resultadoImcClassificacao.innerHTML = 'Sobrepeso';
        } else if (resultadoImc >= 30 && resultadoImc < 35) {
            resultadoImcClassificacao.innerHTML = 'Obesidade';
        } else if (resultadoImc >= 35 && resultadoImc < 40) {
            resultadoImcClassificacao.innerHTML = 'Obesidade Severa';
        } else {
            resultadoImcClassificacao.innerHTML = 'Obesidade Mórbida';
        }

        //esconde o botao IMC e mostra a div com os resultados que estava oculta pelo CSS
        botaoImc.style.display = 'none';
        campoResultadoImc.style.display = 'flex';
    }
});

//variavel para guardar a seta de voltar
var setaVoltar = document.querySelector('#seta-voltar');
//cria o evento de click na seta de voltar
setaVoltar.addEventListener('click', function () {
    var botaoImc = document.querySelector('#botao-imc');
    var campoResultadoImc = document.querySelector('.calculado');
    //quando clicado esconde novamente a div com os resuldo e mostra o botao IMC para o usuário usar novamente a calculadora
    campoResultadoImc.style.display = 'none';
    botaoImc.style.display = 'block';
});