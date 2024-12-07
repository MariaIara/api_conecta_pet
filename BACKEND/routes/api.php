<?php

use Core\Router;
use Core\Response;

/* ~~~ Application Routes 🚦 ~~~  */

Router::get('/admin', 'AdminController::index');
Router::post('/admin/cadastro', 'AdminController::cadastrar');
Router::post('/admin/login', 'AdminController::login');
Router::put('/admin/update/{id}', 'AdminController::update');
Router::delete('/admin/excluir/{id}', 'AdminController::excluir');

Router::get('/cliente', 'ClienteController::index');
Router::get('/cliente/{id}', 'ClienteController::show');
Router::post('/cliente', 'ClienteController::store');
Router::put('/cliente/{id}', 'ClienteController::update');
Router::delete('/cliente/{id}', 'ClienteController::destroy');

Router::get('/pets', 'PetController::index');
Router::get('/pets/{id}', 'PetController::show');
Router::post('/pets', 'PetController::store');
Router::put('/pets/{id}', 'PetController::update');
Router::delete('/pets/{id}', 'PetController::destroy');