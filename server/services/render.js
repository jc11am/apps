const axios = require('axios');


exports.homeRoutes =(function(req, res) {
    //make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(function(err) {
            res.send(err);
        })

    
})

exports.add_user =(function(req, res) {
    res.render('add_user');
})

exports.update_user =(function(req, res) {
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(function(err) {
            res.send(err);
        })
})