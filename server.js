const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [
    {id:1, nome: 'Cleber', email:'cleber@gamil.com'},
    {id:2, nome: 'Pedro', email:'pedro@gmail.com'},
    {id:3, nome: 'João', email:'joao@gmail.com'}
];

let produtos = [
    {
        id: 1,
        nome: "Margherita",
        preco: 42.90,
        descricao: "A clássica pizza italiana com molho de tomate, muçarela fresca, manjericão e azeite. Simples e deliciosa.",
        estoque: "Em estoque"
    },
    {
        id: 2,
        nome: "Marinara",
        preco: 38.90,
        descricao: "Molho de tomate, alho, orégano e azeite. A pizza dos pescadores, sem queijo mas cheia de sabor.",
        estoque: "Em estoque"
    },
    {
        id: 3,
        nome: "Diavola",
        preco: 46.90,
        descricao: "Molho de tomate, muçarela, salame picante e pimenta. Para quem gosta de um toque ardido.",
        estoque: "Fora de estoque"
    },
    {
        id: 4,
        nome: "Quattro Stagioni",
        preco: 52.90,
        descricao: "Dividida em quatro partes: alcachofras, azeitonas, cogumelos e presunto. As quatro estações em uma pizza.",
        estoque: "Em estoque"
    },
    {
        id: 5,
        nome: "Quattro Formaggi",
        preco: 49.90,
        descricao: "Uma conbinação celestial de quatro queijos: muçarela, gorgonzola, parmesão e fontina.",
        estoque: "Em estoque"
    },
    {
        id: 6,
        nome: "Prosciutto e Funghi",
        preco: 47.90,
        descricao: "Presunto cru italiano e cogumelos frescos sobre uma base de muçarela derretida.",
        estoque: "Fora de estoque"
    },
    {
        id: 7,
        nome: "Capricciosa",
        preco: 51.90,
        descricao: "Presunto, cogumelos, alcachofras, azeitonas e ovos. Uma pizza cheia de personalidade.",
        estoque: "Em estoque"
    },
    {
        id: 8,
        nome: "Ortolana",
        preco: 44.90,
        descricao: "Berinjela, abobrinha, pimentões grelhados e muçarela. A opção vegetariana perfeita.",
        estoque: "Em estoque"
    }
];
let pedidos = [
    {
        id:1,
        itenspedidos:"pizza e coca",
        metododepagamento:"piquis",
        valortotal:69,
        taxaDeEntrega:2
    }
];
let nextId = 4; 

// Área de usuários

// POST um novo usuário
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !email) {
        return res.status(400).json({
            mensagem: "Erro: Nome e Email são obrigatórios para criar um usuário.",
            data: null
        });
    }

    // Cria o novo suário com um ID único
    const novoUsuario = {
        id: nextId++,
        nome: nome,
        email: email
    };

    // Adiciona ao banco de dados em memória
    usuarios.push(novoUsuario);

    // mensagem de sucesso
    res.status(201).json({
        mensagem: "Usuário criado com sucesso.",
        data: novoUsuario
    });
});


//  Atualizar um usuário por id
app.patch('/usuarios/:id', (req, res) => {
    // Pega o ID da URL e converte para número
    const id = parseInt(req.params.id);
    // Pega os campos a serem atualizados do corpo
    const updates = req.body;

    // 1. Encontra o índice do usuário no array
    const index = usuarios.findIndex(u => u.id === id);

    // 2. Verifica se o usuário existe
    if (index === -1) {
        return res.status(404).json({
            mensagem: `Erro: Usuário com ID ${id} não encontrado.`,
            data: null
        });
    }

    // Pega o usuário existente
    let usuarioAtual = usuarios[index];

    // Aplica as atualizações de forma parcial
    const usuarioAtualizado = Object.assign(usuarioAtual, updates);
    
    // Atualiza o array
    usuarios[index] = usuarioAtualizado;

    // Retorna a resposta de sucesso
    res.json({
        mensagem: "Usuário atualizado com sucesso.",
        data: usuarioAtualizado
    });
});

// GET usuários
app.get("/usuarios", (req, res) => {
    res.json({
        mensagem: "Lista de usuários",
        data: usuarios,
        total: usuarios.length
    });
});

// GET usuário por ID
app.get("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if(!usuario) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado",
            error: true
        });
    }

    res.json({
        mensagem: "Usuário encontrado",
        data: usuario
    });
});


// DELETE do usuário por ID
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    
    if (usuarioIndex === -1) {
        return res.status(404).json({
        mensagem: "Usuário não encontrado",
        error: true
        });
    }
    
    const usuarioRemovido = usuarios.splice(usuarioIndex, 1)[0];
    
    res.json({
        mensagem: "Usuário removido com sucesso",
        data: usuarioRemovido
    });
});

// Área de produtos

