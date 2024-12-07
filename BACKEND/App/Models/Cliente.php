<?php

namespace App\Models;

use Core\Model;

class Cliente extends Model
{
    protected $table = 'cliente';

    public function allClientes()
    {
        $sql = "SELECT 
                    cliente.*,  
                    CONCAT(endereco.cep, ' - ', endereco.cidade, ' - ', endereco.bairro, ' - ', endereco.rua, ' - ', endereco.numero) AS endereco, 
                    telefone.telefone AS telefone
                FROM {$this->table} 
                INNER JOIN endereco ON endereco.cliente_cpf = cliente.cpf 
                INNER JOIN telefone ON telefone.cliente_cpf = cliente.cpf";

        return $this->query($sql);
    }

    public function clienteInfo($id)
    {
        $sql = "SELECT 
                    cliente.*,  
                    CONCAT(endereco.cep, ' - ', endereco.cidade, ' - ', endereco.bairro, ' - ', endereco.rua, ' - ', endereco.numero) AS endereco, 
                    telefone.telefone AS telefone
                FROM {$this->table} 
                INNER JOIN endereco ON endereco.cliente_cpf = cliente.cpf 
                INNER JOIN telefone ON telefone.cliente_cpf = cliente.cpf
                WHERE cliente.id = :id";

        return $this->query($sql, ['id' => $id]);
    }
}
