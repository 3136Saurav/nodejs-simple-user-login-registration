const { createUser, loginUser } = require("../user/user.controller");
const router = require("express").Router();

router.post("/", createUser);
router.post("/authenticate", loginUser);

module.exports = router;
