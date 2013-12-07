$(document).ready(function() {
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=section/infos',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {login_resp: window.localStorage.getItem("login_resp"), pass_resp: window.localStorage.getItem("pass_resp")},
        timeout: 10000,
        success: function(data) {

            if (data === null) {
                $('#alerte').html('').html("<div class='alert alert-info text-center'>Vous n'êtes responsable d'aucune section actuellement.</div>");
                $('#filiere').html('<option>Aucune donnée</option>');
                $('#annee').html('<option>Aucune donnée</option>');
                $('#validFiliere').attr("disabled", "disabled");
                return;
            }

            $.each(data, function(key, value) {
                var text = '<option value=' + value.no_section + '>' + value.libelle_section + '</option>';
                $('#filiere').append(text);
            });
            if (window.localStorage.getItem("Idsection" + window.localStorage.getItem("login_resp")) !== null)
                $('#filiere').val(window.localStorage.getItem("Idsection" + window.localStorage.getItem("login_resp")));
            getAnnee();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    });
});

$('#filiere').change(function() {
    getAnnee();
});

function getAnnee() {
    $('#annee').html('');
    var no_section = $('#filiere option:selected').attr('value');
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=section/infos',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {no_section: no_section, pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        timeout: 10000,
        success: function(data) {
            $.each(data, function(key, value) {
                var text = '<option value=' + value.annee_diplome + '>' + value.annee_diplome + '</option>';
                $('#annee').append(text);
            });
            if (window.localStorage.getItem("annee" + window.localStorage.getItem("login_resp")) !== null
                    && $('#filiere option:selected').val() === window.localStorage.getItem("Idsection" + window.localStorage.getItem("login_resp")))
            {
                $('#annee').val(window.localStorage.getItem("annee" + window.localStorage.getItem("login_resp")));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    });
}
;