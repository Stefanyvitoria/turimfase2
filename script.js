$(document).ready(
    
    $.get( "Database.php/ler", function( json ) {
        
        // Preenche o textarea
        var textedJson = JSON.stringify(json, null, 4);
        document.getElementById("json-area").value=textedJson;
        document.getElementById("json-area").readOnly = true; 

        
        var tabela = document.getElementById("table");

        json.pessoas.forEach( function (pessoa, i) {
            
            console.log(i);
            console.log(pessoa);

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

    })
);