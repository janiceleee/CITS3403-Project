/*Get Home page*/
module.exports.home = function(req, res) {
    res.render('home', {title: 'Home'});
};

/*Meet Our Team page*/
module.exports.meetourteam = function(req, res) {
    res.render('meetourteam', {title: 'Meet Our Team'});
};

/*Description page*/
module.exports.description = function(req, res) {
    res.render('description', {title: 'Description'});
};



/*Reference page*/
module.exports.reference = function(req, res) {
    res.render('reference', {title: 'References'});
};
