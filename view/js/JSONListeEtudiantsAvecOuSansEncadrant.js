$(document).ready(function() {

    var no_enc = infoEncadrant();

    var annee = window.localStorage.getItem("annee" + window.localStorage.getItem("login_resp"));
    var section = window.localStorage.getItem("Idsection" + window.localStorage.getItem("login_resp"));
    $('#listeEtudiantsAvecOuSansEncadrant').html('<center><h4>Chargement...</h4></center>');
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=stage/getStagesEncadrants',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {annee: annee, no_section: section, no_enc: no_enc,
            pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        timeout: 10000,
        success: function(data) {
            $('#listeEtudiantsAvecOuSansEncadrant').html('');
            var classCheck = '';
            var text = '';
            var nbEtudiantLibre = 0;
            var nbEtudiantEncadrant = 0;

            if (data === null) {
                $('#terminerAffect').hide();
                $('#alerte').html('').html("<div class='alert alert-info text-center'>Aucun stage à affecter</div>");
                return;
            }

            $.each(data, function(key, value) {
                classCheck = 'cb' + value.etudiant.no_etud;
                text = '<li class=\"list-group-item\"><span class=\"lienDroite\"><input class="checkbox" type=\"checkbox\" id="'
                        + classCheck + '" value=\"' + value.no_stage + '\"checked onchange=\"update(' + value.no_stage + ','
                        + no_enc + ')\"></span><h4 class=\"list-group-item-heading\">' + value.etudiant.nom + ' ' + value.etudiant.prenom
                        + '</h4></li>';

                $('#listeEtudiantsAvecOuSansEncadrant').append(text);

                if (value.encadrant.no_enc === null) {
                    $('#' + classCheck).prop('checked', false);
                    nbEtudiantLibre++;
                }
                else
                    nbEtudiantEncadrant++;

                total = '<div class=\"row\"><span id=\"encadrer\">Etudiant' + pluriel(nbEtudiantEncadrant) + ' encadré' + pluriel(nbEtudiantEncadrant) + ' : <b><span id=\"nbreAvec\" value=\"'
                        + nbEtudiantEncadrant + '\">' + nbEtudiantEncadrant
                        + '</span></b></span></div><div class=\"row\"><span id=\"libre\">Etudiant' + pluriel(nbEtudiantLibre) + ' libre' + pluriel(nbEtudiantLibre) + ' : <b><span id=\"nbreSans\" value=\"'
                        + nbEtudiantLibre + '\">' + nbEtudiantLibre + '</span></b></span></div>';

                $('#etudiant').html('').html(total);
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#etudiant').html('').html('Erreur');
            $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    });
});
