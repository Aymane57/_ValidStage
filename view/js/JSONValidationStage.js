function getInfoURL(param) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === param)
        {
            return sParameterName[1];
        }
    }
    return false;
}

$(document).ready(function() {
    var nom_etud = getInfoURL('nom_etud');
    var prenom_etud = getInfoURL('prenom_etud');
    if (nom_etud !== false || prenom_etud !== false) {
        var nom = nom_etud + ' ' + prenom_etud;
        $('#nom').html('').html(nom);
    }
    else
        $('#nom').html('').html("Impossible de récupérer le nom de l'étudiant");
});

$('#btn_valider_stage').click(function() {

    var entreprise = $.trim($('#entreprise').val());
    var sujetInfo = $.trim($('#sujet').val());
    var tuteurInfo = $.trim($('#tuteur').val());
    var motcleInfo = $.trim($('#motcle').val());
    var no_etud = getInfoURL('no_etud');
    var erreurSujet = false;
    var erreurEntreprise = false;

    if ($.trim($('#entreprise').val()) === '')
    {
        $("#controlEntreprise").attr({
            "class": "form-group has-error"
        });
        $("#entreprise").focus();
        erreurEntreprise = true;
    }
    else
    {
        $("#controlEntreprise").attr({
            "class": "form-group"
        });
    }
    if ($.trim($('#sujet').val()) === '')
    {
        $("#controlSujet").attr({
            "class": "form-group has-error"
        });
        $("#sujet").focus();
        erreurSujet = true;
    }
    else
    {
        $("#controlSujet").attr({
            "class": "form-group"
        });
    }

    if (erreurSujet && erreurEntreprise)
    {
        $('#alerte').html("<div class='alert alert-danger'>Veuillez renseigner le sujet et l'entreprise !</div>");
    }
    else if (erreurSujet)
    {
        $('#alerte').html("<div class='alert alert-danger'>Veuillez renseigner le sujet !</div>");
    }
    else if (erreurEntreprise)
    {
        $('#alerte').html("<div class='alert alert-danger'>Veuillez renseigner l'entreprise !</div>");
    }
    else
    {
        $('#alerte').html('');
        $('#alerte2').html('');
        $.ajax({
            url: window.localStorage.getItem("url_serv") + '/index.php?page=stage/add',
            dataType: "jsonp",
            jsonp: 'callback',
            data: {no_etud: no_etud, noment: entreprise, motcle: motcleInfo, tuteur: tuteurInfo, sujet: sujetInfo,
                pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
            timeout: 10000,
            success: function(data) {
                if (data === 2)
                    $(location).attr("href", "index.html");
                else if (data == 1) {
                    $('#noment1').val($('#entreprise').val());
                    $('#noment2').val('');
                    $('#adr1').val('');
                    $('#adr2').val('');
                    $('#cpent').val('');
                    $('#ville').val('');
                    $('#pays').val('France');
                    $('#tel').val('');
                    $('#noment2').focus();
                    $("#controlNomEnt1").attr({
                        "class": "form-group",
                    });
                    $("#controlCP").attr({
                        "class": "form-group",
                    });
                    $("#controlVille").attr({
                        "class": "form-group",
                    });
                    $('#modal_ajoutEnt').modal('toggle');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
            }
        });
    }
});