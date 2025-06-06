/*
  Exportação padrão (default):
  function ler() {
    // ...
  }
  export default ler;

  A função é exportada como exportação padrão (default export).
  Pode ser importada com qualquer nome:
  import qualquerNome from './ler.js';

  Só pode haver uma exportação default por arquivo.
*/

function ler() {
    const produto = document.getElementById('produto').value.trim();
    const preco = document.getElementById('preco').value.trim();
    const data = document.getElementById('data').value.trim();

    document.getElementById('produto').value = "";
    document.getElementById('preco').value = "";
    document.getElementById('data').value = "";

    if (produto && preco && data)
      return { produto, preco, data };
    
    return null;
}

export default ler;

