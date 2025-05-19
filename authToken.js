
//this middleware checks for a JWT token in the request headers.
const jsonwebtoken = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("Token:", token);

  //check if the token is present
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  //verify the token using jsonwebtoken
  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
   console.log("Decoded Token:", decoded);  if (err) {

      //if token verification failed
      console.error("JWT Error:", err.message);
      return res.status(403).json({ message: "Invalid token", error: err.message });
    }  

    
    next(); 
  });
}

module.exports = authenticateToken;
