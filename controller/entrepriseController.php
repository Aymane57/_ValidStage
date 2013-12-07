<?php

require_once 'dao/daoEntreprise.php';

class entrepriseController {

    static function add() {

	if (isset($_GET['noment1']) && isset($_GET['noment2']) && isset($_GET['adr1']) && isset($_GET['adr2']) && isset($_GET['cpent']) && isset($_GET['ville']) && isset($_GET['pays']) && isset($_GET['tel']) && isset($_GET['cedex']) && isset($_GET['b_cedex'])) {
			
            if ($_GET['noment1'] == NULL || $_GET['cpent'] == NULL || $_GET['ville'] == NULL)
                $retour = 0;
            else {

                if (DaoEntreprise::getNoEntrepriseByName($_GET['noment1'] . ' ' . $_GET['noment2']) == NULL) {

                    DaoEntreprise::ajoutEntreprise(new Entreprise(array(
                        'noment1' => $_GET['noment1'],
                        'noment2' => $_GET['noment2'],
                        'adr1' => $_GET['adr1'],
                        'adr2' => $_GET['adr2'],
                        'cpent' => $_GET['cpent'],
                        'ville' => $_GET['ville'],
                        'pays' => $_GET['pays'],
                        'telent' => $_GET['tel'],
                        'cedex' => $_GET['cedex'],
                        'b_cedex' => $_GET['b_cedex'],)
                    ));

                    $retour = 2;
                }
                else
                    $retour = 1;
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

    static function infos() {
        if (isset($_GET['no_ent'])) {

            $retour = DaoEntreprise::getEntrepriseByNo($_GET['no_ent']);
            $retour->nbStages = DaoEntreprise::NbStagesDeEntreprise($_GET['no_ent']);

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

    static function liste() {

        if (isset($_GET['term'])) {
            $saisie = $_GET['term'] . "%";

            $retour = DaoEntreprise::getListeEntreprisesByName($saisie);

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

    static function listeSearch() {
        if (isset($_GET['debut']) && isset($_GET['nbEntreprises']) && isset($_GET['recherche'])) {

            $recherche = '%' . $_GET['recherche'] . '%';
            $retour = DaoEntreprise::getPartOfListEntreprises($_GET['debut'], $_GET['nbEntreprises'], $recherche);

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

    static function update() {
        if (isset($_GET['no_ent']) && isset($_GET['noment1']) && isset($_GET['noment2']) && isset($_GET['adr1']) && isset($_GET['adr2']) && isset($_GET['cpent']) && isset($_GET['ville']) && isset($_GET['pays']) && isset($_GET['tel']) && isset($_GET['cedex']) && isset($_GET['b_cedex'])) {

            if ($_GET['noment1'] == NULL || $_GET['cpent'] == NULL || $_GET['ville'] == NULL)
                $retour = 0;
            else {

                if (DaoEntreprise::getNoEntrepriseByName($_GET['noment1'] . ' ' . $_GET['noment2']) == NULL || DaoEntreprise::getNoEntrepriseByName($_GET['noment1'] . ' ' . $_GET['noment2']) == $_GET['no_ent']) {

                    DaoEntreprise::modificationEntreprise(new Entreprise(array(
                        'no_ent' => $_GET['no_ent'],
                        'noment1' => $_GET['noment1'],
                        'noment2' => $_GET['noment2'],
                        'adr1' => $_GET['adr1'],
                        'adr2' => $_GET['adr2'],
                        'cpent' => $_GET['cpent'],
                        'ville' => $_GET['ville'],
                        'pays' => $_GET['pays'],
                        'telent' => $_GET['tel'],
                        'cedex' => $_GET['cedex'],
                        'b_cedex' => $_GET['b_cedex'],)
                    ));

                    $retour = 2;
                }
                else
                    $retour = 1;
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

    static function delete() {
        if (isset($_GET['no_ent'])) {
            $retour = daoEntreprise::deleteEntreprise($_GET['no_ent']);

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
