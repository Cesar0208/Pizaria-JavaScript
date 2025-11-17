let produto1 = {
    nome: "Margherita",
    preco: 10.99,
    descricao: "Pizza Margherita",
    estoque: "Em estoque"
}

// Produto 1
const nomeProduto1 = "Café Expresso";
let precoProduto1 = 8.50;
const statusProduto1 = "Em Estoque";

// Produto 2
const nomeProduto2 = "Capuccino";
let precoProduto2 = 12.00; // Troque o preço para testar os condicionais
const statusProduto2 = "Em Estoque";

// Produto 3
const nomeProduto3 = "Pão de Queijo";
let precoProduto3 = 5.00;
const statusProduto3 = "Esgotado";

// Manipulação DOM - Produto 1
const elProduto1 = document.getElementById('produto1');
const elPreco1 = document.getElementById('preco1');
if (elProduto1 && elPreco1) {
  const nomeEl1 = elProduto1.querySelector('.nome');
  if (nomeEl1) nomeEl1.textContent = nomeProduto1;
  elPreco1.textContent = `R$ ${precoProduto1.toFixed(2)}`;
  if (statusProduto1 != "Em Estoque") {
    elProduto1.classList.add('esgotado');
    elProduto1.classList.remove('disponivel');
  } else {
    elProduto1.classList.add('disponivel');
  }
}

// Manipulação DOM - Produto 2
const elProduto2 = document.getElementById('produto2');
const elPreco2 = document.getElementById('preco2');
if (elProduto2 && elPreco2) {
  const nomeEl2 = elProduto2.querySelector('.nome');
  if (nomeEl2) nomeEl2.textContent = nomeProduto2;
  elPreco2.textContent = `R$ ${precoProduto2.toFixed(2)}`;
  if (precoProduto2 > 10) {
    elProduto2.classList.add('premium');
    elProduto2.classList.remove('padrao');
  } else {
    elProduto2.classList.add('padrao');
    elProduto2.classList.remove('premium');
  }
}

// Manipulação DOM - Produto 3
const elProduto3 = document.getElementById('produto3');
const elPreco3 = document.getElementById('preco3');
if (elProduto3 && elPreco3) {
  const nomeEl3 = elProduto3.querySelector('.nome');
  if (nomeEl3) nomeEl3.textContent = nomeProduto3;
  elPreco3.textContent = `R$ ${precoProduto3.toFixed(2)}`;
  if (statusProduto3 != "Em Estoque") {
    elProduto3.classList.add('esgotado');
    elProduto3.classList.remove('disponivel');
  } else {
    elProduto3.classList.add('disponivel');
  }
}

// Loop de Promoção Relâmpago em 10 unidades
for (let i = 1; i <= 10; i++) {
  if (i % 2 == 0) {
    console.log(`Unidade ${i}: PROMOÇÃO! (Com R$ 1,00 de desconto)`);
  } else {
    console.log(`Unidade ${i}: Preço Normal.`);
  }
}

// Seleciona todos os botões de abrir e fechar
const botoesAbrir = document.querySelectorAll('.abrir-btn');
const botoesFechar = document.querySelectorAll('.fechar-btn');

// Adiciona evento para cada botão "Abrir"
botoesAbrir.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const aboutDiv = document.getElementById(targetId);
        aboutDiv.style.display = 'flex';
        // Reseta o scroll para o topo quando abre
        const aboutContent = aboutDiv.querySelector('.about-content');
        aboutContent.scrollTop = 0;
    });
});

// Adiciona evento para cada botão "Fechar"
botoesFechar.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const aboutDiv = e.target.closest('.about');
        aboutDiv.style.display = 'none';
    });
});

// Fecha o about clicando fora dele
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('about')) {
        e.target.style.display = 'none';
    }
});