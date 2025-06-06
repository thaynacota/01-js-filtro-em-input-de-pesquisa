import { enviar, buscar } from "./api/api.js";
import lerDadosDoFormulario from "./ler.js";
import imprimirDadosDaLista from "./imprimir.js";
import excluirItem from "./excluir.js";
import editarItem from "./editar.js";

const produto = document.getElementById("produto");
const preco = document.getElementById("preco");
const data_validade = document.getElementById("data");
const botao = document.getElementById("botaoEnviar");
let idEditando = null;

window.addEventListener('DOMContentLoaded', async () => {
    const vetor = await buscar();
    atualizarLista(vetor);
});

botao.addEventListener("click", (event) => {
    event.preventDefault();
    adicionar();
});

botao.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionar();
    }
});

async function adicionar() {
    const dados = lerDadosDoFormulario();
    if (!dados) {
        alert("Dados não enviados!");
        return;
    } 

    if (idEditando) {
        await atualizar(idEditando, dados);
        idEditando = null;
    } else {
        await enviar(dados);
    }

    const vetor = await buscar();
    atualizarLista(vetor);
}

function atualizarLista(vetor) {
    const lista = document.getElementById('lista');
    lista.innerHTML = "";

    vetor.forEach(elemento => {
        const li = document.createElement('li');
        li.innerHTML = imprimirDadosDaLista(elemento);

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => editarItem(elemento);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = async () => {
            await remover(elemento.id);
            const novaLista = await buscar();
            atualizarLista(novaLista);
        };

        li.appendChild(botaoEditar);
        li.appendChild(botaoExcluir);

        lista.appendChild(li);
    });
}


produto.onkeyup = () => {
    var termo = produto.value.toLowerCase();
    filtrar(termo)
};

preco.onkeyup = () => {
    var termo = preco.value.toLowerCase();
    filtrar(termo)
};

function filtrar(termo) {
    var itens = document.getElementsByTagName("li");

    for (var i = 0; i < itens.length; i++) {
        var item = itens[i].innerHTML;

        if (item.toLowerCase().includes(termo))
            itens[i].style.display = "flex";
        else
            itens[i].style.display = "none";
    }
};
