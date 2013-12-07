<?php

require_once 'section.class.php';

class Etudiant implements JsonSerializable {

    private $no_etud;
    private $nom;
    private $prenom;
    private $annee_diplome;
    private $section;

    function __construct(array $data) {

        $this->section = new Section($data);

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

    public function getNo_etud() {
        return $this->no_etud;
    }

    public function setNo_etud($no_etud) {
        $this->no_etud = $no_etud;
    }

    public function getNom() {
        return $this->nom;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function getPrenom() {
        return $this->prenom;
    }

    public function setPrenom($prenom) {
        $this->prenom = $prenom;
    }

    public function getAnnee_diplome() {
        return $this->annee_diplome;
    }

    public function setAnnee_diplome($annee_diplome) {
        $this->annee_diplome = $annee_diplome;
    }

    public function getSection() {
        return $this->section;
    }

    public function setSection($section) {
        $this->section = $section;
    }

}

?>
