$('#buttonValider').click(function() {

    var nom1Info = $('#noment1').val();
    var nom2Info = $('#noment2').val();
    var adr1Info = $('#adr1').val();
    var adr2Info = $('#adr2').val();
    var cpentInfo = $('#cpent').val();
    var villeInfo = $('#ville').val();
    var paysInfo = $('#pays').val();
    var telInfo = $('#tel').val();
    var cedexInfo = '', cedexbInfo = 0;
    var erreurNomEnt1 = false;
    var erreurCP = false;
    var erreurVille = false;

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
        villeInfo = '';
        for (var i = 0; i < compteur; i++)
            villeInfo = villeInfo + ' ' + valeurVille[i];
        if (valeurVille.length > compteur + 1)
            cedexInfo = valeurVille[compteur + 1];
    }

    if ($.trim(villeInfo) === '')
    {
        $("#controlVille").attr({
            class: "form-group has-error"
        });
        $("#ville").focus();
        erreurVille = true;
    }
    else
    {
        $("#controlVille").attr({
            "class": "form-group"
        });
    }
    if ($.trim(cpentInfo) === '')
    {
        $("#controlCP").attr({
            "class": "form-group has-error"
        });
        $("#cpent").focus();
        erreurCP = true;
    }
    else
    {
        $("#controlCP").attr({
            "class": "form-group"
        });
    }
    if ($.trim(nom1Info) === '')
    {
        $("#controlNomEnt1").attr({
            "class": "form-group has-error"
        });
        $("#noment1").focus();
        erreurNomEnt1 = true;
    }
    else
    {
        $("#controlNomEnt1").attr({
            "class": "form-group"
        });
    }

    if (erreurNomEnt1 || erreurVille || erreurCP)
    {
        $('#alerte2').html("<div class='alert alert-danger'>Veuillez renseigner les champs obligatoires !</div>");
    }
    else
    {
        $('#alerte2').html('');
        $.ajax({
            url: window.localStorage.getItem("url_serv") + '/index.php?page=entreprise/add',
            dataType: "jsonp",
            jsonp: 'callback',
            data: {noment1: nom1Info, noment2: nom2Info, adr1: adr1Info,
                adr2: adr2Info, cpent: cpentInfo, ville: villeInfo, pays: paysInfo,
                tel: telInfo, cedex: cedexInfo, b_cedex: cedexbInfo,
                pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
            timeout: 10000,
            success: function(data) {
                if (data === 1) {
                    $('#alerte2').html('').html("<div class='alert alert-warning text-center' >Ce nom d'entreprise existe déjà !</div>");
                }
                else if (data === 2) {
                    var nom_entreprise = $('#noment1').val() + ' ' + $('#noment2').val();
                    if ($(document).attr("title") !== "Modification de stage" && $(document).attr("title") !== "Validation de stage")
                    {
                        $('#alerte2').html('');
                        $('#alerte').html('').html("<div class='alert alert-success text-center'>L'entreprise <b>" + nom_entreprise + "</b> a été ajoutée !</div>");
                        $('#alerte').fadeIn(1000);
                        setTimeout(function() {
                            window.location.href = "entreprise.html";
                        }, 3000);
                    }
                    else {
                        $('#entreprise').val(nom_entreprise);
                        $('#modal_ajoutEnt').modal('hide');
                    }
                    $('#alerte').html('').html("<div class='alert alert-success text-center'>L'entreprise <b>" + nom_entreprise + "</b> a été ajoutée !</div>");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                $('#alerte').html('');
                $('#alerte2').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
            }
        });
    }
});