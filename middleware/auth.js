const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //get token from header
    const token = req.header('auth-token');

    //check if not token
    if(!token){
        return res.status(401).json({
            msg: 'No token, you need token to be authorized to make some actions'
        })
    };

    try {
        const decoded = jwt.verify(token, process.env.AUTH_TOKEN);
        req.user = decoded.user;
        next();
    } catch (err) {
       res.status(401).json({ 
           msg: 'invalid token'
        })
    }
}
