<?php

class daoResponsable {

    static function read($login_resp) {
        $db = connect::getInstance();
        $query = $db->prepare("SELECT * FROM responsable WHERE login_resp = :login_resp");
        $query->bindValue(":login_resp", $login_resp);
        $query->execute();
       
        $data = $query->fetch(PDO::FETCH_ASSOC);
        $responsable = $data != FALSE ? new Responsable($data) : NULL;
        $query->closeCursor();
        $db = NULL;

        return $responsable;
    }

}

?>
