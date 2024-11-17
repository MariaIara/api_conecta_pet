<?php

namespace App\Models;

use Core\Model;

class Endereco extends Model
{
    protected $table = 'endereco';

    public function idCliente($idcliente)
    {
        $sql = "
            SELECT 
                endereco.id 
            FROM 
                endereco
            INNER JOIN 
                cliente 
            ON 
                cliente.cpf = endereco.cliente_cpf
            WHERE 
                cliente.id = :idcliente";
    
        return $this->query($sql, ['idcliente' => $idcliente]);
    }
}
