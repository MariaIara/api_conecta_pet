<?php

namespace App\Controllers;

use Core\Controller;
use App\Models\Pet;
use App\Models\Cliente;

class PetController extends Controller
{
    protected $pet_model;
    protected $cliente_model;

    public function __construct()
    {
        $this->pet_model = new Pet();
        $this->cliente_model = new Cliente();
    }

    public function index() //Retorna todos os registros de pets
    {
        $pets = $this->pet_model->allPets();
        return $this->response(200, $pets);
    }

    public function show($id) //Retorna um registro de pet específico por id do microchip
    {
        $pet = $this->pet_model->petByMicrochip($id);

        if (!$pet) {
            $this->response(404, ['Message' => 'Pet não encontrado']);
        }

        $this->response(200, $pet);
    }

    public function store()
    {
        $pet = $this->getRequestBody();

        $cliente_existe = $this->cliente_model->findBy('cpf', $pet['cliente_cpf']); // findBy (função do framework que procura um registro no banco na tabela da model selecionada (cliente) onde a coluna do primeiro parâmetro que tenha o valor do segundo parâmetro) 

        if (!$cliente_existe) {
            return $this->response(404, ['error' => 'Não foi possível encontrar um tutor com o CPF informado']);
        }

        $this->pet_model->save($pet); // Salva o pet no banco

        return $this->response(201, ['sucess' => 'Novo pet criado!']); 
    }

    public function update($id)
    {
        $this->pet_model->update($id, $this->getRequestBody());
        return $this->response(200, ['sucess' => 'Alteração realizada com sucesso!']);
    }

    public function destroy($id)
    {
        $pet = $this->pet_model->find($id);

        if (!$pet) {
            return $this->response(404, ['error' => 'O pet não existe!']);
        }

        $this->pet_model->delete($id);
        return $this->response(200, ['sucess' => 'Pet excluído!']);
    }
}
