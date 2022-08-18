/**
 * Autor: izidiostefany@gmail.com
 * Data: 18/08/2022
 */

$(document).ready( function (_) {
    var tabela = document.getElementById("table");
    var linha = tabela.insertRow();
    var celula1 = linha.insertCell(0);
    celula1.innerHTML = '<b>Pessoas</b>';
    celula1.classList.add('titulo');

    textedJson = JSON.stringify({"pessoas": []}, null, 4)
    document.getElementById("json-area").value=textedJson;
    document.getElementById("json-area").readOnly = true
});


function ajustarJsonNaTela(json) {

    // Preenche o textarea
    var textedJson = JSON.stringify(json, null, 4);
    document.getElementById("json-area").value=textedJson;
    document.getElementById("json-area").readOnly = true; 

    //limpa  e Insere o cabeçalho da tabela
    var tabela = document.getElementById("table");
    tabela.innerHTML = '';
    var tabela = document.getElementById("table");
    var linha = tabela.insertRow();
    var celula1 = linha.insertCell(0);
    celula1.innerHTML = '<b>Pessoas</b>';
    celula1.classList.add('titulo');

    // Insere as linhas com as pessoas
    json.pessoas.forEach( function (pessoa, i) {

        var linhaPessoa = tabela.insertRow();
        var celula1 = linhaPessoa.insertCell(0);
        var celula2 = linhaPessoa.insertCell(1);
        id = 'p'+i.toString();

        // Insere as linhas com os filhos das pessoa
        pessoa.filhos.forEach( function (filho, j) {
            var linhaFilho = tabela.insertRow();
            var celula1 = linhaFilho.insertCell(0);
            var celula2 = linhaFilho.insertCell(1);
            
            var id_f = id+'f'+j.toString();
            celula1.innerHTML = '<text style="margin-left: 15px;" id="'+id_f+'">-'+filho+'</text>';
            celula2.innerHTML = '<input style="padding: 4px;" type="button" value="Remover filho" onclick="deletarFilho('+id_f+')">';

            celula1.classList.add('row-filho');
            celula2.classList.add('row-filho');
            celula1.classList.add('cel1');
            celula2.classList.add('cel2');
        });
        
        //linha com botão de adicionar filho
        var linhaBotaoAddFilho = tabela.insertRow();
        var celula3 = linhaBotaoAddFilho.insertCell(0);
        
        celula1.innerHTML = '<text id="'+id+'">'+pessoa.nome+'</text>';
        celula2.innerHTML = '<input style="padding: 3px;" type="button" value="Remover" onclick="deletarPessoa('+id+')">';
        celula3.innerHTML = '<input style="padding: 3px;" type="button" value="Adicionar filho" onclick="Popup('+id+')">';
        
        //css
        celula1.classList.add('row-pessoa');
        celula2.classList.add('row-pessoa');
        celula1.classList.add('cel1');
        celula2.classList.add('cel2');
        celula3.classList.add('p3');
    })
}


//faz a leitura do banco e ajusta o front
function ler() {
    $.get( "API.php/ler", function( json ) {
        ajustarJsonNaTela(json);
    })
};

//Inclui pessoa e ajusta o front
function incluirPessoa() {
    var btnNome = document.getElementById('nome-pesssoa');
    var txtarea = document.getElementById('json-area');

    var json = JSON.parse(txtarea.value);
    json.pessoas.push({'nome': btnNome.value, 'filhos': []})

    ajustarJsonNaTela(json);
    btnNome.value = '';
}


//Grava o json no banco
function gravar(){
    var txtarea = document.getElementById('json-area');
    var json = JSON.parse(txtarea.value);

    $.post( "API.php/gravar", JSON.stringify(json) ,function(_) {
        ler();
    })
}


//Deleta pessoa e ajusta o front
function deletarPessoa(pessoa) {
    var nomePessoa = pessoa.innerHTML;
    var txtarea = document.getElementById('json-area');
    var json = JSON.parse(txtarea.value);

    newJson = {"pessoas":[]}
    for (let i = 0; i < json.pessoas.length; i++) {
        pessoa = json.pessoas[i];
        if (nomePessoa != pessoa.nome) {
            newJson.pessoas.push(pessoa)
        }
    }
    ajustarJsonNaTela(newJson);
}

//Deleta filho e ajusta o front
function deletarFilho(filho) {

    nomePessoa = document.getElementById(filho.id.split('f')[0]).innerHTML;
    var nomeFilho = filho.innerHTML;
    var txtarea = document.getElementById('json-area');
    var json = JSON.parse(txtarea.value);

    newJson = {"pessoas":[]}
    for (let i = 0; i < json.pessoas.length; i++) {
        pessoa = json.pessoas[i];
        if (nomePessoa == pessoa.nome) {
            
            filhos = [];
            for (let j = 0; j < pessoa.filhos.length; j++) {
                filhoN = pessoa.filhos[j];

                if (nomeFilho != '-'+filhoN) {
                    filhos.push(filhoN);
                }
            }

            pessoa.filhos = filhos;

        }
        newJson.pessoas.push(pessoa)
    }
    ajustarJsonNaTela(newJson);
}


//recebe o nome do filho via popup
function Popup(pessoa) {
    let nomeFilho = prompt("Informe o nome:", "");
    if (nomeFilho == null || nomeFilho == "") {
        return;
    } else {
        incluirFilho(pessoa, nomeFilho)
    }
}

// inclui o filho e ajusta o front
function incluirFilho(pessoa, nomeFilho) {

    nomePessoa = pessoa.innerHTML;
    var txtarea = document.getElementById('json-area');
    var json = JSON.parse(txtarea.value);

    for (let i = 0; i < json.pessoas.length; i++) {
        pessoa = json.pessoas[i];
        if (nomePessoa == pessoa.nome) {
            json.pessoas[i].filhos.push(nomeFilho)
        }
    }
    ajustarJsonNaTela(json);
}