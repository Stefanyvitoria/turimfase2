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

    json.pessoas.forEach( function (pessoa, _) {

        //Preenche as tabelas
        var linha = tabela.insertRow();
        var linha2 = tabela.insertRow();
        var celula1 = linha.insertCell(0);
        var celula2 = linha.insertCell(1);
        var celula3 = linha2.insertCell(0);


        celula1.innerHTML = pessoa.nome;
        celula2.innerHTML = '<input style="padding: 3px;" type="button" value="Remover">';
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



