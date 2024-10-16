<?php

use Core\Router;
use Core\Response;

/* ~~~ Application Routes 🚦 ~~~  */

Router::get('/cadastro', 'AdminController::cadastro');
Router::get('/login', 'AdminController::login');

Router::get('/cliente', 'ClienteController::index');
Router::get('/cliente/{id}', 'ClienteController::show');
Router::post('/cliente', 'ClienteController::store');

Router::get('/pets', 'PetController::index');
Router::get('/pets/{id}', 'PetController::show');
Router::post('/pets', 'PetController::store');
Router::put('/pets/{id}', 'PetController::update');
Router::delete('/pets/{id}', 'PetController::destroy');