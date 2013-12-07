$(document).ready(function() {
    var annee = window.localStorage.getItem("annee" + window.localStorage.getItem("login_resp"));
    var section = window.localStorage.getItem("Idsection" + window.localStorage.getItem("login_resp"));
    $('#section').html(window.localStorage.getItem('section' + window.localStorage.getItem("login_resp")) + ' - ' + window.localStorage.getItem('annee' + window.localStorage.getItem("login_resp")));
    $('#stat_avec').html('Chargement...');
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=stage/liste',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {annee: annee, no_section: section,
            pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        timeout: 10000,
        success: function(data) {
            var nbData = 0;
            var listeAvecStage = '';
            if (data !== null) {
                nbData = data.length;
                $.each(data, function(key, value) {
                    if (value.entreprise.noment1 === null) {
                        noment = 'Entreprise non disponible';
                    }
                    else
                        noment = value.entreprise.noment1 + ' ' + value.entreprise.noment2;
                    listeAvecStage += '<a href=\"modification.html?noStage=' + value.no_stage + '\" class=\"list-group-item \"><h4 class=\"list-group-item-heading\">' + value.etudiant.nom + ' ' + value.etudiant.prenom + '</h4><p class=\"list-group-item-text\">' + noment + '</p></a>';
                });
            }
            $('#listeAvecStage').html(listeAvecStage);
            $('#stat_avec').html('Etudiant' + pluriel(nbData) + ' avec stage : <b>' + nbData + '</b>');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte2').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<b><br />" + textStatus + "</b></div>");
            $('#stat_avec').html('Erreur');
        }
    });
});