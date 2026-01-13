import fs from 'fs';
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from "./helpers.js";

const filesPath = process.argv;
const link = filesPath[2];
const endereco = filesPath[3];

fs.readFile(link, 'utf-8', (err, text) => {
    try{
        if (err) throw err;
        const resultado = contaPalavras(text);
        criaESalvaArquivo(resultado, endereco);
    } catch(err){
        trataErros(err);
    }
})

// async function criaESalvaArquivo(listaPalavras, endereco) {
//     const arquivoNovo = `${endereco}/resultado.txt`;
//     const textoPalavras = JSON.stringify(listaPalavras);
//     try {
//         await fs.promises.writeFile(arquivoNovo, textoPalavras);
//         console.log('arquivo criado');
//     } catch(erro) {
//         throw erro;
//     }
// }

function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);

    fs.promises.writeFile(arquivoNovo, textoPalavras)
        .then(() => {
            // processamento feito com o resultado da promessa
            console.log('Arquivo criado com sucesso!')
        })
        .catch((erro) => {
            throw erro;
    })
        .finally(() => console.log('Operação finalizada'))

}