import fs from 'fs';
import path from 'path';
import { Command } from "commander";
import trataErros from './erros/funcoesErro.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from "./helpers.js";
import chalk from 'chalk';

const program = new Command();

program
    .version('0.0.1')
    .option('-t, --texto <string>', 'caminho do texto a ser processado')
    .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo de resultados')
    .action((options) => {
        const { texto, destino } = options;
        if(!texto || !destino) {
            console.error(chalk.red("Cannot resolve texto or file path"))
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log(chalk.green("texto processado com sucesso!"))
        } catch (error) {
            console.log(chalk.red(error));
        }
    })

program.parse();

function processaArquivo(texto, destino) {
    fs.readFile(texto, 'utf-8', (err, text) => {
        try{
            if (err) throw err;
            const resultado = contaPalavras(text);
            criaESalvaArquivo(resultado, destino);
        } catch(err){
            trataErros(err);
        }
    })
}

function criaESalvaArquivo(listaPalavras, endereco) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = montaSaidaArquivo(listaPalavras);

    fs.promises.writeFile(arquivoNovo, textoPalavras)
        .then(() => {
            // processamento feito com o resultado da promessa
            console.log(chalk.green('Arquivo criado com sucesso!'))
        })
        .catch((erro) => {
            throw erro;
    })
        .finally(() => console.log(chalk.blue('Operação finalizada')))

}


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