<?php
    require_once "./Database.php";

    $host = "localhost";
    $user = "root";
    $password = "123456";
    $database = "teste_rte";
    $banco = new BD();
    
    try {
        $banco->conectar($host, $user, $password, $database);
    } catch (Exception $e) {
        $banco->criarBD($host, $user, $password, $database);
        $banco->conectar($host, $user, $password, $database);
    }
    
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste</title>
</head>

<style>
    .campos{
        margin-top: 1rem; 
        display: flex;
        flex-direction: row;
        column-gap: 1rem;
    }

    .pessoas{
        width: 100px;
        height: 100px;
    }

    .table{
        width: 350px;
    }

    tr{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    
    .titulo{
        width: 100%;
        text-align:center; 
        background-color: rgb(201, 201, 201);
        padding: 6px;
        margin: 2px;
    }

    .row-pessoa{
        background-color: rgb(231, 231, 231);
        padding: 6px;
        margin: 2px;
    }

</style>

<body>

    <!-- Botões -->
    <div> 
        <input type="button" value="Gravar">
        <input type="button" value="Ler">
    </div>

    <!-- Entrada de pessoas -->
    <div style="margin-top: 1rem;">
        Nome:
        <input type="text">
        <input type="button" value="Incluir">
    </div>

    <div class="campos">

        <table class="table">

            <tr>
                <td class="titulo" >
                    <b>Pessoas</b>
                </td>
            </tr>

            <tr>
                <td class="row-pessoa" style="width: 70%;">Nome</td>
                <td class="row-pessoa" style="text-align:center;width: 30%;">
                    <input style="padding: 3px;" type="button" value="Remover">
                </td>
            </tr>

            <tr>
                <td style="padding: 3px;">
                    <input style="padding: 3px;" type="button" value="Adicionar filho">
                </td>
            </tr>

        </table>

        <textarea name="json" id="json" style="display: inline-block;">json</textarea>
    </div>
    
</body>
</html>