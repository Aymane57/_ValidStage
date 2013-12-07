function update(no_stage, no_enc) {

    var nbEtudiantLibre = document.getElementById("nbreSans").innerHTML;
    var nbEtudiantEncadrant = document.getElementById("nbreAvec").innerHTML;

    if ($("input[value=" + no_stage + "]").is(":checked") === false) {
        no_enc = "null";
        nbEtudiantLibre++;
        nbEtudiantEncadrant--;
    }

    else {
        nbEtudiantLibre--;
        nbEtudiantEncadrant++;
    }
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=stage/updateEncadrant',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {no_enc: no_enc, no_stage: no_stage, pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        timeout: 10000,
        success: function() {
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    });

    $('#nbreAvec').html('').html(nbEtudiantEncadrant);
    $('#nbreSans').html('').html(nbEtudiantLibre);

    total = '<div class=\"row\"><span id=\"encadrer\">Etudiant' + pluriel(nbEtudiantEncadrant) + ' encadré' + pluriel(nbEtudiantEncadrant) + ' : <b><span id=\"nbreAvec\" value=\"'
            + nbEtudiantEncadrant + '\">' + nbEtudiantEncadrant
            + '</span></b></span></div><div class=\"row\"><span id=\"libre\">Etudiant' + pluriel(nbEtudiantLibre) + ' libre' + pluriel(nbEtudiantLibre) + ' : <b><span id=\"nbreSans\" value=\"'
            + nbEtudiantLibre + '\">' + nbEtudiantLibre + '</span></b></span></div>';

    $('#etudiant').html('').html(total);

}