import { enviar, buscar, atualizar, remover } from "./api/api.js";
import lerDadosDoFormulario from "./ler.js";
import imprimirDadosDaLista from "./imprimir.js";

const produto = document.getElementById("produto");
const preco = document.getElementById("preco");
const data_validade = document.getElementById("data");
const botao = document.getElementById("botaoEnviar");

//Variável criada para armazenar o estado do id (se esta sendo criado ou atualizado)
let idEditando = null;

window.addEventListener('DOMContentLoaded', async () => {
    const vetor = await buscar();
    atualizarLista(vetor);
});

botao.addEventListener("click", async (event) => {
    event.preventDefault();
    const dados = lerDadosDoFormulario();

    //Verifica se todos os dados foram preenchidos
    if (!dados) {
        alert("Preencha todos os campos!");
        return;
    }

    //Atualiza um item já existente
    if (idEditando) {
        await atualizar(idEditando, dados);
        idEditando = null; //reconfigura a variável (limpa o que esta nela)
        botao.textContent = "Enviar";
    }

    //Adiciona novo item
    else {
        await enviar(dados);
    }

    const vetor = await buscar();
    atualizarLista(vetor);
});

botao.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionar();
    }
});

function atualizarLista(vetor) {
    const lista = document.getElementById('lista');
    lista.innerHTML = "";

    vetor.forEach(elemento => {
        const li = document.createElement('li');
        li.innerHTML = imprimirDadosDaLista(elemento);


        //Botão para editar todos os campos disponíveis
        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => {
            produto.value = elemento.produto;
            preco.value = elemento.preco;
            data_validade.value = elemento.data_validade;
            idEditando = elemento.id;
            botao.textContent = "Atualizar";
        };

        //Botão para excluir todos os campos disponíveis
        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.onclick = async () => {
            const confirmado = confirm("Tem certeza que deseja excluir?");
            if (confirmado) {
                await remover(elemento.id);
                const novaLista = await buscar();
                atualizarLista(novaLista);
            }
        };

        li.appendChild(botaoEditar);
        li.appendChild(botaoExcluir);
        lista.appendChild(li);
    });
}

produto.onkeyup = () => {
    const termo = produto.value.toLowerCase();

    filtrar(termo);
};

preco.oninput = () => {
    const termo = preco.value;

    filtrar(termo);
};

data_validade.oninput = () => {
    const termo = data_validade.value;

    filtrar(termo);
};

//Preciso arrumar o filtro
function filtrar(termo) {
    var itens = document.getElementsByTagName("li");

    for (var i = 0; i < itens.length; i++) {
        var item = itens[i].innerHTML;

        if (item.toLowerCase().includes(termo))
            itens[i].style.display = "flex";
        else if (termo === "" || item === termo)
            itens[i].style.display = "flex";
        else
            itens[i].style.display = "none";
    }
}

