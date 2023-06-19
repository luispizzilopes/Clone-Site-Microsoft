const botaoNovoItem = document.querySelector('.box-adicionar-item'); 
const dialogNovoItem = document.querySelector('.dialog-novo-item');
const botaoFecharDialog= document.querySelector('.btn-dialog-fechar');
const botaoAdicionar = document.querySelector('.btn-dialog-adicionar');
const dialogEditarItem = document.querySelector('.dialog-editar-item');
const botaoFecharDialogEditar = document.querySelector('.btn-dialog-fechar-editar');
const botaoEditar = document.querySelector('.btn-dialog-editar');
const botaoAbrirBing = document.querySelector('.btn-abrir-bing'); 
var publicacoes = []; 
var indiceEditar; 

botaoAbrirBing.addEventListener('click', function(){
    window.open('https://www.bing.com/new?icid=mscom_marcom_H1a_BingAI');
});

function novaPublicacao(id, titulo, descricao, link){
    this.id = id; 
    this.titulo = titulo; 
    this.descricao = descricao; 
    this.link = link; 
}

if(!localStorage.id){
    localStorage.id = 0; 
}

if(localStorage.conteudoPagina){
    publicacoes = JSON.parse(localStorage.getItem('conteudoPagina'));
    mostrarConteudo();
}

botaoNovoItem.addEventListener('click', function(){
    dialogNovoItem.className = 'dialog-novo-item-show'; 
}); 

botaoFecharDialog.addEventListener('click', function(){
    dialogNovoItem.className = 'dialog-novo-item';
    location.reload();
}); 

botaoFecharDialogEditar.addEventListener('click', function(){
    dialogEditarItem.className = 'dialog-editar-item';
}); 

const titulo = document.querySelector('.input-titulo'); 
const descricao = document.querySelector('.input-descricao'); 
const link = document.querySelector('.input-link'); 

titulo.addEventListener('input', function(){
    if(titulo.value.length < 4){
        document.querySelector('.resultado-adicionar').innerHTML = "O título deve conter no minimo 4 caracteres!";
    }else{
        document.querySelector('.resultado-adicionar').innerHTML = "";
    }
});

descricao.addEventListener('input', function(){
    if(descricao.value.length < 10){
        document.querySelector('.resultado-adicionar').innerHTML = "A descrição deve conter no minimo 10 caracteres!";
    }else{
        document.querySelector('.resultado-adicionar').innerHTML = "";
    }
});

link.addEventListener('input', function(){
    if(!link.value.includes("http")){
        document.querySelector('.resultado-adicionar').innerHTML = "Informe um link válido!";
    }else{
        document.querySelector('.resultado-adicionar').innerHTML = "";
    }
});

class Funcionalidades{
    constructor(){}

    adicionar() {
        if(titulo.value.length >= 4 && descricao.value.length >= 10 && link.value.includes("http")){
            let lista = document.querySelector('.lista-conteudo'); 
            let publicacao = new novaPublicacao(localStorage.getItem('id'), titulo.value, descricao.value, link.value); 
    
            if(localStorage.conteudoPagina){
                publicacoes = JSON.parse(localStorage.getItem('conteudoPagina')); 
            }
    
            publicacoes.push(publicacao);
            localStorage.conteudoPagina = JSON.stringify(publicacoes); 
            document.querySelector('.resultado-adicionar').innerHTML = "Novo item adicionado com sucesso!"; 
            setTimeout(() => {
                document.querySelector('.resultado-adicionar').innerHTML = ""; 
            }, 1500);
            
            let item = document.createElement("div");
            let idLi = document.createElement("p"); 
            let tituloLi = document.createElement("label");
            let descricaoLi = document.createElement("p"); 
            let imagemLi = document.createElement("img"); 
            let editar = document.createElement("button"); 
            let excluir = document.createElement("button"); 
            item.className = "item"; 
            idLi.innerHTML = publicacao.id;
            tituloLi.innerHTML = publicacao.titulo; 
            descricaoLi.innerHTML = publicacao.descricao;
            editar.innerHTML = "Editar"; 
            editar.className = "btn-editar";  
            excluir.innerHTML = "Excluir";  
            excluir.className = "btn-excluir";  
            imagemLi.src = publicacao.link; 
            item.appendChild(idLi);
            item.appendChild(imagemLi); 
            item.appendChild(tituloLi); 
            item.appendChild(descricaoLi); 
            item.appendChild(editar); 
            item.appendChild(excluir); 
            lista.appendChild(item);
            
            let contador = parseInt(localStorage.getItem('id')); 
            contador++; 
            localStorage.setItem('id', contador); 
        } else{
            document.querySelector('.resultado-adicionar').innerHTML = "Preencha todos os campos e tente novamente!"; 
            setTimeout(() => {
                document.querySelector('.resultado-adicionar').innerHTML = ""; 
            }, 1500);
        }
    }
}

var funcionalidades = new Funcionalidades(); 

botaoAdicionar.addEventListener('click', funcionalidades.adicionar);

function mostrarConteudo(){
    for(let i=0; i<publicacoes.length; i++){
        let lista = document.querySelector('.lista-conteudo'); 
        let idLi = document.createElement("p"); 
        let item = document.createElement("div");
        let tituloLi = document.createElement("label");
        let descricaoLi = document.createElement("p"); 
        let imagemLi = document.createElement("img"); 
        let editar = document.createElement("button"); 
        let excluir = document.createElement("button"); 
        item.className = "item"; 
        idLi.innerHTML = publicacoes[i].id;
        tituloLi.innerHTML = publicacoes[i].titulo; 
        descricaoLi.innerHTML = publicacoes[i].descricao;
        editar.innerHTML = "Editar "; 
        editar.className = "btn-editar"; 
        excluir.innerHTML = "Excluir";  
        excluir.className = "btn-excluir"; 
        imagemLi.src = publicacoes[i].link; 
        item.appendChild(idLi);
        item.appendChild(imagemLi); 
        item.appendChild(tituloLi); 
        item.appendChild(descricaoLi); 
        item.appendChild(editar); 
        item.appendChild(excluir); 
        lista.appendChild(item); 
    }
}