<?php

    // -----------------------------------
    //  Autor: izidiostefany@gmail.com
    //  Data: 18/08/2022
    // -----------------------------------
    
    include './Database.php';

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = explode( '/', $uri );
        $metodo = end($uri);

        $banco = new BD("localhost", 'root', '123456', 'teste_rte');

        // Conectar / Criar banco
        try {
            $banco->conectar();
        } catch (Exception $e) {
            $banco->criarBD();
            $banco->conectar();
        }


        switch($metodo)
        {
            case "ler" :
                $banco->ler();
                break;

            case "gravar" :
                $json = json_decode(file_get_contents('php://input'));
                $banco->gravar($json);
                break;

            default: 
                echo "Request inválido";
        }

?>