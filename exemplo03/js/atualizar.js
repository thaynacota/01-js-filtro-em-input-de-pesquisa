import { atualizar } from "./api/api";

async function atualizarItem(id)
{
    const atualizado = LerDadosdoFormulario();

    if(atualizado)
    {
        await atualizar(id, atualizado);
        const vetor = await buscar();
        atualizarLista(vetor);

        botao.textContent = "Enviar";
        botao.onclick = async (event) => {
            event.preventDefault();
            adicionar();
        };
    }

    else
    {
        alert("Preencha todos os campos!");
    }
}