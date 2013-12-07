<?php

require_once 'dao/daoResponsable.php';

class responsableController {

    static function canConnect() {

        if (isset($_GET['login_resp']) && isset($_GET['pass_resp'])) {
            $responsable = daoResponsable::read($_GET['login_resp']);

            $retour = ($responsable && $_GET['pass_resp'] == $responsable->getPass_resp()) ? true : false;

            if(isset($_GET['connexion']) && $_GET['connexion'] == 'true') {
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
			
			return $retour;
        }
    }

}

?>
