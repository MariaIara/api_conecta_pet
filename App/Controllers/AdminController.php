<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Admin;

class AdminController extends Controller
{
    protected $admin_model;

    public function __construct(){
        $this->admin_model = new Admin();
    }

    public function store(){
        $this->admin_model->save($this->getRequestBody());
        return $this->response(201, ['sucess' => 'Novo administrador criado']);
    }

    public function cadastrar(){
        $permission = $this->admin_model->checkPermissions();
        
        if(!$permission){
            $this->response(401, ['error' => 'Não foi possivel cadastrar o usuário']);
        }

        $this->store();
    }
}
