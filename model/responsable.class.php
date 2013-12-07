<?php

class Responsable implements JsonSerializable {

    private $no_resp;
    private $nom_resp;
    private $prenom_resp;
    private $pass_resp;
    private $civilite_resp;
    private $login_resp;

    function __construct(array $data) {

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

    public function getNo_resp() {
        return $this->no_resp;
    }

    public function setNo_resp($no_resp) {
        $this->no_resp = $no_resp;
    }

    public function getNom_resp() {
        return $this->nom_resp;
    }

    public function setNom_resp($nom_resp) {
        $this->nom_resp = $nom_resp;
    }

    public function getPrenom_resp() {
        return $this->prenom_resp;
    }

    public function setPrenom_resp($prenom_resp) {
        $this->prenom_resp = $prenom_resp;
    }

    public function getPass_resp() {
        return $this->pass_resp;
    }

    public function setPass_resp($pass_resp) {
        $this->pass_resp = $pass_resp;
    }

    public function getCivilite_resp() {
        return $this->civilite_resp;
    }

    public function setCivilite_resp($civilite_resp) {
        $this->civilite_resp = $civilite_resp;
    }

    public function getLogin_resp() {
        return $this->login_resp;
    }

    public function setLogin_resp($login_resp) {
        $this->login_resp = $login_resp;
    }

}

?>