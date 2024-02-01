const express = require("express");
const { Router } = require("express");

const router = Router();
router.use(express.json());

router.post('/login', (req, res) => {
    const { userName, password } = req.body;
    console.log(userName,password)
    if (userName && password) {
        if (req.session.user) {
            res.send("You are already logged in");
        } else {
            req.session.user = {
                userName
            };
            console.log(req.session);
            res.send(req.session);
        }
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;
