function infoEncadrant() {
    // Permet de récupérer les variables nom et le prenom de l'encadrant passées
    // en url.
    var url = document.location.href;
    function getUrlVars(url) {
        var vars = [], hash;
        var hashes = window.location.href.slice(
                window.location.href.indexOf('?') + 1).split('&');
        if (typeof url != "undefined" && url != null && url != "")
            hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            if (hash[1] != null && hash[1] != undefined) {
                var hash2 = hash[1].split('#');
                vars[hash[0]] = hash2[0];
            }
        }
        return vars;
    }

    var tab = getUrlVars(url);
    var no_enc = tab["no_enc"];
    var nom = tab["nomenc"];
    var prenom = tab["prenomenc"];
    if (tab["prenomenc"] != null)
        var initial = prenom[0] + '. ';
    else
        initial = 'Erreur';

    $('#nom').html('').html(nom);
    $('#prenom').html('').html(initial);

    return no_enc;
}