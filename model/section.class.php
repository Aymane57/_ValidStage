<?php
require_once 'responsable.class.php';

class Section implements JsonSerializable {

    private $no_section;
    private $libelle_section;
    private $libelle_section_long;
    private $responsable;

    function __construct(array $data) {
        
        $this->responsable = new Responsable($data);

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

    public function getNo_section() {
        return $this->no_section;
    }

    public function setNo_section($no_section) {
        $this->no_section = $no_section;
    }

    public function getLibelle_section() {
        return $this->libelle_section;
    }

    public function setLibelle_section($libelle_section) {
        $this->libelle_section = $libelle_section;
    }

    public function getLibelle_section_long() {
        return $this->libelle_section_long;
    }

    public function setLibelle_section_long($libelle_section_long) {
        $this->libelle_section_long = $libelle_section_long;
    }

    public function getResponsable() {
        return $this->responsable;
    }

    public function setResponsable($responsable) {
        $this->responsable = $responsable;
    }

}

?>
