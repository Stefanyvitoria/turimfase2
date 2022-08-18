<?php
    class BD {
        protected $conexao = NULL;
        private $host;
        private $user;
        private $password;
        private $database;

        public function __construct($host, $user, $password, $database)
        {
            $this->host = $host;
            $this->user = $user;
            $this->password = $password;
            $this->database = $database;
        }


        
        public function conectar() {
            $this->conexao =new mysqli($this->host, $this->user, $this->password, $this->database);
        }

        public function criarBD() {
            $this->conexao = new mysqli($this->host, $this->user, $this->password);

            $sql = file_get_contents("./Banco.sql");
            $lista_sql = explode(";", $sql);
            
            for ($i = 0; $i < count($lista_sql) - 1; $i++) {

                if ($this->conexao->query($lista_sql[$i]) === TRUE) {
                    $this->conexao->commit();
                }
            }
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
        
        public function gravar($json) {
            
            $this->conexao->query('DROP TABLE filho');
            $this->conexao->query('DROP TABLE pessoa');
            $this->criarBD();

            $id_p = 1;
            $id_filho = 1;
            foreach ($json->pessoas as $pessoa) {

                $this->conexao->query("insert  into  pessoa (id,nome) values (".strval($id_p).",'".$pessoa->nome."')");
                
                foreach ($pessoa->filhos as $filho) {

                    $this->conexao->query("insert  into filho (id,pessoa_id,nome) values (".$id_filho.",".$id_p.",'".$filho."')");
                    $id_filho += 1;
                }
            
                $id_p +=1;
            }

            header('Content-Type: application/json');
            echo json_encode($json);
        }
    }

 
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode( '/', $uri );
    $metodo = end($uri);

    header('Content-Type: application/json');

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