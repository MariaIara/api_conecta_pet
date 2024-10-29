<?php

namespace App\Models;

use Core\Model;

class Pet extends Model
{
    protected $table = 'pet';

    public function allPets()
    {
        $sql = "SELECT 
                    pet.*, 
                    cliente.nome AS cliente_nome, 
                    CONCAT(endereco.cep, ' - ', endereco.cidade, ' - ', endereco.bairro, ' - ', endereco.rua, ' - ', endereco.numero) AS endereco_cliente, 
                    telefone.telefone AS telefone_cliente 
                FROM {$this->table} 
                INNER JOIN cliente ON cliente.cpf = pet.cliente_cpf 
                INNER JOIN endereco ON endereco.cliente_cpf = cliente.cpf 
                INNER JOIN telefone ON telefone.cliente_cpf = cliente.cpf;";

        return $this->query($sql);
    }

    public function petByID($id)
    {
        $sql = "SELECT 
                    pet.*, 
                    cliente.nome AS cliente_nome, 
                    CONCAT(endereco.cep, ' - ', endereco.cidade, ' - ', endereco.bairro, ' - ', endereco.rua, ' - ', endereco.numero) AS endereco_cliente, 
                    telefone.telefone AS telefone_cliente 
                FROM {$this->table} 
                INNER JOIN cliente ON cliente.cpf = pet.cliente_cpf 
                INNER JOIN endereco ON endereco.cliente_cpf = cliente.cpf 
                INNER JOIN telefone ON telefone.cliente_cpf = cliente.cpf
                WHERE pet.id = :id";

        return $this->query($sql, ['id' => $id]);
    }
}
