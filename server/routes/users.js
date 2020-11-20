const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')

const RSA_KEY_PUBLIC = fs.readFileSync('./rsa/key.pub');

function isLoggedIn(req, res, next) {
    const token = req.headers.authorization;
    console.log(token);
    if (token) {
        jwt.verify(token, RSA_KEY_PUBLIC, (err, decoded) => {
            if (err) {
              return res.status(401).json('Token invalid');
            } else {
                const sub = decoded.sub;
                User.findOne({
                    '_id': sub,
                }).exec((err, user) => {
                    if (user){
                        req.user = user;
                        next();
                    } else {
                        return res.status(404).json("user not found");
                    }
                });
            }
        })
    } else {
        return res.status(401).json('No token');
    }
}

router.get('/current', isLoggedIn, (req, res) => {
    res.status("200").json(req.user);
});


module.exports = router;