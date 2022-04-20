const Userdb = require('../model/model');



//create and save new user
exports.create =(function(req,res) {
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    //new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    //save user in the database
    user
        .save(user)
        .then(function(data) {
            res.redirect('/add-user');
        })
        .catch(function(err){
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

})

//retrieve and return all users/ retrive and return a single user
exports.find = (function (req, res) {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(function (data) {
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(function(err) {
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(function(user) {
                res.send(user)
            })
            .catch(function(err) {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
});

//update a new user by user id
exports.update =(function(req, res) {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, {$set: req.body})
        .then(function(data) {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(function(err) {
            res.status(500).send({ message : "Error Update user information"})
        })
})

//delete a user with user id in the request
exports.delete =(function(req, res) {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(function(data) {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(function(err) {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
})