const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // FIX: decoded mein pura payload hota hai (jisne id pehle se hoti hai)
    // Ise pura assign karne se controllers mein req.user.id mil jayega
    req.user = decoded; 
    
    next(); 
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};