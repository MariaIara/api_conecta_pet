<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Cliente;

class ClienteController extends Controller
{
    protected $cliente_model;

    public function __construct()
    {
        $this->cliente_model = new Cliente();
    }

    public function index()
    {
        $cliente = $this->cliente_model->all();
        return $this->response(200, $cliente);
    }

    public function show($id)
    {
        $cliente = $this->cliente_model->find($id);

        if (!$cliente) {
            return $this->response(404, ['error' => 'O cliente não existe!']);
        }

        return $this->response(200, $cliente);
    }

    public function store()
    {
        $cliente = $this->getRequestBody(); // Cliente retornado do formulário no formato de um array associativo

        $cliente_existe = $this->cliente_model->findBy('cpf', $cliente['cpf']); // Procura um cliente no banco com o campo cpf com o valor do segundo parâmetro

        if ($cliente_existe) { // Se já existir um cliente com esse cpf:
            return $this->response(409, ['error' => 'Já existe um cliente com o CPF informado']);
        }

        $this->cliente_model->save($cliente); // Adiciona cliente no banco

        return $this->response(200, ['success' => 'Cliente criado com sucesso!']); // Mensagem de sucesso :)
    }

    public function update($id)
    {
        $this->cliente_model->update($id, $this->getRequestBody());
        return $this->response(200, ['success' => 'Alteração realizada com sucesso!']);
    }

    public function destroy($id)
    {
        $cliente = $this->cliente_model->find($id);

        if (!$cliente) {
            return $this->response(404, ['error' => 'Este cliente não está cadastrado em nossa base de dados']);
        }

        $this->cliente_model->delete($id);
        return $this->response(200, ['success' => 'Cliente excluído com sucesso!']);
    }
}
