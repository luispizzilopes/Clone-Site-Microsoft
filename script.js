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

    carregarInformacoesEditar(){
        let botoes = document.querySelectorAll('.btn-editar');
        let inputTitulo = document.querySelector('.input-titulo-editar');
        let inputDescricao = document.querySelector('.input-descricao-editar');
        let inputLink = document.querySelector('.input-link-editar');
        for (let i = 0; i < botoes.length; i++) {
            botoes[i].addEventListener('click', () => {
                indiceEditar = i; 
                inputTitulo.value = publicacoes[indiceEditar].titulo;
                inputDescricao.value = publicacoes[indiceEditar].descricao;
                inputLink.value = publicacoes[indiceEditar].link;
                dialogEditarItem.className = "dialog-editar-item-show"; 
            });
        }
    }

    editar(){
        if(inputTituloEditar.value.length >= 4 && inputDescricaoEditar.value.length >= 10 
            && inputLinkEditar.value.includes("http")){

        publicacoes[indiceEditar].titulo = inputTituloEditar.value; 
        publicacoes[indiceEditar].descricao = inputDescricaoEditar.value; 
        publicacoes[indiceEditar].link = inputLinkEditar.value;
    
        localStorage.conteudoPagina = JSON.stringify(publicacoes); 
        location.reload(); 
        }else{
            document.querySelector('.resultado-editar').innerHTML = "Verifique todos os campos e tente novamente!"; 
            setTimeout(() => {
                document.querySelector('.resultado-editar').innerHTML = ""; 
            }, 1500);
        }
    }

    excluir(){
        let botoes = document.querySelectorAll('.btn-excluir');
        let itens = document.querySelectorAll('.item'); 
        for(let i = 0; i<botoes.length;i++){
            botoes[i].addEventListener('click', ()=>{
                let id = itens[i].childNodes[0].innerHTML; 
                publicacoes = publicacoes.filter(p => p.id !== id); 
                localStorage.conteudoPagina = JSON.stringify(publicacoes); 
                location.reload(); 
            }); 
        }
    }

    pesquisar(){
        if(inputBusca.value != ""){
            for(let item of itens){
                let titulo = item.querySelector('label').innerHTML.toLowerCase(); 
                let pesquisa = inputBusca.value.toLowerCase(); 
                if(!titulo.includes(pesquisa)){
                    item.style.display = "none"; 
                } else{
                    item.style.display = "block"; 
                }
            }
        } else{
            for(let item of itens){
                item.style.display = "block"; 
            }
        }
    }
}

var funcionalidades = new Funcionalidades(); 

botaoAdicionar.addEventListener('click', funcionalidades.adicionar);

document.addEventListener('DOMContentLoaded', funcionalidades.carregarInformacoesEditar);

const inputTituloEditar = document.querySelector('.input-titulo-editar');
const inputDescricaoEditar = document.querySelector('.input-descricao-editar');
const inputLinkEditar = document.querySelector('.input-link-editar'); 

inputTituloEditar.addEventListener('input', function(){
    if(inputTituloEditar.value.length < 4){
        document.querySelector('.resultado-editar').innerHTML = "O título deve conter no minimo 4 caracteres!";
    }else{
        document.querySelector('.resultado-editar').innerHTML = "";
    }
});

inputDescricaoEditar.addEventListener('input', function(){
    if(inputDescricaoEditar.value.length < 10){
        document.querySelector('.resultado-editar').innerHTML = "A descrição deve conter no minimo 10 caracteres!";
    }else{
        document.querySelector('.resultado-editar').innerHTML = "";
    }
});

inputLinkEditar.addEventListener('input', function(){
    if(!inputLinkEditar.value.includes("http")){
        document.querySelector('.resultado-editar').innerHTML = "Informe um link válido!";
    }else{
        document.querySelector('.resultado-editar').innerHTML = "";
    }
});

botaoEditar.addEventListener('click', funcionalidades.editar); 

document.addEventListener('DOMContentLoaded', funcionalidades.excluir);

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

const pesquisar = document.querySelector('.pesquisar'); 
const cancelarPesquisa = document.querySelector('.cancelar-pesquisa'); 
const dialogBuscar = document.querySelector('.dialog-buscar');
const inputBusca = document.querySelector('.dialog-buscar input');
const itens = document.querySelectorAll('.item'); 
const iconeMobilePesquisa = document.querySelector('.icone-pesquisar');

pesquisar.addEventListener('click', function(){
    dialogBuscar.className = "dialog-buscar-show"; 
    inputBusca.value = ""; 
});

iconeMobilePesquisa.addEventListener('click', function(){
    dialogBuscar.className = "dialog-buscar-show"; 
    inputBusca.value = "";
});

cancelarPesquisa.addEventListener('click', function(){
    dialogBuscar.className = "dialog-buscar"; 
    inputBusca.value = ""; 
    for(let item of itens){
        item.style.display = "block"; 
    }
})

inputBusca.addEventListener('input', funcionalidades.pesquisar); 