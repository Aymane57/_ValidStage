function getInfoURLEnt($nom1, $nom2) {
    var URLParam = window.location.search.substring(1);
    var info = new Array();

    if (URLParam === '') {
        info[0] = '1';
        info[1] = '';
        return info;
    } else {
        var Params = URLParam.split('&');
        var Param1 = Params[0].split('=');
        if (Param1[0] === $nom1)
        {
            info[0] = Param1[1];
        } else
            info[0] = '1';

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

    var $nom1 = 'act';
    var $nom2 = 'recherche';
    ParamValue = getInfoURLEnt($nom1, $nom2);
    var no_act = ParamValue[0];
    var recherche = ParamValue[1];
    var debut = (parseInt(no_act) - 1) * 10;
    $('#listEntreprises').html('<center><h4>Chargement...</center></h4>');
    $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=entreprise/listeSearch',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {debut: debut, recherche: recherche, nbEntreprises: 10,
            pass_resp: window.localStorage.getItem("pass_resp"), login_resp: window.localStorage.getItem("login_resp")},
        timeout: 10000,
        success: function(data) {
            $('#listEntreprises').html('');
            if (data[data.length - 1] !== '0') {
                if ((parseInt(data[data.length - 1]) % 10) === 0)
                    total = (parseInt(data[data.length - 1] / 10));
                else
                    total = (parseInt(data[data.length - 1] / 10) + 1);
                var txt = '';
                if (total === 1)
                    txt = '<ul class="pagination"><li><a href="entreprise.html?act=1&recherche=' + recherche + '">[1]</a></li></ul>';
                else
                {
                    if (no_act === '1')
                        txt = '<ul class="pagination"><li><a href="entreprise.html?act=1&recherche=' + recherche + '">[1]</a></li>';
                    else
                        txt = '<ul class="pagination"><li><a href="entreprise.html?act=1&recherche=' + recherche + '">1</a></li>';
                    if (no_act > 4)
                        txt += '<li><a>...</a></li>';

                    for (i = -2; i < 3; i++) {
                        n = (parseInt(no_act) + parseInt(i));
                        if ((n > 1) && (n < total)) {
                            if (i === 0)
                                txt = txt + '<li><a href="entreprise.html?act=' + n + '&recherche=' + recherche + '">[' + n + ']</a></li>';
                            else
                                txt = txt + '<li><a href="entreprise.html?act=' + n + '&recherche=' + recherche + '">' + n + '</a></li>';
                        }
                    }

                    if (no_act < (parseInt(total) - 3))
                        txt += '<li><a>...</a></li>';
                    if (parseInt(no_act) === total)
                        txt += '<li><a href="entreprise.html?act=' + total + '&recherche=' + recherche + '">[' + total + ']</a></li></ul>';
                    else
                        txt += '<li><a href="entreprise.html?act=' + total + '&recherche=' + recherche + '">' + total + '</a></li></ul>';
                }
                $('#lien').html('').html(txt);
                text = '';
                data.pop();
                $.each(data, function(key, value) {
                    text += '<a href=\"modificationEntreprise.html?noEntreprise=' + value.no_ent + '&recherche=' + recherche + '\" class=\"list-group-item \"><h4 class=\"list-group-item-heading\">' + value.noment1 + ' ' + value.noment2 + ' (' + value.ville + ')</h4>';
                });
                $('#listEntreprises').html('').html(text);
            }
            else
                $('#alerte').html('').html("<div class='alert alert-warning' >La recherche n\'a donné aucun résultat !</div>");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    });
});

$('#buttonRechercher').click(function() {
    var valRecherche = $('#recherche').val();
    $(location).attr("href", "entreprise.html?act=1&recherche=" + valRecherche);
});
