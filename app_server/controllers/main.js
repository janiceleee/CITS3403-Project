/*Get Home page*/
module.exports.home = function(req, res) {
    res.render('home', {title: 'Home'});
};

/*Reference page*/
module.exports.reference = function(req, res) {
    res.render('reference', {title: 'References'});
};
