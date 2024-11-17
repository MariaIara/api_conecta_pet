<?php

namespace App\Models;

use Core\Model;

class Telefone extends Model
{
    protected $table = 'telefone';

    public function idCliente($idcliente)
    {
        $sql = "
            SELECT 
                telefone.id 
            FROM 
                telefone
            INNER JOIN 
                cliente 
            ON 
                cliente.cpf = endereco.cliente_cpf
            WHERE 
                cliente.id = :idcliente";
    
        return $this->query($sql, ['idcliente' => $idcliente]);

    }
}
