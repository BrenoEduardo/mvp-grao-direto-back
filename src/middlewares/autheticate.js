const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.json({
      error: true,
      message: "Token no provide",
    });

  const parts = authHeader.split(" ");
  if (parts.length !== 2)
    return res.status(401).json({
      error: true,
      message: "Invalid token",
    });

  const [scheme, token] = parts;

  if (scheme.indexOf("Bearer") !== 0)
    return res.status(401).json({
      error: true,
      message: "Token malformatted",
    });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Token invalide/expired",
      });
    req.userLogged = decoded;
    next();
  });
};
