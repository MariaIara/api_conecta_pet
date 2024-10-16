<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Cliente;

class ClienteController extends Controller
{
    protected $cliente_model;

    public function __construct(){
        $this->cliente_model = new Cliente();
    }

    public function index()
    {
        $cliente = $this->cliente_model->all();
        return $this->response(200, $cliente);
    }

    public function show($id){
        $cliente = $this->cliente_model->find($id);

        if(!$cliente){
            return $this->response(404, ['error' => 'O cliente não existe!']);
        }

        return $this->response(200, $cliente);
    }

    public function store(){
        $this->cliente_model->save($this->getRequestBody());
        return $this->response(200, ['success' => 'Cliente criado com sucesso!']);
        // $cliente_model = new Cliente();
        // $cliente = $this->getRequestBody();
        // $cliente_model->save($cliente);
        // return $this->response(200, ['success' => 'Cliente criado com sucesso!']);
    }
}
