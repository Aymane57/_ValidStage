$(document).ready(function() {
    $('#listeEncadrants').html('<center><h4>Chargement...</h4></center>');
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=encadrant/liste',
        dataType: "jsonp",
        jsonp: 'callback',
        timeout: 10000,
        data: {pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        success: function(data) {

            $('#listeEncadrants').html('');
            $('#section').html(window.localStorage.getItem('section' + window.localStorage.getItem("login_resp")) + ' - ' + window.localStorage.getItem('annee' + window.localStorage.getItem("login_resp")));

            if (data === null) {
                $('#alerte').html('').html("<div class='alert alert-info text-center'>Aucun encadrant disponible</div>");
                $('#panelEncadrant').hide();
                return;
            }

            var text = '';
            $.each(data, function(key, value) {
                text += '<a href=\"affectationP2.html?no_enc=' + value.no_enc
                        + '&nomenc=' + value.nomenc
                        + '&prenomenc=' + value.prenomenc
                        + '\" class=\"list-group-item \"><h4 class=\"list-group-item-heading\">'
                        + value.nomenc + ' ' + value.prenomenc + '</h4></a>';
            });
            $('#listeEncadrants').html(text);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    });
});