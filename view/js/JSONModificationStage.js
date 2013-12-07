var nom = 'noStage';
function getInfoURL(nom)
{
    var sPageURL = window.location.search.substring(1);
    var sParameterName = sPageURL.split('=');

    if (sParameterName[0] === nom)
    {
        return sParameterName[1];
    }
    return false;
}

$(document).ready(function() {
    var no_stage = getInfoURL(nom);
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=stage/infos',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {no_stage: no_stage, pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        timeout: 10000,
        success: function(data) {
            var date = new Date(data.date_validation);
            var nom = data.etudiant.nom + ' ' + data.etudiant.prenom;
            $('#nom').html('').html(nom + '<br />Stage validé le ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
            $('#sujet').val(data.sujet);
            $('#motcle').val(data.mot_clef);
            $('#tuteur').val(data.tuteur);
            if (data.entreprise.noment1 === null) {
                entreprise = 'Entreprise inexistante!';
            }
            else
            {
                entreprise = data.entreprise.noment1;
                if (data.entreprise.noment2 !== '')
                    entreprise = entreprise + ' ' + data.entreprise.noment2;
            }
            $('#entreprise').val(entreprise);
            entreprise_old = entreprise;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#nom').html('').html("Impossible de récupérer le nom de l'étudiant");
            $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    });
});

$('#btn_modifier_stage').click(function() {

    var entreprise = $('#entreprise').val();
    var sujetInfo = $('#sujet').val();
    var tuteurInfo = $('#tuteur').val();
    var motcleInfo = $('#motcle').val();
    var no_stage = getInfoURL(nom);
    var erreurSujet = false;
    var erreurEntreprise = false;

    entreprise_change = 'true';
    if (entreprise.toLowerCase() === entreprise_old.toLowerCase())
        entreprise_change = 'false';

    if ($.trim(entreprise) === '')
    {
        $("#controlEntreprise").attr({
            "class": "form-group has-error",
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
    if ($.trim(sujetInfo) === '')
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
            url: window.localStorage.getItem("url_serv") + '/index.php?page=stage/update',
            dataType: "jsonp",
            jsonp: 'callback',
            data: {entreprise: entreprise, no_stage: no_stage, motcle: motcleInfo, tuteur: tuteurInfo, sujet: sujetInfo, entreprise_change: entreprise_change,
                pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
            timeout: 10000,
            success: function(data) {
                if (data === 2)
                    $(location).attr("href", "index.html");
                else if (data === 1) {
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