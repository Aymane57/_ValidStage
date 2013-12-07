function getInfoURLEnt($nom1, $nom2) {
    var URLParam = window.location.search.substring(1);
    var info = new Array();

    if (URLParam === '') {
        info[0] = 1;
        info[1] = '';
        return info;
    } else {
        var Params = URLParam.split('&');
        var Param1 = Params[0].split('=');
        if (Param1[0] === $nom1)
        {
            info[0] = Param1[1];
        } else
            info[0] = 1;

        if (Params.length === 1) {
            info[1] = '';
        } else {
            var Param2 = Params[1].split('=');
            if (Param2[0] === $nom2)
            {
                info[1] = Param2[1];
            } else
                info[1] = '';
        }
        return info;
    }
}

$(document).ready(function() {

    ParamValue = getInfoURLEnt('noEntreprise', 'recherche');
    var cbSuccess = false;

    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=entreprise/infos',
        type: 'GET',
        data: {no_ent: ParamValue[0],
            pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        dataType: 'jsonp',
        timeout: 10000,
        success: function(data) {
            $('#noment1').val(data.noment1);
            $('#noment2').val(data.noment2);
            $('#adr1').val(data.adr1);
            $('#adr2').val(data.adr2);
            $('#cpent').val(data.cpent);
            var ville = data.ville;

            if (data.b_cedex === '1') {
                ville = ville + ' cedex ';
            }
            ville = $.trim(ville + data.cedex);

            $('#ville').val(ville);
            $('#pays').val(data.pays);
            $('#tel').val(data.telent);
            if (data.nbStages !== '0') {
                $("#buttonSupprimer").hide();
                $("#msg_delete").html('').html('Impossible de supprimer cette entreprise !');
            }
            else {
                $("#buttonSupprimer").show();
                $("#msg_delete").html('').html('Attention cette action est irréversible !');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    });
});

$('#buttonValider').click(function() {

    ParamValue = getInfoURLEnt('noEntreprise', 'recherche');

    var no_ent = ParamValue[0];
    var recherche = ParamValue[1];

    var nom1Info = $('#noment1').val();
    var nom2Info = $('#noment2').val();
    var adr1Info = $('#adr1').val();
    var adr2Info = $('#adr2').val();
    var cpentInfo = $('#cpent').val();
    var villeInfo = $('#ville').val();
    var paysInfo = $('#pays').val();
    var telInfo = $('#tel').val();
    var cedexInfo = '', cedexbInfo = 0;

    valeurVille = villeInfo.split(' ');

    var compteur = 0;
    while ((compteur < valeurVille.length) && (cedexbInfo === 0))
    {
        if ((valeurVille[compteur] === 'cedex') || (valeurVille[compteur] === 'CEDEX') || (valeurVille[compteur] === 'Cedex')) {
            cedexbInfo = 1;
        } else
            compteur++;
    }

    if (cedexbInfo === 0) {
        cedexInfo = '';
    }
    else {
        villeInfo = valeurVille[0];

        for (var i = 1; i < compteur; i++)
            villeInfo = villeInfo + ' ' + valeurVille[i];
        if (valeurVille.length > compteur + 1)
            cedexInfo = valeurVille[compteur + 1];
    }


    var erreurVille = false;
    var erreurCP = false;
    var erreurNomEnt1 = false;

    if ($.trim(villeInfo) === '')
    {
        $("#controlVille").attr({
            'class': "form-group has-error"
        });
        $("#ville").focus();
        erreurVille = true;
    }
    else
    {
        $("#controlVille").attr({
            'class': "form-group"
        });
    }
    if ($.trim(cpentInfo) === '')
    {
        $("#controlCP").attr({
            'class': "form-group has-error"
        });
        $("#cpent").focus();
        erreurCP = true;
    }
    else
    {
        $("#controlCP").attr({
            'class': "form-group"
        });
    }
    if ($.trim(nom1Info) === '')
    {
        $("#controlNomEnt1").attr({
            'class': "form-group has-error"
        });
        $("#noment1").focus();
        erreurNomEnt1 = true;
    }
    else
    {
        $("#controlNomEnt1").attr({
            'class': "form-group"
        });
    }

    if (erreurNomEnt1 || erreurVille || erreurCP)
    {
        $('#alerte2').html("<div class='alert alert-danger text-center'>Veuillez renseigner les champs obligatoires !</div>");
    }
    else
    {
        $.ajax({
            url: window.localStorage.getItem("url_serv") + '/index.php?page=entreprise/update',
            dataType: "jsonp",
            jsonp: 'callback',
            data: {no_ent: no_ent, noment1: nom1Info, noment2: nom2Info, adr1: adr1Info,
                adr2: adr2Info, cpent: cpentInfo, ville: villeInfo, pays: paysInfo,
                tel: telInfo, cedex: cedexInfo, b_cedex: cedexbInfo,
                pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
            timeout: 10000,
            success: function(data) {
                if (data === 1) {
                    $('#alerte2').html('').html("<div class='alert alert-warning text-center' >Ce nom d'entreprise existe déjà !</div>");
                }
                else if (data === 2) {
                    var nom_entreprise = $.trim($('#noment1').val() + ' ' + $('#noment2').val());
                    if ($(document).attr("title") !== "Modification de stage" && $(document).attr("title") !== "Validation de stage")
                    {
                        $('#alerte2').html('');
                        $('#alerte').html('').html("<div class='alert alert-success text-center'>L'entreprise <b>" + nom_entreprise + "</b> a été ajoutée !</div>");
                        $('#alerte').fadeIn(1000);
                        setTimeout(function() {
                            window.location.href = "entreprise.html?act=1&recherche=" + recherche;
                        }, 2000);
                    }
                    else {
                        $('#entreprise').val(nom_entreprise);
                        $('#modal_ajoutEnt').modal('hide');
                    }
                    $('#alerte').html('').html("<div class='alert alert-success text-center'>L'entreprise <b>" + nom_entreprise + "</b> a été modifiée !</div>");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
            }
        });
    }
});

$('#retour').click(function() {
    $(location).attr("href", "javascript:history.back()");
});


$('#buttonSupprimer').click(function() {

    ParamValue = getInfoURLEnt('noEntreprise', 'recherche');
    var no_ent = ParamValue[0];
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=entreprise/delete',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {no_ent: no_ent,
            pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        timeout: 10000,
        success: function() {
            $(location).attr("href", "javascript:history.back()");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    })
});
