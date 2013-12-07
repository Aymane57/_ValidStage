<?php

class Encadrant implements JsonSerializable {

    private $no_enc;
    private $nomenc;
    private $prenomenc;

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

    public function getNo_enc() {
        return $this->no_enc;
    }

    public function setNo_enc($no_enc) {
        $this->no_enc = $no_enc;
    }

    public function getNomenc() {
        return $this->nomenc;
    }

    public function setNomenc($nomenc) {
        $this->nomenc = $nomenc;
    }

    public function getPrenomenc() {
        return $this->prenomenc;
    }

    public function setPrenomenc($prenomenc) {
        $this->prenomenc = $prenomenc;
    }

}

?>
