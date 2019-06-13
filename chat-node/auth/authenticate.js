let jwt = require('jsonwebtoken');
const config = require('../config/config.js');

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    //console.log("got token"+token);
    jwt.verify(token, config.secret, (err, user) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    console.log("did not get any token")
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};


