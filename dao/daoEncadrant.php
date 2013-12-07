<?php

class daoEncadrant {

    static function getEncadrant() {

        $db = connect::getInstance();
        $query = $db->prepare('SELECT no_enc , nomenc , prenomenc
            FROM encadrant
            WHERE encadrement = 1
            AND inactif = 0
            ORDER BY nomenc');

        $query->execute();
        
        $encadrants = NULL;
        foreach ($query->fetchAll(PDO::FETCH_ASSOC) as $key => $value)
            $encadrants[$key] = new Encadrant($value);

        $query->closeCursor();
        $db = NULL;
        
        return $encadrants;
    }

}

?>
