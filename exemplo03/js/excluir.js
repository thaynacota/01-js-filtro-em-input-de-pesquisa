//Função para excluir os items

import { remover } from "./api/api.js";

async function excluirItem(id)
{
    const confirmado = confirm("Tem certeza que deseja excluir o item?");
    if(confirmado) 
    {
        await remover(id);
        const vetor = await buscar();
        atualizarLista(vetor);
    }
}

export default excluirItem;