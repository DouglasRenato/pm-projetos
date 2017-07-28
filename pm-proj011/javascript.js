let botaoImc = document.querySelector('#botao-imc');

botaoImc.addEventListener('click', function () {
    let valorAltura = document.querySelector('#valor-altura'),
        valorPeso = document.querySelector('#valor-peso'),
        resultadoImc;

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
        let valorAlturaOk = parseFloat(valorAltura.value);
        let valorPesoOk = parseFloat(valorPeso.value);

        resultadoImc = valorPesoOk / (valorAlturaOk * valorAlturaOk);

        let campoResultadoImc = document.querySelector('.calculado');
        let resultadoImcValor = document.querySelector('.resultados h3');
        let resultadoImcClassificacao = document.querySelector('.resultados h4')

        resultadoImcValor.innerHTML = resultadoImc.toFixed(1).toString().replace('.', ',');

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

        botaoImc.style.display = 'none';
        campoResultadoImc.style.display = 'flex';
    }

});

let setaVoltar = document.querySelector('#seta-voltar');

setaVoltar.addEventListener('click', function () {
    let botaoImc = document.querySelector('#botao-imc');
    let campoResultadoImc = document.querySelector('.calculado');

    campoResultadoImc.style.display = 'none';
    botaoImc.style.display = 'block';
});