// POST um novo produto
app.post('/produtos', (req, res) => {
    console.log('POST /produtos - Criando novo produto');
    const { nome, preco, descricao, estoque } = req.body;

    if (!nome || !preco || !descricao || !estoque) {
        return res.status(400).json({ mensagem: 'Nome, preço, descrição e estoque são obrigatórios', error: true });
    }

    const novoId = produtos.length ? Math.max(...produtos.map(u => u.id)) + 1 : 1;
    const novoProduto = { id: novoId, nome, preco, descricao, estoque };
    produtos.push(novoProduto);

    res.status(201).json({ mensagem: 'Produto criado com sucesso', data: novoProduto});
});

// PUT (atualizar) produto por ID
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PUT /produtos - Atualizando produtos`);
  
  const produtosIndex = produtos.findIndex(u => u.id === id);
  
  if (produtosIndex === -1) {
    return res.status(404).json({
      mensagem: "produto não encontrado",
      error: true
    });
  }
  
  const { nome, preco, descricao, estoque } = req.body;
  
  if (!nome || !preco || !descricao || !estoque) {
    return res.status(400).json({
      mensagem: "Nome, preço, descrição são obrigatórios",
      error: true
    });
  }
  
  // Atualizar produto
  produtos[produtosIndex] = { id, nome, preco, descricao, estoque };
  
  res.json({
    mensagem: "produto atualizado com sucesso",
    data: produtos[produtosIndex]
  });
});

// GET produtos (listar todos)
app.get("/produtos", (req, res) => {
    res.json({
        mensagem: "Lista de produtos",
        data: produtos,
        total: produtos.length
    });
});

// GET produto por ID
app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if(!produto) {
        return res.status(404).json({
            mensagem: "Produto não encontrado",
            error: true
        });
    }

    res.json({
        mensagem: "Produto encontrado",
        data: produto
    });
});

// DELETE produto por ID
app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    const produtoIndex = produtos.findIndex(p => p.id === id);
    
    if (produtoIndex === -1) {
        return res.status(404).json({
            mensagem: "Produto não encontrado",
            error: true
        });
    }
    
    const produtoRemovido = produtos.splice(produtoIndex, 1)[0];
    
    res.json({
        mensagem: "Produto removido com sucesso",
        data: produtoRemovido
    });
});
//Area Pedidos
app.get("/pedidos",(req,res) => {
    res.json({
        mensagem:"Lista de Pedidos",
        data:pedidos,
        total:pedidos.length
    })
});
app.get("/pedidos/:id",(req,res) => {
     const id = parseInt(req.params.id);
    const pedido = pedidos.find(p => p.id === id);

    if(!pedido) {
        return res.status(404).json({
            mensagem: "Pedido não encontrado",
            error: true
        });
    }

    res.json({
        mensagem: "Pedido encontrado",
        data: pedido
    });
});

app.post('/pedidos', (req, res) => {
    const { itenspedidos, metododepagamento, valortotal, taxaDeEntrega } = req.body;

    if (!itenspedidos || !metododepagamento || !valortotal || !taxaDeEntrega) {
        return res.status(400).json({ mensagem: 'Itens Pedidos, Metodo de Pagamento, Valor Total, Taxa de Entrega são obrigatórios', 
            error: true 
        });
    }

    const novoId = pedidos.length ? Math.max(...pedidos.map(u => u.id)) + 1 : 1;
    const novoPedido = { id: novoId, itenspedidos, metododepagamento, valortotal, taxaDeEntrega };
    pedidos.push(novoPedidos);

    res.status(201).json({ mensagem: 'Pedido criado com sucesso', data: novoPedido});
});

app.put('/pedidos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  const pedidosIndex = pedidos.findIndex(u => u.id === id);
  
  if (pedidosIndex === -1) {
    return res.status(404).json({
      mensagem: "pedido não encontrado",
      error: true
    });
  }
  
  const { itenspedidos, metododepagamento, valortotal, taxaDeEntrega } = req.body;
  
    if (!itenspedidos || !metododepagamento || !valortotal || !taxaDeEntrega) {
        return res.status(400).json({ mensagem: 'Itens Pedidos, Metodo de Pagamento, Valor Total, Taxa de Entrega são obrigatórios', 
            error: true 
        });
    }
  // Atualizar pedidos
  pedidos[pedidosIndex] = { id, itenspedidos, metododepagamento, valortotal, taxaDeEntrega };
  
  res.json({
    mensagem: "pedido atualizado com sucesso",
    data: pedidos[pedidosIndex]
  });
});

app.delete("/pedidos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    
    const pedidoIndex = pedidos.findIndex(p => p.id === id);
    
    if (pedidoIndex === -1) {
        return res.status(404).json({
            mensagem: "Pedido não encontrado",
            error: true
        });
    }
    
    const pedidoRemovido = pedidos.splice(pedidoIndex, 1)[0];
    
    res.json({
        mensagem: "Pedido removido com sucesso",
        data: pedidoRemovido
    });
});

// Abrindo o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

