<?php

require_once 'dao/daoEncadrant.php';

class encadrantController {

    static function liste() {
        $retour = daoEncadrant::getEncadrant();

        header('content-type: application/json; charset=utf-8');
        $json = json_encode($retour);

        $callback = new callback();
        $callback->setSubject(isset($_GET['callback']) ? $_GET['callback'] : exit());

        if (!$callback->is_valid_callback())
            exit($json);

        if ($callback->is_valid_callback())
            exit("{$_GET['callback']}($json)");

        header('status: 400 Erreur de requete', true, 400);
    }

}

?>
