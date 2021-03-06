var request = require('request');

function CallbackHandler() {
    "use strict";
    this.handleCallback = function(req, res) {
        "use strict";
        var code = req.query.code;

        var options = { uri: 'https://github.com/login/oauth/access_token', method: 'POST' };
        options.form = {
            client_id : process.env['CLIENT_ID'],
            client_secret : process.env['CLIENT_SECRET'],
            code : code
        };
        options.headers = {Accept : 'application/json'};
        request(options, function(error, result, body) {
            console.log(result.statusCode);
            var accessToken = JSON.parse(body)['access_token'];
            if (accessToken) {
                var opt = {uri: 'https://api.github.com/user', method: 'GET'};
                opt.headers = {
                    Accept : 'application/json',
                    Authorization: 'token ' + accessToken,
                    'User-Agent': 'furikuri'};
                request(opt, function(error, result, body) {
                    var userInfo = JSON.parse(body);
                    var repoUrl = userInfo['repos_url'];
                    var user = userInfo['login'];
                    console.log(body);
                    console.log(repoUrl);
                    console.log(user);
                    var opt2 = {uri: repoUrl, method: 'GET'};
                    opt2.headers = {
                        Accept : 'application/json',
                        Authorization: 'token ' + accessToken,
                        'User-Agent': 'furikuri'};
                    request(opt2, function(error, result, body) {
                        console.log(body);
                        res.render('repo', {
                            "title" : "Repos",
                            "repos" : JSON.parse(body)
                        });
                    });
                });
            } else {
                res.send("something went wrong");
            }
        });
    }
}
module.exports = CallbackHandler;