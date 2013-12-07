if (window.localStorage.getItem("url_serv") === null) {
    if ($(document).attr("title") !== "Lien du serveur")
        window.location.replace('urlserveur.html');
}
else if (window.localStorage.getItem("login_resp") === null) {
    if ($(document).attr("title") !== "Connexion") {
        window.location.replace('connexion.html');
    }
} else if ($(document).attr("title") !== "Choix de la filière par défaut") {
    if (window.localStorage.getItem("annee" + window.localStorage.getItem("login_resp")) === null || window.localStorage.getItem("section" + window.localStorage.getItem("login_resp")) === null) {
        window.location.replace('choix-filiere.html');
    }
}

$('#deconnexion').click(function() {
    window.localStorage.removeItem("login_resp");
    window.location.replace('connexion.html');
});

$("#validurlserv").click(function() {
    if ($("#urlserv").val() !== "http://") {
        window.localStorage.setItem("url_serv", $("#urlserv").val());
    }
    window.location.replace('index.html');
})

$('#validFiliere').click(function() {
    window.localStorage.setItem("section" + window.localStorage.getItem("login_resp"), $('#filiere option:selected').text());
    window.localStorage.setItem("Idsection" + window.localStorage.getItem("login_resp"), $('#filiere option:selected').val());
    window.localStorage.setItem("annee" + window.localStorage.getItem("login_resp"), $('#annee').val());
    window.location.replace('index.html');
});

$('#btn-reset').click(function() {
    window.localStorage.clear();
    window.location.replace('urlserveur.html');
});

$("#validparam").click(function() {
    window.localStorage.setItem("section" + window.localStorage.getItem("login_resp"), $('#filiere option:selected').text());
    window.localStorage.setItem("Idsection" + window.localStorage.getItem("login_resp"), $('#filiere option:selected').val());
    window.localStorage.setItem("annee" + window.localStorage.getItem("login_resp"), $('#annee').val());
});

$("#validurlservdefaut").click(function() {
    window.localStorage.setItem("url_serv", "http://aymane.net/stable5");
});