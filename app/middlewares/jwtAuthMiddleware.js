const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
  
    const bearerHeader = req.header('Authorization');
    if (!bearerHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const token = bearerHeader.split(' ')[1]; // Extracting the token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);
        console.log("Set userId:", req.userId);
        
        req.userId = decoded.id;
        
        next(); 
    } catch (err) {
        console.error("Error verifying token:", err.message); // Log the error for debugging
        res.status(401).json({ message: 'Token is not valid' });
    }
};
