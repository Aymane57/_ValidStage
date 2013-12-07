$(function() {
    $('#entreprise').autocomplete({
        source: function(request, response) {
            $('#entreprise').css("background", "url(images/ajax-loader.gif) no-repeat right center");
            $.ajax({
                url: window.localStorage.getItem("url_serv") + '/index.php?page=entreprise/liste',
                dataType: "jsonp",
                jsonp: 'callback',
                timeout: 10000,
                data: {
                    term: request.term,
                    pass_resp: window.localStorage.getItem("pass_resp"),
                    login_resp: window.localStorage.getItem("login_resp")
                },
                success: function(data) {
                    if (data !== null) {
                        response($.map(data, function(item) {
                            return {
                                label: $.trim(item.noment1 + ' ' + item.noment2)
                            };
                        }));
                    }
                    else
                        response();
                    $('#entreprise').css("background", "none");
                },
                error: function() {
                    $('#entreprise').css("background", "none");
                }
            });
        },
        minLength: 2
    });
});
