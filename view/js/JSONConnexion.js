$('#valider-connexion').click(function() {

    var login_resp = $('#login').val();
    var pass_resp = CryptoJS.SHA1($('#pwd').val()).toString();

    var req = $.ajax({
        url: window.localStorage.getItem("url_serv") + '/index.php?page=responsable/canConnect',
        dataType: "jsonp",
        jsonp: 'callback',
        data: {login_resp: login_resp, pass_resp: pass_resp, connexion: true},
        timeout: 10000, // Permet de "déclencher" les erreurs (sinon impossible, c'est un problème connu avec JSONP)
        success: function(data) {
            if (data === true) {
                window.localStorage.setItem("login_resp", login_resp);
                window.localStorage.setItem("pass_resp", pass_resp);
                window.location.replace('index.html');
            } else {
                $('#alerte').html('').html("<div class='alert alert-danger text-center'>Identifiant ou mot de passe incorrect(s) !</div>");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#alerte').html('').html("<div class='alert alert-danger text-center'>Erreur de connexion au serveur :<br /><b>" + textStatus + "</b></div>");
        }
    });
});