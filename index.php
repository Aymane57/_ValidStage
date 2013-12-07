<?php

error_reporting(E_ALL);
header('Content-Type: text/html; charset=utf-8');


function autoLoadModel($classname) {
    require 'model/' . strtolower($classname) . '.class.php';
}

spl_autoload_register('autoLoadModel');

require_once 'config.php';
require_once 'dao/connect.php';

require_once 'application/callback.php';
require_once 'controller/responsableController.php';

if(!responsableController::canConnect())
	die('Vous n\'avez pas accés à cette page');

require_once 'application/router.php';

$routeur = new router();
$routeur->setPath('controller');
$routeur->loader();
?>