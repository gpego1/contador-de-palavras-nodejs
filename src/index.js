const fs = require('fs');
const trataErros = require('./erros/funcoesErro.js')

const filesPath = process.argv;
const link = filesPath[2];

fs.readFile(link, 'utf-8', (err, text) => {
    try{
        if (err) throw err;
        contaPalavras(text);
    } catch(err){
        trataErros(err);
    }
})

function contaPalavras(text) {
    const paragrafos = extraiParagrafos(text);
    const contagem = paragrafos
        .flatMap((paragrafo) => {
            if(!paragrafo) return [];
            return verificaPalavrasDuplicadas(paragrafo);
        })
    console.log(contagem);
}

function extraiParagrafos(text) {
    return paragrafos = text.toLowerCase().split('\n');
}


function limpaPalavras(palavra) {
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'');
}

function verificaPalavrasDuplicadas(text) {
    const listaPalavras = text.split(' ');
    const resultado = {};
    //objeto[propriedade] = valor;
    listaPalavras.forEach((palavra) => {
        if (palavra.length >= 3) {
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1
        }
    })
    return resultado;
}

