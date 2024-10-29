<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Cliente;
use App\Models\Endereco;
use App\Models\Telefone;

class ClienteController extends Controller
{
    protected $cliente_model;
    protected $endereco_model;
    protected $telefone_model;

    public function __construct()
    {
        $this->cliente_model = new Cliente();
        $this->endereco_model = new Endereco();
        $this->telefone_model = new Telefone();
    }

    public function index()
    {
        $cliente = $this->cliente_model->allClientes();
        return $this->response(200, $cliente);
    }

    public function show($id)
    {
        $cliente = $this->cliente_model->clienteInfo($id);

        if (!$cliente) {
            return $this->response(404, ['error' => 'O cliente não existe!']);
        }

        return $this->response(200, $cliente);
    }

    public function store()
    {
        $dados_form = $this->getRequestBody(); // Dados retornados do formulário no formato de um array associativo

        $cliente_cpf = $dados_form['cpf'];

        $cliente = [
            'nome' => $dados_form['nome'],
            'cpf' => $cliente_cpf,
        ];

        $cliente_existe = $this->cliente_model->findBy('cpf', $cliente_cpf); // Procura um cliente no banco com o campo cpf com o valor do segundo parâmetro

        if ($cliente_existe) { // Se já existir um cliente com esse cpf:
            return $this->response(409, ['error' => 'Já existe um cliente com o CPF informado']);
        }

        $this->cliente_model->save($cliente); // Adiciona cliente no banco

        $endereco = [
            'cep' => $dados_form['cep'],
            'cidade' => $dados_form['cidade'],
            'UF' => $dados_form['UF'],
            'bairro' => $dados_form['bairro'],
            'rua' => $dados_form['rua'],
            'numero' => $dados_form['numero'],
            'cliente_cpf' => $cliente_cpf,
        ];

        $this->endereco_model->save($endereco);

        $telefone = [
            'telefone' => $dados_form['telefone'],
            'cliente_cpf' => $cliente_cpf,
        ];

        $this->telefone_model->save($telefone);

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
