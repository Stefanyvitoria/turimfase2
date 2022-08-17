CREATE DATABASE IF NOT EXISTS teste_rte;

USE teste_rte;

CREATE TABLE IF NOT EXISTS teste_rte.pessoa (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS teste_rte.filho (
  id INT NOT NULL AUTO_INCREMENT,
  pessoa_id INT NOT NULL,
  nome VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

ALTER TABLE teste_rte.filho ADD FOREIGN KEY (pessoa_id) REFERENCES teste_rte.pessoa(id);

