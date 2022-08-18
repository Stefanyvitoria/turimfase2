<?php
    class BD {
        private $conexao = NULL;

        
        public function conectar($host, $user, $password, $database) {
            $this->conexao =new mysqli($host, $user, $password, $database);
        }

        public function criarBD($host, $user, $password) {
            $this->conexao = new mysqli($host, $user, $password);

            $sql = file_get_contents("./Banco.sql");
            $lista_sql = explode(";", $sql);
            
            for ($i = 0; $i < count($lista_sql) - 1; $i++) {

                if ($this->conexao->query($lista_sql[$i]) === TRUE) {
                    $this->conexao->commit();
                }
            }
        }

        public function gravar($json) {
        }

        public function ler() {

            $result = $this->conexao->query("select P.id id_p, P.nome nome_p, F.id id_f, F.nome nome_f from pessoa P left join filho F on F.pessoa_id = P.id;");
            $pessoas = array("pessoas"=>[]);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    
                    $achou = false;
                    for ($i = 0; $i < count($pessoas['pessoas']); $i++) {
                        $pessoas['pessoas'][$i] = $pessoas['pessoas'][$i];                        

                        if ( ($pessoas['pessoas'][$i]['nome'] == $row['nome_p']) and ($row['nome_f'] != null ? true : false) ) {
                            
                            $pessoas['pessoas'][$i]['filhos'][] = $row['nome_f'];
                            
                            $achou = true;
                            break;
                        } 
                    }

                    if (!$achou) {
                        $infoPessoa = ["nome"=>$row["nome_p"], "filhos"=>$row['nome_f'] != null ? [$row['nome_f']] :[]]; //json com informações da pessoa
                        $pessoas["pessoas"][] =  $infoPessoa; ///adição da pessoa no json de retorno

                    }
                }   
            }


            header('Content-Type: application/json');
            echo json_encode($pessoas);
        }
    }

 
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode( '/', $uri );
    $metodo = end($uri);

    header('Content-Type: application/json');

    $host = "localhost";
    $user = "root";
    $password = "123456";
    $database = "teste_rte";
    $banco = new BD();

    // Conectar / Criar banco
    try {
        $banco->conectar($host, $user, $password, $database);
    } catch (Exception $e) {
        $banco->criarBD($host, $user, $password, $database);
        $banco->conectar($host, $user, $password, $database);
    }


    switch($metodo)
    {
        case "ler" :
            $banco->ler();
            break;

        default: 
            echo "Request inválido";
    }


?>