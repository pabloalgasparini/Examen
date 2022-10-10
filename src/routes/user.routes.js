const router = require("express").Router();

const {
    getUser,
    postUser,
    putUser,
    deleteUser
} = require('../controllers/user.controllers');

router.get("/user/:id", getUser);

// router.get("/user", getUser);

router.post("/user", postUser);

router.put("/user/:id", putUser);

router.delete("/user/:id", deleteUser)

module.exports = router;