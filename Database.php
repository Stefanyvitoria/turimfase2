<?php
    class BD {
        private $conexao = NULL;

        
        public function conectar($host, $user, $password, $database) {
            $this->conexao = mysqli_connect($host, $user, $password, $database);
        }

        public function criarBD($host, $user, $password, $database) {
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
        }
    }



?>