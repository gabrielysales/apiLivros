const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let livros = [
    {id:1, nome:'O pequeno princípe', preco: 25, ano: 1943 },
    {id:2, nome:'Percy Jackson e o ladrão de raios', preco: 40, ano: 2005},
    {id:3, nome:'As vantagens de ser invisível', preco: 30, ano: 1999},
    {id:4, nome:'Jantar Secreto', preco: 50, ano: 1989}
];


app.listen(3000, () =>{
    console.log(`Servidor em execução: aTudo`)
});

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/livros/primeiro', (req,res) =>{
    if(livros.length === 0){
        return
        res.status(404).json({erro: 'Livro não encontrado'});
    }else{
         res.json(livros[0]);
    }
});

app.get('/livros/qtd', (req, res) => {
    res.json({ quantidade: livros.length });
});


app.get('/livros/ultimo', (req,res) =>{
    if(livros.lenght === 0){
        return
         res.status(404).json({erro: 'Livro não encontrado'});
        }
         res.json(livros[livros.length-1]);
        });

app.get('/livros/estatistica', (req, res) => {
  if (livros.length === 0) {
    return 
    res.status(404).json({ erro: 'Nenhum livro encontrado' });
  }

  const precoMedio = livros.reduce((soma, i) => soma + i.preco, 0) / livros.length;

  res.json({
    totalLivros: livros.length,
    precoMedio: precoMedio.toFixed(2),
  });
});

app.get('/livros/filtro', (req, res) => {
    const filtrados = livros.filter(livro => livro.preco <= 30);

    if (filtrados.length === 0) {
        return res.status(404).json({ mensagem: 'Nenhum livro de até R$30 foi encontrado.' });
    }else{
        res.json(filtrados);
    }
});

app.get('/livros/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const livro = livros.find( p => p.id === id);

    if (livro){
        res.json(livro);
    }else{
        res.status(404).json({erro:'Livro não encontrado'});
    }
});

app.post(
    '/livros',
    (req,res) => {
        const nome = req.body.nome
    
    const novoLivro = {
        id : livros.length + 1,
        nome: nome,
        ano: ano
     
    }
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
    }
);

app.post('/livros/lote', (req, res) => {
    const novosLivros = req.body;

    for (let i = 0; i < novosLivros.length; i++) {
        const livro = novosLivros[i];
        const novoLivro = {
            id: livros.length + 1,
            nome: livro.nome,
            preco: livro.preco,
            ano: livro.ano
        };
        livros.push(novoLivro);
    }

    res.status(201).json({ mensagem: 'Livros cadastrado!', total: novosLivros.length });
});

app.put('/livros/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const nome  = req.body.nome
    const livro = livros.find( p => p.id === id);

    if (livro){
        livro.nome = nome;
        res.json(livro);
    }else{
        res.status(404).json({erro:'Livro não encontrado'});
    }
});

app.delete('/livros/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const index = livros.findIndex( i => i.id === id);

    if (index !== -1){
        const livroDeletado  = livros.splice(index, 1);
        res.json(livroDeletado[0]);
    }else{
        res.status(404).json({erro:'Livro não encontrado'});
    }
});
