<?php

class Entreprise implements JsonSerializable {

    private $no_ent;
    private $noment1;
    private $noment2;
    private $adr1;
    private $adr2;
    private $cpent;
    private $telent;
    private $ville;
    private $b_cedex;
    private $cedex;
    private $pays;

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

    public function getNo_ent() {
        return $this->no_ent;
    }

    public function setNo_ent($no_ent) {
        $this->no_ent = $no_ent;
    }

    public function getNoment1() {
        return $this->noment1;
    }

    public function setNoment1($noment1) {
        $this->noment1 = $noment1;
    }

    public function getNoment2() {
        return $this->noment2;
    }

    public function setNoment2($noment2) {
        $this->noment2 = $noment2;
    }

    public function getAdr1() {
        return $this->adr1;
    }

    public function setAdr1($adr1) {
        $this->adr1 = $adr1;
    }

    public function getAdr2() {
        return $this->adr2;
    }

    public function setAdr2($adr2) {
        $this->adr2 = $adr2;
    }

    public function getCpent() {
        return $this->cpent;
    }

    public function setCpent($cpent) {
        $this->cpent = $cpent;
    }

    public function getTelent() {
        return $this->telent;
    }

    public function setTelent($telent) {
        $this->telent = $telent;
    }

    public function getVille() {
        return $this->ville;
    }

    public function setVille($ville) {
        $this->ville = $ville;
    }

    public function getB_cedex() {
        return $this->b_cedex;
    }

    public function setB_cedex($b_cedex) {
        $this->b_cedex = $b_cedex;
    }

    public function getCedex() {
        return $this->cedex;
    }

    public function setCedex($cedex) {
        $this->cedex = $cedex;
    }

    public function getPays() {
        return $this->pays;
    }

    public function setPays($pays) {
        $this->pays = $pays;
    }

}

?>
