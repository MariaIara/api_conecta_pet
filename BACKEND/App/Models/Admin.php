<?php

namespace App\Models;

use Core\Model;

class Admin extends Model
{
    protected $table = 'admin';

    // Administrador padrão = 1
    // Administrador Master = nível 2
    public function isLevelTwoAdmin($adminId)
    {
        $admin = $this->findBy('id', $adminId);
        return $admin['nivel'] === 2;
    }

    public function verifyPassword($input_password, $stored_password)
    {
        return password_verify($input_password, $stored_password);
    }
}
