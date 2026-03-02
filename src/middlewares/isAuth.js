const User = require("../api/models/user");
const { verifyJwt } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json("No estás autorizado");
        }

        const [, token] = req.headers.authorization.split(" ");
        const { id } = verifyJwt(token);

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(401).json("No estás autorizado");
        }

        req.user = user;

    
        return next();
    } catch (error) {
       return res.status(401).json("No estás autorizado");
    }
}

module.exports = { isAuth }