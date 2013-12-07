$(document).ready(function() {
    var annee = window.localStorage.getItem("annee" + window.localStorage.getItem("login_resp"));
    var section = window.localStorage.getItem("Idsection" + window.localStorage.getItem("login_resp"));
    $('#stat_sans').html('Chargement...');
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=etudiant/liste',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {annee: annee, no_section: section,
            pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        timeout: 10000,
        success: function(data) {
            cbSuccess = true;
            var nbData = 0;
            var listeSansStage = '';
            if (data != null) {
                nbData = data.length;
                $.each(data, function(key, value) {
                    listeSansStage += '<a href=\"validation.html?no_etud=' + value.no_etud + '&nom_etud=' + value.nom + '&prenom_etud=' + value.prenom + '\" class=\"list-group-item \"><h4 class=\"list-group-item-heading\">' + value.nom + ' ' + value.prenom + '</h4></a>';
                });
            }
            $('#listeSansStage').html('').html(listeSansStage);
            $('#stat_sans').html('').html('Etudiant' + pluriel(nbData) + ' sans stage : <b>' + nbData + '</b>');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<b><br />" + textStatus + "</b></div>");
            $('#stat_sans').html('').html('Erreur');
        }
    });
});