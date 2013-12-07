<?php

class router {

    private $path; // Dossier ou il y a les controleurs - Exemple : dossierDesControlleurs
    public $file; // fichier du controleur qu'on appelle dans le lien Exemple : dossierDesControlleurs/machinControlleur.php
    public $controller; // Le controlleur en lui même - Exemple : Machin
    public $action; // Action qu'on appelle dans le lien - Exemple : ajouterDesMachins

    function setPath($path) {

        if (is_dir($path) == false) {
            throw new Exception('Erreur : ' . $path . ' est introuvable ou n\'est pas un dossier');
        }
        $this->path = $path;
    }

    private function getController() {

        $route = (empty($_GET['page'])) ? die('Erreur, le controlleur n\'est pas spécifié') : $_GET['page'];
		
        $parts = explode('/', $route);

        $this->controller = !empty($parts[0]) ? $parts[0] : die('Erreur, le controlleur n\'est pas spécifié');

        $this->action = !empty($parts[1]) ? $parts[1] :  die('Erreur, la méthode n\'est pas spécifié');

        $this->file = $this->path . '/' . $this->controller . 'Controller.php';

    }

    public function loader() {

        $this->getController();

        if (!is_readable($this->file)) {
            die('Erreur lors du chargement du controlleur, vérifiez que le fichier ' . $this->file . ' existe et accessible en lecture.');
        }

        include_once $this->file;

        $controller = $this->controller . 'Controller';

        $action = is_callable(array($controller, $this->action)) ? $this->action : die('Erreur, impossible d\'appeler la méthode');

        $controller::$action();
    }

}

?>
