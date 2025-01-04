const jwt = require("jsonwebtoken");


const isAuthenticated = (req, res, next) => {
  //? getting ID from the headers
  const headerObj = req.headers;
  //? generating the token
  const token = headerObj?.authorization?.split(" ")[1];
  //? validating the token
  const verifyToken = jwt.verify(token, "token", (err, decoded) => {
    if (err) {
      throw new Error("Could not verify token");
    } else {
      return decoded;
    }
  });

  if (verifyToken) {
    req.user = verifyToken._id;
    next();
  } else {
    const err = new Error("Could not verify token");
    next(err);
  }
};

module.exports = isAuthenticated;
