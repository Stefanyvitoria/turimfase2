function ajustarJsonNaTela(json) {

    // Preenche o textarea
    var textedJson = JSON.stringify(json, null, 4);
    document.getElementById("json-area").value=textedJson;
    document.getElementById("json-area").readOnly = true; 

    var tabela = document.getElementById("table");
    tabela.innerHTML = '';
    var tabela = document.getElementById("table");
    var linha = tabela.insertRow();
    var celula1 = linha.insertCell(0);
    celula1.innerHTML = '<b>Pessoas</b>';
    celula1.classList.add('titulo');

    json.pessoas.forEach( function (pessoa, i) {

        //Preenche as tabelas

        var linhaPessoa = tabela.insertRow();
        var celula1 = linhaPessoa.insertCell(0);
        var celula2 = linhaPessoa.insertCell(1);
        id = 'p'+i.toString();

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
        
        var linhaBotaoAddFilho = tabela.insertRow();
        var celula3 = linhaBotaoAddFilho.insertCell(0);

        
        celula1.innerHTML = '<text id="'+id+'">'+pessoa.nome+'</text>';
        celula2.innerHTML = '<input style="padding: 3px;" type="button" value="Remover" onclick="deletarPessoa('+id+')">';
        celula3.innerHTML = '<input style="padding: 3px;" type="button" value="Adicionar filho">';
        
        //css
        celula1.classList.add('row-pessoa');
        celula2.classList.add('row-pessoa');
        celula1.classList.add('cel1');
        celula2.classList.add('cel2');
        celula3.classList.add('p3');
    })
}

function ler() {
    
    $.get( "Database.php/ler", function( json ) {
        ajustarJsonNaTela(json);
    })
};

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


function incluirPessoa() {
    var btnNome = document.getElementById('nome-pesssoa');
    var txtarea = document.getElementById('json-area');

    var json = JSON.parse(txtarea.value);
    json.pessoas.push({'nome': btnNome.value, 'filhos': []})

    ajustarJsonNaTela(json);
    btnNome.value = '';
}


function gravar(){
    var txtarea = document.getElementById('json-area');
    var json = JSON.parse(txtarea.value);

    $.post( "Database.php/gravar", JSON.stringify(json) ,function(_) {
        ler();
    })
}

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