<?php

class DaoEntreprise {

    static function getListeEntreprisesByName($saisie) {

        $db = connect::getInstance();
        $query = $db->prepare("SELECT *
            FROM entreprise
            WHERE CONCAT(noment1,' ',noment2) LIKE :saisie");

        $query->bindValue(":saisie", $saisie);

        $query->execute();

        $entreprises = NULL;
        foreach ($query->fetchAll(PDO::FETCH_ASSOC) as $key => $value)
            $entreprises[$key] = new Entreprise($value);

        $query->closeCursor();
        $db = NULL;

        return $entreprises;
    }

    static function getNoEntrepriseByName($noment) {

        $db = connect::getInstance();

        $query = $db->prepare("SELECT no_ent
            FROM entreprise
            WHERE CONCAT(noment1,' ',noment2) = :noment");

        $query->bindValue(":noment", $noment);
        $query->execute();

        $entreprise = $query->fetch(PDO::FETCH_OBJ);
        $no_ent = $entreprise == FALSE ? NULL : $entreprise->no_ent;

        $query->closeCursor();
        $db = NULL;

        return $no_ent;
    }

    static function getEntrepriseByNo($no_ent) {

        $db = connect::getInstance();
        $query = $db->prepare('SELECT *
            FROM entreprise
            WHERE no_ent = :no_ent');

        $query->bindValue(':no_ent', $no_ent);
        $query->execute();

        $data = $query->fetch(PDO::FETCH_ASSOC);
        $entreprise = $data != FALSE ? new Entreprise($data) : NULL;

        $query->closeCursor();
        $db = NULL;

        return $entreprise;
    }

    static function ajoutEntreprise(Entreprise $entreprise) {

        $db = connect::getInstance();

        $query = $db->prepare('INSERT INTO entreprise SET
            noment1 = :noment1,
            noment2 = :noment2,
            adr1 = :adr1,
            adr2 = :adr2,
            cpent = :cpent,
            telent = :telent,
            ville = :ville,
            b_cedex = :b_cedex,
            cedex = :cedex,
            pays = :pays');

        $query->bindValue(':noment1', $entreprise->getNoment1());
        $query->bindValue(':noment2', $entreprise->getNoment2());
        $query->bindValue(':adr1', $entreprise->getAdr1());
        $query->bindValue(':adr2', $entreprise->getAdr2());
        $query->bindValue(':cpent', $entreprise->getCpent());
        $query->bindValue(':telent', $entreprise->getTelent());
        $query->bindValue(':ville', $entreprise->getVille());
        $query->bindValue(':b_cedex', $entreprise->getB_cedex());
        $query->bindValue(':cedex', $entreprise->getCedex());
        $query->bindValue(':pays', $entreprise->getPays());

        $query->execute();
        $query->closeCursor();
        $db = NULL;
    }

    static function modificationEntreprise(Entreprise $entreprise) {

        $db = connect::getInstance();

        $query = $db->prepare('UPDATE entreprise SET
            noment1 = :noment1,
            noment2 = :noment2,
            adr1 = :adr1,
            adr2 = :adr2,
            cpent = :cpent,
            telent = :telent,
            ville = :ville,
            b_cedex = :b_cedex,
            cedex = :cedex,
            pays = :pays
            WHERE no_ent = :no_ent');


        $query->bindValue(':noment1', $entreprise->getNoment1());
        $query->bindValue(':noment2', $entreprise->getNoment2());
        $query->bindValue(':adr1', $entreprise->getAdr1());
        $query->bindValue(':adr2', $entreprise->getAdr2());
        $query->bindValue(':cpent', $entreprise->getCpent());
        $query->bindValue(':telent', $entreprise->getTelent());
        $query->bindValue(':ville', $entreprise->getVille());
        $query->bindValue(':b_cedex', $entreprise->getB_cedex());
        $query->bindValue(':cedex', $entreprise->getCedex());
        $query->bindValue(':pays', $entreprise->getPays());
        $query->bindValue(':no_ent', $entreprise->getNo_ent());

        $query->execute();
        $query->closeCursor();
        $db = NULL;
    }

    static function getPartOfListEntreprises($debut, $nbEntreprises, $recherche) {
        $db = connect::getInstance();

        $query = $db->prepare('SELECT SQL_CALC_FOUND_ROWS *
            FROM entreprise
            WHERE (CONCAT(noment1," ",noment2) LIKE :recherche
            OR  ville LIKE :recherche)
            ORDER BY noment1
            LIMIT :debut, :nbEnteprises');

        $queryCount = $db->prepare('SELECT FOUND_ROWS()');

        $query->bindValue(':recherche', $recherche);
        $query->bindValue(':debut', (int) $debut, PDO::PARAM_INT);
        $query->bindValue(':nbEnteprises', (int) $nbEntreprises, PDO::PARAM_INT);

        $query->execute();
        $queryCount->execute();

        $entreprises = NULL;
        foreach ($query->fetchAll(PDO::FETCH_ASSOC) as $key => $value)
            $entreprises[$key] = new Entreprise($value);

        $entreprises[] = $queryCount->fetchColumn();
        $query->closeCursor();
        $db = NULL;

        return $entreprises;
    }

    static function deleteEntreprise($no_ent) {

        $db = connect::getInstance();

        $query = $db->prepare('DELETE FROM entreprise
            WHERE no_ent=:no_ent');

        $query->bindValue(':no_ent', $no_ent);
        $query->execute();

        $query->closeCursor();
        $db = NULL;
    }

    static function NbStagesDeEntreprise($no_ent) {
        $db = connect::getInstance();

        $query = $db->prepare('SELECT COUNT(no_stage) FROM stage WHERE no_ent = :no_ent');
        $query->bindValue(':no_ent', $no_ent);
        $query->execute();

        $nb_stage = $query->fetchColumn();
        $query->closeCursor();
        $db = NULL;
        return $nb_stage;
    }

}

?>
