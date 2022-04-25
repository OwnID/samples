const express = require('express');
const userPool = require('../users_pool/user_pool');
const router = express.Router();

router.post('/register', function (req, res, next) {
    if(!req.body.loginId || !req.body.password) {
        res.json({created: false,error:'Please fill all fields'});
        return;
    }
    const user = userPool.getUser(req.body.loginId);
    if(user) {
        res.json({created: false,error:'User already exist'});
        return;
    }
    userPool.addNewUser({
        email: req.body.loginId,
        name: req.body.name,
        password: req.body.password,
        ownIdData: req.body.ownIdData
    });
    res.json({created: true});
});

router.post('/login', function (req, res, next) {
    if(!req.body.loginId || !req.body.password) {
        res.json({logged: false,error:'Please fill all fields'});
        return;
    }
    const user = userPool.getUser(req.body.loginId);
    const logged  = user && user.password === req.body.password;
    res.json({logged: logged,error:logged?null:'Wrong credentials'});
});

router.post('/setOwnIDDataByLoginId', async (req, res) => {
    const user = userPool.getUser(req.body.loginId);
    if (!user) {
        return res.json({errorCode: 404})
    }
    user.ownIdData = req.body.ownIdData;
    return res.sendStatus(204);
});

router.post('/getOwnIDDataByLoginId', async (req, res) => {
    const user = userPool.getUser(req.body.loginId);
    if (!user) {
        return res.json({errorCode: 404})
    }
    res.json({ ownIdData: user.ownIdData })
});

router.post('/getSessionByLoginId', async (req, res) => {
    const sign = require('jwt-encode');
    const user = userPool.getUser(req.body.loginId);
    if (!user) {
        return res.json({errorCode: 404})
    }
    const jwt = sign({email: user.email}, 'secret');
    res.json({token: jwt});
});

module.exports = router;
