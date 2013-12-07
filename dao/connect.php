<?php

class connect {

    static function getInstance() {
        $db = new PDO('mysql:host = ' . DB_HOST . ':' . DB_PORT . '; dbname=' . DB_NAME, DB_USER, DB_PASS);

        $db->exec("SET CHARACTER SET utf8");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $db;
    }

}

?>
