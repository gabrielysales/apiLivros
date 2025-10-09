const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let livros = [
    {id:1, nome:'O pequeno princípe', preco: 25, ano: 1943 },
    {id:2, nome:'Percy Jackson e o ladrão de raios', preco: 40, ano: 2005},
    {id:3, nome:'As vantagens de ser invisível', preco: 30, ano: 1999}
];


app.listen(3000, () =>{
    console.log(`Servidor em execução: http://localhost:3000`)
});

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/livros/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const livro = livros.find( p => p.id === id);

    if (livro){
        res.json(livro);
    }else{
        res.status(404).json({erro:'Livro não encontrado'});
    }
})

app.post(
    '/livros',
    (req,res) => {
        const nome = req.body.nome
    
    const novoLivro = {
        id : livros.length + 1,
        nome: nome
     
    }
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
    }
);

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

//FALTA O FILTRO e agora vale 4 pontos

app.get('/livros/quantidade', (req, res) => {
    res.json({ quantidade: livros.length });
});

//primeiro
//último
//cadastro em lote
//estatísticas
