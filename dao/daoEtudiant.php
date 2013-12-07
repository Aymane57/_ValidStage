<?php

class daoEtudiant {

    static function getEtudiantSansStage($section, $annee_diplome) {

        $db = connect::getInstance();

        $query = $db->prepare('SELECT * FROM etudiant
            WHERE annee_diplome = :annee_diplome
            AND no_section = :no_section
            AND no_etud NOT IN (SELECT etudiant.no_etud
                FROM etudiant, stage
                WHERE etudiant.no_etud = stage.no_etud
                AND no_section = :no_section
                AND annee_diplome = :annee_diplome)');


        $query->bindValue(':no_section', $section);
        $query->bindValue(':annee_diplome', $annee_diplome);

        $query->execute();

        $etudiants = NULL;
        foreach ($query->fetchAll(PDO::FETCH_ASSOC) as $key => $value)
            $etudiants[$key] = new Etudiant($value);

        $query->closeCursor();
        $db = NULL;

        return $etudiants;
    }

    static function getEtudiantByNo($no_etud) {

        $db = connect::getInstance();

        $query = $db->prepare('SELECT *
            FROM etudiant
            WHERE no_etud = :no_etud');

        $query->bindValue(':no_etud', $no_etud);

        $query->execute();

        $data = $query->fetch(PDO::FETCH_ASSOC);
        $etudiant = $data != FALSE ? new Encadrant($data) : NULL;

        $query->closeCursor();
        $db = NULL;

        return $etudiant;
    }

}

?>
