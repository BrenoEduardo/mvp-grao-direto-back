const express = require("express");

const router = express.Router();

router.get("/users", async (req, res) => {
    console.log('controler')
    return res.json({
        error: false,
        message: "Token sucessced",
    });
});

module.exports = router