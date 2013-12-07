<?php

require_once 'dao/daoEntreprise.php';
require_once 'dao/daoStage.php';

class stageController {
    #####################################
    # Lire la liste des stages #

    static function liste() {
        if (isset($_GET['annee']) && isset($_GET['no_section'])) {

            $retour = daoStage::getEtudiantsAvecStage($_GET['no_section'], $_GET['annee']);

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

    #####################################
    # Valider un stage #

    static function add() {

        if (isset($_GET['no_etud']) && isset($_GET['sujet']) && isset($_GET['motcle']) && isset($_GET['tuteur']) && isset($_GET['noment'])) {

            $noment = trim($_GET['noment']);
            $sujet = trim($_GET['sujet']);

            if ($_GET['no_etud'] != NULL && $noment != NULL && $sujet != NULL) {

                $no_ent = DaoEntreprise::getNoEntrepriseByName($noment);

                if ($no_ent != NULL) {

                    $stage = new Stage(array
                        ('no_etud' => $_GET['no_etud'],
                        'no_ent' => $no_ent,
                        'date_validation' => date("Y-m-d"),
                        'mot_clef' => trim($_GET['motcle']),
                        'tuteur' => trim($_GET['tuteur']),
                        'sujet' => $sujet)
                    );

                    DaoStage::create($stage);
                    $retour = 2; # Tout est OK
                }
                else
                    $retour = 1;# Entreprise inexistante
            }
            else
                $retour = 0;# Champs vides
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

    #####################################
    # Lire les infos d'un stages #

    static function infos() {
        if (isset($_GET['no_stage'])) {
            $retour = daoStage::read($_GET['no_stage']);

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

    #####################################
    # Lire les stages affectés à un encadrants ou non affectés #

    static function getStagesEncadrants() {

        if (isset($_GET['no_enc']) && isset($_GET['no_section']) && isset($_GET['annee'])) {
            $retour = DaoStage::getStagesAvecOuSansEncadrant($_GET['no_section'], $_GET['annee'], $_GET['no_enc']);

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

    #####################################
    # Affecter un stage à un encadrant #

    static function updateEncadrant() {
        if (isset($_GET['no_stage']) && isset($_GET['no_enc'])) {
            $stage = DaoStage::read($_GET['no_stage']);

            if ($_GET['no_enc'] != 'null')
                $encadrant = new Encadrant(array('no_enc' => $_GET['no_enc']));
            else
                $encadrant = new Encadrant(array());

            $stage->setEncadrant($encadrant);
            $retour = DaoStage::update($stage);

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

    #####################################
    # Modifier un stage #

    static function update() {
        if (isset($_GET['no_stage']) && isset($_GET['sujet']) && isset($_GET['motcle']) && isset($_GET['tuteur']) && isset($_GET['entreprise'])) {

            $sujet = trim($_GET['sujet']);
            $noment = trim($_GET['entreprise']);

            if ($_GET['no_stage'] != null && $noment != null && $sujet != null) {

                $no_ent = DaoEntreprise::getNoEntrepriseByName($noment);

                if ($no_ent != NULL) {

                    $stage = DaoStage::read($_GET['no_stage']);

                    $stage->getEntreprise()->setNo_ent($no_ent);
                    $stage->setMot_clef(trim($_GET['motcle']));
                    $stage->setTuteur(trim($_GET['tuteur']));
                    $stage->setSujet($sujet);

                    if (isset($_GET['entreprise_change']) && $_GET['entreprise_change'] == 'true')
                        $stage->setDate_validation(date("Y-m-d"));

                    DaoStage::update($stage);
                    $retour = 2; # Tout est Ok
                }
                else
                    $retour = 1;# Entreprise inexistante
            }
            else
                $retour = 0;# Champs vide

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
