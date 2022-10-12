const router = require("express").Router();

const {
    getUser,
    postUser,
    putUser,
    deleteUser
} = require('../controllers/user.controllers');
const esAdmin = require('../middlewares/es-admin');
const validarJWT = require('../middlewares/validar-jwt');


router.get("/user",[
    validarJWT,
    esAdmin
], getUser);

// router.get("/user", getUser);

router.post("/user", postUser);

router.put("/user",[
    validarJWT
], putUser);

router.delete("/user",[
    validarJWT
], deleteUser);

module.exports = router;