const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const headerObj = req.headers;
  //* get the token from header
  const token = headerObj?.authorization?.split(" ")[1];

  //* verify the token
  const verifyToken = jwt.verify(token, "token", (err, decoded) => {
    if (err) {
      throw new Error("Failed to verify token");
    } else {
      return decoded;
    }
  });
  if (verifyToken) {
    //* save token in req obj
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Token is not valid");
    next(err);
  }
};

module.exports = isAuthenticated;
