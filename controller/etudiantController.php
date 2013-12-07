<?php

require_once 'dao/daoEtudiant.php';

class etudiantController {

    static function liste() {
        if (isset($_GET['annee']) && isset($_GET['no_section'])) {

            $retour = daoEtudiant::getEtudiantSansStage($_GET['no_section'], $_GET['annee']);

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

}

?>
