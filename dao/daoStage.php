<?php

class DaoStage {

    static function create(Stage $stage) {
        $db = connect::getInstance();
        $query = $db->prepare('INSERT INTO stage SET 
            no_etud = :no_etud,
            no_ent = :no_ent,
            sujet = :sujet,
            mot_clef = :mot_clef,
            date_validation = :date_validation,
            tuteur = :tuteur');

        $query->bindValue(':no_etud', $stage->getEtudiant()->getNo_etud());
        $query->bindValue(':no_ent', intval($stage->getEntreprise()->getNo_ent()));
        $query->bindValue(':sujet', $stage->getSujet());
        $query->bindValue(':mot_clef', $stage->getMot_clef());
        $query->bindValue(':date_validation', $stage->getDate_validation());
        $query->bindValue(':tuteur', $stage->getTuteur());

        $query->execute();
        $db = NULL;
    }

    static function read($no_stage) {
        $db = connect::getInstance();

        $query = $db->prepare('SELECT *
            FROM stage
            LEFT JOIN entreprise
            ON stage.no_ent = entreprise.no_ent
            INNER JOIN etudiant
            ON etudiant.no_etud = stage.no_etud
            WHERE no_stage = :no_stage');


        $query->bindValue(':no_stage', $no_stage);
        $query->execute();

        $data = $query->fetch(PDO::FETCH_ASSOC);
        $stage = $data != FALSE ? new Stage($data) : NULL;

        $query->closeCursor();
        $db = NULL;

        return $stage;
    }

    static function update(Stage $stage) {
        $db = connect::getInstance();

        $query = $db->prepare('UPDATE stage SET
            sujet = :sujet,
            mot_clef = :mot_clef,
            tuteur = :tuteur,
            no_ent = :no_ent,
            no_enc = :no_enc,
            date_validation = :date_validation
            WHERE no_stage = :no_stage');

        $query->bindValue(':no_ent', $stage->getEntreprise()->getNo_ent());
        $query->bindValue(':no_stage', $stage->getNo_stage());
        $query->bindValue(':sujet', $stage->getSujet());
        $query->bindValue(':mot_clef', $stage->getMot_clef());
        $query->bindValue(':tuteur', $stage->getTuteur());
        $query->bindValue(':no_enc', $stage->getEncadrant()->getNo_enc());
        $query->bindValue(':date_validation', $stage->getDate_validation());

        $query->execute();

        $query->closeCursor();
        $db = NULL;
    }

    static function getEtudiantsAvecStage($section, $annee_diplome) {
        $db = connect::getInstance();

        $query = $db->prepare('select * from stage
            LEFT JOIN entreprise
            ON stage.no_ent = entreprise.no_ent
            INNER JOIN etudiant
            ON stage.no_etud = etudiant.no_etud
            WHERE etudiant.no_section = :section 
            AND annee_diplome=:annee_diplome
            ORDER BY nom, prenom');


        $query->bindValue(':section', $section);
        $query->bindValue(':annee_diplome', $annee_diplome);

        $query->execute();

        $stages = NULL;

        foreach ($query->fetchAll(PDO::FETCH_ASSOC) as $key => $value)
            $stages[$key] = new Stage($value);

        $query->closeCursor();
        $db = NULL;

        return $stages;
    }

    static function getStagesAvecOuSansEncadrant($section, $annee_diplome, $no_enc) {

        $db = connect::getInstance();

        $query = $db->prepare(' SELECT *
            FROM etudiant et, stage s 
            WHERE et.no_etud=s.no_etud
            AND no_section = :no_section
            AND annee_diplome= :annee_diplome
            AND (no_enc = :no_enc or no_enc IS NULL)
            ORDER BY no_enc DESC, nom , prenom');


        $query->bindValue(':no_section', $section);
        $query->bindValue(':annee_diplome', $annee_diplome);
        $query->bindValue(':no_enc', $no_enc);

        $query->execute();

        $stages = NULL;
        foreach ($query->fetchAll(PDO::FETCH_ASSOC) as $key => $value)
            $stages[$key] = new Stage($value);

        $query->closeCursor();
        $db = NULL;

        return $stages;
    }

}

?>
