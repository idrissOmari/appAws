const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs')

const RSA_KEY_PRIVATE = fs.readFileSync('./rsa/key');
const RSA_KEY_PUBLIC = fs.readFileSync('./rsa/key.pub');

router.post('/signin', (req, res) => {
    User.findOne({
        'email': req.body.email,
    }).exec((err, user) => {
        if (user){
            if (bcrypt.compareSync(req.body.password, user.password)){
                const token = jwt.sign({email: user.email}, {key: RSA_KEY_PRIVATE}, {
                    algorithm: 'RS256',
                    expiresIn: '15s',
                    subject: user._id.toString(),
                });
                res.status(200).json(token);
            } else {
                res.status(401).json("wrong password");
            }
        } else {
            res.status(401).json("user not found");
        }
    });
});

router.get('/refresh-token', (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, RSA_KEY_PUBLIC, (err, decoded) => {
            if (err) {return res.status(403).json('wrong token')}
            const newToken = jwt.sign({email: decoded.email}, {key: RSA_KEY_PRIVATE}, {
                algorithm: 'RS256',
                expiresIn: '15s',
                subject: decoded.sub,
            });
            res.status(200).json(newToken);
        })
    }
})

router.post('/signup', (req, res) => {
    console.log(req.body);
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))
    });

    newUser.save( (err) => {
        if (err) {
            res.status(500).json('erreur signup !');
        }
        res.status(200).json('sign up ok !')
    });
});

module.exports = router;
