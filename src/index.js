const fs = require('fs');

const filesPath = process.argv;
const link = filesPath[2];

fs.readFile(link, 'utf-8', (err, text) => {
    quebraEmParagrafos(text);
    //verificaPalavrasDuplicadas(text);
})

// criar um array com as palavras
// contar ocorrencias
// montar um objeto com o resultado

function quebraEmParagrafos(text) {
    const paragrafos = text.toLowerCase().split('\n');
    const contagem = paragrafos.map((paragrafo) => {
        return verificaPalavrasDuplicadas(paragrafo);
    })
    console.log(contagem);
}


function verificaPalavrasDuplicadas(text) {
    const listaPalavras = text.split(' ');
    const resultado = {};
    //objeto[propriedade] = valor;
    listaPalavras.forEach((palavra) => {
        resultado[palavra] = (resultado[palavra] || 0) + 1
    })
    return resultado;
}

