<?php

require_once 'dao/daoSection.php';

class sectionController {
    #####################################
    # Lire les sections et année d'un responsable

    static function infos() {

        if (isset($_GET['login_resp'])) {
            $retour = daoSection::read($_GET['login_resp']);
        }

        if (isset($_GET['no_section'])) {
            $retour = daoSection::readAnnees($_GET['no_section']);
        }

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
