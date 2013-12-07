<?php

class daoSection {

    static function read($login_resp) {

        $db = connect::getInstance();

        $query = $db->prepare('SELECT DISTINCT section.`no_section`, `libelle_section`, MAX(annee_diplome)
            FROM section, etudiant, responsable
            WHERE section.no_section = etudiant.no_section
            AND responsable.no_resp=section.no_resp
            AND login_resp = :login_resp
            GROUP BY no_section
            ORDER BY (MAX(annee_diplome)) DESC, `libelle_section` ASC');

        $query->bindValue(":login_resp", $login_resp);

        $query->execute();
        
        $sections = NULL;
        foreach ($query->fetchAll(PDO::FETCH_ASSOC) as $key => $value)
            $sections[$key] = new Section($value);

        $query->closeCursor();
        $db = NULL;

        return $sections;
    }

    static function readAnnees($no_section) {

        $db = connect::getInstance();

        $query = $db->prepare('SELECT DISTINCT annee_diplome 
            FROM etudiant
            WHERE no_section = :no_section
            ORDER BY annee_diplome DESC');

        $query->bindValue(":no_section", $no_section);

        $query->execute();

        $data = $query->fetchAll(PDO::FETCH_ASSOC);

        $query->closeCursor();
        $db = NULL;

        return $data;
    }

}

?>
