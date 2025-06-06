const url = "https://b20b2dbe-6cab-4beb-b9e1-76afef298e60-00-iwd8udidkxyr.spock.replit.dev:3002/";
const urlProdutos = url + "produtos";

/*
  Exportação nomeada:
  export async function enviar(dados) {
    // ...
  }

  Exportação da função enviar() com um nome explícito.
  Essa função deve ser importada usando exatamente esse nome:
  import { enviar } from './api.js';
  As chaves {} são obrigatórias em exportações nomeadas.
  Pode haver várias exportações nomeadas em um mesmo arquivo.
*/
export async function enviar(dados) {
  try {
    const resposta = await fetch(urlProdutos, {
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(dados),
    });

    if (!resposta.ok) {
      throw new Error('Erro no envio dos dados!');
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao enviar dados:', erro);
    throw erro;
  }
}

/*
  Exportação nomeada:
  export async function buscar() {
    // ...
  }

  Exportação da função buscar() com um nome explícito.
  Essa função deve ser importada usando exatamente esse nome:
  import { buscar } from './api.js';
  As chaves {} são obrigatórias em exportações nomeadas.
  Pode haver várias exportações nomeadas em um mesmo arquivo.
*/
export async function buscar() {
  try {
    const resposta = await fetch(urlProdutos);

    if (!resposta.ok) {
      throw new Error('Erro no envio dos dados!');
    }

    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao ler dados:', erro);
    throw erro;
  }
}

export async function remover(id) {
    return await fetch(`${urlProdutos}/${id}`, {
        method: 'DELETE'
    });
}

export async function atualizar(id, dados) {
    return await fetch(`${urlProdutos}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    });
}
