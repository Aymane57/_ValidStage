<?php
require_once 'etudiant.class.php';
require_once 'entreprise.class.php';
require_once 'encadrant.class.php';

class Stage implements JsonSerializable {

    private $no_stage;
    private $etudiant;
    private $entreprise;
    private $encadrant;
    private $sujet;
    private $mot_clef;
    private $date_validation;
    private $tuteur;

    function __construct(array $data) {

        $this->etudiant = new Etudiant($data);
        $this->entreprise = new Entreprise($data);
        $this->encadrant = new Encadrant($data);

        foreach ($data as $key => $value) {
            $method = 'set' . ucfirst($key);

            if (method_exists($this, $method)) {
                $this->$method($value);
            }
        }
    }

    public function jsonSerialize() {
        return (object) get_object_vars($this);
    }

    public function getNo_stage() {
        return $this->no_stage;
    }

    public function setNo_stage($no_stage) {
        $this->no_stage = $no_stage;
    }

    public function getSujet() {
        return $this->sujet;
    }

    public function setSujet($sujet) {
        $this->sujet = $sujet;
    }

    public function getMot_clef() {
        return $this->mot_clef;
    }

    public function setMot_clef($mot_clef) {
        $this->mot_clef = $mot_clef;
    }

    public function getDate_validation() {
        return $this->date_validation;
    }

    public function setDate_validation($date_validation) {
        $this->date_validation = $date_validation;
    }

    public function getTuteur() {
        return $this->tuteur;
    }

    public function setTuteur($tuteur) {
        $this->tuteur = $tuteur;
    }

    public function getEntreprise() {
        return $this->entreprise;
    }

    public function setEntreprise(Entreprise $entreprise) {
        $this->entreprise = $entreprise;
    }

    public function getEtudiant() {
        return $this->etudiant;
    }

    public function setEtudiant(Etudiant $etudiant) {
        $this->etudiant = $etudiant;
    }

    public function getEncadrant() {
        return $this->encadrant;
    }

    public function setEncadrant(Encadrant $encadrant) {
        $this->encadrant = $encadrant;
    }

    function __sleep() {
        return array('no_stage', 'mot_clef', 'date_validation');
    }

}

?>
