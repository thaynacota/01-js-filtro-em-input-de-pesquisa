function editarItem(item)
{
    produto.value = item.produto;
    preco.value = item.preco;
    data_validade.value = item.data_validade;
    idEditando = item.id;

    botao.textContent = "Atualizar";
    botao.onclick = async (event) => {
        event.preventDefault();
        await atualizarItem(item.id); 
    }
}

export default editarItem;