
exports.index = function(req, res){
    res.render('index', {
      title: 'welcome',
      link: 'https://github.com/login/oauth/authorize?client_id=' + process.env.CLIENT_ID
  });
};